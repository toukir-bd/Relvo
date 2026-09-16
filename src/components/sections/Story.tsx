"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    number: "01",
    text: "We believe every brand has the potential to rise above the ordinary.",
  },
  {
    number: "02",
    text: "It's more than building a website, app, or software.",
  },
  {
    number: "03",
    text: "It's about creating trust, meaningful connections, and digital experiences that leave a lasting impression.",
  },
  {
    number: "04",
    text: "Through thoughtful design and modern development, we help businesses become memorable, build credibility, and grow with confidence.",
  },
  {
    number: "05",
    text: "Every successful partnership begins with trust. We earn it through creativity, transparency, and results.",
  },
  {
    number: "06",
    text: "Let's build trust — and together, build a brand that rises above the rest.",
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

      /*
       * Available scroll distance while the inner content is sticky.
       */
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
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0D332D]"
      /*
       * One initial viewport + one scroll phase for every slide.
       */
      style={{
        height: `${(slides.length + 1) * 100}dvh`,
      }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="flex h-full w-full items-center justify-center px-6 lg:px-[60px]">
          <div className="relative w-full max-w-[1400px]">
            <div className="mb-8">
              <p className="text-[18px] font-medium leading-[1.4] text-white">
                The story of Relvo Creative begins with ambition.
              </p>
            </div>

            <div className="relative h-[500px] w-full overflow-hidden">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;
                const isPrevious = index < activeSlide;

                /*
                 * 0 → 1 progress only for this specific slide.
                 */
                const slideProgress = clamp(
                  scrollProgress * slides.length - index,
                );

                const words = slide.text.split(" ");

                return (
                  <div
                    key={slide.number}
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
                      <div className="mb-8">
                        <span className="text-[14px] font-medium tracking-[0.2em] text-[#FF8D28]">
                          {slide.number}
                        </span>
                      </div>

                      <p className="max-w-[1150px] text-[clamp(42px,6vw,90px)] font-light leading-[1.08] tracking-[-0.04em]">
                        {words.map((word, wordIndex) => {
                          /*
                           * Each word receives its own reveal progress.
                           */
                          const wordProgress = clamp(
                            slideProgress * words.length - wordIndex + 0.35,
                          );

                          const wordOpacity =
                            0.16 + wordProgress * 0.84;

                          return (
                            <span
                              key={`${word}-${wordIndex}`}
                              className="transition-colors duration-100 ease-out"
                              style={{
                                color: `rgba(255, 255, 255, ${wordOpacity})`,
                              }}
                            >
                              {word}{" "}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.number}
                  className={[
                    "h-[2px] transition-all duration-500",

                    index === activeSlide
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