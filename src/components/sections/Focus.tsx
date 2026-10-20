
"use client"
import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import Clients from "@/components/sections/Clients";

type SplashProps = {
  lenis?: Lenis;
};

const ZOOM_START = 0.28;
const ZOOM_END = 0.86;
const VIDEO_PLAY_START = 0.88;

export default function Focus({ lenis }: SplashProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const windowRef = useRef<HTMLSpanElement>(null);
  const lockedRef = useRef(false);
  const endedRef = useRef(false);
  const previousOverflowRef = useRef("");

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const videoWindow = windowRef.current;
    if (!section || !video || !videoWindow) return;

    video.pause();
    video.currentTime = 0;

    const setLocked = (locked: boolean) => {
      if (lockedRef.current === locked) return;
      lockedRef.current = locked;

      if (lenis) {
        locked ? lenis.stop() : lenis.start();
      } else if (locked) {
        previousOverflowRef.current = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = previousOverflowRef.current;
      }
    };

    const update = (scroll: number) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scroll + rect.top;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (scroll - sectionTop) / travel));
      const zoomProgress = Math.max(
        0,
        Math.min(1, (progress - ZOOM_START) / (ZOOM_END - ZOOM_START)),
      );
      const scale = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      videoWindow.style.transform = `translate(-50%, -50%) scale(${scale})`;

      if (progress >= VIDEO_PLAY_START && !lockedRef.current && !endedRef.current) {
        videoWindow.classList.add("is-playing");
        video.currentTime = 0;
        setLocked(true);
        void video.play().catch(() => setLocked(false));
      }
    };

    const onLenisScroll = ({ scroll }: { scroll: number }) => update(scroll);
    const onNativeScroll = () => update(window.scrollY);
    const onEnded = () => {
      endedRef.current = true;
      setLocked(false);
    };

    if (lenis) {
      lenis.on("scroll", onLenisScroll);
      update(lenis.scroll);
    } else {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      onNativeScroll();
    }
    video.addEventListener("ended", onEnded);

    return () => {
      if (lenis) lenis.off("scroll", onLenisScroll);
      else window.removeEventListener("scroll", onNativeScroll);
      video.removeEventListener("ended", onEnded);
      if (lockedRef.current) setLocked(false);
    };
  }, [lenis]);

  return (
    <section aria-label="Our focus" className="bg-secondary">
      <div
        ref={sectionRef}
        className="relative h-[360vh] overflow-clip bg-secondary text-white"
      >
        <div
          className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 11%) 1px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        >
          <h4 className="mb-5 text-center text-[clamp(20px,2vw,29px)] font-light tracking-wide">
            Designed to Clarity. Effortless to Explore.
          </h4>

          <h1
            className="relative mb-5 max-w-full px-3 pb-3 text-center text-[clamp(32px,7.4vw,124px)] font-[800] leading-[0.92] -tracking-[1px] text-white"
            style={{ fontFamily: "var(--font-denton), serif" }}
          >
            <div className="relative z-10 invisible">
              <span className="block text-[1em]">We simplify complexity</span>
              <span className="block text-[0.82em]">and bring your vision to life</span>
            </div>

            <span
              ref={windowRef}
              className="absolute left-1/2 top-1/2 z-100 block h-screen w-screen overflow-hidden rounded-[24px] border-4 border-secondary bg-secondary will-change-transform sm:rounded-[32px]"
              aria-hidden="true"
            >
              <video
                ref={videoRef}
                className="block h-full w-full object-cover"
                src="/videos/main-video.mp4"
                muted
                playsInline
                preload="auto"
                aria-label="Main video"
              />
            </span>

            <div aria-hidden="true" className="hero-text-neon pointer-events-none absolute inset-0 z-20">
              <span className="block text-[1em]">We simplify complexity</span>
              <span className="block text-[0.82em]">and bring your vision to life</span>
            </div>
          </h1>
          <div className="relative z-[110] mt-8 w-[calc(100%-2rem)] max-w-[1200px] sm:mt-12 sm:w-[calc(100%-4rem)] lg:mt-14">
            <h2
              className="mb-3 text-center text-sm font-bold uppercase tracking-[0.22em] text-white sm:mb-4 sm:text-base sm:tracking-[0.3em]"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
            >
              Meet with our prestigious top clients
            </h2>
            <Clients />
          </div>
        </div>
      </div>
    </section>
  );
}




