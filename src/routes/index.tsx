import { seo, webPage, SITE_URL } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Store, Wallet } from "lucide-react";
import { useEffect, useRef } from "react";
import { Stars, Testimonials, TrustpilotMark } from "@/components/testimonials";
import { TRUSTPILOT_URL, testimonials } from "@/lib/testimonials";
import { clientLogos } from "@/components/client-logos";
import { Showcase } from "@/components/showcase/showcase";
import { PackageCard } from "@/components/package-card";
import { PricesNote } from "@/components/prices-note";
import { ButtonLink } from "@/components/ui/button";
import { faqs, formatGBP, packages, practice, projects } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => seo({
    title: "Ecommerce Web Designer in Newcastle & the UK | CreatedByLewis",
    description:
      "Bespoke ecommerce websites for businesses that sell, from a web designer in the North East working across Newcastle and the UK. Shopify, WordPress or custom.",
    path: "/",
    schema: [
      webPage("/", "Ecommerce web design for UK businesses that sell"),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  }),
  component: Home,
});

/** Three facts a visitor actually asks about: proof, time and what it costs to start. */
function HeroStats() {
  const live = projects.filter((p) => p.status !== "in-progress").length;
  const weeks = packages.map((p) => Number(p.time.match(/\d+/)?.[0] ?? 0)).filter(Boolean);
  const minWeeks = Math.min(...weeks);
  const maxWeeks = Math.max(...weeks);
  const startPrice = Math.min(...packages.map((p) => p.price));
  const deposit = 0.25;

  const card =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card/45 p-3 text-left backdrop-blur transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-signal/40 hover:bg-card/70 sm:p-5";
  const label = "flex items-center gap-2 text-[10px] tracking-wide text-muted uppercase sm:text-[11px] sm:tracking-widest";
  const chip =
    "hidden size-6 shrink-0 place-items-center rounded-full bg-signal/12 text-signal ring-1 ring-signal/20 sm:grid";
  const value = "mt-2 font-display text-[1.65rem] leading-none text-ink tabular-nums sm:mt-3 sm:text-4xl";
  const note = "mt-auto pt-3 text-[10.5px] leading-snug text-muted sm:text-xs";

  return (
    <ul
      className="rise mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3"
      style={{ animationDelay: "920ms" }}
      aria-label="At a glance"
    >
      <li>
        <Link to="/work" className={card}>
          <Sheen />
          <span className={label}>
            <span className={chip} aria-hidden>
              <Store className="size-3.5" />
            </span>
            Sites live
          </span>
          <span className={value}>{live}</span>
          <span className={note}>
            <span className="mb-2 flex h-1 items-center gap-1" aria-hidden>
              {Array.from({ length: live }, (_, i) => (
                <span key={i} className="relative flex size-1.5 sm:size-2">
                  <span
                    className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50"
                    style={{ animationDelay: `${i * 350}ms`, animationDuration: "2.4s" }}
                  />
                  <span className="relative inline-flex size-full rounded-full bg-emerald-400" />
                </span>
              ))}
            </span>
            Taking orders<span className="hidden sm:inline"> now</span>
          </span>
        </Link>
      </li>
      <li>
        <Link to="/packages" className={card}>
          <Sheen />
          <span className={label}>
            <span className={chip} aria-hidden>
              <Clock3 className="size-3.5" />
            </span>
            Live in
          </span>
          <span className={`${value} whitespace-nowrap`}>
            {minWeeks}–{maxWeeks}
            <span className="ml-1 font-sans text-xs text-muted sm:text-base">
              <span className="sm:hidden">wks</span>
              <span className="hidden sm:inline">weeks</span>
            </span>
          </span>
          <span className={note}>
            <span className="mb-2 flex gap-1" aria-hidden>
              {Array.from({ length: maxWeeks }, (_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i < minWeeks ? "bg-signal" : "bg-signal/25"}`}
                />
              ))}
            </span>
            Brief to launch
          </span>
        </Link>
      </li>
      <li>
        <Link to="/packages" className={card}>
          <Sheen />
          <span className={label}>
            <span className={chip} aria-hidden>
              <Wallet className="size-3.5" />
            </span>
            To start
          </span>
          <span className={value}>{formatGBP(startPrice * deposit)}</span>
          <span className={note}>
            <span className="mb-2 flex h-1 overflow-hidden rounded-full bg-signal/20" aria-hidden>
              <span className="h-full rounded-full bg-signal" style={{ width: `${deposit * 100}%` }} />
            </span>
            The rest at launch
          </span>
        </Link>
      </li>
    </ul>
  );
}

/** A hairline highlight along the top edge and a soft glow that wakes on hover. */
function Sheen() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-signal/0 blur-2xl transition-colors duration-500 group-hover:bg-signal/20"
      />
    </>
  );
}

function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-4xl px-5 pt-12 pb-12 text-center sm:pt-20 sm:pb-16">
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Rated 5 stars on Trustpilot from ${testimonials.length} reviews. Opens Trustpilot.`}
            className="step-in group inline-flex min-h-9 items-center gap-2.5 rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-xs text-muted backdrop-blur transition-colors hover:border-ink/40"
          >
            <TrustpilotMark className="text-[13px]" />
            <Stars rating={5} size={14} />
            <span>
              {testimonials.length} {testimonials.length === 1 ? "review" : "reviews"}
            </span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <h1 className="mt-7 font-sans text-5xl leading-[1.02] font-medium tracking-tight text-ink sm:text-7xl lg:text-8xl">
            {["A", "Site", "That", "Can", "Take", "the"].map((word, i) => (
              <span key={word + i} className="word-rise" style={{ animationDelay: `${80 + i * 70}ms` }}>
                {word}&nbsp;
              </span>
            ))}
            <span className="word-rise" style={{ animationDelay: "560ms" }}>
              <span className="text-shimmer pr-[0.06em] font-display italic">Order</span>.
            </span>
          </h1>
          <p
            className="rise mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink/85"
            style={{ animationDelay: "720ms" }}
          >
            I design and build websites for brands that sell products, whether you’ve just opened or you’re
            already a big company. You work with me from the brief to the day it goes live. No account
            managers, and no templates with your logo swapped in.
          </p>
          <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "820ms" }}>
            <ButtonLink to="/book" className="group shadow-[0_10px_40px_-10px_color-mix(in_srgb,var(--color-signal)_70%,transparent)]">
              Book a call
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink to="/" hash="work" variant="secondary">
              See the work
            </ButtonLink>
          </div>
          <HeroStats />
        </div>
        <ClientStrip />
      </section>

      <section id="work" className="relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl text-ink sm:text-5xl">Selected Work</h2>
            <p className="hidden text-sm text-muted sm:block">Four sites taking orders, one launching soon, and an app in the works.</p>
          </div>
          <div className="mt-8 sm:mt-10">
            <Showcase />
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">Three Ways to Sell</h2>
              <p className="mt-3 max-w-lg text-muted">
                Pick the one that fits your business. The full detail is on the packages page.
              </p>
            </div>
            <Link to="/packages" className="inline-flex min-h-11 items-center text-sm font-medium text-ink">
              Compare What’s Included
            </Link>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="lift mt-4 rounded-2xl border border-line bg-card p-6 sm:p-8">
            <p className="text-xs tracking-widest text-muted uppercase">After Launch</p>
            <h3 className="mt-3 font-display text-4xl text-ink">Partner</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              £150 a month for six months, on top of any of the three. I handle product and menu changes
              up to an agreed hour a week, fix anything that breaks, and make one planned improvement a month.
              A new brand or a second project is quoted separately.
            </p>
          </div>
          <p className="mt-6 text-sm text-muted">You can spread the cost with flexible payment options, which helps if you’re a small or new business.</p>
          <PricesNote />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="max-w-2xl font-display text-4xl text-ink sm:text-5xl">Built Around How You Sell</h2>
          <p className="mt-4 max-w-xl text-muted">
            The package is the starting point. What goes on the pages is worked out with you. These are the
            pieces I build in when a business needs them, and leave out when it doesn’t.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {practice.map((item, i) => (
              <li
                key={item.title}
                className="group grid gap-2 py-6 transition-colors duration-300 sm:grid-cols-[3rem_14rem_1fr] sm:gap-8 sm:px-3 sm:py-7 sm:hover:bg-card/60"
              >
                <span className="hidden font-display text-sm text-signal tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-medium text-ink transition-transform duration-300 sm:group-hover:translate-x-1">{item.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">How It Goes</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.n} className="group relative bg-paper p-6 transition-colors duration-300 hover:bg-card sm:p-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <p className="flex items-center gap-3 font-display text-sm text-signal">
                  {step.n}
                  {i < steps.length - 1 ? <span aria-hidden className="hidden h-px flex-1 bg-line lg:block" /> : null}
                </p>
                <h3 className="mt-3 text-lg font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="studio" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <div className="ring-glow mx-auto size-56 rounded-full p-1.5 sm:size-64">
            <img
              src="/lewis.jpg"
              alt="Lewis Stratford"
              width={1260}
              height={1575}
              loading="lazy"
              className="size-full rounded-full object-cover object-[center_18%]"
            />
          </div>
          <h2 className="mt-8 font-display text-4xl text-ink sm:text-5xl">About Lewis</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            I design it and I build it, so you deal with the same person from the brief to launch. I treat
            every site as if it were my own.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Most of my recent work is meal prep and food delivery, because those businesses live or die on the
            order. The same approach works for a brand that’s just starting out and one that’s already selling
            at scale, anywhere in the UK.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We go through how you actually sell before I design anything, on a video call or in person if that
            suits. While the site’s being built, I’m on call. Prices are a starting point, and if your budget
            is different, the scope moves with it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink to="/book">Book a call</ButtonLink>
            <ButtonLink to="/start" variant="secondary">
              Start a project
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">Questions</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink">
                  {faq.q}
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-open:rotate-45 group-open:border-signal group-open:text-signal"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroOrbs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ ["--mx" as string]: "0", ["--my" as string]: "0" }}
    >
      <div
        className="absolute top-[8%] left-[2%] size-52 opacity-20 sm:left-[8%] sm:size-72"
        style={{ transform: "translate(calc(var(--mx) * 22px), calc(var(--my) * 12px))" }}
      >
        <div className="orb-drift-a size-full rounded-full bg-[radial-gradient(circle_at_32%_28%,#f3ecff_0%,#8b7cf7_48%,#241848_82%)] shadow-[0_0_18px_4px_rgba(139,124,247,0.06)]" />
      </div>
      <div
        className="absolute top-[18%] left-[28%] size-56 opacity-15 sm:left-[32%] sm:size-80"
        style={{ transform: "translate(calc(var(--mx) * -14px), calc(var(--my) * 16px))" }}
      >
        <div className="orb-drift-b size-full rounded-full bg-[radial-gradient(circle_at_40%_32%,#ffe9f3_0%,#d46a9a_48%,#3a1630_82%)] shadow-[0_0_18px_4px_rgba(212,106,154,0.05)]" />
      </div>
      <div
        className="absolute top-[6%] right-[2%] size-48 opacity-20 sm:right-[8%] sm:size-64"
        style={{ transform: "translate(calc(var(--mx) * 16px), calc(var(--my) * -10px))" }}
      >
        <div className="orb-drift-c size-full rounded-full bg-[radial-gradient(circle_at_34%_30%,#e9fbff_0%,#5ec4d8_48%,#102830_82%)] shadow-[0_0_16px_4px_rgba(94,196,216,0.05)]" />
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Brief",
    body: "What you sell, who it’s for, and what the site needs to do.",
  },
  {
    n: "02",
    title: "Design",
    body: "Fonts, layout and how people move through the offer. You see it before it’s built.",
  },
  {
    n: "03",
    title: "Build",
    body: "Built for your business, then tested on a phone the way a customer would use it, including the spots where people get stuck.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Live on your domain, with a walkthrough of how to update it. Search is set up so the pages can be found.",
  },
];

function ClientStrip() {
  const clients = projects.filter((p) => clientLogos[p.slug]);
  const row = [...clients, ...clients, ...clients];
  return (
    <div className="relative z-10 border-y border-line bg-paper/40 py-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 sm:px-8">
        <p className="hidden shrink-0 text-[11px] tracking-[0.22em] text-muted uppercase sm:block">Built for</p>
        <div className="marquee-mask group/marquee relative flex-1 overflow-hidden">
          <ul className="marquee flex w-max items-center gap-16 group-hover/marquee:[animation-play-state:paused] sm:gap-20" aria-label="Clients">
            {[...row, ...row].map((project, i) => {
              const logo = clientLogos[project.slug];
              const hidden = i >= clients.length;
              return (
                <li key={`${project.slug}-${i}`} aria-hidden={hidden} className="flex items-center">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    tabIndex={hidden ? -1 : undefined}
                    aria-label={`${project.name} case study`}
                    className="block text-ink/55 transition-colors duration-300 hover:text-ink"
                  >
                    <span
                      className={`block [&>svg]:h-full [&>svg]:w-auto ${logo.height}`}
                      dangerouslySetInnerHTML={{ __html: logo.svg }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
