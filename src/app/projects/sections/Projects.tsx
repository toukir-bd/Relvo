import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Clients from "@/components/sections/Clients";
import ZoomablePreview from "@/components/props/ZoomablePreview";
import { caseStudies } from "@/data/cases";

const partnerLogos: Record<string, string> = {
  "solutpro-legal-services-mobile-app": "/img/partners/p-13.webp",
  "turbienergy-wind-energy-dashboard": "/img/partners/p-18.webp",
  "musen-ai-powered-solutions": "/img/partners/p-11.webp",
  "dmeet-application": "/img/partners/p-16.webp",
  "salesramp-sales-overview": "/img/partners/p-21.webp",
  "getfit-gym-center": "/img/partners/p-1.webp",
  "quintessence-biologics": "/img/partners/p-15.webp",
  "safetech-tech-website": "/img/partners/p-10.webp",
  "accountity-accounting-management": "/img/partners/p-9.webp",
  "partnerfusion-investment-agency": "/img/partners/p-4.webp",
  "solidworks-3dexperience": "/img/partners/p-17.webp",
  "marketrics-marketing-analysis": "/img/partners/p-20.webp",
  "brightsphere-creative-agency": "/img/partners/p-5.webp",
  "ticketar-online-ticket-management": "/img/partners/p-14.webp",
  "middlestump-social-investing": "/img/partners/p-19.webp",
  "acedeal-order-payment-management": "/img/partners/p-8.webp",
  "visuaai-artificial-intelligence": "/img/partners/p-7.webp",
  "dupro-project-management": "/img/partners/p-12.webp",
  "codighost-tools-frameworks": "/img/partners/p-6.webp",
  "setwet-course-management": "/img/partners/p-2.webp",
  "crm-cashtracker-management": "/img/partners/p-3.webp"
};

type Project = (typeof caseStudies)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const logo = partnerLogos[project.slug];

  return (
    <article className="overflow-hidden rounded-[28px] bg-primary/5 sm:rounded-[34px]">
      <div className="relative aspect-[1.4/1] overflow-hidden bg-[#0b120e]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized
          priority={index < 2}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 680px"
          className="object-cover"
        />
        <span className="absolute bottom-5 left-5 rounded-full bg-secondary/75 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.85px] text-white 
          backdrop-blur-md sm:bottom-6 sm:left-6 sm:text-[14px]">
          {project.badge}
        </span>
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <ZoomablePreview
            src={project.image}
            alt={project.title}
            triggerClassName="!h-12 !w-12 !bg-[#07100c]/75 !text-white hover:!text-primary sm:!h-14 sm:!w-14"
          />
        </div>
      </div>
      <div className="p-5 sm:p-7 lg:p-8">
        <div className="mb-3 flex min-h-9 items-center justify-between gap-4">
          <h2 className="text-[clamp(1.4rem,2.5vw,1.5rem)] leading-tight tracking-normal text-white">
            {project.title}
          </h2>
          {logo ? (
            <Image
              src={logo}
              alt={`${project.title} logo`}
              width={180}
              height={48}
              className="h-8 max-w-36 object-contain brightness-0 invert opacity-90"
            />
          ) : (
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
              {project.badge}
            </span>
          )}
        </div>
        <p className="font-[400] text-sm leading-[1.5] tracking-wide text-white/60 sm:text-[17px]">
          {project.description}
        </p>
        <Link href="/#contact" className="mt-3 inline-flex items-center gap-2 text-[18px] font-[500] tracking-wide text-primary">
          Discuss a Similar Project <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <>
      <section id="all-projects" className="p-5 sm:p-28 lg:p-[4vw]">
        <div className="flex w-full flex-col gap-14 md:hidden">
          {caseStudies.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="hidden w-full grid-cols-2 items-start gap-x-12 md:grid xl:gap-x-16">
          {[0, 1].map((column) => (
            <div key={column} className={`flex flex-col gap-14 xl:gap-16 ${column === 1 ? "pt-20" : ""}`}>
              {caseStudies.map((project, index) =>
                index % 2 === column ? (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ) : null,
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="p-5 sm:p-20 lg:p-[4vw]">
        <div className="w-full relative overflow-hidden rounded-[30px] p-5 sm:rounded-[38px] sm:p-9 lg:p-12">
          <div className="inset-0 z-1 absolute flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
            style={{
              backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute right-0 left-0 mx-auto -top-16 z-10 size-[min(60vw,760px)] rounded-full bg-primary/[0.05] blur-[110px]" />
          <h2 className="mt-3 text-2xl tracking-tight sm:text-3xl text-center uppercase">
            Partners along the way
          </h2>
          <p className="mb-5 max-w-full text-sm leading-relaxed text-white/80 sm:text-base lg:text-[21px] text-center tracking-wide">
            A few of the teams and brands we’re proud to have worked alongside.
          </p>
          <Clients />
        </div>
      </section>
    </>
  );
}
