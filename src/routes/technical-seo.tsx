import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Stars, TrustpilotMark } from "@/components/testimonials";
import { BUSINESS_ID, SITE_URL, breadcrumbs, seo, webPage } from "@/lib/seo";
import { TRUSTPILOT_URL, testimonials } from "@/lib/testimonials";

const PATH = "/technical-seo";

const GRADIENT = "bg-gradient-to-r from-[#8b7cf7] via-[#d46a9a] to-[#5ec4d8] bg-clip-text text-transparent";

const reasons = [
  {
    title: "The fix goes in the code",
    body: "I build websites, so I don't hand you a report full of jargon and leave you to find a developer. I make the changes myself.",
  },
  {
    title: "Checked against Google's own numbers",
    body: "Every change is measured in Search Console and PageSpeed before and after, so you can see what moved.",
  },
  {
    title: "Your platform, not a template",
    body: "Shopify, WordPress and custom builds each go wrong in their own ways. The plan is written for the site you've actually got.",
  },
  {
    title: "One person from start to finish",
    body: "You deal with me from the first check to the last fix. No account managers, and no handing you between teams.",
  },
];

const services = [
  {
    title: "Site Audit and Fixes",
    body: "I go through the site the way Google does, page by page, and list everything stopping it from being read, indexed or ranked. Then I fix it.",
    points: ["A full crawl of every page", "Broken links and crawl errors", "Duplicate and thin pages", "Problems that only show on phones"],
  },
  {
    title: "Speed and Core Web Vitals",
    body: "A slow page loses the sale before it loses the ranking. I find what's weighing each page down and trim it.",
    points: ["Images sized and compressed properly", "Unused code and scripts removed", "The first screen loaded first", "Faster responses from the server"],
  },
  {
    title: "Mobile First",
    body: "Google ranks you on the phone version of your site, and that's where most of your customers are anyway. It has to work properly there.",
    points: ["Text and buttons sized for thumbs", "Layouts that don't jump as they load", "Pages that fit every screen"],
  },
  {
    title: "Structured Data",
    body: "Extra code that tells search engines exactly what's on the page, so your results can show prices, stars, opening hours and answers.",
    points: ["Product, business, menu and FAQ markup", "Tested for rich results", "Errors in Search Console cleared"],
  },
  {
    title: "Security and HTTPS",
    body: "Browsers warn people away from sites that aren't secure, and Google notices. Every version of your address should land safely in one place.",
    points: ["HTTPS on every page", "One address, with the rest redirected", "Mixed content and redirect loops fixed"],
  },
  {
    title: "URLs and Site Structure",
    body: "Clear addresses and sensible links between pages help people and search engines find their way around, and spread the value of your best pages.",
    points: ["Short, readable page addresses", "Internal links to the pages that sell", "Canonical tags to stop duplicates competing"],
  },
  {
    title: "Indexing and Crawling",
    body: "If Google can't reach a page, it can't rank it. I make sure the right pages are open to it and the wrong ones aren't.",
    points: ["robots.txt and XML sitemap set up", "Search Console connected and checked", "Orphaned and accidentally hidden pages found"],
  },
  {
    title: "Shops and Ordering Sites",
    body: "Online shops, meal prep menus and restaurant sites have problems of their own, from filter pages that multiply to products that come and go every week.",
    points: ["Category and product pages tuned", "Filters and variants kept from duplicating", "Prices and stock shown in search results"],
  },
];

const why = [
  {
    title: "Web design and SEO together",
    body: "Search is built into every site I make from day one, so I know where problems hide and how to fix them without breaking anything.",
  },
  {
    title: "Measured, not guessed",
    body: "Decisions come from what Search Console and real speed tests show, not from a checklist copied from somewhere else.",
  },
  {
    title: "Written for your business",
    body: "A kitchen with a weekly menu needs different things from a farm shop or a restaurant. You get a plan for yours.",
  },
  {
    title: "Plain English throughout",
    body: "You'll know what was wrong, what I changed and why it matters, without needing to learn the jargon.",
  },
];

