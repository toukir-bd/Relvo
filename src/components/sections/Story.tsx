"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import RelvoVisual from "@/components/props/RelvoVisual";

const slides = [
  {
    number: "01",
    text: "We design distinctive visual identities that help businesses stand out and stay memorable to perform",
  },
  {
    number: "02",
    text: "A clear design is a must for every brand. Because it matters, users may leave when usability is missing",
  },
  {
    number: "03",
    text: "We create a clear and logical structure that aligns your vision and business purpose with user needs",
  },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const TEXT_REVEAL_FRACTION = 0.77;
export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const goToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const totalScroll = section.offsetHeight - window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    scrollTo(sectionTop + totalScroll * (index / slides.length), false, 0.85);
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
    <section ref={sectionRef} id="discover-us" className="story-section relative h-auto w-full md:h-[490dvh]">
      <div className="mx-auto flex w-full flex-col gap-8 px-4 py-10 sm:py-15 md:hidden">
        <p className="hero-text-neon text-center text-sm font-[500] sm:font-medium uppercase tracking-[1.5px] sm:text-base">
          Relvo is built to create a presence that performs
        </p>
        {slides.map((slide, index) => (
          <article key={slide.number} className="relative overflow-hidden rounded-[42px] bg-white/[0.02] p-7">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgb(187 255 0 / 7%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 7%) 1px, transparent 1px)", backgroundSize: "3px 3px" }} />
            <div className="relative z-10 -mx-5 mb-2 h-[210px] overflow-hidden sm:-mx-8 sm:h-[230px]">
              <RelvoVisual activeSlide={index} />
            </div>
            <span className="relative z-10 text-[19px] sm:text-[27px] leading-[1.4] tracking-wide sm:tracking-tight text-white/95">{slide.text}</span>
          </article>
        ))}
        <div className="flex items-center justify-center">
          <Link href="/about" className="group relative inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-secondary/60 p-1.5 pe-6 text-sm font-medium text-white backdrop-blur transition hover:text-primary">
            <span className="grid size-11 place-items-center rounded-full border border-white/20 text-primary"><ArrowUpRight aria-hidden="true" size={20} /></span>
            <span>Explore Relvo</span>
          </Link>
        </div>
      </div>
      <div className="sticky top-0 hidden min-h-screen w-full overflow-hidden md:block">
        <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40"
              style={{backgroundImage: `linear-gradient(rgb(187 255 0 / 7%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 7%) 1px, transparent 1px)`,
                backgroundSize: "3px 3px",
              }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[min(850px,120vw)] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px] sm:h-[420px] sm:blur-[140px]"/>
            <RelvoVisual activeSlide={activeSlide}/>
            <p className="hero-text-neon relative overflow-hidden text-center text-[14px] font-[500] uppercase tracking-[1.8px] sm:text-[16px] lg:text-[23px]">
              Relvo is built to create a presence that performs
            </p>
            <div className="relative mx-auto my-5 min-h-[260px] w-full max-w-[1300px] overflow-hidden px-4 sm:my-7 sm:min-h-[300px] sm:px-8 lg:px-0">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;
                const isPrevious = index < activeSlide;
                const words = slide.text.split(" ");
                const slideProgress = clamp(
                  (scrollProgress * slides.length - index) /
                    TEXT_REVEAL_FRACTION,
                );
                return (
                  <div key={slide.number} className={[ "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "translate-y-0 opacity-100" : isPrevious ? "-translate-y-[100px] opacity-0" : "translate-y-[100px] opacity-0",
                    ].join(" ")}
                  >
                    <h2 className="mx-auto w-full max-w-[1100px] px-3 break-words text-center text-[clamp(1.75rem,6vw,4.5625rem)] font-normal leading-[1.18] tracking-tight text-white/95 lg:max-w-none lg:px-0">
                      {words.map((word, wordIndex) => {
                        const wordProgress = clamp( slideProgress * words.length - wordIndex + 0.55, );
                        return (
                          <span key={`${slide.number}-${wordIndex}`} className="focus-title inline-block text-center transition-[opacity,transform] duration-100"
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
            <div className="mb-5 hidden items-end justify-center gap-2 md:flex">
              <span key={activeSlide} className="animate-number-fade text-[24px] font-normal leading-none text-primary">
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
            <Link href="/about" className="group absolute bottom-5 left-5 z-30 inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/40 p-1.5 pe-7 text-sm font-medium text-white backdrop-blur-[100px] transition hover:text-primary sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary">
                <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-primary transition group-hover:text-primary" strokeWidth={1.8} />
              </span>
              <span className="text-base font-normal tracking-wide sm:text-[18px]">Explore Relvo</span>
            </Link>
        </div>
      </div>
    </section>
  );
}
