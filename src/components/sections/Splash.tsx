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
    <section className={`relative min-h-screen bg-[#051313] overflow-hidden transition-all duration-700 
      ${isScrolled
        ? "rounded-none border-0"
        : "rounded-[24px] border-[3px] border-white overflow-hidden"
      }`}
    >
      <div className="absolute inset-0 z-0 min-h-screen w-full opacity-25">
        <video autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-cover" src="/videos/hero.mp4" />
      </div>
      <div className="px-[100px] absolute inset-0 z-10 flex flex-col items-center justify-center w-full">
        <h4 className="text-2xl mb-5 font-[300]">
          <span className="text-[#BBFF00]">R</span>efined  
          <span className="text-[#BBFF00] pl-2">E</span>xperiences,  
          <span className="text-[#BBFF00] pl-2">L</span>ed by 
          <span className="text-[#BBFF00] pl-2">V</span>ision &  
          <span className="text-[#BBFF00] pl-2">O</span>riginality 
        </h4>
        <h1 className="text-center text-[97px] font-[800] leading-[105px] -tracking-[1px] text-white">
          crafting for the shape<br/> of your vision
        </h1>
        <button className="btn-relvo py-5 px-10 bg-[#BBFF00] text-[#051313] cursor-pointer rounded-[13px]">Keypress</button>
        <div className="px-[100px] flex items-end justify-between w-full">
          <p>We turn complex challenges into user-centric digital experiences, crafting websites, mobile apps, digital products, 
            and AI-powered solutions to make an impact and built to grow.</p>
          <div className="w-[400px] h-[250px] bg-[#051313]/40 max-w-full rounded-[30px]"></div>
        </div>
      </div>
    </section>
  );
}