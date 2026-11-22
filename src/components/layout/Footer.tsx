import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import FooterLogo from "./FooterLogo";
import FooterConversationArtwork from "@/components/props/FooterConversationArtwork";

const menus = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Projects", href: "/projects" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 size-[34rem] rounded-full bg-primary/[0.055] blur-[110px]" />
      <div className="w-full px-5 pb-12 pt-0 sm:px-8 sm:pb-20 sm:pt-0 lg:px-16">
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-5 py-8 sm:px-8 sm:py-9 lg:px-20 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12] [background-size:3px_3px] [background-image:linear-gradient(rgba(187,255,0,0.23)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.23)_1px,transparent_1px)]" />
          <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-3 sm:gap-8 lg:grid-cols-[0.8fr_1.25fr] lg:gap-15">
            <div className="relative flex min-h-24 flex-col items-center justify-center sm:min-h-72 lg:min-h-[22rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-primary/[0.08] blur-3xl" />
              <FooterConversationArtwork />
            </div>
            <div className="relative">
              <h2 className="focus-title w-full text-[19px] sm:text-[clamp(1.8rem,5vw,3.4rem)] font-semibold uppercase leading-[1.05] -tracking-[.5px] sm:-tracking-[2px] text-white sm:-tracking-[3px]">
                make <span className="hero-text-neon">your next move count</span>
              </h2>
              <p className="mt-3 w-full text-[15px] sm:text-[clamp(1.125rem,2vw,1.5rem)] font-[500] sm:font-[400] leading-normal tracking-[.85px] text-white/85 sm:mt-7">
                Bring us your idea. We’ll shape it into a clear plan and build a digital experience ready to move your business forward
              </p>
              <Link href="/#contact" className="btn-relvo mt-3 sm:mt-10">
                <span className="btnText">Start a Conversation</span>
                <span className="iconArea">
                  <ArrowUpRight strokeWidth={1.5} />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full pt-7 sm:pt-22 lg:pt-30 pb-6 sm:pb-8 lg:pb-10 scale-[0.9]">
          <div className="grid items-end gap-10 pb-2 sm:pb-3 md:grid-cols-[1.2fr_1fr_1fr] lg:gap-16 lg:pb-8 px-2">
            <div>
              <p className="w-full text-2xl font-[400] leading-snug tracking-wide text-white sm:text-3xl relative -bottom-1">
                Design, technology, and<br />clear thinking for what comes next
              </p>
            </div>
            <nav aria-label="Footer navigation" className="md:w-full md:justify-self-center">
              <span className="mb-4 flex w-full text-sm font-[700] uppercase tracking-widest text-white sm:text-[20px]">Explore</span>
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
              <span className="mb-4 flex w-full text-sm font-[700] uppercase tracking-widest text-white sm:text-[20px]">Say hello</span>
              <div className="mb-7 sm:mb-0 grid gap-3 lg:grid-cols-2">
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
          <FooterLogo />
          <div className="flex flex-col gap-1 pt-3 px-3 text-[13px] font-[500] text-white/50 sm:flex-row tracking-wider sm:items-center sm:justify-start sm:gap-1 sm:pt-8 sm:text-[15px] lg:gap-2">
            <p>© {new Date().getFullYear()} Relvo. All rights reserved.</p>
            <p className="tracking-wide">Thoughtfully made for the digital world.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
