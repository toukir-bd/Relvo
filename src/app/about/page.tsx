import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Blocks, Compass, Layers3, Orbit, Sparkles, UserRound, Workflow } from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "About Relvo Dev",
  description:
    "Meet Relvo Dev, a Bangladesh-based digital design and development studio bringing strategy, design, and technology together.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const principles = [
  {
    number: "01",
    title: "Clarity before complexity",
    description:
      "We make space to understand the real challenge, then shape a simple direction everyone can get behind.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Design with a purpose",
    description:
      "Every detail should help people understand, trust, or use your product. We make the visual choices count.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Build for what comes next",
    description:
      "We create flexible digital foundations that feel polished today and leave room for tomorrow’s ideas.",
    icon: Layers3,
  },
];

const process = [
  ["Listen", "We get to know your goals, your audience, and what is getting in the way."],
  ["Shape", "We map the right direction and turn early ideas into a plan you can see."],
  ["Make", "We design and build together, sharing progress and refining the details."],
  ["Launch", "We prepare the work for the real world and help you take the next step."],
];

const studioTopics = [
  {
    id: "user-centric",
    title: "User Centric",
    description:
      "We start with the people a product is for. Their goals, needs, and everyday context guide the experience from the first decision to the final detail.",
    icon: UserRound,
  },
  {
    id: "creatively-driven",
    title: "Creatively Driven",
    description:
      "We bring strategy and imagination together to create distinctive brands and digital experiences with a clear point of view.",
    icon: Sparkles,
  },
  {
    id: "innovation-led",
    title: "Innovative Led",
    description:
      "We explore thoughtful ideas and useful technology to solve real problems, making every interaction feel more considered and capable.",
    icon: Blocks,
  },
  {
    id: "scalably-built",
    title: "Scalable Built",
    description:
      "We build on reliable, flexible foundations so your product can adapt as your audience, needs, and ambitions grow.",
    icon: Orbit,
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-[#081111] text-white">
      <section className="relative isolate flex min-h-[78svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:min-h-[88svh] lg:px-10 xl:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-45"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 10%) 0.7px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 -z-10 size-[min(58vw,720px)] rounded-full bg-primary/[0.09] blur-[100px]" />
        <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
          <span className="h-px w-8 bg-primary/70" /> About Relvo
        </p>
        <h1 className="focus-title max-w-6xl text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
          We turn good ideas into <span className="hero-text-neon">digital experiences.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg lg:text-xl">
          Relvo is a digital studio bringing strategy, design, and development together to help ambitious ideas find their place in the world.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/#contact" className="group inline-flex min-h-14 items-center gap-5 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-semibold text-secondary transition hover:bg-white">
            Start a conversation
            <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary transition-transform group-hover:rotate-45"><ArrowUpRight size={20} /></span>
          </Link>
          <Link href="/services" className="rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/75 transition hover:border-primary/50 hover:text-white">
            Explore services
          </Link>
        </div>
        <a href="#studio" className="mt-14 inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/45 transition hover:text-primary">
          Discover the studio <ArrowDown size={15} />
        </a>
      </section>

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

      <section id="studio" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-16">
        <div className="grid w-full items-center gap-10 rounded-[32px] border border-white/[0.07] bg-[#111915] p-6 sm:gap-14 sm:rounded-[40px] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Small team. Big-picture thinking.</p>
            <h2 className="focus-title mt-5 max-w-3xl text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
              Thoughtful work, from the first sketch to the final pixel.
            </h2>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-primary/[0.08] blur-3xl" />
            <p className="relative text-base leading-relaxed text-white/65 sm:text-lg">
              We believe digital work is at its best when it feels simple to use and unmistakably yours. Relvo brings creative thinking and practical technology into one close, collaborative process.
            </p>
            <p className="relative mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
              From a fresh identity to a complete online experience, we help teams make confident decisions and move from possibility to something people can use.
            </p>
            <div className="relative mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <Image src="/img/elements/brand.webp" alt="" width={64} height={64} className="size-12 rounded-xl object-cover sm:size-14" />
              <div>
                <p className="font-semibold text-white">Made with intention</p>
                <p className="mt-1 text-sm text-white/45">Clear thinking. Considered craft.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:px-10 xl:px-16">
        <div className="relative w-full overflow-hidden rounded-[32px] bg-primary px-6 py-10 text-secondary sm:rounded-[40px] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-40 size-[28rem] rounded-full border border-secondary/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-28 size-[22rem] rounded-full border border-secondary/10" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/65">Have something in mind?</p>
              <h2 className="focus-title mt-4 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">Let’s make the next thing matter.</h2>
            </div>
            <Link href="/#contact" className="group inline-flex min-h-14 shrink-0 items-center justify-between gap-6 rounded-full bg-secondary py-2 pl-6 pr-2 text-sm font-semibold text-white transition hover:bg-white hover:text-secondary">
              Get in touch
              <span className="grid size-10 place-items-center rounded-full bg-primary text-secondary transition-transform group-hover:rotate-45"><Workflow size={19} /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
