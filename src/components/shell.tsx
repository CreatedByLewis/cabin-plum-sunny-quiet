import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Instagram, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Stars, TrustpilotMark } from "@/components/testimonials";
import { TRUSTPILOT_URL, testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", to: "/work" },
  { label: "Packages", to: "/packages" },
  { label: "Estimate", to: "/estimate" },
  { label: "Blog", to: "/blog" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <div id="content">{children}</div>
      <ClosingCta />
      <Footer />
      <MobileActionBar />
    </>
  );
}

function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-line/70 bg-paper/95 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8",
          scrolled ? "h-16" : "h-[4.5rem]",
        )}
      >
        <Link to="/" className="flex items-center gap-2.5 text-ink" aria-label="CreatedByLewis, home">
          <Wordmark />
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-line bg-card/50 p-1 backdrop-blur md:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-9 items-center rounded-full px-4 text-sm transition-colors duration-200",
                  active ? "bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-line)]" : "text-muted hover:bg-paper/60 hover:text-ink",
                )}
              >
                {link.label}
                {active ? (
                  <span aria-hidden className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-signal to-transparent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/book"
            aria-current={isActive("/book") ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 text-sm transition-colors duration-200 hover:text-ink",
              isActive("/book") ? "text-ink" : "text-muted",
            )}
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50 [animation-duration:2.4s]" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Book a call
          </Link>
          <Link
            to="/start"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-[background-color,scale] duration-200 hover:bg-ink/90 active:scale-[0.96]"
          >
            Start a project
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-card/50 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] animate-[menu-in_220ms_ease-out] overflow-y-auto border-t border-line bg-paper px-5 pt-2 pb-8 md:hidden"
          aria-label="Mobile"
        >
          <ul className="divide-y divide-line">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between font-display text-3xl text-ink"
                >
                  <span className={isActive(link.to) ? "italic text-signal" : undefined}>{link.label}</span>
                  <ArrowRight className="size-5 text-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3">
            <Link
              to="/start"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper"
            >
              Start a project
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/book"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium text-ink"
            >
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
              Book a free call
            </Link>
          </div>
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2.5 text-xs text-muted"
          >
            <TrustpilotMark className="text-[13px]" />
            <Stars rating={5} size={13} />
            <span>
              {testimonials.length} {testimonials.length === 1 ? "review" : "reviews"}
            </span>
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2 text-ink">
      <span className="grid size-9 place-items-center rounded-lg bg-signal font-display text-lg italic leading-none text-on-signal">
        L
      </span>
      <span className="text-[15px] font-medium tracking-tight whitespace-nowrap sm:text-base">
        CreatedBy<span className="font-display italic">Lewis</span>
      </span>
    </span>
  );
}

function ClosingCta() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname.startsWith("/start") || pathname.startsWith("/book") || pathname.startsWith("/enquiries")) return null;
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 80% at 20% 0%, color-mix(in srgb, var(--color-signal) 28%, transparent), transparent 70%), radial-gradient(40% 70% at 85% 100%, rgb(212 106 154 / 0.16), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]"
          />
          <p className="eyebrow relative">Got something to sell?</p>
          <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            Let’s build the site that takes the <span className="italic text-signal">order</span>.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-muted">
            A free call, in person or on video. Nothing to pay, and no deposit until you’re sure.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/book"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-[background-color,scale] duration-200 hover:bg-ink/90 active:scale-[0.96]"
            >
              Book a call
            </Link>
            <Link
              to="/estimate"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/30 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink"
            >
              Get an estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Work", to: "/work" },
      { label: "Packages", to: "/packages" },
      { label: "Blog", to: "/blog" },
      { label: "Web design in Newcastle", to: "/web-designer-newcastle" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Book a call", to: "/book" },
      { label: "Get an estimate", to: "/estimate" },
      { label: "Start a project", to: "/start" },
      { label: "Theme support", to: "/support" },
    ],
  },
] as const;

function MobileActionBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [show, setShow] = useState(false);
  const hidden = ["/start", "/book", "/estimate", "/enquiries"].some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (hidden) return;
    const onScroll = () => {
      const y = window.scrollY;
      const fromBottom = document.documentElement.scrollHeight - (y + window.innerHeight);
      setShow(y > 560 && fromBottom > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden, pathname]);

  if (hidden) return null;
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 border-t border-line/70 bg-paper/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl transition-[translate,opacity] duration-300 md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <Link
          to="/book"
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper active:scale-[0.97]"
        >
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          Book a free call
        </Link>
        <Link
          to="/estimate"
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-ink/30 text-sm font-medium text-ink active:scale-[0.97]"
        >
          Get an estimate
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:py-14">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" aria-label="CreatedByLewis, home" className="inline-flex">
            <Wordmark />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Design and build. North East, working UK-wide.
          </p>
        </div>
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-xs tracking-widest text-muted uppercase">{group.title}</p>
            <ul className="mt-4 grid gap-1">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-flex min-h-9 items-center text-sm text-ink/85 transition-colors hover:text-signal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="col-span-2 md:col-span-1">
          <p className="text-xs tracking-widest text-muted uppercase">Contact</p>
          <ul className="mt-4 grid gap-1 text-sm">
            <li>
              <a href="tel:+447484686442" className="inline-flex min-h-9 items-center text-ink/85 transition-colors hover:text-signal">
                07484 686442
              </a>
            </li>
            <li>
              <a href="mailto:hello@createdbylewis.com" className="inline-flex min-h-9 items-center text-ink/85 transition-colors hover:text-signal">
                hello@createdbylewis.com
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/createdbylewis"
                className="inline-flex min-h-9 items-center gap-2 text-ink/85 transition-colors hover:text-signal"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="size-4" aria-hidden />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">Pay with</p>
            <ul className="mt-4 flex flex-nowrap items-center gap-x-4 sm:gap-x-6" aria-label="Payment methods">
              <li><ApplePayMark /></li>
              <li><GooglePayMark /></li>
              <li><PayPalMark /></li>
              <li><KlarnaMark /></li>
              <li><ClearpayMark /></li>
            </ul>
          </div>
          <TrustpilotBadge />
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-28 text-xs text-muted sm:px-8 md:pb-10">
          © {new Date().getFullYear()} CreatedByLewis
        </p>
      </div>
    </footer>
  );
}

function TrustpilotBadge() {
  const count = testimonials.length;
  if (count === 0) return null;
  const allFive = testimonials.every((t) => t.rating === 5);
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">Reviewed on</p>
      <a
        href={TRUSTPILOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-3 inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-line px-4 py-2.5 transition-colors hover:border-ink/40"
        aria-label={`Trustpilot: ${count} ${count === 1 ? "review" : "reviews"}${allFive ? ", all 5 stars" : ""}. Opens Trustpilot.`}
      >
        <TrustpilotMark className="text-[15px]" />
        {allFive ? <Stars rating={5} size={16} /> : null}
        <span className="text-xs text-muted">
          {count} {count === 1 ? "review" : "reviews"}
          <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
            ↗
          </span>
        </span>
      </a>
    </div>
  );
}

function ApplePayMark() {
  return (
    <span className="inline-flex items-center gap-1.5 text-ink" aria-label="Apple Pay">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="currentColor"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        />
      </svg>
      <span className="text-[15px] font-medium tracking-tight">Pay</span>
    </span>
  );
}

function GooglePayMark() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label="Google Pay">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <span className="text-[15px] font-medium tracking-tight text-ink">Pay</span>
    </span>
  );
}

function PayPalMark() {
  return (
    <span className="text-[15px] font-semibold tracking-tight sm:text-[17px]" aria-label="PayPal">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009cde]">Pal</span>
    </span>
  );
}

function KlarnaMark() {
  return (
    <span className="text-[15px] font-black tracking-tight text-ink sm:text-[17px]" aria-label="Klarna">
      Klarna<span className="text-[#ff8db8]">.</span>
    </span>
  );
}

function ClearpayMark() {
  return (
    <span className="inline-flex flex-col text-ink" aria-label="Clearpay">
      <span className="text-[14px] font-semibold tracking-tight lowercase sm:text-[16px]">clearpay</span>
      <span className="mt-0.5 h-0.5 w-full rounded-full bg-[#00d37f]" />
    </span>
  );
}
