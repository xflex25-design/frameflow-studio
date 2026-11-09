import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: October 30, 2026</p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
            <p className="mt-4">
              We collect information that you provide directly to us when you create an account, generate videos, or communicate with us. This includes your email address, video prompts, and any media you upload.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-4">
              We use your information to provide and improve Ogra AI, process your transactions, communicate with you, and ensure the security of our platform. We use AI models to process your prompts and generate video content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Data Retention & Deletion</h2>
            <p className="mt-4">
              We retain your data for as long as your account is active. You may request the deletion of your account and associated data at any time by contacting us at support@ogra.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Cookies and Tracking</h2>
            <p className="mt-4">
              We use cookies and similar technologies to track your preferences and session information. You can manage your cookie preferences through our cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Security</h2>
            <p className="mt-4">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
