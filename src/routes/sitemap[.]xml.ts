import { createFileRoute } from "@tanstack/react-router";
import { packages, projects } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

// /enquiries is private and deliberately left out.
const LASTMOD = "2026-10-29";

function build() {
  const paths = [
    "/",
    "/packages",
    ...packages.map((pkg) => `/packages/${pkg.id}`),
    "/estimate",
    "/book",
    "/start",
    "/work",
    ...projects.map((project) => `/work/${project.slug}`),
  ];
  const urls = paths
    .map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${LASTMOD}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(build(), {
          headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
        }),
    },
  },
});
