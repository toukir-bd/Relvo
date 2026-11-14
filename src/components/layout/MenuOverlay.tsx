
"use client";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menus = [
  {
    title: "Home",
    href: "/",
    subtitle: "Crafting Digital Experiences",
  },
  {
    title: "About",
    href: "/about",
    subtitle: "Who We Are",
  },
  {
    title: "Services",
    href: "/services",
    subtitle: "Our Services",
  },
  {
    title: "Projects",
    href: "/projects",
    subtitle: "Selected Works",
  },
  {
    title: "Get Started",
    href: "/#contact",
    subtitle: "Let's Talk",
  },
];

export default function MenuOverlay({
  isOpen,
  onClose,
}: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 bottom-0 z-90 overflow-y-auto bg-secondary/95 text-white backdrop-blur-[10px] ">
          <div className="flex min-h-full w-full flex-col lg:h-full lg:flex-row">
            <div className="flex w-full shrink-0 flex-col justify-center border-b border-white/10 px-6 py-24 sm:px-8 lg:w-1/2 lg:border-b-0 lg:border-r lg:px-55 lg:py-10">
              {menus.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08, duration: 0.45,}}>
                  <Link href={item.href} onClick={onClose} className="group flex py-1 items-center justify-between gap-7 sm:py-2 lg:py-6 border-b border-primary/8 w-full">
                    <h1 className="text-3xl font-black tracking-wide transition duration-300 group-hover:translate-x-3 group-hover:text-primary sm:text-4xl lg:text-6xl">
                      {item.title}
                    </h1>
                    <span className="ml-4 rounded-full border-2 border-primary/15 p-3 uppercase tracking-[4px] text-gray-500 opacity-0 transition duration-300 group-hover:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 2048 2048">
                        <path d="M0 0h2048v2048H0z" fill="none" />
                        <path fill="#BBFF00" d="M384 256h1408v1408h-128V475L347 1792l-91-91L1573 384H384z" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Content */}
            <div className="relative isolate flex w-full items-center justify-center overflow-hidden px-6 py-16 sm:px-10 lg:w-1/2 lg:px-16 lg:py-12 xl:px-24">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 -z-10 size-[min(72vw,620px)] -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[100px]" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.65 }}
                className="relative w-full max-w-xl"
              >
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-primary">Ideas into impact</p>
                <h2 className="focus-title max-w-[12ch] text-[clamp(2.8rem,5.2vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                  Make your next move <span className="hero-text-neon">mean more.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
                  Thoughtful design and purposeful technology, shaped around the ambition behind your business.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/45">
                  <span>Strategy</span><span className="text-primary/60">/</span>
                  <span>Design</span><span className="text-primary/60">/</span>
                  <span>Development</span>
                </div>

                <Link href="/#contact" onClick={onClose} className="btn-relvo mt-9">
                  <span className="btnText">Start a conversation</span>
                  <span className="iconArea"><ArrowUpRight className="btnIcon" size={20} strokeWidth={1.7} /></span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
