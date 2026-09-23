"use client";
import { ScanFace, WandSparkles, CodeXml, Rocket } from "lucide-react";
import ScrollToDiscover from "../props/ScrollToDiscover";
const roles = [
  {
    label: "User Centric",
    icon: ScanFace,
    active: false,
  },
  {
    label: "Creative Navigate",
    icon: WandSparkles,
    active: false,
  },
  {
    label: "Innovative Driven",
    icon: CodeXml,
    active: false,
  },
  {
    label: "Scalable Built",
    icon: Rocket,
    active: true,
  },
];


export default function Splash() {
  return (
    <section className="relative min-h-screen bg-[#051313] overflow-hidden transition-all duration-700">
      <div className="absolute inset-0 z-0 min-h-screen w-full opacity-30">
        <video autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-cover" src="/videos/hero.mp4" />
      </div>
      <div className="px-[100px] absolute inset-0 z-10 flex flex-col items-center justify-center w-full">
        <h4 className="mb-5 text-[24px] font-[200] tracking-wide">
          <span className="text-[#BBFF00]">R</span>efined  
          <span className="text-[#BBFF00] pl-2">E</span>xperiences,  
          <span className="text-[#BBFF00] pl-2">L</span>ed by 
          <span className="text-[#BBFF00] pl-2">V</span>ision &  
          <span className="text-[#BBFF00] pl-2">O</span>riginality 
        </h4>
        <h1 className="mb-10 text-center text-[105px] font-[800] leading-[105px] -tracking-[1px] text-white">
          crafting for the shape<br/> of your vision
        </h1>
        <div className="mb-15 mx-auto max-w-full w-auto rounded-[20px] bg-black/50 p-2">
          <div className="grid grid-cols-4 gap-2">
            {roles.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={[
                  "flex aspect-[1.8/1] flex-col items-center justify-center rounded-[15px] p-3",
                  "transition-all duration-300",
                  active
                    ? "bg-[#BBFF00] text-[#051313] shadow-[0_8px_20px_rgba(124,67,238,0.25)]"
                    : "bg-white/10 text-white hover:bg-[#d2d2d2]",
                ].join(" ")}
              >
                <Icon strokeWidth={.5} 
                  className={[
                    "mb-3 h-16 w-16 sm:h-16 sm:w-16",
                    active ? "text-[#051313]" : "text-[#BBFF00]",
                  ].join(" ")}
                />
                <h4 className="text-sm font-normal sm:text-base">
                  {label}
                </h4>
              </div>
            ))}
          </div>
        </div>
        {/* <button className="btn-relvo py-5 px-10 bg-[#BBFF00] text-[#051313] cursor-pointer rounded-[13px]">Keypress</button> */}
      </div>
      <div className="mb-15 px-[65px] absolute inset-0 z-10 flex items-end justify-between w-full">
        <ScrollToDiscover/>
        <button className="btn-relvo py-5 px-10 bg-[#BBFF00] text-[#051313] cursor-pointer rounded-[13px]">Keypress</button> 
      </div>
    </section>
  );
}