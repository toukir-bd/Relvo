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
  title: "Relvo Dev - About Us - About Relvo Dev",
  description:
    "Relvo Dev believe digital products is at its best when it feels simple to use and unmistakably yours. Relvo brings creative thinking and practical technology into one close, collaborative process.",
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
