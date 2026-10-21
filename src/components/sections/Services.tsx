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
      <div ref={viewportRef} className="sticky top-0 relative flex w-full flex-col justify-center overflow-hidden py-14 sm:py-20 lg:py-[100px]">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(55vh,520px)] w-[min(76vw,1000px)] -translate-x-1/2 -translate-y-1/2
        rounded-[48px] bg-primary/[0.07] blur-[110px]"/>
        <div className="relative z-10 mb-10 px-4 sm:mb-14 sm:px-6 lg:mb-[64px] lg:px-[6vw]">
          <h2 className="focus-title max-w-5xl text-[clamp(40px,7vw,94px)] font-[700] leading-[0.95] tracking-tight text-white">
            <span className="hero-text-neon pe-3">Clear Service Lifecycles</span>
          </h2>
        </div>
        <div className="w-full overflow-visible">
          <div ref={trackRef} className="relative z-10 flex w-max gap-5 px-10 sm:gap-7 sm:px-7 lg:gap-12 lg:pl-[6vw] lg:pr-[6vw]">
            {serviceOptions.map((service) => (
              <article key={service.id} className="relative h-[min(64svh,480px)] min-h-[300px] w-[min(80vw,680px)] shrink-0 overflow-hidden rounded-[28px]
                sm:w-[min(68vw,680px)] sm:rounded-[32px] lg:h-[580px] lg:w-[max(30vw,560px)] bg-gradient-to-b from-black/25 via-black/10 to-white/5">
                <div className="relative z-20 flex h-full flex-col justify-between p-7 sm:p-10 lg:p-15">
                  <div>
                    <span className="text-[17px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {service.number} / {service.name}
                    </span>
                    <h3 className="mt-10 w-full max-w-full text-[clamp(30px,4.5vw,51px)] font-[800] leading-[1.16] tracking-normal text-white">
                      {service.headline}
                    </h3>
                  </div>
                  <div className="flex w-full items-end justify-between gap-3">
                    <div className="pointer-events-none relative h-20 w-1/4 shrink-0 sm:h-32 sm:w-[30%]">
                      <Image
                        src={`${service.image}?v=ffffff`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 220px, 34vw"
                        className="object-contain object-left-bottom brightness-0 invert opacity-40"
                        unoptimized
                      />
                    </div>
                    <Link href={`/services#service-${service.id}`} className="btn-relvo w-fit">
                      <span className="btnText">Explore Service</span>
                      <span className="iconArea">
                        <ArrowUpRight strokeWidth={1.5} />
                      </span>
                    </Link>
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
