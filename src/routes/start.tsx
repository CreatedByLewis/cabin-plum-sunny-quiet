import { seo } from "@/lib/seo";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { PayDeposit } from "@/components/pay-deposit";
import { ExtrasPicker } from "@/components/extras-picker";
import {
  extras,
  formatGBP,
  isPackageId,
  packages,
  quote,
  type ExtraId,
  type PackageId,
} from "@/lib/content";
import { confirmCheckout } from "@/lib/checkout";
import { sendEnquiry } from "@/lib/enquire";
import { loadOrders, makeRef, saveOrder, type Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

type StartSearch = { package?: PackageId; paid?: string; session_id?: string };

export const Route = createFileRoute("/start")({
  validateSearch: (search: Record<string, unknown>): StartSearch => {
    const next: StartSearch = {};
    if (isPackageId(search.package)) next.package = search.package;
    if (search.paid === "1") next.paid = "1";
    if (typeof search.session_id === "string" && search.session_id.startsWith("cs_")) {
      next.paid = "1";
      next.session_id = search.session_id;
    }
    return next;
  },
  head: () => seo({
    title: "Start a project | CreatedByLewis",
    description:
      "Order a CreatedByLewis website package. You’ll get an invoice to start, and no card details are taken on the site.",
    path: "/start",
  }),
  component: StartPage,
});

type Errors = Partial<Record<"name" | "email" | "business" | "about" | "timeline", string>>;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function monthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const pad = (first.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: pad }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function formatStart(day: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(day);
}

function StartPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const formId = useId();
  const [packageId, setPackageId] = useState<PackageId>(search.package ?? "box");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [about, setAbout] = useState("");
  const earliest = addDays(new Date(), 1);
  const latest = addDays(earliest, 183);
  const [cursor, setCursor] = useState(() => new Date(earliest.getFullYear(), earliest.getMonth(), 1));
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [picked, setPicked] = useState<ExtraId[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<Order | null>(null);
  const [past, setPast] = useState<Order[]>([]);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [payment, setPayment] = useState<
    | { status: "checking" }
    | { status: "paid"; packageName: string; deposit: number; email: string | null }
    | { status: "open"; message: string }
    | null
  >(null);

  useEffect(() => {
    setPast(loadOrders());
  }, []);

  useEffect(() => {
    if (search.package) setPackageId(search.package);
  }, [search.package]);

  useEffect(() => {
    const sessionId = search.session_id;
    if (!sessionId) return;
    let cancelled = false;
    setPayment({ status: "checking" });
    confirmCheckout({ data: { sessionId } }).then((result) => {
      if (cancelled) return;
      if (result.ok && result.paid) {
        setPayment({
          status: "paid",
          packageName: result.packageName,
          deposit: result.deposit,
          email: result.email,
        });
        return;
      }
      setPayment({
        status: "open",
        message: result.ok ? "That payment isn’t complete yet." : result.message,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [search.session_id]);

  const estimate = quote(packageId, picked);

  function toggleExtra(id: ExtraId) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function selectPackage(id: PackageId) {
    setPackageId(id);
    void navigate({ to: "/start", search: { package: id }, replace: true });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Use an email I can reply to.";
    if (!business.trim()) next.business = "What’s the business called?";
    if (!about.trim()) next.about = "A sentence on what you sell is enough.";
    if (!startDay) next.timeline = "Pick the day you’d like to start.";
    setErrors(next);
    const first = (Object.keys(next) as (keyof Errors)[])[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    const order: Order = {
      ref: makeRef(),
      createdAt: new Date().toISOString(),
      packageId,
      name: name.trim(),
      email: email.trim(),
      business: business.trim(),
      about: about.trim(),
      timeline: startDay ? formatStart(startDay) : "",
      build: estimate.build,
      deposit: estimate.deposit,
      care: estimate.retainer?.monthly ?? null,
      retainerMonths: estimate.retainer?.months ?? null,
      extraIds: estimate.chosen.map((item) => item.id),
    };

    setSending(true);
    setSendError("");
    try {
      const result = await sendEnquiry({
        data: {
          kind: "order",
          ref: order.ref,
          name: order.name,
          email: order.email,
          business: order.business,
          about: order.about,
          packageName: estimate.pkg.name,
          timeline: order.timeline,
          build: order.build,
          deposit: order.deposit,
          extras: estimate.chosen.map((item) => item.name).join(", "),
        },
      });
      if (!result.ok) {
        setSendError(result.message || "That didn’t send. Email hello@createdbylewis.com.");
        return;
      }
    } catch {
      setSendError("That didn’t send. Email hello@createdbylewis.com.");
      return;
    } finally {
      setSending(false);
    }

    const saved = saveOrder(order);
    setPast(saved);
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (search.paid === "1" && !search.session_id) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <article className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs tracking-widest text-muted uppercase">Payment</p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">You’re back from checkout.</h1>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            If Stripe showed a receipt, the deposit is paid and I’ll be in touch with a start date. The rest is
            due when the site goes live. If you closed the page before paying, nothing was taken.
          </p>
        </article>
        <div className="mt-8">
          <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  if (search.session_id) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <article className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs tracking-widest text-muted uppercase">Payment</p>
          {payment?.status === "paid" ? (
            <>
              <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Deposit received.</h1>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">
                {formatGBP(payment.deposit)} is in for {payment.packageName}. I’ll be in touch
                {payment.email ? ` at ${payment.email}` : ""} with a start date. The rest is due when the site
                goes live.
              </p>
            </>
          ) : payment?.status === "open" ? (
            <>
              <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Payment not finished.</h1>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">{payment.message}</p>
            </>
          ) : (
            <>
              <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Checking the payment.</h1>
              <p className="mt-4 text-muted">One moment.</p>
            </>
          )}
        </article>
        <div className="mt-8">
          <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <Receipt order={placed} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="secondary" onClick={() => setPlaced(null)}>
            Place another order
          </Button>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-muted hover:text-ink"
          >
            Back home
          </Link>
        </div>
        <Earlier orders={past.filter((item) => item.ref !== placed.ref)} onOpen={setPlaced} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs tracking-widest text-muted uppercase">Order</p>
      <h1 className="mt-3 max-w-2xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
        Start a Project.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Choose a package and send me the brief. Prices are negotiable, so say if your budget is different.
        I’ll reply with a start date and an invoice for the deposit. No card details are taken here.
      </p>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <form id="project-order" className="space-y-12" onSubmit={onSubmit} noValidate>
          <fieldset>
            <legend className="font-display text-2xl text-ink">Package</legend>
            <div className="mt-4 space-y-3">
              {packages.map((pkg) => {
                const selected = pkg.id === packageId;
                return (
                  <label
                    key={pkg.id}
                    className={cn(
                      "flex cursor-pointer gap-4 rounded-xl border p-4 transition-colors duration-200",
                      selected ? "border-ink bg-card" : "border-line hover:border-ink/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="package"
                      className="mt-1 size-4 accent-signal"
                      checked={selected}
                      onChange={() => selectPackage(pkg.id)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-medium text-ink">{pkg.name}</span>
                        <span className="tabular-nums text-ink">{formatGBP(pkg.price)}</span>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{pkg.blurb}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-2xl text-ink">The Brief</legend>
            <Field id="name" label="Your name" error={errors.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass(Boolean(errors.name))}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass(Boolean(errors.email))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Field>
            <Field id="business" label="Business" error={errors.business}>
              <input
                id="business"
                name="business"
                autoComplete="organization"
                value={business}
                onChange={(event) => setBusiness(event.target.value)}
                className={inputClass(Boolean(errors.business))}
                aria-invalid={Boolean(errors.business)}
                aria-describedby={errors.business ? "business-error" : undefined}
              />
            </Field>
            <Field id="about" label="What do you sell?" error={errors.about}>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                className={cn(inputClass(Boolean(errors.about)), "min-h-28 py-3")}
                aria-invalid={Boolean(errors.about)}
                aria-describedby={errors.about ? "about-error" : undefined}
              />
            </Field>
            <ExtrasPicker packageId={packageId} selected={picked} onToggle={toggleExtra} />
            <div>
              <p className="text-sm font-medium text-ink">When do you want to start?</p>
              <p className="mt-1 text-sm text-muted">Pick a date. We can move it if the brief changes.</p>
              <div className="mt-3 rounded-xl border border-line bg-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-md text-ink hover:bg-paper disabled:text-muted"
                    aria-label="Previous month"
                    disabled={cursor.getFullYear() === earliest.getFullYear() && cursor.getMonth() === earliest.getMonth()}
                    onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                  >
                    ‹
                  </button>
                  <p className="font-medium text-ink">
                    {new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(cursor)}
                  </p>
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-md text-ink hover:bg-paper disabled:text-muted"
                    aria-label="Next month"
                    disabled={cursor.getFullYear() === latest.getFullYear() && cursor.getMonth() === latest.getMonth()}
                    onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                  >
                    ›
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-muted">
                  {WEEKDAYS.map((label) => (
                    <span key={label} className="py-1">
                      {label}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {monthCells(cursor.getFullYear(), cursor.getMonth()).map((date, index) => {
                    if (!date) return <span key={`empty-${index}`} />;
                    const closed = date < earliest || date > latest;
                    const selected = startDay ? sameDay(date, startDay) : false;
                    return (
                      <button
                        key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                        type="button"
                        disabled={closed}
                        aria-pressed={selected}
                        onClick={() => {
                          setStartDay(date);
                          setErrors((current) => ({ ...current, timeline: undefined }));
                        }}
                        className={cn(
                          "grid h-11 place-items-center rounded-md text-sm",
                          selected && "bg-ink text-paper",
                          !selected && !closed && "text-ink hover:bg-paper",
                          closed && "text-muted/40",
                        )}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
              {startDay ? <p className="mt-3 text-sm text-ink">{formatStart(startDay)}</p> : null}
              {errors.timeline ? <p className="mt-1.5 text-sm text-signal">{errors.timeline}</p> : null}
            </div>
          </fieldset>

          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="w-full sm:w-auto" disabled={sending}>
                {sending ? "Sending…" : "Place order"}
              </Button>
              <ButtonLink to="/book" variant="secondary" className="w-full sm:w-auto">
                Book a free chat
              </ButtonLink>
            </div>
            {sendError ? (
              <p className="mt-3 max-w-md text-sm text-signal" role="alert">
                {sendError}
              </p>
            ) : null}
            <p className="mt-3 max-w-md text-sm text-muted">
              Placing the order sends me the brief. You aren’t charged until you pay the deposit in the
              summary. If the budget needs to change, say so and we’ll sort it before anything is invoiced.
            </p>
          </div>
        </form>

        <aside className="rounded-xl border border-line bg-card p-5 lg:sticky lg:top-24">
          <h2 className="text-xs tracking-widest text-muted uppercase">This order</h2>
          <p className="mt-3 font-display text-3xl text-ink">{estimate.pkg.name}</p>
          <dl className="mt-5 space-y-2 text-sm">
            <Row label={estimate.pkg.name} value={formatGBP(estimate.pkg.price)} />
            {estimate.chosen
              .filter((item) => !item.monthly)
              .map((item) => (
                <Row key={item.id} label={item.name} value={formatGBP(item.price)} />
              ))}
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <dt className="text-ink">Build</dt>
              <dd className="font-medium text-ink tabular-nums">{formatGBP(estimate.build)}</dd>
            </div>
            <Row label="Deposit to start" value={formatGBP(estimate.deposit)} strong />
            <Row label="On launch" value={formatGBP(estimate.balance)} />
            {estimate.retainer ? (
              <Row
                label="Partner, after launch"
                value={`${formatGBP(estimate.retainer.monthly)}/mo × ${estimate.retainer.months}`}
              />
            ) : null}
          </dl>
          <p id={formId} className="mt-5 text-xs leading-relaxed text-muted">
            25% now, the rest when it goes live. Pay the deposit below, or send the brief and I’ll invoice you.
            {estimate.retainer ? " Partner is billed monthly after launch and isn’t part of the build." : ""}
          </p>
          <PayDeposit
            packageId={packageId}
            amount={estimate.deposit}
            email={email}
            extras={estimate.chosen.map((item) => item.id)}
            className="mt-5"
          />
        </aside>
      </div>

      <Earlier orders={past} onOpen={setPlaced} />
    </main>
  );
}

function Receipt({ order }: { order: Order }) {
  const pkg = packages.find((item) => item.id === order.packageId);
  const first = order.name.split(" ")[0];
  const months = order.retainerMonths;

  return (
    <article className="rounded-xl border border-line bg-card p-6 sm:p-8">
      <p className="text-xs tracking-widest text-muted uppercase">Order received</p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Thanks, {first}.</h1>
      <p className="mt-4 max-w-lg leading-relaxed text-muted">
        {order.business} is in the queue. A confirmation is on its way to {order.email}. Pay the{" "}
        {formatGBP(order.deposit)} deposit to get started, or wait and I’ll send an invoice to that address. We
        can still talk through the budget before any work begins.
      </p>
      <dl className="mt-8 space-y-2 border-t border-line pt-6 text-sm">
        <Row label="Reference" value={order.ref} strong />
        <Row label="Package" value={pkg?.name ?? order.packageId} />
        {(order.extraIds ?? []).flatMap((id) => {
          const item = extras.find((extra) => extra.id === id);
          if (!item || item.monthly) return [];
          return [<Row key={item.id} label={item.name} value={formatGBP(item.price)} />];
        })}
        <Row label="Build" value={formatGBP(order.build)} />
        <Row label="Deposit" value={formatGBP(order.deposit)} strong />
        {order.care ? (
          <Row
            label="Partner"
            value={months ? `${formatGBP(order.care)}/mo for ${months} months` : `${formatGBP(order.care)}/mo`}
          />
        ) : null}
        <Row label="Start" value={order.timeline} />
      </dl>
      <p className="mt-6 text-sm leading-relaxed text-ink">“{order.about}”</p>
      {pkg ? (
        <PayDeposit
          packageId={pkg.id}
          amount={order.deposit}
          email={order.email}
          extras={order.extraIds}
          className="mt-8"
        />
      ) : null}
    </article>
  );
}

function Earlier({ orders, onOpen }: { orders: Order[]; onOpen: (order: Order) => void }) {
  if (orders.length === 0) return null;
  return (
    <section className="mt-14 border-t border-line pt-8">
      <h2 className="text-xs tracking-widest text-muted uppercase">Orders on this device</h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {orders.map((order) => (
          <li key={order.ref}>
            <button
              type="button"
              onClick={() => {
                onOpen(order);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex min-h-14 w-full items-center justify-between gap-4 text-left"
            >
              <span>
                <span className="block text-sm font-medium text-ink">{order.business}</span>
                <span className="block text-xs text-muted">{order.ref}</span>
              </span>
              <span className="text-sm text-ink tabular-nums">{formatGBP(order.build)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={strong ? "text-ink" : "text-muted"}>{label}</dt>
      <dd className={cn("text-right tabular-nums", strong ? "font-medium text-ink" : "text-ink")}>{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-signal">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "w-full min-h-11 rounded-md border bg-card px-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-ink",
    invalid ? "border-signal" : "border-line",
  );
}
