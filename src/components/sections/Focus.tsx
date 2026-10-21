
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

    video.pause();
    video.currentTime = 0;

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

      if (progress >= VIDEO_PLAY_START && !playbackStartedRef.current) {
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
    <section aria-label="Our focus" className="bg-secondary">
      <div
        ref={sectionRef}
        className="relative h-[360vh] overflow-clip bg-secondary text-white"
      >
        <div
          className="sticky top-0 relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 0.65px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <h4 className="mb-5 text-center text-[clamp(20px,2vw,29px)] font-normal tracking-wide">
            Designed to Clarity. Effortless to Explore.
          </h4>

          <h1 className="focus-title relative mb-5 max-w-full px-3 pb-3 text-center text-[clamp(32px,7.4vw,124px)] font-[800] leading-[1.12] -tracking-[1px] text-white">
            <span className="hero-text-neon block text-[0.82em]">we simplify complexity<br/>and bring your vision to life</span>
          </h1>
          <div className="relative z-[110] mt-8 w-[calc(100%-2rem)] max-w-[1200px] sm:mt-12 sm:w-[calc(100%-4rem)] lg:mt-14">
            <h4 className="mb-3 text-center text-[clamp(20px,2vw,20px)] font-[500] uppercase tracking-[0.18em] text-primary sm:mb-4 sm:tracking-[0.15em]">
              Meet with prestigious top partners
            </h4>
            <Clients />
          </div>
          <span ref={windowRef} className="pointer-events-none absolute left-1/2 top-1/2 z-[120] block h-screen w-screen overflow-hidden rounded-[24px] border-4
          border-secondary bg-secondary will-change-transform sm:rounded-[32px]" aria-hidden="true">
            <video
              ref={videoRef}
              className="block h-full w-full object-cover"
              src="/videos/main-video.mp4"
              muted
              playsInline
              loop
              preload="auto"
              aria-label="Main video"
            />
          </span>
        </div>
      </div>
    </section>
  );
}




