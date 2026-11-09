import { l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B8Bq90Zz.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSPYtqIT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-CsViFhUU.js
var PRICING = {
	subscriptions: {
		free: {
			name: "FREE",
			price: 0,
			credits: 2
		},
		creator: {
			name: "CREATOR",
			price: 4.99,
			credits: 8
		},
		pro: {
			name: "PRO",
			price: 9.99,
			credits: 20
		}
	},
	creditPackages: {
		small: {
			credits: 3,
			price: 1.99
		},
		medium: {
			credits: 8,
			price: 3.99
		},
		large: {
			credits: 20,
			price: 7.99
		}
	}
};
var getSubscription_createServerFn_handler = createServerRpc({
	id: "ec7fe4a8b2b9ff69ad2c3d59bb9e5d5d6bad4e50214747b74eaabd1b0f0df398",
	name: "getSubscription",
	filename: "src/lib/pricing.ts"
}, (opts) => getSubscription.__executeServer(opts));
var getSubscription = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getSubscription_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle();
	if (error) throw new Error(error.message);
	return data || {
		plan: "free",
		credits_remaining: 2
	};
});
var purchaseCredits_createServerFn_handler = createServerRpc({
	id: "34d05492e4615b9fdc4b76676803f4b9d476a6f4d7696fa5361827cb3ab122ea",
	name: "purchaseCredits",
	filename: "src/lib/pricing.ts"
}, (opts) => purchaseCredits.__executeServer(opts));
var purchaseCredits = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ packageId: stringType() }).parse(d)).middleware([requireSupabaseAuth]).handler(purchaseCredits_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const pkg = PRICING.creditPackages[data.packageId];
	if (!pkg) throw new Error("Invalid package");
	const { error } = await supabase.rpc("add_credits", {
		p_user_id: userId,
		p_credits: pkg.credits
	});
	if (error) throw new Error(error.message);
	return { success: true };
});
//#endregion
export { getSubscription_createServerFn_handler, purchaseCredits_createServerFn_handler };
