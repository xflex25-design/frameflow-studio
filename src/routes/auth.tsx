import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import "@lovable.dev/cloud-auth-js/styles.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Ogra AI" },
      {
        name: "description",
        content: "Sign in or create your Ogra AI account to start generating videos.",
      },
      { property: "og:title", content: "Sign in — Ogra AI" },
      {
        property: "og:description",
        content: "Create your account and turn stories into AI videos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Check if already signed in
    supabase.auth
      .getUser()
      .then(({ data }: any) => {
        if (data?.user) {
          window.location.href = "/studio";
        }
      })
      .catch(() => {});

    // Check for OAuth or confirmation redirect hash/params
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash.includes("error_description=")) {
        const params = new URLSearchParams(hash.replace("#", "?"));
        const desc = params.get("error_description");
        if (desc) toast.error(decodeURIComponent(desc).replace(/\+/g, " "));
      } else if (search.includes("error_description=")) {
        const params = new URLSearchParams(search);
        const desc = params.get("error_description");
        if (desc) toast.error(decodeURIComponent(desc).replace(/\+/g, " "));
      }
    }

    const { data } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user) {
        window.location.href = "/studio";
      }
    });
    return () => data?.subscription?.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/auth`,
        });
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
          options: { emailRedirectTo: `${window.location.origin}/studio` },
        });

        if (error) {
          if (error.message.toLowerCase().includes("user already registered")) {
            throw new Error("An account with this email already exists. Please sign in instead.");
          }
          throw error;
        }

        if (data?.session) {
          toast.success("Account created successfully! Taking you to the studio…");
          window.location.href = "/studio";
        } else {
          toast.success("Account created! Please check your email inbox to confirm your account, then sign in.", {
            duration: 8000,
          });
          setMode("signin");
        }
        return;
      }

      // mode === "signin"
      if (!password) {
        toast.error("Please enter your password.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("invalid login credentials")) {
          throw new Error("Incorrect email or password. Please try again or create an account.");
        }
        if (msg.includes("email not confirmed")) {
          throw new Error("Your email has not been confirmed yet. Please check your inbox or spam folder.");
        }
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

  async function oauth(provider: "google" | "lovable") {
    setBusy(true);
    try {
      if (provider === "google") {
        // First attempt standard Supabase OAuth
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/studio`,
          },
        });
        if (!error) return;

        // Fall back to Lovable OAuth broker
        const r = await lovable.auth.signInWithOAuth(provider, {
          redirect_uri: `${window.location.origin}/studio`,
        });
        if (r.error) toast.error(r.error.message ?? "Google sign-in failed. Please use email and password.");
      } else {
        const r = await lovable.auth.signInWithOAuth(provider, {
          redirect_uri: `${window.location.origin}/studio`,
        });
        if (r.error) toast.error(r.error.message ?? "Lovable sign-in failed.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-md px-5 py-16">
        <div className="rounded-[2.5rem] border-2 border-primary bg-card p-6 sm:p-8 shadow-frame">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-full bg-secondary/80 p-1 border border-border/60 mb-6">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                mode === "signin"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Create Account
            </button>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            {mode === "signin" && "Welcome back."}
            {mode === "signup" && "Start your story."}
            {mode === "forgot" && "Reset Password."}
          </h1>
          <p className="mt-2 text-sm text-sky">
            {mode === "signin" && "Sign in to access your Studio and generated videos."}
            {mode === "signup" && "Create a free account with 2 monthly video credits."}
            {mode === "forgot" && "Enter your email to receive a password reset link."}
          </p>

          {/* Social Sign In Buttons (Google & Lovable) */}
          {mode !== "forgot" && (
            <>
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => oauth("google")}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background py-3 font-medium hover:bg-accent transition disabled:opacity-60"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="currentColor"
                      d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z"
                    />
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  disabled={busy}
                  className="lovable-auth-button w-full"
                  onClick={() => oauth("lovable")}
                >
                  Continue with Lovable
                </button>
              </div>

              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider">
                <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          {/* Email / Password Form */}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition"
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div className="flex items-start gap-3 py-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background"
                />
                <label htmlFor="consent" className="text-xs text-muted-foreground leading-tight select-none">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-base font-bold text-primary-foreground shadow-glow hover:brightness-110 transition disabled:opacity-60"
            >
              {busy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing…
                </>
              ) : mode === "signin" ? (
                "Sign In"
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Mode Switch Bottom Links */}
          <div className="mt-6 text-center text-sm">
            {mode === "signin" && (
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-primary hover:underline"
                >
                  Create one free
                </button>
              </p>
            )}
            {mode === "signup" && (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
            {mode === "forgot" && (
              <p className="text-muted-foreground">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-semibold text-primary hover:underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

