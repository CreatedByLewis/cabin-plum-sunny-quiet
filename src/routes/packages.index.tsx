import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageCard } from "@/components/package-card";
import { PricesNote } from "@/components/prices-note";
import { ButtonLink } from "@/components/ui/button";
import { extras, faqs, formatGBP, packages, practice } from "@/lib/content";

export const Route = createFileRoute("/packages/")({
  head: () => seo({
    title: "Ways to work | CreatedByLewis",
    description:
      "Shop at £1,000, Box at £1,500, Stay at £2,000. Partner is £150 a month for six months after launch. Prices are a starting point.",
    path: "/packages",
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20">
        <p className="text-xs tracking-widest text-muted uppercase">Ways to work</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
          Three Ways to Sell.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Every site is shaped around what you sell, and built so people can finish an order on a desktop or
          a phone. Shop is the homepage and the store. Box adds a postcode check, a custom hero, and a
          build-a-box you own. Stay includes everything in Shop and Box, plus a weekly or monthly
          subscription to retain your customers, and a refinement or rebrand of your business. Partner is
          monthly, after launch, and it is not hidden inside the build.
        </p>
        <Link
          to="/estimate"
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Not sure which one? I’ll walk you through it.
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} detailed />
          ))}
        </div>
        <div id="extras" className="mt-14 scroll-mt-24">
          <h2 className="font-display text-4xl text-ink">Partner</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Optional, on top of Shop, Box, or Stay. Six months minimum. It is the running of the site, not a
            pile of cheap extras.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {extras.map((item) => (
              <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-8">
                <h3 className="text-base font-medium text-ink">{item.name}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">{item.detail}</p>
                <p className="text-sm font-medium text-ink tabular-nums">
                  {item.monthly ? `${formatGBP(item.price)} a month` : formatGBP(item.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Prices are a starting point. Spread the cost with flexible payment methods. Easier for small and new businesses. If your budget is different, we’ll look at what fits. I can meet you on a video call, or in person, and go through everything. While the site is being built, I’m on call.
        </p>
        <PricesNote />
        <div className="mt-14">
          <h2 className="font-display text-4xl text-ink">Shaped Around the Business</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {practice.map((item) => (
              <li key={item.title} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-12">
                <h3 className="text-base font-medium text-ink">{item.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
          {notes.map((note) => (
            <li key={note.title}>
              <p className="text-sm font-medium text-ink">{note.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{note.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="font-display text-4xl text-ink">Questions</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink">
                  {faq.q}
                  <span className="text-muted transition-transform duration-200 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink to="/start">Start a project</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

const notes = [
  {
    title: "In Person or on a Call",
    body: "Meet up, or talk on a video call, and go through what the site has to do.",
  },
  {
    title: "On Call During the Build",
    body: "While it’s being made, I’m near enough always available to talk about how it’s going.",
  },
  {
    title: "Partner, After Launch",
    body: "£150 a month for six months. Product changes, fixes, and one planned improvement a month. A new brand or a second project is quoted separately.",
  },
];
