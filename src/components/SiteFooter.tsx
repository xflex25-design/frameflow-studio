import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/SiteHeader";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.2v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand info */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Turn your ideas into cinematic AI movies and animated stories. Made for African
              storytellers and creators everywhere.
            </p>
            <div className="mt-6 text-xs text-muted-foreground">
              © {new Date().getFullYear()} OGRA AI. All rights reserved.
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-foreground">Product</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/studio" className="transition hover:text-primary">
                  Studio
                </Link>
              </li>
              <li>
                <a href="#pricing" className="transition hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/studio" className="transition hover:text-primary">
                  Demo
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="transition hover:text-primary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-foreground">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#demo" className="transition hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="mailto:support@ogra.ai" className="transition hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <span className="cursor-pointer transition hover:text-primary">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-pointer transition hover:text-primary">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-foreground">Follow Us</h4>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <YouTubeIcon />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Tag <span className="text-primary font-medium">#OgraAI</span> to be featured on our
              creators channel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
