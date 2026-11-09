import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/cookies")({
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Cookie Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: October 30, 2026</p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. What are Cookies?</h2>
            <p className="mt-4">
              Cookies are small text files stored on your device when you visit a website. They help us recognize you and remember your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. How We Use Cookies</h2>
            <p className="mt-4">
              We use essential cookies for authentication and security. We also use analytical cookies to understand how users interact with our platform and to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Managing Cookies</h2>
            <p className="mt-4">
              You can control and manage cookies through your browser settings or via our on-site cookie banner. Disabling certain cookies may affect the functionality of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Third-Party Cookies</h2>
            <p className="mt-4">
              We may use third-party services like Supabase and Google Search Console which may set their own cookies.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
