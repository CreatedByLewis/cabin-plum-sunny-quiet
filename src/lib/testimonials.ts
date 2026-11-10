export type Testimonial = {
  name: string;
  /** Who they are, shown under the name. Only what the review itself says. */
  business?: string;
  /** Project slug, so the showcase can show a line from it next to that project. */
  project?: string;
  rating: number;
  title: string;
  /** The review exactly as it was written, one paragraph per entry. */
  body: string[];
  /** A sentence lifted word for word from the body, for tight spots. */
  excerpt?: string;
  date: string;
  dateLabel: string;
};

export const TRUSTPILOT_URL = "https://uk.trustpilot.com/review/createdbylewis.com";

// Copied from Trustpilot. Keep the wording exactly as the reviewer wrote it.
export const testimonials: Testimonial[] = [
  {
    name: "James McCormick",
    business: "The Macro Kitchen",
    project: "the-macro-kitchen",
    rating: 5,
    title: "Exceptional Service",
    body: [
      "Exceptional Service – Highly Recommended",
      "After almost two years of trying to get our website completed, and being let down by three previous developers, working with Lewis has been an entirely different experience.",
      "From our initial conversation, Lewis demonstrated an exceptional level of professionalism, knowledge and commitment. Within just two weeks, he had successfully designed, developed and launched The Macro Kitchen’s website, delivering exactly what we had envisioned.",
      "What has impressed me most is his attention to detail, communication and willingness to go above and beyond. Nothing has ever been too much trouble even weekends, late nights and early mornings even after the website launched, Lewis has continued to accommodate additional requests and changes promptly and efficiently.",
      "His technical ability and understanding of website development are genuinely impressive. What sets Lewis apart is not just his talent, he has been a pleasure to work with, he is approachable, reliable, patient and It’s clear that he takes genuine pride in delivering the highest standard of work for his clients.",
      "I am extremely pleased with our new website and look forward to continuing to work with Lewis as The Macro Kitchen grows.",
      "I would highly recommend Lewis to any individual or business looking for a talented, trustworthy and highly professional website developer.",
      "Thank you, Lewis, for your outstanding work.",
    ],
    excerpt:
      "Within just two weeks, he had successfully designed, developed and launched The Macro Kitchen’s website, delivering exactly what we had envisioned.",
    date: "2026-11-07",
    dateLabel: "7 November 2026",
  },
  {
    name: "Real Food Delivered",
    project: "real-food-delivered",
    rating: 5,
    title: "Couldn't recommend more!",
    body: [
      "Working with Lewis to fully change our website for Real Food Delivered has been a fantastic experience from start to finish.",
      "After having the same website for the past 6 years we knew that it was time for a change. Through a number of meetings and phone calls Lewis went above and beyond what we could expect to make what we wanted come into reality.",
      "He has a great eye for detail & has been very helpful with adding his own creative ideas to make our website have some incredible features that makes it a better and easier experience for our customers placing their orders!",
      "We’d most definitely recommend Lewis to anyone thinking about getting a new website or redesigning a current site.",
      "We are looking forward to work with Lewis in the future to continue and develop Real Food Delivered.",
    ],
    excerpt:
      "Working with Lewis to fully change our website for Real Food Delivered has been a fantastic experience from start to finish.",
    date: "2026-10-31",
    dateLabel: "31 October 2026",
  },
  {
    name: "Maxi Nourish",
    rating: 5,
    title: "Easy, Quick, Great Job",
    body: [
      "Really happy with the service from start to finish. Professional, helpful and efficient. The website looks fantastic, and I couldn’t be happier with the result. Would highly recommend!",
    ],
    date: "2026-11-08",
    dateLabel: "8 November 2026",
  },
];
