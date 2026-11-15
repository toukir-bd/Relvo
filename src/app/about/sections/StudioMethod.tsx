import Image from "next/image";

export default function StudioMethod() {
  return (
    <section aria-labelledby="studio-method-title" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 opacity-45" 
        style={{ 
          backgroundImage: "linear-gradient(rgb(187 255 0 / 0%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 15%) 1px, transparent 1px)", 
          backgroundSize: "4px 4px" 
        }} 
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 mx-auto bottom-0 z-10 size-[min(58vw,720px)] rounded-full bg-primary/[0.15] blur-[100px]"/>
      <div className="mx-auto flex w-full flex-col items-center text-center">
        <h4 id="studio-method-title" className="focus-title mt-5 max-w-5xl text-[clamp(2.7rem,5.6vw,5.4rem)] font-semibold leading-[0.98] tracking-normal">
          a clear path through <span className="hero-text-neon pb-1">development.</span>
        </h4>
        <p className="mt-6 max-w-5xl text-base leading-relaxed text-white/90 sm:text-[22px] sm:leading-8">
          We look closely before we build. Briefings, research, interviews, and prototypes help us turn early ideas into clear product decisions and experiences that feel right for the people using them.
        </p>
        <figure className="mx-auto mt-10 w-full max-w-[1200px] sm:mt-14">
          <Image
            src="/img/elements/tags.png"
            alt="A visual map of the discovery and design work behind a digital product, from briefing and research to prototypes and a final concept."
            width={1600}
            height={530}
            sizes="90vw"
            className="mx-auto h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
