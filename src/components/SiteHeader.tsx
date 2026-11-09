import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Ogra AI Home">
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M24 8c3-4 9-4 11 0 5-1 9 3 8 8 4 2 4 9 0 11 1 5-3 9-8 8-2 4-8 4-11 0-3 4-9 4-11 0-5 1-9-3-8-8-4-2-4-9 0-11-1-5 3-9 8-8 2-4 8-4 11 0z" />
        <circle cx="19" cy="23" r="3.2" />
        <circle cx="29" cy="23" r="3.2" />
      </svg>
      <span className="text-2xl font-bold tracking-tight">Ogra AI</span>
    </Link>
  );
}

export function SiteHeader() {
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Logo />
        <div className="flex items-center gap-5">
          {email ? (
            <Link
              to="/studio"
              className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            >
              Studio <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            >
              Sign In <ArrowRight className="h-5 w-5" />
            </Link>
          )}
          <div className="relative">
            <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="p-1">
              <Menu className="h-8 w-8" />
            </button>
            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl border border-border bg-card p-2 shadow-glow">
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/studio"
                  className="block rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Create video
                </Link>
                {email ? (
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-accent"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setOpen(false);
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="block rounded-lg px-3 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
