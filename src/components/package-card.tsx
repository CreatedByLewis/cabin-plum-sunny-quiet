import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3, Wallet } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { formatGBP, type Package } from "@/lib/content";
import { cn } from "@/lib/utils";

export const DEPOSIT_RATE = 0.25;

export function PackageCard({ pkg, detailed = false }: { pkg: Package; detailed?: boolean }) {
  const featured = Boolean(pkg.featured);
  const deposit = Math.round(pkg.price * DEPOSIT_RATE);

  return (
    <article
      id={detailed ? pkg.id : undefined}
      className={cn(
        "lift relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 text-ink sm:p-7",
        featured
          ? "ring-glow border-transparent bg-card shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--color-signal)_55%,transparent)]"
          : "border-line bg-card/60",
      )}
    >
      {featured ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-signal/20 blur-3xl"
        />
      ) : null}

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="font-display text-3xl leading-none font-medium">{pkg.name}</h3>
        {featured ? (
          <span className="rounded-full bg-signal/15 px-2.5 py-1 text-[10px] font-medium tracking-widest text-signal uppercase ring-1 ring-signal/30">
            Most popular
          </span>
        ) : null}
      </div>

      <p className="relative mt-6 font-display text-5xl leading-none tabular-nums">{formatGBP(pkg.price)}</p>
      {pkg.retainer ? (
        <p className="relative mt-2 text-sm font-medium">
          then {formatGBP(pkg.retainer.monthly)} a month for {pkg.retainer.months} months
        </p>
      ) : null}

      <ul className="relative mt-4 flex flex-wrap gap-2 text-xs" aria-label={`${pkg.name} at a glance`}>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/50 px-2.5 py-1 text-ink">
          <Wallet className="size-3.5 text-signal" aria-hidden />
          {formatGBP(deposit)} to start
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/50 px-2.5 py-1 text-ink">
          <Clock3 className="size-3.5 text-signal" aria-hidden />
          {pkg.time}
        </li>
      </ul>

      <p className={cn("relative mt-5 text-sm leading-relaxed text-muted", "lg:min-h-[5.75rem]")}>{pkg.blurb}</p>

      <ul className="relative mt-6 space-y-2.5 border-t border-line pt-6">
        {(detailed ? pkg.includes : pkg.highlights).map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-snug">
            <Check className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {detailed ? <p className="relative mt-5 text-sm text-muted">{pkg.fit}</p> : null}

      <div className="relative mt-auto pt-8">
        {detailed ? (
          <>
            <ButtonAnchor href={`/start?package=${pkg.id}`} variant={featured ? "primary" : "quiet"} className="w-full">
              Choose {pkg.name}
            </ButtonAnchor>
            <ButtonLink to="/book" variant="secondary" className="mt-3 w-full border-line hover:border-ink">
              Book a call. Nothing to pay.
            </ButtonLink>
          </>
        ) : (
          <Link
            to="/packages/$id"
            params={{ id: pkg.id }}
            className={cn(
              "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,scale,border-color] duration-200 ease-out active:scale-[0.96]",
              featured
                ? "bg-ink text-paper hover:bg-ink/90"
                : "border border-line bg-transparent text-ink hover:border-ink",
            )}
          >
            See what’s in {pkg.name}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}
