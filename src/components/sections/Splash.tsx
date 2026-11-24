"use client";
import Link from "next/link";
import { UserRound, Sparkles, Blocks, Orbit } from "lucide-react";
import { useEffect, useRef } from "react";
import ScrollToDiscover from "../props/ScrollToDiscover";

const roles = [
  { label: "User Centric", icon: UserRound, active: false, href: "/about#user-centric"},
  { label: "Creatively Driven", icon: Sparkles, active: false, href: "/about#creatively-driven"},
  { label: "Innovative Led", icon: Blocks, active: false, href: "/about#innovation-led"},
  { label: "Scalable Built", icon: Orbit, active: true, href: "/about#scalably-built"},
];


export default function Splash() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;

    const timer = window.setTimeout(() => {
      video.src = video.dataset.src ?? "";
      video.load();
      void video.play().catch(() => {});
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden transition-all duration-700">
      <div className="absolute inset-0 z-0 min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_rgba(187,255,0,0.08),_transparent_60%)] opacity-30">
        <video ref={videoRef} aria-hidden="true" tabIndex={-1} loop muted playsInline preload="none" data-src="/videos/hero.mp4" className="h-full w-full object-cover" />
      </div>
      <div className="mt-18 sm:mt-0 absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-2 py-24 text-center">
        <p className="mb-5 text-[clamp(16px,2.1vw,29px)] font-[500] sm:font-[300] leading-relaxed tracking-wide sm:mb-7">
          <span className="text-primary">R</span>efined
          <span className="text-primary pl-1 sm:pl-2">E</span>xperiences,
          <span className="text-primary pl-1 sm:pl-2">L</span>ed by
          <span className="text-primary pl-1 sm:pl-2">V</span>ision &
          <span className="text-primary pl-1 sm:pl-2">O</span>riginality
        </p>
        <h2 className="focus-title mb-7 max-w-[1200px] w-full mx-auto px-2 text-[clamp(16px,7.4vw,85px)] leading-[1.2] -tracking-[1.7px] sm:-tracking-[3.5px]">
          <span className="hero-text-neon uppercase">crafting for the shape<br/>of your vision</span>
        </h2>
        <div className="mx-auto mb-8 w-full max-w-full rounded-[20px] bg-secondary/70 p-2 sm:mb-12 sm:w-auto sm:rounded-[24px] lg:mb-15">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {roles.map(({ label, icon: Icon, active, href }) => (
              <Link href={href ?? "/services"} key={label} className={["group flex flex-col items-center justify-center rounded-[18px] px-0 py-4 sm:px-5 sm:py-5 transition-all duration-300", 
                  active ? "bg-primary text-secondary shadow-[0_8px_20px_rgba(124,67,238,0.25)] hover:bg-primary/90" : "bg-primary/10 hover:bg-primary/5",
                ].join(" ")}
              >
                <div className={["mb-2 flex h-14 w-14 items-center justify-center rounded-full transition-all sm:h-20 sm:w-20 lg:h-24 lg:w-24",
                    active ? "bg-secondary/10" : "bg-secondary/30",
                  ].join(" ")}
                >
                  <Icon strokeWidth={0.65} className={["h-7 w-7 transition-colors duration-300 transition-all sm:h-10 sm:w-10 lg:h-12 lg:w-12",
                      active ? "text-secondary" : "text-white group-hover:text-primary",
                    ].join(" ")}
                  />
                </div>
                  <span className={["text-center text-[16px] font-[500] sm:font-[400] capitalize tracking-[.8px] sm:tracking-wide transition-all sm:text-base lg:text-[20px]",
                    active ? "text-secondary group-hover:text-secondary" : "text-white group-hover:text-primary",
                  ].join(" ")}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 z-10 flex w-full items-end justify-between px-4 sm:bottom-8 sm:px-8 lg:bottom-10 lg:px-10">
        <ScrollToDiscover />
      </div>
    </section>
  );
}
