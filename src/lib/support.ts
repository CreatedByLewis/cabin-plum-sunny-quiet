import { createServerFn } from "@tanstack/react-start";

const INBOX = "hello@createdbylewis.com";

/** Themes CreatedByLewis supports. Add new themes here as they launch. */
export const SUPPORTED_THEMES = ["Portion"] as const;

export const SUPPORT_TOPICS = [
  "Setting up the theme",
  "Box builder",
  "Meal products and macros",
  "Subscriptions",
  "Something looks broken",
  "Other",
] as const;

/** Total size of all attachments, before encoding. Keeps the request under Vercel's 4.5 MB body limit. */
export const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
export const MAX_ATTACHMENTS = 3;
export const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf", "text/plain"];

export type SupportAttachment = { name: string; type: string; data: string };

export type SupportInput = {
  name: string;
  email: string;
  storeUrl: string;
  theme: string;
  topic: string;
  message: string;
  attachments: SupportAttachment[];
  company?: string;
  startedAt?: number;
};

export const sendSupportRequest = createServerFn({ method: "POST" })
  .inputValidator((input: SupportInput) => input)
  .handler(async ({ data }) => {
    // Bots fill the hidden field or submit instantly. Pretend it worked.
    if (data.company?.trim()) return { ok: true as const, ref: "", message: "" };
    if (data.startedAt && Date.now() - data.startedAt < 2500) {
      return { ok: false as const, ref: "", message: "Wait a moment, then send it again." };
    }

    const name = clip(data.name, 120);
    const email = clip(data.email, 200);
    const storeUrl = clip(data.storeUrl, 200);
    const theme = (SUPPORTED_THEMES as readonly string[]).includes(data.theme) ? data.theme : "Other";
    const topic = (SUPPORT_TOPICS as readonly string[]).includes(data.topic) ? data.topic : "Other";
    const message = clip(data.message, 6000);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !storeUrl || message.length < 10) {
      return {
        ok: false as const,
        ref: "",
        message: "Check your name, email and store address, and tell me a little more about the problem.",
      };
    }

    const files = (data.attachments ?? []).slice(0, MAX_ATTACHMENTS).filter((file) => ALLOWED_TYPES.includes(file.type));
    const bytes = files.reduce((total, file) => total + Math.floor((file.data.length * 3) / 4), 0);
    if (bytes > MAX_ATTACHMENT_BYTES) {
      return { ok: false as const, ref: "", message: "Those files are too big together. Keep them under 3 MB." };
    }

    const ref = `SUP-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const subject = `Support ${ref}: ${theme} · ${topic}`;
    const body = [
      `Ref: ${ref}`,
      `Theme: ${theme}`,
      `Topic: ${topic}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Store: ${storeUrl}`,
      files.length ? `Attachments: ${files.map((file) => clip(file.name, 120)).join(", ")}` : "Attachments: none",
      "",
      message,
    ].join("\n");

    const { saveEnquiry } = await import("@/lib/enquiries");
    await saveEnquiry({ kind: "support", name, email, business: storeUrl, subject, message: body });

    const { sendThemedMail } = await import("@/lib/mail.server");
    const reply = [
      `Thanks, ${name.split(" ")[0]}. I've got your ${theme} support request (${ref}).`,
      "I reply to every request within two working days, usually much sooner. If you think of anything else, just reply to this email.",
      "While you wait, the documentation at createdbylewis.com/portion/docs covers most setup questions.",
      "Lewis",
    ];
    const toCustomer = await sendThemedMail({
      to: email,
      subject: `We've got your request (${ref})`,
      heading: "Request received.",
      paragraphs: reply,
      replyTo: INBOX,
      text: reply.join("\n\n"),
    });

    if (toCustomer.missingKey) {
      return { ok: false as const, ref: "", message: `Email isn't set up yet. Write to ${INBOX} instead.` };
    }
    if (!toCustomer.ok) {
      return { ok: false as const, ref: "", message: toCustomer.message || "That didn't send. Try again in a moment." };
    }

    await sendThemedMail({
      to: INBOX,
      subject,
      heading: subject,
      paragraphs: body.split("\n").filter(Boolean),
      replyTo: email,
      text: body,
      attachments: files.map((file) => ({ filename: clip(file.name, 120) || "attachment", content: file.data, content_type: file.type })),
    });

    return { ok: true as const, ref, message: "" };
  });

function clip(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}
