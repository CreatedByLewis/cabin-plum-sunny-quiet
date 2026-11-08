import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import appCss from "../styles.css?url";
import { packages } from "@/lib/content";
import { BUSINESS_ID, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

const themeScript = `(function(){try{var t=localStorage.getItem("lewis-theme");if(t==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#f3f2ef");}}catch(e){}})();`;

// The business, its founder and the site, on every page. Page routes add
// their own nodes (FAQ, case studies, packages) that point back at these @ids.
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": BUSINESS_ID,
      name: "CreatedByLewis",
      alternateName: "Created By Lewis",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-512.png`,
      image: `${SITE_URL}/og.jpg`,
      email: "hello@createdbylewis.com",
      telephone: "+447484686442",
      description:
        "CreatedByLewis is a UK web design studio run by Lewis Stratford. It designs and builds ecommerce websites for businesses that sell, on Shopify, WordPress or a custom build, including build-a-box ordering, postcode delivery checks, subscriptions and search engine optimisation.",
      slogan: "Websites that take the order.",
      founder: { "@id": PERSON_ID },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Tyne and Wear",
        addressCountry: "GB",
      },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "AdministrativeArea", name: "North East England" },
        { "@type": "City", name: "Newcastle upon Tyne" },
      ],
      knowsAbout: [
        "Web design",
        "Ecommerce website development",
        "Shopify development",
        "WordPress development",
        "Subscription commerce",
        "Build-a-box ordering",
        "Search engine optimisation",
        "Meal prep and food delivery websites",
      ],
      sameAs: ["https://www.instagram.com/createdbylewis"],
      priceRange: "££",
      currenciesAccepted: "GBP",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website design packages",
        itemListElement: packages.map((pkg) => ({
          "@type": "Offer",
          url: `${SITE_URL}/packages/${pkg.id}`,
          price: pkg.price,
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: `${pkg.name} website package`,
            description: pkg.blurb,
            serviceType: "Website design and build",
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Lewis Stratford",
      jobTitle: "Web designer and developer",
      worksFor: { "@id": BUSINESS_ID },
      image: `${SITE_URL}/lewis.jpg`,
      url: `${SITE_URL}/`,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "CreatedByLewis",
      publisher: { "@id": BUSINESS_ID },
      inLanguage: "en-GB",
    },
  ],
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CreatedByLewis" },
      {
        name: "description",
        content:
          "CreatedByLewis designs and builds ecommerce websites for UK businesses that sell, on Shopify, WordPress or a custom build.",
      },
      { name: "theme-color", content: "#111114" },
      { name: "apple-mobile-web-app-title", content: "CreatedByLewis" },
      { name: "application-name", content: "CreatedByLewis" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,560&family=Outfit:wght@400;500;600&display=swap",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Shell>
            <Outlet />
          </Shell>
        </AuthProvider>
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  ),
});
