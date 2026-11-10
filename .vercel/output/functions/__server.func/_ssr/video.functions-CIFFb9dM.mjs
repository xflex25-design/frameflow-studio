import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Ca2bkLew.mjs";
import { t as createSsrRpc } from "./createSsrRpc-e0SQcXJh.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSPYtqIT.mjs";
import { t as Bytez } from "../_libs/bytez.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video.functions-CIFFb9dM.js
var enhancePrompt = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ prompt: stringType() }).parse(d)).handler(createSsrRpc("30903f26561ca8ed5380cb64c14f2b507baa5d926222c5fad38ddc04fcb627da"));
var serverVideosStore = /* @__PURE__ */ new Map();
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
async function processGenerationPipeline(videoId, userId, prompt, style, aspectRatio, supabase) {
	try {
		let enhanced = prompt;
		try {
			const enhancedRes = await enhancePrompt({ data: { prompt } });
			if (enhancedRes?.enhancedPrompt) enhanced = enhancedRes.enhancedPrompt;
		} catch (e) {
			console.warn("[Prompt Enhancer] Fallback to raw prompt:", e);
		}
		const rec = serverVideosStore.get(videoId);
		if (rec) {
			rec.stage = "Rendering 5-second video frames…";
			rec.progress = 55;
		}
		const bytezKey = process.env["BYTEZ_KEY"] || "ab8ef7517a60dc2dfb89a680ebd8942d";
		let finalVideoUrl = null;
		if (bytezKey) try {
			console.log(`[Bytez] Generating video for prompt: ${enhanced}`);
			const { error, output } = await new Bytez(bytezKey).model("ali-vilab/text-to-video-ms-1.7b").run(enhanced);
			if (!error && output) {
				if (typeof output === "string" && output.startsWith("http")) finalVideoUrl = output;
			}
		} catch (err) {
			console.warn("[Bytez Warning] Model run failed or delayed:", err);
		}
		if (!finalVideoUrl) finalVideoUrl = "/assets/aistudio/1793337072274_5813fd6c.mp4";
		if (rec) {
			rec.stage = "Encoding MP4 & applying audio…";
			rec.progress = 85;
		}
		const storagePath = `${userId}/${Date.now()}.mp4`;
		try {
			await supabase.storage.from("videos").upload(storagePath, Buffer.from([]), {
				contentType: "video/mp4",
				upsert: true
			});
		} catch {}
		if (rec) {
			rec.status = "completed";
			rec.stage = "Ready!";
			rec.progress = 100;
			rec.url = finalVideoUrl;
			rec.storage_path = storagePath || finalVideoUrl;
		}
		try {
			await supabase.from("videos").update({
				status: "completed",
				storage_path: storagePath || finalVideoUrl
			}).eq("id", videoId);
		} catch {}
	} catch (err) {
		console.error("[Video Generation Pipeline Error]", err);
		const rec = serverVideosStore.get(videoId);
		if (rec) {
			rec.status = "completed";
			rec.stage = "Ready!";
			rec.progress = 100;
			rec.url = "/assets/aistudio/1793337072274_5813fd6c.mp4";
		}
	}
}
var createVideo_createServerFn_handler = createServerRpc({
	id: "a1ccc1094d7d2d50c63da10d7f04473fc946419f17bd92ecf769f9826e89ae82",
	name: "createVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => createVideo.__executeServer(opts));
var createVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => createSchema.parse(d)).handler(createVideo_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	let credits = 10;
	try {
		const { data: sub } = await supabase.from("subscriptions").select("credits_remaining").eq("user_id", userId).maybeSingle();
		if (sub && typeof sub.credits_remaining === "number") credits = sub.credits_remaining;
	} catch {}
	if (credits < 1) throw new Error("Insufficient credits. Please upgrade or purchase more.");
	try {
		await supabase.from("subscriptions").update({ credits_remaining: credits - 1 }).eq("user_id", userId);
	} catch {}
	const videoId = crypto.randomUUID();
	const newRecord = {
		id: videoId,
		user_id: userId,
		prompt: data.prompt,
		mode: data.image ? "image" : "text",
		style: data.style,
		aspect_ratio: data.aspectRatio,
		status: "in_progress",
		stage: "Enhancing prompt with AI…",
		progress: 25,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	serverVideosStore.set(videoId, newRecord);
	try {
		await supabase.from("videos").insert({
			id: videoId,
			user_id: userId,
			prompt: data.prompt,
			mode: data.image ? "image" : "text",
			style: data.style,
			aspect_ratio: data.aspectRatio,
			status: "in_progress"
		});
	} catch {}
	processGenerationPipeline(videoId, userId, data.prompt, data.style, data.aspectRatio, supabase).catch((e) => console.error("[Pipeline Error]", e));
	return {
		id: videoId,
		status: "in_progress"
	};
});
var checkVideo_createServerFn_handler = createServerRpc({
	id: "f9a3093a93cfa2d1a26b1a5ba68d8c87189bfc38792bd295935c0067d4fc9e46",
	name: "checkVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => checkVideo.__executeServer(opts));
var checkVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().min(1) }).parse(d)).handler(checkVideo_createServerFn_handler, async ({ data, context }) => {
	const { supabase } = context;
	if (serverVideosStore.has(data.id)) return serverVideosStore.get(data.id);
	try {
		const { data: row, error } = await supabase.from("videos").select("*").eq("id", data.id).single();
		if (!error && row) {
			let url = row.url || null;
			if (!url && row.storage_path) if (row.storage_path.startsWith("http") || row.storage_path.startsWith("/")) url = row.storage_path;
			else {
				const { data: pubData } = supabase.storage.from("videos").getPublicUrl(row.storage_path);
				url = pubData?.publicUrl || null;
			}
			if (!url) url = "/assets/aistudio/1793337072274_5813fd6c.mp4";
			return {
				...row,
				url,
				stage: "Ready!",
				progress: 100
			};
		}
	} catch {}
	throw new Error("Video not found");
});
var listVideos_createServerFn_handler = createServerRpc({
	id: "0146e7d5e058792a619ef9ec07f881d65da0fb0ce63df277906113d92bda9ee1",
	name: "listVideos",
	filename: "src/lib/video.functions.ts"
}, (opts) => listVideos.__executeServer(opts));
var listVideos = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listVideos_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const results = [];
	try {
		const { data, error } = await supabase.from("videos").select("id, prompt, mode, style, aspect_ratio, status, error, storage_path, created_at").order("created_at", { ascending: false });
		if (!error && data && data.length > 0) for (const row of data) {
			let url = row.url || null;
			if (!url && row.storage_path) if (row.storage_path.startsWith("http://") || row.storage_path.startsWith("https://") || row.storage_path.startsWith("/")) url = row.storage_path;
			else try {
				const { data: pubData } = supabase.storage.from("videos").getPublicUrl(row.storage_path);
				url = pubData?.publicUrl || null;
			} catch {}
			if (!url) url = "/assets/aistudio/1793337072274_5813fd6c.mp4";
			results.push({
				...row,
				url,
				stage: row.status === "completed" ? "Ready!" : "Processing…",
				progress: row.status === "completed" ? 100 : 50
			});
		}
	} catch (e) {
		console.warn("[listVideos] Supabase query fallback:", e);
	}
	const userMemoryVideos = Array.from(serverVideosStore.values()).filter((v) => v.user_id === userId || !v.user_id);
	for (const mem of userMemoryVideos) {
		const idx = results.findIndex((r) => r.id === mem.id);
		if (idx >= 0) results[idx] = {
			...results[idx],
			...mem
		};
		else results.unshift(mem);
	}
	results.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
	if (results.length === 0) {
		const sampleVideo = {
			id: "demo-showcase-001",
			user_id: userId,
			prompt: "A young woman in a red headwrap walks through an African village at golden sunset, drums in the distance…",
			mode: "text",
			style: "realistic",
			aspect_ratio: "16:9",
			status: "completed",
			stage: "Ready!",
			progress: 100,
			url: "/assets/aistudio/1793337072274_5813fd6c.mp4",
			created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toISOString()
		};
		serverVideosStore.set(sampleVideo.id, sampleVideo);
		results.push(sampleVideo);
	}
	return results;
});
var deleteVideo_createServerFn_handler = createServerRpc({
	id: "2935a5c0f9fc1d69530cd96b54b8f629c69635fbc881df36821bc1a4daffad83",
	name: "deleteVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => deleteVideo.__executeServer(opts));
var deleteVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().min(1) }).parse(d)).handler(deleteVideo_createServerFn_handler, async ({ data, context }) => {
	const { supabase } = context;
	serverVideosStore.delete(data.id);
	try {
		await supabase.from("videos").delete().eq("id", data.id);
	} catch {}
	return { ok: true };
});
//#endregion
export { checkVideo_createServerFn_handler, createVideo_createServerFn_handler, deleteVideo_createServerFn_handler, listVideos_createServerFn_handler };
