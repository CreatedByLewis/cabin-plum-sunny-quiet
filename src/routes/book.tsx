import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const CALENDLY = "https://calendly.com/hello-createdbylewis/30min";

export const Route = createFileRoute("/book")({
  head: () => seo({
    title: "Book a consultation | CreatedByLewis",
    description:
      "Book a free consultation with CreatedByLewis. The time goes straight into Lewis’s calendar. Nothing to pay.",
    path: "/book",
  }),
  component: BookPage,
});

function BookPage() {
  const light = useLightTheme();
  const background = light ? "f3f2ef" : "111114";
  const text = light ? "16161a" : "f4f4f2";
  const url = `${CALENDLY}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=${background}&text_color=${text}&primary_color=8b7cf7`;

  useEffect(() => {
    const id = "calendly-widget";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs tracking-widest text-muted uppercase">Consultation</p>
      <div className="mt-4 flex items-center gap-4">
        <img
          src="/lewis.jpg"
          alt="Lewis Stratford"
          width={1260}
          height={1575}
          className="size-16 shrink-0 rounded-full object-cover object-[center_18%] sm:size-20"
        />
        <h1 className="font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
          Book a Time With Me.
        </h1>
      </div>
      <p className="mt-4 max-w-xl text-muted">
        A conversation about the business and whether a site would help. No package, no deposit, nothing to
        pay. Pick a time and it goes straight into my calendar. The call is on Teams.
      </p>
      <p className="mt-3 text-sm text-muted">
        Prefer to talk now?{" "}
        <a href="tel:+447484686442" className="text-ink underline decoration-line underline-offset-4">
          07484 686442
        </a>{" "}
        or{" "}
        <a href="mailto:hello@createdbylewis.com" className="text-ink underline decoration-line underline-offset-4">
          hello@createdbylewis.com
        </a>
        .
      </p>
      <div className="calendly-shell mt-8 overflow-hidden rounded-xl bg-paper">
        <div
          key={url}
          className="calendly-inline-widget h-[620px] md:h-[760px]"
          data-url={url}
          style={{ minWidth: "320px" }}
        />
      </div>
      <div className="mt-8">
        <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
          Back home
        </Link>
      </div>
    </main>
  );
}

function useLightTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setLight(root.dataset.theme === "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return light;
}
