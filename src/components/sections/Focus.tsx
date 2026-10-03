
"use client"
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

type SplashProps = {
  lenis?: Lenis;
};

export default function Focus({ lenis }: SplashProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
      const zoomProgress = Math.min(1, progress / 0.72);
      const scale = 0.12 + zoomProgress * 0.88;
      videoWindow.style.transform = `translate(-50%, -50%) scale(${scale})`;

      if (progress >= 0.72 && !lockedRef.current && !endedRef.current) {
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
    <section
      ref={sectionRef}
      className="relative h-[280vh] overflow-clip bg-secondary text-white"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]">
        <h4 className="mb-5 text-center text-[clamp(20px,2vw,29px)] font-light tracking-wide">
          Designed to Clarity. Effortless to Explore.
        </h4>

        <h1 className="relative mb-5 pb-3 text-center text-[107px] font-[800] leading-[105px] -tracking-[1px] text-white">
          <div className="relative z-10 invisible">
            We simplify complexity and bring<br />your vision to life
          </div>

          <span
            ref={windowRef}
            className="absolute left-1/2 top-1/2 z-100 block min-h-screen w-full overflow-hidden bg-secondary will-change-transform"
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
            We simplify complexity and bring<br />your vision to life
          </div>
        </h1>
      </div>
    </section>
  );
}




