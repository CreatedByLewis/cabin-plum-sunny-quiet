import { i as formatGBP, u as packages } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Check } from "../_libs/lucide-react.mjs";
import { r as Route$2 } from "./router-NXKshwsp.mjs";
import { n as ButtonAnchor, r as ButtonLink } from "./button-C_CHC-nK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages._id-uH8G1ru1.js
var import_jsx_runtime = require_jsx_runtime();
function PackagePage() {
	const { pkg } = Route$2.useLoaderData();
	const others = packages.filter((item) => item.id !== pkg.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/packages",
				className: "inline-flex min-h-11 items-center text-sm text-muted hover:text-ink",
				children: "All packages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs tracking-widest text-muted uppercase",
				children: pkg.time
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-4xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl",
				children: pkg.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted",
				children: pkg.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-end gap-x-8 gap-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-5xl tabular-nums text-ink",
						children: formatGBP(pkg.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pb-1 text-sm text-muted",
						children: [formatGBP(Math.round(pkg.price * .25)), " to start"]
					}),
					pkg.retainer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pb-1 text-sm font-medium text-ink",
						children: [
							"then ",
							formatGBP(pkg.retainer.monthly),
							" a month for ",
							pkg.retainer.months,
							" months"
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 max-w-2xl space-y-4",
				children: pkg.story.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-ink",
					children: paragraph
				}, paragraph))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xs tracking-widest text-muted uppercase",
				children: "What’s Included"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 max-w-2xl divide-y divide-line border-y border-line",
				children: pkg.includes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 py-4 text-base leading-snug text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "mt-0.5 size-4 shrink-0 text-signal",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-2xl text-sm leading-relaxed text-muted",
				children: pkg.fit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonAnchor, {
					href: `/start?package=${pkg.id}`,
					children: ["Choose ", pkg.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/book",
					variant: "secondary",
					children: "Book a free chat"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-10 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "The other packages"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line border-y border-line",
				children: others.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/packages/$id",
					params: { id: item.id },
					className: "flex min-h-14 items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted tabular-nums",
						children: formatGBP(item.price)
					})]
				}) }, item.id))
			})]
		})
	})] });
}
//#endregion
export { PackagePage as component };
