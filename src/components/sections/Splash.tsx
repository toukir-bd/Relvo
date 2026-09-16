"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`relative min-h-screen bg-[#0D332D] overflow-hidden transition-all duration-700 ${isScrolled
        ? "rounded-none border-0"
        : "rounded-[20px] border-[5px] border-white overflow-hidden"
        }`}
    >
      <div className="absolute inset-0 z-0 min-h-screen w-full opacity-25">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          src="/videos/hero.mp4"
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#061018]/20 to-[#061018]/0">
          <h1 className="mt-10 text-center text-[109px] font-black leading-[115px] tracking-normal text-white">
            crafted for the rise
            <br />
            to web universe
          </h1>
          <p className="mb-12 mt-8 text-center text-[20px] font-medium leading-[32px] text-gray-100">
            It&apos;s never just about building a Website, App, or Custom
            Software.
            <br />
            it&apos;s about creating trust, meaningful connections, and digital
            <br />
            experiences that inspire confidence.
          </p>
        </div>
      </div>
    </section>
  );
}