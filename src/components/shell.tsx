import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", to: "/work", hash: undefined },
  { label: "Packages", to: "/packages", hash: undefined },
  { label: "Estimate", to: "/estimate", hash: undefined },
  { label: "Book", to: "/book", hash: undefined },
  { label: "About", to: "/", hash: "studio" },
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
    </>
  );
}

function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function setTheme(nextLight: boolean) {
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    localStorage.setItem("lewis-theme", nextLight ? "light" : "dark");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", nextLight ? "#f3f2ef" : "#111114");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-ink">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              className={cn(
                "relative py-1 text-sm text-muted transition-colors duration-200 hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100",
                !link.hash && pathname.startsWith(link.to) && "text-ink after:scale-x-100",
              )}
              aria-current={!link.hash && pathname.startsWith(link.to) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/start"
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink/90 active:scale-[0.96]"
          >
            Start a project
          </Link>
          <ThemeSwitch light={light} onToggle={() => setTheme(!light)} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitch light={light} onToggle={() => setTheme(!light)} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-5 py-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  className="flex min-h-11 items-center text-base text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-2">
              <Link
                to="/start"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-paper"
              >
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function ThemeSwitch({ light, onToggle }: { light: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? "Switch to dark" : "Switch to light"}
      onClick={onToggle}
      className="relative grid h-11 w-[4.5rem] shrink-0 grid-cols-2 items-center rounded-full border border-line bg-card"
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ink transition-all duration-200",
          light ? "left-1" : "right-1",
        )}
      />
      <Sun className={cn("relative z-10 mx-auto size-4", light ? "text-paper" : "text-muted")} aria-hidden />
      <Moon className={cn("relative z-10 mx-auto size-4", light ? "text-muted" : "text-paper")} aria-hidden />
    </button>
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

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-2 text-sm text-muted">Design and build. United Kingdom.</p>
          <p className="mt-3 flex flex-col gap-1 text-sm">
            <a href="tel:+447484686442" className="text-muted hover:text-ink">
              07484 686442
            </a>
            <a href="mailto:hello@createdbylewis.com" className="text-muted hover:text-ink">
              hello@createdbylewis.com
            </a>
            <a
              href="https://www.instagram.com/createdbylewis"
              className="inline-flex items-center gap-2 text-muted hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="size-4" aria-hidden />
              Instagram
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
          <Link to="/work" className="text-muted hover:text-ink">
            Work
          </Link>
          <Link to="/packages" className="text-muted hover:text-ink">
            Packages
          </Link>
          <Link to="/estimate" className="text-muted hover:text-ink">
            Estimate
          </Link>
          <Link to="/book" className="text-muted hover:text-ink">
            Book a consultation
          </Link>
          <Link to="/start" className="text-muted hover:text-ink">
            Start a project
          </Link>
        </nav>
        <p className="text-sm text-muted">© {new Date().getFullYear()} CreatedByLewis</p>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <p className="text-xs tracking-widest text-muted uppercase">Pay with</p>
        <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4" aria-label="Payment methods">
          <li><ApplePayMark /></li>
          <li><GooglePayMark /></li>
          <li><PayPalMark /></li>
          <li><KlarnaMark /></li>
          <li><ClearpayMark /></li>
        </ul>
      </div>
    </footer>
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
    <span className="text-[17px] font-semibold tracking-tight" aria-label="PayPal">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009cde]">Pal</span>
    </span>
  );
}

function KlarnaMark() {
  return (
    <span className="text-[17px] font-black tracking-tight text-ink" aria-label="Klarna">
      Klarna<span className="text-[#ff8db8]">.</span>
    </span>
  );
}

function ClearpayMark() {
  return (
    <span className="inline-flex flex-col text-ink" aria-label="Clearpay">
      <span className="text-[16px] font-semibold tracking-tight lowercase">clearpay</span>
      <span className="mt-0.5 h-0.5 w-full rounded-full bg-[#00d37f]" />
    </span>
  );
}
