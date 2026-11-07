import { o as __toESM } from "../_runtime.mjs";
import { i as formatGBP } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Check } from "../_libs/lucide-react.mjs";
import { a as cn } from "./router-NXKshwsp.mjs";
import { n as ButtonAnchor, r as ButtonLink, t as Button } from "./button-C_CHC-nK.mjs";
import { n as sendPrices } from "./enquire-DCiAuOx-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prices-note-D7HaNWpC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PackageCard({ pkg, detailed = false }) {
	const dark = Boolean(pkg.featured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: detailed ? pkg.id : void 0,
		className: cn("lift flex h-full flex-col rounded-2xl border p-6 sm:p-7", dark ? "ring-glow border-transparent bg-ink text-paper shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--color-signal)_60%,transparent)]" : "border-line bg-card text-ink"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-3xl leading-none font-medium",
					children: pkg.name
				}), pkg.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-signal px-2.5 py-1 text-[10px] font-medium tracking-widest text-on-signal uppercase",
					children: "Most popular"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-display text-4xl leading-none tabular-nums", dark ? "text-paper" : "text-ink"),
					children: formatGBP(pkg.price)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("shrink-0 text-right text-sm leading-tight", dark ? "text-paper/75" : "text-muted"),
					children: ["25% deposit: ", formatGBP(Math.round(pkg.price * .25))]
				})]
			}),
			pkg.retainer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-2 text-sm font-medium", dark ? "text-paper" : "text-ink"),
				children: [
					"then ",
					formatGBP(pkg.retainer.monthly),
					" a month for ",
					pkg.retainer.months,
					" months"
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-sm", dark ? "text-paper/75" : "text-muted"),
				children: pkg.time
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-5 text-sm leading-relaxed", dark ? "text-paper/85" : "text-ink"),
				children: pkg.blurb
			}),
			!detailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: pkg.highlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm leading-snug",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: cn("mt-0.5 size-4 shrink-0", dark ? "text-paper" : "text-signal"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			}) : null,
			detailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-4 text-sm", dark ? "text-paper/70" : "text-muted"),
				children: pkg.fit
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3 border-t border-current/15 pt-6",
				children: pkg.includes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm leading-snug",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: cn("mt-0.5 size-4 shrink-0", dark ? "text-paper" : "text-signal"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-8",
				children: detailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonAnchor, {
					href: `/start?package=${pkg.id}`,
					variant: dark ? "inverse" : "primary",
					className: "w-full",
					children: ["Choose ", pkg.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/book",
					variant: "secondary",
					className: cn("mt-3 w-full", dark && "border-paper text-paper hover:bg-paper hover:text-ink"),
					children: "Book a call. Nothing to pay."
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/packages/$id",
					params: { id: pkg.id },
					className: cn("inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-[background-color,color,scale,border-color] duration-200 ease-out active:scale-[0.96]", dark ? "bg-paper text-ink hover:bg-card" : "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper"),
					children: "See what’s included"
				})
			})
		]
	});
}
function PricesNote() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [company, setCompany] = (0, import_react.useState)("");
	const [startedAt] = (0, import_react.useState)(() => Date.now());
	const [sending, setSending] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(event) {
		event.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			setError("That email doesn’t look right.");
			return;
		}
		if (!confirm) {
			setError("Tick the box so I know it isn’t a bot.");
			return;
		}
		setSending(true);
		setError("");
		try {
			const result = await sendPrices({ data: {
				email,
				confirm,
				company,
				startedAt
			} });
			if (!result.ok) {
				setError(result.message || "That didn’t send. Email hello@createdbylewis.com.");
				return;
			}
			setSent(true);
		} catch {
			setError("That didn’t send. Email hello@createdbylewis.com.");
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		noValidate: true,
		className: "relative mt-4 rounded-xl border border-line bg-card p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-ink",
				children: "Not ready to book?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-lg text-sm leading-relaxed text-muted",
				children: "Leave your email and I’ll send the prices. No commitment and nothing to pay."
			}),
			sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-ink",
				children: [
					"Sent. The prices are on their way to ",
					email.trim(),
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					name: "email",
					inputMode: "email",
					autoComplete: "email",
					"aria-label": "Email",
					placeholder: "Email",
					value: email,
					onChange: (event) => setEmail(event.target.value),
					className: cn("min-h-11 w-full rounded-md border bg-paper px-3 text-base text-ink outline-none transition-colors duration-200 focus:border-ink sm:max-w-sm", error ? "border-signal" : "border-line"),
					"aria-invalid": Boolean(error)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: sending,
					children: sending ? "Sending…" : "Send me the prices"
				})]
			}),
			sent ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex items-start gap-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					name: "confirm",
					checked: confirm,
					onChange: (event) => setConfirm(event.target.checked),
					className: "mt-1 size-4 accent-signal"
				}), "Tick this so a bot can’t send the request."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				name: "company",
				value: company,
				onChange: (event) => setCompany(event.target.value),
				tabIndex: -1,
				autoComplete: "off",
				"aria-hidden": true,
				className: "absolute -left-[9999px] h-0 w-0 opacity-0"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-signal",
				role: "alert",
				children: error
			}) : null
		]
	});
}
//#endregion
export { PricesNote as n, PackageCard as t };
