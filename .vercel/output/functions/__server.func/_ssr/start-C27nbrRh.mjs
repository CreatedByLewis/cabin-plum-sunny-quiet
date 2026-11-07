import { o as __toESM } from "../_runtime.mjs";
import { i as formatGBP, p as quote, t as extras, u as packages } from "./content-CgSyAvuN.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, i as Route$4 } from "./router-NXKshwsp.mjs";
import { r as ButtonLink, t as Button } from "./button-C_CHC-nK.mjs";
import { a as makeRef, i as loadOrders, n as PayDeposit, o as saveOrder, r as confirmCheckout, t as ExtrasPicker } from "./orders-BT0MpybS.mjs";
import { t as sendEnquiry } from "./enquire-DCiAuOx-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-C27nbrRh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEEKDAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
function startOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function addDays(date, days) {
	const next = new Date(date);
	next.setDate(next.getDate() + days);
	return startOfDay(next);
}
function sameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function monthCells(year, month) {
	const pad = (new Date(year, month, 1).getDay() + 6) % 7;
	const count = new Date(year, month + 1, 0).getDate();
	const cells = Array.from({ length: pad }, () => null);
	for (let day = 1; day <= count; day += 1) cells.push(new Date(year, month, day));
	while (cells.length % 7 !== 0) cells.push(null);
	return cells;
}
function formatStart(day) {
	return new Intl.DateTimeFormat("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(day);
}
function StartPage() {
	const search = Route$4.useSearch();
	const navigate = useNavigate();
	const formId = (0, import_react.useId)();
	const [packageId, setPackageId] = (0, import_react.useState)(search.package ?? "box");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [business, setBusiness] = (0, import_react.useState)("");
	const [about, setAbout] = (0, import_react.useState)("");
	const earliest = addDays(/* @__PURE__ */ new Date(), 1);
	const latest = addDays(earliest, 183);
	const [cursor, setCursor] = (0, import_react.useState)(() => new Date(earliest.getFullYear(), earliest.getMonth(), 1));
	const [startDay, setStartDay] = (0, import_react.useState)(null);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [placed, setPlaced] = (0, import_react.useState)(null);
	const [past, setPast] = (0, import_react.useState)([]);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [sendError, setSendError] = (0, import_react.useState)("");
	const [payment, setPayment] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setPast(loadOrders());
	}, []);
	(0, import_react.useEffect)(() => {
		if (search.package) setPackageId(search.package);
	}, [search.package]);
	(0, import_react.useEffect)(() => {
		const sessionId = search.session_id;
		if (!sessionId) return;
		let cancelled = false;
		setPayment({ status: "checking" });
		confirmCheckout({ data: { sessionId } }).then((result) => {
			if (cancelled) return;
			if (result.ok && result.paid) {
				setPayment({
					status: "paid",
					packageName: result.packageName,
					deposit: result.deposit,
					email: result.email
				});
				return;
			}
			setPayment({
				status: "open",
				message: result.ok ? "That payment isn’t complete yet." : result.message
			});
		});
		return () => {
			cancelled = true;
		};
	}, [search.session_id]);
	const estimate = quote(packageId, picked);
	function toggleExtra(id) {
		setPicked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	function selectPackage(id) {
		setPackageId(id);
		navigate({
			to: "/start",
			search: { package: id },
			replace: true
		});
	}
	async function onSubmit(event) {
		event.preventDefault();
		const next = {};
		if (!name.trim()) next.name = "Add your name.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Use an email I can reply to.";
		if (!business.trim()) next.business = "What’s the business called?";
		if (!about.trim()) next.about = "A sentence on what you sell is enough.";
		if (!startDay) next.timeline = "Pick the day you’d like to start.";
		setErrors(next);
		const first = Object.keys(next)[0];
		if (first) {
			document.getElementById(first)?.focus();
			return;
		}
		const order = {
			ref: makeRef(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			packageId,
			name: name.trim(),
			email: email.trim(),
			business: business.trim(),
			about: about.trim(),
			timeline: startDay ? formatStart(startDay) : "",
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
				kind: "order",
				ref: order.ref,
				name: order.name,
				email: order.email,
				business: order.business,
				about: order.about,
				packageName: estimate.pkg.name,
				timeline: order.timeline,
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
		const saved = saveOrder(order);
		setPast(saved);
		setPlaced(order);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	if (search.paid === "1" && !search.session_id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-line bg-card p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Payment"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl text-ink sm:text-5xl",
					children: "You’re back from checkout."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg leading-relaxed text-muted",
					children: "If Stripe showed a receipt, the deposit is paid and I’ll be in touch with a start date. The rest is due when the site goes live. If you closed the page before paying, nothing was taken."
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
	if (search.session_id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-line bg-card p-6 sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Payment"
			}), payment?.status === "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-ink sm:text-5xl",
				children: "Deposit received."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-lg leading-relaxed text-muted",
				children: [
					formatGBP(payment.deposit),
					" is in for ",
					payment.packageName,
					". I’ll be in touch",
					payment.email ? ` at ${payment.email}` : "",
					" with a start date. The rest is due when the site goes live."
				]
			})] }) : payment?.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-ink sm:text-5xl",
				children: "Payment not finished."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-lg leading-relaxed text-muted",
				children: payment.message
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-ink sm:text-5xl",
				children: "Checking the payment."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "One moment."
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-flex min-h-11 items-center text-sm text-muted hover:text-ink",
				children: "Back home"
			})
		})]
	});
	if (placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { order: placed }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => setPlaced(null),
					children: "Place another order"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-muted hover:text-ink",
					children: "Back home"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earlier, {
				orders: past.filter((item) => item.ref !== placed.ref),
				onOpen: setPlaced
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Order"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-2xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl",
				children: "Start a Project."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Choose a package and send me the brief. Prices are negotiable, so say if your budget is different. I’ll reply with a start date and an invoice for the deposit. No card details are taken here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					id: "project-order",
					className: "space-y-12",
					onSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-display text-2xl text-ink",
							children: "Package"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: packages.map((pkg) => {
								const selected = pkg.id === packageId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: cn("flex cursor-pointer gap-4 rounded-xl border p-4 transition-colors duration-200", selected ? "border-ink bg-card" : "border-line hover:border-ink/40"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "package",
										className: "mt-1 size-4 accent-signal",
										checked: selected,
										onChange: () => selectPackage(pkg.id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-baseline justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-ink",
												children: pkg.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums text-ink",
												children: formatGBP(pkg.price)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-sm leading-relaxed text-muted",
											children: pkg.blurb
										})]
									})]
								}, pkg.id);
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "font-display text-2xl text-ink",
									children: "The Brief"
								}),
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
										inputMode: "email",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtrasPicker, {
									packageId,
									selected: picked,
									onToggle: toggleExtra
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-ink",
										children: "When do you want to start?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "Pick a date. We can move it if the brief changes."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 rounded-xl border border-line bg-card p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "grid size-11 place-items-center rounded-md text-ink hover:bg-paper disabled:text-muted",
														"aria-label": "Previous month",
														disabled: cursor.getFullYear() === earliest.getFullYear() && cursor.getMonth() === earliest.getMonth(),
														onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)),
														children: "‹"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-medium text-ink",
														children: new Intl.DateTimeFormat("en-GB", {
															month: "long",
															year: "numeric"
														}).format(cursor)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "grid size-11 place-items-center rounded-md text-ink hover:bg-paper disabled:text-muted",
														"aria-label": "Next month",
														disabled: cursor.getFullYear() === latest.getFullYear() && cursor.getMonth() === latest.getMonth(),
														onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)),
														children: "›"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-3 grid grid-cols-7 gap-1 text-center text-xs text-muted",
												children: WEEKDAYS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "py-1",
													children: label
												}, label))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-7 gap-1",
												children: monthCells(cursor.getFullYear(), cursor.getMonth()).map((date, index) => {
													if (!date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `empty-${index}`);
													const closed = date < earliest || date > latest;
													const selected = startDay ? sameDay(date, startDay) : false;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: closed,
														"aria-pressed": selected,
														onClick: () => {
															setStartDay(date);
															setErrors((current) => ({
																...current,
																timeline: void 0
															}));
														},
														className: cn("grid h-11 place-items-center rounded-md text-sm", selected && "bg-ink text-paper", !selected && !closed && "text-ink hover:bg-paper", closed && "text-muted/40"),
														children: date.getDate()
													}, `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
												})
											})
										]
									}),
									startDay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-ink",
										children: formatStart(startDay)
									}) : null,
									errors.timeline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-sm text-signal",
										children: errors.timeline
									}) : null
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full sm:w-auto",
									disabled: sending,
									children: sending ? "Sending…" : "Place order"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
									to: "/book",
									variant: "secondary",
									className: "w-full sm:w-auto",
									children: "Book a free chat"
								})]
							}),
							sendError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md text-sm text-signal",
								role: "alert",
								children: sendError
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md text-sm text-muted",
								children: "Placing the order sends me the brief. You aren’t charged until you pay the deposit in the summary. If the budget needs to change, say so and we’ll sort it before anything is invoiced."
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-line bg-card p-5 lg:sticky lg:top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs tracking-widest text-muted uppercase",
							children: "This order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-3xl text-ink",
							children: estimate.pkg.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: estimate.pkg.name,
									value: formatGBP(estimate.pkg.price)
								}),
								estimate.chosen.filter((item) => !item.monthly).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: item.name,
									value: formatGBP(item.price)
								}, item.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-4 border-t border-line pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink",
										children: "Build"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium text-ink tabular-nums",
										children: formatGBP(estimate.build)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Deposit to start",
									value: formatGBP(estimate.deposit),
									strong: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "On launch",
									value: formatGBP(estimate.balance)
								}),
								estimate.retainer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Partner, after launch",
									value: `${formatGBP(estimate.retainer.monthly)}/mo × ${estimate.retainer.months}`
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							id: formId,
							className: "mt-5 text-xs leading-relaxed text-muted",
							children: ["25% now, the rest when it goes live. Pay the deposit below, or send the brief and I’ll invoice you.", estimate.retainer ? " Partner is billed monthly after launch and isn’t part of the build." : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayDeposit, {
							packageId,
							amount: estimate.deposit,
							email,
							extras: estimate.chosen.map((item) => item.id),
							className: "mt-5"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earlier, {
				orders: past,
				onOpen: setPlaced
			})
		]
	});
}
function Receipt({ order }) {
	const pkg = packages.find((item) => item.id === order.packageId);
	const first = order.name.split(" ")[0];
	const months = order.retainerMonths;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-line bg-card p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Order received"
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
					order.business,
					" is in the queue. A confirmation is on its way to ",
					order.email,
					". Pay the",
					" ",
					formatGBP(order.deposit),
					" deposit to get started, or wait and I’ll send an invoice to that address. We can still talk through the budget before any work begins."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 space-y-2 border-t border-line pt-6 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Reference",
						value: order.ref,
						strong: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Package",
						value: pkg?.name ?? order.packageId
					}),
					(order.extraIds ?? []).flatMap((id) => {
						const item = extras.find((extra) => extra.id === id);
						if (!item || item.monthly) return [];
						return [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: item.name,
							value: formatGBP(item.price)
						}, item.id)];
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Build",
						value: formatGBP(order.build)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Deposit",
						value: formatGBP(order.deposit),
						strong: true
					}),
					order.care ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Partner",
						value: months ? `${formatGBP(order.care)}/mo for ${months} months` : `${formatGBP(order.care)}/mo`
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Start",
						value: order.timeline
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm leading-relaxed text-ink",
				children: [
					"“",
					order.about,
					"”"
				]
			}),
			pkg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayDeposit, {
				packageId: pkg.id,
				amount: order.deposit,
				email: order.email,
				extras: order.extraIds,
				className: "mt-8"
			}) : null
		]
	});
}
function Earlier({ orders, onOpen }) {
	if (orders.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-14 border-t border-line pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "Orders on this device"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-line border-y border-line",
			children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					onOpen(order);
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				},
				className: "flex min-h-14 w-full items-center justify-between gap-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium text-ink",
					children: order.business
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted",
					children: order.ref
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-ink tabular-nums",
					children: formatGBP(order.build)
				})]
			}) }, order.ref))
		})]
	});
}
function Row({ label, value, strong = false }) {
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
function inputClass(invalid) {
	return cn("w-full min-h-11 rounded-md border bg-card px-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-ink", invalid ? "border-signal" : "border-line");
}
//#endregion
export { StartPage as component };
