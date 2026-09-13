
"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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
          className="fixed inset-0 z-50 bg-[#061018] text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-6 lg:px-16 bg-[#061018]">
            <Link href="/" onClick={onClose} className="text-2xl font-semibold tracking-wider">
              <Image
                src="/img/elements/logo-wh.svg"
                alt="Relvo Logo"
                width={181}
                height={46}
                className="h-auto w-full max-w-[181px]"
                priority
              />
            </Link>
            <button onClick={onClose} className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-700 cursor-pointer transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 20 20" className="fill-current text-white hover:text-[#FF8D28]">
                <path d="M0 0h20v20H0z" fill="none" />
                <g fill="currentColor">
                  <path d="M6.854 13.854a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708.708z" />
                  <path d="M6.146 6.854a.5.5 0 1 1 .708-.708l7 7a.5.5 0 0 1-.708.708z" />
                </g>
              </svg>
            </button>
          </div>
          <div className="mx-auto flex h-[calc(100vh-96px)] max-w-[1600px] flex-col lg:flex-row">
            <div className="flex w-full flex-col justify-center border-b border-white/10 px-8 py-10 lg:w-1/2 lg:border-b-0 lg:border-r lg:border-white/10 lg:px-16">
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
                  <Link href={item.href} onClick={onClose} className="group mb-12 flex items-center justify-between">
                    <h1 className="text-4xl font-black transition duration-300 group-hover:translate-x-3 group-hover:text-[#FF8D28] lg:text-7xl tracking-wider">
                      {item.title}
                    </h1>
                    <span className="uppercase tracking-[4px] text-gray-500 opacity-0 transition duration-300 group-hover:opacity-100 border-2 border-gray-900 rounded-full p-2 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 1024 1024">
                        <path d="M0 0h1024v1024H0z" fill="none" />
                        <path fill="#FF8D28" d="M754.8 480H160a32 32 0 1 0 0 64h594.8L521.3 777.3a32 32 0 0 0 45.4 45.4l288-288a32 32 0 0 0 0-45.4l-288-288a32 32 0 1 0-45.4 45.4z" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
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
                <p className="mb-4 text-md font-[400] text-center uppercase tracking-[10px] text-gray-500">Welcome</p>
                <p className="mb-6 text-4xl text-center font-light tracking-tight leading-15 lg:text-4xl">
                  <span className="text-[#1DB67E] text-5xl font-normal">Let&apos;s Transform</span> 
                  <br />
                  Ambition Into 
                  <br />
                  <span className="text-[#1DB67E] text-5xl font-normal">Digital Masterpieces.</span>
                </p>
                <p className="text-md text-center font-medium leading-7 text-gray-500">
                  We craft exceptional digital experiences through strategy, creativity, and technology designed to 
                  elevate brands and inspire lasting impact.
                </p>
                <a href="/get-start" onClick={onClose} className="mt-8 inline-block rounded-full bg-[#FF8D28] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#1DB67E]">
                  Get Started

                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}