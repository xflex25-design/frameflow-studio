import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BQE2bPmH.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as LoaderCircle, D as EyeOff, E as Eye, S as Lock, b as Mail } from "../_libs/lucide-react.mjs";
import "./router-CWxtvh7O.mjs";
import { n as SiteHeader } from "./SiteHeader-z2rhPKwV.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-NmSeXsGy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [consent, setConsent] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data?.user) window.location.href = "/studio";
		}).catch(() => {});
		if (typeof window !== "undefined") {
			const hash = window.location.hash;
			const search = window.location.search;
			if (hash.includes("error_description=")) {
				const desc = new URLSearchParams(hash.replace("#", "?")).get("error_description");
				if (desc) toast.error(decodeURIComponent(desc).replace(/\+/g, " "));
			} else if (search.includes("error_description=")) {
				const desc = new URLSearchParams(search).get("error_description");
				if (desc) toast.error(decodeURIComponent(desc).replace(/\+/g, " "));
			}
		}
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user) window.location.href = "/studio";
		});
		return () => data?.subscription?.unsubscribe();
	}, [navigate]);
	async function submit(e) {
		e.preventDefault();
		if (!email.trim()) {
			toast.error("Please enter your email address.");
			return;
		}
		setBusy(true);
		try {
			if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth` });
				if (error) throw error;
				toast.success("Password reset instructions have been sent to your email.");
				setMode("signin");
				return;
			}
			if (mode === "signup") {
				if (!consent) {
					toast.error("Please agree to the Terms of Service and Privacy Policy.");
					return;
				}
				if (password.length < 6) {
					toast.error("Password must be at least 6 characters.");
					return;
				}
				const { data, error } = await supabase.auth.signUp({
					email: email.trim(),
					password,
					options: { emailRedirectTo: `${window.location.origin}/studio` }
				});
				if (error) {
					if (error.message.toLowerCase().includes("user already registered")) throw new Error("An account with this email already exists. Please sign in instead.");
					throw error;
				}
				if (data?.session) {
					toast.success("Account created successfully! Taking you to the studio…");
					window.location.href = "/studio";
				} else {
					toast.success("Account created! Please check your email inbox to confirm your account, then sign in.", { duration: 8e3 });
					setMode("signin");
				}
				return;
			}
			if (!password) {
				toast.error("Please enter your password.");
				return;
			}
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (error) {
				const msg = error.message.toLowerCase();
				if (msg.includes("invalid login credentials")) throw new Error("Incorrect email or password. Please try again or create an account.");
				if (msg.includes("email not confirmed")) throw new Error("Your email has not been confirmed yet. Please check your inbox or spam folder.");
				throw error;
			}
			if (data?.user || data?.session) {
				toast.success("Welcome back! Redirecting to studio…");
				window.location.href = "/studio";
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Authentication failed");
		} finally {
			setBusy(false);
		}
	}
	async function oauth(provider) {
		setBusy(true);
		try {
			if (provider === "google") {
				const { error } = await supabase.auth.signInWithOAuth({
					provider: "google",
					options: { redirectTo: `${window.location.origin}/studio` }
				});
				if (!error) return;
				const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/studio` });
				if (r.error) toast.error(r.error.message ?? "Google sign-in failed. Please use email and password.");
			} else {
				const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/studio` });
				if (r.error) toast.error(r.error.message ?? "Lovable sign-in failed.");
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Sign in failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 171,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-md px-5 py-16",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-[2.5rem] border-2 border-primary bg-card p-6 sm:p-8 shadow-frame",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex rounded-full bg-secondary/80 p-1 border border-border/60 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setMode("signin"),
							className: `flex-1 rounded-full py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: `flex-1 rounded-full py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: "Create Account"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-3xl font-extrabold tracking-tight",
						children: [
							mode === "signin" && "Welcome back.",
							mode === "signup" && "Start your story.",
							mode === "forgot" && "Reset Password."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-sky",
						children: [
							mode === "signin" && "Sign in to access your Studio and generated videos.",
							mode === "signup" && "Create a free account with 2 monthly video credits.",
							mode === "forgot" && "Enter your email to receive a password reset link."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 11
					}, this),
					mode !== "forgot" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => oauth("google"),
							disabled: busy,
							className: "flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background py-3 font-medium hover:bg-accent transition disabled:opacity-60",
							children: [/* @__PURE__ */ (void 0)("svg", {
								viewBox: "0 0 24 24",
								className: "h-5 w-5",
								children: /* @__PURE__ */ (void 0)("path", {
									fill: "currentColor",
									d: "M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 19
							}, this), "Continue with Google"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							disabled: busy,
							className: "lovable-auth-button w-full",
							onClick: () => oauth("lovable"),
							children: "Continue with Lovable"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "my-6 flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider",
						children: [
							/* @__PURE__ */ (void 0)("span", { className: "h-px flex-1 bg-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 17
							}, this),
							" or with email ",
							/* @__PURE__ */ (void 0)("span", { className: "h-px flex-1 bg-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 74
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 33
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5",
								children: "Email Address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "email",
									required: true,
									placeholder: "name@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 13
							}, this),
							mode !== "forgot" && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 19
								}, this), mode === "signin" && /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setMode("forgot"),
									className: "text-xs text-primary hover:underline",
									children: "Forgot password?"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 41
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (void 0)(Lock, { className: "h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("input", {
										type: showPassword ? "text" : "password",
										required: true,
										minLength: 6,
										placeholder: "••••••••",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm outline-none focus:border-primary transition"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 237,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
										"aria-label": showPassword ? "Hide password" : "Show password",
										children: showPassword ? /* @__PURE__ */ (void 0)(EyeOff, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 239,
											columnNumber: 37
										}, this) : /* @__PURE__ */ (void 0)(Eye, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 239,
											columnNumber: 70
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 238,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 35
							}, this),
							mode === "signup" && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-start gap-3 py-1",
								children: [/* @__PURE__ */ (void 0)("input", {
									type: "checkbox",
									id: "consent",
									checked: consent,
									onChange: (e) => setConsent(e.target.checked),
									required: true,
									className: "mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("label", {
									htmlFor: "consent",
									className: "text-xs text-muted-foreground leading-tight select-none",
									children: [
										"I agree to the",
										" ",
										/* @__PURE__ */ (void 0)(Link, {
											to: "/terms",
											className: "text-primary underline",
											children: "Terms of Service"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 248,
											columnNumber: 19
										}, this),
										" ",
										"and",
										" ",
										/* @__PURE__ */ (void 0)(Link, {
											to: "/privacy",
											className: "text-primary underline",
											children: "Privacy Policy"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 252,
											columnNumber: 19
										}, this),
										"."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 35
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								disabled: busy,
								className: "mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-base font-bold text-primary-foreground shadow-glow hover:brightness-110 transition disabled:opacity-60",
								children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 261,
									columnNumber: 19
								}, this), "Processing…"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 23
								}, this) : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 259,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 text-center text-sm",
						children: [
							mode === "signin" && /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground",
								children: [
									"Don't have an account?",
									" ",
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setMode("signup"),
										className: "font-semibold text-primary hover:underline",
										children: "Create one free"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 271,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 35
							}, this),
							mode === "signup" && /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground",
								children: [
									"Already have an account?",
									" ",
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setMode("signin"),
										className: "font-semibold text-primary hover:underline",
										children: "Sign in"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 277,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 35
							}, this),
							mode === "forgot" && /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground",
								children: [
									"Remember your password?",
									" ",
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setMode("signin"),
										className: "font-semibold text-primary hover:underline",
										children: "Back to Sign In"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 35
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 173,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 172,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 170,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
