export type PackageId = "order" | "box" | "complete";
export type ExtraId = "box" | "copy" | "brand" | "search" | "care";

export type Package = {
  id: PackageId;
  name: string;
  price: number;
  depositUrl: string;
  time: string;
  blurb: string;
  fit: string;
  story: string[];
  includes: string[];
  highlights: string[];
  retainer: { monthly: number; months: number } | null;
  featured?: boolean;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  summary: string;
  image: string;
  mobileImage?: string;
  hoverImage?: string;
  extraImage?: string;
  extraImageAlt?: string;
  screens?: { src: string; alt: string; label: string }[];
  previewUrl?: string;
  imageAlt: string;
  url: string;
  urlLabel: string;
  status?: "live" | "in-progress";
  lede: string;
  role: string;
  year: string;
  focus: string;
  quote: string;
  result: string;
  brief: string[];
  built: { title: string; detail: string }[];
  specs: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "jkitchen-cooks",
    index: "01",
    name: "JKitchen Cooks",
    summary: "Premium meal prep. A new menu, delivered every Sunday.",
    image: "/work/jkitchen.jpg",
    imageAlt: "JKitchen Cooks homepage. Premium, meets meal prep, with this week’s plates and a build-your-box button.",
    url: "https://www.jkitchencooks.com",
    urlLabel: "jkitchencooks.com",
    lede: "A private chef’s Sunday drop, turned into a site you can order from before Friday at five.",
    role: "Design and build",
    year: "2026",
    focus: "A weekly menu drop",
    quote: "Premium, meets meal prep.",
    result:
      "This week’s menu, the Friday cutoff, and a postcode check sit on the page. People can subscribe and change the Sunday box without messaging the kitchen.",
    brief: [
      "JKitchen cooks a new menu every week and delivers on Sunday across the North West, North East and North Yorkshire. Boxes run from 6 to 15 meals, with breakfasts and juices. Subscribe and the first box is 15% off.",
      "It had to feel like the food: considered, not factory. It still has to do the practical jobs: check a postcode, show this week’s plates with calories, and make the Friday cutoff impossible to miss.",
    ],
    built: [
      {
        title: "The menu is the product",
        detail: "This week’s plates, with calories and prices, instead of a generic store buried under a theme.",
      },
      {
        title: "Build a box",
        detail: "6, 8, 10, 12 or 15 meals. Swap plates. Add breakfasts and juices if you want them.",
      },
      {
        title: "A deadline you can see",
        detail: "Orders lock Friday at 5pm so the kitchen can source and cook. The page says so before you start.",
      },
      {
        title: "Postcode, then the box",
        detail: "A delivery check up front, so nobody builds an order the drivers can’t drop on Sunday.",
      },
      {
        title: "The box remembers the choices",
        detail:
          "Meal count, swaps, breakfasts and juices stay in one flow. People can change the Sunday order without starting again or sending a message to the kitchen.",
      },
    ],
    specs: [
      { label: "Delivery", value: "Every Sunday" },
      { label: "Cutoff", value: "Friday, 5pm" },
      { label: "Box sizes", value: "6 to 15 meals" },
      { label: "First box", value: "15% off if you subscribe" },
    ],
  },
  {
    slug: "the-farmers-box",
    index: "02",
    name: "The Farmers Box",
    summary: "Organic veg boxes from Lyncroft Farm. Order for the week, or every week.",
    image: "/work/farmers-box.jpg",
    mobileImage: "/work/farmers-box-mobile.png",
    imageAlt: "The Farmers Box homepage. Organic vegetable boxes from Lyncroft Farm, with an order button.",
    url: "https://thefarmersbox.co.uk",
    urlLabel: "thefarmersbox.co.uk",
    lede: "A farm’s weekly box, with the order on the site instead of a phone call.",
    role: "Design and build",
    year: "2026",
    focus: "A weekly farm box",
    quote: "From our farm to your table.",
    result:
      "Customers pick a box, add fruit, eggs or milk, and order for one week or every week. Delivery runs Wednesday to Friday across West Lancashire and north Liverpool.",
    brief: [
      "Duncan and Jimmelyn Gielty grow certified organic vegetables at Lyncroft Farm in Aughton. The box changes with the harvest. Fruit is bought in. Meat is raised on the farm.",
      "The site had to make the box easy to order, and make the weekly option obvious, without turning a farm into a generic shop.",
    ],
    built: [
      {
        title: "The box is the product",
        detail: "Four sizes, compared on the page. The contents follow the week’s harvest, not a fixed catalogue.",
      },
      {
        title: "Add what you want",
        detail: "Fruit, eggs and milk sit on the same order. Meat from the farm can be added too.",
      },
      {
        title: "Once, or every week",
        detail: "A one-off box, or the same box every week. Pause or change by a call or an email.",
      },
      {
        title: "A cutoff you can see",
        detail: "Orders in by midday the day before delivery, so the farm can pack what was picked.",
      },
      {
        title: "Postcode, then the day",
        detail: "Delivery is Wednesday to Friday by area. Southport, Formby and Crosby on Wednesday. The page says so before you order.",
      },
    ],
    specs: [
      { label: "From", value: "Lyncroft Farm, Aughton" },
      { label: "Delivery", value: "Wed to Fri, by area" },
      { label: "Cutoff", value: "Midday, the day before" },
      { label: "Repeat", value: "Every week, or once" },
    ],
  },
  {
    slug: "real-food-delivered",
    index: "03",
    name: "Real Food Delivered",
    summary: "Chef-prepared meals. A custom box, or a set calorie plan.",
    image: "/work/real-food-dark.jpg",
    hoverImage: "/work/real-food-light.jpg",
    imageAlt: "Real Food Delivered homepage, with the choice between a custom box and a set calorie plan.",
    url: "https://www.realfooddelivered.co.uk",
    urlLabel: "realfooddelivered.co.uk",
    lede: "Two ways to buy from the same kitchen, without the homepage turning into a catalogue.",
    role: "Design and build",
    year: "2026",
    focus: "Two ways to order",
    quote: "Real food. To your door.",
    result:
      "The kitchen owns the ordering. Customers build a box or pick a calorie plan, locally or nationwide, and can finish it on a phone. There is no monthly fee to an outside box builder.",
    brief: [
      "Real Food Delivered cooks fresh and drops meals on Sunday and Wednesday locally, or as one nationwide box on Tuesday. People either build every meal themselves, or pick a set calorie plan between 1,200 and 3,100 kcal.",
      "The site had to make that choice obvious in one screen. The photography does the appetite. The interface just has to get someone into the right box.",
    ],
    built: [
      {
        title: "Two doors, one kitchen",
        detail: "Build Your Box and Set Calorie Plan sit together. Same brand, different kind of commitment.",
      },
      {
        title: "The menu starts the order",
        detail: "This week’s dishes are on the page. Choosing one begins the box, instead of dumping you into a shop grid.",
      },
      {
        title: "Delivery in plain language",
        detail: "Local split drops, or a single Tuesday courier box, with the weekly price of each written out.",
      },
      {
        title: "One-off or ongoing",
        detail: "A weekly subscription for people who already know, and a pay-now plan for people who don’t want one yet.",
      },
      {
        title: "The phone has to finish the order",
        detail:
          "Most of this gets decided on a small screen. The choice between a custom box and a calorie plan, and the week’s dishes, stay tappable, not a desktop page squeezed down.",
      },
    ],
    specs: [
      { label: "Local drops", value: "Sunday & Wednesday" },
      { label: "Nationwide", value: "One Tuesday box" },
      { label: "Plans", value: "1,200–3,100 kcal" },
      { label: "Also on the box", value: "Breakfasts & dessert" },
    ],
  },
  {
    slug: "trackr",
    index: "04",
    name: "Trackr",
    summary: "In the works. Calories, meals, workouts and weight, in one diary.",
    image: "/work/trackr-home.jpg",
    mobileImage: "/work/trackr-mobile.jpg",
    imageAlt: "Trackr diary home. Today, calories left, protein, carbs and fat.",
    url: "/work/trackr",
    urlLabel: "In the works",
    status: "in-progress",
    lede: "Unleash your diary. Calories, meals, workouts and weight, in one place. Still being built.",
    role: "App, in progress",
    year: "2026",
    focus: "The diary",
    quote: "Unleash Your Diary.",
    result:
      "Trackr is a macro and calorie diary. It is in the works, so a customer can manage meals, workouts and weight in one app. For a kitchen that wants orders inside it, an order portal can be added. A website customer can pay extra to have the app in their branding.",
    brief: [
      "The diary is the product. Calories, meals, workouts and weight sit together, so the lifestyle is not split across three apps.",
      "A plate can be photographed or described. The numbers land in the day. For a client who wants customers to order meals in the app, that portal can be added. There is no public download yet.",
    ],
    built: [
      {
        title: "One diary",
        detail: "Calories, meals, workouts and weight. The day is managed in one place.",
      },
      {
        title: "Photograph or describe",
        detail: "A plate can be photographed, or described, and added to the day.",
      },
      {
        title: "Weight, with the food",
        detail: "The scale sits next to the meals, so the lifestyle is one record.",
      },
      {
        title: "Order from the same app",
        detail: "For clients who want it, customers can order meals in the app. The portal uses the kitchen’s menu.",
      },
      {
        title: "Your brand, not mine",
        detail:
          "A customer who already has a website plan can pay extra to have Trackr in their name, colours and logo. The price is agreed on the call.",
      },
    ],
    specs: [
      { label: "Status", value: "In the works" },
      { label: "What it does", value: "Calories, meals, workouts, weight" },
      { label: "Orders", value: "Portal, if the client wants it" },
      { label: "Comes with", value: "A website plan, extra fee" },
    ],
  },
];

