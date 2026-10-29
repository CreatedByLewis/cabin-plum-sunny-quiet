# CreatedByLewis: redesign, 29 Oct 2026

Base: `createdbylewis-full.zip` (newest Grok export).

## Restored from the live site (were missing from the export)
- Testimonials (`src/lib/testimonials.ts`, `src/components/testimonials.tsx`)
- SEO: `src/lib/seo.ts` (canonical URLs on every page), `robots.txt` and `sitemap.xml` routes (sitemap now includes /work)

## Bugs fixed
- Case study pages (/work/...) were showing the Work list instead: `work.tsx` renamed to `work.index.tsx`
- Package pages (/packages/shop|box|complete) were showing the Packages list: `packages.tsx` renamed to `packages.index.tsx`

## New
- Interactive work showcase on the home page (`src/components/showcase/`): desktop and phone frames, numbered hotspots linked to the feature list, spotlight zoom, 3D tilt, light/dark flip for Real Food Delivered, scrollable Farmers Box phone, Trackr screen walkthrough, a "Try it" demo per project (JKitchen countdown and box builder, Farmers Box delivery days, Real Food calorie plan, Trackr), facts and palette strip, autoplay tour
- The same interactive stage on each case study page
- Hero: animated headline, live status pill, client marquee
- Glass header with active link underline, closing call-to-action band on every page (not on /start, /book)
- Site-wide: soft violet glow and grain, scroll-reveal sections, card hover lift, animated ring on the featured package and the About photo, polished FAQ, steps and lists, Work page hover states and labelled colour swatches
- `public/work/real-food-mobile.jpg` (phone view cropped from the existing stack image)

Theme unchanged: same colours, Fraunces + Outfit, dark/light switch.
