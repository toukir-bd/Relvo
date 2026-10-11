"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function Cases() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const transitionScrollVh = Math.max(0, previewSlides.length - 1) * STEP_VH;
  const totalScrollVh = transitionScrollVh + END_HOLD_VH;

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
        // Map the section's full scroll distance onto the animation timeline.
        const progress = maxScroll > 0 ? travelled / maxScroll : 0;
        setScrollProgress(progress);
      });
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [totalScrollVh]);

  if (featuredCases.length === 0) return null;
  const timelineProgress = scrollProgress * totalScrollVh;
  const completedSteps = Math.floor(timelineProgress / STEP_VH);
  const phaseInStep = timelineProgress - completedSteps * STEP_VH;
  const slidePosition = clamp(
    completedSteps + clamp((phaseInStep - HOLD_VH) / MOVE_VH, 0, 1),
    0,
    previewSlides.length - 1
  );
  const displayedIndex = clamp(
    Math.floor(slidePosition + 0.5),
    0,
    previewSlides.length - 1
  );
  return (
    <section
      ref={sectionRef}
      aria-label="Selected projects"
      className="relative bg-secondary"
      style={{
        height: `calc(100svh + ${totalScrollVh * 100}svh)`,
      }}
    >
      <div className="sticky top-30 min-h-screen">
        <div className="cases-inner mx-auto max-w-[1600px] w-full h-full flex flex-col gap-5 items-center justify-center">
          <header className="w-full cases-header mb-1 flex items-center justify-center gap-3 sm:mb-2">
            <span className="relative overflow-hidden text-center text-[87px] font-[600] leading-[90px] -tracking-[1px] text-white">
              <h2 className="invisible">
                best cases prove it
              </h2>
              <h2 aria-hidden="true" className="hero-text-neon pointer-events-none absolute inset-0">
                best cases prove it
              </h2>
            </span>
          </header>
          <div className="w-full cases-content grid min-h-0 flex-1 content-center gap-4 lg:grid-cols-[1fr_0.75fr] lg:items-center lg:gap-12">
            <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-96 sm:w-96 sm:blur-[90px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-96 sm:w-96 sm:blur-[90px]" />
            <div className="cases-preview relative h-[clamp(12rem,37svh,23rem)] lg:h-[clamp(24rem,62svh,41rem)]">
              {previewSlides.map((slide, index) => {
                const item = slide.type === "case" ? slide.item : null;
                const enterProgress =
                  index === 0 ? 1 : clamp(slidePosition - (index - 1), 0, 1);

                const translateY =
                  index === 0 ? "0%" : `${(1 - enterProgress) * 112}%`;

                const opacity =
                  index === 0 ? 1 : enterProgress;
                return (
                  <article
                    key={item?.slug ?? "all-cases-cta"}
                    aria-hidden={index !== displayedIndex}
                    className="absolute inset-0 rounded-[30px] bg-secondary sm:rounded-[42px]"
                    style={{
                      zIndex: index + 1,
                      opacity,
                      transform: `translate3d(0, ${translateY}, 0)`,
                      willChange: "transform, opacity",
                    }}
                  >
                    {item ? (
                      <>
                        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
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
                            <span className="rounded-full bg-black/35 px-3 py-2 text-[12px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm sm:px-5 sm:text-[14px] sm:tracking-[0.1em]">
                              {item.badge}
                            </span>
                            <ZoomablePreview
                              src={item.image}
                              alt={item.title}
                              title={item.title}
                              description={item.description}
                              badge={item.badge}
                              tags={item.tags}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:38px_38px]" />
                        <div className="relative flex h-full flex-col items-center justify-center gap-10 p-4 sm:p-8 md:p-10">
                          <span className="w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-primary sm:text-xs sm:tracking-[0.2em]">
                            MORE TO EXPLORE
                          </span>
                          <div className="max-w-2xl mx-auto w-full">
                            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-center text-primary/80 sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
                              Thats just the beginning
                            </p>
                            <h3 className="text-[clamp(1.7rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-center text-white">
                              More ideas. More work. <span className="text-primary">More Relvo.</span>
                            </h3>
                            <p className="mt-3 text-center text-xs leading-relaxed text-white/60 sm:mt-4 sm:text-base">
                              Explore the full collection of projects and see
                              what we can create together.
                            </p>
                          </div>
                          <Link href="/cases" className="btn-relvo">
                            <span className="btnText">Best projects</span>
                            <span className="iconArea">
                              <ArrowUpRight strokeWidth={1.5}/>
                            </span>
                          </Link>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
            <div className="cases-details relative min-h-[clamp(6.5rem,16svh,9rem)] lg:min-h-[18rem]">
              {previewSlides.map((slide, index) => {
                const isCta = slide.type === "cta";
                const item = slide.type === "case" ? slide.item : null;
                const distance = Math.abs(slidePosition - index);
                const opacity = clamp(1 - distance, 0, 1);
                const yOffset = clamp((index - slidePosition) * 18, -18, 18);
                return (
                  <div
                    key={item?.slug ?? "all-cases-details"}
                    aria-hidden={index !== displayedIndex}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity,
                      transform: `translate3d(0, ${yOffset}px, 0)`,
                      pointerEvents: index === displayedIndex ? "auto" : "none",
                    }}
                  >
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary sm:mb-3 sm:text-xs sm:tracking-[0.24em]">
                      {isCta ? "The full collection" : item?.badge}
                    </p>
                    <h3 className="text-xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                      {isCta ? "There’s more to explore." : item?.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 max-w-xl text-xs leading-relaxed text-white/60 sm:mt-4 sm:text-base">
                      {isCta
                        ? "Visit the cases page to see more of our selected work."
                        : item?.description}
                    </p>
                    {item && (
                      <div className="mt-3 flex flex-wrap gap-2 sm:mt-5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/60 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        
      `}</style>
    </section>
  );
}