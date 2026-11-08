import { createFileRoute, Link } from "@tanstack/react-router";
import { ButtonLink } from "@/components/ui/button";
import { Stars } from "@/components/testimonials";
import { formatGBP, packages, projects } from "@/lib/content";
import { BUSINESS_ID, SITE_URL, breadcrumbs, seo, webPage } from "@/lib/seo";
import { TRUSTPILOT_URL, testimonials } from "@/lib/testimonials";

const PATH = "/web-designer-newcastle";

const localFaqs = [
  {
    q: "Are you a web designer in Newcastle?",
    a: "Yes. I’m Lewis, a web designer in the North East, and I work with businesses in Newcastle, Gateshead, Sunderland, Durham and across the region, as well as UK-wide.",
  },
  {
    q: "Can we meet in person?",
    a: "Yes. I can meet you in person around Newcastle and the North East, or on a video call if that’s easier. The first conversation costs nothing and there’s no deposit until you’re sure.",
  },
  {
    q: "How much does a website cost?",
    a: `Packages start at ${formatGBP(packages[0].price)} for Shop, ${formatGBP(packages[1].price)} for Box and ${formatGBP(packages[2].price)} for Stay. Prices are a starting point and negotiable. You pay 25% to start and the rest when the site goes live, and you can spread the cost.`,
  },
  {
    q: "How long does a new website take?",
    a: `${packages.map((p) => `${p.name} takes ${p.time.toLowerCase()}`).join(", ")}. The Macro Kitchen’s site was designed, built and launched within two weeks.`,
  },
  {
    q: "Do you build on Shopify and WordPress?",
    a: "Both, and custom builds too. The platform is picked around how you sell: a shop, a weekly menu, a build-a-box, subscriptions or a members’ area.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Every site is built so search engines can read it: clear page titles and descriptions, structured data, a sitemap and fast pages. I’ll also show you how to set up your Google Business Profile, which matters most for local searches in Newcastle.",
  },
];

export const Route = createFileRoute("/web-designer-newcastle")({
  head: () =>
    seo({
      title: "Web Designer in Newcastle | Ecommerce Websites | CreatedByLewis",
      description:
        "Web designer in the North East building websites that take orders for Newcastle businesses, on Shopify, WordPress or custom. Meet in person or on a call. From £1,000.",
      path: PATH,
      schema: [
        webPage(PATH, "Web designer in Newcastle"),
        breadcrumbs([["Web designer in Newcastle", PATH]]),
        {
          "@type": "Service",
          "@id": `${SITE_URL}${PATH}#service`,
          name: "Web design in Newcastle upon Tyne",
          serviceType: "Web design",
          description:
            "Ecommerce website design and build for businesses in Newcastle upon Tyne and the North East, on Shopify, WordPress or a custom build.",
          provider: { "@id": BUSINESS_ID },
          areaServed: [
            { "@type": "City", name: "Newcastle upon Tyne" },
            { "@type": "City", name: "Gateshead" },
            { "@type": "City", name: "Sunderland" },
            { "@type": "City", name: "Durham" },
            { "@type": "AdministrativeArea", name: "Tyne and Wear" },
            { "@type": "AdministrativeArea", name: "North East England" },
          ],
          offers: packages.map((pkg) => ({
            "@type": "Offer",
            name: pkg.name,
            price: pkg.price,
            priceCurrency: "GBP",
            url: `${SITE_URL}/packages/${pkg.id}`,
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}${PATH}#faq`,
          mainEntity: localFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    }),
  component: NewcastlePage,
});

function NewcastlePage() {
  const mk = projects.find((p) => p.slug === "the-macro-kitchen");
  const review = testimonials.find((t) => t.project === "the-macro-kitchen");
  const live = projects.filter((p) => p.status !== "in-progress");

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20">
        <p className="text-xs tracking-widest text-muted uppercase">Newcastle upon Tyne · North East</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
          Web Designer in <span className="italic text-signal">Newcastle.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          I’m Lewis, a web designer in the North East. I design and build websites for Newcastle businesses that
          sell: shops, kitchens, meal prep, farms and subscription brands. Built on Shopify, WordPress or custom,
          so customers can check you deliver to them, build their order and pay on their phone.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/book">Book a free call</ButtonLink>
          <ButtonLink to="/packages" variant="secondary">
            See packages and prices
          </ButtonLink>
        </div>
        <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {[
            ["Based", "North East"],
            ["Meet", "In person or video"],
            ["From", formatGBP(packages[0].price)],
            ["Sites live", String(live.length)],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-4 py-4">
              <dt className="text-[10px] tracking-widest text-muted uppercase">{k}</dt>
              <dd className="mt-1 font-display text-xl text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {mk ? (
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">Built in the North East</p>
              <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">The Macro Kitchen</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">{mk.lede}</p>
              {review ? (
                <figure className="mt-6 border-l-2 border-signal pl-4">
                  <Stars rating={review.rating} size={16} />
                  <blockquote className="mt-3 font-display text-xl leading-snug text-ink">“{review.excerpt}”</blockquote>
                  <figcaption className="mt-2 text-sm text-muted">
                    {review.name}, {review.business} ·{" "}
                    <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                      Trustpilot
                    </a>
                  </figcaption>
                </figure>
              ) : null}
              <Link
                to="/work/$slug"
                params={{ slug: mk.slug }}
                className="mt-7 inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-signal decoration-2 underline-offset-4"
              >
                Read the case study
              </Link>
            </div>
            <Link to="/work/$slug" params={{ slug: mk.slug }} className="lift block overflow-hidden rounded-2xl border border-line">
              <img src={mk.image} alt={mk.imageAlt} className="block h-auto w-full" loading="lazy" width={1440} height={900} />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">Three Ways to Start</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {packages.map((pkg) => (
              <li key={pkg.id} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-10">
                <h3 className="font-display text-2xl text-ink">
                  <Link to="/packages/$id" params={{ id: pkg.id }} className="hover:text-signal">
                    {pkg.name}
                  </Link>
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">{pkg.blurb}</p>
                <p className="text-sm text-ink tabular-nums">
                  From {formatGBP(pkg.price)} · {pkg.time.toLowerCase()}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            Also working with businesses across the UK. See{" "}
            <Link to="/work" className="text-ink underline underline-offset-2">
              all {live.length} live sites
            </Link>
            , or{" "}
            <Link to="/estimate" className="text-ink underline underline-offset-2">
              get an estimate
            </Link>{" "}
            in a couple of minutes.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">Questions from Newcastle Businesses</h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {localFaqs.map((item) => (
              <div key={item.q} className="grid gap-2 py-6 sm:grid-cols-[18rem_1fr] sm:gap-12">
                <dt className="text-base font-medium text-ink">{item.q}</dt>
                <dd className="max-w-xl text-sm leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
