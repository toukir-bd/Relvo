"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { serviceOptions } from "@/data/services";
import Faq from "@/components/sections/Faq";
import { openContactModal } from "@/utils/contactModal";

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  function proceedToContact() {
    openContactModal(selectedServices);
  }

  return (
    <>
      <div className="w-full px-5 pb-24 sm:px-8 lg:px-32 lg:py-32">
        <div className="space-y-4 sm:space-y-20">
          {serviceOptions.map((service) => {
            const selected = selectedServices.includes(service.name);
            return (
              <section key={service.id} id={`service-${service.id}`} aria-labelledby={`service-title-${service.id}`}
                className={`group relative isolate overflow-hidden rounded-[34px] border transition-colors duration-300 sm:rounded-[70px] p-24 ${
                  selected ? "border-primary/35 bg-primary/[0.05]" : "border-white/0 bg-primary/[0.025]"
                }`}
              >
                <div className="inset-0 -z-1 absolute flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 3%) 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 z-0 mx-auto size-[min(58vw,720px)] rounded-full bg-primary/[0.06] blur-[100px]" />
                <div className="relative z-10 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] grid-rows-1 items-start">
                  <div className="relative">
                    <span className="w-fit max-w-[90%] rounded-full bg-white/[0.1] px-3 py-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary/90 sm:px-8 sm:text-[17px]">
                      {service.name}
                    </span>
                    <h4 id={`service-title-${service.id}`} className="mt-6 max-w-[760px] whitespace-pre-line text-[clamp(1.5rem,5vw,4rem)] font-[300]
                      leading-[1.2] tracking-normal sm:mt-7">
                      {service.headline}
                    </h4>
                    <p className="mt-4 max-w-2xl font-[400] tracking-wide text-xs leading-relaxed text-white/75 sm:mt-5 sm:text-[23px]">
                      {service.description}
                    </p>
                  </div>
                  <div className="relative flex min-w-0 items-center justify-center px-2 sm:px-4 lg:px-8">
                    <Image src={service.image} alt="" width={1536} height={1024} sizes="(min-width: 1024px) 42vw, 38vw"
                      className="h-auto max-h-[250px] w-full max-w-[520px] object-contain opacity-80 transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-[320px] sm:opacity-90 lg:max-h-[440px]"
                    />
                  </div>
                </div>
                <ul className="relative z-10 mt-auto flex flex-wrap gap-2" aria-label={`${service.name} includes`}>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="rounded-full bg-white/[0.1] px-2 py-2 text-[10px] font-[500] tracking-wide text-white/90 sm:px-6 sm:py-3 sm:text-[16px]">
                      {deliverable}
                    </li>
                  ))}
                </ul>
                <button type="button" aria-label={selected ? `Remove ${service.name} from selected services` : `Choose ${service.name}`}
                  aria-pressed={selected} onClick={() => toggleService(service.name)}
                  className={`absolute right-1 top-1 z-20 grid size-14 place-items-center rounded-[18px] border transition duration-300 sm:right-7 sm:top-7 sm:size-16 sm:rounded-[20px] ${
                    selected
                      ? "border-primary bg-primary text-secondary"
                      : "border-white/10 bg-white/[0.08] text-primary hover:rotate-45 hover:bg-primary hover:text-secondary"
                  }`}
                >
                  {selected ? <Check size={23} strokeWidth={2}/> : <ArrowUpRight size={25} strokeWidth={1.7}/>}
                </button>
              </section>
            );
          })}
        </div>
        {selectedServices.length > 0 && (
          <div className="sticky bottom-4 z-30 mt-8 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-secondary/95 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-white/75">
              <span className="font-semibold text-white">{selectedServices.length} selected</span>
              <span className="ml-2 hidden text-white/50 sm:inline">{selectedServices.join(" · ")}</span>
            </p>
            <button type="button" onClick={proceedToContact} className="group flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-sm
              font-bold text-secondary transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Proceed to contact
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        )}
      </div>
      <Faq/>
    </>
  );
}
