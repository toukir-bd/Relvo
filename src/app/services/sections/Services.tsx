"use client";

import Image from "next/image";
import { ArrowRight, Check, Plus, RotateCcw } from "lucide-react";
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
      <div className="w-full px-4 pb-16 sm:px-8 sm:pb-20 lg:px-16 lg:py-28 xl:px-32">
        <div className="space-y-4 sm:space-y-12 lg:space-y-16">
          {serviceOptions.map((service) => {
            const selected = selectedServices.includes(service.name);
            return (
              <section key={service.id} id={`service-${service.id}`} aria-labelledby={`service-title-${service.id}`}
                className={`group relative isolate overflow-hidden rounded-[28px] border p-5 transition-colors duration-300 sm:rounded-[48px] sm:p-8 lg:rounded-[64px] lg:p-12 xl:p-16 ${
                  selected ? "border-primary/35" : "border-white/0"
                }`}
              >
                <div className="inset-0 -z-1 absolute flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 12%) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 z-0 mx-auto size-[min(58vw,720px)] rounded-full bg-primary/[0.06] blur-[100px]" />
                <div className="relative z-10">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-5 sm:gap-5">
                    <h2 className="min-w-0 text-[clamp(1.1rem,2.5vw,2rem)] tracking-wide text-primary/90">
                      {service.name}
                    </h2>
                    <button type="button" aria-label={selected ? `Remove ${service.name} from selected services` : `Get this Service: ${service.name}`}
                      aria-pressed={selected} onClick={() => toggleService(service.name)}
                      className={`service-get-btn cursor-pointer ${selected ? "service-added" : ""}`}>
                      <span className="btnText">{selected ? "Added to Inquiry" : "Get this Service"}</span>
                      <span className="iconArea">
                        {selected ? <Check size={19} strokeWidth={2}/> : <Plus size={20} strokeWidth={1.8}/>}
                      </span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,.75fr)] lg:gap-10">
                  <div className="min-w-0">
                    <span id={`service-title-${service.id}`} className="max-w-[760px] whitespace-pre-line text-[clamp(1.75rem,5vw,4rem)] leading-[1.1] tracking-normal">
                      {service.headline}
                    </span>
                    <p className="mt-4 max-w-2xl text-base font-[400] leading-relaxed tracking-wide text-white/75 sm:mt-5 sm:text-lg lg:text-[23px]">
                      {service.description}
                    </p>
                    <ul className="mt-10 relative flex flex-wrap gap-2" aria-label={`${service.name} includes`}>
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="rounded-full bg-primary/[0.05] px-3 py-2 text-[13px] font-[500] tracking-wide capitalize text-white/90 sm:px-5 sm:py-2 sm:text-[16px] lg:px-6 lg:text-[17px]">
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative flex min-w-0 items-center justify-center px-2 sm:px-4 lg:px-8">
                    <Image src={service.image} alt="" width={1536} height={1024} sizes="(min-width: 1024px) 42vw, 38vw"
                      className="h-auto max-h-[220px] w-full max-w-[520px] object-contain opacity-90 transition-transform duration-500 sm:max-h-[300px] lg:max-h-[440px]"
                    />
                  </div>
                </div>
                </div>
              </section>
            );
          })}
        </div>
        {selectedServices.length > 0 && (
          <div className="fixed bottom-3 left-0 right-0 z-30 mx-auto flex w-[min(94vw,480px)] items-center justify-center sm:bottom-8">
            <div className="relative max-h-[70svh] w-full overflow-y-auto rounded-[26px] bg-primary/[0.10] p-4 text-white shadow-[0_8px_30px_rgba(0,0,0,0.82)] backdrop-blur-[60px] sm:rounded-[40px] sm:p-8 lg:p-12">
              <h4 className="text-base font-[400] tracking-[.5px] text-white sm:text-[27px]">Selected Services
                <span className="ps-2 text-sm font-[500] tracking-wide text-white/50 sm:ps-3 sm:text-[18px]">({selectedServices.length} selected)</span>
              </h4>
              <p className="mt-2 mb-4 break-words text-sm font-[500] tracking-wide text-white/65 sm:mb-5 sm:text-[18px]">{selectedServices.join(" , ")}</p>
              <div className="flex w-full items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedServices([])}
                  aria-label="Reset selected services"
                  title="Reset selected services"
                  className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-orange-500/75 text-secondary transition-colors hover:bg-orange-500/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-400 sm:size-14"
                >
                  <RotateCcw size={21} strokeWidth={1.8} />
                </button>
                <button type="button" onClick={proceedToContact} className="flex min-h-14 min-w-0 flex-1 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary/85 px-5 py-3
                  text-sm font-bold text-secondary transition-colors hover:bg-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                  focus-visible:outline-primary sm:text-lg">
                  Proceed to Contact
                  <ArrowRight aria-hidden="true" size={21} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Faq/>
    </>
  );
}
