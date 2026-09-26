"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    number: "01",
    text: "We design distinctive brands and visual identities that help businesses stand out and stay memorable.",
  },
  {
    number: "02",
    text: "We design and develop modern websites that are beautiful, intuitive, and built to perform.",
  },
  {
    number: "03",
    text: "We create user-focused mobile apps, dashboards, and digital products that make complex experiences simple.",
  },
  {
    number: "04",
    text: "We combine thoughtful UX/UI design with modern development to turn ideas into scalable digital solutions.",
  },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
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
    <section ref={sectionRef} className="relative w-full bg-secondary" style={{ height: `${(slides.length + 1) * 100}dvh` }} id="discover-us">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="flex h-full w-full items-center justify-center px-6 lg:px-[60px]">
          <div className="relative w-full max-w-[1000px]">
            <div className="mb-10">
              <p className="text-[27px] text-center font-[300] leading-[1.4] tracking-normal text-primary">
                RELVO is built to create best presence that performs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span key={activeSlide} className="animate-number-fade text-[22px] font-semibold leading-none text-primary">
                {String(activeSlide + 1).padStart(2, "0")}
              </span>
              <span className="text-[14px] font-light leading-none text-primary/30">
                /{String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="relative h-[500px] w-full overflow-hidden">
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
                      "absolute inset-0 flex items-center",
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
                      <h3 className="max-w-[1150px] text-6xl text-start font-[400] leading-[1.5] tracking-tight text-white">
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
            <div className="mt-8 flex items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.number}
                  className={["h-[2px] transition-all duration-500", index === activeSlide
                      ? "w-16 bg-white"
                      : "w-5 bg-white/20",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}