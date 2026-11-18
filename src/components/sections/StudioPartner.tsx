import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StudioResearchArtwork from "@/components/props/StudioResearchArtwork";

export default function StudioPartner() {
  return (
    <section aria-labelledby="studio-partner-title" className="px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-32 lg:py-32">
      <div className="mx-auto grid w-full max-w-none overflow-hidden rounded-[28px] bg-primary/2.5 sm:rounded-[36px] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden p-7 sm:p-12 lg:p-16 xl:p-[4.5rem]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.11] [background-size:4px_4px] [background-image:linear-gradient(rgba(187,255,0,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.25)_1px,transparent_1px)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-24 size-96 rounded-full bg-primary/15 blur-[90px]" />
          <div className="relative mb-8">
            <h2 id="studio-partner-title" className="focus-title text-[clamp(3rem,6.2vw,5rem)] font-semibold leading-[1] tracking-normal">
              the team behind <span className="hero-text-neon pb-2">your digital products</span>
            </h2>
          </div>
          <p className="mb-10 self-center text-[20px] leading-[1.75] text-white/70 tracking-[0.85px] sm:text-[26px] sm:leading-[1.6] border-t border-primary/[0.08] pt-5">
            Our designers and developers collaborate closely to create <strong className="font-semibold text-white">digital products that meet real business goals</strong>, with creative design, reliable technology, and a clear path forward
          </p>
          <Link href="/#contact" className="btn-relvo">
            <span className="btnText">
              Discuss Your Project
            </span>
            <span className="iconArea">
              <ArrowUpRight strokeWidth={1.5} />
            </span>
          </Link>
        </div>
        <div className="relative min-h-[400px] overflow-hidden sm:min-h-[520px] lg:min-h-full">
          <div aria-hidden="true" className="studio-partner-artwork" />
          <StudioResearchArtwork />
        </div>
      </div>
    </section>
  );
}
