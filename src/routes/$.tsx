import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink } from "@/components/ui/button";

export const Route = createFileRoute("/$" )({
  head: () => ({
    meta: [
      { title: "Page not found | CreatedByLewis" },
      { name: "description", content: "That page isn’t here. Head back to CreatedByLewis to see the work and packages." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Missing,
});

function Missing() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
      <p className="text-xs tracking-widest text-muted uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl text-ink">That page isn’t here.</h1>
      <div className="mt-8">
        <ButtonLink to="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </main>
  );
}
