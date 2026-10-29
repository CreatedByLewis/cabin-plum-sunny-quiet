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
      { feature: 2, x: 62, y: 3.4 },
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
    phone: [{ src: "/work/farmers-box-mobile.png", label: "Products", alt: "The Farmers Box product list on a phone: apples, bananas, lemons and boxes." }],
    phoneScrolls: true,
  },
  "real-food-delivered": {
    accent: "#e8833a",
    colours: ["#1b1b1b", "#f4efe6", "#c45c26", "#f7f3ec"],
    hotspots: [
      { feature: 0, x: 50, y: 51.5 },
      { feature: 1, x: 32, y: 85 },
      { feature: 2, x: 50, y: 25 },
      { feature: 3, x: 86.8, y: 3.7 },
    ],
    phoneFeature: 4,
    phone: [{ src: "/work/real-food-mobile.jpg", label: "Home", alt: "Real Food Delivered on a phone, with Build Your Box and Set Calorie Plan." }],
    lightImage: "/work/real-food-light.jpg",
    themeToggle: { x: 93, y: 3.7 },
  },
  trackr: {
    accent: "#8b7cf7",
    colours: ["#111114", "#8b7cf7", "#1c1c22", "#f3f2ef"],
    hotspots: [
      { feature: 0, x: 16, y: 19 },
      { feature: 1, x: 36, y: 65 },
      { feature: 2, x: 45, y: 40 },
    ],
    phoneFeature: 3,
    phone: [
      { src: "/work/trackr-mobile.jpg", label: "Diary", alt: "Trackr diary on a phone: Tuesday, 2,230 kcal remaining." },
      { src: "/work/trackr-today.jpg", label: "Today", alt: "Trackr today screen: 1,640 of 2,200 kcal eaten, with protein, carbs and fat." , fit: "contain" },
      { src: "/work/trackr-log.jpg", label: "Add a meal", alt: "Trackr add a meal screen: grilled chicken, white rice and broccoli." , fit: "contain" },
      { src: "/work/trackr-order.jpg", label: "Order", alt: "Trackr order screen: meals from the kitchen, added to a box." , fit: "contain" },
      { src: "/work/trackr-week.jpg", label: "Week", alt: "Trackr week screen: a bar chart of daily calories and protein days hit." , fit: "contain" },
    ],
  },
};
