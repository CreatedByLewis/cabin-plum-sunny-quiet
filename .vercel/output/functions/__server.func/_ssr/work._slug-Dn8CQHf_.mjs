import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ButtonLink } from "./button-C_CHC-nK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work._slug-Dn8CQHf_.js
var import_jsx_runtime = require_jsx_runtime();
function MissingStudy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-20 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-5xl text-ink",
			children: "That case study isn’t here."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/",
				hash: "work",
				variant: "secondary",
				children: "Back to the work"
			})
		})]
	});
}
//#endregion
export { MissingStudy as notFoundComponent };
