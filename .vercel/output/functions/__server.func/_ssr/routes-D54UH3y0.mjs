import { o as __toESM } from "../_runtime.mjs";
import { a as AccordionTrigger$1, c as require_react, i as AccordionItem$1, n as AccordionContent$1, r as AccordionHeader, t as Accordion$1 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { E as CircleCheck, O as ChevronDown, S as Download, T as CircleQuestionMark, _ as LoaderCircle, c as Sparkles, d as RefreshCw, f as Play, i as Volume2, k as ArrowRight, l as ShieldCheck, o as Type, r as VolumeX, t as Zap, v as ImagePlus, w as Coins, y as Film } from "../_libs/lucide-react.mjs";
import { n as SiteHeader } from "./SiteHeader-z2rhPKwV.mjs";
import { t as SiteFooter } from "./SiteFooter-4x4kPuTS.mjs";
import { n as hero_scene_default, t as animated_thumb_default } from "./animated-thumb-CZ8fUfHo.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D54UH3y0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$3 = "/app/applet/src/components/ui/accordion.tsx";
var Accordion = Accordion$1;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem$1, {
	ref,
	className: cn("border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 13,
	columnNumber: 3
}, void 0));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionHeader, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger$1, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 31,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 22,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
AccordionTrigger.displayName = AccordionTrigger$1.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent$1, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("pb-4 pt-0", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 46,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 41,
	columnNumber: 3
}, void 0));
AccordionContent.displayName = AccordionContent$1.displayName;
var _jsxFileName$2 = "/app/applet/src/components/FAQSection.tsx";
var FAQ_ITEMS = [
	{
		id: "credits-how-they-work",
		question: "How do credits work in Ogra AI?",
		answer: "Every video generation consumes 1 credit. Each credit generates a full 5-second cinematic movie clip in your choice of realistic or animated style, complete with AI-scripted scenes, camera motion, and synced character speech dialogue."
	},
	{
		id: "quota-and-refunds",
		question: "What happens if a generation fails or the GPU quota is reached?",
		answer: "Your credits are completely safe. If a generation fails for any reason—including temporary Hugging Face ZeroGPU quota limits or server capacity—our backend automatically detects the failure and immediately refunds the credit back to your account balance. We never charge for failed generations."
	},
	{
		id: "top-up-credits",
		question: "Can I buy additional credits without changing my monthly plan?",
		answer: "Yes! You can top up anytime with on-demand credit packs: 3 credits for $1.99, 8 credits for $3.99, or 20 credits for $7.99. Purchased top-up credits never expire and are tracked separately from your monthly subscription quota."
	},
	{
		id: "monthly-rollover",
		question: "Do monthly subscription credits roll over to the next month?",
		answer: "Plan credits reset on your monthly billing date (2 credits for Free, 8 for Creator, and 20 for Pro). On-demand purchased top-up credits do not expire and remain in your account until you use them."
	},
	{
		id: "usage-limits-and-queues",
		question: "What are the GPU usage limits between Free, Creator, and Pro tiers?",
		answer: "Free users utilize standard shared GPU queues with fair-use daily caps. Creator and Pro subscribers enjoy priority processing queues, higher concurrent rendering throughput, and bypass the free-tier wait times during peak hours."
	},
	{
		id: "watermark-and-hd",
		question: "Are videos watermarked, and what video quality can I export?",
		answer: "Free accounts include a subtle Ogra watermark. Creator ($4.99/mo) and Pro ($9.99/mo) plans unlock full 1080p HD exports without any watermarks, formatted for TikTok, Instagram Reels, and YouTube Shorts in both 16:9 and 9:16 aspect ratios."
	},
	{
		id: "subscription-cancellation",
		question: "Can I cancel or switch plans at any time?",
		answer: "Yes, you have full control over your subscription with zero lock-in. You can upgrade, downgrade, or cancel directly from your Subscription settings in the dashboard at any time."
	}
];
function FAQSection() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "faq",
		className: "mt-28 scroll-mt-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 60,
								columnNumber: 13
							}, this), " FREQUENTLY ASKED QUESTIONS"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 59,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl",
							children: ["Credits, Pricing & ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-primary",
								children: "Usage Limits"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 63,
								columnNumber: 36
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 62,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-base text-muted-foreground sm:text-lg",
							children: "Everything you need to know about our credit system, ZeroGPU processing, and subscriptions."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 65,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 58,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 75,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 74,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground",
								children: "Auto-Refund Guarantee"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 78,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Credits refunded if jobs fail"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 79,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 77,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 73,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 85,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 84,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground",
								children: "Priority ZeroGPU"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 88,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Faster rendering on paid tiers"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 89,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 87,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 83,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 95,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 94,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground",
								children: "Never-Expiring Top-ups"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 98,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Extra credit packs stay forever"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 99,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 97,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 93,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 72,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card/30 p-6 sm:p-8 shadow-frame",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
						type: "single",
						collapsible: true,
						className: "w-full space-y-3",
						children: FAQ_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
							value: item.id,
							className: "rounded-2xl border border-border bg-secondary/20 px-5 py-1 transition-colors data-[state=open]:border-primary/50 data-[state=open]:bg-secondary/40",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
								className: "text-base font-semibold text-foreground hover:text-primary hover:no-underline sm:text-lg",
								children: item.question
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 113,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
								className: "pt-2 pb-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
								children: item.answer
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 116,
								columnNumber: 17
							}, this)]
						}, item.id, true, {
							fileName: _jsxFileName$2,
							lineNumber: 108,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 106,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 105,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 57,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/OgraLiveDashboardDemo.tsx";
function OgraLiveDashboardDemo() {
	const [mode, setMode] = (0, import_react.useState)("text");
	const [prompt, setPrompt] = (0, import_react.useState)("A young woman in a red headwrap walks through a village at golden sunset, drums in the distance…");
	const [aspect, setAspect] = (0, import_react.useState)("16:9");
	const [style, setStyle] = (0, import_react.useState)("realistic");
	const [status, setStatus] = (0, import_react.useState)("completed");
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isMuted, setIsMuted] = (0, import_react.useState)(true);
	const [progress, setProgress] = (0, import_react.useState)(100);
	const videoRef = (0, import_react.useRef)(null);
	const startGenerationSimulation = () => {
		setStatus("script");
		setProgress(20);
		setIsPlaying(false);
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
		setTimeout(() => {
			setStatus("scenes");
			setProgress(55);
		}, 1400);
		setTimeout(() => {
			setStatus("assembling");
			setProgress(85);
		}, 2800);
		setTimeout(() => {
			setStatus("completed");
			setProgress(100);
			if (videoRef.current) {
				videoRef.current.play().catch(() => {});
				setIsPlaying(true);
			}
		}, 4200);
	};
	const togglePlay = () => {
		const v = videoRef.current;
		if (!v) return;
		if (v.paused) v.play().then(() => setIsPlaying(true)).catch(() => {});
		else {
			v.pause();
			setIsPlaying(false);
		}
	};
	const toggleMute = () => {
		const v = videoRef.current;
		if (!v) return;
		v.muted = !v.muted;
		setIsMuted(v.muted);
	};
	const isGenerating = status !== "idle" && status !== "completed";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mt-20 scroll-mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center max-w-2xl mx-auto px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 92,
						columnNumber: 11
					}, this), " LIVE STUDIO DEMO"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 91,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl",
					children: [
						"See Your Story ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", { className: "hidden sm:inline" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 95,
							columnNumber: 26
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-primary",
							children: "Come to Life."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 96,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 94,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-base text-muted-foreground sm:text-lg",
					children: "Experience the real OGRA AI Studio dashboard in action. Try changing prompts, styles, or click Generate to watch live generation."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 98,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 90,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-6 w-full mx-auto max-w-lg",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[2.5rem] border-2 border-primary bg-[#08080d] p-5 sm:p-7 shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex rounded-full bg-[#161622] p-1 border border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setMode("text"),
								className: `flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${mode === "text" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Type, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 120,
									columnNumber: 17
								}, this), " Text to Video"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 111,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setMode("image"),
								className: `flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${mode === "image" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImagePlus, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 131,
									columnNumber: 17
								}, this), " Image to Video"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 122,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 110,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 rounded-2xl border border-border/80 bg-[#101018] p-4 transition focus-within:border-primary/80",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								value: prompt,
								onChange: (e) => setPrompt(e.target.value),
								rows: 4,
								maxLength: 2e3,
								placeholder: "A young woman in a red headwrap walks through a village at golden sunset, drums in the distance…",
								className: "w-full resize-none bg-transparent text-sm sm:text-base leading-relaxed text-foreground placeholder-muted-foreground/70 outline-none"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 137,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 136,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Format"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 149,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setAspect("16:9"),
									className: `rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${aspect === "16:9" ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`,
									children: "16:9 YouTube"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 150,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setAspect("9:16"),
									className: `rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${aspect === "9:16" ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`,
									children: "9:16 TikTok/Reels"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 161,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 148,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 grid grid-cols-2 gap-3 sm:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setStyle("realistic"),
								className: `group relative rounded-2xl p-2.5 text-left transition border-2 ${style === "realistic" ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 bg-[#12121c] hover:border-muted-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative overflow-hidden rounded-xl aspect-[16/10]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: hero_scene_default,
										alt: "Realistic Movie",
										className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 187,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${style === "realistic" ? "border-white bg-primary" : "border-white/90 bg-black/40"}`,
										children: style === "realistic" && /* @__PURE__ */ (void 0)("span", { className: "h-2 w-2 rounded-full bg-white" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 200,
											columnNumber: 47
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 193,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 186,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-3 text-center text-xs sm:text-sm font-bold text-foreground",
									children: "Realistic Movie"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 203,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 177,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setStyle("animated"),
								className: `group relative rounded-2xl p-2.5 text-left transition border-2 ${style === "animated" ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 bg-[#12121c] hover:border-muted-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative overflow-hidden rounded-xl aspect-[16/10]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: animated_thumb_default,
										alt: "Animated Story",
										className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 219,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${style === "animated" ? "border-white bg-primary" : "border-white/90 bg-black/40"}`,
										children: style === "animated" && /* @__PURE__ */ (void 0)("span", { className: "h-2 w-2 rounded-full bg-white" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 232,
											columnNumber: 46
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 225,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 218,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-3 text-center text-xs sm:text-sm font-bold text-foreground",
									children: "Animated Story"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 235,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 209,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 175,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: startGenerationSimulation,
							disabled: isGenerating,
							className: "mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-base sm:text-lg font-bold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.99] disabled:opacity-75",
							children: isGenerating ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 250,
									columnNumber: 19
								}, this),
								"Generating Video (",
								progress,
								"%)…"
							] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 249,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 255,
								columnNumber: 19
							}, this), "Generate Video"] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 254,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 242,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 108,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 107,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-6 w-full mx-auto max-w-lg",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[2.5rem] border-2 border-border bg-[#08080d] p-5 sm:p-7 shadow-frame flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between pb-4 border-b border-border/80 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "relative flex h-3 w-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isGenerating ? "bg-primary" : "bg-emerald-400"}` }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 270,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `relative inline-flex rounded-full h-3 w-3 ${isGenerating ? "bg-primary" : "bg-emerald-500"}` }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 275,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 269,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-bold tracking-wide text-foreground uppercase",
									children: [
										status === "script" && "Writing Script with Gemini 3 Flash Preview…",
										status === "scenes" && "Rendering ZeroGPU Frame Sequence…",
										status === "assembling" && "Multiplexing Audio & Speech…",
										status === "completed" && "Generation Ready (1080p)"
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 281,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 268,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-secondary px-2.5 py-1 text-[11px] font-mono text-muted-foreground border border-border",
								children: aspect === "16:9" ? "16:9 Cinema" : "9:16 Vertical"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 289,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 267,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 relative overflow-hidden rounded-2xl border border-border/80 bg-black aspect-video flex items-center justify-center group",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
									ref: videoRef,
									src: "/assets/aistudio/1793337072274_5813fd6c.mp4",
									playsInline: true,
									loop: true,
									muted: isMuted,
									title: "AI generated video demo",
									"aria-label": "AI generated video demo",
									className: "h-full w-full object-cover cursor-pointer",
									onClick: togglePlay
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 296,
									columnNumber: 15
								}, this),
								isGenerating && /* @__PURE__ */ (void 0)("div", {
									className: "absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 p-6 backdrop-blur-sm text-center",
									children: [
										/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary mb-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 311,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-sm font-bold text-foreground",
											children: [
												status === "script" && "Directing Scene 1 with Gemini 3 Flash Preview…",
												status === "scenes" && "Synthesizing 5s Video with LTX Engine…",
												status === "assembling" && "Mastering 1080p HD Video Output…"
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 312,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "w-48 h-2 rounded-full bg-secondary mt-3 overflow-hidden",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "h-full bg-primary transition-all duration-300",
												style: { width: `${progress}%` }
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 318,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 317,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-xs text-muted-foreground mt-2 font-mono",
											children: "ZeroGPU Queue: Active"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 323,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 310,
									columnNumber: 17
								}, this),
								!isGenerating && !isPlaying && /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: togglePlay,
									"aria-label": "Play demo video",
									className: "absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition hover:scale-110 hover:bg-primary",
									children: /* @__PURE__ */ (void 0)(Play, { className: "h-7 w-7 translate-x-0.5 fill-current" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 337,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 331,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur border border-primary/30",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 343,
										columnNumber: 17
									}, this), " OGRA AI ENGINE"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 342,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: toggleMute,
									"aria-label": "Toggle mute",
									className: "absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/90 transition",
									children: isMuted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VolumeX, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 353,
										columnNumber: 28
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Volume2, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 353,
										columnNumber: 62
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 347,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 295,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-semibold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 361,
										columnNumber: 19
									}, this), " Generated Scenes"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 360,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px]",
									children: "Duration: 5.0s"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 363,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 359,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-2 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-primary/50 bg-secondary/30 p-2 flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-border",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: hero_scene_default,
											alt: "Scene 1",
											className: "h-full w-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 368,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 367,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-bold text-foreground",
											children: "Scene 1"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 371,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-muted-foreground text-[10px]",
											children: "0:00 - 0:05"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 372,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 370,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 366,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/60 bg-secondary/20 p-2 flex items-center gap-2.5 opacity-80",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-border",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: animated_thumb_default,
											alt: "Scene 2",
											className: "h-full w-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 378,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 377,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-bold text-foreground",
											children: "Scene 2"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 381,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-muted-foreground text-[10px]",
											children: "0:05 - 0:10"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 382,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 380,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 376,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 365,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 358,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-5 pt-4 border-t border-border/80 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: startGenerationSimulation,
								className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 395,
									columnNumber: 17
								}, this), " Re-generate"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 390,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: "/assets/aistudio/1793337072274_5813fd6c.mp4",
								download: "ogra-demo.mp4",
								className: "inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 403,
									columnNumber: 17
								}, this), " Download 1080p"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 398,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 389,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 265,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 264,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 105,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 88,
		columnNumber: 5
	}, this);
}
var avatars_default = "/assets/avatars-Dt4qD8nd.jpg";
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function TikTok() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "h-12 w-12",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.2v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 13,
		columnNumber: 10
	}, this);
}
function Instagram() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "h-11 w-11",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "5"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "17.5",
				cy: "6.5",
				r: "1",
				fill: "currentColor"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 10
	}, this);
}
function Facebook() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "h-12 w-12",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 26,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 10
	}, this);
}
function YouTube() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "h-12 w-14",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 10
	}, this);
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "mx-auto max-w-5xl px-5 pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "pt-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-[clamp(3rem,10vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight",
								children: [
									"Your Stories.",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 54,
										columnNumber: 13
									}, this),
									"Our AI.",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 56,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-primary",
										children: "African Movies."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mx-auto mt-8 max-w-xl text-xl text-sky md:text-2xl",
								children: "Turn your ideas into realistic AI movies and animated stories in minutes."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/studio",
								className: "mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-12 py-5 text-xl font-semibold text-primary-foreground shadow-glow transition hover:brightness-110",
								children: ["Create Your Story Free ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 63,
									columnNumber: 36
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-14 flex flex-wrap items-center justify-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex -space-x-4",
									children: [
										0,
										33.33,
										66.66,
										100
									].map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										role: "img",
										"aria-label": "User avatar",
										className: "h-20 w-20 rounded-full border-2 border-foreground bg-no-repeat",
										style: {
											backgroundImage: `url(${avatars_default})`,
											backgroundSize: "400% 100%",
											backgroundPosition: `${x}% 30%`
										}
									}, x, false, {
										fileName: _jsxFileName,
										lineNumber: 68,
										columnNumber: 48
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 67,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-2xl text-sky",
									children: "Made for African storytellers"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 74,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-14 text-sm font-semibold tracking-[0.3em] text-sky",
								children: "EXPORT TO"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 flex items-center justify-center gap-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TikTok, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 79,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Instagram, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Facebook, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 81,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YouTube, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 82,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 78,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OgraLiveDashboardDemo, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "mt-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-center text-4xl font-extrabold tracking-tight",
								children: ["Simple Pricing. ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "Incredible Stories."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 29
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-center text-lg text-muted-foreground",
								children: "Start creating for free. Upgrade when you're ready."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-12 grid gap-8 md:grid-cols-3",
								children: [
									{
										name: "FREE",
										price: "$0",
										features: [
											"2 monthly credits",
											"Watermarked videos",
											"Limited generation options",
											"Standard queue"
										]
									},
									{
										name: "CREATOR",
										price: "$4.99",
										popular: true,
										features: [
											"8 monthly credits",
											"Realistic Movie",
											"Animated Story",
											"Character dialogue",
											"HD exports",
											"No watermark"
										]
									},
									{
										name: "PRO",
										price: "$9.99",
										features: [
											"20 monthly credits",
											"Everything in Creator",
											"Priority generation queue",
											"No watermark"
										]
									}
								].map((plan) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `relative rounded-3xl border ${plan.popular ? "border-primary" : "border-border"} bg-secondary/30 p-8`,
									children: [
										plan.popular && /* @__PURE__ */ (void 0)("span", {
											className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground",
											children: "MOST POPULAR"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 112,
											columnNumber: 34
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "text-sm font-bold tracking-widest text-muted-foreground",
											children: plan.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 115,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-2 text-4xl font-extrabold",
											children: [plan.price, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-lg font-medium text-muted-foreground",
												children: "/month"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 120,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 118,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
											className: "mt-6 space-y-3",
											children: plan.features.map((feat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
												className: "flex items-center gap-2 text-sm text-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-primary",
														children: "✓"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 124,
														columnNumber: 23
													}, this),
													" ",
													feat
												]
											}, feat, true, {
												fileName: _jsxFileName,
												lineNumber: 123,
												columnNumber: 46
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 122,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/studio",
											className: `mt-8 block text-center w-full rounded-full border py-3 font-semibold transition ${plan.popular ? "bg-primary border-primary text-primary-foreground hover:brightness-110 shadow-glow" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`,
											children: ["Choose ", plan.name]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 127,
											columnNumber: 17
										}, this)
									]
								}, plan.name, true, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 26
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-10 rounded-3xl border border-border bg-card/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-frame",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xl font-bold tracking-tight text-foreground",
									children: "Need more credits?"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Top up anytime. Extra credits never expire."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto",
									children: [
										{
											count: "3 Credits",
											price: "$1.99"
										},
										{
											count: "8 Credits",
											price: "$3.99"
										},
										{
											count: "20 Credits",
											price: "$7.99"
										}
									].map((pack) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/studio",
										className: "flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 px-5 py-3 transition hover:border-primary/60 hover:bg-secondary/80 group",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary group-hover:scale-105 transition-transform",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Coins, { className: "h-5 w-5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 155,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-sm font-semibold text-foreground",
											children: pack.count
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 158,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-xs font-bold text-primary",
											children: pack.price
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 159,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 157,
											columnNumber: 19
										}, this)]
									}, pack.count, true, {
										fileName: _jsxFileName,
										lineNumber: 153,
										columnNumber: 28
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FAQSection, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteFooter, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
