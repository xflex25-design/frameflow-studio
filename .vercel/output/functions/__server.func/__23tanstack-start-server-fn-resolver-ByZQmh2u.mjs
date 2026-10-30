//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-ByZQmh2u.js
var manifest = {
  "0146e7d5e058792a619ef9ec07f881d65da0fb0ce63df277906113d92bda9ee1": {
    functionName: "listVideos_createServerFn_handler",
    importer: () => import("./_ssr/video.functions-DqePX1mN.mjs"),
  },
  "2935a5c0f9fc1d69530cd96b54b8f629c69635fbc881df36821bc1a4daffad83": {
    functionName: "deleteVideo_createServerFn_handler",
    importer: () => import("./_ssr/video.functions-DqePX1mN.mjs"),
  },
  "34d05492e4615b9fdc4b76676803f4b9d476a6f4d7696fa5361827cb3ab122ea": {
    functionName: "purchaseCredits_createServerFn_handler",
    importer: () => import("./_ssr/pricing-B7z0nyhv.mjs"),
  },
  a1ccc1094d7d2d50c63da10d7f04473fc946419f17bd92ecf769f9826e89ae82: {
    functionName: "createVideo_createServerFn_handler",
    importer: () => import("./_ssr/video.functions-DqePX1mN.mjs"),
  },
  ec7fe4a8b2b9ff69ad2c3d59bb9e5d5d6bad4e50214747b74eaabd1b0f0df398: {
    functionName: "getSubscription_createServerFn_handler",
    importer: () => import("./_ssr/pricing-B7z0nyhv.mjs"),
  },
  f9a3093a93cfa2d1a26b1a5ba68d8c87189bfc38792bd295935c0067d4fc9e46: {
    functionName: "checkVideo_createServerFn_handler",
    importer: () => import("./_ssr/video.functions-DqePX1mN.mjs"),
  },
};
async function getServerFnById(id, access) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) throw new Error("Server function info not found for " + id);
  const fnModule = (serverFnInfo.module ??= await serverFnInfo.importer());
  if (!fnModule) throw new Error("Server function module not resolved for " + id);
  const action = fnModule[serverFnInfo.functionName];
  if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
  return action;
}
//#endregion
export { getServerFnById as t };
