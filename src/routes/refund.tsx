import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/refund")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Refund Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: October 30, 2026</p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Subscription Refunds</h2>
            <p className="mt-4">
              Due to the high cost of AI generation, we generally do not offer refunds once credits have been used. However, if you have a technical issue that prevents you from using the service, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Cancellation</h2>
            <p className="mt-4">
              You can cancel your subscription at any time through your dashboard. You will retain access to your credits until the end of your billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Technical Errors</h2>
            <p className="mt-4">
              If a video generation fails due to a system error, your credit will be automatically refunded to your balance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Contact Us</h2>
            <p className="mt-4">
              For any refund requests or payment issues, please email support@ogra.ai.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