const faqs = [
  {
    q: "What is technical SEO, and why does it matter?",
    a: "It's the side of SEO that lives in how a site is built: how quickly it loads, whether search engines can read and index every page, how it works on a phone, and the code that describes what each page is. If that foundation is wrong, good content and good products still struggle to show up.",
  },
  {
    q: "How do I know if my site has technical problems?",
    a: "Common signs are pages missing from Google, a site that feels slow on a phone, warnings in Search Console, or traffic dropping after a redesign. A short call and a look at the site is usually enough to tell whether there's something worth fixing.",
  },
  {
    q: "How long until I see results?",
    a: "Some changes, like speed fixes, help straight away. Rankings usually take a few weeks to a few months to move, because Google has to come back and read the site again. I can't promise a position in Google, and you should be wary of anyone who does.",
  },
  {
    q: "Do you only work on sites you've built?",
    a: "No. I can check and fix sites built by someone else, on Shopify, WordPress or a custom build. Every site I build also comes with this done from the start.",
  },
  {
    q: "Will this help on mobile?",
    a: "Yes. Google ranks you on the mobile version of your site, so most of the work is aimed there: faster pages on a phone connection, layouts that don't shift, and buttons that are easy to tap.",
  },
];

export const Route = createFileRoute("/technical-seo")({
  head: () =>
    seo({
      title: "Technical SEO for Ecommerce and Small Business Websites | CreatedByLewis",
      description:
        "Technical SEO audits and fixes from a web designer who makes the changes himself: speed, Core Web Vitals, structured data, indexing and mobile, on Shopify, WordPress or custom.",
      path: PATH,
      schema: [
        webPage(PATH, "Technical SEO"),
        breadcrumbs([["Technical SEO", PATH]]),
        {
          "@type": "Service",
          "@id": `${SITE_URL}${PATH}#service`,
          name: "Technical SEO",
          serviceType: "Technical search engine optimisation",
          description:
            "Technical SEO audits and fixes covering crawling and indexing, site speed and Core Web Vitals, mobile, structured data, HTTPS and site structure.",
          provider: { "@id": BUSINESS_ID },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Technical SEO services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.body },
            })),
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}${PATH}#faq`,
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    }),
  component: TechnicalSeoPage,
});

