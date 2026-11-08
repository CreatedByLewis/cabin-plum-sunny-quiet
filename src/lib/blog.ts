// Blog posts. Body blocks are plain data so the same content feeds the page,
// the structured data, the sitemap and llms.txt.
// Inline text supports **bold** and [links](/path) only.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated: string;
  readingMinutes: number;
  tags: string[];
  lede: string;
  body: Block[];
  sources: { label: string; url: string }[];
};

export const posts: Post[] = [
  {
    slug: "shopify-vs-wordpress-vs-squarespace",
    title: "Shopify vs WordPress vs Squarespace: Which Is Right for Your Business?",
    description:
      "An honest UK comparison of Shopify, WordPress with WooCommerce and Squarespace: real monthly costs, transaction fees, subscriptions, upkeep and which suits the way you sell.",
    published: "2026-11-08",
    updated: "2026-11-08",
    readingMinutes: 7,
    tags: ["Platforms", "Ecommerce", "Shopify", "WordPress", "Squarespace"],
    lede: "It’s the first question almost every client asks me. The honest answer is that none of them is the best. Each is the best at something, and the right one depends on how you sell, how much you want to look after yourself and where you want the business to be in three years.",
    body: [
      { type: "h2", text: "The Short Answer" },
      {
        type: "list",
        items: [
          "**Shopify** if selling products online is the heart of the business and you want it to just work, every day, without you thinking about servers or updates.",
          "**WordPress with WooCommerce** if content matters as much as the shop, you need something unusual built, or you want to own every part of the site outright.",
          "**Squarespace** if you’re a small brand, a service business or a portfolio with a modest shop on the side, and you want something simple you can edit yourself.",
        ],
      },
      {
        type: "p",
        text: "That’s the summary. The detail is where businesses get caught out, usually on fees, subscriptions and who keeps the site running once it’s live.",
      },

      { type: "h2", text: "What Each One Actually Costs" },
      {
        type: "p",
        text: "Headline prices only tell part of the story. Card fees on every order, paid apps and plugins, and the time spent keeping things updated all add up. Here’s how the running costs compare in the UK, before any design or build work.",
      },
      {
        type: "table",
        caption: "UK running costs, November 2026. Prices change, so always check the platform’s own pricing page.",
        head: ["", "Shopify", "WordPress + WooCommerce", "Squarespace"],
        rows: [
          [
            "Monthly plan",
            "£19 to £259 a month (paid yearly), £25 to £344 paid monthly",
            "Software is free. Hosting from about £5 to £50 a month",
            "About £12 to £79 a month (paid yearly)",
          ],
          [
            "Card fees",
            "From 2% + 25p on Basic, down to 1.5% + 25p on Advanced",
            "Set by your payment provider, such as Stripe or PayPal",
            "Set by Squarespace Payments, Stripe or PayPal",
          ],
          [
            "Extra platform fee",
            "Up to 2% more if you use a payment provider other than Shopify Payments",
            "None",
            "2% on the Basic plan, none on higher plans",
          ],
          [
            "Subscriptions",
            "Through apps such as Appstle, usually a monthly fee",
            "WooCommerce Subscriptions, a paid extension",
            "Built in on higher plans, fewer options",
          ],
          [
            "Upkeep",
            "Handled by Shopify",
            "You or your developer: updates, security, backups",
            "Handled by Squarespace",
          ],
        ],
      },
      {
        type: "p",
        text: "WordPress looks cheapest on paper, but a realistic first year with decent hosting, a premium theme and the plugins a shop needs often lands somewhere between a few hundred and a few thousand pounds. Shopify is the reverse: the plan costs more, but very little is hidden.",
      },

      { type: "h2", text: "Shopify: Built to Sell" },
      {
        type: "p",
        text: "Shopify does one thing exceptionally well. Checkout is fast and trusted, payments, stock, shipping and tax are all in one place, and it stays up on your busiest day without you doing anything. Apple Pay, Google Pay and Shop Pay come built in, and those make a real difference on mobile.",
      },
      {
        type: "p",
        text: "The trade-offs are that you’re renting the platform rather than owning it, and the more specific features you want, the more monthly app subscriptions you pick up. Content pages and blogs are fine but basic compared with WordPress.",
      },
      {
        type: "callout",
        title: "Good fit",
        text: "Product brands, food and meal prep businesses, anyone selling every day who wants the shop to run itself. Most of the sites I build for businesses taking regular orders are on Shopify.",
      },

      { type: "h2", text: "WordPress and WooCommerce: Total Freedom" },
      {
        type: "p",
        text: "WordPress runs a huge share of the web, and WooCommerce turns it into a shop. You own everything, you can host it anywhere, and there’s almost nothing it can’t be made to do. It’s also the strongest of the three for content, which matters if articles, recipes, guides or SEO are a big part of how customers find you.",
      },
      {
        type: "p",
        text: "That freedom comes with responsibility. Plugins and WordPress itself need regular updates, and a site that’s left alone for a year can become slow or insecure. Quality also varies hugely between themes and plugins. Built properly and looked after, it’s superb. Built cheaply, it’s where most of the broken websites I’m asked to fix come from.",
      },
      {
        type: "callout",
        title: "Good fit",
        text: "Content-heavy businesses, unusual ordering flows, members’ areas, and businesses that want full ownership and have someone to look after the site.",
      },

      { type: "h2", text: "Squarespace: Simple and Polished" },
      {
        type: "p",
        text: "Squarespace is the easiest of the three to manage yourself. The templates look good straight away, hosting and security are handled, and editing a page is genuinely simple. For a service business, a café, a studio or a small product range, it can be all you need.",
      },
      {
        type: "p",
        text: "Where it struggles is growth. There are far fewer integrations than Shopify or WordPress, checkout and subscription options are more limited, and custom features are hard to add. Businesses that start to scale often end up moving, and migrating a shop is never free.",
      },
      {
        type: "callout",
        title: "Good fit",
        text: "Service businesses, portfolios and small shops with a handful of products, where ease of editing matters more than advanced selling features.",
      },

      { type: "h2", text: "Five Questions to Help You Decide" },
      {
        type: "list",
        items: [
          "**How much of your income comes through the website?** If it’s most of it, lean towards Shopify.",
          "**Do you sell subscriptions, boxes or anything with rules?** Shopify with the right apps, or a well-built WooCommerce site, will handle it. Squarespace may not.",
          "**Is content a big part of how people find you?** WordPress is the strongest here.",
          "**Who will look after the site after launch?** If the answer is nobody, avoid an unmaintained WordPress site.",
          "**Where will the business be in three years?** Pick the platform for that business, not just today’s. Moving later costs more than choosing well now.",
        ],
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "For most businesses that sell products online, especially food, subscriptions and anything with regular orders, I’d start with Shopify. It’s the platform that lets you spend your time on the business rather than the website. Where content and flexibility matter more, WordPress built properly is the better tool. And for a simple site with a small shop, Squarespace is a perfectly sensible choice.",
      },
      {
        type: "p",
        text: "I build on all of them, so I don’t have a reason to push you one way. If you’re not sure which fits, [book a free consultation](/book) and I’ll give you a straight answer based on how you actually sell. You can also [see the sites I’ve built](/work) or [get a rough estimate](/estimate) for your project.",
      },
    ],
    sources: [
      { label: "Shopify UK pricing", url: "https://www.shopify.com/uk/pricing" },
      { label: "Squarespace pricing", url: "https://www.squarespace.com/pricing" },
      {
        label: "ExpertSure: Squarespace pricing UK",
        url: "https://www.expertsure.com/uk/web-design/squarespace-pricing-uk/",
      },
      { label: "WooCommerce", url: "https://woocommerce.com/" },
    ],
  },
];

export const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

// Plain text of a post, for llms.txt and word counts.
export const postText = (post: Post) =>
  post.body
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "table") return [...block.head, ...block.rows.flat()].join(" ");
      if (block.type === "callout") return `${block.title} ${block.text}`;
      return block.text;
    })
    .join(" ")
    .replace(/\*\*|\[|\]\([^)]*\)/g, "");
