import { Blocks, Orbit, Sparkles, UserRound } from "lucide-react";

const studioTopics = [
  { id: "user-centric", title: "User Centric", description: "We start with the people a product is for. Their goals, needs, and everyday context guide the experience from the first decision to the final detail.", icon: UserRound },
  { id: "creatively-driven", title: "Creatively Driven", description: "We bring strategy and imagination together to create distinctive brands and digital experiences with a clear point of view.", icon: Sparkles },
  { id: "innovation-led", title: "Innovative Led", description: "We explore thoughtful ideas and useful technology to solve real problems, making every interaction feel more considered and capable.", icon: Blocks },
  { id: "scalably-built", title: "Scalable Built", description: "We build on reliable, flexible foundations so your product can adapt as your audience, needs, and ambitions grow.", icon: Orbit },
];


export default function StudioTopics() {
  return (
    <section aria-labelledby="studio-topics-title" className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25" style={{ backgroundImage: "linear-gradient(rgb(187 255 0 / 5%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 5%) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <header className="mb-10 max-w-4xl sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What defines Relvo</p>
          <h2 id="studio-topics-title" className="focus-title mt-4 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">Principles behind every project.</h2>
        </header>
        <div className="grid w-full gap-4 lg:grid-cols-2">
          {studioTopics.map(({ id, title, description, icon: Icon }, index) => (
            <article id={id} key={id} className="scroll-mt-24 rounded-[28px] border border-white/[0.08] bg-[#0d1713]/90 p-6 sm:rounded-[34px] sm:p-9 lg:p-11">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold tracking-[0.18em] text-primary">0{index + 1}</span>
                <span className="grid size-12 place-items-center rounded-2xl border border-primary/20 bg-primary/[0.07] text-primary sm:size-14"><Icon size={24} strokeWidth={1.5} /></span>
              </div>
              <h3 className="mt-8 text-[clamp(1.65rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.025em] text-white">{title}</h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg sm:leading-8">{description}</p>
            </article>
          ))}
        </div>
      </section>
  );
}


