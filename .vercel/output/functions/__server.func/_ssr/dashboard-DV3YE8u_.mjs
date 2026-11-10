import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { M as Coins, T as Film, h as Plus, l as Sparkles, r as WandSparkles } from "../_libs/lucide-react.mjs";
import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Ca2bkLew.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D7S8gpag.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { c as listVideos, i as VideoGridSkeleton, l as useServerFn, n as VideoDisplayCard, s as deleteVideo, t as DashboardLayout } from "./VideoSkeleton-Dartvupp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DV3YE8u_.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var getSubscription = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ec7fe4a8b2b9ff69ad2c3d59bb9e5d5d6bad4e50214747b74eaabd1b0f0df398"));
createServerFn({ method: "POST" }).inputValidator((d) => objectType({ packageId: stringType() }).parse(d)).middleware([requireSupabaseAuth]).handler(createSsrRpc("34d05492e4615b9fdc4b76676803f4b9d476a6f4d7696fa5361827cb3ab122ea"));
var _jsxFileName = "/app/applet/src/routes/_authenticated/dashboard.tsx?tsr-split=component";
function Dashboard() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const list = useServerFn(listVideos);
	const getSub = useServerFn(getSubscription);
	const remove = useServerFn(deleteVideo);
	const videos = useQuery({
		queryKey: ["videos"],
		queryFn: () => list()
	});
	const sub = useQuery({
		queryKey: ["subscription"],
		queryFn: () => getSub()
	});
	const handleDelete = async (id) => {
		await remove({ data: { id } });
		qc.invalidateQueries({ queryKey: ["videos"] });
	};
	const handleRemix = (v) => {
		navigate({ to: "/studio" });
	};
	const completedVideos = (videos.data ?? []).filter((v) => v.status === "completed" || !v.status && v.url);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-5xl mx-auto space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-extrabold tracking-tight md:text-4xl",
					children: "Studio Dashboard"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-sky",
					children: "Manage your generated AI movies, credits, and exports."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/studio",
					className: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow hover:brightness-110 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "New Video" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-muted-foreground text-xs font-semibold uppercase tracking-wider",
								children: "Video Credits"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold mt-1 text-foreground",
								children: sub.data?.credits_remaining ?? 10
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 60,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "1 credit per 5s HD movie"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Coins, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-muted-foreground text-xs font-semibold uppercase tracking-wider",
								children: "Subscription Plan"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold mt-1 capitalize text-foreground",
								children: sub.data?.plan ?? "Free"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/pricing",
								className: "text-[11px] text-primary hover:underline mt-1 block",
								children: "Upgrade plan →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 78,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-muted-foreground text-xs font-semibold uppercase tracking-wider",
								children: "Total Generated"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold mt-1 text-foreground",
								children: videos.data?.length ?? 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Movies in your library"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-border/80 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-5 w-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Recent Generated Outputs" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/studio",
						className: "text-xs font-semibold text-primary hover:underline",
						children: "Open Studio →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 11
				}, this), videos.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoGridSkeleton, { count: 3 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 31
				}, this) : !completedVideos.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border-2 border-dashed border-border/80 p-10 text-center bg-card/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "mx-auto h-10 w-10 text-muted-foreground/40 mb-2" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-semibold text-foreground",
							children: "No videos in your library yet"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1 max-w-sm mx-auto",
							children: "Generate your first video in the studio to start building your film catalog."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/studio",
							className: "mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow hover:brightness-110 transition",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 17
							}, this), " Go to Studio"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 91
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: completedVideos.slice(0, 6).map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VideoDisplayCard, {
						video: v,
						onDelete: handleDelete,
						onRemix: handleRemix
					}, v.id, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 60
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 22
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 41,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 10
	}, this);
}
//#endregion
export { Dashboard as component };
