export type ServiceOption = {
  id: string;
  number: string;
  name: string;
  headline: string;
  description: string;
  deliverables: string[];
  image: string;
};

export const serviceOptions: ServiceOption[] = [
  {
    id: "brand-strategy-identity",
    number: "01",
    name: "Brand Strategy & Identity",
    headline: "Create a clear,\nmemorable brand.",
    description:
      "Define your position, sharpen your story, and build a distinctive identity that stays consistent as your business grows.",
    deliverables: ["Positioning & strategy", "Naming & messaging", "Visual identity", "Brand guidelines"],
    image: "/img/services/s-1.webp",
  },
  {
    id: "ui-ux-product-design",
    number: "02",
    name: "UI/UX & Product Design",
    headline: "Make apps and sites\neasy to use.",
    description:
      "Turn customer needs into intuitive websites and products with thoughtful user journeys and a flexible design system.",
    deliverables: ["UX research & flows", "Wireframes", "Interface design", "Prototypes & design systems"],
    image: "/img/services/s-3.webp",
  },
  {
    id: "website-design-development",
    number: "03",
    name: "Website Design & Development",
    headline: "Build a website\nfor your business.",
    description:
      "Launch a polished marketing website that feels right on every screen and is simple for your team to manage.",
    deliverables: ["Website design", "Responsive development", "CMS integration", "Accessibility & performance"],
    image: "/img/services/s-2.webp",
  },
  {
    id: "ecommerce-development",
    number: "04",
    name: "E-commerce Design & Development",
    headline: "Sell online with\na simple store.",
    description:
      "Create a smooth storefront and checkout experience that helps customers find the right products and complete a purchase.",
    deliverables: ["Storefront design", "Shopify development", "Checkout optimization", "Payments & integrations"],
    image: "/img/services/s-4.webp",
  },
  {
    id: "web-applications",
    number: "05",
    name: "Web Application Development",
    headline: "Build the online tools\nyour business needs.",
    description:
      "Design and build custom web applications that make your service easier to use and your operations easier to scale.",
    deliverables: ["SaaS platforms", "Dashboards & portals", "API integrations", "Secure, scalable builds"],
    image: "/img/services/s-5.webp",
  },
  {
    id: "motion-interactive-design",
    number: "06",
    name: "Motion & Interactive Design",
    headline: "Add motion and\ninteraction to your site.",
    description:
      "Use motion and interaction with purpose to guide attention, explain ideas, and make your brand more engaging.",
    deliverables: ["Motion systems", "Micro-interactions", "Interactive storytelling", "Campaign experiences"],
    image: "/img/services/s-6.webp",
  },
];

export const serviceNames = serviceOptions.map((service) => service.name);
