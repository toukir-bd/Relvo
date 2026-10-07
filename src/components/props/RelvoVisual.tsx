"use client";

import {
  Box,
  CircleDot,
  LayoutTemplate,
  MousePointer2,
  Palette,
  Sparkles,
  Waypoints,
} from "lucide-react";

type RelvoVisualProps = {
  activeSlide: number;
};

const visualStates = [
  {
    eyebrow: "01 / BRAND IDENTITY",
    title: "Distinctive",
    description: "Visual language that makes your brand recognisable.",
    accent: "#BBFF00",
  },
  {
    eyebrow: "02 / USER EXPERIENCE",
    title: "Clear",
    description: "Simple interfaces built for real user behaviour.",
    accent: "#BBFF00",
  },
  {
    eyebrow: "03 / DIGITAL STRUCTURE",
    title: "Connected",
    description: "A scalable system aligned with your business purpose.",
    accent: "#BBFF00",
  },
];

export default function RelvoVisual({ activeSlide }: RelvoVisualProps) {
  const current = visualStates[activeSlide] ?? visualStates[0];

  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[480px] overflow-hidden rounded-[28px] border border-white/10 bg-[#061814]/80 p-5 shadow-2xl">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* Dynamic color glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-colors duration-700"
        style={{
          backgroundColor: `${current.accent}25`,
        }}
      />

      {/* Top label */}
      <div className="relative z-20 flex items-start justify-between">
        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.22em]"
            style={{ color: current.accent }}
          >
            {current.eyebrow}
          </p>

          <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.06em] text-white">
            {current.title}
          </h3>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border"
          style={{
            borderColor: `${current.accent}55`,
            color: current.accent,
          }}
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>

      {/* Slide 01 — Brand identity */}
      <div
        className={[
          "absolute inset-x-5 bottom-5 top-[105px] transition-all duration-700",
          activeSlide === 0
            ? "translate-x-0 scale-100 opacity-100"
            : activeSlide > 0
              ? "-translate-x-16 scale-95 opacity-0"
              : "translate-x-16 scale-95 opacity-0",
        ].join(" ")}
      >
        <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-[#0B2520]/90 p-6">
          <div className="flex items-center justify-between">
            <Palette className="h-6 w-6 text-[#BBFF00]" strokeWidth={1.2} />

            <span className="text-[10px] font-medium tracking-[0.18em] text-white/35">
              VISUAL SYSTEM
            </span>
          </div>

          <div className="mt-9 flex items-center justify-center">
            <div className="relative flex h-[175px] w-[175px] items-center justify-center">
              <div className="absolute h-full w-full rotate-12 rounded-[38px] border border-[#BBFF00]/20 bg-[#BBFF00]/10" />
              <div className="absolute h-[145px] w-[145px] -rotate-12 rounded-[32px] border border-white/15 bg-white/5" />
              <div className="absolute h-[112px] w-[112px] rotate-45 rounded-[25px] bg-[#BBFF00] shadow-[0_0_45px_rgba(187,255,0,.4)]" />

              <span className="relative text-[58px] font-black tracking-[-0.14em] text-[#062019]">
                R
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex gap-2">
            {["#BBFF00", "#E8FFC2", "#0D332D", "#FFFFFF"].map((color) => (
              <span
                key={color}
                className="h-8 flex-1 rounded-lg border border-white/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide 02 — Interface / usability */}
      <div
        className={[
          "absolute inset-x-5 bottom-5 top-[105px] transition-all duration-700",
          activeSlide === 1
            ? "translate-x-0 scale-100 opacity-100"
            : activeSlide < 1
              ? "translate-x-16 scale-95 opacity-0"
              : "-translate-x-16 scale-95 opacity-0",
        ].join(" ")}
      >
        <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-[#071D29]/90 p-4">
          <div className="mb-4 flex items-center justify-between">
            <LayoutTemplate
              className="h-6 w-6 text-[#78D9FF]"
              strokeWidth={1.2}
            />

            <span className="text-[10px] font-medium tracking-[0.18em] text-white/35">
              UI / UX DESIGN
            </span>
          </div>

          <div className="relative rounded-[16px] border border-white/10 bg-[#0D2A36] p-4 shadow-[0_20px_50px_rgba(0,0,0,.3)]">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FF6A6A]" />
              <span className="h-2 w-2 rounded-full bg-[#FFD66B]" />
              <span className="h-2 w-2 rounded-full bg-[#78D9FF]" />
            </div>

            <div className="mt-5 h-3 w-[62%] rounded-full bg-white/80" />
            <div className="mt-2 h-2 w-[80%] rounded-full bg-white/15" />
            <div className="mt-2 h-2 w-[52%] rounded-full bg-white/15" />

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-[80px] rounded-xl bg-[#78D9FF]/20 ring-1 ring-[#78D9FF]/30" />
              <div className="h-[80px] rounded-xl bg-white/5" />
            </div>

            <div className="mt-3 h-12 rounded-xl bg-[#78D9FF] shadow-[0_0_30px_rgba(120,217,255,.3)]" />
          </div>

          <div className="absolute bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#78D9FF]/50 bg-[#78D9FF]/15 shadow-[0_0_35px_rgba(120,217,255,.22)]">
            <MousePointer2
              className="h-6 w-6 translate-x-[2px] -translate-y-[2px] text-[#78D9FF]"
              fill="currentColor"
              strokeWidth={1.2}
            />
          </div>
        </div>
      </div>

      {/* Slide 03 — Structure / scalability */}
      <div
        className={[
          "absolute inset-x-5 bottom-5 top-[105px] transition-all duration-700",
          activeSlide === 2
            ? "translate-x-0 scale-100 opacity-100"
            : "translate-x-16 scale-95 opacity-0",
        ].join(" ")}
      >
        <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-[#171126]/90 p-5">
          <div className="flex items-center justify-between">
            <Waypoints
              className="h-6 w-6 text-[#D9A6FF]"
              strokeWidth={1.2}
            />

            <span className="text-[10px] font-medium tracking-[0.18em] text-white/35">
              PRODUCT SYSTEM
            </span>
          </div>

          {/* Connection lines */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 310"
            fill="none"
          >
            <path
              d="M85 170 L200 85 L315 170 L200 245 Z"
              stroke="#D9A6FF"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="5 6"
            />
            <path
              d="M85 170 L315 170 M200 85 L200 245"
              stroke="#D9A6FF"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          </svg>

          <div className="relative mt-12 h-[245px]">
            <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] border border-[#D9A6FF]/50 bg-[#D9A6FF]/20 shadow-[0_0_45px_rgba(217,166,255,.28)]">
              <Box className="h-9 w-9 text-[#D9A6FF]" strokeWidth={1.2} />
            </div>

            <div className="absolute left-[9%] top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <CircleDot className="h-5 w-5 text-white/80" />
            </div>

            <div className="absolute right-[9%] top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <CircleDot className="h-5 w-5 text-white/80" />
            </div>

            <div className="absolute left-1/2 top-[2%] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <CircleDot className="h-5 w-5 text-white/80" />
            </div>

            <div className="absolute bottom-[2%] left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <CircleDot className="h-5 w-5 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom description */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#061814]/85 px-5 py-4 backdrop-blur-md">
        <p className="max-w-[280px] text-[12px] leading-relaxed text-white/50">
          {current.description}
        </p>
      </div>
    </div>
  );
}