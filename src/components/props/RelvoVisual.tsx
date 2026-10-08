"use client";

import Image from "next/image";
import { Box, CircleDot, LayoutTemplate, MousePointer2, Palette, Waypoints } from "lucide-react";

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
    <div className="relative z-10 h-[300px] w-auto">
      <div className="relvo-card">
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
                  src="/img/elements/brand.webp"
                  alt="Relvo"
                  width={52}
                  height={52}
                  className="relvo-card__logo-image"
                />
              </div>
            </div>
            <div className="relvo-card__swatches">
              <span className="bg-primary/50"/>
              <span className="bg-primary/40"/>
              <span className="bg-primary/25"/>
              <span className="bg-white/10"/>
            </div>
          </div>
        </div>

        {/* 02 — UI / UX */}
        <div className={sceneClass(1)}>
          <div className="relvo-card__inner">
            <div className="relvo-card__top">
              <LayoutTemplate className="h-5 w-5 text-primary" strokeWidth={1.3} />
              <span className="relvo-card__label">DESIGN PRESIDENCY</span>
            </div>
            <div className="relvo-card__browser">
              <div className="relvo-card__browser-dots">
                <span className="bg-red-500" />
                <span className="bg-orange-300" />
                <span className="bg-white/20" />
              </div>
              <div className="relvo-card__line-title" />
              <div className="relvo-card__line w-[80%]" />
              <div className="relvo-card__line w-[52%]" />
              <div className="relvo-card__ui-grid">
                <div className="bg-primary/20" />
                <div className="bg-primary/10" />
              </div>
              <div className="mt-3 h-12 rounded-xl bg-primary/40 shadow-[0_0_30px_rgba(187,255,0,.1)]"/>
            </div>
            <div className="relvo-card__cursor">
              <MousePointer2 className="h-6 w-6 text-primary" fill="currentColor" strokeWidth={0}/>
            </div>
          </div>
        </div>
        <div className={sceneClass(2)}>
          <div className="relvo-card__inner">
            <div className="relvo-card__top">
              <Waypoints className="h-5 w-5 text-primary" strokeWidth={1.3} />
              <span className="relvo-card__label">PRODUCT NAVIGATION</span>
            </div>
            <div className="relvo-card__nodes">
              <svg className="relvo-card__system-svg" viewBox="0 0 430 205" fill="none">
                <path
                  d="M72 104 L215 25 L358 104 L215 182 Z"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                  strokeDasharray="5 6"
                />
                <path
                  d="M72 104 L358 104 M215 25 L215 182"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                />
              </svg>
              <div className="relvo-card__node-core">
                <Box className="h-10 w-10" strokeWidth={1}/>
              </div>
              <div className="relvo-card__node left-[11%] top-1/2 -translate-y-1/2">
                <CircleDot className="h-5 w-5" strokeWidth={1.8}/>
              </div>
              <div className="relvo-card__node right-[11%] top-1/2 -translate-y-1/2">
                <CircleDot className="h-5 w-5" strokeWidth={1.8}/>
              </div>
              <div className="relvo-card__node left-1/2 top-0 -translate-x-1/2">
                <CircleDot className="h-5 w-5" strokeWidth={1.8}/>
              </div>
              <div className="relvo-card__node bottom-0 left-1/2 -translate-x-1/2">
                <CircleDot className="h-5 w-5" strokeWidth={1.8}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}