import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const menus = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Projects", href: "/projects" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-primary/[0.12] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(187 255 0 / 11%) 0.7px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 -z-10 size-[34rem] rounded-full bg-primary/[0.055] blur-[110px]" />

      <div className="w-full px-5 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-16 lg:px-16 lg:pt-20">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/15 bg-[#0d1712]/55 p-6 sm:rounded-[36px] sm:p-9 lg:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12] [background-size:38px_38px] [background-image:linear-gradient(rgba(187,255,0,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.18)_1px,transparent_1px)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 size-80 rounded-full border border-primary/10" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Have a project in mind?</p>
              <h2 className="focus-title text-[clamp(2.2rem,5.6vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                Let’s make something <span className="hero-text-neon">matter.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                Tell us what you’re imagining. We’ll help turn the first conversation into a clear next step.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex min-h-14 shrink-0 items-center justify-between gap-5 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-semibold text-secondary transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Start a conversation
              <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary transition-transform group-hover:rotate-45">
                <ArrowUpRight size={19} />
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/[0.08] py-12 sm:py-14 md:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <p className="max-w-md text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
              Design, technology, and clear thinking for what comes next.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
              Relvo creates digital experiences with intention, from the first idea through launch.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {menus.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition hover:text-white">
                    {item.title}
                    <ArrowUpRight size={13} className="-translate-y-0.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-80" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Say hello</h3>
            <a href="mailto:hello@relvodev.com" className="group flex w-fit items-center gap-3 text-sm text-white/65 transition hover:text-primary">
              <span className="grid size-9 place-items-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary"><Mail size={16} /></span>
              hello@relvodev.com
            </a>
            <a href="tel:+8801410485824" className="group mt-3 flex w-fit items-center gap-3 text-sm text-white/65 transition hover:text-primary">
              <span className="grid size-9 place-items-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary"><Phone size={16} /></span>
              +880 1410-485824
            </a>
          </div>
        </div>

        <Link
          href="/"
          aria-label="Relvo home"
          className="mt-12 block w-full px-3 sm:mt-16 sm:px-6 lg:px-8"
        >
          <Image
            src="/img/elements/logo.webp"
            alt="Relvo"
            width={4356}
            height={1215}
            sizes="(max-width: 1600px) calc(100vw - 3rem), 1400px"
            className="h-auto w-full object-contain"
          />
        </Link>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/35 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6 sm:text-sm">
          <p>© {new Date().getFullYear()} Relvo. All rights reserved.</p>
          <p className="tracking-wide">Thoughtfully made for the digital world.</p>
        </div>
      </div>
    </footer>
  );
}
