"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clients = Array.from({ length: 21 }, (_, index) => ({
  src: `/img/partners/p-${index + 1}.webp`,
  name: `Partner ${index + 1}`,
}));

export default function Clients() {
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

  return (
    <div role="group" aria-label="Selected clients" className="overflow-hidden rounded-full border-2 border-primary/10 bg-black/25 py-5 sm:py-10">
      <div
        ref={viewportRef}
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
        }}
      >
        <div className={`flex w-max ${dimensions ? "clients-marquee-track" : ""}`}>
          {Array.from(
            { length: dimensions?.copies ?? 1 },
            (_, copyIndex) => (
              <div
                key={copyIndex}
                ref={copyIndex === 0 ? groupRef : undefined}
                aria-hidden={copyIndex !== 0}
                className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
              >
                {clients.map(({ src, name }) => (
                  <span
                    key={src}
                    className="flex h-8 shrink-0 items-center opacity-75 transition-opacity hover:opacity-100 sm:h-10"
                  >
                    <Image
                      src={src}
                      alt={name}
                      width={200}
                      height={54}
                      sizes="200px"
                      style={{ width: "auto" }}
                      className="h-8 w-auto object-contain brightness-0 invert sm:h-10"
                    />
                  </span>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
