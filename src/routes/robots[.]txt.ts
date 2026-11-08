import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

// Served by the app, not public/: in production the static public/robots.txt
// was never reached and the request fell through to the HTML catch-all.
// AI search and assistant crawlers are welcome: being cited in ChatGPT,
// Perplexity, Claude and Google's AI answers is part of how clients find Lewis.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

const body = `User-agent: *
Allow: /
Disallow: /enquiries

${aiCrawlers.map((agent) => `User-agent: ${agent}\nAllow: /\nDisallow: /enquiries`).join("\n\n")}

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
