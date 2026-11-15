import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AboutStudioLink from "@/components/props/AboutStudioLink";

export default function ServicesHero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 xl:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-45"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 10%) 0.7px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 -z-10 mx-auto size-[min(58vw,720px)] rounded-full bg-primary/[0.09] blur-[100px]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        fill="none"
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full opacity-30 lg:block"
      >
        <defs>
          <radialGradient id="service-art-orb" cx="0" cy="0" r="1" gradientTransform="matrix(0 376 -440 0 720 634)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8FF67" stopOpacity="0.55" />
            <stop offset="0.62" stopColor="#B9FF00" stopOpacity="0.24" />
            <stop offset="1" stopColor="#8FCE00" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="720" cy="886" rx="448" ry="372" fill="url(#service-art-orb)" />
        <g stroke="#B9FF00" strokeLinecap="round" strokeLinejoin="round">
          {/* Loose brush marks echo the reference while hinting at forward motion. */}
          <path d="M90 265c28-38 70-63 126-74-27 23-49 49-66 79 32-22 68-36 108-40-31 25-67 45-109 59" strokeWidth="10" />
          <path d="m91 266 23-27m20 12 27-29m40 23 31-25" strokeOpacity="0.58" strokeWidth="5" />
          <path d="M1335 206c-31-48-76-79-136-94 28 30 50 62 65 98-35-29-74-47-119-54 31 34 69 60 114 79" strokeWidth="10" />
          <path d="m1335 206-25-34m-22 2-28-34m-37 33-35-33" strokeOpacity="0.58" strokeWidth="5" />
          <path d="M52 610c9-47 16-87 29-87 17 0 14 72 29 72 15 0 17-96 35-96 13 0 17 43 23 63" strokeWidth="11" />
          <path d="M1272 602c9-47 16-87 29-87 17 0 14 72 29 72 15 0 17-96 35-96 13 0 17 43 23 63" strokeWidth="11" />
        </g>
      </svg>
      <h1 className="focus-title max-w-5xl text-[clamp(3rem,9vw,6.2rem)] font-semibold leading-[1] tracking-normal">
        services built around <span className="hero-text-neon pb-3 pe-1">your next move</span>
      </h1>
      <p className="mt-7 max-w-5xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-[26px]">
        Choose the support you need today. We bring strategy, design, and development together to help your business move forward.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link href="/#contact" className="btn-relvo">
          <span className="btnText">Start a conversation</span>
          <span className="iconArea"><ArrowUpRight strokeWidth={1.5} /></span>
        </Link>
        <Link href="/about" className="inline-flex min-h-12 items-center gap-2 rounded-[12px] border border-white/15 px-6 
          text-[13px] font-medium text-white/75 transition-all duration-300 hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 
          focus-visible:outline-offset-3 focus-visible:outline-primary sm:min-h-[60px] sm:text-lg">
          Explore Relvo <ArrowUpRight size={17} />
        </Link>
      </div>

      <AboutStudioLink targetId="service-ui-ux-product-design" className="mt-14 inline-flex w-fit items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-white/45 transition hover:text-primary">
        Discover what we do <ArrowDown size={16} />
      </AboutStudioLink>
    </section>
  );
}
