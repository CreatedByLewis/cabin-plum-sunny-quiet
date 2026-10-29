import type { PackageId } from "@/lib/content";

export type HasSite = "yes" | "no";
export type JobId = "ordering" | "box" | "full";
export type BrandChoice = "site" | "works";
export type Meeting = "person" | "video" | "either";

export type EstimateAnswers = {
  hasSite: HasSite | null;
  job: JobId | null;
  brand: BrandChoice | null;
};

export const meetings: { id: Meeting; title: string; detail: string }[] = [
  { id: "person", title: "In person", detail: "Wherever suits. Or we do it on a call." },
  { id: "video", title: "Video call", detail: "We go through it on a call." },
  { id: "either", title: "Either is fine", detail: "I’ll fit around how you want to talk." },
];

export function jobsFor(_hasSite: HasSite | null) {
  return [
    {
      id: "ordering" as const,
      title: "A home page and a store",
      detail: "People land, look, and buy. That’s Shop.",
    },
    {
      id: "box" as const,
      title: "A custom build-a-box",
      detail: "Customers build the order themselves, with a postcode check and a hero made for the offer.",
    },
    {
      id: "full" as const,
      title: "The box, and a subscription",
      detail: "Everything in Shop and Box, plus a weekly or monthly subscription to retain your customers, and a refinement or rebrand of your business.",
    },
  ];
}

export function recommend(answers: EstimateAnswers): PackageId | null {
  if (answers.job === "ordering") return "order";
  if (answers.job === "box") return "box";
  if (answers.job === "full") return "complete";
  return null;
}

export function why(id: PackageId) {
  if (id === "order") return "Shop. A homepage and a store, so people can buy what you sell.";
  if (id === "box") return "Box. A postcode check, a custom hero, and a build-a-box you own.";
  return "Stay. Everything in Shop and Box, plus a weekly or monthly subscription to retain your customers, and a refinement or rebrand of your business.";
}
