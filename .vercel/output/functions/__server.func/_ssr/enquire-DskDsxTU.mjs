import { i as formatGBP, u as packages } from "./content-CgSyAvuN.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquire-DskDsxTU.js
var INBOX = "hello@createdbylewis.com";
var PHONE = "07484 686442";
var sendConsultation_createServerFn_handler = createServerRpc({
	id: "1241f7eb88bf271e60f1145f1f1f9611d1d5ed357a4eca69b1937c0c18295dc5",
	name: "sendConsultation",
	filename: "src/lib/enquire.ts"
}, (opts) => sendConsultation.__executeServer(opts));
var sendConsultation = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(sendConsultation_createServerFn_handler, async ({ data }) => {
	const name = clip(data.name, 120);
	const email = clip(data.email, 200);
	const business = clip(data.business, 160);
	const phone = clip(data.phone, 40);
	const about = clip(data.about, 4e3);
	if (!name || !business || !phone || about.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
		ok: false,
		message: "Check the name, email, phone, business, and what you want to talk about."
	};
	const { consultationCalendar } = await import("./mail.server-B6fhsoK-.mjs");
	const calendar = consultationCalendar({
		startsAt: clip(data.startsAt, 16),
		meeting: clip(data.meeting, 80),
		email,
		name,
		business,
		phone,
		ref: clip(data.ref, 20)
	});
	return postToInbox({
		kind: "consultation",
		name,
		email,
		phone,
		business,
		message: [
			`Ref: ${clip(data.ref, 20)}`,
			"Type: Consultation",
			"Deposit: none",
			`Name: ${name}`,
			`Email: ${email}`,
			`Phone: ${phone}`,
			`Business: ${business}`,
			`Talk: ${clip(data.meeting, 80)}`,
			`When: ${clip(data.when, 160)}`,
			`Video: ${calendar?.joinUrl ?? "No time locked, so no link yet."}`,
			"",
			about
		].filter(Boolean).join("\n"),
		subject: `Consultation ${clip(data.ref, 20)}: ${business}`,
		heading: "You’re booked.",
		paragraphs: calendar ? [
			`We'll talk ${clip(data.meeting, 80)}. Nothing to pay.`,
			`Join here: ${calendar.joinUrl}`,
			`If you need to change it, call ${PHONE}.`,
			"Lewis"
		] : [
			`Thanks. You're booked for ${clip(data.when, 160)}.`,
			`We'll talk ${clip(data.meeting, 80)}. Nothing to pay.`,
			`If you need to change it, call ${PHONE}.`,
			"Lewis"
		],
		appointment: calendar ? {
			weekday: calendar.weekday,
			date: calendar.date,
			time: calendar.time,
			detail: calendar.detail,
			googleUrl: calendar.googleUrl,
			outlookUrl: calendar.outlookUrl
		} : void 0,
		ics: calendar?.ics
	});
});
var sendEnquiry_createServerFn_handler = createServerRpc({
	id: "306cadc9709ccb90ae9ac0867d7309baad50b56b44893b61746fc03cb477510c",
	name: "sendEnquiry",
	filename: "src/lib/enquire.ts"
}, (opts) => sendEnquiry.__executeServer(opts));
var sendEnquiry = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(sendEnquiry_createServerFn_handler, async ({ data }) => {
	const name = clip(data.name, 120);
	const email = clip(data.email, 200);
	const business = clip(data.business, 160);
	const about = clip(data.about, 4e3);
	if (!name || !business || !about || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
		ok: false,
		message: "Check the name, email, and what you sell."
	};
	const pounds = (value) => new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
		maximumFractionDigits: 0
	}).format(value);
	const message = [
		`Ref: ${clip(data.ref, 20)}`,
		`Type: ${data.kind === "order" ? "Order" : "Estimate"}`,
		`Package: ${clip(data.packageName, 80)}`,
		`Name: ${name}`,
		`Email: ${email}`,
		`Business: ${business}`,
		`Timeline: ${clip(data.timeline, 80)}`,
		data.meeting ? `Meeting: ${clip(data.meeting, 80)}` : "",
		`Price: ${pounds(data.build)}`,
		`Deposit: ${pounds(data.deposit)}`,
		data.extras ? `Extras: ${clip(data.extras, 240)}` : "",
		"",
		about
	].filter(Boolean).join("\n");
	try {
		const kind = data.kind === "order" ? "order" : "estimate";
		return await postToInbox({
			kind,
			name,
			email,
			business,
			message,
			subject: `${data.kind === "order" ? "Order" : "Estimate"} ${clip(data.ref, 20)}: ${business}`,
			heading: kind === "order" ? "You’re in the queue." : "Estimate received.",
			paragraphs: [
				kind === "order" ? `Thanks. ${business} is in the queue for ${clip(data.packageName, 80)}${data.extras ? `, with ${clip(data.extras, 240)}` : ""}.` : `Thanks. I've got your estimate for ${clip(data.packageName, 80)}${data.extras ? `, with ${clip(data.extras, 240)}` : ""}, from ${pounds(data.build)}.`,
				kind === "order" ? `The deposit to start is ${pounds(data.deposit)}. I'll reply to this email, or call ${PHONE}.` : `I'll reply to this email. You can also call ${PHONE}.`,
				"Lewis"
			]
		});
	} catch {
		return {
			ok: false,
			message: "That didn’t send. Try again in a moment."
		};
	}
});
var sendPrices_createServerFn_handler = createServerRpc({
	id: "cdfefa47dc43daa84b005a0c5324e492e96293c01e18f2025426c2159f081996",
	name: "sendPrices",
	filename: "src/lib/enquire.ts"
}, (opts) => sendPrices.__executeServer(opts));
var sendPrices = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(sendPrices_createServerFn_handler, async ({ data }) => {
	const email = clip(data.email, 200);
	if (data.company?.trim()) return {
		ok: true,
		message: ""
	};
	if (!data.confirm) return {
		ok: false,
		message: "Tick the box so I know it isn’t a bot."
	};
	if (data.startedAt && Date.now() - data.startedAt < 2500) return {
		ok: false,
		message: "Wait a moment, then send it again."
	};
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
		ok: false,
		message: "That email doesn’t look right."
	};
	const summaries = {
		order: "A homepage and a store.",
		box: "A postcode check, a custom hero, and a build-a-box you own.",
		complete: "The box, subscriptions, search and a refresh of your branding."
	};
	const priceRows = packages.map((pkg) => ({
		name: pkg.name,
		detail: summaries[pkg.id] ?? pkg.fit,
		price: formatGBP(pkg.price),
		start: formatGBP(Math.round(pkg.price * .25)),
		time: pkg.time,
		extra: pkg.retainer ? `then ${formatGBP(pkg.retainer.monthly)} a month for ${pkg.retainer.months} months` : void 0,
		featured: pkg.featured
	}));
	return postToInbox({
		kind: "prices",
		name: email,
		email,
		message: `Asked for the prices.\nEmail: ${email}`,
		subject: `Prices: ${email}`,
		heading: "The prices.",
		paragraphs: [
			"25% now, the rest when the site goes live.",
			"Partner is optional: £150 a month for six months after launch. It covers product changes, fixes and one improvement a month, and isn’t included in the build price.",
			"Prices are negotiable. If your budget is different, call 07484 686442.",
			"Lewis"
		],
		prices: priceRows
	});
});
function postToInbox(input) {
	return deliver(input);
}
async function deliver(input) {
	const { saveEnquiry } = await import("./enquiries-CYlRhfTU.mjs");
	await saveEnquiry({
		kind: input.kind,
		name: input.name,
		email: input.email,
		phone: input.phone,
		business: input.business,
		subject: input.subject,
		message: input.message
	});
	const { sendThemedMail } = await import("./mail.server-B6fhsoK-.mjs");
	const customer = await sendThemedMail({
		to: input.email,
		subject: input.heading,
		heading: input.heading,
		paragraphs: input.paragraphs,
		replyTo: INBOX,
		text: input.paragraphs.join("\n\n"),
		appointment: input.appointment,
		prices: input.prices,
		ics: input.ics
	});
	if (customer.missingKey) return postViaForm(input);
	if (customer.ok) await sendThemedMail({
		to: INBOX,
		subject: input.subject,
		heading: input.subject,
		paragraphs: input.message.split("\n").filter(Boolean),
		replyTo: input.email,
		text: input.message,
		appointment: input.appointment,
		ics: input.ics
	});
	return {
		ok: customer.ok,
		message: customer.ok ? "" : customer.message || "That didn’t send. Try again in a moment."
	};
}
function postViaForm(input) {
	return fetch(`https://formsubmit.co/ajax/${INBOX}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Origin: "https://www.createdbylewis.com",
			Referer: "https://www.createdbylewis.com/"
		},
		body: JSON.stringify({
			name: input.name,
			email: input.email,
			message: input.message,
			_subject: input.subject,
			_replyto: input.email,
			_autoresponse: input.paragraphs.join("\n\n"),
			_template: "box",
			_captcha: "false"
		})
	}).then(async (response) => {
		const body = await response.json().catch(() => null);
		const ok = response.ok && (body?.success === true || body?.success === "true");
		return {
			ok,
			message: body?.message || (ok ? "" : "That didn’t send. Try again in a moment.")
		};
	}).catch(() => ({
		ok: false,
		message: "That didn’t send. Try again in a moment."
	}));
}
function clip(value, max) {
	return value.trim().slice(0, max);
}
//#endregion
export { sendConsultation_createServerFn_handler, sendEnquiry_createServerFn_handler, sendPrices_createServerFn_handler };
