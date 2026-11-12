const process = [
  ["Listen", "We get to know your goals, your audience, and what is getting in the way."],
  ["Shape", "We map the right direction and turn early ideas into a plan you can see."],
  ["Make", "We design and build together, sharing progress and refining the details."],
  ["Launch", "We prepare the work for the real world and help you take the next step."],
];


export default function Process() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: "linear-gradient(rgb(187 255 0 / 6%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 6%) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How we work</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="focus-title text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.96] tracking-[-0.04em]">A clear path from idea to impact.</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">A good process keeps the big picture in view while making every next step feel manageable.</p>
            </div>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {process.map(([title, description], index) => (
                <li key={title} className="grid gap-3 py-5 sm:grid-cols-[64px_150px_1fr] sm:items-start sm:gap-5 sm:py-7">
                  <span className="text-xs font-semibold tracking-wider text-primary">0{index + 1}</span>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}


