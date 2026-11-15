import { Compass, Layers3, Sparkles } from "lucide-react";

const principles = [
  { number: "01", title: "Clarity before complexity", description: "We make space to understand the real challenge, then shape a simple direction everyone can get behind.", icon: Compass },
  { number: "02", title: "Design with a purpose", description: "Every detail should help people understand, trust, or use your product. We make the visual choices count.", icon: Sparkles },
  { number: "03", title: "Build for what comes next", description: "We create flexible digital foundations that feel polished today and leave room for tomorrow’s ideas.", icon: Layers3 },
];


export default function Principles() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-32">
        <div className="w-full">
          <div className="mb-5 flex flex-col items-center justify-center gap-2 sm:mb-10">
            <h4 id="studio-topics-title" className="focus-title text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-normal">
              <span className="hero-text-neon">way with intention</span>
            </h4>
            <p className="text-center text-[clamp(20px,2vw,29px)] font-[300] tracking-wide">
              A few simple beliefs shape how we think, collaborate, and bring each project to life.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="group relative overflow-hidden rounded-[56px] bg-primary/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-10">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 opacity-45"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 0.7px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 size-48 rounded-full bg-primary/[0.1] blur-2xl transition group-hover:bg-primary/[0.15]" />
                <div className="relative flex items-start justify-between">
                  <h4 className="grid size-18 place-items-center rounded-full bg-primary/[0.1] text-primary">
                    <Icon size={30} strokeWidth={1} />
                  </h4>
                </div>
                <h4 className="relative mt-8 text-xl font-[300] tracking-normal sm:text-4xl">{title}</h4>
                <p className="mt-4 font-[500] text-base tracking-[.85px] leading-normal text-white/85 sm:text-[18px]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}


