import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";
import AboutHero from "./sections/AboutHero";
import StudioTopics from "./sections/StudioTopics";
import StudioStory from "./sections/StudioStory";
import Principles from "./sections/Principles";
import Process from "./sections/Process";
import AboutCTA from "./sections/AboutCTA";

export const metadata: Metadata = {
  title: "About Relvo Dev",
  description:
    "Relvo Dev believe digital work is at its best when it feels simple to use and unmistakably yours. Relvo brings creative thinking and practical technology into one close, collaborative process.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-[#081111] text-white">
      <AboutHero />
      <StudioTopics />
      <StudioStory />
      <Principles />
      <Process />
      <AboutCTA />
    </div>
  );
}
