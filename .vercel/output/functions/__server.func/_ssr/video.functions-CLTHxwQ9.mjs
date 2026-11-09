import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-GqRLgEWZ.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Dh8dj9Wy.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
import { t as createServerRpc } from "./createServerRpc-DSPYtqIT.mjs";
import { t as Client } from "../_libs/gradio__client.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video.functions-CLTHxwQ9.js
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
	apiKey: process.env.GEMINI_API_KEY,
	httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});
var HF_ZEROGPU_SPACE = "Lightricks/ltx-video-distilled";
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
		const hfToken = process.env.HF_TOKEN;
		if (!hfToken) throw new Error("HF_TOKEN missing");
		const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ogra-"));
		const rawVideoPath = path.join(tmpDir, "raw.mp4");
		const finalVideoPath = path.join(tmpDir, "final.mp4");
		const client = await Client.connect(HF_ZEROGPU_SPACE, { token: hfToken });
		const width = data.aspectRatio === "9:16" ? 512 : 704;
		const height = data.aspectRatio === "9:16" ? 704 : 512;
		const targetScale = data.aspectRatio === "9:16" ? "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" : "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720";
		const params = {
			prompt: enhancedPrompt,
			negative_prompt: "worst quality, blurry, jittery, distorted",
			height_ui: height,
			width_ui: width,
			mode: data.image ? "image-to-video" : "text-to-video",
			duration_ui: 5,
			ui_frames_to_use: 9,
			seed_ui: 42,
			randomize_seed: true,
			ui_guidance_scale: 1,
			improve_texture_flag: true
		};
		const generatedUrl = (await client.predict(data.image ? "/image_to_video" : "/text_to_video", params)).data?.[0]?.video?.url;
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
			finalVideoPath
		]);
		const finalBuf = await fs.readFile(finalVideoPath);
		const storagePath = `${userId}/${Date.now()}.mp4`;
		await supabase.storage.from("videos").upload(storagePath, finalBuf, {
			contentType: "video/mp4",
			upsert: true
		});
		await supabase.from("videos").update({ status: "completed" }).eq("id", videoId);
		return { id: videoId };
	} catch (err) {
		await supabase.from("subscriptions").update({ credits_remaining: sub.credits_remaining }).eq("user_id", userId);
		const error = err instanceof Error ? err : new Error(String(err));
		await supabase.from("videos").update({
			status: "failed",
			error: error.message
		}).eq("id", videoId);
		throw error;
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
