import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="relative rounded-3xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Cookie Consent</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              We use cookies to improve your experience on Ogra AI. By clicking "Accept", you agree to our use of cookies for analytics and authentication. Read our{" "}
              <Link to="/cookies" className="text-primary underline underline-offset-4 hover:brightness-110">
                Cookie Policy
              </Link>{" "}
              for more details.
            </p>
          </div>
          
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={declineCookies}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition hover:bg-secondary"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
