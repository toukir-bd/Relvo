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
      <div className="w-full px-5 pb-24 sm:px-8 lg:px-32 lg:py-32">
        <div className="space-y-4 sm:space-y-20">
          {serviceOptions.map((service) => {
            const selected = selectedServices.includes(service.name);
            return (
              <section key={service.id} id={`service-${service.id}`} aria-labelledby={`service-title-${service.id}`}
                className={`group relative isolate overflow-hidden rounded-[34px] border transition-colors duration-300 sm:rounded-[70px] p-20 ${
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
                <div className="relative z-10 grid grid-cols-[minmax(0,1.5fr)_minmax(0,.75fr)] grid-rows-1 items-end">
                  <div className="relative">
                    <h1 className="text-[10px] tracking-normal text-primary/90 sm:text-[33px]">
                      {service.name}
                    </h1>
                    <h4 id={`service-title-${service.id}`} className="mt-5 max-w-[760px] whitespace-pre-line text-[clamp(1.5rem,5vw,4rem)]
                      leading-[1.1] tracking-normal sm:mt-5">
                      {service.headline}
                    </h4>
                    <p className="mt-4 max-w-2xl font-[400] tracking-wide text-xs leading-relaxed text-white/75 sm:mt-5 sm:text-[23px]">
                      {service.description}
                    </p>
                    <ul className="mt-10 relative flex flex-wrap gap-2" aria-label={`${service.name} includes`}>
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="rounded-full bg-primary/[0.05] px-2 py-1 text-[10px] font-[500] tracking-wide capitalize text-white/90 sm:px-6 sm:py-2 sm:text-[17px]">
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative flex min-w-0 items-center justify-center px-2 sm:px-4 lg:px-8">
                    <Image src={service.image} alt="" width={1536} height={1024} sizes="(min-width: 1024px) 42vw, 38vw"
                      className="h-auto max-h-[250px] w-full max-w-[520px] object-contain opacity-80 transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-[320px] sm:opacity-90 lg:max-h-[440px]"
                    />
                  </div>
                </div>
                <div className="absolute top-15 right-15 z-10 w-full flex items-center justify-end gap-4">
                  <button type="button" aria-label={selected ? `Remove ${service.name} from selected services` : `Get this Service: ${service.name}`}
                    aria-pressed={selected} onClick={() => toggleService(service.name)}
                    className={`service-get-btn cursor-pointer ${selected ? "service-added" : ""}`}>
                    <span className="btnText">{selected ? "Added to Inquiry" : "Get this Service"}</span>
                    <span className="iconArea">
                      {selected ? <Check size={19} strokeWidth={2}/> : <Plus size={20} strokeWidth={1.8}/>}
                    </span>
                  </button>
                </div>
              </section>
            );
          })}
        </div>
        {selectedServices.length > 0 && (
          <div className="fixed bottom-10 left-0 right-0 mx-auto z-30 w-[min(92vw,480px)] flex items-center justify-center">
            <div className="relative flex flex-col rounded-[40px] overflow-hidden bg-primary/[0.10] p-7 text-white backdrop-blur-[60px] sm:p-12 w-full shadow-[0_8px_30px_rgba(0,0,0,0.82)]">
              <h4 className="text-base font-[400] tracking-[.5px] text-white sm:text-[31px]">Selected Services
                <span className="ps-3 font-[500] text-white/50 text-[18px] tracking-wide">({selectedServices.length} selected)</span>
              </h4>
              <p className="mt-2 mb-5 text-base text-white/65 sm:text-[18px] font-[500] tracking-wide">{selectedServices.join(" , ")}</p>
              <div className="flex w-full items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedServices([])}
                  aria-label="Reset selected services"
                  title="Reset selected services"
                  className="grid size-14 shrink-0 cursor-pointer place-items-center rounded-full bg-orange-500/75 text-secondary transition-colors hover:bg-orange-500/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-400"
                >
                  <RotateCcw size={21} strokeWidth={1.8} />
                </button>
                <button type="button" onClick={proceedToContact} className="flex min-h-14 min-w-0 flex-1 cursor-pointer items-center justify-center gap-3 rounded-full bg-primary/85 px-5 py-3
                  text-base font-bold text-secondary transition-colors hover:bg-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                  focus-visible:outline-primary sm:text-[20px]">
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
