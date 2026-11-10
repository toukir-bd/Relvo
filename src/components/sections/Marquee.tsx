"use client";

import { useEffect, useRef } from "react";

type MarqueeTextProps = {
  text?: string;
};

export default function Marquee({
  text = "RELVO - Refined Experiences, Led by Vision & Originality.",
}: MarqueeTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLHeadingElement>(null);
  const repeatedText = `${text} ${text} ${text} ${text}`;

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const updateMarquee = () => {
      const distance = group.getBoundingClientRect().width;
      if (!distance) return;
      const duration = distance / 105;
      track.style.setProperty("--marquee-shift", `${-distance}px`);
      track.style.setProperty("--marquee-duration", `${duration}s`);
    };

    const observer = new ResizeObserver(updateMarquee);
    observer.observe(group);
    updateMarquee();
    return () => observer.disconnect();
  }, [repeatedText]);

  return (
    <section aria-label="Relvo brand statement" className="overflow-hidden bg-primary/5 py-6 text-primary/90 md:py-8">
      <div ref={trackRef} className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((group) => (
          <h4
            key={group}
            ref={group === 0 ? groupRef : undefined}
            aria-hidden="true"
            className="shrink-0 pe-8 text-[clamp(2rem,10vw,4rem)] font-[500] leading-none tracking-normal md:text-7xl"
          >
            {repeatedText}
          </h4>
        ))}
      </div>
    </section>
  );
}
