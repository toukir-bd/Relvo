import { Blocks, Orbit, Sparkles, UserRound } from "lucide-react";

const studioTopics = [
  { id: "user-centric", title: "User Centric", description: "We start with the people a product is for. Their goals, needs, and everyday context guide the experience from the first decision to the final detail.", icon: UserRound },
  { id: "creatively-driven", title: "Creatively Driven", description: "We bring strategy and imagination together to create distinctive brands and digital experiences with a clear point of view.", icon: Sparkles },
  { id: "innovation-led", title: "Innovative Led", description: "We explore thoughtful ideas and useful technology to solve real problems, making every interaction feel more considered and capable.", icon: Blocks },
  { id: "scalably-built", title: "Scalable Built", description: "We build on reliable, flexible foundations so your product can adapt as your audience, needs, and ambitions grow.", icon: Orbit },
];

export default function StudioTopics() {
  return (
    <section aria-labelledby="studio-topics-title" className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-20 lg:py-32 xl:px-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25" 
        style={{ 
          backgroundImage: "linear-gradient(rgb(187 255 0 / 13%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 13%) 1px, transparent 1px)", 
          backgroundSize: "4px 4px" 
        }} 
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 mx-auto bottom-0 -z-10 size-[min(58vw,720px)] rounded-full bg-primary/[0.09] blur-[100px]"/>
      <header className="mb-5 sm:mb-10">
        <h4 id="studio-topics-title" className="focus-title text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-normal">
          <span className="hero-text-neon">principles behind every idea</span>
        </h4>
      </header>
      <div className="grid w-full gap-4 lg:grid-cols-2">
        {studioTopics.map(({ id, title, description, icon: Icon }, index) => (
          <article id={id} key={id} className="relative rounded-[28px] bg-primary/5 p-6 sm:rounded-[48px] sm:p-9 lg:p-11">
            <span className="absolute top-0 left-10 text-[200px] font-[800] tracking-normal text-primary/8 leading-[230px]">0{index + 1}</span>
            <div className="flex items-center justify-end text-primary">
              <Icon size={86} strokeWidth={.5} />
            </div>
            <h4 className="mt-0 text-[clamp(1.65rem,3vw,2.5rem)] font-[400] leading-tight tracking-normal text-white">{title}</h4>
            <p className="mt-4 text-base tracking-[.85px] leading-normal text-white/85 sm:text-[20px]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


