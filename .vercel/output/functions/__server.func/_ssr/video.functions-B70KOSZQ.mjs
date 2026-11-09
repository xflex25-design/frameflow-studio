import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B8Bq90Zz.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B8wpWlYi.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
import { t as createServerRpc } from "./createServerRpc-DSPYtqIT.mjs";
import { t as Bytez } from "../_libs/bytez.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video.functions-B70KOSZQ.js
var enhancePrompt = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ prompt: stringType() }).parse(d)).handler(createSsrRpc("30903f26561ca8ed5380cb64c14f2b507baa5d926222c5fad38ddc04fcb627da"));
var getAsyncDeps = async () => {
	const { execFile } = await import("child_process");
	const { promisify } = await import("util");
	const fs = await import("fs/promises");
	const path = await import("path");
	const os = await import("os");
	return {
		execFile: promisify(execFile),
		fs,
		path,
		os
	};
};
new GoogleGenAI({
	apiKey: process.env["GEMINI_API_KEY"] || "",
	httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});
var createSchema = objectType({
	prompt: stringType().trim().min(3).max(2e3),
	style: enumType(["realistic", "animated"]),
	aspectRatio: enumType(["16:9", "9:16"]),
	image: objectType({
		data: stringType().max(1e7),
		mimeType: enumType([
			"image/png",
			"image/jpeg",
			"image/webp"
		])
	}).nullable()
});
var createVideo_createServerFn_handler = createServerRpc({
	id: "a1ccc1094d7d2d50c63da10d7f04473fc946419f17bd92ecf769f9826e89ae82",
	name: "createVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => createVideo.__executeServer(opts));
var createVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => createSchema.parse(d)).handler(createVideo_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { execFile, fs, path, os } = await getAsyncDeps();
	const { data: sub, error: subErr } = await supabase.from("subscriptions").select("credits_remaining").eq("user_id", userId).single();
	if (subErr || (sub.credits_remaining || 0) < 1) throw new Error("Insufficient credits. Please upgrade or purchase more.");
	await supabase.from("subscriptions").update({ credits_remaining: sub.credits_remaining - 1 }).eq("user_id", userId);
	const { data: row, error: insertErr } = await supabase.from("videos").insert({
		user_id: userId,
		prompt: data.prompt,
		mode: data.image ? "image" : "text",
		style: data.style,
		aspect_ratio: data.aspectRatio,
		status: "queued"
	}).select("id").single();
	if (insertErr) throw new Error(insertErr.message);
	const videoId = row.id;
	try {
		const { enhancedPrompt } = await enhancePrompt({ data: { prompt: data.prompt } });
		const bytezKey = process.env["BYTEZ_KEY"] || "ab8ef7517a60dc2dfb89a680ebd8942d";
		if (!bytezKey) throw new Error("BYTEZ_KEY missing");
		const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ogra-"));
		const rawVideoPath = path.join(tmpDir, "raw.mp4");
		const finalVideoPath = path.join(tmpDir, "final.mp4");
		const model = new Bytez(bytezKey).model("ali-vilab/text-to-video-ms-1.7b");
		console.log(`[Bytez] Generating video for prompt: ${enhancedPrompt}`);
		const { error, output } = await model.run(enhancedPrompt);
		if (error) throw new Error(`Bytez generation failed: ${JSON.stringify(error)}`);
		if (!output) throw new Error("Bytez returned no output.");
		if (typeof output === "string" && (output.startsWith("http") || output.startsWith("https"))) {
			const dlRes = await fetch(output);
			if (!dlRes.ok) throw new Error(`Download failed: ${dlRes.status}`);
			await fs.writeFile(rawVideoPath, Buffer.from(await dlRes.arrayBuffer()));
		} else await fs.writeFile(rawVideoPath, Buffer.from(output));
		const targetScale = data.aspectRatio === "9:16" ? "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" : "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720";
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
				"23",
				"-movflags",
				"+faststart",
				finalVideoPath
			]);
		} catch (ffErr) {
			console.warn(`[FFmpeg Warning] Could not process video, using raw output: ${ffErr}`);
			await fs.copyFile(rawVideoPath, finalVideoPath);
		}
		const finalBuf = await fs.readFile(finalVideoPath);
		const storagePath = `${userId}/${Date.now()}.mp4`;
		const { error: uploadErr } = await supabase.storage.from("videos").upload(storagePath, finalBuf, {
			contentType: "video/mp4",
			upsert: true
		});
		if (uploadErr) throw new Error(`Upload failed: ${uploadErr.message}`);
		await supabase.from("videos").update({
			status: "completed",
			storage_path: storagePath
		}).eq("id", videoId);
		return { id: videoId };
	} catch (err) {
		await supabase.from("subscriptions").update({ credits_remaining: sub.credits_remaining }).eq("user_id", userId);
		const error = err instanceof Error ? err : new Error(String(err));
		console.error(`[Video Generation Error] ${error.message}`);
		await supabase.from("videos").update({
			status: "failed",
			error: error.message
		}).eq("id", videoId);
		throw error;
	} finally {
		try {
			const { path, os, fs } = await getAsyncDeps();
			path.join(os.tmpdir(), "ogra-");
		} catch (e) {}
	}
});
var checkVideo_createServerFn_handler = createServerRpc({
	id: "f9a3093a93cfa2d1a26b1a5ba68d8c87189bfc38792bd295935c0067d4fc9e46",
	name: "checkVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => checkVideo.__executeServer(opts));
var checkVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(checkVideo_createServerFn_handler, async ({ data, context }) => {
	const { supabase } = context;
	const { data: row, error } = await supabase.from("videos").select("*").eq("id", data.id).single();
	if (error || !row) throw new Error("Video not found");
	return row;
});
var listVideos_createServerFn_handler = createServerRpc({
	id: "0146e7d5e058792a619ef9ec07f881d65da0fb0ce63df277906113d92bda9ee1",
	name: "listVideos",
	filename: "src/lib/video.functions.ts"
}, (opts) => listVideos.__executeServer(opts));
var listVideos = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listVideos_createServerFn_handler, async ({ context }) => {
	const { supabase } = context;
	const { data, error } = await supabase.from("videos").select("id, prompt, mode, style, aspect_ratio, status, error, storage_path, created_at").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data;
});
var deleteVideo_createServerFn_handler = createServerRpc({
	id: "2935a5c0f9fc1d69530cd96b54b8f629c69635fbc881df36821bc1a4daffad83",
	name: "deleteVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => deleteVideo.__executeServer(opts));
var deleteVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteVideo_createServerFn_handler, async ({ data, context }) => {
	const { supabase } = context;
	await supabase.from("videos").delete().eq("id", data.id);
	return { ok: true };
});
//#endregion
export { checkVideo_createServerFn_handler, createVideo_createServerFn_handler, deleteVideo_createServerFn_handler, listVideos_createServerFn_handler };
