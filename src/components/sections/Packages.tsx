"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    category: "01 / BRAND STRATEGY",
    title: "Build brands\nthat rise.",
    image: "/img/projects/project-01.webp",
  },
  {
    category: "02 / DIGITAL DESIGN",
    title: "Design experiences\npeople remember.",
    image: "/img/projects/project-02.webp",
  },
  {
    category: "03 / DEVELOPMENT",
    title: "Turn ideas\ninto digital reality.",
    image: "/img/projects/project-03.webp",
  },
  {
    category: "04 / DIGITAL PRODUCTS",
    title: "Create products\nbuilt to grow.",
    image: "/img/projects/project-04.webp",
  },
  {
    category: "05 / EXPERIENCE",
    title: "Make every\ninteraction matter.",
    image: "/img/projects/project-05.webp",
  },
];

const buttonClass =
  "mt-[30px] flex w-fit items-center gap-5 border border-white/30 px-[20px] py-[12px] text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white";

export default function HorizontalStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [sectionHeight, setSectionHeight] = useState("100vh");

  const distanceRef = useRef(0);

  /*
   * ---------------------------------------------------------
   * Calculate horizontal distance
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const calculateDimensions = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) return;

      const horizontalDistance =
        track.scrollWidth - viewport.clientWidth;

      const distance = Math.max(0, horizontalDistance);

      distanceRef.current = distance;

      /*
       * Vertical distance required to complete
       * the horizontal slider.
       */
      setSectionHeight(
        `${window.innerHeight + distance}px`
      );
    };

    calculateDimensions();

    const observer = new ResizeObserver(() => {
      calculateDimensions();
    });

    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener(
      "resize",
      calculateDimensions
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        calculateDimensions
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * Vertical scroll → horizontal slider
   * ---------------------------------------------------------
   */
  useEffect(() => {
    let frame = 0;

    const updateSlider = () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) {
        frame = 0;
        return;
      }

      const horizontalDistance =
        distanceRef.current;

      if (horizontalDistance <= 0) {
        frame = 0;
        return;
      }

      const rect =
        section.getBoundingClientRect();

      /*
       * Before the section reaches top:
       * horizontal position stays at 0.
       */
      if (rect.top > 0) {
        track.style.transform =
          "translate3d(0px, 0px, 0px)";

        frame = 0;
        return;
      }

      /*
       * How far the page has travelled
       * through this section.
       */
      const scrolled = Math.max(
        0,
        -rect.top
      );

      /*
       * Total vertical distance available.
       */
      const verticalDistance =
        section.offsetHeight -
        window.innerHeight;

      if (verticalDistance <= 0) {
        frame = 0;
        return;
      }

      /*
       * 0 → 1
       */
      const progress = Math.min(
        1,
        Math.max(
          0,
          scrolled / verticalDistance
        )
      );

      /*
       * Convert vertical progress
       * to horizontal movement.
       */
      const translateX =
        horizontalDistance * progress;

      track.style.transform =
        `translate3d(${-translateX}px, 0, 0)`;

      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;

      frame =
        requestAnimationFrame(
          updateSlider
        );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    updateSlider();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#051313]" style={{ height: sectionHeight }}>
      <div ref={viewportRef} className="sticky py-[100px] top-0 flex w-full flex-col justify-center overflow-hidden">
        <div className="mb-[70px] px-[4.5vw]">
          <h2 className="max-w-[700px] font-[var(--font-denton)] text-[clamp(52px,6vw,100px)] font-medium leading-[0.9] tracking-[-0.045em] text-white">
            upgrade your life.<br/> bit by bit.
          </h2>
        </div>

        {/* =================================================
            HORIZONTAL TRACK
            ================================================= */}

        <div className="w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex w-max gap-[16px] pl-[4.5vw] pr-[4.5vw] will-change-transform"
          >
            {cards.map((card) => (
              <article
                key={card.category}
                className="relative h-[620px] w-[32vw] min-w-[420px] max-w-[540px] shrink-0 overflow-hidden border border-white/20 bg-black"
              >
                <div className="relative z-10 flex h-full flex-col p-[32px]">

                  {/* Category */}

                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/70">
                      {card.category}
                    </span>
                  </div>

                  {/* Title */}

                  <h3 className="mt-[36px] max-w-[400px] whitespace-pre-line text-[clamp(30px,3vw,52px)] font-medium leading-[0.95] tracking-[-0.035em] text-white">
                    {card.title}
                  </h3>

                  {/* Button */}

                  <button
                    type="button"
                    className={buttonClass}
                  >
                    Know more

                    <span className="text-[16px]">
                      →
                    </span>
                  </button>

                  {/* Image */}

                  <div className="absolute inset-x-0 bottom-0 h-[62%]">
                    <Image
                      src={card.image}
                      alt={card.title.replace(
                        "\n",
                        " "
                      )}
                      fill
                      sizes="540px"
                      className="object-cover object-center"
                    />
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