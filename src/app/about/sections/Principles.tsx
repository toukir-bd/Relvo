import { ArrowUpRight, Compass, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";

const principles = [
  { number: "01", title: "Clarity before complexity", description: "We make space to understand the real challenge, then shape a simple direction everyone can get behind.", icon: Compass },
  { number: "02", title: "Design with the purpose", description: "Every detail should help people understand, trust, or use your product. We make the visual choices count.", icon: Sparkles },
  { number: "03", title: "Build for what comes next", description: "We create flexible digital foundations that feel polished today and leave room for tomorrow’s ideas.", icon: Layers3 },
];


export default function Principles() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-32">
        <div className="w-full">
          <div className="mb-5 flex flex-col items-center justify-center gap-2 sm:mb-10">
            <h4 id="studio-topics-title" className="focus-title text-[clamp(2.5rem,6vw,4.65rem)] leading-[0.98] -tracking-[3.5px] text-center">
              <span className="hero-text-neon uppercase">way with intention</span>
            </h4>
            <p className="text-center text-[clamp(20px,2vw,29px)] font-[300] tracking-wide">
              A few simple beliefs shape how we think, collaborate, and bring each project to life.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="relative overflow-hidden rounded-[56px] bg-primary/2.5 p-6 transition duration-300 sm:p-10">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 5%) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 size-80 rounded-full bg-primary/[0.05] blur-2xl transition" />
                <h4 className="grid size-24 place-items-center rounded-full bg-primary/[0.035] text-primary">
                  <Icon size={36} strokeWidth={1} />
                </h4>
                <h4 className="relative mt-10 mb-20 text-xl font-[600] tracking-normal sm:text-[25px]">{title}</h4>
                <p className="mt-4 font-normal text-base tracking-[.15px] leading-[1.5] text-white/85 sm:text-[33px]">{description}</p>
              </article>
            ))}
          </div>
          <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </section>
  );
}


