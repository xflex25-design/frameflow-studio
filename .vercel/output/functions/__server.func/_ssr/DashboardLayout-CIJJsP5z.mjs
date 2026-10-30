import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import {
  W as isRedirect,
  x as useRouter,
  y as Link,
} from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import {
  _ as Film,
  a as User,
  c as Sparkles,
  m as LogOut,
  n as X,
  p as Menu,
  u as Settings,
  y as CreditCard,
} from "../_libs/lucide-react.mjs";
import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CMevzYJH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CKuiS4a6.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardLayout-CIJJsP5z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useServerFn(serverFn) {
  const router = useRouter();
  return import_react.useCallback(
    async (...args) => {
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
    },
    [router, serverFn],
  );
}
new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});
var createSchema = objectType({
  prompt: stringType().trim().min(3).max(2e3),
  style: enumType(["realistic", "animated"]),
  aspectRatio: enumType(["16:9", "9:16"]),
  image: objectType({
    data: stringType().max(1e7),
    mimeType: enumType(["image/png", "image/jpeg", "image/webp"]),
  }).nullable(),
});
var createVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => createSchema.parse(d))
  .handler(createSsrRpc("a1ccc1094d7d2d50c63da10d7f04473fc946419f17bd92ecf769f9826e89ae82"));
var checkVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d))
  .handler(createSsrRpc("f9a3093a93cfa2d1a26b1a5ba68d8c87189bfc38792bd295935c0067d4fc9e46"));
var listVideos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(createSsrRpc("0146e7d5e058792a619ef9ec07f881d65da0fb0ce63df277906113d92bda9ee1"));
var deleteVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d))
  .handler(createSsrRpc("2935a5c0f9fc1d69530cd96b54b8f629c69635fbc881df36821bc1a4daffad83"));
var _jsxFileName$1 = "/app/applet/src/components/SidebarNavigation.tsx";
function SidebarNavigation() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "nav",
    {
      className: "space-y-2 flex-1",
      children: [
        {
          icon: Sparkles,
          label: "Generation",
          to: "/studio",
        },
        {
          icon: Film,
          label: "History",
          to: "/dashboard",
        },
        {
          icon: CreditCard,
          label: "Subscription",
          to: "/dashboard",
        },
        {
          icon: Settings,
          label: "Settings",
          to: "/studio",
        },
      ].map((item) =>
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: item.to,
            className:
              "flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200",
            activeProps: {
              className:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-glow",
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                item.icon,
                { className: "h-5 w-5" },
                void 0,
                false,
                {
                  fileName: _jsxFileName$1,
                  lineNumber: 24,
                  columnNumber: 11,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "span",
                {
                  className: "font-medium",
                  children: item.label,
                },
                void 0,
                false,
                {
                  fileName: _jsxFileName$1,
                  lineNumber: 25,
                  columnNumber: 11,
                },
                this,
              ),
            ],
          },
          item.label,
          true,
          {
            fileName: _jsxFileName$1,
            lineNumber: 15,
            columnNumber: 9,
          },
          this,
        ),
      ),
    },
    void 0,
    false,
    {
      fileName: _jsxFileName$1,
      lineNumber: 13,
      columnNumber: 5,
    },
    this,
  );
}
var _jsxFileName = "/app/applet/src/components/DashboardLayout.tsx";
function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      className: "flex min-h-screen bg-background",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className:
              "lg:hidden fixed top-0 left-0 right-0 p-4 bg-background border-b border-border flex justify-between items-center z-40",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "flex items-center gap-2 font-bold text-primary",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      Film,
                      { className: "h-6 w-6" },
                      void 0,
                      false,
                      {
                        fileName: _jsxFileName,
                        lineNumber: 13,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "span",
                      {
                        className: "text-xl tracking-tighter",
                        children: "OGRA AI",
                      },
                      void 0,
                      false,
                      {
                        fileName: _jsxFileName,
                        lineNumber: 14,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: _jsxFileName,
                  lineNumber: 12,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "button",
                {
                  onClick: () => setIsOpen(!isOpen),
                  className: "p-2 text-foreground",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    Menu,
                    { className: "h-6 w-6" },
                    void 0,
                    false,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 17,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName: _jsxFileName,
                  lineNumber: 16,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: _jsxFileName,
            lineNumber: 11,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "aside",
          {
            className: `fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "flex justify-between items-center mb-12",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        className: "flex items-center gap-3 font-bold text-primary px-2",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            Film,
                            { className: "h-8 w-8" },
                            void 0,
                            false,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 27,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "span",
                            {
                              className: "text-2xl tracking-tighter",
                              children: "OGRA AI",
                            },
                            void 0,
                            false,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 28,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: _jsxFileName,
                        lineNumber: 26,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "button",
                      {
                        onClick: () => setIsOpen(false),
                        className: "lg:hidden p-2 text-foreground",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          X,
                          { className: "h-6 w-6" },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 31,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName: _jsxFileName,
                        lineNumber: 30,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: _jsxFileName,
                  lineNumber: 25,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  onClick: () => setIsOpen(false),
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    SidebarNavigation,
                    {},
                    void 0,
                    false,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 36,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName: _jsxFileName,
                  lineNumber: 35,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "pt-6 border-t border-border mt-auto",
                  onClick: () => setIsOpen(false),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        className:
                          "flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary transition cursor-pointer",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            User,
                            { className: "h-5 w-5" },
                            void 0,
                            false,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 41,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "span",
                            {
                              className: "font-medium",
                              children: "Account",
                            },
                            void 0,
                            false,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 42,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: _jsxFileName,
                        lineNumber: 40,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        className:
                          "flex items-center gap-3 px-4 py-3 text-red-500/80 hover:text-red-500 transition cursor-pointer",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            LogOut,
                            { className: "h-5 w-5" },
                            void 0,
                            false,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 45,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "span",
                            {
                              className: "font-medium",
                              children: "Sign Out",
                            },
                            void 0,
                            false,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 46,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: _jsxFileName,
                        lineNumber: 44,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: _jsxFileName,
                  lineNumber: 39,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: _jsxFileName,
            lineNumber: 22,
            columnNumber: 7,
          },
          this,
        ),
        isOpen &&
          /* @__PURE__ */ (void 0)(
            "div",
            {
              className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
              onClick: () => setIsOpen(false),
            },
            void 0,
            false,
            {
              fileName: _jsxFileName,
              lineNumber: 53,
              columnNumber: 9,
            },
            this,
          ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "main",
          {
            className: "flex-1 overflow-y-auto mt-16 lg:mt-0",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "div",
              {
                className: "max-w-7xl mx-auto p-4 md:p-8 lg:p-12",
                children,
              },
              void 0,
              false,
              {
                fileName: _jsxFileName,
                lineNumber: 61,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: _jsxFileName,
            lineNumber: 60,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5,
    },
    this,
  );
}
//#endregion
export {
  listVideos as a,
  deleteVideo as i,
  checkVideo as n,
  useServerFn as o,
  createVideo as r,
  DashboardLayout as t,
};
