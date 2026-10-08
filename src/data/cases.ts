export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  badge: string;
  tags: string[];
  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "discovery-research",
    title: "Discovery & Research",
    description:
      "We learn about your goals, audience, and the problem you need to solve.",
    badge: "RESEARCH",
    tags: ["Strategy", "+02"],
    image:
      "https://cdn.dribbble.com/userupload/18432047/file/61209f0165bce5592e77557279b1fa71.png",
  },
  {
    slug: "wireframing-prototyping",
    title: "Wireframing & Prototyping",
    description:
      "We map the experience and test the flow before moving into visual design.",
    badge: "PROTOTYPE",
    tags: ["User flow", "+03"],
    image:
      "https://cdn.dribbble.com/userupload/17175833/file/8704bbdd0945bfe0c8a4287dacf26d7a.png",
  },
  {
    slug: "design",
    title: "Design",
    description:
      "We bring your brand to life with engaging, visually compelling designs.",
    badge: "VISUAL DESIGN",
    tags: ["UI design", "+04"],
    image:
      "https://cdn.dribbble.com/userupload/17955896/file/334f3b95d077484a133fb5590105f943.png",
  },
  {
    slug: "developer",
    title: "Developer Handoff",
    description:
      "You receive organized, developer-ready Figma files for implementation.",
    badge: "HANDOFF",
    tags: ["Figma", "+02"],
    image:
      "https://cdn.dribbble.com/userupload/45196271/file/0bad1973744fc83606e5de989fbd0c47.png",
  },
  {
    slug: "developer-handoff",
    title: "Developer Handoff",
    description:
      "You receive organized, developer-ready Figma files for implementation.",
    badge: "HANDOFF",
    tags: ["Figma", "+02"],
    image:
      "https://cdn.dribbble.com/userupload/18095756/file/017493df6748d7a0d65b2fc71df6e686.png",
  },
];