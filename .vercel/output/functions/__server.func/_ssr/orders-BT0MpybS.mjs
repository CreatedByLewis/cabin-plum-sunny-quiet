import { o as __toESM } from "../_runtime.mjs";
import { i as formatGBP, n as extrasFor } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-NXKshwsp.mjs";
import { t as Button } from "./button-C_CHC-nK.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BT0MpybS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createDepositCheckout = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createSsrRpc("5280bc1a85df4df403f69833eb1e985d68e970f8c906c8bdb82f7c0aa7a9b83d"));
var confirmCheckout = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createSsrRpc("78e37f8c9c23c0b9b0012d58d12fa13d79860762e888f76a19fc5a33f3d8a821"));
function PayDeposit({ packageId, amount, email, extras, variant = "primary", className, dark = false }) {
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function pay() {
		setPending(true);
		setError("");
		try {
			const result = await createDepositCheckout({ data: {
				packageId,
				email,
				extras
			} });
			if (result.url) {
				window.location.assign(result.url);
				return;
			}
			setError(result.message || "Checkout didn’t open.");
		} catch {
			setError("Checkout didn’t open.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant,
			className: "w-full",
			onClick: pay,
			disabled: pending,
			children: pending ? "Opening checkout…" : `Pay ${formatGBP(amount)} deposit`
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-sm", dark ? "text-paper/80" : "text-signal"),
			role: "alert",
			children: error
		}) : null]
	});
}
function ExtrasPicker({ packageId, selected, onToggle }) {
	const available = extrasFor(packageId);
	if (available.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "text-sm font-medium text-ink",
			children: "After launch"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed text-muted",
			children: "Partner is optional. Six months, £150 a month. It covers the running of the site, not a second build."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: available.map((item) => {
				const on = selected.includes(item.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: cn("flex cursor-pointer items-start justify-between gap-4 rounded-lg border px-4 py-3", on ? "border-ink bg-card" : "border-line"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-4 accent-current",
							checked: on,
							onChange: () => onToggle(item.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium text-ink",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm leading-snug text-muted",
							children: item.detail
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-sm text-ink tabular-nums",
						children: item.monthly ? `${formatGBP(item.price)}/mo` : formatGBP(item.price)
					})]
				}) }, item.id);
			})
		})
	] });
}
var KEY = "lewiscreates.orders";
function loadOrders() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isOrder);
	} catch {
		return [];
	}
}
function saveOrder(order) {
	const next = [order, ...loadOrders().filter((item) => item.ref !== order.ref)].slice(0, 8);
	localStorage.setItem(KEY, JSON.stringify(next));
	return next;
}
function makeRef() {
	return `LC-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10).toString()}`;
}
function isOrder(value) {
	if (!value || typeof value !== "object") return false;
	const order = value;
	return typeof order.ref === "string" && typeof order.email === "string" && typeof order.packageId === "string";
}
//#endregion
export { makeRef as a, loadOrders as i, PayDeposit as n, saveOrder as o, confirmCheckout as r, ExtrasPicker as t };
