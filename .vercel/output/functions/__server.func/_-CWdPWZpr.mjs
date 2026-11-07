import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as ButtonLink } from "./_ssr/button-C_CHC-nK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-CWdPWZpr.js
var import_jsx_runtime = require_jsx_runtime();
function Missing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-20 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl text-ink",
				children: "That page isn’t here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/",
					variant: "secondary",
					children: "Back home"
				})
			})
		]
	});
}
//#endregion
export { Missing as component };
