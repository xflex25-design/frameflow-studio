import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BQE2bPmH.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { W as isRedirect, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as CreditCard, C as LoaderCircle, F as CircleCheck, L as Check, N as Clock, O as ExternalLink, T as Film, _ as Pause, a as Volume2, c as Trash2, d as Share2, f as Settings, g as Play, i as VolumeX, j as Copy, k as Download, l as Sparkles, n as X, o as User, p as RotateCcw, v as Menu, x as LogOut, y as Maximize2 } from "../_libs/lucide-react.mjs";
import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Ca2bkLew.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D7S8gpag.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VideoSkeleton-Dartvupp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
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
var createVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => createSchema.parse(d)).handler(createSsrRpc("a1ccc1094d7d2d50c63da10d7f04473fc946419f17bd92ecf769f9826e89ae82"));
var checkVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().min(1) }).parse(d)).handler(createSsrRpc("f9a3093a93cfa2d1a26b1a5ba68d8c87189bfc38792bd295935c0067d4fc9e46"));
var listVideos = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("0146e7d5e058792a619ef9ec07f881d65da0fb0ce63df277906113d92bda9ee1"));
var deleteVideo = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().min(1) }).parse(d)).handler(createSsrRpc("2935a5c0f9fc1d69530cd96b54b8f629c69635fbc881df36821bc1a4daffad83"));
var _jsxFileName$3 = "/app/applet/src/components/SidebarNavigation.tsx";
function SidebarNavigation() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
		className: "space-y-2 flex-1",
		children: [
			{
				icon: Sparkles,
				label: "Generation",
				to: "/studio"
			},
			{
				icon: Film,
				label: "History",
				to: "/dashboard"
			},
			{
				icon: CreditCard,
				label: "Subscription",
				to: "/dashboard"
			},
			{
				icon: Settings,
				label: "Settings",
				to: "/studio"
			}
		].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: item.to,
			className: "flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200",
			activeProps: { className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-glow" },
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: "h-5 w-5" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 24,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-medium",
				children: item.label
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 25,
				columnNumber: 11
			}, this)]
		}, item.label, true, {
			fileName: _jsxFileName$3,
			lineNumber: 15,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 13,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/DashboardLayout.tsx";
function DashboardLayout({ children }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:hidden fixed top-0 left-0 right-0 p-4 bg-background border-b border-border flex justify-between items-center z-40",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 font-bold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 15,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xl tracking-tighter",
						children: "OGRA AI"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 16,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 14,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setIsOpen(!isOpen),
					className: "p-2 text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 19,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 18,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: `fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-between items-center mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 font-bold text-primary px-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-8 w-8" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 29,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-2xl tracking-tighter",
								children: "OGRA AI"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 30,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 28,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setIsOpen(false),
							className: "lg:hidden p-2 text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 33,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 32,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 27,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => setIsOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarNavigation, {}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 38,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 37,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "pt-6 border-t border-border mt-auto",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/dashboard",
							onClick: () => setIsOpen(false),
							className: "flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 47,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium",
								children: "Account"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 48,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 42,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: async () => {
								setIsOpen(false);
								await supabase.auth.signOut();
								window.location.href = "/";
							},
							className: "flex w-full items-center gap-3 px-4 py-3 text-red-500/80 hover:text-red-500 transition cursor-pointer text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 59,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium",
								children: "Sign Out"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 60,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 50,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 41,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 24,
				columnNumber: 7
			}, this),
			isOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
				onClick: () => setIsOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 67,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 overflow-y-auto mt-16 lg:mt-0",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-7xl mx-auto p-4 md:p-8 lg:p-12",
					children
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 75,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 74,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/VideoDisplayCard.tsx";
function VideoDisplayCard({ video, onDelete, onRemix, priority = false }) {
	const videoRef = (0, import_react.useRef)(null);
	const progressRef = (0, import_react.useRef)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isMuted, setIsMuted] = (0, import_react.useState)(true);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(5);
	const [mediaLoaded, setMediaLoaded] = (0, import_react.useState)(false);
	const [mediaError, setMediaError] = (0, import_react.useState)(false);
	const [copiedPrompt, setCopiedPrompt] = (0, import_react.useState)(false);
	const [copiedLink, setCopiedLink] = (0, import_react.useState)(false);
	const [theaterOpen, setTheaterOpen] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const isPortrait = video.aspect_ratio === "9:16";
	const videoUrl = video.url || (video.storage_path?.startsWith("http") ? video.storage_path : null) || "/assets/aistudio/1793337072274_5813fd6c.mp4";
	(0, import_react.useEffect)(() => {
		if (priority && videoRef.current && mediaLoaded) videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
	}, [priority, mediaLoaded]);
	const togglePlay = () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
	};
	const toggleMute = () => {
		if (!videoRef.current) return;
		const next = !isMuted;
		videoRef.current.muted = next;
		setIsMuted(next);
	};
	const handleTimeUpdate = () => {
		if (!videoRef.current) return;
		setCurrentTime(videoRef.current.currentTime);
		if (videoRef.current.duration && !isNaN(videoRef.current.duration)) setDuration(videoRef.current.duration);
	};
	const handleSeek = (e) => {
		if (!videoRef.current || !progressRef.current) return;
		const rect = progressRef.current.getBoundingClientRect();
		const target = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
		videoRef.current.currentTime = target;
		setCurrentTime(target);
	};
	const toggleFullscreen = () => {
		if (!videoRef.current) return;
		if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
		else videoRef.current.requestFullscreen().catch(() => {});
	};
	const handleDownload = async () => {
		try {
			toast.info("Preparing video download…");
			const res = await fetch(videoUrl);
			if (!res.ok) throw new Error("Could not fetch video file");
			const blob = await res.blob();
			const blobUrl = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = blobUrl;
			a.download = `ogra-ai-${video.prompt.slice(0, 24).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() || "video"}-${video.id.slice(0, 6)}.mp4`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(blobUrl);
			toast.success("Download started!");
		} catch {
			window.open(videoUrl, "_blank");
		}
	};
	const handleCopyPrompt = () => {
		navigator.clipboard.writeText(video.prompt);
		setCopiedPrompt(true);
		toast.success("Prompt copied to clipboard!");
		setTimeout(() => setCopiedPrompt(false), 2e3);
	};
	const handleCopyLink = () => {
		navigator.clipboard.writeText(videoUrl);
		setCopiedLink(true);
		toast.success("Video URL copied to clipboard!");
		setTimeout(() => setCopiedLink(false), 2e3);
	};
	const handleDelete = async () => {
		if (!onDelete) return;
		if (confirm("Are you sure you want to delete this generated video?")) {
			setDeleting(true);
			try {
				await onDelete(video.id);
				toast.success("Video deleted.");
			} catch (e) {
				toast.error(e?.message || "Failed to delete video");
				setDeleting(false);
			}
		}
	};
	const formatTime = (secs) => {
		const s = Math.floor(secs % 60);
		return `${Math.floor(secs / 60)}:${s < 10 ? "0" : ""}${s}`;
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: `group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg ${priority ? "border-primary shadow-frame" : "border-border hover:border-primary/50"}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `relative w-full overflow-hidden bg-black select-none ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`,
			children: [
				!mediaLoaded && !mediaError && /* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-0 flex flex-col items-center justify-center bg-secondary/80 z-10",
					children: [
						/* @__PURE__ */ (void 0)("div", { className: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Film, { className: "h-8 w-8 text-primary animate-pulse mb-2" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 189,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("span", {
							className: "text-xs text-muted-foreground font-medium",
							children: "Loading video media…"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 190,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 187,
					columnNumber: 13
				}, this),
				mediaError && /* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-0 flex flex-col items-center justify-center bg-secondary/90 p-4 text-center z-10",
					children: [/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-destructive mb-2 font-medium",
						children: "Unable to load video playback"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 197,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => {
							setMediaError(false);
							if (videoRef.current) videoRef.current.load();
						},
						className: "text-xs underline text-primary hover:text-primary/80",
						children: "Retry playback"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 198,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 196,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
					ref: videoRef,
					src: videoUrl,
					playsInline: true,
					loop: true,
					muted: isMuted,
					onTimeUpdate: handleTimeUpdate,
					onLoadedMetadata: handleTimeUpdate,
					onLoadedData: () => {
						setMediaLoaded(true);
						setMediaError(false);
					},
					onCanPlay: () => setMediaLoaded(true),
					onError: () => {
						if (videoUrl !== "/assets/aistudio/1793337072274_5813fd6c.mp4" && videoRef.current) {
							videoRef.current.src = "/assets/aistudio/1793337072274_5813fd6c.mp4";
							videoRef.current.load();
						} else setMediaError(true);
					},
					onClick: togglePlay,
					className: "h-full w-full object-cover cursor-pointer"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 213,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between z-20",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-white/95 border border-white/10 shadow-sm",
							children: video.aspect_ratio === "9:16" ? "9:16 Reels" : "16:9 HD"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 242,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-white/95 border border-white/10 shadow-sm capitalize",
							children: video.style
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 245,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 241,
						columnNumber: 13
					}, this), priority && /* @__PURE__ */ (void 0)("span", {
						className: "flex items-center gap-1 rounded-md bg-primary/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-primary-foreground shadow-glow animate-pulse",
						children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3 w-3" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 251,
							columnNumber: 17
						}, this), " New"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 250,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 240,
					columnNumber: 11
				}, this),
				(!isPlaying || !mediaLoaded) && mediaLoaded && /* @__PURE__ */ (void 0)("button", {
					onClick: togglePlay,
					"aria-label": "Play video",
					className: "absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition hover:bg-black/40 z-20 group-hover:opacity-100",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition transform hover:scale-110 active:scale-95",
						children: /* @__PURE__ */ (void 0)(Play, { className: "h-6 w-6 ml-0.5 fill-current" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 264,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 263,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 258,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 transition-opacity duration-200 z-20 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						ref: progressRef,
						onClick: handleSeek,
						className: "relative mb-2 h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition hover:h-2",
						role: "slider",
						"aria-valuenow": currentTime,
						"aria-valuemin": 0,
						"aria-valuemax": duration,
						tabIndex: 0,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-full rounded-full bg-primary shadow-glow transition-all",
							style: { width: `${currentTime / (duration || 5) * 100}%` }
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 286,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 276,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-white text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: togglePlay,
									"aria-label": isPlaying ? "Pause" : "Play",
									className: "rounded p-1 hover:bg-white/20 transition",
									children: isPlaying ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pause, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 300,
										columnNumber: 32
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "h-4 w-4 fill-current" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 300,
										columnNumber: 64
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 295,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: toggleMute,
									"aria-label": isMuted ? "Unmute" : "Mute",
									className: "rounded p-1 hover:bg-white/20 transition",
									children: isMuted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VolumeX, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 307,
										columnNumber: 30
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Volume2, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 307,
										columnNumber: 64
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 302,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-[11px] text-white/80",
									children: [
										formatTime(currentTime),
										" / ",
										formatTime(duration)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 309,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 294,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setTheaterOpen(true),
								"aria-label": "Theater view",
								title: "Expand to Theater View",
								className: "rounded p-1 hover:bg-white/20 transition text-white/90 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 321,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 315,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: toggleFullscreen,
								"aria-label": "Fullscreen",
								title: "Toggle Fullscreen",
								className: "rounded p-1 hover:bg-white/20 transition text-white/90 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Maximize2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 329,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 323,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 314,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 293,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 270,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 180,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-medium text-foreground line-clamp-2 leading-relaxed",
					title: video.prompt,
					children: video.prompt
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 338,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: video.mode === "image" ? "Photo Anim" : "Text Prompt" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 344,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							"aria-hidden": "true",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 345,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: video.style === "animated" ? "Animation" : "Cinematic" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 346,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							"aria-hidden": "true",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 347,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "5s Clip" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 348,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							"aria-hidden": "true",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 349,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: video.aspect_ratio }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 350,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 343,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between pt-3 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleCopyPrompt,
							title: "Copy prompt text",
							"aria-label": "Copy prompt text",
							className: "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition",
							children: copiedPrompt ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5 text-green-500" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 365,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-green-500",
								children: "Copied"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 366,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 364,
								columnNumber: 19
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 370,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copy Prompt" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 371,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 369,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 356,
							columnNumber: 15
						}, this), onRemix && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => onRemix(video),
							title: "Remix prompt in creator form",
							"aria-label": "Remix this video",
							className: "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition",
							children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 384,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Remix" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 385,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 377,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 355,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: handleCopyLink,
								title: "Copy direct video URL",
								"aria-label": "Copy video URL",
								className: "rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition",
								children: copiedLink ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4 text-green-500" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 398,
									columnNumber: 31
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 398,
									columnNumber: 78
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 391,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: handleDownload,
								title: "Download MP4",
								"aria-label": "Download video MP4",
								className: "flex items-center gap-1 rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 408,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Save" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 409,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 401,
								columnNumber: 15
							}, this),
							onDelete && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								disabled: deleting,
								onClick: handleDelete,
								title: "Delete video",
								"aria-label": "Delete video",
								className: "rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition disabled:opacity-50",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 421,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 413,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 390,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 354,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 337,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 174,
		columnNumber: 7
	}, this), theaterOpen && /* @__PURE__ */ (void 0)("div", {
		role: "dialog",
		"aria-modal": "true",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6",
		onClick: () => setTheaterOpen(false),
		children: /* @__PURE__ */ (void 0)("div", {
			className: "relative flex flex-col max-w-4xl w-full max-h-[92vh] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between border-b border-border/80 px-5 py-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(Film, { className: "h-5 w-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 444,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("h3", {
							className: "text-base font-bold text-foreground",
							children: "AI Video Preview"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 445,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 443,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => setTheaterOpen(false),
						className: "rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition",
						"aria-label": "Close dialog",
						children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 452,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 447,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 442,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "relative bg-black flex items-center justify-center max-h-[55vh] overflow-hidden",
					children: /* @__PURE__ */ (void 0)("video", {
						src: videoUrl,
						controls: true,
						autoPlay: true,
						playsInline: true,
						loop: true,
						className: `max-h-[55vh] w-auto ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 458,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 457,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "p-5 space-y-4 overflow-y-auto",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1",
						children: "Prompt"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 471,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-sm font-medium text-foreground bg-secondary/40 p-3 rounded-xl border border-border/50",
						children: video.prompt
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 474,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 470,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 pt-2",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (void 0)("span", { children: ["Aspect: ", video.aspect_ratio] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 481,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 482,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: ["Style: ", video.style] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 483,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 484,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: "Duration: 5.0 seconds" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 485,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 486,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: "Engine: Ogra AI Studio" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 487,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 480,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: handleCopyPrompt,
								className: "flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition",
								children: [/* @__PURE__ */ (void 0)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 495,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Copy Prompt" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 496,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 491,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: handleDownload,
								className: "flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-glow hover:brightness-110 transition",
								children: [/* @__PURE__ */ (void 0)(Download, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 502,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Download MP4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 503,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 498,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 490,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 479,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 469,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 437,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 431,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 173,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/VideoSkeleton.tsx";
function VideoGenerationSkeleton({ prompt, aspectRatio = "16:9", style = "realistic", stage = "Rendering video frames...", progress = 45, className = "" }) {
	const isPortrait = aspectRatio === "9:16";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: `relative overflow-hidden rounded-2xl border-2 border-primary/40 bg-card shadow-frame transition-all ${className}`,
		"aria-busy": "true",
		"aria-label": "Generating video preview",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `relative w-full overflow-hidden bg-gradient-to-br from-secondary/80 via-card to-secondary/60 flex flex-col items-center justify-center p-6 text-center select-none ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pointer-events-none absolute inset-0 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -inset-10 bg-primary/10 blur-3xl opacity-50 animate-pulse pointer-events-none" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 40,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative z-10 flex flex-col items-center max-w-sm px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative flex items-center justify-center mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-16 w-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shadow-glow animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-7 w-7 text-primary animate-bounce" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 46,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 45,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-primary/40 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 49,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary mb-2 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 54,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "AI Rendering In Progress" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 53,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm font-medium text-foreground tracking-tight line-clamp-1 mb-1",
							children: stage
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground flex items-center gap-1 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Estimated ~15–30s remaining" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full bg-secondary/80 rounded-full h-2 overflow-hidden border border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-primary h-full rounded-full transition-all duration-700 ease-out shadow-glow",
								style: { width: `${Math.min(Math.max(progress, 15), 95)}%` }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex items-center justify-center gap-3 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 78,
										columnNumber: 15
									}, this), " Enhance"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 77,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-border",
									children: "→"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 text-primary font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3 w-3 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 82,
										columnNumber: 15
									}, this), " Render"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-border",
									children: "→"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 84,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 opacity-60",
									children: "Encode"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-white/90 border border-white/10",
						children: aspectRatio === "9:16" ? "9:16 Reels" : "16:9 YouTube"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-white/90 border border-white/10 capitalize",
						children: style
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-4 space-y-3",
			children: [prompt ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-foreground/90 line-clamp-2 italic",
				children: [
					"\"",
					prompt,
					"\""
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-4 w-4/5 rounded bg-muted/60 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3.5 w-1/2 rounded bg-muted/40 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pt-2 border-t border-border/50 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-primary animate-ping" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Processing cinematic frames…" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-7 w-7 rounded-lg bg-muted animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-7 w-7 rounded-lg bg-muted animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
function VideoCardSkeleton({ aspectRatio = "16:9" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "overflow-hidden rounded-2xl border border-border/70 bg-card/60 transition-all shadow-sm",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `relative w-full overflow-hidden bg-secondary/70 flex items-center justify-center ${aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"}`,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-8 w-8 text-muted-foreground/30 animate-pulse" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 143,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-4 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-4 w-5/6 rounded bg-muted/70 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3.5 w-3/5 rounded bg-muted/50 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between pt-2 border-t border-border/40",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3.5 w-24 rounded bg-muted/50 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-6 w-6 rounded bg-muted/60 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-6 w-6 rounded bg-muted/60 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 160,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 158,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 152,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 139,
		columnNumber: 5
	}, this);
}
function VideoGridSkeleton({ count = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoCardSkeleton, { aspectRatio: i === 1 ? "9:16" : "16:9" }, i, false, {
			fileName: _jsxFileName,
			lineNumber: 174,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 172,
		columnNumber: 5
	}, this);
}
//#endregion
export { checkVideo as a, listVideos as c, VideoGridSkeleton as i, useServerFn as l, VideoDisplayCard as n, createVideo as o, VideoGenerationSkeleton as r, deleteVideo as s, DashboardLayout as t };
