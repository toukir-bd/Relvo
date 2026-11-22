
import Image from "next/image";

export default function StudioStory() {
  return (
    <section id="studio" className="relative px-4 py-8 sm:px-8 sm:py-24 lg:px-20 lg:py-32 lg:px-32">
      <div className="relative grid w-full grid-cols-1 items-center gap-5 sm:gap-8 overflow-hidden rounded-[32px] bg-primary/2.5 p-5 sm:gap-10 sm:rounded-[52px] sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:p-12 xl:p-19">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.1] [background-size:3px_3px] [background-image:linear-gradient(rgba(187,255,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.15)_1px,transparent_1px)]" />
        <div>
          <p className="mb-5 sm:mb-8 text-[13px] sm:text-[19px] font-[500] uppercase tracking-[0.085em] text-primary">A focused team, shaping products aesthetically</p>
          <h2 className="focus-title text-[22px] sm:text-[clamp(2.25rem,5vw,3.8rem)] leading-[1.12] tracking-normal sm:-tracking-[2px] text-white">
            Build user centric creative products from first sketches <span className="hero-text-neon pb-1">to the final navigator</span>
          </h2>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute left-15 top-24 size-96 rounded-full bg-primary/15 blur-[90px]" />
          <p className="relative font-[500] sm:font-normal text-[15px] sm:text-base tracking-normal sm:tracking-[.85px] leading-normal text-white/85 sm:text-[20px]">
            We believe digital work is at its best when it feels simple to use and unmistakably yours. Relvo brings creative thinking and practical technology into one close, collaborative process.
          </p>
          <p className="relative mt-3 sm:mt-5 font-[500] sm:font-normal text-[15px] sm:text-base tracking-normal sm:tracking-[.85px] leading-normal text-white/85 sm:text-[20px]">
            From a fresh identity to a complete online experience, we help teams make confident decisions and move from possibility to the product that people can use.
          </p>
          <div className="relative mt-5 flex flex-wrap items-start justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <Image src="/img/elements/brand.webp" alt="" width={64} height={64} className="size-12 rounded-full object-cover sm:size-14"/>
              <span className="absolute -inset-8 rounded-full bg-primary/[0.08] blur-3xl"/>
              <div>
                <p className="font-normal tracking-wider text-2xl text-white">Relvo Dev</p>
              </div>
            </div>
            <div>
              <p className="font-medium tracking-wider text-[17px] text-white text-start sm:text-end">Made with intention</p>
              <p className="mt-1 font-[500] text-[14px] text-white/65 tracking-wider">Clear thinking. Considered craft.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


