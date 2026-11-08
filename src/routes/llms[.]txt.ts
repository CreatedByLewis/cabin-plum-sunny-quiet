import { createFileRoute } from "@tanstack/react-router";
import { extras, faqs, formatGBP, packages, projects } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { posts } from "@/lib/blog";

// A plain-text summary for AI assistants and answer engines (llmstxt.org).
// Built from the same content as the site, so prices and projects never drift.
function build() {
  const partner = extras.find((item) => item.id === "care");
  const live = projects.filter((project) => project.status !== "in-progress");
  const soon = projects.filter((project) => project.status === "in-progress");

  const lines = [
    "# CreatedByLewis",
    "",
    "> CreatedByLewis is a UK web design studio run by Lewis Stratford. It designs and builds bespoke ecommerce websites for businesses that sell, on Shopify, WordPress or a custom build: online shops, build-a-box ordering, postcode delivery checks, weekly or monthly subscriptions and search engine optimisation. Based in the North East of England (Tyne and Wear), working with clients anywhere in the UK.",
    "",
    "Key facts:",
    "",
    "- One person designs and builds every site, from the first call to launch. No account managers and no templates.",
    "- Platforms: Shopify, WordPress and WooCommerce, or a custom build.",
    "- Specialisms: food, meal prep and subscription brands, farms and veg boxes, personal trainers, and any business that takes orders online.",
    "- Payment: 25% deposit, the rest at launch. Flexible payment options. Prices are a starting point and negotiable.",
    "- Free consultation in person or by video call before anything is built.",
    "- Contact: hello@createdbylewis.com, +44 7484 686442, Instagram @createdbylewis.",
    "",
    "## Packages",
    "",
    ...packages.map(
      (pkg) => `- [${pkg.name}, from ${formatGBP(pkg.price)}](${SITE_URL}/packages/${pkg.id}): ${pkg.blurb} (${pkg.time})`,
    ),
    ...(partner
      ? [`- [Partner, ${formatGBP(partner.price)} a month](${SITE_URL}/packages): ongoing changes, fixes and one planned improvement a month for six months after launch.`]
      : []),
    "",
    "## Case studies",
    "",
    ...live.map((project) => `- [${project.name}](${SITE_URL}/work/${project.slug}): ${project.lede} Live at ${project.urlLabel}.`),
    ...soon.map((project) => `- [${project.name}](${SITE_URL}/work/${project.slug}) (in progress): ${project.lede}`),
    "",
    "## Frequently asked questions",
    "",
    ...faqs.map((item) => `- ${item.q} ${item.a}`),
    "",
    "## Articles",
    "",
    ...posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): what CreatedByLewis does and who it is for`,
    `- [Work](${SITE_URL}/work): all case studies`,
    `- [Web designer in Newcastle](${SITE_URL}/web-designer-newcastle): web design for Newcastle and North East businesses, meeting in person or on video`,
    `- [Packages](${SITE_URL}/packages): packages, prices and what each includes`,
    `- [Estimate](${SITE_URL}/estimate): a short questionnaire that suggests a package and a starting price`,
    `- [Book a consultation](${SITE_URL}/book): book a free call with Lewis`,
    `- [Start a project](${SITE_URL}/start): order a package`,
    `- [Blog](${SITE_URL}/blog): advice on platforms, costs and websites that sell`,
    "",
  ];
  return lines.join("\n");
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(build(), {
          headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
        }),
    },
  },
});
