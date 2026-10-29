import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

// Served by the app, not public/: in production the static public/robots.txt
// was never reached and the request fell through to the HTML catch-all.
const body = `User-agent: *
Allow: /
Disallow: /enquiries

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(body, {
          headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
        }),
    },
  },
});
