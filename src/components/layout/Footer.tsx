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
    <footer className="relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 -z-10 size-[34rem] rounded-full bg-primary/[0.055] blur-[110px]" />
      <div className="w-full px-5 pb-12 pt-0 sm:px-8 sm:pb-14 sm:pt-0 lg:px-16">
        <div className="relative left-1/2 w-screen -translate-x-1/2 border-b border-b-primary/15 bg-[#0d1712]/55 px-5 py-6 sm:px-8 sm:py-9 lg:px-16 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12] [background-size:8px_8px] [background-image:linear-gradient(rgba(187,255,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.15)_1px,transparent_1px)]" />
          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div className="order-1 lg:order-2">
              <h2 className="focus-title w-full whitespace-nowrap text-[clamp(1.4rem,4.5vw,4.25rem)] font-semibold leading-[1.05] tracking-normal text-white">
                make <span className="hero-text-neon">your next move count.</span>
              </h2>
              <p className="mt-5 w-full text-[27px] font-[500] leading-relaxed text-white/85">
                Bring us your idea. We’ll shape it into a clear plan and build a digital experience ready to move your business forward.
              </p>
              <Link
                href="/#contact"
                className="btn-relvo mt-7"
              >
                <span className="btnText">Start a conversation</span>
                <span className="iconArea">
                  <ArrowUpRight strokeWidth={1.5} />
                </span>
              </Link>
            </div>
            <div className="relative order-2 flex min-h-64 flex-col items-center justify-center sm:min-h-72 lg:order-1 lg:min-h-[22rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-primary/[0.08] blur-3xl" />
              <svg aria-hidden="true" viewBox="0 0 440 300" fill="none" className="relative h-auto w-full max-w-[520px] overflow-visible">
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
                <path d="M327 67h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-7l-7 5v-5h-6a4 4 0 0 1-4-4V71a4 4 0 0 1 4-4Z" fill="#BBFF00" />
                <path d="M329 74h15m-15 5h10" stroke="#081111" strokeWidth="2" strokeLinecap="round" />
                <path d="m365 89 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="rgb(187 255 0 / 65%)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full pt-20 sm:pt-22 lg:pt-30 pb-6 sm:pb-8 lg:pb-10 scale-[0.9]">
          <div className="grid items-end gap-10 border-b border-white/[0.08] pb-2 sm:pb-3 md:grid-cols-[1.2fr_1fr_1fr] lg:gap-16 lg:pb-5">
            <div>
              <p className="w-full text-2xl font-[400] leading-snug tracking-wide text-white sm:text-3xl relative -bottom-1">
                Design, technology, and<br />clear thinking for what comes next.
              </p>
            </div>
            <nav aria-label="Footer navigation" className="md:w-full md:justify-self-center">
              <h4 className="mb-4 text-sm font-[700] uppercase tracking-widest text-white sm:text-[20px]">Explore</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-wrap md:justify-start md:gap-x-6">
                {menus.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group inline-flex items-center gap-1.5 text-base font-[400] text-white/70 tracking-wider transition hover:text-primary sm:text-[18px]">
                      {item.title}
                      <ArrowUpRight size={18} className="-translate-y-0.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-80" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h4 className="mb-4 text-sm font-[700] uppercase tracking-widest text-white sm:text-[20px]">Say hello</h4>
              <div className="grid gap-3 lg:grid-cols-2">
                <a href="mailto:hello@relvodev.com" className="group flex w-fit items-center gap-3 text-base font-[400] text-white/70 transition hover:text-primary sm:text-[18px] tracking-wider">
                  <span className="grid size-9 place-items-center rounded-full bg-primary/[0.06] text-white"><Mail size={16} /></span>
                  hello@relvodev.com
                </a>
                <a href="tel:+8801410485824" className="group flex w-fit items-center gap-3 text-base font-[400] text-white/70 transition hover:text-primary sm:text-[18px] tracking-wider">
                  <span className="grid size-9 place-items-center rounded-full bg-primary/[0.06] text-white"><Phone size={16} /></span>
                  +880 1410-485824
                </a>
              </div>
            </div>
          </div>
          <Link
            href="/"
            aria-label="Relvo home"
            className="relative left-1/2 mx-0 mt-2 flex w-screen -translate-x-1/2 justify-center px-5 sm:mt-5 [background-image:linear-gradient(rgba(187,255,0,0.15),transparent)"
          >
            <Image
              src="/img/elements/logo.webp"
              alt="Relvo"
              width={4356}
              height={1215}
              sizes="(max-width: 1600px) calc(100vw - 3rem), 1400px"
              className="h-auto w-[min(70vw,980px)] object-contain sm:w-[min(60vw,980px)]"
            />
          </Link>
          <div className="flex flex-col gap-1 border-t border-white/[0.08] pt-3 text-xs font-[500] text-white/50 sm:flex-row sm:items-center sm:justify-start sm:gap-1 sm:pt-5 sm:text-[14px] lg:gap-2">
            <p>© {new Date().getFullYear()} Relvo. All rights reserved.</p>
            <p className="tracking-wide">Thoughtfully made for the digital world.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
