import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";
import ServicesHero from "./sections/ServicesHero";
import Services from "./sections/Services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Relvo Dev’s UI/UX design, website development, e-commerce, branding, and custom software services for businesses worldwide.",
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  return (
    <main className="bg-secondary text-white">
      <ServicesHero />
      <Services />
    </main>
  );
}
