"use client";

import Image from "next/image";
import {
  Box,
  CircleDot,
  LayoutTemplate,
  MousePointer2,
  Palette,
  Waypoints,
} from "lucide-react";

type RelvoVisualProps = {
  activeSlide: number;
};

export default function RelvoVisual({ activeSlide }: RelvoVisualProps) {
  const sceneClass = (index: number) => {
    if (index === activeSlide) return "relvo-card__scene is-active";
    if (index < activeSlide) return "relvo-card__scene is-before";

    return "relvo-card__scene";
  };

  return (
    <div className="relvo-card">
      {/* 01 — Brand identity */}
      <div className={sceneClass(0)}>
        <div className="relvo-card__inner">
          <div className="relvo-card__top">
            <Palette className="h-5 w-5 text-primary" strokeWidth={1.3} />
            <span className="relvo-card__label">VISUAL SYSTEM</span>
          </div>

          <div className="relvo-card__identity">
            <div className="relvo-card__identity-layer-one" />
            <div className="relvo-card__identity-layer-two" />

            <div className="relvo-card__identity-logo">
              <Image
                src="/img/elements/favicon.webp"
                alt="Relvo"
                width={62}
                height={62}
                className="relvo-card__logo-image"
              />
            </div>
          </div>

          <div className="relvo-card__swatches">
            <span className="border-primary/30 bg-primary" />
            <span className="border-primary/20 bg-primary/70" />
            <span className="border-primary/20 bg-primary/35" />
            <span className="border-white/15 bg-white/10" />
          </div>
        </div>
      </div>

      {/* 02 — UI / UX */}
      <div className={sceneClass(1)}>
        <div className="relvo-card__inner">
          <div className="relvo-card__top">
            <LayoutTemplate className="h-5 w-5 text-primary" strokeWidth={1.3} />
            <span className="relvo-card__label">UI / UX DESIGN</span>
          </div>

          <div className="relvo-card__browser">
            <div className="relvo-card__browser-dots">
              <span className="bg-primary" />
              <span className="bg-primary/50" />
              <span className="bg-white/20" />
            </div>

            <div className="relvo-card__line-title" />
            <div className="relvo-card__line w-[80%]" />
            <div className="relvo-card__line w-[52%]" />

            <div className="relvo-card__ui-grid">
              <div className="border border-primary/25 bg-primary/15" />
              <div className="bg-white/5" />
            </div>

            <div className="mt-3 h-12 rounded-xl bg-primary shadow-[0_0_30px_rgba(187,255,0,.28)]" />
          </div>

          <div className="relvo-card__cursor">
            <MousePointer2
              className="h-6 w-6 translate-x-[2px] -translate-y-[2px] text-primary"
              fill="currentColor"
              strokeWidth={1.2}
            />
          </div>
        </div>
      </div>

      {/* 03 — Product system */}
      <div className={sceneClass(2)}>
        <div className="relvo-card__inner">
          <div className="relvo-card__top">
            <Waypoints className="h-5 w-5 text-primary" strokeWidth={1.3} />
            <span className="relvo-card__label">PRODUCT SYSTEM</span>
          </div>

          <div className="relvo-card__nodes">
            <svg
              className="relvo-card__system-svg"
              viewBox="0 0 430 205"
              fill="none"
            >
              <path
                d="M72 104 L215 25 L358 104 L215 182 Z"
                stroke="currentColor"
                strokeOpacity="0.48"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />

              <path
                d="M72 104 L358 104 M215 25 L215 182"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeWidth="1"
              />
            </svg>

            <div className="relvo-card__node-core">
              <Box className="h-8 w-8" strokeWidth={1.2} />
            </div>

            <div className="relvo-card__node left-[4%] top-1/2 -translate-y-1/2">
              <CircleDot className="h-5 w-5" />
            </div>

            <div className="relvo-card__node right-[4%] top-1/2 -translate-y-1/2">
              <CircleDot className="h-5 w-5" />
            </div>

            <div className="relvo-card__node left-1/2 top-0 -translate-x-1/2">
              <CircleDot className="h-5 w-5" />
            </div>

            <div className="relvo-card__node bottom-0 left-1/2 -translate-x-1/2">
              <CircleDot className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}