import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as CircleAlert, S as CircleCheck, _ as Film, c as Sparkles, g as ImagePlus, h as LoaderCircle, n as X, o as Type, s as Trash2, v as Download } from "../_libs/lucide-react.mjs";
import { a as listVideos, i as deleteVideo, n as checkVideo, o as useServerFn, r as createVideo, t as DashboardLayout } from "./DashboardLayout-BnPty0TI.mjs";
import { n as hero_scene_default, t as animated_thumb_default } from "./animated-thumb-CZ8fUfHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-C55l-eaO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/GenerationStatus.tsx";
function GenerationStatus({ stage, status, error }) {
	if (status === "completed") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-2 text-green-600",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 15,
			columnNumber: 9
		}, this), " Ready"]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 14,
		columnNumber: 7
	}, this);
	if (status === "failed") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-2 text-red-600",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 21,
				columnNumber: 9
			}, this),
			" ",
			error || "Failed"
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 20,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-2 text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 27,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [stage || "Processing", "…"] }, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 28,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/VideoPlayer.tsx";
function VideoPlayer({ url, aspectRatio, className = "" }) {
	const [loading, setLoading] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `relative w-full overflow-hidden ${aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"} ${className}`,
		children: [loading && /* @__PURE__ */ (void 0)("div", {
			className: "absolute inset-0 flex items-center justify-center bg-secondary",
			children: /* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 19,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 18,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
			src: url,
			controls: true,
			playsInline: true,
			onLoadedData: () => setLoading(false),
			className: "h-full w-full object-cover",
			onCanPlay: () => setLoading(false)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 22,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 14,
		columnNumber: 5
	}, this);
}
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
	const fileRef = (0, import_react.useRef)(null);
	const videos = useQuery({
		queryKey: ["videos"],
		queryFn: () => list()
	});
	const pending = (videos.data ?? []).filter((v) => v.status === "queued" || v.status === "in_progress");
	(0, import_react.useEffect)(() => {
		if (!pending.length) return;
		const t = setInterval(async () => {
			let changed = false;
			for (const v of pending) try {
				const r = await check({ data: { id: v.id } });
				if (r.status === "completed" || r.status === "failed") {
					changed = true;
					if (r.status === "failed") toast.error(r.error ?? "Video failed");
					else toast.success("Your video is ready!");
				}
			} catch (e) {
				console.error(e);
			}
			if (changed) qc.invalidateQueries({ queryKey: ["videos"] });
		}, 8e3);
		return () => clearInterval(t);
	}, [
		pending.map((p) => p.id).join(","),
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
		try {
			await create({ data: {
				prompt,
				style,
				aspectRatio: aspect,
				image: mode === "image" && image ? {
					data: image.data,
					mimeType: image.mimeType
				} : null
			} });
			toast.success("Generating your 5-second video… this takes 1–3 minutes.");
			qc.invalidateQueries({ queryKey: ["videos"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not start generation");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-5xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-4xl font-extrabold tracking-tight md:text-5xl",
				children: [
					"Create a ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-primary",
						children: "5-second"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 20
					}, this),
					" movie."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-lg text-sky",
				children: "Describe a scene, or bring a photo to life."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mt-8 rounded-[2rem] border-2 border-primary p-4 shadow-frame md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 rounded-2xl border border-border bg-card/60 p-4 md:grid-cols-[1fr_200px]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex rounded-full bg-secondary p-1",
								children: ["text", "image"].map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setMode(m),
									className: `flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
									children: [m === "text" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Type, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 37
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImagePlus, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 68
									}, this), m === "text" ? "Text to Video" : "Image to Video"]
								}, m, true, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 56
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 15
							}, this),
							mode === "image" && /* @__PURE__ */ (void 0)("div", { children: [image ? /* @__PURE__ */ (void 0)("div", {
								className: "relative inline-block",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: image.preview,
									alt: "Upload",
									className: "h-40 rounded-xl object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("button", {
									onClick: () => setImage(null),
									className: "absolute right-2 top-2 rounded-full bg-background/90 p-1",
									"aria-label": "Remove image",
									children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 28
							}, this) : /* @__PURE__ */ (void 0)("button", {
								onClick: () => fileRef.current?.click(),
								className: "flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-foreground",
								children: [/* @__PURE__ */ (void 0)(ImagePlus, { className: "h-8 w-8" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 23
								}, this), " Upload a starting image"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 30
							}, this), /* @__PURE__ */ (void 0)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/png,image/jpeg,image/webp",
								hidden: true,
								onChange: (e) => onFile(e.target.files?.[0])
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 36
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								value: prompt,
								onChange: (e) => setPrompt(e.target.value),
								rows: 4,
								maxLength: 2e3,
								placeholder: mode === "image" ? "How should it move? e.g. She turns to the camera and smiles as the sun sets…" : "A young woman in a red headwrap walks through a village at golden sunset, drums in the distance…",
								className: "w-full resize-none rounded-xl border border-input bg-background p-4 text-base outline-none focus:border-primary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm text-muted-foreground",
									children: "Format"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 17
								}, this), ["16:9", "9:16"].map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setAspect(a),
									className: `rounded-full border px-4 py-1.5 text-sm ${aspect === a ? "border-primary text-primary" : "border-border text-muted-foreground"}`,
									children: a === "16:9" ? "16:9 YouTube" : "9:16 TikTok/Reels"
								}, a, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 55
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-row gap-3 md:flex-col",
						children: [[
							"realistic",
							"Realistic Movie",
							hero_scene_default
						], [
							"animated",
							"Animated Story",
							animated_thumb_default
						]].map(([k, label, img]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setStyle(k),
							className: `flex-1 rounded-xl border-2 p-2 text-left ${style === k ? "border-primary" : "border-border"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: img,
									alt: label,
									className: "h-20 w-full rounded-md object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `absolute right-1 top-1 h-5 w-5 rounded-full border-2 border-foreground ${style === k ? "bg-primary" : ""}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-center text-sm font-medium",
								children: label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 19
							}, this)]
						}, k, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 135
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: generate,
					disabled: submitting || pending.length > 0,
					className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-glow disabled:opacity-60",
					children: submitting || pending.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 17
					}, this), "Processing..."] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 49
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 17
					}, this), "Generate Video"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 21
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 166,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "flex items-center gap-2 text-2xl font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-6 w-6 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 13
					}, this), " My videos"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 178,
					columnNumber: 11
				}, this), videos.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Loading…"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 31
				}, this) : !videos.data?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-muted-foreground",
					children: "No videos yet — generate your first one above."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 111
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: videos.data.map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						className: "overflow-hidden rounded-2xl border border-border bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `flex items-center justify-center bg-secondary ${v.aspect_ratio === "9:16" ? "aspect-[9/16]" : "aspect-video"}`,
								children: v.url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoPlayer, {
									url: v.url,
									aspectRatio: v.aspect_ratio
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 30
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col items-center gap-2 text-muted-foreground p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GenerationStatus, {
										status: v.status,
										error: v.error
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 25
									}, this), v.status === "failed" && /* @__PURE__ */ (void 0)("button", {
										onClick: generate,
										className: "mt-2 text-xs text-primary underline",
										children: "Retry"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 188,
										columnNumber: 51
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 108
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-2 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "line-clamp-2 flex-1 text-sm",
										children: v.prompt
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 194,
										columnNumber: 21
									}, this),
									v.url && /* @__PURE__ */ (void 0)("a", {
										href: v.url,
										download: true,
										className: "p-1 text-muted-foreground hover:text-foreground",
										"aria-label": "Download",
										children: /* @__PURE__ */ (void 0)(Download, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 196,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 195,
										columnNumber: 31
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										"aria-label": "Delete",
										className: "p-1 text-muted-foreground hover:text-destructive",
										onClick: async () => {
											await remove({ data: { id: v.id } });
											qc.invalidateQueries({ queryKey: ["videos"] });
										},
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-2 px-3 pb-3 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-secondary px-2 py-0.5",
										children: v.mode === "image" ? "Image" : "Text"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-secondary px-2 py-0.5",
										children: v.style === "animated" ? "Animated" : "Realistic"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-secondary px-2 py-0.5",
										children: ["5s · ", v.aspect_ratio]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 218,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 19
							}, this)
						]
					}, v.id, true, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 44
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 20
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 116,
		columnNumber: 10
	}, this);
}
//#endregion
export { Studio as component };
