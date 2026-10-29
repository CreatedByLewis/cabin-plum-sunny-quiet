import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { formatGBP, type Package } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PackageCard({ pkg, detailed = false }: { pkg: Package; detailed?: boolean }) {
  const dark = Boolean(pkg.featured);

  return (
    <article
      id={detailed ? pkg.id : undefined}
      className={cn(
        "lift flex h-full flex-col rounded-2xl border p-6 sm:p-7",
        dark ? "ring-glow border-transparent bg-ink text-paper shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--color-signal)_60%,transparent)]" : "border-line bg-card text-ink",
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl leading-none font-medium">{pkg.name}</h3>
        {pkg.featured ? (
          <span className="rounded-full bg-signal px-2.5 py-1 text-[10px] font-medium tracking-widest text-on-signal uppercase">Most popular</span>
        ) : null}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <p className={cn("font-display text-4xl leading-none tabular-nums", dark ? "text-paper" : "text-ink")}>
          {formatGBP(pkg.price)}
        </p>
        <p className={cn("shrink-0 text-right text-sm leading-tight", dark ? "text-paper/75" : "text-muted")}>
          25% deposit: {formatGBP(Math.round(pkg.price * 0.25))}
        </p>
      </div>
      {pkg.retainer ? (
        <p className={cn("mt-2 text-sm font-medium", dark ? "text-paper" : "text-ink")}>
          then {formatGBP(pkg.retainer.monthly)} a month for {pkg.retainer.months} months
        </p>
      ) : null}
      <p className={cn("mt-2 text-sm", dark ? "text-paper/75" : "text-muted")}>
        {pkg.time}
      </p>
      <p className={cn("mt-5 text-sm leading-relaxed", dark ? "text-paper/85" : "text-ink")}>{pkg.blurb}</p>
      {!detailed ? (
        <ul className="mt-5 space-y-2">
          {pkg.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-snug">
              <Check className={cn("mt-0.5 size-4 shrink-0", dark ? "text-paper" : "text-signal")} aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {detailed ? (
        <>
          <p className={cn("mt-4 text-sm", dark ? "text-paper/70" : "text-muted")}>{pkg.fit}</p>
          <ul className="mt-6 space-y-3 border-t border-current/15 pt-6">
            {pkg.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-snug">
                <Check className={cn("mt-0.5 size-4 shrink-0", dark ? "text-paper" : "text-signal")} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <div className="mt-auto pt-8">
        {detailed ? (
          <>
            <ButtonAnchor href={`/start?package=${pkg.id}`} variant={dark ? "inverse" : "primary"} className="w-full">
              Choose {pkg.name}
            </ButtonAnchor>
            <ButtonLink
              to="/book"
              variant="secondary"
              className={cn("mt-3 w-full", dark && "border-paper text-paper hover:bg-paper hover:text-ink")}
            >
              Book a call. Nothing to pay.
            </ButtonLink>
          </>
        ) : (
          <Link
            to="/packages/$id"
            params={{ id: pkg.id }}
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-[background-color,color,scale,border-color] duration-200 ease-out active:scale-[0.96]",
              dark
                ? "bg-paper text-ink hover:bg-card"
                : "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
            )}
          >
            See what’s included
          </Link>
        )}
      </div>
    </article>
  );
}
