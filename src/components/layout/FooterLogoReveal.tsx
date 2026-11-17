"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RevealMetrics = {
  start: number;
  end: number;
  height: number;
};

export default function FooterLogoReveal() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<RevealMetrics>({ start: 0, end: 1, height: 0 });
  const { scrollY } = useScroll();

  const placeholderHeight = useTransform(
    scrollY,
    [metrics.start, metrics.end],
    [0, metrics.height],
  );

  useEffect(() => {
    const measure = () => {
      const placeholder = placeholderRef.current;
      const content = contentRef.current;
      if (!placeholder || !content) return;

      const fullHeight = content.offsetHeight;
      const placeholderTop = placeholder.getBoundingClientRect().top + window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const requestedStart = placeholderTop - window.innerHeight * 0.85;
      // Leave enough scroll travel for the in-flow placeholder to grow all the way.
      const start = Math.min(requestedStart, maxScroll - fullHeight * 0.15);
      const remainingScroll = maxScroll - start;

      setMetrics({
        start,
        end: start + remainingScroll + fullHeight,
        height: fullHeight,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (contentRef.current) observer.observe(contentRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <motion.div
      ref={placeholderRef}
      style={{
        height: placeholderHeight,
        backgroundImage: "linear-gradient(to top, rgb(187 255 0 / 3%), transparent 4rem)",
      }}
      className="relative overflow-hidden"
    >
      <div ref={contentRef} className="absolute inset-x-0 bottom-0">
        <Link
          href="/"
          aria-label="Relvo Home"
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
      </div>
    </motion.div>
  );
}
