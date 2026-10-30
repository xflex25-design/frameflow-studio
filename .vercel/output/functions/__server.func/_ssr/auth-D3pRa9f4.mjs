import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-ltuHj2dN.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import "./router-C7X7ejjW.mjs";
import { n as SiteHeader } from "./SiteHeader-CJ9hWYXn.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D3pRa9f4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var lovableAuth = createLovableAuth();
var lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        ...opts,
        extraParams: { ...opts?.extraParams },
      });
      if (result.redirected) return result;
      if (result.error) return result;
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    },
  },
};
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = (0, import_react.useState)("signin");
  const [email, setEmail] = (0, import_react.useState)("");
  const [password, setPassword] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    supabase.auth.getUser().then(({ data }) => data.user && navigate({ to: "/studio" }));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => s && navigate({ to: "/studio" }));
    return () => data.subscription.unsubscribe();
  }, [navigate]);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/studio" },
        });
        if (error) throw error;
        if (!data.session) toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }
  async function oauth(provider) {
    const r = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin + "/auth",
    });
    if (r.error) toast.error(r.error.message ?? "Sign in failed");
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      className: "min-h-screen bg-background",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          SiteHeader,
          {},
          void 0,
          false,
          {
            fileName: _jsxFileName,
            lineNumber: 66,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "main",
          {
            className: "mx-auto max-w-md px-5 py-16",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "div",
              {
                className: "rounded-3xl border-2 border-primary bg-card p-8 shadow-frame",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "h1",
                    {
                      className: "text-4xl font-extrabold tracking-tight",
                      children: mode === "signin" ? "Welcome back." : "Start your story.",
                    },
                    void 0,
                    false,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 69,
                      columnNumber: 11,
                    },
                    this,
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "p",
                    {
                      className: "mt-2 text-sky",
                      children:
                        mode === "signin"
                          ? "Sign in to your studio."
                          : "Create a free account to generate videos.",
                    },
                    void 0,
                    false,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 72,
                      columnNumber: 11,
                    },
                    this,
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "div",
                    {
                      className: "mt-6 space-y-3",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "button",
                          {
                            onClick: () => oauth("google"),
                            className:
                              "flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background py-3 font-medium hover:bg-accent",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  className: "h-5 w-5",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                    "path",
                                    {
                                      fill: "currentColor",
                                      d: "M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: _jsxFileName,
                                      lineNumber: 78,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName: _jsxFileName,
                                  lineNumber: 77,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              "Continue with Google",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 76,
                            columnNumber: 13,
                          },
                          this,
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "button",
                          {
                            type: "button",
                            className: "lovable-auth-button w-full",
                            onClick: () => oauth("lovable"),
                            children: "Continue with Lovable",
                          },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 82,
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
                      lineNumber: 75,
                      columnNumber: 11,
                    },
                    this,
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "div",
                    {
                      className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "span",
                          { className: "h-px flex-1 bg-border" },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 87,
                            columnNumber: 13,
                          },
                          this,
                        ),
                        " OR ",
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "span",
                          { className: "h-px flex-1 bg-border" },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 87,
                            columnNumber: 59,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 86,
                      columnNumber: 11,
                    },
                    this,
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "form",
                    {
                      onSubmit: submit,
                      className: "space-y-3",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "input",
                          {
                            type: "email",
                            required: true,
                            placeholder: "Email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            className:
                              "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary",
                          },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 90,
                            columnNumber: 13,
                          },
                          this,
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "input",
                          {
                            type: "password",
                            required: true,
                            minLength: 6,
                            placeholder: "Password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            className:
                              "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary",
                          },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 91,
                            columnNumber: 13,
                          },
                          this,
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "button",
                          {
                            disabled: busy,
                            className:
                              "w-full rounded-full bg-primary py-3 text-lg font-semibold text-primary-foreground shadow-glow disabled:opacity-60",
                            children: busy
                              ? "Please wait…"
                              : mode === "signin"
                                ? "Sign In"
                                : "Create Account",
                          },
                          void 0,
                          false,
                          {
                            fileName: _jsxFileName,
                            lineNumber: 92,
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
                      lineNumber: 89,
                      columnNumber: 11,
                    },
                    this,
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "button",
                    {
                      onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
                      className: "mt-5 w-full text-sm text-muted-foreground hover:text-foreground",
                      children:
                        mode === "signin"
                          ? "New here? Create an account"
                          : "Already have an account? Sign in",
                    },
                    void 0,
                    false,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 96,
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
                lineNumber: 68,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: _jsxFileName,
            lineNumber: 67,
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
      lineNumber: 65,
      columnNumber: 10,
    },
    this,
  );
}
//#endregion
export { AuthPage as component };
