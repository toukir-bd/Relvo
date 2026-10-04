"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const clients = [
  "indya.ai",
  "Geekster",
  "AVIDΞRI",
  "longlist.io",
  "UnlistedZone",
  "DIAMONDRENSU",
];

type MarqueeStyle = CSSProperties & {
  "--marquee-distance": string;
  "--marquee-duration": string;
};

export default function ClientMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    groupWidth: number;
    copies: number;
  } | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const groupWidth = group.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      if (!groupWidth || !viewportWidth) return;

      const copies = Math.max(2, Math.ceil(viewportWidth / groupWidth) + 1);
      setDimensions({ groupWidth, copies });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);

    return () => observer.disconnect();
  }, []);

  const style: MarqueeStyle | undefined = dimensions
    ? {
        "--marquee-distance": `${dimensions.groupWidth}px`,
        "--marquee-duration": `${dimensions.groupWidth / 45}s`,
      }
    : undefined;

  return (
    <section
      aria-label="Selected clients"
      className="overflow-hidden py-10"
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div
          className={`flex w-max ${
            dimensions ? "marquee-track" : ""
          }`}
          style={style}
        >
          {Array.from(
            { length: dimensions?.copies ?? 1 },
            (_, copyIndex) => (
              <div
                key={copyIndex}
                ref={copyIndex === 0 ? groupRef : undefined}
                aria-hidden={copyIndex !== 0}
                className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
              >
                {clients.map((name) => (
                  <span
                    key={name}
                    className="shrink-0 whitespace-nowrap text-2xl font-semibold text-white/55 md:text-3xl"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ),
          )}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee var(--marquee-duration) linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          to {
            transform: translate3d(calc(-1 * var(--marquee-distance)), 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}