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
        viewBox="0 0 1520 560"
        fill="none"
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full opacity-[0.12] lg:block"
      >
        <g stroke="rgb(187 255 0)" strokeLinecap="round" strokeLinejoin="round">
          {/* Hand-drawn website layout */}
          <path d="m86 172 310-13c12 0 20 8 20 20l-5 183c0 12-8 20-20 20l-309 12c-12 0-20-8-20-20l5-182c0-12 8-20 19-20Z" strokeWidth="7" />
          <path d="m66 219 344-13m-297 2-1 145m30-105 93-3m-92 34 74-3m-73 34 61-2m41-68 126-5m-126 37 120-5m-119 37 98-4" strokeWidth="6" />
          <circle cx="91" cy="195" r="4" fill="rgb(187 255 0)" strokeWidth="5" />
          <circle cx="110" cy="194" r="4" fill="rgb(187 255 0)" strokeWidth="5" />
          <circle cx="129" cy="193" r="4" fill="rgb(187 255 0)" strokeWidth="5" />
          {/* App screen and a hand-drawn pointer */}
          <path d="m1221 177 192-8c12 0 20 8 20 20l8 178c1 12-7 20-19 21l-192 8c-12 0-20-8-20-20l-8-178c0-12 7-20 19-21Z" strokeWidth="7" />
          <path d="m1258 221 91-4m-89 29 122-5m-120 36 50-2m-46 57 107-5m-105 30 77-3" strokeWidth="6" />
          <path d="m1403 120 8 26 24-11-32 55-1-31-25 11 26-50Z" fill="rgb(187 255 0 / 12%)" strokeWidth="6" />
          <path d="m1367 399 6 17 17 6-17 6-6 17-6-17-17-6 17-6 6-17Z" strokeWidth="6" />
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
