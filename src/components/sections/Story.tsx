"use client";

import { useEffect, useRef, useState } from "react";

const text = `
We believe every brand has the potential to rise above the ordinary. It's more than building a website, app, or software.

It's about creating trust, meaningful connections, and digital experiences that leave a lasting impression.

Through thoughtful design and modern development, we help businesses become memorable, build credibility, and grow with confidence.

Every successful partnership begins with trust. We earn it through creativity, transparency, and results. Let's build trust—and together, build a brand that rises above the rest.
`;

export default function Story() {
  const words = text.trim().split(/\s+/);

  const sectionRef = useRef<HTMLElement>(null);

  const [activeWords, setActiveWords] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const sectionHeight = section.offsetHeight;
      const scrollDistance = sectionHeight - viewportHeight;

      const scrolled = -rect.top;

      /*
       * Wait until the text reaches the middle
       * of the viewport before starting.
       */
      const startPoint = viewportHeight * 0.2;

      /*
       * Distance available for the word animation
       * after the start point.
       */
      const animationDistance = scrollDistance - startPoint;

      /*
       * Progress starts at 0 when the start point
       * is reached.
       */
      const progress =
  (scrolled - startPoint) /
  (scrollDistance - startPoint);

      const clampedProgress = Math.max(
        0,
        Math.min(1, progress)
      );

      const wordCount = Math.floor(
        clampedProgress * words.length
      );

      setActiveWords(wordCount);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [words.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh]"
    >
      <div className="sticky top-0 flex min-h-screen w-full items-center justify-center px-[30px]">
        <div className="w-full max-w-[800px] my-[200px]">

          {/* Small heading */}
          <div className="mb-10 text-xl font-medium text-white">
            The story of Relvo Creative begins with ambition.
          </div>

          {/* Animated text */}
          <div className="text-start text-[70px] font-[300] leading-[100px] tracking-wider">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`inline transition-colors duration-300 ${index < activeWords
                    ? "text-white"
                    : "text-[#292929]"
                  }`}
              >
                {word}{" "}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}