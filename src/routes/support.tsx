import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { breadcrumbs, seo, webPage } from "@/lib/seo";
import {
  ALLOWED_TYPES,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENTS,
  sendSupportRequest,
  SUPPORT_TOPICS,
  SUPPORTED_THEMES,
  type SupportAttachment,
} from "@/lib/support";
import { cn } from "@/lib/utils";

const DOCS_URL = "/portion/docs";

export const Route = createFileRoute("/support")({
  head: () =>
    seo({
      title: "Theme Support | CreatedByLewis",
      description:
        "Get help with your CreatedByLewis Shopify theme. Send a support request with screenshots and get a reply within two working days.",
      path: "/support",
      schema: [webPage("/support", "Theme support", undefined, "ContactPage"), breadcrumbs([["Support", "/support"]])],
    }),
  component: SupportPage,
});

type Errors = Partial<Record<"name" | "email" | "storeUrl" | "message" | "files", string>>;

function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [theme, setTheme] = useState<string>(SUPPORTED_THEMES[0]);
  const [topic, setTopic] = useState<string>(SUPPORT_TOPICS[0]);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");
  const [sentRef, setSentRef] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const fileInput = useRef<HTMLInputElement>(null);

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    const next = [...files, ...picked].slice(0, MAX_ATTACHMENTS);
    const wrongType = picked.find((file) => !ALLOWED_TYPES.includes(file.type));
    const bytes = next.reduce((sum, file) => sum + file.size, 0);
    if (wrongType) {
      setErrors((current) => ({ ...current, files: `${wrongType.name} isn't an image, PDF or text file.` }));
    } else if (bytes > MAX_ATTACHMENT_BYTES) {
      setErrors((current) => ({ ...current, files: "Keep your files under 3 MB together." }));
    } else {
      setFiles(next);
      setErrors((current) => ({ ...current, files: undefined }));
    }
    event.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
    setErrors((current) => ({ ...current, files: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure("");
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "That email doesn't look right.";
    if (!storeUrl.trim()) next.storeUrl = "Add your store address so I can take a look.";
    if (message.trim().length < 10) next.message = "Tell me a little more about what's happening.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }

    setSending(true);
    try {
      const attachments: SupportAttachment[] = await Promise.all(
        files.map(async (file) => ({ name: file.name, type: file.type, data: await toBase64(file) })),
      );
      const result = await sendSupportRequest({
        data: {
          name,
          email,
          storeUrl,
          theme,
          topic,
          message,
          attachments,
          company,
          startedAt: startedAt.current,
        },
      });
      if (result.ok) {
        setSentRef(result.ref);
        window.scrollTo({ top: 0 });
      } else {
        setFailure(result.message);
      }
    } catch {
      setFailure("That didn't send. Try again in a moment, or email hello@createdbylewis.com.");
    } finally {
      setSending(false);
    }
  }

  if (sentRef !== null) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs tracking-widest text-muted uppercase">Theme support</p>
        <h1 className="mt-4 font-display text-5xl leading-display font-medium text-ink sm:text-6xl">Request received.</h1>
        <p className="mt-4 text-muted" role="status">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""}. {sentRef ? <>Your reference is <span className="text-ink">{sentRef}</span>. </> : null}
          I've emailed you a copy, and I'll reply within two working days, usually much sooner.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={DOCS_URL}
            className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium text-ink hover:bg-ink hover:text-paper"
          >
            Read the documentation
          </a>
          <Link to="/" className="inline-flex min-h-11 items-center px-2 text-sm text-muted hover:text-ink">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs tracking-widest text-muted uppercase">Theme support</p>
      <h1 className="mt-4 font-display text-5xl leading-display font-medium text-ink sm:text-6xl">How Can I Help?</h1>
      <p className="mt-4 max-w-xl text-muted">
        For merchants using a CreatedByLewis Shopify theme. Tell me what's happening, add a screenshot if you can,
        and I'll reply within two working days.
      </p>
      <p className="mt-3 text-sm text-muted">
        Setting up for the first time?{" "}
        <a href={DOCS_URL} className="text-ink underline decoration-line underline-offset-4">
          The documentation
        </a>{" "}
        answers most questions.
      </p>

      <form className="mt-10 space-y-6" onSubmit={onSubmit} noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label="Your name" error={errors.name}>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass(Boolean(errors.email))}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </Field>
        </div>

        <Field id="storeUrl" label="Store address" hint="Your .myshopify.com or custom domain" error={errors.storeUrl}>
          <input
            id="storeUrl"
            name="storeUrl"
            inputMode="url"
            placeholder="yourstore.myshopify.com"
            value={storeUrl}
            onChange={(event) => setStoreUrl(event.target.value)}
            className={inputClass(Boolean(errors.storeUrl))}
            aria-invalid={Boolean(errors.storeUrl)}
            aria-describedby={errors.storeUrl ? "storeUrl-error" : "storeUrl-hint"}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="theme" label="Theme">
            <select id="theme" name="theme" value={theme} onChange={(event) => setTheme(event.target.value)} className={inputClass(false)}>
              {SUPPORTED_THEMES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field id="topic" label="What's it about?">
            <select id="topic" name="topic" value={topic} onChange={(event) => setTopic(event.target.value)} className={inputClass(false)}>
              {SUPPORT_TOPICS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          id="message"
          label="Describe the problem"
          hint="What did you expect, what happened instead, and which page it's on"
          error={errors.message}
        >
          <textarea
            id="message"
            name="message"
            rows={7}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={cn(inputClass(Boolean(errors.message)), "min-h-40 py-3")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
          />
        </Field>

        <div>
          <p id="files-label" className="text-sm font-medium text-ink">
            Screenshots or files <span className="font-normal text-muted">(optional)</span>
          </p>
          <p id="files-hint" className="mt-1 text-sm text-muted">
            Up to {MAX_ATTACHMENTS} images, PDFs or text files, 3 MB in total.
          </p>
          <input
            ref={fileInput}
            id="files"
            type="file"
            multiple
            accept={ALLOWED_TYPES.join(",")}
            onChange={onFiles}
            className="sr-only"
            aria-labelledby="files-label"
            aria-describedby={errors.files ? "files-error" : "files-hint"}
          />
          <div className="mt-3 rounded-xl border border-dashed border-line bg-card p-4">
            {files.length ? (
              <ul className="space-y-2" aria-label="Attached files">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate text-ink">
                      {file.name} <span className="text-muted">· {formatSize(file.size)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="min-h-11 shrink-0 px-2 text-muted hover:text-ink"
                      aria-label={`Remove ${file.name}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {files.length < MAX_ATTACHMENTS ? (
              <Button
                type="button"
                variant="quiet"
                className={files.length ? "mt-3" : ""}
                onClick={() => fileInput.current?.click()}
              >
                {files.length ? "Add another file" : "Add files"}
              </Button>
            ) : null}
            {files.length ? <p className="mt-2 text-xs text-muted">{formatSize(totalBytes)} of 3 MB used</p> : null}
          </div>
          {errors.files ? (
            <p id="files-error" className="mt-1.5 text-sm text-signal" role="alert">
              {errors.files}
            </p>
          ) : null}
        </div>

        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </div>

        {failure ? (
          <p className="rounded-md border border-signal bg-card px-4 py-3 text-sm text-ink" role="alert">
            {failure}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto" disabled={sending}>
            {sending ? "Sending…" : "Send request"}
          </Button>
          <p className="text-sm text-muted">You'll get an email confirming I've received it.</p>
        </div>
      </form>

      <p className="mt-12 text-sm text-muted">
        Support covers setting up the theme's features, questions about its settings and fixing theme bugs. It doesn't
        cover custom design changes or third-party apps, but{" "}
        <Link to="/book" className="text-ink underline decoration-line underline-offset-4">
          I'm happy to quote
        </Link>{" "}
        for custom work.
      </p>
    </main>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-signal">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "w-full min-h-11 rounded-md border bg-card px-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-ink",
    invalid ? "border-signal" : "border-line",
  );
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
