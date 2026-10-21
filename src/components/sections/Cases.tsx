
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/cases";
import ZoomablePreview from "@/components/props/ZoomablePreview";

const featuredCases = caseStudies.slice(-4);
const previewSlides = [
  ...featuredCases.map((item) => ({
    type: "case" as const,
    item,
  })),
  { type: "cta" as const },
];

const MOVE_VH = 0.85;
const HOLD_VH = 0.5;
const STEP_VH = MOVE_VH + HOLD_VH;
const END_HOLD_VH = 0.8;
const SCALE_MIN = 0.78;
const SCALE_MAX = 1;
const ENTER_Y = 112;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function Cases() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const transitionScrollVh = Math.max(0, previewSlides.length - 1) * STEP_VH;
  const totalScrollVh = transitionScrollVh + END_HOLD_VH;
  const lastIndex = previewSlides.length - 1;

  useEffect(() => {
  let frameId = 0;
  const updateScrollProgress = () => {
    if (frameId) return;
    frameId = window.requestAnimationFrame(() => {
      frameId = 0;
      const section = sectionRef.current;
      if (!section) return;
      const maxScroll = Math.max(
        0,
        section.offsetHeight - window.innerHeight
      );
      const travelled = clamp(
        -section.getBoundingClientRect().top,
        0,
        maxScroll
      );
      setScrollProgress(
        maxScroll > 0 ? travelled / maxScroll : 0
      );
    });
  };

  updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [totalScrollVh]);

  if (featuredCases.length === 0) return null;
  const timelineProgress = scrollProgress * totalScrollVh;
  const completedSteps = Math.floor(timelineProgress / STEP_VH);
  const phaseInStep = timelineProgress - completedSteps * STEP_VH;
  const slidePosition = clamp(
    completedSteps +
    clamp((phaseInStep - HOLD_VH) / MOVE_VH, 0, 1),
    0,
    lastIndex
  );
  const displayedIndex = clamp(
    Math.floor(slidePosition + 0.5),
    0,
    lastIndex
  );
  const transitionIndex = Math.min(
    Math.floor(slidePosition),
    Math.max(0, lastIndex - 1)
  );
  const transitionProgress = clamp(
    slidePosition - transitionIndex,
    0,
    1
  );

  return (
    <section ref={sectionRef} aria-label="Selected projects" className="relative" style={{height:`calc(100svh + ${totalScrollVh * 100}svh)`}}>
      <div className="cases-inner top-0 sticky mx-auto flex min-h-screen w-full max-w-[1600px] flex-col items-center justify-center gap-5 px-4 py-6 sm:gap-8 sm:px-6 lg:gap-12 lg:px-10">
        <h2 className="cases-header hero-text-neon relative overflow-hidden text-center text-[clamp(38px,7vw,85px)] font-[600] leading-[1.05] -tracking-[1px]">
          work that speaks for itself
        </h2>
        <div className="cases-content grid min-h-0 w-full content-center gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-0">
          <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-96 sm:w-96 sm:blur-[90px]"/>
          <div className="cases-preview relative h-[clamp(16rem,42svh,26rem)] lg:h-[clamp(28rem,58svh,44rem)]">
            {previewSlides.map((slide, index) => {
              const item = slide.type === "case" ? slide.item : null;
              const isCurrent = index === transitionIndex;
              const isIncoming = index === transitionIndex + 1;
              const isPrevious = index < transitionIndex;
              const isFuture = index > transitionIndex + 1;
              const outgoingScale = SCALE_MAX - transitionProgress * (SCALE_MAX - SCALE_MIN);
              const incomingScale = SCALE_MIN + transitionProgress * (SCALE_MAX - SCALE_MIN);
              const scale = isCurrent ? outgoingScale : incomingScale;
              const translateY = isIncoming ? (1 - transitionProgress) * ENTER_Y : 0;
              const opacity = isCurrent
                ? 1 - transitionProgress
                : isIncoming
                  ? transitionProgress
                  : 0;
              const isVisible = !isPrevious && !isFuture && (isCurrent || isIncoming);
              return (
                <article
                  key={item?.slug ?? "all-cases-cta"}
                  aria-hidden={index !== displayedIndex}
                  className="absolute inset-0 bg-primary/3 rounded-[30px] sm:rounded-[42px]"
                  style={{
                    zIndex: index + 1,
                    opacity: isVisible ? opacity : 0,
                    transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                    transformOrigin: "center center",
                    willChange: "transform, opacity",
                    pointerEvents: index === displayedIndex ? "auto" : "none",
                    visibility: isVisible ? "visible" : "hidden",
                  }}
                >
                  {item ? (
                    <div>
                      <div className="absolute inset-0 overflow-hidden rounded-[30px] sm:rounded-[42px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 1023px) 100vw, 65vw"
                          priority={index === 0}
                          className="object-cover"
                        />
                      </div>
                      <div className="relative flex h-full flex-col justify-between p-2 sm:p-3 md:p-4">
                        <div className="flex items-start justify-end">
                          <ZoomablePreview
                            src={item.image}
                            alt={item.title}
                            title={item.title}
                            description={item.description}
                            badge={item.badge}
                          />
                        </div>
                      </div>
                    </div>
                    ) : (
                    <div className="relative h-full flex flex-col items-center justify-center gap-8 p-4 sm:p-8 md:p-10 mx-auto w-full w-2xl">
                      <div className="pointer-events-none h-full absolute inset-0 rounded-[30px] sm:rounded-[42px] opacity-[0.12] [background-size:38px_38px]
                        [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]"/>
                      <p className="text-center text-[16px] sm:text-[17px] font-[500] tracking-[0.16em] sm:tracking-[0.14em] text-primary/80 uppercase">
                        Every idea has a bigger possibility
                      </p>
                      <h3 className="text-center text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-white">
                        Your Ideas, Our Touch<br/>
                        <span className="text-primary font-thin text-[clamp(2.25rem,6vw,6rem)] lg:text-[6rem]">
                          More Relvo
                        </span>
                      </h3>
                      <Link href="/cases" className="btn-relvo">
                        <span className="btnText">
                          Explore Best Projects
                        </span>
                        <span className="iconArea">
                          <ArrowUpRight strokeWidth={1.5} />
                        </span>
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Project details */}
          <div className="cases-details relative min-h-[clamp(10rem,24svh,15rem)] lg:min-h-[30rem]">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-full max-h-[24rem] w-[calc(100%+2rem)] max-w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-[44px] bg-gradient-to-r from-primary/18 via-primary/10 to-transparent blur-[90px] sm:blur-[130px]" />
            {previewSlides.map((slide, index) => {
              const isCta = slide.type === "cta";
              const item = slide.type === "case" ? slide.item : null;
              const distance = Math.abs(slidePosition - index);
              const opacity = clamp(1 - distance, 0, 1);
              const yOffset = clamp( (index - slidePosition) * 18, -18, 18 );
              return (
                <div key={item?.slug ?? "all-cases-details"} aria-hidden={index !== displayedIndex}
                  className="absolute inset-0 z-10 flex flex-col justify-center"
                  style={{ opacity, transform: `translate3d(0, ${yOffset}px, 0)`, pointerEvents:
                      index === displayedIndex ? "auto" : "none",
                  }}
                >
                  <div className="mx-auto w-full max-w-2xl rounded-[28px] bg-gradient-to-r from-[#071714]/95 via-[#071714]/55 to-transparent px-5 py-6 sm:rounded-[36px] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                    <div className="mb-5 flex items-center gap-3 sm:mb-7">
                      <span aria-hidden="true" className="h-px w-8 bg-primary sm:w-12" />
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                        {isCta ? "The full collection" : item?.badge}
                      </p>
                    </div>
                    <h3 className="max-w-xl text-[clamp(1.5rem,2.8vw,2.75rem)] font-bold leading-[1.08] tracking-tight text-white">
                      {isCta ? "There’s more to explore." : item?.title}
                    </h3>
                    <p className="mt-4 line-clamp-4 max-w-xl text-[15px] font-medium leading-relaxed tracking-[0.015em] text-white/65 sm:mt-6 sm:text-lg sm:leading-[1.55] lg:text-xl">
                      {isCta
                        ? "Visit the cases page to see more of our selected work."
                        : item?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
