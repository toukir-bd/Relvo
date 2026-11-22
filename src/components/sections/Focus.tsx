
"use client"
import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import Clients from "@/components/sections/Clients";

type SplashProps = {
  lenis?: Lenis;
};

const ZOOM_START = 0.28;
const ZOOM_END = 0.86;
const VIDEO_PLAY_START = ZOOM_END;

export default function Focus({ lenis }: SplashProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const windowRef = useRef<HTMLSpanElement>(null);
  const playbackStartedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const videoWindow = windowRef.current;
    if (!section || !video || !videoWindow) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allowVideo = !isMobile && !saveData && !prefersReducedMotion;
    const loadVideo = () => {
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
      }
    };

    video.pause();
    video.currentTime = 0;

    const update = (scroll: number) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scroll + rect.top;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (scroll - sectionTop) / travel));
      if (allowVideo && progress >= VIDEO_PLAY_START - 0.18) loadVideo();
      const zoomProgress = Math.max(
        0,
        Math.min(1, (progress - ZOOM_START) / (ZOOM_END - ZOOM_START)),
      );
      const scale = allowVideo ? zoomProgress * zoomProgress * (3 - 2 * zoomProgress) : 0;
      videoWindow.style.transform = `translate(-50%, -50%) scale(${scale})`;

      if (progress >= VIDEO_PLAY_START && !playbackStartedRef.current) {
        if (!allowVideo) return;
        loadVideo();
        videoWindow.classList.add("is-playing");
        video.currentTime = 0;
        playbackStartedRef.current = true;
        void video.play().catch(() => {
          playbackStartedRef.current = false;
        });
      }
    };

    const onLenisScroll = ({ scroll }: { scroll: number }) => update(scroll);
    const onNativeScroll = () => update(window.scrollY);
    if (lenis) {
      lenis.on("scroll", onLenisScroll);
      update(lenis.scroll);
    } else {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      onNativeScroll();
    }
    return () => {
      if (lenis) lenis.off("scroll", onLenisScroll);
      else window.removeEventListener("scroll", onNativeScroll);
    };
  }, [lenis]);

  return (
    <section aria-label="Our focus" className="relative">
      <div ref={sectionRef} className="focus-scroll-container relative h-auto overflow-visible text-white md:h-[360vh] md:overflow-clip">
        <div className="relative flex min-h-auto w-full flex-col items-center justify-center overflow-hidden px-2 py-8 md:sticky md:top-0 md:h-screen md:px-[7vw] md:py-8"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 10%) 0.65px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        >
          <div className="pointer-events-none absolute inset-0 m-auto h-auto w-auto rounded-full bg-primary/10 blur-[80px] sm:h-120 sm:w-120 sm:blur-[90px]"/>
          <p className="mb-5 text-center text-[16px] sm:text-[29px] font-[500] sm:font-[300] tracking-wide">
            Designed to Clarity. Effortless to Explore.
          </p>
          <h2 className="focus-title relative mb-5 max-w-full px-3 pb-3 text-center text-[1.2rem] sm:text-[5.25rem] font-[400] leading-[1.5] sm:leading-[1.12] tracking-normal sm:-tracking-[1.5px] text-white sm:-tracking-[2px] lg:-tracking-[4px]">
            <span className="hero-text-neon uppercase">we simplify complexity and<br/>bring your vision to life</span>
          </h2>
          <div className="relative z-[110] mt-3 w-[calc(100%-2rem)] sm:mt-12 sm:w-[calc(100%-4rem)] lg:mt-14">
            <h3 className="mb-3 text-center text-[12px] sm:text-[23px] font-[500] uppercase text-primary sm:mb-4 tracking-[0.12em]">
              Meet with prestigious top partners
            </h3>
            <Clients />
          </div>
          <span ref={windowRef} className="pointer-events-none absolute left-1/2 top-1/2 z-[120] hidden h-screen w-screen overflow-hidden rounded-[24px] border-4
          border-secondary bg-secondary will-change-transform md:block sm:rounded-[32px]" aria-hidden="true">
            <video
              ref={videoRef}
              className="block h-full w-full object-cover"
              data-src="/videos/main-video.mp4"
              muted
              playsInline
              loop
              preload="none"
              aria-label="Main video"
            />
          </span>
        </div>
      </div>
    </section>
  );
}




