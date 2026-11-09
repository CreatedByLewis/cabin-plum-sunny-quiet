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
    slug: "how-much-does-a-website-cost-uk",
    title: "How Much Does a Website Cost in the UK?",
    description:
      "How much does a website cost in the UK? Real 2026 prices for builders, freelancers and agencies, plus the running costs, card fees and apps quotes often miss.",
    published: "2026-11-09",
    updated: "2026-11-09",
    readingMinutes: 8,
    tags: ["Pricing", "Web Design", "Ecommerce", "Shopify", "Small Business"],
    lede: "It’s the question everyone wants answered first, and plenty of web designers dodge it. I’d rather not. Here’s what a website really costs in the UK right now, what pushes the price up or down, and the running costs that tend to get left off the quote.",
    body: [
      { type: "h2", text: "The Quick Answer" },
      {
        type: "list",
        items: [
          "**Doing it yourself on a website builder:** roughly £100 to £350 a year all in for the plan, domain and email, plus a fair amount of your own time.",
          "**A freelance web designer:** a small brochure site is commonly £500 to £1,500, a fuller small business site £1,500 to £3,000, and an online shop commonly £3,000 to £10,000, though a focused shop built on a fixed package can cost less.",
          "**An agency:** usually from around £2,000 to £3,000 for a small site, with specialist ecommerce agencies often quoting £5,000 to £35,000 or more.",
          "**Running costs:** a properly looked after business site typically costs somewhere between £50 and £300 a month once you add the platform, apps, hosting and someone to maintain it.",
        ],
      },
      {
        type: "p",
        text: "Those ranges are wide because “a website” covers everything from three pages and a contact form to a shop that takes weekly subscriptions and checks delivery postcodes. The rest of this guide breaks down where the money goes, so you can tell a fair quote from a bad one.",
      },

      { type: "h2", text: "What You’re Actually Paying For" },
      {
        type: "p",
        text: "A quote for a website is mostly a quote for time. Whoever builds it is charging for some or all of these:",
      },
      {
        type: "list",
        items: [
          "**Planning:** working out what the site needs to do, who it’s for and how people will order.",
          "**Design:** how each page looks on a desktop and a phone, built around your products rather than a generic layout.",
          "**Build:** turning the design into a working site, setting up products, payments, shipping and tax.",
          "**Content:** the words, photos and product descriptions. This is the part that’s most often missing from cheap quotes.",
          "**Testing and launch:** checking every page and the full checkout on real devices, then putting it live on your domain.",
          "**Handover:** showing you how to change a price, add a product and see your orders.",
        ],
      },
      {
        type: "p",
        text: "When two quotes look very different, it’s usually because one includes planning and content and the other doesn’t. Those are the parts that decide whether anyone actually orders, so they’re worth paying for.",
      },

      { type: "h2", text: "Typical UK Prices by Type of Website" },
      {
        type: "p",
        text: "These are typical ranges from UK pricing guides updated this year. Treat them as a sense check rather than a price list, because scope matters far more than the label.",
      },
      {
        type: "table",
        caption: "Typical UK build costs, 2026. Prices vary with location, scope and whether VAT is included.",
        head: ["Type of site", "Freelancer", "Agency", "What it usually means"],
        rows: [
          ["Brochure site", "£500 to £1,500", "From about £2,000", "Three to five pages, a contact form, no shop"],
          ["Small business site", "£1,500 to £3,000", "£2,000 to £8,000", "Five to ten pages you can edit yourself"],
          ["Online shop", "£3,000 to £10,000", "£5,000 to £35,000 or more", "Products, checkout, shipping and payments"],
          ["Complex custom build", "£10,000 to £50,000 or more", "Quoted individually", "Custom features, integrations, many page types"],
        ],
      },
      {
        type: "p",
        text: "Hourly rates follow the same pattern. Freelance web designers in the UK typically charge around £25 to £50 an hour, small agencies around £50 to £150, and larger agencies £75 to £200 or more. You’re paying for the team, the project management and the overheads, which can be worth it on a big project and wasted on a small one.",
      },

      { type: "h2", text: "The Running Costs Nobody Mentions" },
      {
        type: "p",
        text: "The build is a one-off. These costs keep coming, and for a shop they can add up to more than the build over a few years.",
      },
      {
        type: "table",
        caption: "Typical UK running costs, November 2026. Always check the provider’s own pricing before you budget.",
        head: ["Cost", "Typical price", "Worth knowing"],
        rows: [
          ["Domain name", "About £8 to £20 a year", "Cheap first-year deals often renew at a higher price"],
          ["Website builder plan", "About £9 to £259 a month", "Most builders charge less if you pay yearly"],
          ["Shopify plan", "£19, £49 or £259 a month paid yearly", "£25, £65 or £344 if you pay month to month"],
          ["Card fees on Shopify", "2% + 25p down to 1.5% + 25p online", "The rate drops on higher plans"],
          ["WordPress hosting", "About £20 to £300 or more a year", "Cheap hosting is usually the reason a WordPress site is slow"],
          ["Paid theme", "Free to around £400, one-off", "A good free theme is often fine with the right design work"],
          ["Apps and plugins", "£0 to £100 or more a month", "Subscription, review and delivery apps are the usual culprits"],
          ["Maintenance", "£50 to £150 a month from a freelancer", "Agencies often charge £100 to £500 a month"],
        ],
      },
      {
        type: "callout",
        title: "Watch the Shopify platform fee",
        text: "If you take payments on Shopify through a provider other than Shopify Payments, Shopify adds its own fee on top of the card fees: 2% on Basic, 1% on Grow and 0.6% on Advanced. For most small shops, Shopify Payments is the cheaper route.",
      },
      {
        type: "p",
        text: "Apps deserve a special mention. As one example, the Appstle subscriptions app for Shopify has a free tier for very small volumes, then paid plans from about $10 to $100 a month depending on how much subscription revenue you take. That’s a fair price for what it does, but add a box builder, a delivery date picker and a reviews app on top and the monthly bill grows quickly.",
      },

      { type: "h2", text: "What Pushes the Price Up" },
      {
        type: "list",
        items: [
          "**The number of different page designs.** Ten pages that share one layout cost less than five that are all different.",
          "**Selling features beyond a basic shop.** Subscriptions, build-a-box ordering, postcode checks, delivery days and order cutoffs all take real work to get right.",
          "**Content.** If I’m writing the copy, sourcing images or styling product photos, that’s time on top of the build.",
          "**Integrations.** Connecting the site to accounting software, a courier, a CRM or a stock system adds setup and testing.",
          "**Moving from another platform.** Migrating products, customers and order history, and keeping your search rankings, needs care.",
          "**Brand work.** A new logo, colours and type is a project in its own right.",
          "**Tight deadlines.** A site needed in a week means other work gets moved, and that usually costs more.",
        ],
      },

      { type: "h2", text: "Where Cheap Websites Get Expensive" },
      {
        type: "p",
        text: "I’m not against cheap websites. A simple builder site can be exactly right for a new business testing an idea. The problem is a cheap site that quietly costs you orders, or one that has to be rebuilt within a year.",
      },
      {
        type: "p",
        text: "The common ones I see are sites that look fine on a laptop but are awkward to order from on a phone, shops with no clear delivery information, and food businesses paying three or four separate monthly app fees to do something that could have been built once. Over a few years, those subscriptions can cost more than a proper build. That’s why on my Box and Stay packages the build-a-box is made for the business and there’s no monthly fee to an outside company for it.",
      },
      {
        type: "callout",
        title: "Ask who owns it",
        text: "Before you pay anyone, check that the domain, the platform account and any paid apps will be in your name, not the designer’s. If you ever want to move on, you should be able to take the whole site with you.",
      },

      { type: "h2", text: "Freelancer, Agency or Doing It Yourself" },
      {
        type: "list",
        items: [
          "**Doing it yourself** is cheapest in cash and most expensive in time. It suits a new business with a small range and a tight budget, as long as you’re comfortable writing your own copy and taking your own photos.",
          "**A freelancer** gives you one person who designs, builds and answers the phone. You’ll usually pay less than an agency for the same site, and you deal with the person doing the work. The trade-off is capacity: one person can only take on so many projects at once.",
          "**An agency** brings a team, which helps on large or complicated projects with lots of people involved. For a small business site, much of that cost is overhead you don’t need.",
        ],
      },

      { type: "h2", text: "What I Charge" },
      {
        type: "p",
        text: "I’d be a bit of a hypocrite writing this without being open about my own prices. I build ecommerce sites on three [packages](/packages):",
      },
      {
        type: "list",
        items: [
          "**Shop, from £1,000, about 2 weeks.** A bespoke homepage and a store, designed around what you sell, laid out for desktop and mobile and launched on your domain.",
          "**Box, from £1,500, about 3 weeks.** Everything in Shop, plus a postcode check, a custom hero image and a build-a-box your customers use themselves.",
          "**Stay, from £2,000, about 4 weeks.** Everything in Box, plus weekly or monthly subscriptions, search-ready copy and a refresh of your branding.",
        ],
      },
      {
        type: "p",
        text: "The prices are a starting point, and they’re negotiable. Tell me your budget and I’ll shape the work to fit it. Payment is 25% to start and the rest when the site goes live, with flexible options to spread the cost. If you want ongoing help, Partner is £150 a month for six months after launch and covers product and menu changes, fixes and one planned improvement a month. Your platform plan, domain and card fees are separate from the build, so include them in your first year’s budget.",
      },

      { type: "h2", text: "How to Budget for Your Website" },
      {
        type: "list",
        items: [
          "**Write down what the site has to do.** Sell products, take subscriptions, deliver locally, take bookings. This is the biggest driver of cost.",
          "**Pick the platform for how you sell.** My [Shopify vs WordPress vs Squarespace guide](/blog/shopify-vs-wordpress-vs-squarespace) goes through the trade-offs.",
          "**Budget for the first year, not just the build.** Add the build, twelve months of the plan, the domain, any apps, card fees on the sales you expect and any maintenance.",
          "**Get two or three quotes that cover the same things.** Ask each one to list what’s included so you’re comparing like with like.",
          "**Ask what isn’t included.** Copywriting, photos, product upload, training and fixes after launch are the usual gaps.",
          "**Check ownership and handover.** Your name on every account, and a walkthrough before launch.",
          "**Keep a little back.** Something always comes up once real customers start using the site, so leave room for a few small changes.",
        ],
      },
      {
        type: "callout",
        title: "A worked example",
        text: "Say a meal prep business spends £1,500 on the build and goes on Shopify Basic, paid yearly at £19 a month, which is £228. Add a .co.uk domain at roughly £15. If it then takes £20,000 online across 500 orders through Shopify Payments, card fees at 2% + 25p come to about £525. That’s a first year of around £2,270 before any apps or ongoing support, and only the plan, domain and fees repeat in year two.",
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "Don’t judge a website on the build price alone. Look at what it will cost to run for a year, who will look after it and whether it does the job your customers need, especially on a phone. A site that’s a little more expensive up front but saves you a few monthly fees, or brings in more orders, usually pays for itself.",
      },
      {
        type: "p",
        text: "If you’d like a straight number for your business, [book a free consultation](/book) and I’ll talk it through with you, in person around the North East or on a video call. You can also [get a rough estimate](/estimate) online, or [see the sites I’ve built](/work) for businesses like yours.",
      },
    ],
    sources: [
      {
        label: "Startups.co.uk: How much does a website cost?",
        url: "https://startups.co.uk/websites/how-much-does-a-website-cost",
      },
      {
        label: "ExpertSure: Website design costs guide UK",
        url: "https://www.expertsure.com/uk/web-design/website-design-costs-guide/",
      },
      { label: "ExpertSure: Shopify pricing UK", url: "https://www.expertsure.com/uk/web-design/shopify-pricing-uk/" },
      { label: "Appstle Subscriptions on the Shopify App Store", url: "https://apps.shopify.com/subscriptions-by-appstle" },
      { label: "DomainOffer: .co.uk price comparison", url: "https://domainoffer.net/price-compare-co.uk" },
    ],
  },
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
