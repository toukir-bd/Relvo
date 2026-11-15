import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AboutStudioLink from "@/components/props/AboutStudioLink";

export default function AboutHero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col justify-center items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 xl:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-45"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 10%) 0.7px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 mx-auto top-0 -z-10 size-[min(58vw,720px)] rounded-full bg-primary/[0.09] blur-[100px]"/>
        <h1 className="focus-title max-w-6xl text-[clamp(3rem,9vw,6.2rem)] font-semibold leading-[1] tracking-tight text-center">
          we turn good ideas into <span className="hero-text-neon pb-3 pe-1">digital experiences</span>
        </h1>
        <p className="mt-7 max-w-4xl text-base leading-relaxed text-center text-white/85 sm:text-lg lg:text-[26px]">
          Relvo is a digital studio bringing strategy, design, and development together to help ambitious ideas find their place in the world.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/#contact" className="btn-relvo">
            <span className="btnText">Start a conversation</span>
            <span className="iconArea">
              <ArrowUpRight strokeWidth={1.5}/>
            </span>
          </Link>
          <Link href="/services" className="inline-flex min-h-12 items-center rounded-[12px] border border-white/15 px-6 text-[13px] font-[500] text-white/75 transition-all duration-300 hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary sm:min-h-[60px] sm:text-lg">
            Explore services
          </Link>
        </div>
        <AboutStudioLink className="mt-14 inline-flex w-fit items-center gap-2 text-[14px] font-[600] uppercase tracking-[0.18em] text-white/45 transition hover:text-primary">
          Discover Relvo Dev <ArrowDown size={16} />
        </AboutStudioLink>
      </section>
  );
}


