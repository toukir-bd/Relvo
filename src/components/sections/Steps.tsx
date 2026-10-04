const steps = [
  {
    title: "Discovery & Research",
    description: "We learn about your goals, audience, and the problem you need to solve.",
  },
  {
    title: "Wireframing & Prototyping",
    description: "We map the experience and test the flow before moving into visual design.",
  },
  {
    title: "Design",
    description: "We bring your brand to life with engaging, visually compelling designs.",
  },
  {
    title: "Developer Handoff",
    description: "You receive organized, developer-ready Figma files for implementation.",
  },
];

export default function ProcessSection() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-full gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            <span className="text-[#77736d]">A clear process</span>
            <br />
            <span className="text-[#77736d]">from </span>idea →
            <br />
            experience →
            <br />
            launch.
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="sticky min-h-[260px] rounded-2xl border border-black/5 p-8 shadow-sm md:min-h-[300px] md:p-10"
              style={{
                top: `calc(12vh + ${index * 18}px)`,
                zIndex: index + 1,
              }}
            >
              <div className="flex items-start gap-8 md:gap-12">
                <span className="text-4xl font-medium text-[#77736d] md:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="pt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                  {step.title}
                </h3>
              </div>

              <p className="ml-[calc(2.5rem+2rem)] mt-16 max-w-lg text-sm leading-relaxed text-[#77736d] md:ml-[calc(3rem+3rem)] md:mt-20 md:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}