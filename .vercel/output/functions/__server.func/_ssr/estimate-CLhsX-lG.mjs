import { o as __toESM } from "../_runtime.mjs";
import { i as formatGBP, m as timelines, p as quote } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-NXKshwsp.mjs";
import { t as Button } from "./button-C_CHC-nK.mjs";
import { a as makeRef, n as PayDeposit, o as saveOrder, t as ExtrasPicker } from "./orders-BT0MpybS.mjs";
import { t as sendEnquiry } from "./enquire-DCiAuOx-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estimate-CLhsX-lG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var meetings = [
	{
		id: "person",
		title: "In person",
		detail: "Wherever suits you, or we can do it on a call."
	},
	{
		id: "video",
		title: "Video call",
		detail: "We go through it on a call."
	},
	{
		id: "either",
		title: "Either is fine",
		detail: "I’ll fit around whatever works for you."
	}
];
function jobsFor(_hasSite) {
	return [
		{
			id: "ordering",
			title: "A home page and a store",
			detail: "People land, browse and buy. That’s Shop."
		},
		{
			id: "box",
			title: "A custom build-a-box",
			detail: "Customers build the order themselves, with a postcode check and a hero made for the offer."
		},
		{
			id: "full",
			title: "The box, and a subscription",
			detail: "Everything in Shop and Box, plus weekly or monthly subscriptions to keep customers coming back, and a refresh of your branding."
		}
	];
}
function recommend(answers) {
	if (answers.job === "ordering") return "order";
	if (answers.job === "box") return "box";
	if (answers.job === "full") return "complete";
	return null;
}
function why(id) {
	if (id === "order") return "Shop. A homepage and a store, so people can buy what you sell.";
	if (id === "box") return "Box. A postcode check, a custom hero, and a build-a-box you own.";
	return "Stay. Everything in Shop and Box, plus weekly or monthly subscriptions to keep customers coming back, and a refresh of your branding.";
}
var TOTAL = 6;
function EstimatePage() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [hasSite, setHasSite] = (0, import_react.useState)(null);
	const [job, setJob] = (0, import_react.useState)(null);
	const [brand, setBrand] = (0, import_react.useState)(null);
	const [timeline, setTimeline] = (0, import_react.useState)(null);
	const [meeting, setMeeting] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [business, setBusiness] = (0, import_react.useState)("");
	const [about, setAbout] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [placed, setPlaced] = (0, import_react.useState)(null);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [sendError, setSendError] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)([]);
	const packageId = recommend({
		hasSite,
		job,
		brand
	});
	const estimate = packageId ? quote(packageId, picked) : null;
	const progress = Math.round(step / TOTAL * 100);
	function go(next) {
		setStep(next);
	}
	async function onSubmit(event) {
		event.preventDefault();
		if (!estimate) return;
		const next = {};
		if (!name.trim()) next.name = "Add your name.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Use an email I can reply to.";
		if (!business.trim()) next.business = "What’s the business called?";
		if (!about.trim()) next.about = "A sentence on what you sell is enough.";
		setErrors(next);
		const first = Object.keys(next)[0];
		if (first) {
			document.getElementById(first)?.focus();
			return;
		}
		const order = {
			ref: makeRef(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			packageId: estimate.pkg.id,
			name: name.trim(),
			email: email.trim(),
			business: business.trim(),
			about: about.trim(),
			timeline: timeline ?? "Just looking",
			meeting: meetings.find((item) => item.id === meeting)?.title,
			build: estimate.build,
			deposit: estimate.deposit,
			care: estimate.retainer?.monthly ?? null,
			retainerMonths: estimate.retainer?.months ?? null,
			extraIds: estimate.chosen.map((item) => item.id)
		};
		setSending(true);
		setSendError("");
		try {
			const result = await sendEnquiry({ data: {
				kind: "estimate",
				ref: order.ref,
				name: order.name,
				email: order.email,
				business: order.business,
				about: order.about,
				packageName: estimate.pkg.name,
				timeline: order.timeline,
				meeting: order.meeting,
				build: order.build,
				deposit: order.deposit,
				extras: estimate.chosen.map((item) => item.name).join(", ")
			} });
			if (!result.ok) {
				setSendError(result.message || "That didn’t send. Email hello@createdbylewis.com.");
				return;
			}
		} catch {
			setSendError("That didn’t send. Email hello@createdbylewis.com.");
			return;
		} finally {
			setSending(false);
		}
		saveOrder(order);
		setPlaced(order);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	if (placed && estimate) {
		const first = placed.name.split(" ")[0];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-line bg-card p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: "Estimate received"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-display text-4xl text-ink sm:text-5xl",
						children: [
							"Thanks, ",
							first,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-lg leading-relaxed text-muted",
						children: [
							placed.business,
							" looks like a fit for ",
							estimate.pkg.name,
							", from ",
							formatGBP(placed.build),
							". A confirmation is on its way to ",
							placed.email,
							". Pay the deposit if you’re ready to start, or hold off and we can still talk about the price."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 space-y-2 border-t border-line pt-6 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Reference",
								value: placed.ref,
								strong: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Package",
								value: estimate.pkg.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Build",
								value: formatGBP(placed.build)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Deposit to start",
								value: formatGBP(placed.deposit),
								strong: true
							}),
							placed.care ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Partner",
								value: `${formatGBP(placed.care)}/mo for ${placed.retainerMonths ?? 6} months`
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Start",
								value: placed.timeline
							}),
							placed.meeting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "Talk",
								value: placed.meeting
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm leading-relaxed text-ink",
						children: [
							"“",
							placed.about,
							"”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayDeposit, {
						packageId: estimate.pkg.id,
						amount: placed.deposit,
						email: placed.email,
						extras: placed.extraIds,
						className: "mt-8"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex min-h-11 items-center text-sm text-muted hover:text-ink",
					children: "Back home"
				})
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Estimate"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-2xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl",
				children: "What would it cost?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Six short questions, and I’ll match a package as you go. The price is a starting point, so tell me if your budget is different."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex gap-2",
					"aria-label": "Progress",
					children: Array.from({ length: TOTAL }, (_, index) => {
						const number = index + 1;
						const current = number === step;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: number > step,
							"aria-current": current ? "step" : void 0,
							onClick: () => go(number),
							className: cn("grid size-11 place-items-center rounded-full text-sm transition-colors duration-200", current && "bg-signal text-on-signal", number < step && "border border-line bg-card text-ink hover:border-ink", number > step && "border border-line text-muted disabled:opacity-100"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: current ? `Step ${number}, current` : `Step ${number}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: number
							})]
						}) }, number);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-line",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-signal transition-[width] duration-300 ease-out",
						style: { width: `${progress}%` }
					})
				})]
			}),
			estimate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-line bg-card px-4 py-3 lg:hidden",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Matched"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-ink",
						children: estimate.pkg.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-ink tabular-nums",
						children: formatGBP(estimate.build)
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "step-in",
					children: [
						step > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => go(step - 1),
							className: "mb-6 inline-flex min-h-11 items-center text-sm text-muted hover:text-ink",
							children: "Back"
						}) : null,
						step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Question, {
							kicker: "1 of 6",
							title: "Do you already have a website?",
							hint: "Either way, we start from what you sell.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Choices, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: "Yes",
								detail: "You have a site already, but it might need starting again.",
								selected: hasSite === "yes",
								onPick: () => {
									setHasSite("yes");
									go(2);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: "Not yet",
								detail: "This would be the first one.",
								selected: hasSite === "no",
								onPick: () => {
									setHasSite("no");
									setJob(null);
									go(2);
								}
							})] })
						}) : null,
						step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Question, {
							kicker: "2 of 6",
							title: "What should the site do?",
							hint: "Pick the closest one. We can change it later.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choices, { children: jobsFor(hasSite).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: item.title,
								detail: item.detail,
								selected: job === item.id,
								onPick: () => {
									setJob(item.id);
									go(3);
								}
							}, item.id)) })
						}) : null,
						step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Question, {
							kicker: "3 of 6",
							title: "Want Partner after launch?",
							hint: "£150 a month for six months, on top of whichever build you pick. Menu changes, fixes and one improvement a month. It looks after the site rather than adding to it.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Choices, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: "The site is enough",
								detail: "Stick with the package that matches what you picked.",
								selected: brand === "site",
								onPick: () => {
									setBrand("site");
									setPicked((current) => current.filter((id) => id !== "care"));
									go(4);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: "Add Partner after launch",
								detail: "£150 a month for six months. Menu changes, fixes and one improvement a month. The build price stays the same.",
								selected: brand === "works",
								onPick: () => {
									setBrand("works");
									setPicked((current) => current.includes("care") ? current : [...current, "care"]);
									go(4);
								}
							})] })
						}) : null,
						step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Question, {
							kicker: "4 of 6",
							title: "When do you want to start?",
							hint: "A rough window is enough.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choices, { children: timelines.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: item,
								selected: timeline === item,
								onPick: () => {
									setTimeline(item);
									go(5);
								}
							}, item)) })
						}) : null,
						step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Question, {
							kicker: "5 of 6",
							title: "How should we talk?",
							hint: "In person or on a video call. While it’s being built, I’m on call.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choices, { children: meetings.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								title: item.title,
								detail: item.detail,
								selected: meeting === item.id,
								onPick: () => {
									setMeeting(item.id);
									go(6);
								}
							}, item.id)) })
						}) : null,
						step === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Question, {
							kicker: "6 of 6",
							title: "Where do I send this?",
							hint: "I’ll reply with a start date. Nothing is charged on this page.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								id: "estimate-details",
								className: "space-y-5",
								onSubmit,
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "name",
										label: "Your name",
										error: errors.name,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "name",
											name: "name",
											autoComplete: "name",
											value: name,
											onChange: (event) => setName(event.target.value),
											className: inputClass(Boolean(errors.name)),
											"aria-invalid": Boolean(errors.name),
											"aria-describedby": errors.name ? "name-error" : void 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "email",
										label: "Email",
										error: errors.email,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "email",
											name: "email",
											type: "email",
											autoComplete: "email",
											value: email,
											onChange: (event) => setEmail(event.target.value),
											className: inputClass(Boolean(errors.email)),
											"aria-invalid": Boolean(errors.email),
											"aria-describedby": errors.email ? "email-error" : void 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "business",
										label: "Business",
										error: errors.business,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "business",
											name: "business",
											autoComplete: "organization",
											value: business,
											onChange: (event) => setBusiness(event.target.value),
											className: inputClass(Boolean(errors.business)),
											"aria-invalid": Boolean(errors.business),
											"aria-describedby": errors.business ? "business-error" : void 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "about",
										label: "What do you sell?",
										error: errors.about,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "about",
											name: "about",
											rows: 4,
											value: about,
											onChange: (event) => setAbout(event.target.value),
											className: cn(inputClass(Boolean(errors.about)), "min-h-28 py-3"),
											"aria-invalid": Boolean(errors.about),
											"aria-describedby": errors.about ? "about-error" : void 0
										})
									}),
									packageId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtrasPicker, {
										packageId,
										selected: picked,
										onToggle: (id) => {
											setPicked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
											if (id === "care") setBrand(picked.includes("care") ? "site" : "works");
										}
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: !estimate || sending,
										className: "w-full sm:w-auto",
										children: sending ? "Sending…" : estimate ? `Send estimate · ${formatGBP(estimate.deposit)} deposit` : "Pick a package first"
									}),
									sendError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-md text-sm text-signal",
										role: "alert",
										children: sendError
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-md text-sm text-muted",
										children: "Sending this just asks me to take a look. The price can still change, and you aren’t charged until you pay an invoice."
									})
								]
							})
						}) : null
					]
				}, step), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden rounded-xl border border-line bg-card p-5 lg:sticky lg:top-24 lg:block",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs tracking-widest text-muted uppercase",
							children: "Matched package"
						}),
						estimate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-3xl text-ink",
								children: estimate.pkg.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-4xl tabular-nums text-ink",
								children: formatGBP(estimate.build)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: why(estimate.pkg.id)
							}),
							estimate.retainer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-ink",
								children: [
									"then ",
									formatGBP(estimate.retainer.monthly),
									" a month for ",
									estimate.retainer.months,
									" months"
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 border-t border-line pt-4 text-sm text-muted",
								children: [
									"25% to start, ",
									formatGBP(estimate.deposit),
									". The rest when it goes live."
								]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "Keep going. Your package appears once I know what the site needs to do."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs leading-relaxed text-muted",
							children: [
								"Prices are negotiable.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/packages",
									className: "text-ink underline decoration-line underline-offset-4",
									children: "See every package"
								}),
								"."
							]
						})
					]
				})]
			})
		]
	});
}
function Question({ kicker, title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 font-display text-4xl text-ink sm:text-5xl",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-lg text-muted",
			children: hint
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children
		})
	] });
}
function Choices({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children
	});
}
function Choice({ title, detail, selected, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onPick,
		"aria-pressed": selected,
		className: cn("w-full rounded-xl border p-5 text-left transition-colors duration-200", selected ? "border-signal bg-card" : "border-line bg-paper hover:border-ink/50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-base font-medium text-ink",
			children: title
		}), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-sm leading-relaxed text-muted",
			children: detail
		}) : null]
	});
}
function Field({ id, label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "text-sm font-medium text-ink",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: `${id}-error`,
			className: "mt-1.5 text-sm text-signal",
			children: error
		}) : null
	] });
}
function Line({ label, value, strong = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: strong ? "text-ink" : "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("text-right tabular-nums", strong ? "font-medium text-ink" : "text-ink"),
			children: value
		})]
	});
}
function inputClass(invalid) {
	return cn("w-full min-h-11 rounded-md border bg-card px-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-ink", invalid ? "border-signal" : "border-line");
}
//#endregion
export { EstimatePage as component };
