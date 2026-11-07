import { d as practice, i as formatGBP, r as faqs, t as extras, u as packages } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ButtonLink } from "./button-C_CHC-nK.mjs";
import { n as PricesNote, t as PackageCard } from "./prices-note-D7HaNWpC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages.index-DLITXaeY.js
var import_jsx_runtime = require_jsx_runtime();
function PackagesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Ways to work"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl",
					children: "Three Ways to Sell."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-lg leading-relaxed text-muted",
					children: "Every site is shaped around what you sell and built so people can finish an order on a desktop or a phone. Shop is the homepage and the store. Box adds a postcode check, a custom hero and a build-a-box you own. Stay includes everything in Shop and Box, plus weekly or monthly subscriptions to keep customers coming back, and a refresh of your branding. Partner is a monthly add-on after launch, and it isn’t hidden inside the build price."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/estimate",
					className: "mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink",
					children: "Not sure which one? I’ll walk you through it."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 lg:grid-cols-3",
					children: packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, {
						pkg,
						detailed: true
					}, pkg.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "extras",
					className: "mt-14 scroll-mt-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl text-ink",
							children: "Partner"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
							children: "Optional, on top of Shop, Box or Stay, for a minimum of six months. It covers the day-to-day running of the site, not a pile of cheap extras."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 divide-y divide-line border-y border-line",
							children: extras.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid gap-2 py-5 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-medium text-ink",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-xl text-sm leading-relaxed text-muted",
										children: item.detail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-ink tabular-nums",
										children: item.monthly ? `${formatGBP(item.price)} a month` : formatGBP(item.price)
									})
								]
							}, item.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-3xl text-sm leading-relaxed text-muted",
					children: "Prices are a starting point. You can spread the cost with flexible payment options, which helps if you’re a small or new business. If your budget is different, we’ll look at what fits. I can meet you on a video call or in person to go through everything, and while the site is being built, I’m on call."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricesNote, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl text-ink",
						children: "Shaped Around the Business"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 divide-y divide-line border-y border-line",
						children: practice.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-medium text-ink",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-sm leading-relaxed text-muted",
								children: item.body
							})]
						}, item.title))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-3",
					children: notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: note.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted",
						children: note.body
					})] }, note.title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl text-ink",
						children: "Questions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 divide-y divide-line border-y border-line",
						children: faqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "group py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink",
								children: [faq.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted transition-transform duration-200 group-open:rotate-45",
									"aria-hidden": true,
									children: "+"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl pb-5 text-sm leading-relaxed text-muted",
								children: faq.a
							})]
						}, faq.q))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/start",
							children: "Start a project"
						})
					})
				]
			})
		})
	] });
}
var notes = [
	{
		title: "In Person or on a Call",
		body: "Meet in person or on a video call and go through what the site needs to do."
	},
	{
		title: "On Call During the Build",
		body: "While it’s being built, I’m available pretty much any time to talk about how it’s going."
	},
	{
		title: "Partner, After Launch",
		body: "£150 a month for six months. Product changes, fixes and one planned improvement a month. A new brand or a second project is quoted separately."
	}
];
//#endregion
export { PackagesPage as component };
