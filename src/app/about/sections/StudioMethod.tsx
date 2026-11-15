import Image from "next/image";

export default function StudioMethod() {
  return (
    <section aria-labelledby="studio-method-title" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
      <div className="mx-auto flex w-full flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">The way we explore</p>
        <h4 id="studio-method-title" className="focus-title mt-5 max-w-5xl text-[clamp(2.7rem,5.6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Great work starts with <span className="hero-text-neon">good questions.</span>
        </h4>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-lg sm:leading-8">
          We look closely before we build. Briefings, research, interviews, and prototypes help us turn early ideas into clear product decisions—and experiences that feel right for the people using them.
        </p>
        <figure className="mx-auto mt-10 w-full max-w-[1200px] sm:mt-14">
          <Image
            src="/img/elements/tags.png"
            alt="A visual map of the discovery and design work behind a digital product, from briefing and research to prototypes and a final concept."
            width={1666}
            height={544}
            sizes="100vw"
            className="mx-auto h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
