import { a as TSS_SERVER_FUNCTION } from "./createServerFn-BhqelEmK.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DXuRKs2s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-D5aUF03y.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createSsrRpc as t };
