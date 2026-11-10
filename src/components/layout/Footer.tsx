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
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-primary sm:text-base">Have a project in mind?</p>
              <h2 className="focus-title max-w-[13ch] text-[clamp(2.7rem,6.2vw,6rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(3rem,4vw,4rem)]">
                let’s build <span className="hero-text-neon">what’s next.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/85 sm:text-lg lg:text-xl">
                Bring us your idea. We’ll shape it into a clear plan and build a digital experience ready to move your business forward.
              </p>
            </div>
            <div className="relative flex min-h-64 flex-col items-center justify-center sm:min-h-72 lg:min-h-[22rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-primary/[0.08] blur-3xl" />
              <svg aria-hidden="true" viewBox="0 0 440 300" fill="none" className="relative h-auto w-full max-w-[440px] overflow-visible">
                <path d="M45 155C87 46 334 34 391 144c49 94-80 144-181 111C119 225 8 249 45 155Z" stroke="rgb(187 255 0 / 22%)" strokeDasharray="4 8" />
                <path d="M79 204c41-30 66-61 97-93 29-29 82-32 119-4 30 22 47 54 72 70" stroke="rgb(187 255 0 / 45%)" strokeWidth="1.5" />
                <circle cx="79" cy="204" r="5" fill="#BBFF00" />
                <circle cx="295" cy="107" r="5" fill="#BBFF00" />
                <circle cx="367" cy="177" r="5" fill="#BBFF00" />
                <rect x="85" y="72" width="228" height="151" rx="24" fill="#142218" stroke="rgb(187 255 0 / 30%)" />
                <rect x="111" y="98" width="46" height="46" rx="15" fill="#BBFF00" />
                <path d="M124 112h20m-20 8h14m-14 8h9" stroke="#081111" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M151 144l-3 12 12-5" fill="#BBFF00" />
                <path d="M176 108h105M176 124h83M111 177h166M111 193h113" stroke="rgb(255 255 255 / 42%)" strokeWidth="5" strokeLinecap="round" />
                <rect x="255" y="177" width="126" height="76" rx="20" fill="#1b2c1a" stroke="rgb(187 255 0 / 48%)" />
                <path d="M278 202h77m-77 14h48" stroke="rgb(255 255 255 / 68%)" strokeWidth="5" strokeLinecap="round" />
                <path d="m344 239 8-8 8 8" stroke="#BBFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="337" cy="76" r="27" fill="#1b2c1a" stroke="rgb(187 255 0 / 35%)" />
                <path d="m337 64 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" fill="#BBFF00" />
                <path d="m365 89 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="rgb(187 255 0 / 65%)" />
              </svg>
              <Link
                href="/#contact"
                className="group relative mt-2 inline-flex min-h-14 shrink-0 items-center justify-between gap-5 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-semibold text-secondary transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Start a conversation
                <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </span>
              </Link>
            </div>
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