export const packages: Package[] = [
  {
    id: "order",
    name: "Shop",
    price: 1000,
    depositUrl: "https://buy.stripe.com/28EaEQ4u0dbk9bq7Wnawo02",
    time: "About 2 weeks",
    blurb:
      "A homepage and a store, designed around what you sell. People can land, look, and buy, on a desktop or a phone.",
    fit: "You need a shop on the site, not a page that only describes the product.",
    story: [
      "Every site I build is shaped around what you actually sell. It is made to be clear on a desktop and on a phone, so people stay and order again.",
      "Shop is the homepage and the store. Someone lands, sees what you sell, and can buy it there.",
    ],
    includes: [
      "Bespoke web design, curated for the products you sell",
      "A landing page, laid out for desktop and for a phone",
      "A store customers can purchase from",
      "Built to be clear and easy to use, so people stay and come back",
      "A walkthrough, then set live on your domain",
    ],
    highlights: ["A homepage and a store", "Laid out for desktop and phone", "Live on your domain"],
    retainer: null,
  },
  {
    id: "box",
    name: "Box",
    price: 1500,
    depositUrl: "https://buy.stripe.com/fZucMYaSo2wG5ZegsTawo03",
    time: "About 3 weeks",
    blurb:
      "The shop, a postcode check, a custom hero, and a build-a-box your customers use themselves. You don’t pay another company a monthly fee for the box.",
    fit: "Customers build the order themselves, with your limits and your cutoff.",
    story: [
      "The same starting point as Shop: a bespoke homepage, laid out for a desktop and for a phone, shaped around what you sell.",
      "Box adds the practical pieces. A postcode check, so people know you deliver to them before they start. A hero made for this offer, not a stock photo.",
      "The build-a-box is custom. Customers put their own order together. It belongs to you. You don’t pay an outside company every month to use theirs.",
    ],
    includes: [
      "Bespoke web design, curated for the products you sell",
      "A landing page, laid out for desktop and for a phone",
      "A postcode checker, so people know if you deliver to them",
      "A custom hero image, made for this offer",
      "A custom build-a-box. Customers put their own order together",
      "The box is yours. No monthly fee to an outside builder",
      "Built to be clear and easy to use, so a half-thought order is still easy to finish",
      "Set live on your domain",
    ],
    highlights: ["Everything in Shop", "Postcode check and custom hero", "Your own build-a-box, no monthly fee"],
    retainer: null,
  },
  {
    id: "complete",
    name: "Stay",
    price: 2000,
    depositUrl: "https://buy.stripe.com/cNi00c1hO3AKdrG1xZawo04",
    time: "About 4 weeks",
    featured: true,
    blurb:
      "Everything in Shop and Box, plus a weekly or monthly subscription to retain your customers, and a refresh of your current branding.",
    fit: "You want people to come back on a subscription, and you want the site to be found.",
    story: [
      "Stay includes everything in Shop and Box: the homepage, the store, a postcode check, a custom hero, and a build-a-box your customers use themselves. You still don’t pay another company for that box.",
      "A subscription sits on top, weekly or monthly, so a customer stays with the business instead of having to remember to order again.",
      "Search is part of the build. I write the copy, place the images, and set the links so the pages can be found. If you already have a brand, I refresh it so the site matches.",
    ],
    includes: [
      "Bespoke web design, curated for the products you sell",
      "A landing page, laid out for desktop and for a phone",
      "A postcode checker and a custom hero image",
      "A custom build-a-box, so customers create their own order. No fee to an outside company",
      "Subscriptions, weekly or monthly, so a customer stays with you",
      "Search engine optimisation, written around what you sell",
      "A refresh of your current branding, so the site matches the brand you have",
      "Copywriting, images, and smart links, set up so search engines can read the pages",
      "Set live on your domain",
    ],
    highlights: ["Everything in Box", "Weekly or monthly subscriptions", "Search-ready copy and a branding refresh"],
    retainer: null,
  },
];

