import { createServerFn } from "@tanstack/react-start";
import { formatGBP, packages } from "@/lib/content";

const INBOX = "hello@createdbylewis.com";
const PHONE = "07484 686442";

export type EnquiryInput = {
  kind: "order" | "estimate";
  ref: string;
  name: string;
  email: string;
  business: string;
  about: string;
  packageName: string;
  timeline: string;
  meeting?: string;
  build: number;
  deposit: number;
  extras?: string;
};

export type ConsultationInput = {
  ref: string;
  name: string;
  email: string;
  business: string;
  phone: string;
  meeting: string;
  when: string;
  startsAt: string;
  about: string;
};

export const sendConsultation = createServerFn({ method: "POST" })
  .inputValidator((input: ConsultationInput) => input)
  .handler(async ({ data }) => {
    const name = clip(data.name, 120);
    const email = clip(data.email, 200);
    const business = clip(data.business, 160);
    const phone = clip(data.phone, 40);
    const about = clip(data.about, 4000);
    if (!name || !business || !phone || about.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false as const, message: "Check the name, email, phone, business, and what you want to talk about." };
    }

    const { consultationCalendar } = await import("@/lib/mail.server");
    const calendar = consultationCalendar({
      startsAt: clip(data.startsAt, 16),
      meeting: clip(data.meeting, 80),
      email,
      name,
      business,
      phone,
      ref: clip(data.ref, 20),
    });

    const message = [
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
      about,
    ]
      .filter(Boolean)
      .join("\n");

    return postToInbox({
      kind: "consultation",
      name,
      email,
      phone,
      business,
      message,
      subject: `Consultation ${clip(data.ref, 20)}: ${business}`,
      heading: "You’re booked.",
      paragraphs: calendar
        ? [
            `We'll talk ${clip(data.meeting, 80)}. Nothing to pay.`,
            `Join here: ${calendar.joinUrl}`,
            `If you need to change it, call ${PHONE}.`,
            "Lewis",
          ]
        : [
            `Thanks. You're booked for ${clip(data.when, 160)}.`,
            `We'll talk ${clip(data.meeting, 80)}. Nothing to pay.`,
            `If you need to change it, call ${PHONE}.`,
            "Lewis",
          ],
      appointment: calendar
        ? {
            weekday: calendar.weekday,
            date: calendar.date,
            time: calendar.time,
            detail: calendar.detail,
            googleUrl: calendar.googleUrl,
            outlookUrl: calendar.outlookUrl,
          }
        : undefined,
      ics: calendar?.ics,
    });
  });

export const sendEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: EnquiryInput) => input)
  .handler(async ({ data }) => {
    const name = clip(data.name, 120);
    const email = clip(data.email, 200);
    const business = clip(data.business, 160);
    const about = clip(data.about, 4000);
    if (!name || !business || !about || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false as const, message: "Check the name, email, and what you sell." };
    }

    const pounds = (value: number) =>
      new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(
        value,
      );

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
      about,
    ]
      .filter(Boolean)
      .join("\n");

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
          kind === "order"
            ? `Thanks. ${business} is in the queue for ${clip(data.packageName, 80)}${data.extras ? `, with ${clip(data.extras, 240)}` : ""}.`
            : `Thanks. I've got your estimate for ${clip(data.packageName, 80)}${data.extras ? `, with ${clip(data.extras, 240)}` : ""}, from ${pounds(data.build)}.`,
          kind === "order"
            ? `The deposit to start is ${pounds(data.deposit)}. I'll reply to this email, or call ${PHONE}.`
            : `I'll reply to this email. You can also call ${PHONE}.`,
          "Lewis",
        ],
      });
    } catch {
      return { ok: false as const, message: "That didn’t send. Try again in a moment." };
    }
  });

