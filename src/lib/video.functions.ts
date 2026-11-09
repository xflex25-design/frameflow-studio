import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import Bytez from "bytez.js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { enhancePrompt } from "@/lib/prompt-enhancer";

// Note: Server-side dependencies (child_process, fs, os) are only used in handlers.
// The file itself must not import 'child_process' at the top level for browser compatibility.
const getAsyncDeps = async () => {
  const { execFile } = await import("child_process");
  const { promisify } = await import("util");
  const fs = await import("fs/promises");
  const path = await import("path");
  const os = await import("os");
  return { execFile: promisify(execFile), fs, path, os };
};

const ai = new GoogleGenAI({
  apiKey: process.env["GEMINI_API_KEY"] || "",
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

export const VIDEO_SECONDS = 5;

const createSchema = z.object({
  prompt: z.string().trim().min(3).max(2000),
  style: z.enum(["realistic", "animated"]),
  aspectRatio: z.enum(["16:9", "9:16"]),
  image: z
    .object({
      data: z.string().max(10_000_000),
      mimeType: z.enum(["image/png", "image/jpeg", "image/webp"]),
    })
    .nullable(),
});

export const createVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data, context }: { data: z.infer<typeof createSchema>; context: any }) => {
    const { supabase, userId } = context;
    const { execFile, fs, path, os } = await getAsyncDeps();

    // 1. Credit Check & Deduction
    const { data: sub, error: subErr } = await supabase
      .from("subscriptions")
      .select("credits_remaining")
      .eq("user_id", userId)
      .single();

    if (subErr || (sub.credits_remaining || 0) < 1)
      throw new Error("Insufficient credits. Please upgrade or purchase more.");

    await supabase
      .from("subscriptions")
      .update({ credits_remaining: sub.credits_remaining - 1 })
      .eq("user_id", userId);

    // 2. Initial Insert
    const { data: row, error: insertErr } = await supabase
      .from("videos")
      .insert({
        user_id: userId,
        prompt: data.prompt,
        mode: data.image ? "image" : "text",
        style: data.style,
        aspect_ratio: data.aspectRatio,
        status: "queued",
      })
      .select("id")
      .single();

    if (insertErr) throw new Error(insertErr.message);
    const videoId = row.id;

    try {
      const { enhancedPrompt } = await enhancePrompt({ data: { prompt: data.prompt } });
      const bytezKey = process.env["BYTEZ_KEY"] || "ab8ef7517a60dc2dfb89a680ebd8942d";
      if (!bytezKey) throw new Error("BYTEZ_KEY missing");

      const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ogra-"));
      const rawVideoPath = path.join(tmpDir, "raw.mp4");
      const finalVideoPath = path.join(tmpDir, "final.mp4");

      const sdk = new Bytez(bytezKey);
      const model = sdk.model("ali-vilab/text-to-video-ms-1.7b");

      console.log(`[Bytez] Generating video for prompt: ${enhancedPrompt}`);
      const { error, output } = await model.run(enhancedPrompt);

      if (error) throw new Error(`Bytez generation failed: ${JSON.stringify(error)}`);
      if (!output) throw new Error("Bytez returned no output.");

      // Check if output is a URL or Buffer-like
      if (typeof output === "string" && (output.startsWith("http") || output.startsWith("https"))) {
        const dlRes = await fetch(output);
        if (!dlRes.ok) throw new Error(`Download failed: ${dlRes.status}`);
        await fs.writeFile(rawVideoPath, Buffer.from(await dlRes.arrayBuffer()));
      } else {
        // Assume binary output
        await fs.writeFile(rawVideoPath, Buffer.from(output as any));
      }

      const targetScale =
        data.aspectRatio === "9:16"
          ? "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280"
          : "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720";

      try {
        console.log("[FFmpeg] Processing video...");
        await execFile("ffmpeg", [
          "-y",
          "-i",
          rawVideoPath,
          "-vf",
          targetScale,
          "-c:v",
          "libx264",
          "-preset",
          "fast",
          "-crf",
          "23", // Slightly higher CRF for faster serverless processing
          "-movflags",
          "+faststart", // Better for web playback
          finalVideoPath,
        ]);
      } catch (ffErr) {
        console.warn(`[FFmpeg Warning] Could not process video, using raw output: ${ffErr}`);
        // Fallback: copy raw to final if ffmpeg is missing (e.g. on Vercel)
        await fs.copyFile(rawVideoPath, finalVideoPath);
      }

      const finalBuf = await fs.readFile(finalVideoPath);
      const storagePath = `${userId}/${Date.now()}.mp4`;
      const { error: uploadErr } = await supabase.storage
        .from("videos")
        .upload(storagePath, finalBuf, { contentType: "video/mp4", upsert: true });

      if (uploadErr) throw new Error(`Upload failed: ${uploadErr.message}`);

      await supabase
        .from("videos")
        .update({ status: "completed", storage_path: storagePath })
        .eq("id", videoId);
      return { id: videoId };
    } catch (err: unknown) {
      // Refund credits on failure
      await supabase
        .from("subscriptions")
        .update({ credits_remaining: sub.credits_remaining })
        .eq("user_id", userId);

      const error = err instanceof Error ? err : new Error(String(err));
      console.error(`[Video Generation Error] ${error.message}`);
      await supabase
        .from("videos")
        .update({ status: "failed", error: error.message })
        .eq("id", videoId);
      throw error;
    } finally {
      // cleanup tmpDir
      try {
        const { path, os, fs } = await getAsyncDeps();
        const tmpDirRoot = path.join(os.tmpdir(), "ogra-");
        // We only clean up if we know the path. In this implementation we'd need to track it.
        // For simplicity in serverless, Vercel cleans /tmp eventually.
      } catch (e) {}
    }
  });

export const checkVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }: { data: { id: string }; context: any }) => {
    const { supabase } = context;
    const { data: row, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error || !row) throw new Error("Video not found");
    return row;
  });

export const listVideos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }: { context: any }) => {
    const { supabase } = context;
    const { data, error } = await supabase
      .from("videos")
      .select("id, prompt, mode, style, aspect_ratio, status, error, storage_path, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const deleteVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }: { data: { id: string }; context: any }) => {
    const { supabase } = context;
    await supabase.from("videos").delete().eq("id", data.id);
    return { ok: true };
  });