export const practice = [
  {
    title: "Shaped to the Business",
    body: "The offer is a starting shape. The pages, the words, and the way someone orders are worked out for this business: how you deliver, what you won’t sell, and what has to happen before anything goes out the door. Nothing is dropped in from a theme.",
  },
  {
    title: "They Can Finish the Order",
    body: "The useful change is practical. People can see if you deliver, build the order, and pay on a phone, without calling you to do it for them.",
  },
  {
    title: "The Box Is Yours",
    body: "On Box and Stay, customers put the order together themselves. It is built for your menu. You don’t pay another company a monthly fee to use theirs.",
  },
  {
    title: "They Come Back",
    body: "On Stay, a customer can stay on a weekly or monthly subscription, so the next order doesn’t depend on them remembering to come back.",
  },
  {
    title: "Built to Be Found",
    body: "On Stay, the titles, descriptions, images, and links are written around what you sell. Enough that search can read the site. Not a separate marketing contract.",
  },
  {
    title: "A Handover You Can Use",
    body: "Before it goes live we sit down, in person or on a call, and I show you how orders come in, and how to change a price, a product, or a page. Partner keeps that going after launch.",
  },
];

export const timelines = [
  "As soon as you can",
  "Within a month",
  "This quarter",
  "Just looking",
] as const;

