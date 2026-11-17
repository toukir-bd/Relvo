"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

const team = [
  { name: "Toukir Rahman", role: "Founder & MD" },
  { name: "Turzaun Toma", role: "Chairman" },
  { name: "Tomal Ahmed", role: "CTO" },
  { name: "Shakil Mahmud", role: "Senior Software Engineer" },
  { name: "Shipan Mazumder", role: "Senior Software Architect" },
  { name: "Akash Chowdhury", role: "Frontend Engineer" },
  { name: "Pavel Ahmed", role: "Senior UI/UX Designer" },
  { name: "Niloy Karmokar", role: "Senior Graphics Designer" },
];

export default function CoreTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const horizontalDistanceRef = useRef(0);
  const holdDistanceRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState("100svh");
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    let frame = 0;

    const updateSlider = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) {
        frame = 0;
        return;
      }

      const horizontalDistance = horizontalDistanceRef.current;
      if (horizontalDistance <= 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        frame = 0;
        return;
      }

      const scrolledIntoSection = Math.max(0, -section.getBoundingClientRect().top);
      const progress = Math.min(1, Math.max(0,
        (scrolledIntoSection - holdDistanceRef.current) / horizontalDistance,
      ));
      track.style.transform = `translate3d(${-horizontalDistance * progress}px, 0, 0)`;
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSlider);
    };

    const measure = () => {
      const slider = sliderRef.current;
      const track = trackRef.current;
      if (!slider || !track) return;

      const horizontalDistance = Math.max(0, track.scrollWidth - slider.clientWidth);
      const holdDistance = window.innerHeight * 0.2;
      horizontalDistanceRef.current = horizontalDistance;
      holdDistanceRef.current = holdDistance;
      setSectionHeight(`${window.innerHeight + horizontalDistance + holdDistance * 2}px`);
      scheduleUpdate();
    };

    const observer = new ResizeObserver(measure);
    if (stickyRef.current) observer.observe(stickyRef.current);
    if (sliderRef.current) observer.observe(sliderRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function slide(direction: -1 | 1) {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    const horizontalDistance = horizontalDistanceRef.current;
    if (!section || !slider || horizontalDistance <= 0) return;

    const sectionStart = section.getBoundingClientRect().top + window.scrollY;
    const horizontalStart = sectionStart + holdDistanceRef.current;
    const horizontalEnd = horizontalStart + horizontalDistance;
    const target = Math.min(
      horizontalEnd,
      Math.max(horizontalStart, window.scrollY + direction * slider.clientWidth * 0.8),
    );

    scrollTo(target, false, 0.65);
  }

  return (
    <section ref={sectionRef} aria-labelledby="core-team-title" className="relative isolate" style={{ height: sectionHeight }}>
      <div ref={stickyRef} className="sticky top-0 flex h-svh flex-col justify-center overflow-visible py-8 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/3 -z-10 size-[28rem] rounded-full bg-primary/[0.07] blur-[110px]" />

        <div className="mb-6 flex items-end justify-between gap-5 px-5 sm:mb-9 sm:px-8 lg:px-20 xl:px-32">
          <header className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">The core team</p>
            <h2 id="core-team-title" className="focus-title mt-3 text-[clamp(2.5rem,6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              The people behind <span className="hero-text-neon">the work.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-lg sm:leading-8">
              Meet the people bringing strategy, design, and technology together at Relvo.
            </p>
          </header>

          <div className="mb-1 flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => slide(-1)} aria-label="Show previous team members" className="grid size-11 place-items-center rounded-full border border-white/10 bg-primary/[0.025] text-white/75 transition hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-12">
              <ArrowLeft size={19} strokeWidth={1.7} />
            </button>
            <button type="button" onClick={() => slide(1)} aria-label="Show next team members" className="grid size-11 place-items-center rounded-full border border-white/10 bg-primary/[0.025] text-white/75 transition hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-12">
              <ArrowRight size={19} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div className="overflow-visible ps-5 pe-5 sm:ps-8 sm:pe-8 lg:ps-20 lg:pe-20 xl:ps-32 xl:pe-32">
          <div ref={sliderRef} role="region" aria-label="Relvo team members" tabIndex={0} className="overflow-visible outline-none">
            <div ref={trackRef} className="flex w-max gap-4 will-change-transform sm:gap-5">
              {team.map(({ name, role }) => (
                <article key={name} className="group w-[min(78vw,330px)] shrink-0 rounded-[28px] border border-white/[0.08] bg-primary/[0.025] p-3 transition-colors duration-300 hover:border-primary/25 sm:w-[340px] sm:rounded-[34px] sm:p-4 xl:w-[calc((100%_-_3.75rem)/4)]">
                  <div aria-label={`Photo placeholder for ${name}`} role="img" className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[20px] bg-secondary/80 text-primary/45 sm:rounded-[26px]">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20 [background-size:14px_14px] [background-image:radial-gradient(circle,rgba(187,255,0,0.55)_0.7px,transparent_1px)]" />
                    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-3xl" />
                    <UserRound size={64} strokeWidth={0.8} className="relative transition-transform duration-500 group-hover:scale-105 sm:size-[76px]" />
                    <span className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">Portrait</span>
                  </div>

                  <div className="px-3 pb-4 pt-5 sm:px-4 sm:pb-5 sm:pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/85 sm:text-sm">{role}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">{name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
