import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AboutStudioLink from "@/components/props/AboutStudioLink";
import ServicesSideSketches from "@/components/props/ServicesSideSketches";

export default function ServicesHero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 xl:px-16">
      <div className="inset-0 -z-1 absolute flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 0.65px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 -z-10 mx-auto size-[min(58vw,720px)] rounded-full bg-primary/[0.07] blur-[100px]" />
      <ServicesSideSketches />
      <h1 className="focus-title relative z-10 max-w-6xl text-[clamp(3rem,9vw,6rem)] leading-[1.2] -tracking-[3.5px] text-center">
        <span className="hero-text-neon">services built around<br/>your next move</span>
      </h1>
      <p className="relative z-10 mt-7 max-w-4xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-[26px]">
        Choose the support you need today. We bring strategy, design, and development together to help your business move forward.
      </p>
      <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link href="/#contact" className="btn-relvo">
          <span className="btnText">Start a Conversation</span>
          <span className="iconArea"><ArrowUpRight strokeWidth={1.5} /></span>
        </Link>
        <Link href="/about" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/15 px-8
          text-[13px] font-medium text-white/85 transition-all duration-300 tracking-[0.85px] hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-3 focus-visible:outline-primary sm:min-h-[60px] sm:text-lg">
          Explore Relvo <ArrowUpRight size={24} />
        </Link>
      </div>
      <AboutStudioLink targetId="service-ui-ux-product-design" className="mt-14 inline-flex w-fit items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-primary/60 transition hover:text-primary">
        Discover what we do <ArrowDown size={16} />
      </AboutStudioLink>
    </section>
  );
}