export const sendPrices = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; confirm?: boolean; company?: string; startedAt?: number }) => input)
  .handler(async ({ data }) => {
    const email = clip(data.email, 200);
    if (data.company?.trim()) {
      return { ok: true as const, message: "" };
    }
    if (!data.confirm) {
      return { ok: false as const, message: "Tick the box so I know it isn’t a bot." };
    }
    if (data.startedAt && Date.now() - data.startedAt < 2500) {
      return { ok: false as const, message: "Wait a moment, then send it again." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false as const, message: "That email doesn’t look right." };
    }

    const summaries: Record<string, string> = {
      order: "A homepage and a store.",
      box: "A postcode check, a custom hero, and a build-a-box you own.",
      complete: "The box, subscriptions, search, and a refine of your branding.",
    };
    const priceRows = packages.map((pkg) => ({
      name: pkg.name,
      detail: summaries[pkg.id] ?? pkg.fit,
      price: formatGBP(pkg.price),
      start: formatGBP(Math.round(pkg.price * 0.25)),
      time: pkg.time,
      extra: pkg.retainer ? `then ${formatGBP(pkg.retainer.monthly)} a month for ${pkg.retainer.months} months` : undefined,
      featured: pkg.featured,
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
        "Partner is optional: £150 a month for six months after launch. It covers product changes, fixes, and one improvement a month. It is not included in the build price.",
        "Prices are negotiable. If your budget is different, call 07484 686442.",
        "Lewis",
      ],
      prices: priceRows,
    });
  });

function postToInbox(input: {
  kind: string;
  name: string;
  email: string;
  phone?: string;
  business?: string;
  message: string;
  subject: string;
  heading: string;
  paragraphs: string[];
  appointment?: {
    weekday: string;
    date: string;
    time: string;
    detail: string;
    googleUrl: string;
    outlookUrl: string;
  };
  ics?: string;
  prices?: { name: string; detail: string; price: string; start: string; time: string; extra?: string; featured?: boolean }[];
}) {
  return deliver(input);
}

async function deliver(input: {
  kind: string;
  name: string;
  email: string;
  phone?: string;
  business?: string;
  message: string;
  subject: string;
  heading: string;
  paragraphs: string[];
  appointment?: {
    weekday: string;
    date: string;
    time: string;
    detail: string;
    googleUrl: string;
    outlookUrl: string;
  };
  ics?: string;
  prices?: { name: string; detail: string; price: string; start: string; time: string; extra?: string; featured?: boolean }[];
}) {
  const { saveEnquiry } = await import("@/lib/enquiries");
  await saveEnquiry({
    kind: input.kind,
    name: input.name,
    email: input.email,
    phone: input.phone,
    business: input.business,
    subject: input.subject,
    message: input.message,
  });
  const { sendThemedMail } = await import("@/lib/mail.server");
  const customer = await sendThemedMail({
    to: input.email,
    subject: input.heading,
    heading: input.heading,
    paragraphs: input.paragraphs,
    replyTo: INBOX,
    text: input.paragraphs.join("\n\n"),
    appointment: input.appointment,
    prices: input.prices,
    ics: input.ics,
  });

  if (customer.missingKey) return postViaForm(input);

  if (customer.ok) {
    await sendThemedMail({
      to: INBOX,
      subject: input.subject,
      heading: input.subject,
      paragraphs: input.message.split("\n").filter(Boolean),
      replyTo: input.email,
      text: input.message,
      appointment: input.appointment,
      ics: input.ics,
    });
  }

  return { ok: customer.ok, message: customer.ok ? "" : customer.message || "That didn’t send. Try again in a moment." };
}

function postViaForm(input: { name: string; email: string; message: string; subject: string; paragraphs: string[] }) {
  return fetch(`https://formsubmit.co/ajax/${INBOX}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://www.createdbylewis.com",
      Referer: "https://www.createdbylewis.com/",
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      message: input.message,
      _subject: input.subject,
      _replyto: input.email,
      _autoresponse: input.paragraphs.join("\n\n"),
      _template: "box",
      _captcha: "false",
    }),
  })
    .then(async (response) => {
      const body = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      const ok = response.ok && (body?.success === true || body?.success === "true");
      return {
        ok,
        message: body?.message || (ok ? "" : "That didn’t send. Try again in a moment."),
      };
    })
    .catch(() => ({ ok: false, message: "That didn’t send. Try again in a moment." }));
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}
