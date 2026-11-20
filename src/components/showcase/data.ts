/**
 * Presentation data for the home-page showcase. Facts live in `@/lib/content`;
 * this file only says where things sit on each screenshot and which phone
 * screens to show. Hotspot `x`/`y` are percentages of the desktop screenshot.
 * `feature` is the index into `project.built`.
 */
export type Hotspot = { feature: number; x: number; y: number };

export type PhoneScreen = { src: string; label: string; alt: string; fit?: "contain" };

export type ShowcaseEntry = {
  accent: string;
  colours: string[];
  hotspots: Hotspot[];
  /** Built features that live on the phone rather than the desktop shot. */
  phoneFeature?: number;
  /** Phone screen to show when that feature is picked. */
  phoneFeatureScreen?: number;
  phone: PhoneScreen[];
  /** Phone screenshot is taller than the screen, so it scrolls. */
  phoneScrolls?: boolean;
  /** Optional light-theme variant of the desktop screenshot. */
  lightImage?: string;
  /** Where the site's own theme toggle sits, if it has one. */
  themeToggle?: { x: number; y: number };
};

export const showcase: Record<string, ShowcaseEntry> = {
  "jkitchen-cooks": {
    accent: "#c9a36a",
    colours: ["#2a241c", "#efe6d6", "#8a6a3b", "#f7f1e6"],
    hotspots: [
      { feature: 0, x: 50, y: 37 },
      { feature: 1, x: 44.5, y: 57 },
      { feature: 2, x: 39.6, y: 70.4 },
      { feature: 3, x: 50, y: 65.8 },
      { feature: 4, x: 88, y: 7 },
    ],
    phone: [{ src: "/work/jkitchen-mobile.jpg", label: "Home", alt: "JKitchen Cooks on a phone, with Order Here and the delivery days." }],
  },
  "the-farmers-box": {
    accent: "#9cbf7a",
    colours: ["#1f3a2a", "#f3efe4", "#6b8f4e", "#e7d7a8"],
    hotspots: [
      { feature: 0, x: 14, y: 59 },
      { feature: 1, x: 85, y: 8.3 },
      { feature: 2, x: 40, y: 65.2 },
      { feature: 3, x: 39, y: 3.4 },
      { feature: 4, x: 63, y: 87.6 },
    ],
    phone: [{ src: "/work/farmers-box-mobile.jpg", label: "Products", alt: "The Farmers Box product list on a phone: apples, bananas, a large organic juicing box and lemons." }],
    phoneScrolls: true,
  },
  "real-food-delivered": {
    accent: "#e8833a",
    colours: ["#1b1b1b", "#f4efe6", "#c45c26", "#f7f3ec"],
    hotspots: [
      { feature: 0, x: 13.4, y: 74.7 },
      { feature: 1, x: 50, y: 2.2 },
      { feature: 2, x: 18.2, y: 27.1 },
      { feature: 3, x: 43.4, y: 83 },
    ],
    phoneFeature: 4,
    phone: [
      { src: "/work/real-food-mobile.jpg", label: "Home", alt: "Real Food Delivered on a phone: Real food. To your door., with Build Your Box and Set Calorie Plan above a strip of this week’s dishes." },
      { src: "/work/real-food-ways-mobile.jpg", label: "Two ways to order", alt: "Real Food Delivered on a phone: Two ways to eat. Same kitchen., with the Build Your Box card and a sticky Build Your Box and Calorie Plan bar." },
    ],
  },
  "the-macro-kitchen": {
    accent: "#b9cf8c",
    colours: ["#24301c", "#5a6840", "#f4efe6", "#d8bf86"],
    hotspots: [
      { feature: 0, x: 29.6, y: 8.4 },
      { feature: 1, x: 43.2, y: 71.6 },
      { feature: 2, x: 41.6, y: 83 },
      { feature: 4, x: 58.3, y: 83 },
    ],
    phoneFeature: 3,
    phoneFeatureScreen: 3,
    phone: [
      { src: "/work/macro-kitchen-mobile.jpg", label: "Home", alt: "The Macro Kitchen on a phone: The Week, Already Cooked, with Build Your Plan and Browse The Menu." },
      { src: "/work/macro-kitchen-plan-mobile.jpg", label: "Build your plan", alt: "The Macro Kitchen Build Your Plan page on a phone, with the countdown to Wednesday’s delivery and who’s eating." },
      { src: "/work/macro-kitchen-menu-mobile.jpg", label: "Menu", alt: "The Macro Kitchen menu on a phone: ten mains and five breakfasts, with a 30g+ protein filter." },
      { src: "/work/macro-kitchen-week-mobile.jpg", label: "Plan your week", alt: "The Macro Kitchen week planner on a phone: Build Muscle, five days with breakfast, and the protein and calories for each day." },
    ],
  },
  pocketplan: {
    accent: "#a9b78c",
    colours: ["#1f1d1a", "#4e5a3c", "#eae4da", "#f5f2ed"],
    hotspots: [
      { feature: 0, x: 47.2, y: 62.8 },
      { feature: 2, x: 40.2, y: 3.6 },
      { feature: 3, x: 88.6, y: 3.6 },
      { feature: 4, x: 47.6, y: 3.6 },
    ],
    phoneFeature: 1,
    phoneFeatureScreen: 2,
    phone: [
      { src: "/work/pocketplan-mobile.jpg", label: "Home", alt: "PocketPlan on a phone: Eat Well, Without The Rules, with Start your plan." },
      { src: "/work/pocketplan-recipes-mobile.jpg", label: "Library", alt: "The PocketPlan recipe library on a phone: 29 recipes live in Block 1, split by breakfast, lunch, dinner and snacks." },
      { src: "/work/pocketplan-recipe-mobile.jpg", label: "Recipes", alt: "A PocketPlan recipe card on a phone: High Protein Breakfast Burrito, 35g protein and 462 kcal." },
      { src: "/work/pocketplan-learn-mobile.jpg", label: "Learn", alt: "PocketPlan Learn guides on a phone: The Thinking Behind The Plan." },
      { src: "/work/pocketplan-train-mobile.jpg", label: "Train", alt: "Train With Pocket on a phone: what do you most want to work on?" },
    ],
  },
  zanapoli: {
    accent: "#e8692e",
    colours: ["#0f1a26", "#1a2a3c", "#f3ead8", "#e8692e"],
    hotspots: [
      { feature: 0, x: 60.1, y: 4.1 },
      { feature: 2, x: 24.4, y: 86.2 },
      { feature: 3, x: 47.6, y: 4.1 },
    ],
    phoneFeature: 1,
    phone: [
      { src: "/work/zanapoli-mobile.jpg", label: "Home", alt: "ZaNapoli on a phone: Wood-fired Napoletana, properly., with Book a table, Order collection and See the menu." },
      { src: "/work/zanapoli-story-mobile.jpg", label: "Story", alt: "ZaNapoli’s story on a phone: Dough that’s had time. A fire that doesn’t wait." },
      { src: "/work/zanapoli-menu-mobile.jpg", label: "Menu", alt: "The ZaNapoli menu on a phone: Fire, flour and patience, with red base pizzas and their prices." },
      { src: "/work/zanapoli-reviews-mobile.jpg", label: "Reviews", alt: "ZaNapoli reviews on a phone: Words from the table, with Google reviews." },
      { src: "/work/zanapoli-visit-mobile.jpg", label: "Visit", alt: "Visiting ZaNapoli on a phone: Two ovens. One recipe., with Low Fell open now and a sticky Book, Call, Directions bar." },
    ],
  },
  tayu: {
    accent: "#ff2e93",
    colours: ["#141217", "#6d2fd6", "#ff2e93", "#f4f0f6"],
    hotspots: [
      { feature: 0, x: 86.5, y: 8.1 },
      { feature: 1, x: 50, y: 2 },
      { feature: 2, x: 43, y: 8.1 },
      { feature: 3, x: 53.6, y: 8.1 },
    ],
    phone: [
      { src: "/work/tayu-mobile.jpg", label: "Home", alt: "Tayu on a phone: Come for the food. Stay for the whole thing., with Order and Book a table pinned to the bottom." },
      { src: "/work/tayu-ways-mobile.jpg", label: "Four ways", alt: "Four ways to Tayu on a phone: Book a table, Order collection, Delivery and Gift cards." },
      { src: "/work/tayu-offers-mobile.jpg", label: "Offers", alt: "Tayu offers on a phone: Happi Awa, starter, main and drink for £19." },
      { src: "/work/tayu-menu-mobile.jpg", label: "Menu", alt: "The Tayu menu on a phone: Pick your plates, with spicy, peanut and nut dishes marked." },
      { src: "/work/tayu-reviews-mobile.jpg", label: "Reviews", alt: "Tayu reviews on a phone: 4.8 on Google, 4.4 on Tripadvisor and 4.7 from DishCult diners." },
    ],
  },

};
