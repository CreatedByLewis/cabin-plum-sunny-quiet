export const SITE_URL = "https://www.createdbylewis.com";

/** Stable @id for the business entity, so every page's schema points at one node. */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#lewis`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type SeoInput = {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
  /** schema.org nodes for this page; rendered as one JSON-LD @graph. */
  schema?: Record<string, unknown>[];
};

type MetaTag = { title: string } | { name: string; content: string };

/**
 * Per-route head tags: title, description, robots, a self-referencing
 * canonical and optional JSON-LD. og:* / twitter:* are injected by the
 * platform middleware (server/middleware/grok-pwa.ts), which strips app-set
 * share tags, so they are not set here; og:title follows the <title>.
 */
export function seo({ title, description, path, noindex, schema }: SeoInput) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const meta: MetaTag[] = [{ title }];
  if (description) meta.push({ name: "description", content: description });
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  const links = noindex ? [] : [{ rel: "canonical", href: url }];
  // "<" is escaped so no string in the data can close the script tag early.
  const scripts =
    schema && schema.length && !noindex
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({ "@context": "https://schema.org", "@graph": schema }).replace(/</g, "\\u003c"),
          },
        ]
      : [];
  return { meta, links, scripts };
}

/** A WebPage node tied to the site and business. */
export function webPage(path: string, name: string, description?: string, type = "WebPage") {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    inLanguage: "en-GB",
  };
}

/** BreadcrumbList from [name, path] pairs, starting after Home. */
export function breadcrumbs(trail: [string, string][]) {
  const items = [["Home", "/"] as [string, string], ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path === "/" ? "/" : path}`,
    })),
  };
}
