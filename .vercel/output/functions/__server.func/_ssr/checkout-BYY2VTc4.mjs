import { a as getPackage, c as isPackageId, i as formatGBP, p as quote, s as isExtraId } from "./content-CgSyAvuN.mjs";
import { i as getRequestHeader, t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BYY2VTc4.js
var createDepositCheckout_createServerFn_handler = createServerRpc({
	id: "5280bc1a85df4df403f69833eb1e985d68e970f8c906c8bdb82f7c0aa7a9b83d",
	name: "createDepositCheckout",
	filename: "src/lib/checkout.ts"
}, (opts) => createDepositCheckout.__executeServer(opts));
var createDepositCheckout = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createDepositCheckout_createServerFn_handler, async ({ data }) => {
	if (!isPackageId(data.packageId)) return {
		url: null,
		message: "That package isn’t on the list."
	};
	const pkg = getPackage(data.packageId);
	const selected = (data.extras ?? []).filter(isExtraId);
	const priced = quote(data.packageId, selected);
	const deposit = priced.deposit;
	const added = priced.chosen.map((item) => item.name).join(", ");
	const label = added ? `${pkg.name} + ${added}` : pkg.name;
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) return {
		url: null,
		message: "Checkout isn’t open from here yet. Email hello@createdbylewis.com and I’ll send the deposit."
	};
	const origin = siteOrigin();
	const body = new URLSearchParams();
	body.set("mode", "payment");
	body.set("success_url", `${origin}/start?paid=1&session_id={CHECKOUT_SESSION_ID}`);
	body.set("cancel_url", `${origin}/packages`);
	body.set("line_items[0][quantity]", "1");
	body.set("line_items[0][price_data][currency]", "gbp");
	body.set("line_items[0][price_data][unit_amount]", String(deposit * 100));
	body.set("line_items[0][price_data][product_data][name]", `${label}, deposit to start`);
	body.set("line_items[0][price_data][product_data][description]", `25% of ${label} (${formatGBP(priced.build)}). The rest is due when the site goes live.`);
	body.set("metadata[package]", pkg.id);
	if (added) body.set("metadata[extras]", added);
	body.set("automatic_payment_methods[enabled]", "true");
	body.set("branding_settings[display_name]", "CreatedByLewis");
	body.set("branding_settings[background_color]", "#111114");
	body.set("branding_settings[button_color]", "#8b7cf7");
	body.set("branding_settings[font_family]", "lora");
	body.set("branding_settings[border_style]", "rounded");
	body.set("branding_settings[logo][type]", "file");
	body.set("branding_settings[logo][file]", "file_1UJz8W2YYh32InngqrYG4KZd");
	body.set("branding_settings[icon][type]", "file");
	body.set("branding_settings[icon][file]", "file_1UJz8V2YYh32InngU6bZ8Q0s");
	const email = data.email?.trim() ?? "";
	if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) body.set("customer_email", email);
	try {
		const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${key}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body
		});
		const session = await response.json();
		if (!response.ok || !session.url) return {
			url: null,
			message: "Checkout didn’t open. Try again in a moment."
		};
		return {
			url: session.url,
			message: ""
		};
	} catch {
		return {
			url: null,
			message: "Checkout didn’t open. Try again in a moment."
		};
	}
});
var confirmCheckout_createServerFn_handler = createServerRpc({
	id: "78e37f8c9c23c0b9b0012d58d12fa13d79860762e888f76a19fc5a33f3d8a821",
	name: "confirmCheckout",
	filename: "src/lib/checkout.ts"
}, (opts) => confirmCheckout.__executeServer(opts));
var confirmCheckout = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(confirmCheckout_createServerFn_handler, async ({ data }) => {
	const sessionId = data.sessionId.trim();
	if (!sessionId.startsWith("cs_")) return {
		ok: false,
		message: "That payment reference isn’t valid."
	};
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) return {
		ok: false,
		message: "Payments aren’t confirmed from here yet."
	};
	try {
		const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, { headers: { Authorization: `Bearer ${key}` } });
		const session = await response.json();
		if (!response.ok) return {
			ok: false,
			message: "I couldn’t confirm that payment."
		};
		const packageId = session.metadata?.package;
		const pkg = isPackageId(packageId) ? getPackage(packageId) : null;
		return {
			ok: true,
			paid: session.payment_status === "paid",
			packageName: pkg?.name ?? "Website",
			deposit: Math.round((session.amount_total ?? 0) / 100),
			email: session.customer_details?.email ?? null
		};
	} catch {
		return {
			ok: false,
			message: "I couldn’t confirm that payment."
		};
	}
});
function siteOrigin() {
	const host = (getRequestHeader("x-forwarded-host") ?? getRequestHeader("host") ?? "").split(",")[0]?.trim() ?? "";
	const forwarded = (getRequestHeader("x-forwarded-proto") ?? "").split(",")[0]?.trim();
	const local = host.startsWith("localhost") || host.startsWith("127.0.0.1");
	const proto = forwarded === "http" || forwarded === "https" ? forwarded : local ? "http" : "https";
	if (!host || /[\s/]/.test(host)) return "https://www.createdbylewis.com";
	return `${proto}://${host}`;
}
//#endregion
export { confirmCheckout_createServerFn_handler, createDepositCheckout_createServerFn_handler };
