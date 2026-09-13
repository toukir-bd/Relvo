"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface MenuOverlayProps {
  isOpen: boolean;
  isScrolled: boolean;
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
    title: "Expertise",
    href: "/expertise",
    subtitle: "Our Services",
  },
  {
    title: "Projects",
    href: "/projects",
    subtitle: "Selected Works",
  },
  {
    title: "Get Start",
    href: "/get-start",
    subtitle: "Let's Talk",
  },
];

export default function MenuOverlay({
  isOpen,
  isScrolled,
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
          className={`fixed inset-x-0 bottom-0 z-[100] ${
  isScrolled ? "top-[60px]" : "top-[120px]"
} overflow-y-auto bg-[#061018] text-white`}
        >
          <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:flex-row">

            {/* Left Menu */}
            <div className="flex w-full flex-col justify-center border-b border-white/10 px-8 py-10 lg:w-1/2 lg:border-b-0 lg:border-r lg:px-16">
              {menus.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.45,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group mb-12 flex items-center justify-between"
                  >
                    <h1 className="text-3xl font-black tracking-wide transition duration-300 group-hover:translate-x-3 group-hover:text-[#FF8D28] lg:text-6xl">
                      {item.title}
                    </h1>

                    <span className="ml-4 rounded-full border-2 border-gray-900 p-2 uppercase tracking-[4px] text-gray-500 opacity-0 transition duration-300 group-hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          d="M0 0h1024v1024H0z"
                          fill="none"
                        />

                        <path
                          fill="#FF8D28"
                          d="M754.8 480H160a32 32 0 1 0 0 64h594.8L521.3 777.3a32 32 0 0 0 45.4 45.4l288-288a32 32 0 0 0 0-45.4l-288-288a32 32 0 1 0-45.4 45.4z"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Content */}
            <div className="flex w-full items-center justify-center px-8 lg:w-1/2 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                }}
                className="max-w-lg text-center"
              >
                <p className="mb-4 text-center text-md font-[400] uppercase tracking-[10px] text-gray-500">
                  Welcome
                </p>

                <p className="mb-6 text-center text-4xl font-light leading-15 tracking-tight">
                  <span className="text-5xl font-normal text-[#1DB67E]">
                    Let&apos;s Transform
                  </span>

                  <br />

                  Ambition Into

                  <br />

                  <span className="text-5xl font-normal text-[#1DB67E]">
                    Digital Masterpieces.
                  </span>
                </p>

                <p className="text-center text-md font-medium leading-7 text-gray-500">
                  We craft exceptional digital experiences through strategy,
                  creativity, and technology designed to elevate brands and
                  inspire lasting impact.
                </p>

                <Link
                  href="/get-start"
                  onClick={onClose}
                  className="mt-8 inline-block rounded-full bg-[#FF8D28] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#1DB67E]"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}