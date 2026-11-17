import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";
import AboutHero from "./sections/AboutHero";
import StudioTopics from "./sections/StudioTopics";
import StudioStory from "./sections/StudioStory";
import Principles from "./sections/Principles";
import Process from "./sections/Process";
import StudioMethod from "./sections/StudioMethod";
import CoreTeam from "./sections/CoreTeam";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Relvo Dev, a global digital design and development agency bringing strategy, design, and technology together to build useful digital products.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="overflow-x-clip bg-secondary text-white">
      <AboutHero />
      <StudioStory />
      <StudioTopics />
      <Principles />
      <Process />
      <CoreTeam />
      <StudioMethod />
    </div>
  );
}
