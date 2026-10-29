export type Testimonial = {
  quote: string;
  attribution: string;
  project?: string;
};

// Real quotes only. Add an entry when a client sends one, and keep the wording as they wrote it.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Lewis pays a lot of detail and attention to everything he does. The site was initially made and any changes I asked for were done, and done quickly. The aftercare was also brilliant!",
    attribution: "Founder, Real Food Delivered",
    project: "real-food-delivered",
  },
  // {
  //   quote: "…",
  //   attribution: "Founder, JKitchen Cooks",
  //   project: "jkitchen-cooks",
  // },
];
