import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs tracking-widest text-muted uppercase">From clients</p>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">In Their Words</h2>
        <div className={`mt-10 grid gap-4 ${testimonials.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {testimonials.map((item) => (
            <figure key={item.attribution} className="rounded-xl border border-line bg-card p-6 sm:p-8">
              <blockquote className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted">{item.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
