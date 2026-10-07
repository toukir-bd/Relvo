"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Clients from "@/components/sections/Clients";
import RelvoVisual from "@/components/props/RelvoVisual";

const slides = [
  {
    number: "01",
    text: "We design distinctive visual identities that help businesses stand out and stay memorable to perform.",
    accent: "#BBFF00",
  },
  {
    number: "02",
    text: "A clear design is a must for every brand. Because it matters, users may leave when usability is missing.",
    accent: "#78D9FF",
  },
  {
    number: "03",
    text: "We create a clear and logical structure that aligns your vision and business purpose with user needs.",
    accent: "#D6A4FF",
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

  const currentAccent = slides[activeSlide].accent;
  const visualFloat = Math.sin(scrollProgress * Math.PI * slides.length) * -12;

  return (
    <section
      ref={sectionRef}
      id="discover-us"
      className="relative w-full"
      style={{
        height: `${(slides.length + 1) * 100}dvh`,
      }}
    >
      <div className="sticky top-0 flex min-h-screen w-full items-center overflow-hidden py-24 lg:py-28">
        <div className="w-full px-6 lg:px-[60px]">
          <div className="relative mx-auto w-full max-w-[1600px]">
            <div className="grid items-center gap-10 lg:grid-cols-3 lg:gap-16">
              {/* Left visual */}
              <div
                className="relative transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${visualFloat}px)`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] transition-colors duration-700"
                  style={{
                    backgroundColor: `${currentAccent}22`,
                  }}
                />

                <RelvoVisual activeSlide={activeSlide} />
              </div>

              {/* Right content */}
              <div className="relative lg:col-span-2">
                <p className="relative mb-10 overflow-hidden text-center text-[13px] font-medium uppercase tracking-[0.28em] text-primary sm:text-[16px] lg:text-[20px]">
                  <span className="invisible">
                    Relvo is built to create a presence that performs
                  </span>

                  <span
                    aria-hidden="true"
                    className="hero-text-neon pointer-events-none absolute inset-0"
                  >
                    Relvo is built to create a presence that performs
                  </span>
                </p>

                {/* Slide number */}
                <div className="mb-5 flex items-end justify-center gap-2">
                  <span
                    key={activeSlide}
                    className="animate-number-fade text-[34px] font-black leading-none sm:text-[42px]"
                    style={{ color: currentAccent }}
                  >
                    {String(activeSlide + 1).padStart(2, "0")}
                  </span>

                  <span className="pb-1 text-[15px] font-medium leading-none text-white/25 sm:text-[17px]">
                    /{String(slides.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Text slides */}
                <div className="relative h-[285px] overflow-hidden sm:h-[260px] lg:h-[320px]">
                  {slides.map((slide, slideIndex) => {
                    const isActive = slideIndex === activeSlide;
                    const isPrevious = slideIndex < activeSlide;

                    const currentSlideProgress = clamp(
                      scrollProgress * slides.length - slideIndex,
                    );

                    const words = slide.text.split(" ");

                    return (
                      <div
                        key={slide.number}
                        className={[
                          "absolute inset-0 flex items-start justify-center",
                          "transition-all duration-700",
                          "ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive
                            ? "translate-y-0 opacity-100"
                            : isPrevious
                              ? "-translate-y-[120px] opacity-0"
                              : "translate-y-[120px] opacity-0",
                        ].join(" ")}
                      >
                        <h2 className="max-w-[1050px] text-center text-[38px] font-light leading-[1.16] tracking-[-0.04em] text-white sm:text-[52px] lg:text-[66px]">
                          {words.map((word, wordIndex) => {
                            const wordProgress = clamp(
                              currentSlideProgress * words.length -
                                wordIndex +
                                0.55,
                            );

                            const opacity = 0.14 + wordProgress * 0.86;
                            const translateY = (1 - wordProgress) * 14;

                            return (
                              <span
                                key={`${slide.number}-${wordIndex}`}
                                className="inline-block transition-[color,transform] duration-100 ease-out"
                                style={{
                                  color: `rgba(255, 255, 255, ${opacity})`,
                                  transform: `translateY(${translateY}px)`,
                                }}
                              >
                                {word}&nbsp;
                              </span>
                            );
                          })}
                        </h2>
                      </div>
                    );
                  })}
                </div>

                {/* Progress navigation */}
                <div className="mb-12 flex items-center justify-center gap-2">
                  {slides.map((slide, index) => {
                    const isActive = index === activeSlide;
                    const progress = clamp(
                      scrollProgress * slides.length - index,
                    );

                    return (
                      <button
                        key={slide.number}
                        type="button"
                        aria-label={`Go to slide ${slide.number}`}
                        onClick={() => goToSlide(index)}
                        className="group relative h-[4px] w-10 cursor-pointer overflow-hidden rounded-full bg-white/15 sm:w-16"
                      >
                        <span
                          className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-150"
                          style={{
                            width: isActive ? `${Math.max(10, progress * 100)}%` : "0%",
                            backgroundColor: currentAccent,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clients */}
            <div className="mt-6">
              <p className="relative mb-5 overflow-hidden bg-black/20 py-3 text-center text-[12px] font-medium uppercase tracking-[0.25em] text-primary sm:text-[15px] lg:text-[18px]">
                <span className="invisible">Top partners that we worked with</span>

                <span
                  aria-hidden="true"
                  className="hero-text-neon pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  Top partners that we worked with
                </span>
              </p>

              <Clients />
            </div>

            <div className="mt-10 flex items-center justify-center">
              <Link href="/about" className="btn-relvo">
                <span className="btnText">
                  Meet <b>Relvo</b>
                </span>

                <span className="iconArea">
                  <ArrowUpRight strokeWidth={1.4} className="btnIcon" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}