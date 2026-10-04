"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const slides = [
  {
    number: "01",
    text: "We design distinctive visual identities that help businesses stand out and stay memorable to perform.",
  },
  {
    number: "02",
    text: "A clear design - a must for any brand. Because it matters - 87% of users may leave, lacking usability.",
  },
  {
    number: "03",
    text: "We create a clear and logical structure that aligns your vision and business purpose with user needs.",
  }
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const goToSlide = (index: number) => {
    const section = sectionRef.current;

    if (!section) return;

    const totalScroll = section.offsetHeight - window.innerHeight;
    const progress = index / slides.length;

    const targetY =
      section.getBoundingClientRect().top +
      window.scrollY +
      totalScroll * progress;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let frame = 0;
    const updateStory = () => {
      const section = sectionRef.current;
      if (!section) {
        frame = 0;
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScroll = section.offsetHeight - viewportHeight;
      if (totalScroll <= 0) {
        frame = 0;
        return;
      }
      const scrolledInsideStory = clamp(-rect.top / totalScroll);
      setScrollProgress(scrolledInsideStory);
      const nextSlide = Math.min(
        slides.length - 1,
        Math.floor(scrolledInsideStory * slides.length),
      );
      setActiveSlide(nextSlide);
      frame = 0;
    };
    const handleScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateStory);
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);
    updateStory();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: `${(slides.length + 1) * 100}dvh` }} id="discover-us">
      <div className="sticky py-35 top-0 h-auto w-full overflow-hidden">
        <div className="flex h-full w-full items-center justify-center px-6 lg:px-[60px]">
          <div className="relative w-full max-w-[1000px]">
            {/* <p className="mb-10 text-[32px] text-center font-[300] leading-[1.4] tracking-normal text-primary">
              Relvo is built to create best presence that performs
            </p> */}
            <p className="relative uppercase overflow-hidden mb-10 text-[25px] text-center font-[600] tracking-normal text-primary">
              <span className="relative z-10 invisible">
                Relvo is built to create best presence that performs
              </span>
              <span aria-hidden="true" className="hero-text-neon pointer-events-none absolute inset-0 z-20">
                Relvo is built to create best presence that performs
              </span>
            </p>
            <div className="flex items-end justify-center gap-3">
              <div className="flex items-end gap-2">
                <span key={activeSlide} className="animate-number-fade text-[30px] font-semibold leading-none text-primary">
                  {String(activeSlide + 1).padStart(2, "0")}
                </span>
                <span className="text-[20px] font-light leading-none text-primary/30">
                  /{String(slides.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.number}
                    type="button"
                    aria-label={`Go to slide ${slide.number}`}
                    onClick={() => goToSlide(index)}
                    className={[
                      "h-[3px] cursor-pointer transition-all duration-500",
                      index === activeSlide
                        ? "w-18 bg-white"
                        : "w-6 bg-white/20 hover:bg-white/50",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
            <div className="relative h-[450px] w-full overflow-hidden">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;
                const isPrevious = index < activeSlide;
                const slideProgress = clamp(
                  scrollProgress * slides.length - index,
                );
                const words = slide.text.split(" ");
                return (
                  <div key={slide.number}
                    className={[
                      "absolute inset-0 flex items-start mt-12",
                      "transition-all duration-700",
                      "ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "translate-y-0 opacity-100"
                        : isPrevious
                          ? "-translate-y-[100px] opacity-0"
                          : "translate-y-[100px] opacity-0",
                    ].join(" ")}
                  >
                    <div className="w-full">
                      <h3 className="max-w-[1150px] text-[64px] text-center font-[400] leading-[1.5] -tracking-[1px] text-white">
                        {words.map((word, wordIndex) => {
                          const wordProgress = clamp(
                            slideProgress * words.length - wordIndex + 0.35,
                          );
                          const wordOpacity = 0.16 + wordProgress * 0.84;
                          return (
                            <span
                              key={`${word}-${wordIndex}`}
                              className="transition-colors duration-100 ease-out"
                              style={{ color: `rgba(255, 255, 255, ${wordOpacity})` }}>
                              {word}{" "}
                            </span>
                          );
                        })}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center">
              <Link href="/about" className="btn-relvo">
                Know More About Us
                <span className="iconArea">
                  <ArrowUpRight strokeWidth={1} className="btnIcon"/>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}