import type { Metadata } from "next";
import ProjectsHero from "./sections/ProjectsHero";
import Projects from "./sections/Projects";
import Faq from "@/components/sections/Faq";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Best Projects",
  description:
    "Explore Relvo Dev's websites, software, apps, and digital product projects, designed and developed for businesses worldwide.",
  alternates: { canonical: `${SITE_URL}/projects` },
};

export default function ProjectsPage() {
  return (
    <div className="overflow-x-clip bg-[#081111] text-white">
      <ProjectsHero />
      <Projects />
      <Faq />
    </div>
  );
}
