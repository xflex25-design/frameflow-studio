import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { Client } from "@gradio/client";
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
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

const HF_ZEROGPU_SPACE = "Lightricks/ltx-video-distilled";

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
  .handler(async ({ data, context }) => {
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
      const hfToken = process.env.HF_TOKEN;
      if (!hfToken) throw new Error("HF_TOKEN missing");

      const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ogra-"));
      const rawVideoPath = path.join(tmpDir, "raw.mp4");
      const finalVideoPath = path.join(tmpDir, "final.mp4");

      const client = await Client.connect(HF_ZEROGPU_SPACE, { token: hfToken as `hf_${string}` });

      const width = data.aspectRatio === "9:16" ? 512 : 704;
      const height = data.aspectRatio === "9:16" ? 704 : 512;
      const targetScale =
        data.aspectRatio === "9:16"
          ? "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280"
          : "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720";

      const params: Record<string, unknown> = {
        prompt: enhancedPrompt,
        negative_prompt: "worst quality, blurry, jittery, distorted",
        height_ui: height,
        width_ui: width,
        mode: data.image ? "image-to-video" : "text-to-video",
        duration_ui: 5.0,
        ui_frames_to_use: 9,
        seed_ui: 42,
        randomize_seed: true,
        ui_guidance_scale: 1,
        improve_texture_flag: true,
      };

      interface GradioResult {
        data?: Array<{ video?: { url: string } }>;
      }

      const result = (await client.predict(
        data.image ? "/image_to_video" : "/text_to_video",
        params,
      )) as GradioResult;
      const generatedUrl = result.data?.[0]?.video?.url;
      if (!generatedUrl) throw new Error("ZeroGPU failed.");

      const dlRes = await fetch(generatedUrl);
      if (!dlRes.ok) throw new Error(`Download failed: ${dlRes.status}`);
      await fs.writeFile(rawVideoPath, Buffer.from(await dlRes.arrayBuffer()));

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
        "19",
        finalVideoPath,
      ]);

      const finalBuf = await fs.readFile(finalVideoPath);
      const storagePath = `${userId}/${Date.now()}.mp4`;
      await supabase.storage
        .from("videos")
        .upload(storagePath, finalBuf, { contentType: "video/mp4", upsert: true });

      await supabase.from("videos").update({ status: "completed" }).eq("id", videoId);
      return { id: videoId };
    } catch (err: unknown) {
      await supabase
        .from("subscriptions")
        .update({ credits_remaining: sub.credits_remaining })
        .eq("user_id", userId);

      const error = err instanceof Error ? err : new Error(String(err));
      await supabase
        .from("videos")
        .update({ status: "failed", error: error.message })
        .eq("id", videoId);
      throw error;
    } finally {
      // cleanup tmpDir
    }
  });

export const checkVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
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
  .handler(async ({ context }) => {
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
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    await supabase.from("videos").delete().eq("id", data.id);
    return { ok: true };
  });
