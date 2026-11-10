import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { sendPrices } from "@/lib/enquire";
import { cn } from "@/lib/utils";

export function PricesNote({ bare = false }: { bare?: boolean }) {
  const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email doesn’t look right.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const result = await sendPrices({ data: { email, confirm: true, company, startedAt } });
      if (!result.ok) {
        setError(result.message || "That didn’t send. Email hello@createdbylewis.com.");
        return;
      }
      setSent(true);
    } catch {
      setError("That didn’t send. Email hello@createdbylewis.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("relative", bare ? "" : "mt-4 rounded-xl border border-line bg-card p-5 sm:p-6")}
    >
      <p className="font-medium text-ink">Not ready to book?</p>
      <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted">
        Leave your email and I’ll send the prices. No commitment and nothing to pay.
      </p>
      {sent ? (
        <p className="mt-4 text-sm text-ink">Sent. The prices are on their way to {email.trim()}.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={cn(
              "min-h-11 w-full min-w-0 rounded-md border bg-paper px-3 text-base text-ink outline-none transition-colors duration-200 focus:border-ink sm:max-w-sm sm:flex-1",
              error ? "border-signal" : "border-line",
            )}
            aria-invalid={Boolean(error)}
          />
          <Button type="submit" disabled={sending} className="shrink-0 whitespace-nowrap">
            {sending ? "Sending…" : "Send me the prices"}
          </Button>
        </div>
      )}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      {error ? (
        <p className="mt-2 text-sm text-signal" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
