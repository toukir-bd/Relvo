import Image from "next/image";



export default function StudioStory() {
  return (
    <section id="studio" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-16">
        <div className="grid w-full items-center gap-10 rounded-[32px] border border-white/[0.07] bg-[#111915] p-6 sm:gap-14 sm:rounded-[40px] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Small team. Big-picture thinking.</p>
            <h2 className="focus-title mt-5 max-w-3xl text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
              Thoughtful work, from the first sketch to the final pixel.
            </h2>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-primary/[0.08] blur-3xl" />
            <p className="relative text-base leading-relaxed text-white/65 sm:text-lg">
              We believe digital work is at its best when it feels simple to use and unmistakably yours. Relvo brings creative thinking and practical technology into one close, collaborative process.
            </p>
            <p className="relative mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
              From a fresh identity to a complete online experience, we help teams make confident decisions and move from possibility to something people can use.
            </p>
            <div className="relative mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <Image src="/img/elements/brand.webp" alt="" width={64} height={64} className="size-12 rounded-xl object-cover sm:size-14" />
              <div>
                <p className="font-semibold text-white">Made with intention</p>
                <p className="mt-1 text-sm text-white/45">Clear thinking. Considered craft.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}


