import { env } from "@/lib/env.server";

const FROM = "CreatedByLewis <hello@createdbylewis.com>";
const INBOX = "hello@createdbylewis.com";
const RESEND_KEY = env("RESEND_API_KEY") ?? "";

export function themedEmail(
  heading: string,
  paragraphs: string[],
  appointment?: {
    weekday: string;
    date: string;
    time: string;
    detail: string;
    googleUrl: string;
    outlookUrl: string;
  },
  prices?: { name: string; detail: string; price: string; start: string; time: string; extra?: string; featured?: boolean }[],
) {
  const body = paragraphs
    .map((paragraph, index) => {
      const color = index === paragraphs.length - 1 ? "#f4f4f2" : "#a3a3ad";
      return `<p style="margin:16px 0 0;font-family:Georgia,'Iowan Old Style','Palatino Linotype',Palatino,serif;font-size:16px;line-height:1.55;color:${color};">${escapeHtml(paragraph)}</p>`;
    })
    .join("");

  const when = appointment
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;background:#1a1a1f;border:1px solid #2c2c33;border-radius:12px;">
        <tr>
          <td style="padding:22px 24px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8b7cf7;">${escapeHtml(appointment.weekday)}</td>
        </tr>
        <tr>
          <td style="padding:0 24px;font-family:Georgia,'Iowan Old Style',serif;font-size:22px;line-height:1.2;color:#f4f4f2;">${escapeHtml(appointment.date)}</td>
        </tr>
        <tr>
          <td style="padding:6px 24px 0;font-family:Georgia,'Iowan Old Style',serif;font-size:44px;line-height:1;color:#f4f4f2;">${escapeHtml(appointment.time)}</td>
        </tr>
        <tr>
          <td style="padding:8px 24px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;color:#a3a3ad;">${escapeHtml(appointment.detail)}</td>
        </tr>
        <tr>
          <td style="padding:0 24px 22px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:999px;background:#8b7cf7;">
                  <a href="${escapeHtml(appointment.googleUrl)}" style="display:inline-block;padding:12px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;">Add to Google Calendar</a>
                </td>
                <td width="10"></td>
                <td style="border-radius:999px;border:1px solid #f4f4f2;">
                  <a href="${escapeHtml(appointment.outlookUrl)}" style="display:inline-block;padding:11px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#f4f4f2;text-decoration:none;">Add to Outlook</a>
                </td>
              </tr>
            </table>
            <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:#a3a3ad;">A calendar file is attached for Apple Calendar and anything else.</p>
          </td>
        </tr>
      </table>`
    : "";

  const priceRows = (prices ?? [])
    .map((item, index) => {
      const border = index === 0 ? "" : "border-top:1px solid #2c2c33;";
      return `<tr>
        <td style="padding:18px 20px;${border}">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="top">
                ${item.featured ? `<div style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b7cf7;">Featured</div>` : ""}
                <div style="font-family:Georgia,'Iowan Old Style',serif;font-size:22px;line-height:1.1;color:#f4f4f2;">${escapeHtml(item.name)}</div>
                <div style="margin-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;color:#a3a3ad;">${escapeHtml(item.detail)}</div>
                <div style="margin-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:#a3a3ad;">${escapeHtml(item.time)}</div>
                ${item.extra ? `<div style="margin-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:#f4f4f2;">${escapeHtml(item.extra)}</div>` : ""}
              </td>
              <td valign="top" align="right" style="padding-left:16px;white-space:nowrap;">
                <div style="font-family:Georgia,'Iowan Old Style',serif;font-size:26px;line-height:1;color:#f4f4f2;">${escapeHtml(item.price)}</div>
                <div style="margin-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;color:#a3a3ad;">${escapeHtml(item.start)} to start</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  const priceCard = priceRows
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;background:#1a1a1f;border:1px solid #2c2c33;border-radius:12px;">
        ${priceRows}
        <tr>
          <td style="padding:4px 20px 20px;border-top:1px solid #2c2c33;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px;">
              <tr>
                <td style="border-radius:999px;background:#8b7cf7;">
                  <a href="https://www.createdbylewis.com/book" style="display:inline-block;padding:12px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;">Book a consultation</a>
                </td>
                <td width="10"></td>
                <td style="border-radius:999px;border:1px solid #f4f4f2;">
                  <a href="https://www.createdbylewis.com/packages" style="display:inline-block;padding:11px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#f4f4f2;text-decoration:none;">See the packages</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`
    : "";

  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#0c0c0e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0c0c0e;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111114;border:1px solid #2c2c33;border-radius:16px;">
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" height="36" align="center" valign="middle" style="width:36px;height:36px;background:#8b7cf7;border-radius:8px;font-family:Georgia,serif;font-style:italic;font-size:22px;line-height:36px;color:#ffffff;">L</td>
                  <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:500;letter-spacing:-0.03em;color:#f4f4f2;">CreatedBy<span style="font-family:Georgia,serif;font-style:italic;font-weight:500;">Lewis</span></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <h1 style="margin:0;font-family:Georgia,'Iowan Old Style',serif;font-weight:500;font-size:32px;line-height:1.15;color:#f4f4f2;">${escapeHtml(heading)}</h1>
              ${when}
              ${priceCard}
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 0;"><div style="height:1px;background:#2c2c33;font-size:0;line-height:0;">&nbsp;</div></td>
          </tr>
          <tr>
            <td style="padding:18px 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#a3a3ad;">
              CreatedByLewis · United Kingdom<br>
              <a href="mailto:${INBOX}" style="color:#f4f4f2;text-decoration:none;">${INBOX}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendThemedMail(input: {
  to: string;
  subject: string;
  heading: string;
  paragraphs: string[];
  replyTo: string;
  text: string;
  appointment?: {
    weekday: string;
    date: string;
    time: string;
    detail: string;
    googleUrl: string;
    outlookUrl: string;
  };
  prices?: { name: string; detail: string; price: string; start: string; time: string; extra?: string; featured?: boolean }[];
  ics?: string;
}) {
  const key = RESEND_KEY;
  if (!key) return { ok: false as const, missingKey: true, message: "Resend is not connected yet." };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "User-Agent": "CreatedByLewis/1.0",
      },
      body: JSON.stringify({
        from: FROM,
        to: [input.to],
        subject: input.subject,
        html: themedEmail(input.heading, input.paragraphs, input.appointment, input.prices),
        text: input.text,
        reply_to: input.replyTo,
        attachments: input.ics
          ? [
              {
                filename: "createdbylewis-consultation.ics",
                content: Buffer.from(input.ics, "utf8").toString("base64"),
                content_type: "text/calendar; charset=utf-8; method=REQUEST",
              },
            ]
          : undefined,
      }),
    });
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    if (!response.ok) {
      return { ok: false as const, missingKey: false, message: body?.message || "That email didn’t send." };
    }
    return { ok: true as const, missingKey: false, message: "" };
  } catch {
    return { ok: false as const, missingKey: false, message: "That email didn’t send." };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

export function consultationCalendar(input: {
  startsAt: string;
  meeting: string;
  email: string;
  name: string;
  business: string;
  phone: string;
  ref: string;
}) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(input.startsAt);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const wall = new Date(Date.UTC(year, month - 1, day));
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" }).format(wall);
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(wall);
  const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const startUtc = londonWallToUtc(year, month, day, hour, minute);
  const endUtc = new Date(startUtc.getTime() + 60 * 60 * 1000);
  const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const localStamp = `${match[1]}${match[2]}${match[3]}T${match[4]}${match[5]}00`;
  const endHour = hour + 1;
  const endStamp = `${match[1]}${match[2]}${match[3]}T${String(endHour).padStart(2, "0")}${match[5]}00`;
  const joinUrl = `https://meet.jit.si/CreatedByLewis-${input.ref.replace(/[^a-z0-9]/gi, "")}`;
  const title = `Consultation: ${input.name}, ${input.business}`;
  const detail = [
    `With ${input.name} (${input.email})`,
    input.phone ? `Phone: ${input.phone}` : "",
    `Business: ${input.business}`,
    input.meeting,
    `Video: ${joinUrl}`,
    "Nothing to pay. Call 07484 686442 if you need to change it.",
  ]
    .filter(Boolean)
    .join("\n");
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(startUtc)}/${stamp(endUtc)}&details=${encodeURIComponent(detail)}&location=${encodeURIComponent(joinUrl)}&add=${encodeURIComponent(input.email)}&ctz=Europe/London`;
  const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${match[1]}-${match[2]}-${match[3]}T${time}:00&enddt=${match[1]}-${match[2]}-${match[3]}T${String(endHour).padStart(2, "0")}:${match[5]}:00&body=${encodeURIComponent(detail)}&location=${encodeURIComponent(joinUrl)}&to=${encodeURIComponent(input.email)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CreatedByLewis//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/London",
    "BEGIN:STANDARD",
    "DTSTART:19701025T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0000",
    "TZNAME:GMT",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19700329T010000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
    "TZOFFSETFROM:+0000",
    "TZOFFSETTO:+0100",
    "TZNAME:BST",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${input.startsAt}-${input.email}@createdbylewis.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;TZID=Europe/London:${localStamp}`,
    `DTEND;TZID=Europe/London:${endStamp}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(detail)}`,
    `LOCATION:${icsEscape(joinUrl)}`,
    "ORGANIZER;CN=CreatedByLewis:mailto:hello@createdbylewis.com",
    `ATTENDEE;CN=${icsEscape(input.name)};RSVP=TRUE:mailto:${input.email}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsEscape(`Consultation with ${input.name} is tomorrow.`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return {
    weekday,
    date,
    time,
    detail: `${input.meeting} · ${input.name} · UK time`,
    joinUrl,
    googleUrl,
    outlookUrl,
    ics,
  };
}

function londonWallToUtc(year: number, month: number, day: number, hour: number, minute: number) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(utcGuess)
      .map((part) => [part.type, part.value]),
  );
  const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
  return new Date(utcGuess.getTime() - (asUtc - utcGuess.getTime()));
}

function icsEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
