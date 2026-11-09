import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B8Bq90Zz.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B8wpWlYi.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { a as listVideos, o as useServerFn, t as DashboardLayout } from "./DashboardLayout-BnPty0TI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DleTGDlV.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var getSubscription = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ec7fe4a8b2b9ff69ad2c3d59bb9e5d5d6bad4e50214747b74eaabd1b0f0df398"));
createServerFn({ method: "POST" }).inputValidator((d) => objectType({ packageId: stringType() }).parse(d)).middleware([requireSupabaseAuth]).handler(createSsrRpc("34d05492e4615b9fdc4b76676803f4b9d476a6f4d7696fa5361827cb3ab122ea"));
var _jsxFileName = "/app/applet/src/routes/_authenticated/dashboard.tsx?tsr-split=component";
function Dashboard() {
	const list = useServerFn(listVideos);
	const getSub = useServerFn(getSubscription);
	const videos = useQuery({
		queryKey: ["videos"],
		queryFn: () => list()
	});
	const sub = useQuery({
		queryKey: ["subscription"],
		queryFn: () => getSub()
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold mb-8",
			children: "Dashboard"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card p-6 rounded-2xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-muted-foreground text-sm font-medium",
					children: "Credit Balance"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-4xl font-bold mt-2",
					children: sub.data?.credits_remaining ?? 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card p-6 rounded-2xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-muted-foreground text-sm font-medium",
					children: "Subscription Plan"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-4xl font-bold mt-2 capitalize",
					children: sub.data?.plan ?? "Free"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-xl font-bold mb-4",
			children: "Recent Videos"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this),
		videos.data && videos.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4",
			children: videos.data.map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card p-4 rounded-xl border border-border hover:border-primary transition",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-medium truncate",
					children: v.prompt
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground capitalize mt-1",
					children: v.status
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 15
				}, this)]
			}, v.id, true, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 40
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 32,
			columnNumber: 48
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-muted-foreground",
			children: "No videos generated yet."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 18
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { Dashboard as component };
