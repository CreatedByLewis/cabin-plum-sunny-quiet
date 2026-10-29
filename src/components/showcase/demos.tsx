import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Small "try it" widgets for the showcase. Each one acts out a rule from the
 * real site, using only facts already in `@/lib/content`. Nothing here talks
 * to the client's site.
 */

export function Demo({ slug, accent, onPhoneScreen, phoneScreen }: {
  slug: string;
  accent: string;
  phoneScreen: number;
  onPhoneScreen: (index: number) => void;
}) {
  if (slug === "jkitchen-cooks") return <JKitchenDemo accent={accent} />;
  if (slug === "the-farmers-box") return <FarmersDemo accent={accent} />;
  if (slug === "real-food-delivered") return <RealFoodDemo accent={accent} />;
  if (slug === "trackr") return <TrackrDemo accent={accent} active={phoneScreen} onPick={onPhoneScreen} />;
  return null;
}

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  accent,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  accent: string;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-9 rounded-full border px-3.5 text-xs font-medium transition-all duration-200",
              on ? "text-paper" : "border-line text-muted hover:border-ink/40 hover:text-ink",
            )}
            style={on ? { background: accent, borderColor: accent, color: "#111114" } : undefined}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Readout({ children }: { children: React.ReactNode }) {
  return (
    <p className="step-in mt-3 rounded-lg border border-line bg-paper/60 px-3.5 py-2.5 text-sm leading-snug text-ink" aria-live="polite">
      {children}
    </p>
  );
}

/* JKitchen: the Friday 5pm cutoff, and the box sizes. */

function londonParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return { day: days.indexOf(get("weekday")), h: +get("hour"), m: +get("minute"), s: +get("second") };
}

