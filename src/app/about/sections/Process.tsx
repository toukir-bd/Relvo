const process = [
  ["Listen", "We get to know your goals, your audience, and what is getting in the way."],
  ["Shape", "We map the right direction and turn early ideas into a plan you can see."],
  ["Make", "We design and build together, sharing progress and refining the details."],
  ["Launch", "We prepare the work for the real world and help you take the next step."],
];


export default function Process() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-45"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(187, 255, 0, 8%) 0.7px, transparent 1px)",
            backgroundSize: "4px 4px"
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 z-0 size-150 rounded-full bg-primary/[0.07] blur-[300px]"/>
        <div className="relative z-10 w-full">
          <div className="mt-4 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="focus-title text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] tracking-normal">
                <span className="hero-text-neon">a clear path from idea to impact</span>
              </h2>
              <p className="mt-5 text-[26px] font-normal leading-relaxed text-white/85">
                A good process keeps the big picture in view while making every next step feel manageable.
              </p>
            </div>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {process.map(([title, description], index) => (
                <li key={title} className="grid gap-4 py-5 sm:grid-cols-[64px_150px_1fr] sm:items-center sm:gap-6 sm:py-7">
                  <span className="text-[50px] font-[200] tracking-wider text-primary/85">0{index + 1}</span>
                  <h5 className="text-[40px] font-[500] text-white">{title}</h5>
                  <p className="text-sm font-[500] leading-relaxed tracking-wide text-white/75 sm:text-[21px]">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}


