import { seo } from "@/lib/seo";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { formatGBP, packages, type PackageId } from "@/lib/content";

function isPackageParam(value: string): value is PackageId {
  return value === "order" || value === "box" || value === "complete";
}

export const Route = createFileRoute("/packages/$id")({
  loader: ({ params }) => {
    if (!isPackageParam(params.id)) throw notFound();
    const pkg = packages.find((item) => item.id === params.id);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.pkg.name} | CreatedByLewis`,
          description: loaderData.pkg.blurb,
          path: `/packages/${loaderData.pkg.id}`,
        })
      : { meta: [] },
  component: PackagePage,
  notFoundComponent: MissingPackage,
});

function PackagePage() {
  const { pkg } = Route.useLoaderData();
  const others = packages.filter((item) => item.id !== pkg.id);

  return (
    <main>
      <article className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14">
        <Link to="/packages" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
          All packages
        </Link>
        <p className="mt-6 text-xs tracking-widest text-muted uppercase">{pkg.time}</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
          {pkg.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{pkg.blurb}</p>

        <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-2">
          <p className="font-display text-5xl tabular-nums text-ink">{formatGBP(pkg.price)}</p>
          <p className="pb-1 text-sm text-muted">{formatGBP(Math.round(pkg.price * 0.25))} to start</p>
          {pkg.retainer ? (
            <p className="pb-1 text-sm font-medium text-ink">
              then {formatGBP(pkg.retainer.monthly)} a month for {pkg.retainer.months} months
            </p>
          ) : null}
        </div>

        <div className="mt-10 max-w-2xl space-y-4">
          {pkg.story.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className="mt-12 text-xs tracking-widest text-muted uppercase">What’s Included</h2>
        <ul className="mt-4 max-w-2xl divide-y divide-line border-y border-line">
          {pkg.includes.map((item) => (
            <li key={item} className="flex gap-3 py-4 text-base leading-snug text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">{pkg.fit}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={`/start?package=${pkg.id}`}>Choose {pkg.name}</ButtonAnchor>
          <ButtonLink to="/book" variant="secondary">
            Book a free chat
          </ButtonLink>
        </div>
      </article>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <p className="text-xs tracking-widest text-muted uppercase">The other packages</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  to="/packages/$id"
                  params={{ id: item.id }}
                  className="flex min-h-14 items-center justify-between gap-4"
                >
                  <span className="font-medium text-ink">{item.name}</span>
                  <span className="text-sm text-muted tabular-nums">{formatGBP(item.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function MissingPackage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h1 className="font-display text-5xl text-ink">That package isn’t here.</h1>
      <div className="mt-8">
        <ButtonLink to="/packages" variant="secondary">
          Back to the packages
        </ButtonLink>
      </div>
    </main>
  );
}
