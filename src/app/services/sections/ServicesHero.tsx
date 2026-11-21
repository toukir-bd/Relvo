import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AboutStudioLink from "@/components/props/AboutStudioLink";
import ServicesHeroArtwork from "./ServicesHeroArtwork";

export default function ServicesHero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden px-5 pb-14 pt-28 text-white sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:py-20 xl:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-45"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 0.65px, transparent 1px)",
          backgroundSize: "4px 4px",
          maskImage: "linear-gradient(to right, black, transparent 92%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-[20%] -z-10 size-[32rem] rounded-full bg-primary/[0.08] blur-[120px]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-[1680px] items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-6 xl:gap-12">
        <div className="relative z-10 py-8 lg:py-12">
          <h1 className="focus-title text-[clamp(3rem,7.3vw,5.3rem)] leading-[0.99] -tracking-[3px]">
            services built around <span className="hero-text-neon pe-1">your next move</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-base leading-relaxed tracking-wide text-white/75 sm:mt-8 sm:text-xl lg:text-[23px]">
            Choose the support you need today. We bring strategy, design, and development together to help your business move forward.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Link href="/#contact" className="btn-relvo">
              <span className="btnText">Start a Conversation</span>
              <span className="iconArea"><ArrowUpRight strokeWidth={1.5} /></span>
            </Link>
            <Link href="/about" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/15 px-6 text-[13px] font-medium tracking-[0.7px] text-white/85 transition-colors duration-300 hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary sm:min-h-[60px] sm:px-8 sm:text-base">
              Explore Relvo <ArrowUpRight size={20} />
            </Link>
          </div>

          <AboutStudioLink targetId="service-ui-ux-product-design" className="ms-1 mt-9 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/45 transition hover:text-primary sm:mt-12 sm:text-[13px]">
            Discover what we do <ArrowDown size={15} />
          </AboutStudioLink>
        </div>

        <div className="relative z-0 mx-auto w-full max-w-[680px] lg:max-w-none">
          <ServicesHeroArtwork />
        </div>
      </div>
    </section>
  );
}
