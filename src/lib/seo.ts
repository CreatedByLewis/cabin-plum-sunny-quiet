export const SITE_URL = "https://www.createdbylewis.com";

type SeoInput = {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
};

/**
 * Per-route head tags: title, description, robots and a self-referencing
 * canonical. og:* / twitter:* are injected by the platform middleware
 * (server/middleware/grok-pwa.ts), which strips app-set share tags, so they
 * are not set here; og:title follows the <title> because site.json has no title.
 */
export function seo({ title, description, path, noindex }: SeoInput) {
  const meta: { title?: string; name?: string; content?: string }[] = [{ title }];
  if (description) meta.push({ name: "description", content: description });
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  const links = noindex ? [] : [{ rel: "canonical", href: `${SITE_URL}${path === "/" ? "/" : path}` }];
  return { meta, links };
}
