"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FooterLogoReveal() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    const revealIfAtPageEnd = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && window.scrollY >= maxScroll - 8) {
        setIsExpanded(true);
      }
    };

    const onScroll = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(revealIfAtPageEnd, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", revealIfAtPageEnd);
    revealIfAtPageEnd();

    return () => {
      clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", revealIfAtPageEnd);
    };
  }, []);

  return (
    <motion.div
      aria-hidden={!isExpanded}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: isExpanded ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{ backgroundImage: "linear-gradient(to top, rgb(187 255 0 / 3%), transparent 4rem)" }}
    >
      <Link
        href="/"
        aria-label="Relvo Home"
        tabIndex={isExpanded ? 0 : -1}
        className="relative flex w-full items-center justify-center pb-12 pt-15"
      >
        <span aria-hidden="true" className="absolute left-0 top-0 h-15 w-full rounded-t-[40px] bg-linear-to-b from-primary/3 to-transparent" />
        <Image
          src="/img/elements/logo.webp"
          alt="Relvo"
          width={4356}
          height={1215}
          sizes="(max-width: 1600px) calc(100vw - 3rem), 1400px"
          className="h-auto w-[min(70vw,980px)] sm:w-[min(60vw,980px)]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-15 w-full rounded-b-[40px] bg-linear-to-t from-primary/3 to-transparent" />
      </Link>
    </motion.div>
  );
}
