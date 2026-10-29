import { seo } from "@/lib/seo";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrowserFrame } from "@/components/browser-frame";
import { ProjectExplorer } from "@/components/showcase/showcase";
import { showcase } from "@/components/showcase/data";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { getProject, nextProject } from "@/lib/content";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug) };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.project.name} | CreatedByLewis`,
          description: loaderData.project.lede,
          path: `/work/${loaderData.project.slug}`,
        })
      : { meta: [] },
  component: CaseStudy,
  notFoundComponent: MissingStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData();

  return (
    <main>
      <article className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14">
        <div>
          <Link to="/work" className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden />
            All work
          </Link>
        </div>
        <p className="eyebrow mt-6">Case study {project.index}</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.lede}</p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {[
            ["Role", project.role],
            ["Year", project.year],
            ["Focus", project.focus],
            ["Live", project.status === "in-progress" ? "In the works" : project.urlLabel],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper px-4 py-4 sm:px-5">
              <dt className="text-xs tracking-widest text-muted uppercase">{label}</dt>
              <dd className="mt-1 text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 space-y-4">
          {showcase[project.slug] ? (
            <ProjectExplorer project={project} />
          ) : (
            <BrowserFrame src={project.image} mobileSrc={project.mobileImage} hoverSrc={project.hoverImage} alt={project.imageAlt} url={project.urlLabel} />
          )}
          {project.extraImage ? (
            <BrowserFrame src={project.extraImage} alt={project.extraImageAlt ?? project.imageAlt} url="Diary home" />
          ) : null}
        </div>

        <blockquote className="mt-12 max-w-3xl font-display text-3xl leading-snug text-ink italic sm:text-4xl">
          “{project.quote}”
        </blockquote>

        <div className="mt-12 max-w-2xl">
          <h2 className="text-xs tracking-widest text-muted uppercase">What Changed</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink">{project.result}</p>
        </div>

        <div className={`mt-12 grid gap-12 ${showcase[project.slug] ? "" : "lg:grid-cols-2"}`}>
          <div className={showcase[project.slug] ? "max-w-2xl" : undefined}>
            <h2 className="text-xs tracking-widest text-muted uppercase">The Problem</h2>
            <div className="mt-4 space-y-4">
              {project.brief.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className={showcase[project.slug] ? "hidden" : undefined}>
            <h2 className="text-xs tracking-widest text-muted uppercase">What I Built</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {project.built.map((item) => (
                <li key={item.title} className="py-4">
                  <p className="font-medium text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {project.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs tracking-widest text-muted uppercase">{spec.label}</dt>
              <dd className="mt-2 text-sm text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {project.status === "in-progress" ? (
            <ButtonAnchor href="/book">Book a call about Trackr</ButtonAnchor>
          ) : (
            <ButtonAnchor href={project.url} target="_blank" rel="noreferrer">
              Visit the live site
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonAnchor>
          )}
          <ButtonAnchor href="/start?package=complete" variant="secondary">
            Order a site like this
          </ButtonAnchor>
        </div>
      </article>

      <Link
        to="/work/$slug"
        params={{ slug: next.slug }}
        className="block border-t border-line transition-colors duration-200 hover:bg-card"
      >
        <div className="group mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-10 sm:px-8">
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">Next case study</p>
            <p className="mt-2 flex items-center gap-3 font-display text-3xl text-ink sm:text-5xl">
              {next.name}
              <ArrowUpRight className="size-6 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" aria-hidden />
            </p>
            <p className="mt-2 text-sm text-muted">{next.summary}</p>
          </div>
          <img
            src={next.image}
            alt=""
            loading="lazy"
            className="hidden h-28 w-44 rounded-xl border border-line object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1 sm:block"
          />
        </div>
      </Link>
    </main>
  );
}

function MissingStudy() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h1 className="font-display text-5xl text-ink">That case study isn’t here.</h1>
      <div className="mt-8">
        <ButtonLink to="/" hash="work" variant="secondary">
          Back to the work
        </ButtonLink>
      </div>
    </main>
  );
}
