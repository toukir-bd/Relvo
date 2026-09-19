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

export default function HorizontalStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const progressRef = useRef(0);

  useEffect(() => {
    const calculateDimensions = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const distance = track.scrollWidth - viewport.clientWidth;
      const safeDistance = Math.max(0, distance);
      setScrollDistance(safeDistance);
      setSectionHeight(
        `${window.innerHeight + safeDistance}px`
      );
    };

    calculateDimensions();
    const resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", calculateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener(
        "resize",
        calculateDimensions
      );
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const updateHorizontalScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || scrollDistance <= 0) {
        raf = 0;
        return;
      }
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const totalVerticalDistance =
        section.offsetHeight - window.innerHeight;
      if (totalVerticalDistance <= 0) {
        raf = 0;
        return;
      }
      const progress = Math.min(
        1,
        Math.max(
          0,
          scrolled / totalVerticalDistance
        )
      );

      progressRef.current = progress;
      const translateX = scrollDistance * progress;
      track.style.transform = `translate3d(${-translateX}px, 0, 0)`;
      raf = 0;
    };

    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(
        updateHorizontalScroll
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
    handleScroll();
    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
      window.removeEventListener(
        "resize",
        handleScroll
      );
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [scrollDistance]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#061B1B]"
      style={{
        height: sectionHeight,
      }}
    > 
      <div ref={viewportRef} className="py-[140px] sticky top-0 flex w-full flex-col justify-center overflow-hidden">
        <div className="mb-[70px] px-[4.5vw]">
          <h2 className=" max-w-[700px] font-[var(--font-denton)] text-[clamp(52px,6vw,100px)] font-medium leading-[0.9] tracking-[-0.045em] text-white">
            upgrade your life.
            <br/>
            bit by bit.
          </h2>
        </div>
        <div className="w-full overflow-visible">
          <div ref={trackRef} className="flex w-max gap-[16px] will-change-transformn pl-[4.5vw] pr-[4.5vw]">
            {cards.map((card, index) => (
              <article key={card.category} className=" relative h-[620px] w-[32vw] min-w-[420px] max-w-[540px] shrink-0 overflow-hidden border border-white/20 bg-black">
                <div className="relative z-10 flex h-full flex-col p-[32px]">
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/70">
                      {card.category}
                    </span>
                  </div>
                  <h3 className="mt-[36px] max-w-[400px] whitespace-pre-line text-[clamp(30px,3vw,52px)] font-medium leading-[0.95] tracking-[-0.035em] text-white">
                    {card.title}
                  </h3>
                  <button type="button" className="mt-[30px] flex w-fit items-center gap-5 border border-white/30 px-[20px] py-[12px] text-[11px] font-medium uppercase
                    tracking-[0.2em] text-white transition-colors duration-300 hover:border-white">
                    Know more
                    <span className="text-[16px]">
                      →
                    </span>
                  </button>
                  <div className="absolute inset-x-0 bottom-0 h-[62%]">
                    <Image src={card.image} alt={card.title.replace( "\n", " " )} fill className=" object-cover object-center" sizes="540px"/>
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