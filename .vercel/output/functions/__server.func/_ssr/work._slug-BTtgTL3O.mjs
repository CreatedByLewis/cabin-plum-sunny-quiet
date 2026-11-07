import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowLeft, m as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as cn, n as Route } from "./router-NXKshwsp.mjs";
import { n as ButtonAnchor } from "./button-C_CHC-nK.mjs";
import { r as showcase, t as ProjectExplorer } from "./showcase-Dr8gqBhB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work._slug-BTtgTL3O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrowserFrame({ src, mobileSrc, alt, url, hoverSrc, className }) {
	const [lit, setLit] = (0, import_react.useState)(false);
	function onTap() {
		if (!hoverSrc) return;
		if (window.matchMedia("(hover: hover)").matches) return;
		setLit((value) => !value);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group", lit && "is-lit", className),
		onClick: onTap,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-[min(100%,280px)] md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
				src: mobileSrc ?? src,
				hoverSrc,
				url
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden overflow-hidden rounded-xl border border-line bg-card shadow-frame md:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-line bg-paper px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 truncate text-xs text-muted",
						children: url
					}),
					hoverSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto shrink-0 text-[11px] text-muted",
						children: "Hover for light"
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shot, {
				src,
				hoverSrc,
				alt,
				className: "aspect-video"
			})]
		})]
	});
}
function Phone({ src, hoverSrc, url }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-frame",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center border-b border-line bg-card px-4 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-12 rounded-full bg-muted/40" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shot, {
				src,
				hoverSrc,
				alt: "",
				className: "aspect-[9/16]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate px-3 py-2 text-center text-[11px] text-muted",
				children: [url, hoverSrc ? " · tap for light" : ""]
			})
		]
	});
}
function Shot({ src, hoverSrc, alt, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "h-full w-full object-cover object-top"
		}), hoverSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: hoverSrc,
			alt: "",
			className: "absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-lit]:opacity-100"
		}) : null]
	});
}
function CaseStudy() {
	const { project, next } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/work",
				className: "group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-4 transition-transform duration-200 group-hover:-translate-x-0.5",
					"aria-hidden": true
				}), "All work"]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "eyebrow mt-6",
				children: ["Case study ", project.index]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-4xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl",
				children: project.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted",
				children: project.lede
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4",
				children: [
					["Role", project.role],
					["Year", project.year],
					["Focus", project.focus],
					["Live", project.status === "in-progress" ? project.soonLabel ?? "In the works" : project.urlLabel]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-paper px-4 py-4 sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-sm text-ink",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 space-y-4",
				children: [showcase[project.slug] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectExplorer, { project }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserFrame, {
					src: project.image,
					mobileSrc: project.mobileImage,
					hoverSrc: project.hoverImage,
					alt: project.imageAlt,
					url: project.urlLabel
				}), project.extraImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserFrame, {
					src: project.extraImage,
					alt: project.extraImageAlt ?? project.imageAlt,
					url: "Diary home"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "mt-12 max-w-3xl font-display text-3xl leading-snug text-ink italic sm:text-4xl",
				children: [
					"“",
					project.quote,
					"”"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "What Changed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg leading-relaxed text-ink",
					children: project.result
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mt-12 grid gap-12 ${showcase[project.slug] ? "" : "lg:grid-cols-2"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: showcase[project.slug] ? "max-w-2xl" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: "The Problem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-4",
						children: project.brief.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-relaxed text-ink",
							children: paragraph
						}, paragraph))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: showcase[project.slug] ? "hidden" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: "What I Built"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-line border-y border-line",
						children: project.built.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-ink",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: item.detail
							})]
						}, item.title))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4",
				children: project.specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: spec.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-2 text-sm text-ink",
					children: spec.value
				})] }, spec.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-3 sm:flex-row",
				children: [project.status === "in-progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonAnchor, {
					href: "/book",
					children: ["Book a call about ", project.name]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonAnchor, {
					href: project.url,
					target: "_blank",
					rel: "noreferrer",
					children: ["Visit the live site", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "size-4",
						"aria-hidden": true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonAnchor, {
					href: "/start?package=complete",
					variant: "secondary",
					children: "Order a site like this"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/work/$slug",
		params: { slug: next.slug },
		className: "block border-t border-line transition-colors duration-200 hover:bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-10 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Next case study"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-3 font-display text-3xl text-ink sm:text-5xl",
					children: [next.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "size-6 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink",
						"aria-hidden": true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: next.summary
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: next.image,
				alt: "",
				loading: "lazy",
				className: "hidden h-28 w-44 rounded-xl border border-line object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1 sm:block"
			})]
		})
	})] });
}
//#endregion
export { CaseStudy as component };