export const faqs = [
  {
    q: "Are the prices fixed?",
    a: "They’re a starting point. Prices are negotiable. Tell me the budget and I’ll shape the work so it suits what you need.",
  },
  {
    q: "Can we talk it through first?",
    a: "Yes. Book a consultation and I’ll meet you in person or on a video call before anything is built. No cost, and no deposit.",
  },
  {
    q: "How do I pay?",
    a: "25% to start, the rest when the site goes live. Spread the cost with flexible payment methods. Easier for small and new businesses. Partner, if you want it, is £150 a month for six months after launch.",
  },
  {
    q: "Will I hear from you during the build?",
    a: "Yes. While the site is in development I’m on call, near enough any time, to talk about how it’s getting on.",
  },
  {
    q: "What does Partner cover?",
    a: "£150 a month for six months after launch. I handle product and menu changes within an agreed hour a week, fix what breaks, and make one planned improvement a month. A new brand, a new sales channel, or a feature that is really a second project is quoted separately.",
  },
  {
    q: "Is this a template?",
    a: "No. Every site is bespoke, and curated for the products you sell. It is built to be clear on a desktop and on a phone, so people stay and order again. If something in the list doesn’t fit, we take it out.",
  },
  {
    q: "Where do you work?",
    a: "United Kingdom. We can meet on a video call, or in person if that suits.",
  },
  {
    q: "Do I still pay for a build-a-box tool?",
    a: "Not on Box or Stay. The box is made for your products, and it stays yours. You don’t pay an outside company a monthly fee to use one.",
  },
  {
    q: "What happens if someone leaves the checkout?",
    a: "On Stay, checkout and the follow-up are part of the build, so a half-finished order is less likely to disappear. On Shop and Box we can add that if the business needs it.",
  },
];

export function formatGBP(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function nextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return projects[0];
  return projects[(index + 1) % projects.length];
}

export const extras: {
  id: ExtraId;
  name: string;
  price: number;
  monthly?: boolean;
  detail: string;
  packages: PackageId[];
}[] = [
  {
    id: "care",
    name: "Partner",
    price: 150,
    monthly: true,
    detail:
      "Six months after launch. Product and menu changes within an agreed hour a week, fixes, and one planned improvement a month. A new brand, a new sales channel, or a second project is quoted separately.",
    packages: ["order", "box", "complete"],
  },
];

export function extrasFor(packageId: PackageId) {
  return extras.filter((item) => item.packages.includes(packageId));
}

export function isExtraId(value: unknown): value is ExtraId {
  return value === "box" || value === "copy" || value === "brand" || value === "search" || value === "care";
}

export function getPackage(id: PackageId) {
  const found = packages.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown package: ${id}`);
  return found;
}

export function quote(packageId: PackageId, selected: ExtraId[] = []) {
  const pkg = getPackage(packageId);
  const chosen = extras.filter((item) => selected.includes(item.id) && item.packages.includes(packageId));
  const addOns = chosen.filter((item) => !item.monthly);
  const build = pkg.price + addOns.reduce((sum, item) => sum + item.price, 0);
  const deposit = Math.round(build * 0.25);
  const care = chosen.find((item) => item.monthly);
  return {
    pkg,
    chosen,
    build,
    deposit,
    balance: build - deposit,
    retainer: pkg.retainer ?? (care ? { monthly: care.price, months: 6 } : null),
  };
}

export function isPackageId(value: unknown): value is PackageId {
  return value === "order" || value === "box" || value === "complete";
}
