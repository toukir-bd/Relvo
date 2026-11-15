import Image from "next/image";



export default function StudioStory() {
  return (
    <section id="studio" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-20 lg:py-32 lg:px-32">
        <div className="grid w-full items-center gap-10 rounded-[32px] border border-white/[0.07] bg-[#111915] p-6 sm:gap-14 sm:rounded-[40px] sm:p-10 grid-cols-[1.3fr_1fr] lg:p-19">
          <div>
            <p className="mb-8 text-[19px] font-[500] uppercase tracking-[0.085em] text-primary">A focused team, shaping products aesthetically</p>
            <h2 className="focus-title text-[clamp(3rem,5vw,4.3rem)] font-semibold leading-[1.1] tracking-normal text-white">
              thoughtful design and development, from the first <span className="hero-text-neon">sketch to final navigation</span>
            </h2>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-primary/[0.08] blur-3xl"/>
            <p className="relative text-base tracking-[.85px] leading-normal text-white/85 sm:text-[20px]">
              We believe digital work is at its best when it feels simple to use and unmistakably yours. Relvo brings creative thinking and practical technology into one close, collaborative process.
            </p>
            <p className="relative mt-5 text-base tracking-[.85px] leading-normal text-white/85 sm:text-[20px]">
              From a fresh identity to a complete online experience, we help teams make confident decisions and move from possibility to the product that people can use.
            </p>
            <div className="relative mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <Image src="/img/elements/brand.webp" alt="" width={64} height={64} className="size-12 rounded-xl object-cover sm:size-14"/>
                <span className="absolute -inset-8 rounded-full bg-primary/[0.08] blur-3xl"/>
                <div>
                  <p className="font-normal tracking-wider text-2xl text-white">Relvo Dev</p>
                </div>
              </div>
              <div>
                <p className="font-medium tracking-wider text-[16px] text-white text-end">Made with intention</p>
                <p className="mt-1 font-medium text-[14px] text-white/65 tracking-wider">Clear thinking. Considered craft.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}


