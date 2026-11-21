import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function ProjectsHero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-50 lg:px-[6vw] lg:pb-34">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 30%) 0.7px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 left-0 mx-auto top-30 -z-10 size-[min(60vw,760px)] rounded-full bg-primary/[0.09] blur-[110px]" />
      <div className="w-full">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-7xl">
            <h1 className="focus-title w-full text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              ideas made <span className="hero-text-neon pe-1">real.</span>
            </h1>
            <Link href="#all-projects" className="ms-1 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/45 transition 
              hover:text-primary sm:mt-8 sm:text-[13px]">
              Browse The Best Projects <ArrowDown size={15} />
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed tracking-[.5px] text-white/80 sm:text-[23px]">
            A collection of digital experiences, interfaces, and products shaped around a simple idea: make the useful feel unmistakable.
          </p>
        </div>
      </div>
    </section>
  );
}
