"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { serviceOptions } from "@/data/services";

const HOLD_SCROLL = .5; // 1 viewport before and after horizontal movement

export default function HomeServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [sectionHeight, setSectionHeight] = useState("100vh");
  const distanceRef = useRef(0);

  useEffect(() => {
    const calculateDimensions = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const horizontalDistance = Math.max(
        0,
        track.scrollWidth - viewport.clientWidth,
      );
      const holdDistance = window.innerHeight * HOLD_SCROLL;
      const totalVerticalScroll = horizontalDistance + holdDistance * 2;
      distanceRef.current = horizontalDistance;
      setSectionHeight(
        `${window.innerHeight + totalVerticalScroll}px`,
      );
    };

    calculateDimensions();
    const observer = new ResizeObserver(calculateDimensions);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", calculateDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateDimensions);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateSlider = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) {
        frame = 0;
        return;
      }
      const horizontalDistance = distanceRef.current;
      if (horizontalDistance <= 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        frame = 0;
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top > 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        frame = 0;
        return;
      }
      const verticalDistance = section.offsetHeight - viewportHeight;
      if (verticalDistance <= 0) {
        frame = 0;
        return;
      }
      const holdDistance = viewportHeight * HOLD_SCROLL;
      const scrolledInsideSection = Math.min(
        verticalDistance,
        Math.max(0, -rect.top),
      );
      const movementDistance = Math.max(
        1,
        verticalDistance - holdDistance * 2,
      );
      const progress = Math.min(
        1,
        Math.max(
          0,
          (scrolledInsideSection - holdDistance) /
            movementDistance,
        ),
      );
      const translateX = horizontalDistance * progress;
      track.style.transform = `translate3d(${-translateX}px, 0, 0)`;
      frame = 0;
    };
    const handleScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateSlider);
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);
    updateSlider();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: sectionHeight }}>
      <div ref={viewportRef} className="sticky top-0 relative flex w-full flex-col justify-center overflow-hidden py-14 sm:py-20 lg:py-[120px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40"
          style={{backgroundImage: `linear-gradient(rgb(187 255 0 / 7%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 7%) 1px, transparent 1px)`,
            backgroundSize: "4px 4px",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(55vh,520px)] w-[min(76vw,1000px)] -translate-x-1/2 -translate-y-1/2
        rounded-[48px] bg-primary/[0.07] blur-[110px]"/>
        <div className="relative z-10 mb-10 px-4 sm:mb-14 sm:px-6 lg:mb-[46px] lg:px-[6vw]">
          <h2 className="focus-title max-w-5xl text-[clamp(40px,7vw,94px)] font-[700] leading-[0.95] tracking-normal text-white">
            <span className="hero-text-neon pe-3">clear service lifecycles</span>
          </h2>
        </div>
        <div className="w-full overflow-visible">
          <div ref={trackRef} className="relative z-10 flex w-max gap-5 px-10 sm:gap-7 sm:px-7 lg:gap-12 lg:pl-[6vw] lg:pr-[6vw]">
            {serviceOptions.map((service) => (
              <article key={service.id} className="group relative h-[min(76svh,580px)] min-h-[460px] w-[min(86vw,520px)] shrink-0 overflow-hidden rounded-[34px] bg-primary/3.5
                sm:w-[min(60vw,520px)] sm:rounded-[40px] lg:h-[580px] lg:w-[min(38vw,520px)]">
                <div aria-hidden="true" className="pointer-events-none absolute -left-[18%] -top-[22%] z-0 aspect-square w-[105%] rounded-full bg-primary/[0.1] blur-[100px]"/>
                <div aria-hidden="true" className="pointer-events-none absolute -right-[50%] -top-[42%] z-0 aspect-square w-[90%] rounded-full bg-secondary/[0.35] blur-[50px]"/>
                <Link
                  href={`/services#service-${service.id}`}
                  aria-label={`Explore ${service.name}`}
                  className="absolute right-5 top-5 z-30 flex size-14 items-center justify-center rounded-[18px] bg-primary/[0.18] text-primary transition duration-300 hover:rotate-45 hover:bg-primary hover:text-black sm:right-7 sm:top-7 sm:size-17 sm:rounded-[20px]"
                >
                  <ArrowUpRight size={30} strokeWidth={1} />
                </Link>
                <div className="absolute inset-x-[8%] bottom-[30%] z-10 h-[32%]">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 420px, 78vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="relative z-20 flex h-full flex-col p-6 sm:p-8">
                  <span className="w-fit max-w-[74%] rounded-full bg-primary/[0.1] px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-primary/90 sm:text-[16px]">
                    {service.name}
                  </span>
                  <span className="mt-6 max-w-[88%] whitespace-pre-line text-[clamp(25px,3.2vw,34px)] font-[400] leading-[1.18] tracking-wide text-white sm:mt-7">
                    {service.headline}
                  </span>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {service.deliverables.slice(0, 4).map((deliverable) => (
                      <span key={deliverable} className="rounded-full capitalize bg-white/[0.05] px-4 py-2.5 text-[13px] font-[500] tracking-wide leading-none text-white/90 sm:text-[16px]">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
