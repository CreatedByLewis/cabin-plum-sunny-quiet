import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PayDeposit } from "@/components/pay-deposit";
import { ExtrasPicker } from "@/components/extras-picker";
import {
  jobsFor,
  meetings,
  recommend,
  why,
  type BrandChoice,
  type HasSite,
  type JobId,
  type Meeting,
} from "@/lib/estimate";
import { formatGBP, quote, timelines, type ExtraId } from "@/lib/content";
import { makeRef, saveOrder, type Order } from "@/lib/orders";
import { sendEnquiry } from "@/lib/enquire";
import { cn } from "@/lib/utils";

const TOTAL = 6;

export const Route = createFileRoute("/estimate")({
  head: () => seo({
    title: "Estimate | CreatedByLewis",
    description:
      "Answer a few questions and I’ll match a website package and a starting price.",
    path: "/estimate",
  }),
  component: EstimatePage,
});

type Errors = Partial<Record<"name" | "email" | "business" | "about", string>>;

function EstimatePage() {
  const [step, setStep] = useState(1);
  const [hasSite, setHasSite] = useState<HasSite | null>(null);
  const [job, setJob] = useState<JobId | null>(null);
  const [brand, setBrand] = useState<BrandChoice | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<Order | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [picked, setPicked] = useState<ExtraId[]>([]);

  const packageId = recommend({ hasSite, job, brand });
  const estimate = packageId ? quote(packageId, picked) : null;
  const progress = Math.round((step / TOTAL) * 100);

  function go(next: number) {
    setStep(next);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!estimate) return;
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Use an email I can reply to.";
    if (!business.trim()) next.business = "What’s the business called?";
    if (!about.trim()) next.about = "A sentence on what you sell is enough.";
    setErrors(next);
    const first = (Object.keys(next) as (keyof Errors)[])[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const order: Order = {
      ref: makeRef(),
      createdAt: new Date().toISOString(),
      packageId: estimate.pkg.id,
      name: name.trim(),
      email: email.trim(),
      business: business.trim(),
      about: about.trim(),
      timeline: timeline ?? "Just looking",
      meeting: meetings.find((item) => item.id === meeting)?.title,
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
          kind: "estimate",
          ref: order.ref,
          name: order.name,
          email: order.email,
          business: order.business,
          about: order.about,
          packageName: estimate.pkg.name,
          timeline: order.timeline,
          meeting: order.meeting,
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

    saveOrder(order);
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed && estimate) {
    const first = placed.name.split(" ")[0];
    return (
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <article className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs tracking-widest text-muted uppercase">Estimate received</p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Thanks, {first}.</h1>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            {placed.business} looks like a fit for {estimate.pkg.name}, from {formatGBP(placed.build)}. A
            confirmation is on its way to {placed.email}. Pay the deposit if you’re ready to start, or hold off
            and we can still talk about the price.
          </p>
          <dl className="mt-8 space-y-2 border-t border-line pt-6 text-sm">
            <Line label="Reference" value={placed.ref} strong />
            <Line label="Package" value={estimate.pkg.name} />
            <Line label="Build" value={formatGBP(placed.build)} />
            <Line label="Deposit to start" value={formatGBP(placed.deposit)} strong />
            {placed.care ? (
              <Line
                label="Partner"
                value={`${formatGBP(placed.care)}/mo for ${placed.retainerMonths ?? 6} months`}
              />
            ) : null}
            <Line label="Start" value={placed.timeline} />
            {placed.meeting ? <Line label="Talk" value={placed.meeting} /> : null}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-ink">“{placed.about}”</p>
          <PayDeposit
            packageId={estimate.pkg.id}
            amount={placed.deposit}
            email={placed.email}
            extras={placed.extraIds}
            className="mt-8"
          />
        </article>
        <div className="mt-8">
          <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs tracking-widest text-muted uppercase">Estimate</p>
      <h1 className="mt-3 max-w-2xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
        What would it cost?
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Six short questions, and I’ll match a package as you go. The price is a starting point, so tell me if
        your budget is different.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <ol className="flex gap-2" aria-label="Progress">
          {Array.from({ length: TOTAL }, (_, index) => {
            const number = index + 1;
            const current = number === step;
            const done = number < step;
            return (
              <li key={number}>
                <button
                  type="button"
                  disabled={number > step}
                  aria-current={current ? "step" : undefined}
                  onClick={() => go(number)}
                  className={cn(
                    "grid size-11 place-items-center rounded-full text-sm transition-colors duration-200",
                    current && "bg-signal text-on-signal",
                    done && "border border-line bg-card text-ink hover:border-ink",
                    number > step && "border border-line text-muted disabled:opacity-100",
                  )}
                >
                  <span className="sr-only">{current ? `Step ${number}, current` : `Step ${number}`}</span>
                  <span aria-hidden>{number}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div className="h-full bg-signal transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {estimate ? (
        <div className="mt-6 rounded-xl border border-line bg-card px-4 py-3 lg:hidden" aria-live="polite">
          <p className="text-xs tracking-widest text-muted uppercase">Matched</p>
          <p className="mt-1 flex items-baseline justify-between gap-4">
            <span className="font-display text-2xl text-ink">{estimate.pkg.name}</span>
            <span className="font-display text-2xl text-ink tabular-nums">{formatGBP(estimate.build)}</span>
          </p>
        </div>
      ) : null}

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div key={step} className="step-in">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="mb-6 inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
            >
              Back
            </button>
          ) : null}

          {step === 1 ? (
            <Question
              kicker="1 of 6"
              title="Do you already have a website?"
              hint="Either way, we start from what you sell."
            >
              <Choices>
                <Choice
                  title="Yes"
                  detail="You have a site already, but it might need starting again."
                  selected={hasSite === "yes"}
                  onPick={() => {
                    setHasSite("yes");
                    go(2);
                  }}
                />
                <Choice
                  title="Not yet"
                  detail="This would be the first one."
                  selected={hasSite === "no"}
                  onPick={() => {
                    setHasSite("no");
                    setJob(null);
                    go(2);
                  }}
                />
              </Choices>
            </Question>
          ) : null}

          {step === 2 ? (
            <Question kicker="2 of 6" title="What should the site do?" hint="Pick the closest one. We can change it later.">
              <Choices>
                {jobsFor(hasSite).map((item) => (
                  <Choice
                    key={item.id}
                    title={item.title}
                    detail={item.detail}
                    selected={job === item.id}
                    onPick={() => {
                      setJob(item.id);
                      go(3);
                    }}
                  />
                ))}
              </Choices>
            </Question>
          ) : null}

          {step === 3 ? (
            <Question
              kicker="3 of 6"
              title="Want Partner after launch?"
              hint="£150 a month for six months, on top of whichever build you pick. Menu changes, fixes and one improvement a month. It looks after the site rather than adding to it."
            >
              <Choices>
                <Choice
                  title="The site is enough"
                  detail="Stick with the package that matches what you picked."
                  selected={brand === "site"}
                  onPick={() => {
                    setBrand("site");
                    setPicked((current) => current.filter((id) => id !== "care"));
                    go(4);
                  }}
                />
                <Choice
                  title="Add Partner after launch"
                  detail="£150 a month for six months. Menu changes, fixes and one improvement a month. The build price stays the same."
                  selected={brand === "works"}
                  onPick={() => {
                    setBrand("works");
                    setPicked((current) => (current.includes("care") ? current : [...current, "care"]));
                    go(4);
                  }}
                />
              </Choices>
            </Question>
          ) : null}

          {step === 4 ? (
            <Question kicker="4 of 6" title="When do you want to start?" hint="A rough window is enough.">
              <Choices>
                {timelines.map((item) => (
                  <Choice
                    key={item}
                    title={item}
                    selected={timeline === item}
                    onPick={() => {
                      setTimeline(item);
                      go(5);
                    }}
                  />
                ))}
              </Choices>
            </Question>
          ) : null}

          {step === 5 ? (
            <Question
              kicker="5 of 6"
              title="How should we talk?"
              hint="In person or on a video call. While it’s being built, I’m on call."
            >
              <Choices>
                {meetings.map((item) => (
                  <Choice
                    key={item.id}
                    title={item.title}
                    detail={item.detail}
                    selected={meeting === item.id}
                    onPick={() => {
                      setMeeting(item.id);
                      go(6);
                    }}
                  />
                ))}
              </Choices>
            </Question>
          ) : null}

          {step === 6 ? (
            <Question
              kicker="6 of 6"
              title="Where do I send this?"
              hint="I’ll reply with a start date. Nothing is charged on this page."
            >
              <form id="estimate-details" className="space-y-5" onSubmit={onSubmit} noValidate>
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
                {packageId ? (
                  <ExtrasPicker
                    packageId={packageId}
                    selected={picked}
                    onToggle={(id) => {
                      setPicked((current) =>
                        current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
                      );
                      if (id === "care") setBrand(picked.includes("care") ? "site" : "works");
                    }}
                  />
                ) : null}
                <Button type="submit" disabled={!estimate || sending} className="w-full sm:w-auto">
                  {sending
                    ? "Sending…"
                    : estimate
                      ? `Send estimate · ${formatGBP(estimate.deposit)} deposit`
                      : "Pick a package first"}
                </Button>
                {sendError ? (
                  <p className="max-w-md text-sm text-signal" role="alert">
                    {sendError}
                  </p>
                ) : null}
                <p className="max-w-md text-sm text-muted">
                  Sending this just asks me to take a look. The price can still change, and you aren’t charged
                  until you pay an invoice.
                </p>
              </form>
            </Question>
          ) : null}
        </div>

        <aside className="hidden rounded-xl border border-line bg-card p-5 lg:sticky lg:top-24 lg:block" aria-live="polite">
          <h2 className="text-xs tracking-widest text-muted uppercase">Matched package</h2>
          {estimate ? (
            <>
              <p className="mt-3 font-display text-3xl text-ink">{estimate.pkg.name}</p>
              <p className="mt-3 font-display text-4xl tabular-nums text-ink">{formatGBP(estimate.build)}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{why(estimate.pkg.id)}</p>
              {estimate.retainer ? (
                <p className="mt-3 text-sm text-ink">
                  then {formatGBP(estimate.retainer.monthly)} a month for {estimate.retainer.months} months
                </p>
              ) : null}
              <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
                25% to start, {formatGBP(estimate.deposit)}. The rest when it goes live.
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Keep going. Your package appears once I know what the site needs to do.
            </p>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Prices are negotiable.{" "}
            <Link to="/packages" className="text-ink underline decoration-line underline-offset-4">
              See every package
            </Link>
            .
          </p>
        </aside>
      </div>
    </main>
  );
}

function Question({
  kicker,
  title,
  hint,
  children,
}: {
  kicker: string;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <section>
      <p className="text-xs tracking-widest text-muted uppercase">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">{title}</h2>
      <p className="mt-3 max-w-lg text-muted">{hint}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Choices({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

function Choice({
  title,
  detail,
  selected,
  onPick,
}: {
  title: string;
  detail?: string;
  selected: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-xl border p-5 text-left transition-colors duration-200",
        selected ? "border-signal bg-card" : "border-line bg-paper hover:border-ink/50",
      )}
    >
      <span className="block text-base font-medium text-ink">{title}</span>
      {detail ? <span className="mt-1 block text-sm leading-relaxed text-muted">{detail}</span> : null}
    </button>
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

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={strong ? "text-ink" : "text-muted"}>{label}</dt>
      <dd className={cn("text-right tabular-nums", strong ? "font-medium text-ink" : "text-ink")}>{value}</dd>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "w-full min-h-11 rounded-md border bg-card px-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-ink",
    invalid ? "border-signal" : "border-line",
  );
}
