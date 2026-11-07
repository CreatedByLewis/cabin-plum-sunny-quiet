import { o as __toESM } from "../_runtime.mjs";
import { c as isPackageId, f as projects, l as nextProject, o as getProject, u as packages } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, S as useRouter, X as notFound, Z as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Menu, n as TriangleAlert, r as Sun, s as Moon, t as X, u as Instagram } from "../_libs/lucide-react.mjs";
import { t as SpeedInsights } from "../_libs/vercel__speed-insights.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo--v49x5di.js
var SITE_URL = "https://www.createdbylewis.com";
/**
* Per-route head tags: title, description, robots and a self-referencing
* canonical. og:* / twitter:* are injected by the platform middleware
* (server/middleware/grok-pwa.ts), which strips app-set share tags, so they
* are not set here; og:title follows the <title> because site.json has no title.
*/
function seo({ title, description, path, noindex }) {
	const meta = [{ title }];
	if (description) meta.push({
		name: "description",
		content: description
	});
	if (noindex) meta.push({
		name: "robots",
		content: "noindex, nofollow"
	});
	return {
		meta,
		links: noindex ? [] : [{
			rel: "canonical",
			href: `${SITE_URL}${path === "/" ? "/" : path}`
		}]
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-NXKshwsp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var links = [
	{
		label: "Work",
		to: "/work",
		hash: void 0
	},
	{
		label: "Packages",
		to: "/packages",
		hash: void 0
	},
	{
		label: "Estimate",
		to: "/estimate",
		hash: void 0
	},
	{
		label: "Book",
		to: "/book",
		hash: void 0
	},
	{
		label: "About",
		to: "/",
		hash: "studio"
	}
];
function Shell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#content",
			className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper",
			children: "Skip to content"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "content",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosingCta, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
function Header() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [light, setLight] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLight(document.documentElement.dataset.theme === "light");
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	function setTheme(nextLight) {
		setLight(nextLight);
		document.documentElement.dataset.theme = nextLight ? "light" : "dark";
		localStorage.setItem("lewis-theme", nextLight ? "light" : "dark");
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", nextLight ? "#f3f2ef" : "#111114");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 border-b border-line/70 bg-paper/75 backdrop-blur-xl backdrop-saturate-150",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-7 md:flex",
					"aria-label": "Primary",
					children: [
						links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							hash: link.hash,
							className: cn("relative py-1 text-sm text-muted transition-colors duration-200 hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100", !link.hash && pathname.startsWith(link.to) && "text-ink after:scale-x-100"),
							"aria-current": !link.hash && pathname.startsWith(link.to) ? "page" : void 0,
							children: link.label
						}, link.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							className: "inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink/90 active:scale-[0.96]",
							children: "Start a project"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitch, {
							light,
							onToggle: () => setTheme(!light)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitch, {
						light,
						onToggle: () => setTheme(!light)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-ink",
						"aria-expanded": open,
						"aria-controls": "mobile-nav",
						onClick: () => setOpen((value) => !value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: open ? "Close menu" : "Open menu"
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-5",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
							className: "size-5",
							"aria-hidden": true
						})]
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			id: "mobile-nav",
			className: "border-t border-line px-5 py-3 md:hidden",
			"aria-label": "Mobile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col",
				children: [links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					hash: link.hash,
					className: "flex min-h-11 items-center text-base text-ink",
					children: link.label
				}) }, link.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "pt-2 pb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/start",
						className: "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-paper",
						children: "Start a project"
					})
				})]
			})
		}) : null]
	});
}
function ThemeSwitch({ light, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": light,
		"aria-label": light ? "Switch to dark" : "Switch to light",
		onClick: onToggle,
		className: "relative grid h-11 w-[4.5rem] shrink-0 grid-cols-2 items-center rounded-full border border-line bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: cn("absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ink transition-all duration-200", light ? "left-1" : "right-1")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
				className: cn("relative z-10 mx-auto size-4", light ? "text-paper" : "text-muted"),
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
				className: cn("relative z-10 mx-auto size-4", light ? "text-muted" : "text-paper"),
				"aria-hidden": true
			})
		]
	});
}
function Wordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-2 text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-9 place-items-center rounded-lg bg-signal font-display text-lg italic leading-none text-on-signal",
			children: "L"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-[15px] font-medium tracking-tight whitespace-nowrap sm:text-base",
			children: ["CreatedBy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display italic",
				children: "Lewis"
			})]
		})]
	});
}
function ClosingCta() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	if (pathname.startsWith("/start") || pathname.startsWith("/book") || pathname.startsWith("/enquiries")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 text-center sm:px-12 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0",
						style: { background: "radial-gradient(50% 80% at 20% 0%, color-mix(in srgb, var(--color-signal) 28%, transparent), transparent 70%), radial-gradient(40% 70% at 85% 100%, rgb(212 106 154 / 0.16), transparent 70%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow relative",
						children: "Got something to sell?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "relative mx-auto mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-ink sm:text-6xl",
						children: [
							"Let’s build the site that takes the ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-signal",
								children: "order"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative mx-auto mt-5 max-w-md text-muted",
						children: "A free call, in person or on video. Nothing to pay, and no deposit until you’re sure."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							className: "inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-[background-color,scale] duration-200 hover:bg-ink/90 active:scale-[0.96]",
							children: "Book a call"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/estimate",
							className: "inline-flex min-h-11 items-center justify-center rounded-full border border-ink/30 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink",
							children: "Get an estimate"
						})]
					})
				]
			})
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Design and build. United Kingdom."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex flex-col gap-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+447484686442",
								className: "text-muted hover:text-ink",
								children: "07484 686442"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@createdbylewis.com",
								className: "text-muted hover:text-ink",
								children: "hello@createdbylewis.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.instagram.com/createdbylewis",
								className: "inline-flex items-center gap-2 text-muted hover:text-ink",
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
									className: "size-4",
									"aria-hidden": true
								}), "Instagram"]
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-wrap gap-x-6 gap-y-2 text-sm",
					"aria-label": "Footer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/work",
							className: "text-muted hover:text-ink",
							children: "Work"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/packages",
							className: "text-muted hover:text-ink",
							children: "Packages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/estimate",
							className: "text-muted hover:text-ink",
							children: "Estimate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							className: "text-muted hover:text-ink",
							children: "Book a consultation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							className: "text-muted hover:text-ink",
							children: "Start a project"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" CreatedByLewis"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 pb-10 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Pay with"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 flex flex-wrap items-center gap-x-6 gap-y-4",
				"aria-label": "Payment methods",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplePayMark, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GooglePayMark, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayPalMark, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KlarnaMark, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearpayMark, {}) })
				]
			})]
		})]
	});
}
function ApplePayMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 text-ink",
		"aria-label": "Apple Pay",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			className: "h-5 w-5",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] font-medium tracking-tight",
			children: "Pay"
		})]
	});
}
function GooglePayMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		"aria-label": "Google Pay",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "h-5 w-5",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#4285F4",
					d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#34A853",
					d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FBBC05",
					d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#EA4335",
					d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] font-medium tracking-tight text-ink",
			children: "Pay"
		})]
	});
}
function PayPalMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-[17px] font-semibold tracking-tight",
		"aria-label": "PayPal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#003087]",
			children: "Pay"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#009cde]",
			children: "Pal"
		})]
	});
}
function KlarnaMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-[17px] font-black tracking-tight text-ink",
		"aria-label": "Klarna",
		children: ["Klarna", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#ff8db8]",
			children: "."
		})]
	});
}
function ClearpayMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex flex-col text-ink",
		"aria-label": "Clearpay",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[16px] font-semibold tracking-tight lowercase",
			children: "clearpay"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 h-0.5 w-full rounded-full bg-[#00d37f]" })]
	});
}
var styles_default = "/assets/styles-CLV2nr-A.css";
var themeScript = `(function(){try{var t=localStorage.getItem("lewis-theme");if(t==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#f3f2ef");}}catch(e){}})();`;
var jsonLd = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "CreatedByLewis",
	url: "https://www.createdbylewis.com",
	email: "hello@createdbylewis.com",
	telephone: "+447484686442",
	image: "https://www.createdbylewis.com/lewis.jpg",
	description: "Lewis designs and builds websites for brands that sell a product and take orders, anywhere in the UK.",
	areaServed: {
		"@type": "Country",
		"name": "United Kingdom"
	},
	founder: {
		"@type": "Person",
		"name": "Lewis Stratford"
	},
	priceRange: "££"
});
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CreatedByLewis" },
			{
				name: "description",
				content: "CreatedByLewis designs and builds websites for brands that take orders, anywhere in the UK."
			},
			{
				name: "theme-color",
				content: "#111114"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,560&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeScript } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: jsonLd }
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedInsights, {})
		] })]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-pxjPQDOt.mjs");
