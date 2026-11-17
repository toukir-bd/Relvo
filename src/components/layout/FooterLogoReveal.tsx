"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FooterLogoReveal() {
  const revealRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(revealRef, { once: true });

  return (
    <div ref={revealRef} className="relative min-h-px">
      <motion.div
        aria-hidden={!isVisible}
        initial={{ height: 0, opacity: 0 }}
        animate={isVisible ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{
          height: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.45, ease: "easeOut" },
        }}
        className="overflow-hidden"
      >
        <Link
          href="/"
          aria-label="Relvo Home"
          tabIndex={isVisible ? 0 : -1}
          className="relative flex w-full items-center justify-center pb-12 pt-15"
        >
          <span aria-hidden="true" className="absolute left-0 top-0 h-15 w-full rounded-t-[40px] bg-linear-to-b from-primary/3 to-transparent" />
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-15 w-full rounded-b-[40px] bg-linear-to-t from-primary/3 to-transparent" />
          <Image
            src="/img/elements/logo.webp"
            alt="Relvo"
            width={4356}
            height={1215}
            sizes="(max-width: 1600px) calc(100vw - 3rem), 1400px"
            className="h-auto w-[min(70vw,980px)] sm:w-[min(60vw,980px)]"
          />
        </Link>
      </motion.div>
    </div>
  );
}
