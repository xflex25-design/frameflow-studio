import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles, ShieldCheck, Zap } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "credits-how-they-work",
    question: "How do credits work in Ogra AI?",
    answer:
      "Every video generation consumes 1 credit. Each credit generates a full 5-second cinematic movie clip in your choice of realistic or animated style, complete with AI-scripted scenes, camera motion, and synced character speech dialogue.",
  },
  {
    id: "quota-and-refunds",
    question: "What happens if a generation fails or the GPU quota is reached?",
    answer:
      "Your credits are completely safe. If a generation fails for any reason—including temporary Hugging Face ZeroGPU quota limits or server capacity—our backend automatically detects the failure and immediately refunds the credit back to your account balance. We never charge for failed generations.",
  },
  {
    id: "top-up-credits",
    question: "Can I buy additional credits without changing my monthly plan?",
    answer:
      "Yes! You can top up anytime with on-demand credit packs: 3 credits for $1.99, 8 credits for $3.99, or 20 credits for $7.99. Purchased top-up credits never expire and are tracked separately from your monthly subscription quota.",
  },
  {
    id: "monthly-rollover",
    question: "Do monthly subscription credits roll over to the next month?",
    answer:
      "Plan credits reset on your monthly billing date (2 credits for Free, 8 for Creator, and 20 for Pro). On-demand purchased top-up credits do not expire and remain in your account until you use them.",
  },
  {
    id: "usage-limits-and-queues",
    question: "What are the GPU usage limits between Free, Creator, and Pro tiers?",
    answer:
      "Free users utilize standard shared GPU queues with fair-use daily caps. Creator and Pro subscribers enjoy priority processing queues, higher concurrent rendering throughput, and bypass the free-tier wait times during peak hours.",
  },
  {
    id: "watermark-and-hd",
    question: "Are videos watermarked, and what video quality can I export?",
    answer:
      "Free accounts include a subtle Ogra watermark. Creator ($4.99/mo) and Pro ($9.99/mo) plans unlock full 1080p HD exports without any watermarks, formatted for TikTok, Instagram Reels, and YouTube Shorts in both 16:9 and 9:16 aspect ratios.",
  },
  {
    id: "subscription-cancellation",
    question: "Can I cancel or switch plans at any time?",
    answer:
      "Yes, you have full control over your subscription with zero lock-in. You can upgrade, downgrade, or cancel directly from your Subscription settings in the dashboard at any time.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="mt-28 scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <HelpCircle className="h-4 w-4" /> FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Credits, Pricing &amp; <span className="text-primary">Usage Limits</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Everything you need to know about our credit system, ZeroGPU processing, and
            subscriptions.
          </p>
        </div>

        {/* Feature badges row */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Auto-Refund Guarantee</p>
              <p className="text-[11px] text-muted-foreground">Credits refunded if jobs fail</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Priority ZeroGPU</p>
              <p className="text-[11px] text-muted-foreground">Faster rendering on paid tiers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Never-Expiring Top-ups</p>
              <p className="text-[11px] text-muted-foreground">Extra credit packs stay forever</p>
            </div>
          </div>
        </div>

        {/* Collapsible Accordion */}
        <div className="mt-10 rounded-3xl border border-border bg-card/30 p-6 sm:p-8 shadow-frame">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-2xl border border-border bg-secondary/20 px-5 py-1 transition-colors data-[state=open]:border-primary/50 data-[state=open]:bg-secondary/40"
              >
                <AccordionTrigger className="text-base font-semibold text-foreground hover:text-primary hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
