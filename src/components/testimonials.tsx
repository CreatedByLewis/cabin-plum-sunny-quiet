import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="eyebrow">From clients</p>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">In Their Words</h2>
        <div className={`mt-10 grid gap-4 ${testimonials.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {testimonials.map((item) => (
            <figure
              key={item.attribution}
              className="lift relative overflow-hidden rounded-2xl border border-line bg-card p-7 sm:p-12"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 right-8 font-display text-[9rem] leading-[0.8] text-signal/20 select-none sm:top-8 sm:right-12 sm:text-[13rem]"
              >
                “
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-signal/15 blur-3xl"
              />
              <blockquote className="relative max-w-4xl font-display text-2xl leading-snug text-ink sm:text-[2.1rem] sm:leading-[1.25]">
                “{item.quote}”
              </blockquote>
              <figcaption className="relative mt-7 flex items-center gap-3 text-sm text-muted">
                <span className="h-px w-8 bg-signal" aria-hidden />
                {item.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
