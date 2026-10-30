import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-muted-foreground">Last updated: October 30, 2026</p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-4">
              By accessing or using Ogra AI, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
            <p className="mt-4">
              Ogra AI provides AI-powered video generation tools. We grant you a limited, non-exclusive license to use these tools for your creative projects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. User Content</h2>
            <p className="mt-4">
              You retain ownership of the prompts and media you upload. By using Ogra AI, you grant us a license to process this content solely to provide the video generation service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Prohibited Conduct</h2>
            <p className="mt-4">
              You agree not to use Ogra AI to generate content that is illegal, harmful, threatening, abusive, or otherwise objectionable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Subscription and Payments</h2>
            <p className="mt-4">
              Payments are processed through our third-party provider. Subscriptions renew automatically unless cancelled.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
