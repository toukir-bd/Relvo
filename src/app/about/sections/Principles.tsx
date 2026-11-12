import { Compass, Layers3, Sparkles } from "lucide-react";

const principles = [
  { number: "01", title: "Clarity before complexity", description: "We make space to understand the real challenge, then shape a simple direction everyone can get behind.", icon: Compass },
  { number: "02", title: "Design with a purpose", description: "Every detail should help people understand, trust, or use your product. We make the visual choices count.", icon: Sparkles },
  { number: "03", title: "Build for what comes next", description: "We create flexible digital foundations that feel polished today and leave room for tomorrow’s ideas.", icon: Layers3 },
];


export default function Principles() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
        <div className="w-full">
          <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What guides us</p>
              <h2 className="focus-title mt-4 max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none tracking-[-0.04em]">Good work starts with good principles.</h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/55">A few simple beliefs shape how we think, collaborate, and bring each project to life.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#111915] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-primary/[0.04] blur-2xl transition group-hover:bg-primary/[0.1]" />
                <div className="relative flex items-start justify-between">
                  <span className="text-sm font-semibold tracking-wider text-primary">{number}</span>
                  <span className="grid size-11 place-items-center rounded-2xl border border-primary/20 bg-primary/[0.06] text-primary"><Icon size={20} strokeWidth={1.6} /></span>
                </div>
                <h3 className="relative mt-12 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}


