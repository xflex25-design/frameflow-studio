import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Configurable pricing in USD
export const PRICING = {
  subscriptions: {
    free: { name: "FREE", price: 0, credits: 2 },
    creator: { name: "CREATOR", price: 4.99, credits: 8 },
    pro: { name: "PRO", price: 9.99, credits: 20 },
  },
  creditPackages: {
    small: { credits: 3, price: 1.99 },
    medium: { credits: 8, price: 3.99 },
    large: { credits: 20, price: 7.99 },
  },
};

export const getSubscription = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data || { plan: "free", credits_remaining: 2 };
  });

export const purchaseCredits = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ packageId: z.string() }).parse(d))
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const pkg = PRICING.creditPackages[data.packageId as keyof typeof PRICING.creditPackages];
    if (!pkg) throw new Error("Invalid package");

    // 1. Verify payment (Placeholder for stripe/payment gateway integration)
    // 2. Add credits
    const { error } = await supabase.rpc("add_credits", {
      p_user_id: userId,
      p_credits: pkg.credits,
    });

    if (error) throw new Error(error.message);
    return { success: true };
  });
