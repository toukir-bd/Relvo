import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Web Design, Development & Software Services",
  description:
    "Explore Relvo Dev’s UI/UX design, website development, e-commerce, branding, and custom software services in Bangladesh.",
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