function TechnicalSeoPage() {
  const review = testimonials.find((t) => t.project === "the-macro-kitchen");

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,124,247,0.22),transparent)] blur-2xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div>
            <nav aria-label="Breadcrumb" className="rise flex items-center gap-2 text-xs">
              <Link to="/" className="rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:text-ink">
                Home
              </Link>
              <ChevronRight className="size-3.5 text-muted" aria-hidden />
              <span aria-current="page" className="rounded-full border border-signal/40 bg-signal/15 px-3 py-1.5 text-ink">
                Technical SEO
              </span>
            </nav>
            <h1
              className="rise mt-8 font-display text-5xl leading-display font-medium text-ink sm:text-6xl xl:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Get your site found with <span className={`italic ${GRADIENT}`}>technical SEO.</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "240ms" }}>
              Google can only rank what it can read. I go through how your website is built, find what's holding it back
              in search, and fix it myself, so the pages you've worked hard on actually get seen.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
              <ButtonLink to="/book">Book a free call</ButtonLink>
              <ButtonAnchor href="#what-i-check" variant="secondary">
                See what I check
              </ButtonAnchor>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className="eyebrow">Under the bonnet</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Faster, Clearer, <span className="italic text-signal">Easier to Find.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                Most of what decides whether a page ranks is invisible to the people using it. I look after all of it, so
                you can get on with running the business.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {reasons.map((r, i) => (
                <li key={r.title} className="group bg-paper p-6 transition-colors duration-300 hover:bg-card sm:p-7">
                  <p className={`font-display text-3xl ${GRADIENT}`}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-medium text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ServiceSlider />

      {/* Proof */}
      {review ? (
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lift inline-flex flex-col gap-3 self-start rounded-2xl border border-line bg-card px-7 py-6"
            >
              <TrustpilotMark className="text-lg" />
              <Stars rating={5} size={22} />
              <span className="text-sm text-muted">
                Rated 5 stars in every review <ArrowUpRight className="inline size-3.5" aria-hidden />
              </span>
            </a>
            <figure>
              <blockquote className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                “His technical ability and understanding of website development are genuinely impressive.”
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                {review.name}, {review.business}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {/* Band */}
      <section className="px-5 sm:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(212,106,154,0.28),transparent)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-24 size-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(94,196,216,0.18),transparent)] blur-2xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <h2 className="font-display text-5xl leading-[0.98] text-ink sm:text-7xl">
              From hidden
              <br />
              to <span className={`italic ${GRADIENT}`}>found.</span>
            </h2>
            <div>
              <p className="max-w-md leading-relaxed text-muted">
                Speed, structure and a site Google can read from top to bottom: the groundwork that lets everything else
                you do online pay off.
              </p>
              <div className="mt-6">
                <ButtonLink to="/book">Let's talk</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why me */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow">Why work with me</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Built Properly, <span className="italic text-signal">Not Just Ticked Off.</span>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <li key={w.title} className="lift rounded-2xl border border-line bg-card p-6">
                <span className="grid size-10 place-items-center rounded-full bg-signal/15 text-signal">
                  <Check className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-medium text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="font-display text-2xl text-ink">Better rankings start with a quick look.</p>
            <ButtonLink to="/book">Book a free call</ButtonLink>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">Questions</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((item, i) => (
              <details key={item.q} className="group" open={i === 0}>
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-open:rotate-45 group-open:border-signal group-open:text-signal"
                  >
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* More ways */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">More Ways to Grow</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link to="/packages" className="lift group rounded-2xl border border-line bg-card p-7">
              <p className="flex items-center justify-between font-display text-2xl text-ink">
                A New Website
                <ArrowUpRight className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Every site I build comes with all of this done from day one, on Shopify, WordPress or a custom build.
              </p>
            </Link>
            <Link to="/blog" className="lift group rounded-2xl border border-line bg-card p-7">
              <p className="flex items-center justify-between font-display text-2xl text-ink">
                The Blog
                <ArrowUpRight className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Plain-English advice on platforms, costs and building a website that sells.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceSlider() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function move(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section id="what-i-check" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What I check</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              The Groundwork <span className="italic text-signal">Behind Every Ranking.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={edge.start}
              aria-label="Previous"
              className="grid size-12 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/40 disabled:opacity-30"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={edge.end}
              aria-label="Next"
              className="grid size-12 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/40 disabled:opacity-30"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-16 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 sm:pb-24 xl:scroll-px-[calc((100vw-72rem)/2+2rem)] xl:px-[calc((100vw-72rem)/2+2rem)] [&::-webkit-scrollbar]:hidden"
        aria-label="Technical SEO services"
      >
        {services.map((s, i) => (
          <li
            key={s.title}
            className="group relative flex w-[85vw] max-w-[24rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-card p-7 transition-colors duration-300 hover:border-signal/50"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#8b7cf7] via-[#d46a9a] to-[#5ec4d8] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <p className="font-display text-sm text-signal tabular-nums">
              {String(i + 1).padStart(2, "0")} <span className="text-muted">/ {String(services.length).padStart(2, "0")}</span>
            </p>
            <h3 className="mt-6 font-display text-2xl leading-tight text-ink">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ink/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Layered hero picture: a client site with the SEO work floating over it. Decorative only. */
function HeroVisual() {
  return (
    <div aria-hidden className="seo-hero relative mx-auto aspect-[1/1.08] w-full max-w-[34rem] select-none">
      {/* faint guide lines, like a design canvas */}
      <span className="absolute inset-y-0 left-[14%] w-px bg-gradient-to-b from-transparent via-line to-transparent" />
      <span className="absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-line to-transparent" />

      {/* the site */}
      <div className="seo-in absolute top-[3%] right-[15%] left-[20%] h-[86%] overflow-hidden rounded-[1.6rem] border border-white/10 bg-card shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]" style={{ animationDelay: "150ms" }}>
        <img src="/work/macro-kitchen.jpg" alt="" className="size-full object-cover object-[30%_0%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
      </div>

      {/* code card */}
      <div
        className="seo-in seo-float absolute top-[20%] left-0 w-[47%] rounded-xl border border-signal/60 bg-paper/90 p-3.5 font-mono text-[10px] leading-[1.65] text-ink/90 shadow-[0_0_0_4px_rgba(139,124,247,0.12),0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-4 sm:text-[11.5px]"
        style={{ animationDelay: "350ms" }}
      >
        <span className="text-muted">&lt;</span><span className="text-[#d46a9a]">title</span><span className="text-muted">&gt;</span>
        Weekly Meal Prep | Order Online<span className="text-muted">&lt;/</span><span className="text-[#d46a9a]">title</span><span className="text-muted">&gt;</span>
        <br />
        <span className="text-muted">&lt;</span><span className="text-[#d46a9a]">link</span> <span className="text-[#5ec4d8]">rel</span>=<span className="text-[#c9c0ff]">"canonical"</span>
        <br />
        &nbsp;&nbsp;<span className="text-[#5ec4d8]">href</span>=<span className="text-[#c9c0ff]">"/menu"</span> <span className="text-muted">/&gt;</span>
        <br />
        <span className="text-muted">{"{"}</span> <span className="text-[#5ec4d8]">"@type"</span>: <span className="text-[#c9c0ff]">"Product"</span>
        <span className="hidden sm:inline">,</span>
        <span className="text-muted sm:hidden"> {"}"}</span>
        <br className="hidden sm:block" />
        <span className="hidden sm:inline">&nbsp;&nbsp;</span><span className="hidden sm:inline"><span className="text-[#5ec4d8]">"offers"</span>: <span className="text-muted">{"{"}</span> <span className="text-[#5ec4d8]">"price"</span>: <span className="text-[#c9c0ff]">"8.00"</span> <span className="text-muted">{"}"}</span> <span className="text-muted">{"}"}</span></span>
      </div>

      {/* cursor tag */}
      <div className="seo-in seo-cursor absolute top-[52%] left-[22%] z-10 sm:top-[47%] sm:left-[27%]" style={{ animationDelay: "650ms" }}>
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8b7cf7] to-[#d46a9a] py-2 pr-5 pl-3 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(212,106,154,0.8)] sm:text-base">
          <svg viewBox="0 0 24 24" className="size-5 -rotate-12 fill-white" aria-hidden>
            <path d="M4 3l16 7-7 2-2 7z" />
          </svg>
          Lewis
        </span>
      </div>

      {/* checklist panel */}
      <div
        className="seo-in absolute top-[34%] right-0 w-[36%] rounded-[1.4rem] sm:w-[40%] border border-white/10 bg-[#1c1c22]/95 p-3.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-4"
        style={{ animationDelay: "500ms" }}
      >
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
        </div>
        <ul className="mt-3 space-y-2">
          {[
            ["Sitemap submitted", "Sitemap", "#8b7cf7"],
            ["Core Web Vitals passed", "Web Vitals", "#d46a9a"],
            ["Structured data valid", "Schema", "#5ec4d8"],
            ["HTTPS on every page", "HTTPS", "#8b7cf7"],
          ].map(([label, short, colour], i) => (
            <li
              key={label}
              className="seo-tick flex items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 py-2 text-[10px] text-ink/90 sm:text-[11.5px]"
              style={{ animationDelay: `${900 + i * 260}ms` }}
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full" style={{ background: colour }}>
                <Check className="size-3 text-paper" strokeWidth={3} />
              </span>
              <span className="truncate sm:hidden">{short}</span>
              <span className="hidden truncate sm:inline">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* search graph */}
      <div
        className="seo-in absolute bottom-0 left-[4%] w-[52%] rounded-[1.4rem] border border-white/10 bg-[#1c1c22]/95 p-3.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-4"
        style={{ animationDelay: "700ms" }}
      >
        <div className="flex items-center gap-3 text-[10px] text-muted sm:text-[11px]">
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#8b7cf7]" />Clicks</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#5ec4d8]" />Impressions</span>
        </div>
        <svg viewBox="0 0 220 90" className="mt-2 block w-full overflow-visible" fill="none">
          <line x1="170" y1="0" x2="170" y2="90" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 4" />
          <path className="seo-line" d="M0 62 C20 60 30 40 50 38 S80 52 100 44 140 22 170 24 200 20 220 14" stroke="#5ec4d8" strokeWidth="2.5" strokeLinecap="round" />
          <path className="seo-line" style={{ animationDelay: "250ms" }} d="M0 82 C25 80 35 66 55 64 S90 74 115 62 145 46 170 46 200 40 220 32" stroke="#8b7cf7" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="170" cy="24" r="5" fill="#111114" stroke="#5ec4d8" strokeWidth="2" />
          <circle cx="170" cy="46" r="5" fill="#111114" stroke="#8b7cf7" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
