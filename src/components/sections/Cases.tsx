
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
const HOLD_VH = 0.35;
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
      <div className="top-0 sticky mx-auto flex flex-col gap-8 min-h-screen w-full max-w-[1600px] items-center justify-center">
        <span className="relative overflow-hidden text-center text-[85px] font-[600] leading-[90px] -tracking-[1px] text-white">
          <h2 className="invisible">
            work that speaks for itself
          </h2>
          <h2 aria-hidden="true" className="hero-text-neon pointer-events-none absolute inset-0">
            work that speaks for itself
          </h2>
        </span>
        <div className="cases-content grid min-h-0 w-full content-center gap-4 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-12">
          <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-96 sm:w-96 sm:blur-[90px]"/>
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-96 sm:w-96 sm:blur-[90px]"/>
          <div className="cases-preview relative h-[clamp(12rem,37svh,23rem)] lg:h-[clamp(30rem,70svh,50rem)]">
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
              const opacity = isCurrent ? 1 - transitionProgress : isIncoming ? 1 : 0;
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
                        <div className="flex items-start justify-between">
                          <span className="ms-1 rounded-full bg-black/50 px-3 py-2 text-[12px] font-semibold tracking-[0.12em] text-white backdrop-blur-sm 
                            sm:px-5 sm:text-[14px] sm:tracking-[0.08em] uppercase">
                            {item.badge}
                          </span>
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
                    <div className="relative h-full flex flex-col items-center justify-center gap-8 p-4 sm:p-8 md:p-10 mx-auto max-w-full w-2xl">
                      <div className="pointer-events-none h-full absolute inset-0 rounded-[30px] sm:rounded-[42px] opacity-[0.12] [background-size:38px_38px]
                        [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]"/>
                      <p className="text-center text-[16px] sm:text-[17px] font-[500] tracking-[0.16em] sm:tracking-[0.14em] text-primary/80 uppercase">
                        Every idea has a bigger possibility
                      </p>
                      <h3 className="text-center text-[4rem] font-semibold leading-[1.1] tracking-tight text-white">
                        Your Ideas, Our Touch<br/>
                        <span className="text-primary font-thin text-[3.5rem] sm:text-[6rem]">
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
          <div className="cases-details relative min-h-[clamp(6.5rem,16svh,9rem)] lg:min-h-[18rem]">
            {previewSlides.map((slide, index) => {
              const isCta = slide.type === "cta";
              const item = slide.type === "case" ? slide.item : null;
              const distance = Math.abs(slidePosition - index);
              const opacity = clamp(1 - distance, 0, 1);
              const yOffset = clamp( (index - slidePosition) * 18, -18, 18 );
              return (
                <div key={item?.slug ?? "all-cases-details"} aria-hidden={index !== displayedIndex}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ opacity, transform: `translate3d(0, ${yOffset}px, 0)`, pointerEvents:
                      index === displayedIndex ? "auto" : "none",
                  }}
                >
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary sm:mb-3 sm:text-xs sm:tracking-[0.24em]">
                    {isCta ? "The full collection" : item?.badge}
                  </p>

                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                    {isCta
                      ? "There’s more to explore."
                      : item?.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 max-w-xl text-xs leading-relaxed text-white/60 sm:mt-4 sm:text-base">
                    {isCta
                      ? "Visit the cases page to see more of our selected work."
                      : item?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
