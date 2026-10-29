import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, Moon, MousePointerClick, Pause, Play, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { projects, type Project } from "@/lib/content";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";
import { showcase, type ShowcaseEntry } from "./data";
import { Demo } from "./demos";

const AUTOPLAY_MS = 9000;

/**
 * Home-page work showcase. A live-feeling desktop and phone stage for each
 * project, with numbered hotspots tied to the features list, a small
 * "try it" demo, and the facts underneath. Autoplays until someone touches it.
 */
export function Showcase() {
  const [index, setIndex] = useState(0);
  const [feature, setFeature] = useState<number | null>(null);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);
  const [light, setLight] = useState(false);
  const [phoneScreen, setPhoneScreen] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const project = projects[index];
  const entry = showcase[project.slug];
  const focus = hoverFeature ?? feature;

  const select = useCallback((next: number, fromUser = true) => {
    const count = projects.length;
    setIndex(((next % count) + count) % count);
    setFeature(null);
    setHoverFeature(null);
    setLight(false);
    setPhoneScreen(0);
    if (fromUser) setPlaying(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && visible;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => select(index + 1, false), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [running, index, select]);

  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") select(index + 1);
    if (event.key === "ArrowLeft") select(index - 1);
  }

  function pickFeature(i: number) {
    setPlaying(false);
    setFeature((current) => (current === i ? null : i));
  }

  const quote = testimonials.find((t) => t.project === project.slug);

  return (
    <div ref={root} style={{ ["--accent" as string]: entry.accent } as CSSProperties}>
      {/* Project tabs */}
      <div className="flex items-center gap-3">
        <div
          role="tablist"
          aria-label="Projects"
          onKeyDown={onTabKey}
          className="-mx-5 flex flex-1 gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => {
            const on = i === index;
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                id={`work-tab-${p.slug}`}
                aria-selected={on}
                aria-controls="work-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "group relative min-h-12 shrink-0 overflow-hidden rounded-full border px-4 text-left transition-all duration-300 sm:px-5",
                  on ? "border-[var(--accent)]/60 bg-card text-ink" : "border-line text-muted hover:border-ink/30 hover:text-ink",
                )}
              >
                <span className="relative z-10 flex items-center gap-2.5 text-sm">
                  <span className={cn("font-display text-xs tabular-nums", on ? "text-[var(--accent)]" : "text-muted")}>{p.index}</span>
                  <span className="font-medium whitespace-nowrap">{p.name}</span>
                  {p.status === "in-progress" ? (
                    <span className="rounded-full border border-line px-1.5 py-px text-[10px] tracking-wide text-muted uppercase">Soon</span>
                  ) : null}
                </span>
                {on ? (
                  <span
                    key={`${index}-${running}`}
                    aria-hidden
                    className={cn("absolute bottom-0 left-0 h-0.5 bg-[var(--accent)]", running ? "showcase-progress" : "w-full opacity-40")}
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <IconButton label={playing ? "Pause the tour" : "Play the tour"} onClick={() => setPlaying((v) => !v)}>
            {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          </IconButton>
          <IconButton label="Previous project" onClick={() => select(index - 1)}>
            <ChevronLeft className="size-5" aria-hidden />
          </IconButton>
          <IconButton label="Next project" onClick={() => select(index + 1)}>
            <ChevronRight className="size-5" aria-hidden />
          </IconButton>
        </div>
      </div>

      <div
        id="work-panel"
        role="tabpanel"
        aria-labelledby={`work-tab-${project.slug}`}
        className="mt-6 grid items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12"
        onPointerDown={() => setPlaying(false)}
      >
        <Stage
          key={project.slug}
          project={project}
          entry={entry}
          focus={focus}
          light={light}
          onLight={setLight}
          phoneScreen={phoneScreen}
          onPhoneScreen={setPhoneScreen}
          onHotspot={pickFeature}
          onHoverHotspot={setHoverFeature}
        />

        <div key={`panel-${project.slug}`} className="showcase-rise min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill project={project} />
            <span className="text-xs text-muted">{project.role} · {project.year}</span>
          </div>
          <h3 className="mt-4 font-display text-4xl leading-[1.05] text-ink">{project.name}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-muted">{project.lede}</p>

          <p className="mt-7 flex items-center gap-2 text-xs tracking-widest text-muted uppercase">
            <MousePointerClick className="size-3.5" aria-hidden /> What’s built in
          </p>
          <ol className="mt-3 divide-y divide-line border-y border-line">
            {project.built.map((item, i) => {
              const on = focus === i;
              const where = entry.hotspots.some((h) => h.feature === i) ? "desktop" : entry.phoneFeature === i ? "phone" : null;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => pickFeature(i)}
                    onMouseEnter={() => setHoverFeature(i)}
                    onMouseLeave={() => setHoverFeature(null)}
                    onFocus={() => setHoverFeature(i)}
                    onBlur={() => setHoverFeature(null)}
                    aria-expanded={feature === i}
                    className="group flex w-full items-start gap-3 py-3 text-left"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-medium tabular-nums transition-all duration-200",
                        on ? "border-[var(--accent)] bg-[var(--accent)] text-[#111114]" : "border-line text-muted group-hover:border-ink/40",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className={cn("text-sm font-medium transition-colors", on ? "text-ink" : "text-ink/85")}>{item.title}</span>
                        {where ? (
                          <span className="shrink-0 text-[10px] tracking-wider text-muted uppercase opacity-0 transition-opacity group-hover:opacity-100">
                            {where === "phone" ? "On the phone" : "On the page"}
                          </span>
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          feature === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-1.5 text-sm leading-relaxed text-muted">{item.detail}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 rounded-2xl border border-line bg-card/70 p-4 sm:p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-medium tracking-widest text-ink uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--accent)]" />
              </span>
              Try it
            </p>
            <Demo slug={project.slug} accent={entry.accent} phoneScreen={phoneScreen} onPhoneScreen={setPhoneScreen} />
          </div>

          {quote ? (
            <figure className="mt-6 border-l-2 border-[var(--accent)] pl-4">
              <blockquote className="font-display text-lg leading-snug text-ink">“{quote.quote}”</blockquote>
              <figcaption className="mt-2 text-xs text-muted">{quote.attribution}</figcaption>
            </figure>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/work/$slug"
              params={{ slug: project.slug }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-[background-color,scale] duration-200 hover:bg-ink/90 active:scale-[0.96]"
            >
              {project.status === "in-progress" ? "Read about Trackr" : "View the case study"}
            </Link>
            {project.status === "in-progress" ? null : (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-5 text-sm text-ink transition-colors hover:border-ink"
              >
                Visit {project.urlLabel}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Facts strip */}
      <div key={`facts-${project.slug}`} className="showcase-rise mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-5">
        {project.specs.map((spec) => (
          <div key={spec.label} className="bg-paper px-5 py-4">
            <p className="text-[10px] tracking-widest text-muted uppercase">{spec.label}</p>
            <p className="mt-1.5 text-sm font-medium text-ink">{spec.value}</p>
          </div>
        ))}
        <div className="col-span-2 bg-paper px-5 py-4 lg:col-span-1">
          <p className="text-[10px] tracking-widest text-muted uppercase">Palette</p>
          <ul className="mt-2 flex gap-1.5" aria-label={`${project.name} colours`}>
            {entry.colours.map((colour) => (
              <li key={colour} title={colour} className="size-6 rounded-md border border-line shadow-sm" style={{ background: colour }} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        <IconButton label="Previous project" onClick={() => select(index - 1)}>
          <ChevronLeft className="size-5" aria-hidden />
        </IconButton>
        <IconButton label="Next project" onClick={() => select(index + 1)}>
          <ChevronRight className="size-5" aria-hidden />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink active:scale-95"
    >
      {children}
    </button>
  );
}

function StatusPill({ project }: { project: Project }) {
  const live = project.status !== "in-progress";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-ink">
      <span className="relative flex size-2">
        {live ? <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" /> : null}
        <span className={cn("relative inline-flex size-2 rounded-full", live ? "bg-emerald-400" : "bg-amber-400")} />
      </span>
      {live ? "Live, taking orders" : "In the works"}
    </span>
  );
}

/* ---------------- Stage ---------------- */

function Stage({
  project,
  entry,
  focus,
  light,
  onLight,
  phoneScreen,
  onPhoneScreen,
  onHotspot,
  onHoverHotspot,
}: {
  project: Project;
  entry: ShowcaseEntry;
  focus: number | null;
  light: boolean;
  onLight: (v: boolean) => void;
  phoneScreen: number;
  onPhoneScreen: (i: number) => void;
  onHotspot: (i: number) => void;
  onHoverHotspot: (i: number | null) => void;
}) {
  const tilt = useRef<HTMLDivElement>(null);
  const focused = entry.hotspots.find((h) => h.feature === focus) ?? null;
  const phoneFocused = focus !== null && entry.phoneFeature === focus;
  const lit = light && entry.lightImage;

  useEffect(() => {
    const el = tilt.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="showcase-rise relative pb-16 sm:pb-14 lg:sticky lg:top-24 lg:pr-8 [perspective:1800px]">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] sm:-inset-6 opacity-50 blur-3xl transition-colors duration-700"
        style={{ background: "radial-gradient(60% 55% at 45% 45%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%)" }}
      />
      <div
        ref={tilt}
        className="showcase-tilt group/tilt relative"
        style={{ ["--rx" as string]: "0deg", ["--ry" as string]: "0deg", ["--gx" as string]: "50%", ["--gy" as string]: "30%" } as CSSProperties}
      >
        {/* Browser */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0f] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#16161b] px-3 py-2.5 sm:px-4">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="size-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="mx-auto flex min-w-0 max-w-[60%] flex-1 items-center justify-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">
              <Lock className="size-3 shrink-0" aria-hidden />
              <span className="truncate">{project.status === "in-progress" ? "trackr · preview" : project.urlLabel}</span>
            </div>
            {entry.lightImage ? (
              <button
                type="button"
                onClick={() => onLight(!light)}
                className="inline-flex h-6 items-center gap-1 rounded-md bg-white/[0.06] px-2 text-[10px] text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white"
                aria-label={light ? "Show the dark theme" : "Show the light theme"}
                aria-pressed={!!lit}
              >
                {lit ? <Moon className="size-3" aria-hidden /> : <Sun className="size-3" aria-hidden />}
                <span className="hidden sm:inline">{lit ? "Dark" : "Light"}</span>
              </button>
            ) : (
              <span className="w-10" aria-hidden />
            )}
          </div>

          <div className="relative aspect-[16/10] overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                transform: focused ? "scale(1.12)" : "scale(1)",
                transformOrigin: focused ? `${focused.x}% ${focused.y}%` : "50% 30%",
              }}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="showcase-kenburns absolute inset-0 h-full w-full object-cover object-top"
                decoding="async"
              />
              {entry.lightImage ? (
                <img
                  src={entry.lightImage}
                  alt=""
                  aria-hidden
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover object-top transition-[clip-path] duration-700 ease-[cubic-bezier(.65,0,.35,1)]",
                  )}
                  style={{
                    clipPath: lit
                      ? `circle(150% at ${entry.themeToggle?.x ?? 90}% ${entry.themeToggle?.y ?? 4}%)`
                      : `circle(0% at ${entry.themeToggle?.x ?? 90}% ${entry.themeToggle?.y ?? 4}%)`,
                  }}
                />
              ) : null}

              {/* Spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: focused ? 1 : 0,
                  background: focused
                    ? `radial-gradient(circle at ${focused.x}% ${focused.y}%, transparent 0 7%, rgba(8,8,10,0.62) 20%)`
                    : undefined,
                }}
              />

              {/* Site's own theme toggle */}
              {entry.themeToggle ? (
                <button
                  type="button"
                  onClick={() => onLight(!light)}
                  aria-label="Try the site’s light and dark switch"
                  className="absolute z-20 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white/70 ring-offset-2 ring-offset-transparent transition hover:ring-white"
                  style={{ left: `${entry.themeToggle.x}%`, top: `${entry.themeToggle.y}%` }}
                >
                  <span className="absolute inset-0 animate-ping rounded-full ring-2 ring-white/40" />
                </button>
              ) : null}

              {/* Hotspots */}
              {entry.hotspots.map((spot) => {
                const on = focus === spot.feature;
                const title = project.built[spot.feature]?.title;
                const flip = spot.x > 70;
                const below = spot.y < 18;
                return (
                  <div key={spot.feature} className="absolute z-10" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
                    <div className="transition-[scale] duration-700" style={{ scale: focused ? `${1 / 1.12}` : "1" }}>
                      <button
                        type="button"
                        onClick={() => onHotspot(spot.feature)}
                        onMouseEnter={() => onHoverHotspot(spot.feature)}
                        onMouseLeave={() => onHoverHotspot(null)}
                        aria-label={`Feature ${spot.feature + 1}: ${title}`}
                        className={cn(
                          "relative grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-semibold tabular-nums shadow-[0_4px_14px_rgba(0,0,0,0.45)] transition-all duration-300 sm:size-7",
                          on ? "scale-110 bg-[var(--accent)] text-[#111114]" : "bg-white/95 text-[#111114] hover:scale-110",
                        )}
                      >
                        {!on ? <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/50" /> : null}
                        {spot.feature + 1}
                      </button>
                      <div
                        className={cn(
                          "pointer-events-none absolute z-20 w-max max-w-[13rem] rounded-lg border border-white/10 bg-[#111114]/95 px-3 py-2 text-left text-xs leading-snug text-white shadow-xl backdrop-blur transition-all duration-300",
                          on ? "opacity-100" : "translate-y-1 opacity-0",
                          flip ? "right-5" : "left-5",
                          below ? "top-3" : "-top-3 -translate-y-full",
                        )}
                      >
                        <span className="block font-medium">{title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Glare */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover/tilt:opacity-100"
              style={{ background: "radial-gradient(40% 50% at var(--gx) var(--gy), rgba(255,255,255,0.35), transparent 70%)" }}
            />
          </div>
        </div>

        {/* Phone */}
        <Phone
          entry={entry}
          name={project.name}
          active={phoneScreen}
          onActive={onPhoneScreen}
          highlighted={phoneFocused}
        />
      </div>

      <p className="mt-3 hidden items-center gap-2 text-xs text-muted sm:flex">
        <span className="grid size-4 place-items-center rounded-full bg-white/90 text-[9px] font-semibold text-[#111114]">1</span>
        Tap a number to see what it does.
        {entry.lightImage ? " Flip the theme with the switch in the corner." : ""}
      </p>
    </div>
  );
}

function Phone({
  entry,
  name,
  active,
  onActive,
  highlighted,
}: {
  entry: ShowcaseEntry;
  name: string;
  active: number;
  onActive: (i: number) => void;
  highlighted: boolean;
}) {
  const screens = entry.phone;
  const multi = screens.length > 1;
  const scroller = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Gently scroll a tall screenshot once, so people see it moves.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !entry.phoneScrolls) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = window.setTimeout(() => el.scrollTo({ top: 140, behavior: "smooth" }), 1400);
    const t2 = window.setTimeout(() => el.scrollTo({ top: 0, behavior: "smooth" }), 2600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [entry.phoneScrolls]);

  useEffect(() => {
    if (!multi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => onActive((active + 1) % screens.length), 2600);
    return () => window.clearTimeout(id);
  }, [multi, active, onActive, screens.length]);

  return (
    <div
      className={cn(
        "showcase-phone absolute -right-1 -bottom-14 w-[25%] max-w-[12.5rem] min-w-[6rem] transition-transform duration-500 sm:-bottom-14 sm:w-[27%] lg:-right-8",
        highlighted && "scale-[1.06]",
      )}
    >
      <div
        className={cn(
          "rounded-[2rem] bg-gradient-to-b from-[#3a3a42] to-[#1a1a1f] p-[5px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-shadow duration-500 sm:rounded-[2.4rem] sm:p-[6px]",
          highlighted && "shadow-[0_0_0_3px_var(--accent),0_30px_60px_-20px_rgba(0,0,0,0.8)]",
        )}
      >
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#0b0b0e] sm:rounded-[2rem]">
          <span aria-hidden className="absolute top-1.5 left-1/2 z-20 h-3.5 w-[34%] -translate-x-1/2 rounded-full bg-black sm:top-2 sm:h-4" />
          <div
            ref={scroller}
            onScroll={() => setScrolled(true)}
            tabIndex={entry.phoneScrolls ? 0 : -1}
            aria-label={entry.phoneScrolls ? `${name} on a phone. Scroll to see more.` : undefined}
            className={cn(
              "relative aspect-[9/19.5] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              entry.phoneScrolls ? "overflow-y-auto overscroll-contain" : "overflow-hidden",
            )}
          >
            {multi ? (
              screens.map((screen, i) => (
                <img
                  key={screen.src}
                  src={screen.src}
                  alt={i === active ? screen.alt : ""}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 h-full w-full transition-[opacity,transform] duration-500",
                    screen.fit === "contain" ? "object-contain object-center" : "object-cover object-top",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                />
              ))
            ) : (
              <img
                src={screens[0].src}
                alt={screens[0].alt}
                className={cn("w-full", entry.phoneScrolls ? "h-auto" : "h-full object-cover object-top")}
              />
            )}
          </div>
          {entry.phoneScrolls && !scrolled ? (
            <span className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] whitespace-nowrap text-white backdrop-blur">
              Scroll me
            </span>
          ) : null}
        </div>
      </div>
      {multi ? (
        <div className="mt-3 flex justify-center gap-1.5" aria-label="Phone screens">
          {screens.map((screen, i) => (
            <button
              key={screen.src}
              type="button"
              onClick={() => onActive(i)}
              aria-label={`Show ${screen.label}`}
              aria-current={i === active}
              className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-line hover:bg-muted")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Case-study version: one project, the stage on the left, the full feature
 * list on the right, linked the same way as on the home page.
 */
export function ProjectExplorer({ project }: { project: Project }) {
  const entry = showcase[project.slug];
  const [feature, setFeature] = useState<number | null>(null);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);
  const [light, setLight] = useState(false);
  const [phoneScreen, setPhoneScreen] = useState(0);
  if (!entry) return null;
  const focus = hoverFeature ?? feature;
  const pick = (i: number) => setFeature((current) => (current === i ? null : i));

  return (
    <div
      className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12"
      style={{ ["--accent" as string]: entry.accent } as CSSProperties}
    >
      <Stage
        project={project}
        entry={entry}
        focus={focus}
        light={light}
        onLight={setLight}
        phoneScreen={phoneScreen}
        onPhoneScreen={setPhoneScreen}
        onHotspot={pick}
        onHoverHotspot={setHoverFeature}
      />
      <div>
        <h2 className="eyebrow">What I built</h2>
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {project.built.map((item, i) => {
            const on = focus === i;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  onMouseEnter={() => setHoverFeature(i)}
                  onMouseLeave={() => setHoverFeature(null)}
                  onFocus={() => setHoverFeature(i)}
                  onBlur={() => setHoverFeature(null)}
                  className="group flex w-full items-start gap-3 py-4 text-left"
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-medium tabular-nums transition-all duration-200",
                      on ? "border-[var(--accent)] bg-[var(--accent)] text-[#111114]" : "border-line text-muted group-hover:border-ink/40",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-medium text-ink">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{item.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 rounded-2xl border border-line bg-card/70 p-4 sm:p-5">
          <p className="mb-3 text-xs font-medium tracking-widest text-ink uppercase">Try it</p>
          <Demo slug={project.slug} accent={entry.accent} phoneScreen={phoneScreen} onPhoneScreen={setPhoneScreen} />
        </div>
      </div>
    </div>
  );
}
