import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Home,
  Clapperboard,
  User,
  Music,
  Type,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Film,
  CreditCard,
  Coins,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FAQSection } from "@/components/FAQSection";
import { OgraLiveDashboardDemo } from "@/components/OgraLiveDashboardDemo";
import { VideoPlayer } from "@/components/VideoPlayer";
import hero from "@/assets/hero-scene.jpg";
import animated from "@/assets/animated-thumb.jpg";
import avatars from "@/assets/avatars.jpg";
import filmstrip from "@/assets/filmstrip.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ogra AI — Turn your stories into AI movies" },
      {
        name: "description",
        content:
          "Generate 5-second realistic or animated AI videos from text or an image. Made for African storytellers.",
      },
      { property: "og:title", content: "Ogra AI — Your Stories. Our AI. African Movies." },
      {
        property: "og:description",
        content: "Turn ideas and photos into 5-second AI movie clips in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor">
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.2v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z" />
    </svg>
  );
}
function Instagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-11 w-11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function Facebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" />
    </svg>
  );
}
function YouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-14" fill="currentColor">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" />
    </svg>
  );
}

function Index() {
  const navItems = [
    { icon: Clapperboard, label: "Scenes" },
    { icon: User, label: "Characters" },
    { icon: Music, label: "Audio" },
    { icon: Type, label: "Subtitles" },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 pb-24">
        <section className="pt-16 text-center">
          <h1 className="text-[clamp(3rem,10vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Your Stories.
            <br />
            Our AI.
            <br />
            <span className="text-primary">African Movies.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl text-sky md:text-2xl">
            Turn your ideas into realistic AI movies and animated stories in minutes.
          </p>
          <Link
            to="/studio"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-12 py-5 text-xl font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
          >
            Create Your Story Free <ArrowRight className="h-6 w-6" />
          </Link>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            <div className="flex -space-x-4">
              {[0, 33.33, 66.66, 100].map((x) => (
                <div
                  key={x}
                  className="h-20 w-20 rounded-full border-2 border-foreground bg-no-repeat"
                  style={{
                    backgroundImage: `url(${avatars})`,
                    backgroundSize: "400% 100%",
                    backgroundPosition: `${x}% 30%`,
                  }}
                />
              ))}
            </div>
            <p className="text-2xl text-sky">Made for African storytellers</p>
          </div>

          <p className="mt-14 text-sm font-semibold tracking-[0.3em] text-sky">EXPORT TO</p>
          <div className="mt-5 flex items-center justify-center gap-12">
            <TikTok />
            <Instagram />
            <Facebook />
            <YouTube />
          </div>
        </section>

        {/* Real OGRA Studio Dashboard & Live Generation Demo */}
        <OgraLiveDashboardDemo />

        {/* Pricing */}
        <section className="mt-24">
          <h2 className="text-center text-4xl font-extrabold tracking-tight">
            Simple Pricing. <span className="text-primary">Incredible Stories.</span>
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Start creating for free. Upgrade when you're ready.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "FREE",
                price: "$0",
                features: [
                  "2 monthly credits",
                  "Watermarked videos",
                  "Limited generation options",
                  "Standard queue",
                ],
              },
              {
                name: "CREATOR",
                price: "$4.99",
                popular: true,
                features: [
                  "8 monthly credits",
                  "Realistic Movie",
                  "Animated Story",
                  "Character dialogue",
                  "HD exports",
                  "No watermark",
                ],
              },
              {
                name: "PRO",
                price: "$9.99",
                features: [
                  "20 monthly credits",
                  "Everything in Creator",
                  "Priority generation queue",
                  "No watermark",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl border ${plan.popular ? "border-primary" : "border-border"} bg-secondary/30 p-8`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-sm font-bold tracking-widest text-muted-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-4xl font-extrabold">
                  {plan.price}
                  <span className="text-lg font-medium text-muted-foreground">/month</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="text-primary">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/studio"
                  className={`mt-8 block text-center w-full rounded-full border py-3 font-semibold transition ${
                    plan.popular
                      ? "bg-primary border-primary text-primary-foreground hover:brightness-110 shadow-glow"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Need More Credits Box */}
          <div className="mt-10 rounded-3xl border border-border bg-card/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-frame">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Need more credits?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Top up anytime. Extra credits never expire.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              {[
                { count: "3 Credits", price: "$1.99" },
                { count: "8 Credits", price: "$3.99" },
                { count: "20 Credits", price: "$7.99" },
              ].map((pack) => (
                <Link
                  key={pack.count}
                  to="/studio"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 px-5 py-3 transition hover:border-primary/60 hover:bg-secondary/80 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary group-hover:scale-105 transition-transform">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{pack.count}</div>
                    <div className="text-xs font-bold text-primary">{pack.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Collapsible FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

function StyleCard({ img, label, active }: { img: string; label: string; active?: boolean }) {
  return (
    <div className={`rounded-xl border-2 p-2 ${active ? "border-primary" : "border-border"}`}>
      <div className="relative">
        <img src={img} alt={label} loading="lazy" className="h-16 w-full rounded-md object-cover" />
        <span
          className={`absolute right-1 top-1 h-5 w-5 rounded-full border-2 ${active ? "border-foreground bg-primary" : "border-foreground"}`}
        />
      </div>
      <p className="mt-2 text-center text-sm font-medium">{label}</p>
    </div>
  );
}
