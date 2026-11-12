import Link from "next/link";
import { Workflow } from "lucide-react";



export default function AboutCTA() {
  return (
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
  );
}


