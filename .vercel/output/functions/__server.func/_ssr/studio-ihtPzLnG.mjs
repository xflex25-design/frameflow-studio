import { r as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as LoaderCircle, T as Film, n as X, r as WandSparkles, s as Type, w as ImagePlus } from "../_libs/lucide-react.mjs";
import { a as checkVideo, c as listVideos, i as VideoGridSkeleton, l as useServerFn, n as VideoDisplayCard, o as createVideo, r as VideoGenerationSkeleton, s as deleteVideo, t as DashboardLayout } from "./VideoSkeleton-DPCS0Ijj.mjs";
import { n as hero_scene_default, t as animated_thumb_default } from "./animated-thumb-CZ8fUfHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-ihtPzLnG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/studio.tsx?tsr-split=component";
function Studio() {
	const qc = useQueryClient();
	const list = useServerFn(listVideos);
	const create = useServerFn(createVideo);
	const check = useServerFn(checkVideo);
	const remove = useServerFn(deleteVideo);
	const [mode, setMode] = (0, import_react.useState)("text");
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [style, setStyle] = (0, import_react.useState)("realistic");
	const [aspect, setAspect] = (0, import_react.useState)("16:9");
	const [image, setImage] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [activePendingGen, setActivePendingGen] = (0, import_react.useState)(null);
	const [newlyCompletedId, setNewlyCompletedId] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	const outputSectionRef = (0, import_react.useRef)(null);
	const videos = useQuery({
		queryKey: ["videos"],
		queryFn: () => list()
	});
	const pendingVideos = (videos.data ?? []).filter((v) => v.status === "queued" || v.status === "in_progress");
	(0, import_react.useEffect)(() => {
		const targetIds = [...pendingVideos.map((p) => p.id), ...activePendingGen?.id ? [activePendingGen.id] : []];
		if (!targetIds.length) return;
		const interval = setInterval(async () => {
			let shouldRefresh = false;
			for (const id of targetIds) try {
				const res = await check({ data: { id } });
				if (res) {
					if (activePendingGen && activePendingGen.id === id) setActivePendingGen((prev) => prev ? {
						...prev,
						stage: res.stage || prev.stage,
						progress: res.progress || prev.progress
					} : null);
					if (res.status === "completed" || res.status === "failed") {
						shouldRefresh = true;
						if (res.status === "completed") {
							toast.success("Your 5-second AI video is ready!");
							setNewlyCompletedId(id);
							setActivePendingGen(null);
						} else {
							toast.error(res.error || "Generation could not be completed.");
							setActivePendingGen(null);
						}
					}
				}
			} catch (e) {
				console.error("[Polling error]", e);
			}
			if (shouldRefresh) qc.invalidateQueries({ queryKey: ["videos"] });
		}, 3500);
		return () => clearInterval(interval);
	}, [
		pendingVideos.map((p) => p.id).join(","),
		activePendingGen?.id,
		check,
		qc
	]);
	function onFile(f) {
		if (!f) return;
		if (![
			"image/png",
			"image/jpeg",
			"image/webp"
		].includes(f.type)) {
			toast.error("Use a PNG, JPG or WebP image.");
			return;
		}
		if (f.size > 6291456) {
			toast.error("Image must be under 6 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const url = reader.result;
			setImage({
				data: url.split(",")[1] ?? "",
				mimeType: f.type,
				preview: url
			});
		};
		reader.readAsDataURL(f);
	}
	async function generate() {
		if (prompt.trim().length < 3) {
			toast.error("Describe your scene first.");
			return;
		}
		if (mode === "image" && !image) {
			toast.error("Upload an image to animate.");
			return;
		}
		setSubmitting(true);
		const submittedPrompt = prompt.trim();
		const submittedStyle = style;
		const submittedAspect = aspect;
		const optimisticId = `gen-${Date.now()}`;
		setActivePendingGen({
			id: optimisticId,
			prompt: submittedPrompt,
			style: submittedStyle,
			aspect_ratio: submittedAspect,
			stage: "Enhancing prompt with AI…",
			progress: 20
		});
		setTimeout(() => {
			outputSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}, 200);
		try {
			const res = await create({ data: {
				prompt: submittedPrompt,
				style: submittedStyle,
				aspectRatio: submittedAspect,
				image: mode === "image" && image ? {
					data: image.data,
					mimeType: image.mimeType
				} : null
			} });
			if (res?.id) setActivePendingGen({
				id: res.id,
				prompt: submittedPrompt,
				style: submittedStyle,
				aspect_ratio: submittedAspect,
				stage: "Rendering 5-second video frames…",
				progress: 45
			});
			toast.success("Generation started! Your video will appear below once ready.");
			qc.invalidateQueries({ queryKey: ["videos"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not start generation");
			setActivePendingGen(null);
		} finally {
			setSubmitting(false);
		}
	}
	const handleRemix = (v) => {
		setPrompt(v.prompt);
		setStyle(v.style);
		setAspect(v.aspect_ratio);
		if (v.mode) setMode(v.mode);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		toast.info("Prompt loaded into studio creator form.");
	};
	const handleDelete = async (id) => {
		await remove({ data: { id } });
		if (newlyCompletedId === id) setNewlyCompletedId(null);
		qc.invalidateQueries({ queryKey: ["videos"] });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-5xl mx-auto space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-4xl font-extrabold tracking-tight md:text-5xl",
				children: [
					"Create a ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-primary",
						children: "5-second"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 22
					}, this),
					" movie."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-lg text-sky",
				children: "Describe a scene, or bring a photo to life."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 206,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 202,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-[2.5rem] border-2 border-primary p-5 shadow-frame md:p-8 bg-card/40 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 rounded-2xl border border-border bg-card/80 p-5 md:grid-cols-[1fr_220px]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex rounded-full bg-secondary/80 p-1 border border-border/60",
								children: ["text", "image"].map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setMode(m),
									className: `flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${mode === m ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [m === "text" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Type, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 37
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImagePlus, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 68
									}, this), m === "text" ? "Text to Video" : "Image to Video"]
								}, m, true, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 56
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 15
							}, this),
							mode === "image" && /* @__PURE__ */ (void 0)("div", { children: [image ? /* @__PURE__ */ (void 0)("div", {
								className: "relative inline-block",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: image.preview,
									alt: "Upload preview",
									className: "h-44 rounded-xl object-cover border border-border"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setImage(null),
									className: "absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-md hover:bg-background transition",
									"aria-label": "Remove image",
									children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 226,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 223,
								columnNumber: 28
							}, this) : /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "flex h-44 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 text-muted-foreground hover:border-primary hover:text-foreground transition",
								children: [
									/* @__PURE__ */ (void 0)(ImagePlus, { className: "h-8 w-8 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 229,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "font-medium text-sm",
										children: "Upload a starting photo to animate"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 230,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-xs text-muted-foreground",
										children: "PNG, JPG or WebP up to 6MB"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 231,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 30
							}, this), /* @__PURE__ */ (void 0)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/png,image/jpeg,image/webp",
								hidden: true,
								onChange: (e) => onFile(e.target.files?.[0])
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 36
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Scene Description & Motion Prompt"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								value: prompt,
								onChange: (e) => setPrompt(e.target.value),
								rows: 4,
								maxLength: 2e3,
								placeholder: mode === "image" ? "How should the photo move? e.g. She gently turns toward the camera, wind blowing through her hair at sunset…" : "A young African queen in a glowing emerald gown walks across the savannah at golden hour, cinematic lighting…",
								className: "w-full resize-none rounded-xl border border-input bg-background p-4 text-base outline-none focus:border-primary transition"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Aspect Ratio:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 17
								}, this), ["16:9", "9:16"].map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setAspect(a),
									className: `rounded-full border px-4 py-1.5 text-xs font-medium transition ${aspect === a ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border text-muted-foreground hover:text-foreground"}`,
									children: a === "16:9" ? "16:9 Landscape (YouTube / Web)" : "9:16 Portrait (TikTok / Reels)"
								}, a, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 55
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-row gap-3 md:flex-col justify-center",
						children: [[
							"realistic",
							"Realistic Movie",
							hero_scene_default
						], [
							"animated",
							"Animated Story",
							animated_thumb_default
						]].map(([k, label, img]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setStyle(k),
							className: `group relative flex-1 rounded-2xl border-2 p-2.5 text-left transition ${style === k ? "border-primary bg-primary/5 shadow-sm" : "border-border/80 hover:border-primary/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative overflow-hidden rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: img,
									alt: label,
									className: "h-24 w-full object-cover transition duration-300 group-hover:scale-105"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `absolute right-2 top-2 h-5 w-5 rounded-full border-2 border-white shadow-md transition ${style === k ? "bg-primary" : "bg-black/40"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-center text-xs font-bold text-foreground",
								children: label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 19
							}, this)]
						}, k, true, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 135
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: generate,
					disabled: submitting || !!activePendingGen,
					className: "mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-base font-bold text-primary-foreground shadow-glow hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60",
					children: submitting || !!activePendingGen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 270,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "AI Video Generation in Progress…" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 271,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 49
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Generate 5-Second Video (1 Credit)" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 274,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 272,
						columnNumber: 21
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 268,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 210,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				ref: outputSectionRef,
				className: "space-y-6 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-border/80 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-6 w-6 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-2xl font-extrabold tracking-tight",
								children: "Generated Videos"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 282,
							columnNumber: 13
						}, this), videos.data && /* @__PURE__ */ (void 0)("span", {
							className: "text-xs text-muted-foreground font-medium",
							children: [
								videos.data.length,
								" ",
								videos.data.length === 1 ? "video" : "videos",
								" in studio"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 29
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 281,
						columnNumber: 11
					}, this),
					activePendingGen && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)("span", { className: "h-2 w-2 rounded-full bg-primary animate-ping" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 17
							}, this), "Active Video Output in Generation"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "max-w-xl",
							children: /* @__PURE__ */ (void 0)(VideoGenerationSkeleton, {
								prompt: activePendingGen.prompt,
								aspectRatio: activePendingGen.aspect_ratio,
								style: activePendingGen.style,
								stage: activePendingGen.stage,
								progress: activePendingGen.progress
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 297,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 292,
						columnNumber: 32
					}, this),
					videos.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoGridSkeleton, { count: 3 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 31
					}, this) : !videos.data?.length && !activePendingGen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border-2 border-dashed border-border/80 p-12 text-center bg-card/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "mx-auto h-12 w-12 text-muted-foreground/40 mb-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-base font-semibold text-foreground",
								children: "No videos generated yet"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm text-muted-foreground max-w-sm mx-auto",
								children: "Type your creative scene in the prompt box above and hit Generate to see your first AI movie!"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 109
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: [pendingVideos.filter((pv) => pv.id !== activePendingGen?.id).map((pv) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoGenerationSkeleton, {
							prompt: pv.prompt,
							aspectRatio: pv.aspect_ratio,
							style: pv.style,
							stage: pv.stage || "Rendering video frames…",
							progress: pv.progress || 50
						}, pv.id, false, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 99
						}, this)), videos.data?.filter((v) => v.status === "completed" || !v.status && v.url).map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoDisplayCard, {
							video: v,
							onDelete: handleDelete,
							onRemix: handleRemix,
							priority: v.id === newlyCompletedId
						}, v.id, false, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 112
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 22
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 280,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 200,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 199,
		columnNumber: 10
	}, this);
}
//#endregion
export { Studio as component };
