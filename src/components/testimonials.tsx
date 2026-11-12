import { useState } from "react";
import { TRUSTPILOT_URL, testimonials, type Testimonial } from "@/lib/testimonials";

const TP_GREEN = "#00b67a";

export function Stars({ rating, size = 22 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-[3px]" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="grid place-items-center"
          style={{ width: size, height: size, background: i < rating ? TP_GREEN : "var(--color-line)" }}
        >
          <svg viewBox="0 0 24 24" width={size * 0.68} height={size * 0.68} aria-hidden>
            <path fill="#fff" d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

export function TrustpilotMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium text-ink ${className}`}>
      <svg viewBox="0 0 24 24" className="size-[1.1em]" aria-hidden>
        <path fill={TP_GREEN} d="M12 1.5l3.1 7.2 7.8.7-5.9 5.1 1.8 7.7L12 18.1l-6.8 4.1 1.8-7.7-5.9-5.1 7.8-.7z" />
      </svg>
      Trustpilot
    </span>
  );
}

/** Reviews longer than this are shown cut short, with a fade and a button to read the rest. */
const CLAMP_CHARS = 300;

function Review({ item, firstLineBold }: { item: Testimonial; firstLineBold: boolean }) {
  const long = item.body.join(" ").length > CLAMP_CHARS;
  const [open, setOpen] = useState(false);
  const clamped = long && !open;
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const id = `review-${item.date}-${initials}`;

  return (
    <figure className="lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-7 sm:p-9">
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-signal/10 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <Stars rating={item.rating} />
        <time dateTime={item.date} className="text-xs text-muted">
          {item.dateLabel}
        </time>
      </div>

      <h3 className="relative mt-6 font-display text-2xl leading-tight text-ink sm:text-[1.75rem]">{item.title}</h3>

      <blockquote
        id={id}
        className={
          "relative mt-4 space-y-4 text-[15px] leading-relaxed text-muted " +
          (clamped ? "max-h-[11.5rem] overflow-hidden [mask-image:linear-gradient(180deg,#000_55%,transparent)]" : "")
        }
      >
        {item.body.map((para, i) =>
          // The first line of James's review repeats his title in bold, as he wrote it.
          i === 0 && firstLineBold ? (
            <p key={i} className="font-medium text-ink">
              {para}
            </p>
          ) : (
            <p key={i}>{para}</p>
          ),
        )}
      </blockquote>

      {long ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="relative mt-3 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-ink underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
        >
          {open ? "Show less" : "Read the full review"}
        </button>
      ) : null}

      <div className="min-h-6 flex-1" aria-hidden />
      <figcaption className="relative flex items-center gap-3 border-t border-line pt-5 text-sm">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-signal/15 font-medium text-ink"
        >
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block font-medium text-ink">{item.name}</span>
          <span className="block text-muted">
            {item.business ? `${item.business} · ` : ""}Review on Trustpilot
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  const allFive = testimonials.every((t) => t.rating === 5);
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">From clients</p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">In Their Words</h2>
          </div>
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-card px-5 py-2.5 text-sm transition-colors hover:border-ink/40"
          >
            <TrustpilotMark />
            <span className="h-4 w-px bg-line" aria-hidden />
            <span className="text-muted">
              {testimonials.length} {testimonials.length === 1 ? "review" : "reviews"}
              {allFive ? ", all 5 stars" : ""}
            </span>
            <span aria-hidden className="text-muted transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <li key={`${item.name}-${item.date}`}>
              <Review item={item} firstLineBold={i === 0} />
            </li>
          ))}
        </ul>

        <a
          href={TRUSTPILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 flex flex-col gap-4 rounded-2xl border border-dashed border-line p-7 transition-colors hover:border-ink/40 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-7"
        >
          <span className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <TrustpilotMark className="text-lg" />
            <span className="font-display text-xl leading-snug text-ink sm:text-2xl">Worked with me? I’d love to hear how it went.</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink">
            Read or leave a review
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
