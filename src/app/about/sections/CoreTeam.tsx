"use client";

import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";

const team = [
  { name: "Toukir Rahman", role: "Founder & MD" },
  { name: "Turzaun Toma", role: "Chairman" },
  { name: "Tomal Ahmed", role: "Chief Technology Officer" },
  { name: "Shakil Mahmud", role: "Software Engineer" },
  { name: "Shipan Mazumder", role: "Software Architect" },
  { name: "Akash Chowdhury", role: "Frontend Engineer" },
  { name: "Pavel Ahmed", role: "UI/UX Designer" },
  { name: "Niloy Karmokar", role: "Graphics Designer" },
];

export default function CoreTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const horizontalDistanceRef = useRef(0);
  const holdDistanceRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState("100svh");

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

  return (
    <section ref={sectionRef} aria-labelledby="core-team-title" className="relative isolate" style={{ height: sectionHeight }}>
      <div ref={stickyRef} className="sticky top-0 flex h-svh flex-col justify-center overflow-visible py-8 sm:py-10">
        <div className="mb-6 flex items-end justify-between gap-5 px-5 sm:mb-9 sm:px-8 lg:px-20 xl:px-32">
          <div className="relative">
            <h2 id="core-team-title" className="focus-title text-[clamp(2.5rem,6vw,4.2rem)] leading-[0.98] -tracking-[3px] text-white">
              <span className="hero-text-neon uppercase">behind the products</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed tracking-[0.85px] text-white/85 sm:text-[24px] sm:leading-8">
              Meet the people bringing strategy, design, and technology together at Relvo
            </p>
          </div>
        </div>
        <div className="overflow-visible ps-5 pe-5 sm:ps-8 sm:pe-8 lg:ps-20 lg:pe-20 xl:ps-32 xl:pe-32">
          <div ref={sliderRef} role="region" aria-label="Relvo team members" tabIndex={0} className="overflow-visible outline-none">
            <div ref={trackRef} className="flex w-max gap-4 will-change-transform sm:gap-10">
              {team.map(({ name, role }) => (
                <article key={name} className="relative overflow-hidden group w-[280px] shrink-0 rounded-[28px] p-3 transition-colors duration-300 hover:border-primary/25 sm:w-[300px] sm:rounded-[34px] sm:p-4 xl:w-[350px]">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1"
                    style={{
                      backgroundImage: "linear-gradient(rgb(187 255 0 / 2.5%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 2.5%) 1px, transparent 1px)",
                      backgroundSize: "3px 3px"
                    }}
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/3 -z-10 size-[25rem] rounded-full bg-primary/[0.035] blur-[110px]" />
                  <div aria-label={`Photo placeholder for ${name}`} role="img" className="relative grid h-[350px] place-items-center overflow-hidden rounded-[20px] bg-secondary/80 text-primary/45 sm:rounded-[26px]">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20 [background-size:14px_14px] [background-image:radial-gradient(circle,rgba(187,255,0,0.55)_0.7px,transparent_1px)]" />
                    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-3xl" />
                    <UserRound size={64} strokeWidth={0.8} className="relative transition-transform duration-500 group-hover:scale-105 sm:size-[76px]" />
                    <span className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">Portrait</span>
                  </div>
                  <div className="flex flex-col items-center p-3 sm:p-5">
                    <h2 className="text-xl -tracking-[.25px] text-white sm:text-[23px]">{name}</h2>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary/85 sm:text-[16px]">{role}</p>
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
