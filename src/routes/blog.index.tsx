import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, posts } from "@/lib/blog";
import { BUSINESS_ID, SITE_URL, breadcrumbs, seo, webPage } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Website & Ecommerce Advice for Small Businesses | CreatedByLewis Blog",
      description:
        "Straight answers on websites that sell: choosing a platform, what a website really costs, and how to get more orders online. From a UK ecommerce web designer.",
      path: "/blog",
      schema: [
        webPage("/blog", "CreatedByLewis blog", undefined, "CollectionPage"),
        breadcrumbs([["Blog", "/blog"]]),
        {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "CreatedByLewis Blog",
          url: `${SITE_URL}/blog`,
          publisher: { "@id": BUSINESS_ID },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: post.published,
          })),
        },
      ],
    }),
  component: Blog,
});

function Blog() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6 sm:px-8 sm:pt-16">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl text-ink sm:text-6xl">Straight answers on websites that sell.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Practical advice for business owners: choosing a platform, what things really cost, and what makes people
          order.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <ul className="border-t border-line">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10 sm:py-10"
              >
                <div>
                  <p className="text-xs tracking-widest text-muted uppercase">
                    {formatPostDate(post.published)} · {post.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 max-w-3xl font-display text-3xl leading-display font-medium text-ink transition-colors group-hover:text-signal sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted">{post.description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm text-ink">
                  Read the article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