function secondsToFridayFive(date: Date) {
  const { day, h, m, s } = londonParts(date);
  const now = day * 86400 + h * 3600 + m * 60 + s;
  const target = 5 * 86400 + 17 * 3600;
  let diff = target - now;
  if (diff <= 0) diff += 7 * 86400;
  return diff;
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(secondsToFridayFive(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return left;
}

function JKitchenDemo({ accent }: { accent: string }) {
  const left = useCountdown();
  const [meals, setMeals] = useState(10);
  const [subscribe, setSubscribe] = useState(true);
  const units =
    left === null
      ? null
      : [
          { v: Math.floor(left / 86400), l: "days" },
          { v: Math.floor((left % 86400) / 3600), l: "hrs" },
          { v: Math.floor((left % 3600) / 60), l: "min" },
          { v: left % 60, l: "sec" },
        ];

  return (
    <div>
      <p className="text-xs text-muted">Orders close at 5pm on Friday. Here’s the countdown, as it shows on the site:</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5" aria-label="Time until Friday 5pm">
        {(units ?? [{ v: 0, l: "days" }, { v: 0, l: "hrs" }, { v: 0, l: "min" }, { v: 0, l: "sec" }]).map((unit) => (
          <div key={unit.l} className="rounded-lg border border-line bg-paper/60 py-2 text-center">
            <p className="font-display text-2xl leading-none text-ink tabular-nums">
              {units ? String(unit.v).padStart(2, "0") : "––"}
            </p>
            <p className="mt-1 text-[10px] tracking-widest text-muted uppercase">{unit.l}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">Build a box</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Segmented
          label="Meals in the box"
          accent={accent}
          value={meals}
          onChange={setMeals}
          options={[6, 8, 10, 12, 15].map((n) => ({ value: n, label: `${n}` }))}
        />
        <label className="inline-flex min-h-9 cursor-pointer items-center gap-2 text-xs text-ink">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(event) => setSubscribe(event.target.checked)}
            className="size-4 rounded"
            style={{ accentColor: accent }}
          />
          Subscribe
        </label>
      </div>
      <Readout>
        {meals} meals, delivered Sunday.{" "}
        {subscribe ? <strong className="font-medium" style={{ color: accent }}>First box 15% off.</strong> : "One-off box."}
      </Readout>
    </div>
  );
}

/* The Farmers Box: delivery day by area, and once or every week. */

const areas = [
  { id: "southport", label: "Southport", day: "Wednesday", cutoff: "midday Tuesday" },
  { id: "formby", label: "Formby", day: "Wednesday", cutoff: "midday Tuesday" },
  { id: "crosby", label: "Crosby", day: "Wednesday", cutoff: "midday Tuesday" },
  { id: "elsewhere", label: "Elsewhere", day: "Wednesday to Friday, by area", cutoff: "midday the day before" },
] as const;

function FarmersDemo({ accent }: { accent: string }) {
  const [area, setArea] = useState<(typeof areas)[number]["id"]>("southport");
  const [repeat, setRepeat] = useState<"once" | "weekly">("weekly");
  const picked = areas.find((a) => a.id === area) ?? areas[0];
  return (
    <div>
      <p className="text-xs text-muted">Where are you? The site shows your delivery day before you order.</p>
      <div className="mt-2">
        <Segmented label="Area" accent={accent} value={area} onChange={setArea} options={areas.map((a) => ({ value: a.id, label: a.label }))} />
      </div>
      <p className="mt-4 text-xs text-muted">How often?</p>
      <div className="mt-2">
        <Segmented
          label="How often"
          accent={accent}
          value={repeat}
          onChange={setRepeat}
          options={[
            { value: "once", label: "Just this week" },
            { value: "weekly", label: "Every week" },
          ]}
        />
      </div>
      <Readout>
        <span key={area + repeat}>
          Delivered <strong className="font-medium" style={{ color: accent }}>{picked.day}</strong>.{" "}
          Order by {picked.cutoff}.{" "}
          {repeat === "weekly" ? "The same box, every week." : "A one-off box."}
        </span>
      </Readout>
    </div>
  );
}

/* Real Food Delivered: two doors, and the calorie range. */

function RealFoodDemo({ accent }: { accent: string }) {
  const [door, setDoor] = useState<"box" | "plan">("plan");
  const [kcal, setKcal] = useState(2000);
  const [where, setWhere] = useState<"local" | "national">("local");
  const pct = ((kcal - 1200) / (3100 - 1200)) * 100;
  return (
    <div>
      <p className="text-xs text-muted">Two ways to order from the same kitchen.</p>
      <div className="mt-2">
        <Segmented
          label="How to order"
          accent={accent}
          value={door}
          onChange={setDoor}
          options={[
            { value: "box", label: "Build Your Box" },
            { value: "plan", label: "Set Calorie Plan" },
          ]}
        />
      </div>
      {door === "plan" ? (
        <div className="step-in mt-4">
          <div className="flex items-baseline justify-between">
            <label htmlFor="rfd-kcal" className="text-xs text-muted">
              Daily target
            </label>
            <p className="font-display text-xl text-ink tabular-nums">{kcal.toLocaleString("en-GB")} kcal</p>
          </div>
          <input
            id="rfd-kcal"
            type="range"
            min={1200}
            max={3100}
            step={100}
            value={kcal}
            onChange={(event) => setKcal(+event.target.value)}
            className="showcase-range mt-2 w-full"
            style={{ ["--fill" as string]: `${pct}%`, ["--accent" as string]: accent }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted">
            <span>1,200</span>
            <span>3,100</span>
          </div>
        </div>
      ) : (
        <p className="step-in mt-4 text-sm leading-snug text-muted">
          Pick every meal yourself from this week’s dishes. Choosing one starts the box.
        </p>
      )}
      <div className="mt-4">
        <Segmented
          label="Delivery"
          accent={accent}
          value={where}
          onChange={setWhere}
          options={[
            { value: "local", label: "Local" },
            { value: "national", label: "Nationwide" },
          ]}
        />
      </div>
      <Readout>
        {door === "plan" ? `A ${kcal.toLocaleString("en-GB")} kcal plan` : "Your own box"},{" "}
        <strong className="font-medium" style={{ color: accent }}>
          {where === "local" ? "delivered Sunday and Wednesday" : "one courier box on Tuesday"}
        </strong>
        .
      </Readout>
    </div>
  );
}

/* Trackr: the phone screens, driven from here. */

const trackrScreens = ["Diary", "Today", "Add a meal", "Order", "Week"];

function TrackrDemo({ accent, active, onPick }: { accent: string; active: number; onPick: (i: number) => void }) {
  const eaten = [0, 1640, 1640, 1640, 2050][active] ?? 0;
  const goal = active === 0 ? 2230 : 2200;
  const pct = Math.min(eaten / goal, 1);
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div>
      <p className="text-xs text-muted">Tap through the app and the phone follows.</p>
      <div className="mt-2">
        <Segmented
          label="Trackr screen"
          accent={accent}
          value={active}
          onChange={onPick}
          options={trackrScreens.map((label, i) => ({ value: i, label }))}
        />
      </div>
      <div className="mt-4 flex items-center gap-4 rounded-lg border border-line bg-paper/60 p-3">
        <svg viewBox="0 0 64 64" className="size-16 shrink-0 -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ transition: "stroke-dashoffset 700ms cubic-bezier(.2,.8,.2,1)" }}
          />
        </svg>
        <div aria-live="polite">
          <p className="text-xs text-muted">{active === 4 ? "Daily average this week" : active === 0 ? "Remaining today" : "Eaten today"}</p>
          <p className="font-display text-2xl leading-tight text-ink tabular-nums">
            {(active === 0 ? 2230 : eaten).toLocaleString("en-GB")} <span className="text-sm text-muted">kcal</span>
          </p>
        </div>
      </div>
    </div>
  );
}
