import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-ltuHj2dN.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { T as ArrowRight, m as LogOut, p as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteHeader-CJ9hWYXn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/SiteHeader.tsx";
function Logo() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Link,
    {
      to: "/",
      className: "flex items-center gap-3",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "svg",
          {
            viewBox: "0 0 48 48",
            className: "h-11 w-11 text-foreground",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "3",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "path",
                {
                  d: "M24 8c3-4 9-4 11 0 5-1 9 3 8 8 4 2 4 9 0 11 1 5-3 9-8 8-2 4-8 4-11 0-3 4-9 4-11 0-5 1-9-3-8-8-4-2-4-9 0-11-1-5 3-9 8-8 2-4 8-4 11 0z",
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
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "circle",
                {
                  cx: "19",
                  cy: "23",
                  r: "3.2",
                },
                void 0,
                false,
                {
                  fileName: _jsxFileName,
                  lineNumber: 17,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "circle",
                {
                  cx: "29",
                  cy: "23",
                  r: "3.2",
                },
                void 0,
                false,
                {
                  fileName: _jsxFileName,
                  lineNumber: 18,
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
            lineNumber: 9,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "span",
          {
            className: "text-2xl font-bold tracking-tight",
            children: "Ogra AI",
          },
          void 0,
          false,
          {
            fileName: _jsxFileName,
            lineNumber: 20,
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
      lineNumber: 8,
      columnNumber: 5,
    },
    this,
  );
}
function SiteHeader() {
  const [email, setEmail] = (0, import_react.useState)(null);
  const [open, setOpen] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => data.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "header",
    {
      className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "div",
        {
          className: "mx-auto flex h-20 max-w-6xl items-center justify-between px-5",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              Logo,
              {},
              void 0,
              false,
              {
                fileName: _jsxFileName,
                lineNumber: 37,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "div",
              {
                className: "flex items-center gap-5",
                children: [
                  email
                    ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        Link,
                        {
                          to: "/studio",
                          className:
                            "flex items-center gap-2 text-lg font-medium hover:text-primary",
                          children: [
                            "Studio ",
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              ArrowRight,
                              { className: "h-5 w-5" },
                              void 0,
                              false,
                              {
                                fileName: _jsxFileName,
                                lineNumber: 44,
                                columnNumber: 22,
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
                          columnNumber: 13,
                        },
                        this,
                      )
                    : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        Link,
                        {
                          to: "/auth",
                          className:
                            "flex items-center gap-2 text-lg font-medium hover:text-primary",
                          children: [
                            "Sign In ",
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              ArrowRight,
                              { className: "h-5 w-5" },
                              void 0,
                              false,
                              {
                                fileName: _jsxFileName,
                                lineNumber: 51,
                                columnNumber: 23,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: _jsxFileName,
                          lineNumber: 47,
                          columnNumber: 13,
                        },
                        this,
                      ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "div",
                    {
                      className: "relative",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "button",
                          {
                            "aria-label": "Menu",
                            onClick: () => setOpen((o) => !o),
                            className: "p-1",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              Menu,
                              { className: "h-8 w-8" },
                              void 0,
                              false,
                              {
                                fileName: _jsxFileName,
                                lineNumber: 56,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 55,
                            columnNumber: 13,
                          },
                          this,
                        ),
                        open &&
                          /* @__PURE__ */ (void 0)(
                            "div",
                            {
                              className:
                                "absolute right-0 mt-3 w-56 rounded-xl border border-border bg-card p-2 shadow-glow",
                              children: [
                                /* @__PURE__ */ (void 0)(
                                  Link,
                                  {
                                    to: "/",
                                    className: "block rounded-lg px-3 py-2 hover:bg-accent",
                                    onClick: () => setOpen(false),
                                    children: "Home",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: _jsxFileName,
                                    lineNumber: 60,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                /* @__PURE__ */ (void 0)(
                                  Link,
                                  {
                                    to: "/studio",
                                    className: "block rounded-lg px-3 py-2 hover:bg-accent",
                                    onClick: () => setOpen(false),
                                    children: "Create video",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: _jsxFileName,
                                    lineNumber: 67,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                email
                                  ? /* @__PURE__ */ (void 0)(
                                      "button",
                                      {
                                        className:
                                          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-accent",
                                        onClick: async () => {
                                          await supabase.auth.signOut();
                                          setOpen(false);
                                          window.location.href = "/";
                                        },
                                        children: [
                                          /* @__PURE__ */ (void 0)(
                                            LogOut,
                                            { className: "h-4 w-4" },
                                            void 0,
                                            false,
                                            {
                                              fileName: _jsxFileName,
                                              lineNumber: 83,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                          " Sign out",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName: _jsxFileName,
                                        lineNumber: 75,
                                        columnNumber: 19,
                                      },
                                      this,
                                    )
                                  : /* @__PURE__ */ (void 0)(
                                      Link,
                                      {
                                        to: "/auth",
                                        className: "block rounded-lg px-3 py-2 hover:bg-accent",
                                        onClick: () => setOpen(false),
                                        children: "Sign in",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: _jsxFileName,
                                        lineNumber: 86,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 59,
                              columnNumber: 15,
                            },
                            this,
                          ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 54,
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
                lineNumber: 38,
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
          lineNumber: 36,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 5,
    },
    this,
  );
}
//#endregion
export { SiteHeader as n, Logo as t };
