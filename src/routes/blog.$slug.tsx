import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Prose } from "@/components/prose";
import { findPost, formatPostDate, postText } from "@/lib/blog";
import { BUSINESS_ID, PERSON_ID, SITE_URL, breadcrumbs, seo, webPage } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { post } = loaderData;
    const path = `/blog/${post.slug}`;
    return seo({
      title: `${post.title} | CreatedByLewis`,
      description: post.description,
      path,
      schema: [
        webPage(path, post.title, post.description),
        breadcrumbs([
          ["Blog", "/blog"],
          [post.title, path],
        ]),
        {
          "@type": "BlogPosting",
          "@id": `${SITE_URL}${path}#article`,
          headline: post.title,
          description: post.description,
          datePublished: post.published,
          dateModified: post.updated,
          inLanguage: "en-GB",
          keywords: post.tags.join(", "),
          wordCount: postText(post).split(/\s+/).length,
          mainEntityOfPage: { "@id": `${SITE_URL}${path}` },
          author: { "@id": PERSON_ID },
          publisher: { "@id": BUSINESS_ID },
          isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        },
      ],
    });
  },
  component: Article,
});

function Article() {
  const { post } = Route.useLoaderData();
  return (
    <main>
      <article className="mx-auto max-w-3xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <div className="mt-8">
          <p className="eyebrow">{post.tags[0]}</p>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-display font-medium text-ink sm:text-6xl">{post.title}</h1>
        <p className="mt-6 text-sm text-muted">
          By Lewis Stratford · <time dateTime={post.published}>{formatPostDate(post.published)}</time> ·{" "}
          {post.readingMinutes} min read
        </p>
        <p className="mt-8 text-xl leading-relaxed text-ink">{post.lede}</p>
        <div className="mt-8">
          <Prose blocks={post.body} />
        </div>
        {post.sources.length > 0 && (
          <section className="mt-14 border-t border-line pt-6">
            <h2 className="text-xs tracking-widest text-muted uppercase">Sources</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted underline underline-offset-4 hover:text-ink"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
