import { Code2, Compass, PanelsTopLeft, Sparkles } from "lucide-react";

const disciplines = [
  {
    number: "01",
    title: "Strategy & Direction",
    description: "Find the right problem, define a clear product direction, and keep each decision connected to the bigger goal.",
    focus: "Purpose before pixels",
    icon: Compass,
  },
  {
    number: "02",
    title: "Product & UX Design",
    description: "Turn user needs into clear journeys, thoughtful interactions, and interfaces that feel natural to use.",
    focus: "Useful by design",
    icon: PanelsTopLeft,
  },
  {
    number: "03",
    title: "Engineering & Development",
    description: "Build reliable, responsive digital products with the care to perform today and grow tomorrow.",
    focus: "Built for what’s next",
    icon: Code2,
  },
  {
    number: "04",
    title: "Brand & Motion",
    description: "Shape distinctive visual systems and purposeful motion that make each product feel unmistakably yours.",
    focus: "Character in every detail",
    icon: Sparkles,
  },
];

export default function CoreTeam() {
  return (
    <section aria-labelledby="core-team-title" className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[28rem] rounded-full bg-primary/[0.08] blur-[110px]" />

      <header className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">The core team</p>
          <h2 id="core-team-title" className="focus-title mt-4 max-w-5xl text-[clamp(2.7rem,6vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            Different minds. <span className="hero-text-neon">One clear direction.</span>
          </h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg sm:leading-8 lg:pb-2">
          A focused mix of strategy, design, and development—working closely together from the first conversation to the final detail.
        </p>
      </header>

      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        {disciplines.map(({ number, title, description, focus, icon: Icon }) => (
          <article key={number} className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d1713]/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/35 sm:min-h-[340px] sm:rounded-[34px] sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/[0.035] blur-3xl transition-colors duration-500 group-hover:bg-primary/[0.12]" />
            <div className="relative flex items-start justify-between">
              <span className="text-sm font-semibold tracking-[0.18em] text-primary">{number}</span>
              <span className="grid size-14 place-items-center rounded-2xl border border-primary/20 bg-primary/[0.06] text-primary transition duration-300 group-hover:rotate-[-6deg] group-hover:border-primary/50 group-hover:bg-primary/[0.12]">
                <Icon size={25} strokeWidth={1.6} />
              </span>
            </div>
            <div className="relative mt-auto pt-12">
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[27px]">{title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/65">{description}</p>
              <p className="mt-7 border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">{focus}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
