"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { UserRound, Sparkles, Blocks, Orbit, CalendarDays } from "lucide-react";
import ScrollToDiscover from "../props/ScrollToDiscover";

const roles = [
  {
    label: "User Centric",
    icon: UserRound,
    active: false,
  },
  {
    label: "Creatively Driven",
    icon: Sparkles,
    active: false
  },
  {
    label: "Innovative Led",
    icon: Blocks,
    active: false,
  },
  {
    label: "Scalable Built",
    icon: Orbit,
    active: true,
  },
];


export default function Splash() {
  return (
    <section className="relative min-h-screen bg-secondary overflow-hidden transition-all duration-700">
      <div className="absolute inset-0 z-0 min-h-screen w-full opacity-30">
        <video autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-cover" src="/videos/hero.mp4" />
      </div>
      <div className="px-[100px] absolute inset-0 z-10 flex flex-col items-center justify-center w-full">
        <h4 className="mb-5 text-[24px] font-[200] tracking-wide">
          <span className="text-primary">R</span>efined  
          <span className="text-primary pl-2">E</span>xperiences,  
          <span className="text-primary pl-2">L</span>ed by 
          <span className="text-primary pl-2">V</span>ision &  
          <span className="text-primary pl-2">O</span>riginality 
        </h4>
        <h1 className="mb-10 text-center text-[107px] font-[800] leading-[105px] -tracking-[1px] text-white">
          crafting for the shape<br/> of your vision
        </h1>
        <div className="mb-15 mx-auto max-w-full w-auto rounded-[24px] bg-secondary/70 p-2">
          <div className="grid grid-cols-4 gap-2">
            {roles.map(({ label, icon: Icon, active }) => (
              <div key={label}  className={[
                  "flex aspect-[1.8/1] flex-col items-center justify-center rounded-[18px] p-3",
                  "transition-all duration-300",
                  active
                    ? "bg-primary text-secondary shadow-[0_8px_20px_rgba(124,67,238,0.25)]"
                    : "bg-primary/10 text-white hover:bg-[#d2d2d2]",
                ].join(" ")}
              >
                <div className={["mb-3 w-24 h-24 flex items-center justify-center rounded-full", active ? "bg-secondary/10" : "bg-secondary/30"].join(" ")}>
                  <Icon strokeWidth={.65} className={["h-12 w-12", active ? "text-secondary" : "text-primary",].join(" ")}/>
                </div>
                <h4 className="font-[200] text-[17px] capitalize tracking-wider text-center">
                  {label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-10 px-10 absolute inset-0 z-10 flex items-end justify-between w-full">
        <ScrollToDiscover/>
        <div className="flex flex-col justify-end items-end gap-2 fixed bottom-10 right-10">
          <Link href="/" type="button" 
              className="group inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-white transition hover:text-primary bg-secondary/50 p-1.5 ps-7 rounded-full">
              <span className="text-[16px] font-thin tracking-wide">Book a Meeting</span>
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary">
                <CalendarDays className="h-5 w-5 text-primary"/>
              </span>
          </Link>
          <Link href="/" type="button" 
              className="group inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-white transition hover:text-primary bg-secondary/50 p-1.5 ps-7 rounded-full">
              <span className="text-[16px] font-thin tracking-wide">Talk to an Expert</span>
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary">
                  <FaWhatsapp className="h-6.5 w-6.5 text-[#27D367]"/>
              </span>
          </Link>
        </div>
      </div>
    </section>
  );
}