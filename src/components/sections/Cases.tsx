"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/cases";

const featuredCases = caseStudies.slice(-4);
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (featuredCases.length === 0) return;

    let frameId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        frameId = 0;
        return;
      }

      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        frameId = 0;
        return;
      }

      setScrollProgress(
        clamp(-section.getBoundingClientRect().top / scrollDistance),
      );

      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    frameId = window.requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (featuredCases.length === 0) return null;

  // One case advances per viewport of scroll; the final case holds at the end.
  const slidePosition = Math.min(
    scrollProgress * featuredCases.length,
    featuredCases.length - 1,
  );
  const activeIndex = Math.min(
    Math.round(slidePosition),
    featuredCases.length - 1,
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Featured case studies"
      className="relative w-full"
      style={{ height: `${(featuredCases.length + 1) * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#06140F] text-white">
        {/* Subtle brand grid and glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgb(187 255 0 / 5%) 1px, transparent 1px),
              linear-gradient(90deg, rgb(187 255 0 / 5%) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]"
        />

        <div className="relative mx-auto flex h-full max-w-[1800px] flex-col px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-7 lg:px-10 lg:pb-8 lg:pt-9">
          {/* Section header */}
          <header className="mb-4 flex shrink-0 items-end justify-between gap-4 sm:mb-6 lg:mb-8">
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-primary sm:text-xs">
                Relvo / Selected work
              </p>
              <h2 className="text-3xl font-medium leading-none tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Best projects<span className="text-primary">.</span>
              </h2>
            </div>

            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/35 bg-primary/10 py-2 pl-4 pr-2 text-xs font-medium text-white transition-colors hover:bg-primary hover:text-secondary sm:gap-4 sm:py-2.5 sm:pl-5 sm:pr-2.5 sm:text-sm"
            >
              <span className="hidden sm:inline">Explore all projects</span>
              <span className="sm:hidden">View all</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </header>

          {/* Preview and changing case details */}
          <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-3 sm:gap-5 lg:grid-cols-[1.6fr_0.8fr] lg:grid-rows-1 lg:gap-7">
            {/* Large, scroll-driven preview */}
            <div className="relative min-h-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#0B1E17] sm:rounded-[30px]">
              {featuredCases.map((item, index) => {
                const offset = index - slidePosition;
                const distance = Math.abs(offset);
                const opacity = clamp(1 - distance * 1.05);
                const isActive = index === activeIndex;

                return (
                  <article
                    key={item.slug}
                    aria-hidden={!isActive}
                    className="absolute inset-0 will-change-transform"
                    style={{
                      transform: `translate3d(0, ${offset * 100}%, 0)`,
                      opacity,
                      zIndex: featuredCases.length - Math.round(distance * 10),
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} project preview`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1023px) 100vw, 65vw"
                      className="object-cover"
                      style={{
                        transform: `scale(${1 + Math.min(distance * 0.04, 0.04)})`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />

                    {/* Preview badges */}
                    <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-7 sm:top-7">
                      <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[9px] font-medium tracking-[0.18em] text-white backdrop-blur-md sm:px-4 sm:text-[10px]">
                        {item.badge}
                      </span>

                      <div className="flex gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] text-white/90 backdrop-blur-md sm:px-4 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project name over preview */}
                    <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-10">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/60 sm:text-xs">
                        Case / {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                        {item.title}
                      </h3>
                    </div>
                  </article>
                );
              })}

              {/* Small scroll position marker */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur-md sm:bottom-8 sm:right-8">
                <span className="font-semibold text-primary">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/35">/</span>
                <span>{String(featuredCases.length).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Case title and description fade with scroll */}
            <aside className="relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-5 sm:min-h-[190px] sm:rounded-[30px] sm:p-8 lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:p-10">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary sm:text-xs">
                  Project details
                </p>
                <span className="h-px flex-1 bg-white/10 ml-4" />
              </div>

              <div className="relative min-h-[100px] flex-1 lg:flex lg:items-center">
                {featuredCases.map((item, index) => {
                  const offset = index - slidePosition;
                  const distance = Math.abs(offset);
                  const opacity = clamp(1 - distance * 1.5);
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={item.slug}
                      aria-hidden={!isActive}
                      className="absolute inset-0 flex flex-col justify-center"
                      style={{
                        opacity,
                        transform: `translate3d(0, ${offset * 22}px, 0)`,
                        zIndex: featuredCases.length - Math.round(distance * 10),
                      }}
                    >
                      <p className="mb-3 text-xs tracking-[0.16em] text-white/40">
                        STEP {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Progress indicator */}
              <div
                className="flex items-center gap-2"
                aria-label={`Case ${activeIndex + 1} of ${featuredCases.length}`}
              >
                {featuredCases.map((item, index) => (
                  <span
                    key={item.slug}
                    aria-hidden="true"
                    className={[
                      "h-1 rounded-full transition-[width,background-color] duration-300",
                      index === activeIndex
                        ? "w-10 bg-primary sm:w-14"
                        : "w-4 bg-white/20",
                    ].join(" ")}
                  />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}