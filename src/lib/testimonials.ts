export type Testimonial = {
  quote: string;
  attribution: string;
  project?: string;
};

// Real quotes only. Add an entry when a client sends one, and keep the wording as they wrote it.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Lewis pays a lot of attention to detail in everything he does. Once the site was built, any changes I asked for were done, and done quickly. The aftercare was brilliant too!",
    attribution: "James, founder of Real Food Delivered",
    project: "real-food-delivered",
  },
  // {
  //   quote: "…",
  //   attribution: "Founder, JKitchen Cooks",
  //   project: "jkitchen-cooks",
  // },
];
