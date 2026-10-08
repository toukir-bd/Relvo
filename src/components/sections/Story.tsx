"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import RelvoVisual from "@/components/props/RelvoVisual";

const slides = [
  {
    number: "01",
    text: "We design distinctive visual identities that help businesses stand out and stay memorable to perform.",
  },
  {
    number: "02",
    text: "A clear design is a must for every brand. Because it matters, users may leave when usability is missing.",
  },
  {
    number: "03",
    text: "We create a clear and logical structure that aligns your vision and business purpose with user needs.",
  },
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
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop + totalScroll * (index / slides.length),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let frameId = 0;

    const updateStory = () => {
      const section = sectionRef.current;

      if (!section) {
        frameId = 0;
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        frameId = 0;
        return;
      }

      const nextProgress = clamp(-sectionRect.top / scrollableDistance);

      const nextSlide = Math.min(
        slides.length - 1,
        Math.floor(nextProgress * slides.length),
      );

      setScrollProgress(nextProgress);
      setActiveSlide((currentSlide) =>
        currentSlide === nextSlide ? currentSlide : nextSlide,
      );

      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateStory);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    frameId = window.requestAnimationFrame(updateStory);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discover-us"
      className="relative w-full "
      style={{
        height: `${(slides.length + 1) * 100}dvh`,
      }}
    >
      <div className="sticky top-0 flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative mx-auto flex-col flex min-h-screen w-full justify-center overflow-hidden">
          {/*Background grid*/}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(rgb(187 255 0 / 7%) 1px, transparent 1px),
                linear-gradient(90deg, rgb(187 255 0 / 7%) 1px, transparent 1px)
              `,
              backgroundSize: "42px 42px",
            }}
          />
          {/*Background glow*/}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[850px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"/>

          <RelvoVisual activeSlide={activeSlide} />
          <p className="relative overflow-hidden text-center text-[13px] font-medium uppercase tracking-[0.28em] text-primary sm:text-[16px] lg:text-[20px]">
            <span className="invisible">
              Relvo is built to create a presence that performs
            </span>
            <span aria-hidden="true" className="hero-text-neon pointer-events-none absolute inset-0">
              Relvo is built to create a presence that performs
            </span>
          </p>
          <div className="my-7 relative flex items-center min-h-[320px] w-full max-w-[1365px] mx-auto overflow-hidden">
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;
              const isPrevious = index < activeSlide;
              const words = slide.text.split(" ");
              const slideProgress = clamp(
                scrollProgress * slides.length - index,
              );
              return (
                <div key={slide.number}
                  className={[ "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : isPrevious
                        ? "-translate-y-[100px] opacity-0"
                        : "translate-y-[100px] opacity-0",
                  ].join(" ")}
                >
                  <h2 className="w-full text-center text-[37px] font-light leading-[1.2] tracking-tight text-white sm:text-[55px] lg:text-[73px] xl:text-[80px]">
                    {words.map((word, wordIndex) => {
                      const wordProgress = clamp( slideProgress * words.length - wordIndex + 0.55, );
                      return (
                        <span key={`${slide.number}-${wordIndex}`} className="inline-block transition-[opacity,transform] duration-100"
                          style={{ opacity: 0.15 + wordProgress * 0.85, transform: `translateY(${(1 - wordProgress) * 16}px)`,}}>
                          {word}&nbsp;
                        </span>
                      );
                    })}
                  </h2>
                </div>
              );
            })}
          </div>
          <div className="mb-5 flex items-end justify-center gap-2">
            <span key={activeSlide} className="animate-number-fade text-[34px] font-normal leading-none text-primary">
              {String(activeSlide + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] text-white/30">
              /{String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button key={slide.number} type="button" onClick={() => goToSlide(index)} aria-label={`Go to slide ${slide.number}`}
                className={[ "h-[2px] cursor-pointer transition-all duration-500",
                  index === activeSlide
                    ? "w-16 bg-primary"
                    : "w-5 bg-white/20 hover:bg-primary/60",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}