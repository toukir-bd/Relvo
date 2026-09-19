"use client";

import { useEffect, useRef } from "react";

type MarqueeTextProps = {
  text?: string;
};

export default function MarqueeText({
  text = "Crafting digital experiences —",
}: MarqueeTextProps) {
  const motionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;
    let previousScrollY = window.scrollY;
    let currentSkew = 0;
    let targetSkew = 0;

    const handleScroll = () => {
      const velocity = window.scrollY - previousScrollY;
      previousScrollY = window.scrollY;

      targetSkew = Math.max(-4, Math.min(4, velocity * -0.09));
    };

    const animate = () => {
      currentSkew += (targetSkew - currentSkew) * 0.1;
      targetSkew *= 0.9;

      if (motionRef.current) {
        motionRef.current.style.transform = `
          translate3d(0, ${Math.abs(currentSkew) * -0.8}px, 0)
          skewX(${currentSkew}deg)
        `;
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const repeatedText = `${text} ${text} ${text} ${text}`;

  return (
    <section className="overflow-hidden bg-[#BBFF00] py-12 text-[#061B1B] md:py-20">
      <div ref={motionRef} className="will-change-transform">
        <div className="marquee-track flex w-max whitespace-nowrap">
          <h4 className="inline-block pe-3 text-8xl font-thin tracking-tight leading-5">{repeatedText}</h4>
          <span aria-hidden="true" className="marquee-item">
            {repeatedText}
          </span>
        </div>
      </div>
    </section>
  );
}