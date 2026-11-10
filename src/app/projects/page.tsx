import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Clients from "@/components/sections/Clients";
import ZoomablePreview from "@/components/props/ZoomablePreview";
import { caseStudies } from "@/data/cases";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects and Case Studies",
  description:
    "Explore websites, software, apps, and digital product case studies by Relvo Dev in Bangladesh.",
  alternates: { canonical: `${SITE_URL}/projects` },
};

const partnerLogos: Record<string, string> = {
  "getfit-gym-center": "/img/partners/p-1.webp",
  "safetech-tech-website": "/img/partners/p-10.webp",
  "musen-ai-powered-solutions": "/img/partners/p-11.webp",
  "quintessence-biologics": "/img/partners/p-15.webp",
  "dmeet-application": "/img/partners/p-16.webp",
  "middlestump-social-investing": "/img/partners/p-19.webp",
  "salesramp-sales-overview": "/img/partners/p-21.webp",
};

export default function ProjectsPage() {
  return (
    <div className="overflow-hidden bg-[#081111] text-white">
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-[8vw] lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 9%) 0.7px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-16 -z-10 size-[min(60vw,760px)] rounded-full bg-primary/[0.09] blur-[110px]" />
        <div className="w-full">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary/70" /> Selected work
          </p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="focus-title max-w-5xl text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              Ideas made <span className="hero-text-neon">real.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              A collection of digital experiences, interfaces, and products shaped around a simple idea: make the useful feel unmistakable.
            </p>
          </div>
          <a href="#all-projects" className="mt-9 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/45 transition hover:text-primary">
            Browse all {caseStudies.length} projects <ArrowDown size={15} />
          </a>
        </div>
      </section>

      <section id="all-projects" className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-[8vw]">
        <div className="grid w-full gap-6 md:grid-cols-2 xl:gap-8">
          {caseStudies.map((project, index) => {
            const logo = partnerLogos[project.slug];

            return (
              <article
                key={project.slug}
                className="group overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#111915] transition duration-300 hover:-translate-y-1 hover:border-primary/30 sm:rounded-[34px]"
              >
                <div className="relative aspect-[1.55/1] overflow-hidden bg-[#0b120e]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    priority={index < 2}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 680px"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
                  <span className="absolute bottom-5 left-5 max-w-[70%] rounded-full border border-white/15 bg-[#07100c]/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary backdrop-blur-md sm:bottom-6 sm:left-6 sm:text-xs">
                    {project.badge}
                  </span>
                  <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                    <ZoomablePreview
                      src={project.image}
                      alt={project.title}
                      title={project.title}
                      description={project.description}
                      triggerClassName="!h-12 !w-12 !bg-[#07100c]/75 !text-white hover:!text-primary sm:!h-14 sm:!w-14"
                    />
                  </div>
                </div>

                <div className="p-5 sm:p-7 lg:p-8">
                  <div className="mb-5 flex min-h-9 items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.18em] text-white/35">{String(index + 1).padStart(2, "0")}</span>
                    {logo ? (
                      <Image
                        src={logo}
                        alt={`${project.title} logo`}
                        width={180}
                        height={48}
                        className="h-8 max-w-36 object-contain brightness-0 invert opacity-90"
                      />
                    ) : (
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">{project.badge}</span>
                    )}
                  </div>
                  <h2 className="max-w-2xl text-[clamp(1.4rem,2.5vw,2rem)] font-semibold leading-tight tracking-[-0.025em] text-white">
                    {project.title}
                  </h2>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/60 sm:text-base">
                    {project.description}
                  </p>
                  <Link
                    href={`/#contact`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                  >
                    Discuss a similar project <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-[8vw]">
        <div className="w-full rounded-[30px] border border-white/[0.07] bg-[#101713] p-5 sm:rounded-[38px] sm:p-9 lg:p-12">
          <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Good company</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Partners along the way</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/50">A few of the teams and brands we’re proud to have worked alongside.</p>
          </div>
          <Clients />
        </div>
      </section>
    </div>
  );
}