var Route$11 = createFileRoute("/")({
	head: () => seo({
		title: "Websites that take orders | CreatedByLewis",
		description: "Lewis designs and builds websites for brands that sell online, anywhere in the UK. Custom shops, build-a-box ordering, and subscriptions.",
		path: "/"
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_-CWdPWZpr.mjs");
var Route$10 = createFileRoute("/$")({
	head: () => seo({
		title: "Page not found | CreatedByLewis",
		description: "That page isn’t here. Head back to CreatedByLewis to see the work and packages.",
		path: "/404",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./book-CshlzjuQ.mjs");
var Route$9 = createFileRoute("/book")({
	head: () => seo({
		title: "Book a consultation | CreatedByLewis",
		description: "Book a free consultation with CreatedByLewis. The time goes straight into Lewis’s calendar. Nothing to pay.",
		path: "/book"
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./enquiries-BAi0Tjl_.mjs");
var Route$8 = createFileRoute("/enquiries")({
	head: () => seo({
		title: "Enquiries | CreatedByLewis",
		path: "/enquiries",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./estimate-CLhsX-lG.mjs");
var Route$7 = createFileRoute("/estimate")({
	head: () => seo({
		title: "Estimate | CreatedByLewis",
		description: "Answer a few questions and I’ll match a website package and a starting price.",
		path: "/estimate"
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var body = `User-agent: *
Allow: /
Disallow: /enquiries

Sitemap: ${SITE_URL}/sitemap.xml
`;
var Route$6 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => new Response(body, { headers: {
	"content-type": "text/plain; charset=utf-8",
	"cache-control": "public, max-age=3600"
} }) } } });
var LASTMOD = "2026-10-29";
function build() {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/packages",
		...packages.map((pkg) => `/packages/${pkg.id}`),
		"/estimate",
		"/book",
		"/start",
		"/work",
		...projects.map((project) => `/work/${project.slug}`)
	].map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${LASTMOD}</lastmod></url>`).join("\n")}\n</urlset>\n`;
}
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: () => new Response(build(), { headers: {
	"content-type": "application/xml; charset=utf-8",
	"cache-control": "public, max-age=3600"
} }) } } });
var $$splitComponentImporter$4 = () => import("./start-C27nbrRh.mjs");
var Route$4 = createFileRoute("/start")({
	validateSearch: (search) => {
		const next = {};
		if (isPackageId(search.package)) next.package = search.package;
		if (search.paid === "1") next.paid = "1";
		if (typeof search.session_id === "string" && search.session_id.startsWith("cs_")) {
			next.paid = "1";
			next.session_id = search.session_id;
		}
		return next;
	},
	head: () => seo({
		title: "Start a project | CreatedByLewis",
		description: "Order a CreatedByLewis website package. You’ll get an invoice to start, and no card details are taken on the site.",
		path: "/start"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./packages.index-DLITXaeY.mjs");
var Route$3 = createFileRoute("/packages/")({
	head: () => seo({
		title: "Ways to work | CreatedByLewis",
		description: "Shop at £1,000, Box at £1,500, Stay at £2,000. Partner is £150 a month for six months after launch. Prices are a starting point.",
		path: "/packages"
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitNotFoundComponentImporter$1 = () => import("./packages._id-C8_EfpqA.mjs");
var $$splitComponentImporter$2 = () => import("./packages._id-uH8G1ru1.mjs");
function isPackageParam(value) {
	return value === "order" || value === "box" || value === "complete";
}
var Route$2 = createFileRoute("/packages/$id")({
	loader: ({ params }) => {
		if (!isPackageParam(params.id)) throw notFound();
		const pkg = packages.find((item) => item.id === params.id);
		if (!pkg) throw notFound();
		return { pkg };
	},
	head: ({ loaderData }) => loaderData ? seo({
		title: `${loaderData.pkg.name} | CreatedByLewis`,
		description: loaderData.pkg.blurb,
		path: `/packages/${loaderData.pkg.id}`
	}) : { meta: [] },
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
var $$splitComponentImporter$1 = () => import("./work.index-CFap-ZQX.mjs");
var Route$1 = createFileRoute("/work/")({
	head: () => seo({
		title: "My work | CreatedByLewis",
		description: "Sites that take orders. JKitchen Cooks, The Farmers Box, Real Food Delivered, The Macro Kitchen, PocketPlan and Trackr.",
		path: "/work"
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitNotFoundComponentImporter = () => import("./work._slug-Dn8CQHf_.mjs");
var $$splitComponentImporter = () => import("./work._slug-BTtgTL3O.mjs");
var Route = createFileRoute("/work/$slug")({
	loader: ({ params }) => {
		const project = getProject(params.slug);
		if (!project) throw notFound();
		return {
			project,
			next: nextProject(params.slug)
		};
	},
	head: ({ loaderData }) => loaderData ? seo({
		title: `${loaderData.project.name} | CreatedByLewis`,
		description: loaderData.project.lede,
		path: `/work/${loaderData.project.slug}`
	}) : { meta: [] },
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var SplatRoute = Route$10.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => Route$12
});
var BookRoute = Route$9.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => Route$12
});
var EnquiriesRoute = Route$8.update({
	id: "/enquiries",
	path: "/enquiries",
	getParentRoute: () => Route$12
});
var EstimateRoute = Route$7.update({
	id: "/estimate",
	path: "/estimate",
	getParentRoute: () => Route$12
});
var RobotsDottxtRoute = Route$6.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$12
});
var SitemapDotxmlRoute = Route$5.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$12
});
var StartRoute = Route$4.update({
	id: "/start",
	path: "/start",
	getParentRoute: () => Route$12
});
var PackagesIndexRoute = Route$3.update({
	id: "/packages/",
	path: "/packages/",
	getParentRoute: () => Route$12
});
var PackagesIdRoute = Route$2.update({
	id: "/packages/$id",
	path: "/packages/$id",
	getParentRoute: () => Route$12
});
var WorkIndexRoute = Route$1.update({
	id: "/work/",
	path: "/work/",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	SplatRoute,
	BookRoute,
	EnquiriesRoute,
	EstimateRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	StartRoute,
	PackagesIdRoute,
	WorkSlugRoute: Route.update({
		id: "/work/$slug",
		path: "/work/$slug",
		getParentRoute: () => Route$12
	}),
	PackagesIndexRoute,
	WorkIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { cn as a, Route$4 as i, Route as n, Route$2 as r, router_exports as t };
