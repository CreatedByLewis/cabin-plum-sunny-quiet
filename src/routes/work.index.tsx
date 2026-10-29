import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";

export const Route = createFileRoute("/work/")({
  head: () => seo({
    title: "My work | CreatedByLewis",
    description:
      "Sites that take orders. Real Food Delivered, JKitchen Cooks, The Farmers Box, and Trackr.",
    path: "/work",
  }),
  component: Work,
});

const decks: Record<string, { stack: string; headline: string; points: string[]; colours: string[] }> = {
  "real-food-delivered": {
    stack: "/work/rfd-stack.jpg",
    headline: "Two ways to order from the same kitchen.",
    points: ["Build a box, or pick a calorie plan", "Local drops and a nationwide box", "The kitchen owns the ordering"],
    colours: ["#1b1b1b", "#f4efe6", "#c45c26", "#f7f3ec"],
  },
  "jkitchen-cooks": {
    stack: "/work/jk-stack.jpg",
    headline: "A Sunday menu, ordered before Friday at five.",
    points: ["This week’s plates, with calories", "Boxes from 6 to 15 meals", "A cutoff the page makes obvious"],
    colours: ["#2a241c", "#efe6d6", "#8a6a3b", "#f7f1e6"],
  },
  "the-farmers-box": {
    stack: "/work/fb-stack.jpg",
    headline: "A farm box, ordered on the site.",
    points: ["Four sizes, contents follow the harvest", "Once, or every week", "Wednesday to Friday, by area"],
    colours: ["#1f3a2a", "#f3efe4", "#6b8f4e", "#e7d7a8"],
  },
  trackr: {
    stack: "/work/trackr-stack.jpg",
    headline: "Calories, meals, workouts and weight. One diary.",
    points: ["Still in the works", "Photograph a plate, or describe it", "A website plan can add it, branded"],
    colours: ["#111114", "#8b7cf7", "#1c1c22", "#f3f2ef"],
  },
};

function Work() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6 sm:px-8 sm:pt-16">
        <p className="eyebrow">My work</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl text-ink sm:text-6xl">Sites that take the order.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Three live sites. One app in the works. Each one is built around what the business sells.
        </p>
      </section>
      {projects.map((project) => {
        const deck = decks[project.slug];
        if (!deck) return null;
        return (
          <section key={project.slug} className="border-t border-line">
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.2fr]">
              <div>
                <p className="flex items-center gap-3 text-xs tracking-widest text-signal uppercase"><span className="font-display text-muted">{project.index}</span>{project.name}</p>
                <h2 className="mt-3 max-w-md font-display text-4xl leading-tight text-ink sm:text-5xl">{deck.headline}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{project.result}</p>
                <ul className="mt-6 space-y-3">
                  {deck.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-ink">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-line underline-offset-4"
                  >
                    View the case study
                  </Link>
                  {project.status === "in-progress" ? (
                    <span className="text-sm text-muted">In the works</span>
                  ) : (
                    <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
                      {project.urlLabel}
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
              <div>
                <Link
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  aria-label={`View the ${project.name} case study`}
                  className="group relative block overflow-hidden rounded-2xl border border-line bg-[#0c0c0f] transition-[border-color,box-shadow] duration-500 hover:border-ink/25 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(60% 60% at 50% 60%, ${deck.colours[2]}55, transparent 70%)` }}
                  />
                  <img
                    src={deck.stack}
                    alt={`${project.name} on a desktop and a phone`}
                    loading="lazy"
                    className="relative w-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.035]"
                  />
                  <span className="absolute right-4 bottom-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-medium text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Open the case study <ArrowUpRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Colours">
                  {deck.colours.map((colour) => (
                    <li key={colour} className="inline-flex items-center gap-2 rounded-full border border-line bg-card py-1 pr-3 pl-1 text-[11px] text-muted uppercase tabular-nums">
                      <span className="size-5 rounded-full border border-line" style={{ background: colour }} />
                      {colour}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
