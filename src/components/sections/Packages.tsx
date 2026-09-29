"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HOLD_SCROLL = .5; // 1 viewport before and after horizontal movement

const cards = [
  {
    category: "01 / BRAND STRATEGY",
    title: "Build brands\nthat rise.",
    image: "/img/projects/project-01.webp",
    gradient:
      "bg-[radial-gradient(ellipse_90%_65%_at_50%_100%,#ff0099_0%,#8b0b50_36%,transparent_72%),linear-gradient(180deg,#030303_0%,#100008_100%)]",
  },
  {
    category: "02 / DIGITAL DESIGN",
    title: "Design experiences\npeople remember.",
    image: "/img/projects/project-02.webp",
    gradient:
      "bg-[radial-gradient(ellipse_90%_65%_at_50%_100%,#b236ff_0%,#551187_38%,transparent_72%),linear-gradient(180deg,#030303_0%,#0c0414_100%)]",
  },
  {
    category: "03 / DEVELOPMENT",
    title: "Turn ideas\ninto digital reality.",
    image: "/img/projects/project-03.webp",
    gradient:
      "bg-[radial-gradient(ellipse_100%_65%_at_55%_100%,#00db78_0%,#0064d8_34%,transparent_72%),linear-gradient(180deg,#030303_0%,#00101c_100%)]",
  },
  {
    category: "04 / DIGITAL PRODUCTS",
    title: "Create products\nbuilt to grow.",
    image: "/img/projects/project-04.webp",
    gradient:
      "bg-[radial-gradient(ellipse_90%_65%_at_50%_100%,#ff5a1f_0%,#9c160b_38%,transparent_72%),linear-gradient(180deg,#030303_0%,#160400_100%)]",
  },
  {
    category: "05 / EXPERIENCE",
    title: "Make every\ninteraction matter.",
    image: "/img/projects/project-05.webp",
    gradient:
      "bg-[radial-gradient(ellipse_90%_65%_at_50%_100%,#3e65ff_0%,#43209a_38%,transparent_72%),linear-gradient(180deg,#030303_0%,#050315_100%)]",
  },
];

const buttonClass =
  "mt-[30px] flex w-fit items-center gap-5 border border-white/30 px-[20px] py-[12px] text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black";

export default function HorizontalStory() {
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

      /*
       * Initial hold + horizontal travel + final hold.
       */
      const totalVerticalScroll =
        horizontalDistance + holdDistance * 2;

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

      /*
       * Before this section reaches the viewport top,
       * always keep the first card visible.
       */
      if (rect.top > 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        frame = 0;
        return;
      }

      const verticalDistance =
        section.offsetHeight - viewportHeight;

      if (verticalDistance <= 0) {
        frame = 0;
        return;
      }

      const holdDistance = viewportHeight * HOLD_SCROLL;

      const scrolledInsideSection = Math.min(
        verticalDistance,
        Math.max(0, -rect.top),
      );

      /*
       * Removes the first and last hold areas
       * from the horizontal movement calculation.
       */
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
    <section ref={sectionRef} className="relative w-full bg-secondary" style={{ height: sectionHeight }}>
      <div ref={viewportRef} className="sticky top-0 flex w-full flex-col justify-center overflow-hidden py-[100px]">
        <div className="mb-[70px] px-[4.5vw]">
          <h2 className="text-[96px] font-[800] leading-[0.9] tracking-tight text-white">
            our best cases prove it
          </h2>
        </div>

        <div className="w-full overflow-visible">
          <div ref={trackRef} className="flex w-max gap-12 pl-[4.5vw] pr-[4.5vw] will-change-transform">
            {cards.map((card) => (
              <article key={card.category} className={`relative h-[620px] w-[32vw] min-w-[720px] shrink-0 overflow-hidden border border-white/10 rounded-[0px] ${card.gradient}`}>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 flex h-full flex-col p-8">
                  <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/70">
                    {card.category}
                  </span>
                  <h3 className="mt-9 max-w-[400px] whitespace-pre-line text-[clamp(30px,3vw,52px)] font-medium leading-[0.95] tracking-[-0.035em] text-white">
                    {card.title}
                  </h3>
                  <button type="button" className={buttonClass}>
                    Know more <span className="text-base">→</span>
                  </button>
                  <div className="absolute inset-x-0 bottom-0 h-[62%]">
                    <Image
                      src={card.image}
                      alt={card.title.replace("\n", " ")}
                      fill
                      sizes="740px"
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