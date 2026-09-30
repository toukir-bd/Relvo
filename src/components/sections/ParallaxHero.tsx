"use client";

import Image from "next/image";
import { useState } from "react";

type Pointer = {
  x: number;
  y: number;
};

export default function ParallaxHero() {
  const [pointer, setPointer] = useState<Pointer>({
    x: 0,
    y: 0,
  });

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPointer({
      x: (event.clientX - rect.left - rect.width / 2) / rect.width,
      y: (event.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  const layerStyle = (depth: number) => ({
    transform: `translate3d(${pointer.x * depth}px, ${
      pointer.y * depth
    }px, 0)`,
  });

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#061018]"
    >
      <div
        className="absolute inset-[-4%] will-change-transform transition-transform duration-300 ease-out"
        style={{
          transform: `
            perspective(1200px)
            rotateX(${pointer.y * -4}deg)
            rotateY(${pointer.x * 5}deg)
            scale(1.05)
          `,
        }}
      >
        {/* Background sky/image */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={layerStyle(10)}
        >
          <Image
            src="/img/hero/parallax-bg.webp"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Back mountain or architecture PNG */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={layerStyle(28)}
        >
          <Image
            src="/img/hero/parallax-back.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Large hero typography */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center transition-transform duration-300 ease-out"
          style={layerStyle(42)}
        >
          <div className="px-6 text-center text-white">
            <p className="text-[clamp(20px,2.4vw,42px)] font-light uppercase tracking-[0.35em]">
              Relvo Creative
            </p>

            <h1 className="mt-2 text-[clamp(76px,13vw,240px)] font-black leading-[0.78] tracking-[-0.08em]">
              CRAFTING
              <br />
              DIGITAL
              <br />
              <span className="text-primary">WORLDS</span>
            </h1>
          </div>
        </div>

        {/* Front transparent PNG */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-transform duration-300 ease-out"
          style={layerStyle(72)}
        >
          <Image
            src="/img/hero/parallax-front.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Readability overlay */}
      <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-b from-black/25 via-transparent to-[#061018]/70" />

      <p className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-white/70">
        Move your cursor to explore
      </p>
    </section>
  );
}