import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import appCss from "../styles.css?url";

const themeScript = `(function(){try{var t=localStorage.getItem("lewis-theme");if(t==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#f3f2ef");}}catch(e){}})();`;

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CreatedByLewis",
  url: "https://www.createdbylewis.com",
  email: "hello@createdbylewis.com",
  telephone: "+447484686442",
  image: "https://www.createdbylewis.com/lewis.jpg",
  description:
    "Lewis designs and builds websites for brands that sell a product and take orders, anywhere in the UK.",
  areaServed: { "@type": "Country", "name": "United Kingdom" },
  founder: { "@type": "Person", "name": "Lewis Stratford" },
  priceRange: "££",
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
          "CreatedByLewis designs and builds websites for brands that take orders, anywhere in the UK.",
      },
      { name: "theme-color", content: "#111114" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,560&family=Outfit:wght@400;500;600&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
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
