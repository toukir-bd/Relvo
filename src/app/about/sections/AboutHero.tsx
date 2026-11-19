import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AboutStudioLink from "@/components/props/AboutStudioLink";
import StudioSideSketches from "@/components/props/StudioSideSketches";

export default function AboutHero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col justify-center items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 xl:px-16">
        <div className="inset-0 -z-1 absolute flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 mx-auto top-0 -z-10 size-[min(58vw,720px)] rounded-full bg-primary/[0.09] blur-[100px]"/>
        <StudioSideSketches />
        <h1 className="focus-title relative z-10 max-w-6xl text-[clamp(3rem,9vw,6rem)] leading-[1.2] -tracking-[3.5px] text-center">
          <span className="hero-text-neon">we turn good ideas into<br/>digital experiences</span>
        </h1>
        <p className="relative z-10 mt-7 max-w-4xl text-base leading-relaxed text-center text-white/85 sm:text-lg lg:text-[26px]">
          Relvo is a digital studio bringing strategy, design, and development together to help ambitious ideas find their place in the world.
        </p>
        <div className="relative z-10 mt-9 flex flex-wrap items-center gap-4">
          <Link href="/#contact" className="btn-relvo">
            <span className="btnText">Start a Conversation</span>
            <span className="iconArea">
              <ArrowUpRight strokeWidth={1.5}/>
            </span>
          </Link>
          <Link href="/services" className="inline-flex min-h-12 gap-2 items-center rounded-full border border-primary/15 px-8 text-[13px] font-[500] text-white/85 transition-all
          duration-300 hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary
          sm:min-h-[60px] sm:text-lg tracking-[0.85px]">
            Explore Services <ArrowUpRight size={24} />
          </Link>
        </div>
        <AboutStudioLink className="relative z-10 mt-14 inline-flex w-fit items-center gap-2 text-[14px] font-[600] uppercase tracking-[0.18em] text-primary/60 transition hover:text-primary">
          Discover Relvo Dev <ArrowDown size={16} />
        </AboutStudioLink>
      </section>
  );
}

