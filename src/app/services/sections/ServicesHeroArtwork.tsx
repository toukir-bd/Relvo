import { Code2, Compass, PanelsTopLeft } from "lucide-react";

const steps = [
  { number: "01", label: "Discover", detail: "Set the direction", icon: Compass },
  { number: "02", label: "Design", detail: "Shape the experience", icon: PanelsTopLeft },
  { number: "03", label: "Develop", detail: "Bring it to life", icon: Code2 },
];

export default function ServicesHeroArtwork() {
  return (
    <div aria-label="Relvo's service journey from discovery through design to development" role="img" className="relative mx-auto aspect-[0.94] w-full max-w-[620px] sm:aspect-[1.08] lg:aspect-[0.92]">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-[90px]" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.1]" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[61%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.12]" />
      <svg aria-hidden="true" viewBox="0 0 560 540" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d="M152 120C310 55 443 184 377 270S201 365 247 447" stroke="#BBFF00" strokeOpacity=".34" strokeWidth="1.5" strokeDasharray="4 9" />
        <circle cx="152" cy="120" r="4" fill="#BBFF00" />
        <circle cx="377" cy="270" r="5" fill="#BBFF00" />
        <circle cx="247" cy="447" r="4" fill="#BBFF00" />
      </svg>

      <div className="absolute left-[5%] top-[8%] w-[72%] rounded-[24px] bg-secondary/[0.75] p-4 shadow-[0_16px_50px_rgba(187,255,0,0.035)] backdrop-blur-xl sm:left-[8%] sm:w-[68%] sm:rounded-[28px] sm:p-5">
        <StepContent step={steps[0]} muted />
        <div className="mt-4 flex items-center gap-2 pl-[54px] sm:pl-[62px]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-px w-16 bg-primary/45" />
          <span className="h-px w-8 bg-white/15" />
          <span className="ms-auto text-[9px] uppercase tracking-[0.18em] text-white/35">Brief aligned</span>
        </div>
      </div>

      <div className="absolute right-[2%] top-[37%] w-[78%] rounded-[24px] bg-[#bbff00]/60 p-4 text-[#08120e] shadow-[0_24px_75px_rgba(187,255,0,0.12)] sm:right-[2%] sm:w-[74%] sm:rounded-[28px] sm:p-5">
        <StepContent step={steps[1]} />
        <div className="mt-4 flex items-center gap-2 pl-[54px] sm:pl-[62px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#08120e]" />
          <span className="h-px w-10 bg-[#08120e]/45" />
          <span className="h-px w-14 bg-[#08120e]/20" />
          <span className="ms-auto flex -space-x-1.5">
            <span className="size-5 rounded-full bg-[#101d17]" />
            <span className="size-5 rounded-full bg-red-400" />
            <span className="size-5 rounded-full bg-[#6ed7b9]" />
          </span>
        </div>
      </div>

      <div className="absolute bottom-[7%] left-[13%] w-[72%] rounded-[24px] bg-secondary/[0.75] p-4 shadow-[0_16px_50px_rgba(187,255,0,0.035)] backdrop-blur-xl sm:bottom-[8%] sm:left-[15%] sm:w-[68%] sm:rounded-[28px] sm:p-5">
        <StepContent step={steps[2]} muted />
        <div className="mt-4 flex items-center gap-1.5 pl-[54px] sm:pl-[62px]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-px w-12 bg-primary/45" />
          <span className="h-px w-12 bg-primary/25" />
          <span className="h-px w-12 bg-white/15" />
          <span className="ms-auto text-[12px] uppercase tracking-[0.18em] text-white/50">Ready to launch</span>
        </div>
      </div>
    </div>
  );
}

function StepContent({ step, muted = false }: { step: (typeof steps)[number]; muted?: boolean }) {
  const Icon = step.icon;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className={`grid size-11 shrink-0 place-items-center rounded-[15px] sm:size-[50px] sm:rounded-[17px] ${muted ? "bg-primary/[0.12] text-primary" : "bg-secondary/10 text-[#08120e]"}`}>
        <Icon size={22} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <span className={`text-[12px] font-semibold uppercase tracking-[1px] sm:text-[14px] ${muted ? "text-primary/75" : "text-[#08120e]/55"}`}>
          {step.number} / {step.label}
        </span>
        <div className={`truncate text-base tracking-normal sm:text-[24px] ${muted ? "text-white" : "text-[#08120e]"}`}>
          {step.detail}
        </div>
      </div>
    </div>
  );
}
