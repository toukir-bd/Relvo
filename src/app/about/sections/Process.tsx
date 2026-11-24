const process = [
  ["Listen", "We get to know your goals, your audience, and what is getting in the way."],
  ["Shape", "We map the right direction and turn early ideas into a plan you can see."],
  ["Review", "We share the direction, gather your feedback, and refine it together."],
  ["Make", "We design and build together, sharing progress and refining the details."],
  ["Launch", "We prepare the work for the real world and help you take the next step."],
];


export default function Process() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-8 sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-45"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(187, 255, 0, 16%) 1px, transparent 1px)",
            backgroundSize: "3px 3px"
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-100 z-0 size-150 rounded-full bg-primary/[0.08] blur-[300px]"/>
        <div className="relative z-10 w-full">
          <div className="mt-4 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="focus-title text-[28px] sm:text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-normal sm:-tracking-[3px] text-white">
                <span className="hero-text-neon">a clear path from idea to impact</span>
              </h2>
              <p className="mt-5 text-[16px] sm:text-[clamp(1.125rem,2vw,1.5625rem)] font-medium leading-[1.4] text-white/85 tracking-[0.75px]">
                A good process keeps the big picture in view while making every next step feel manageable.
              </p>
            </div>
            <ol className="divide-y divide-primary/10 border-y border-primary/10">
              {process.map(([title, description], index) => (
                <li key={title} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-4 sm:grid-cols-[64px_150px_1fr] sm:items-center sm:gap-6 sm:py-5">
                  <span className="row-span-2 self-center text-[clamp(2rem,5vw,3.125rem)] font-[200] tracking-wider text-primary/85 sm:row-span-1">0{index + 1}</span>
                  <h3 className="relative top-2.5 sm:top-0 text-[clamp(1.25rem,2.5vw,2.0625rem)] font-[400] text-white uppercase -tracking-[0.85px]">{title}</h3>
                  <p className="col-span-2 text-sm font-[600] sm:font-[500] leading-relaxed tracking-wide text-white/75 sm:col-span-1 sm:text-[21px]">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}


