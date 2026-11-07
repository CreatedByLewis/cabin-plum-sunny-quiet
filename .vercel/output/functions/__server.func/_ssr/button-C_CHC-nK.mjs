import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-NXKshwsp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-C_CHC-nK.js
var import_jsx_runtime = require_jsx_runtime();
var base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,scale,border-color] duration-200 ease-out active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50";
var variants = {
	primary: "bg-ink text-paper hover:bg-ink/90",
	secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
	inverse: "bg-paper text-ink hover:bg-card",
	quiet: "border border-line bg-card text-ink hover:border-ink"
};
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(base, variants[variant], className),
		...props
	});
}
function ButtonLink({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		className: cn(base, variants[variant], className),
		...props
	});
}
function ButtonAnchor({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: cn(base, variants[variant], className),
		...props
	});
}
//#endregion
export { ButtonAnchor as n, ButtonLink as r, Button as t };
