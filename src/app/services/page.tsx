"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { serviceOptions } from "@/data/services";
import Faq from "@/components/sections/Faq";
import { openContactModal } from "@/utils/contactModal";

export default function ServicesPage() {
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
    <div className="bg-secondary text-white">
      <header className="relative overflow-hidden px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-[8vw] lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 7%) 0.65px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <p className="relative mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary sm:text-sm">
          What we do
        </p>
        <h1 className="focus-title relative max-w-5xl text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
          Services built around <span className="hero-text-neon">your next move.</span>
        </h1>
        <p className="relative mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
          Choose the support you need today. We bring strategy, design, and development together to help your business move forward.
        </p>
      </header>

      <div className="w-full px-5 pb-24 sm:px-8 lg:px-[8vw]">
        <div className="space-y-4 sm:space-y-6">
          {serviceOptions.map((service, index) => {
            const selected = selectedServices.includes(service.name);

            return (
              <section
                key={service.id}
                id={`service-${service.id}`}
                aria-labelledby={`service-title-${service.id}`}
                className={`group relative isolate min-h-[640px] overflow-hidden rounded-[34px] border transition-colors duration-300 sm:min-h-[680px] sm:rounded-[40px] ${
                  selected ? "border-primary/35 bg-[#121b16]" : "border-white/[0.07] bg-[#121914]"
                }`}
              >
                <div aria-hidden="true" className="pointer-events-none absolute -left-[12%] -top-[33%] z-0 aspect-square w-[78%] rounded-full bg-primary/[0.09]" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-[18%] -top-[48%] z-0 aspect-square w-[62%] rounded-full bg-[#8f42a5]/[0.1]" />
                <button
                  type="button"
                  aria-label={selected ? `Remove ${service.name} from selected services` : `Choose ${service.name}`}
                  aria-pressed={selected}
                  onClick={() => toggleService(service.name)}
                  className={`absolute right-5 top-5 z-30 grid size-14 place-items-center rounded-[18px] border transition duration-300 sm:right-7 sm:top-7 sm:size-16 sm:rounded-[20px] ${
                    selected
                      ? "border-primary bg-primary text-secondary"
                      : "border-white/10 bg-white/[0.08] text-primary hover:rotate-45 hover:bg-primary hover:text-secondary"
                  }`}
                >
                  {selected ? <Check size={23} strokeWidth={2} /> : <ArrowUpRight size={25} strokeWidth={1.7} />}
                </button>

                <div className="pointer-events-none absolute inset-x-[5%] bottom-[16%] z-0 h-[51%] sm:inset-x-[8%] sm:bottom-[15%] sm:h-[57%] lg:left-[39%] lg:right-[3%] lg:h-[76%]">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 720px, 90vw"
                    className={`object-contain object-center opacity-75 transition-transform duration-500 group-hover:scale-[1.03] sm:opacity-90 ${index % 2 === 0 ? "lg:object-right" : "lg:object-left"}`}
                  />
                </div>

                <div className="relative z-10 flex min-h-[640px] flex-col p-6 sm:min-h-[680px] sm:p-9 lg:p-12">
                  <span className="w-fit max-w-[72%] rounded-full bg-white/[0.1] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90 sm:text-xs">
                    {service.number} / {service.name}
                  </span>
                  <h2
                    id={`service-title-${service.id}`}
                    className="focus-title mt-6 max-w-[760px] whitespace-pre-line text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] sm:mt-7 lg:max-w-[58%]"
                  >
                    {service.headline}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base lg:max-w-[54%]">
                    {service.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8 lg:max-w-[68%]" aria-label={`${service.name} includes`}>
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="rounded-full bg-white/[0.1] px-4 py-2.5 text-[13px] font-medium text-white/90 sm:text-sm"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <div className="sticky bottom-4 z-30 mt-8 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-[#071412]/95 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-white/75">
              <span className="font-semibold text-white">{selectedServices.length} selected</span>
              <span className="ml-2 hidden text-white/50 sm:inline">
                {selectedServices.join(" · ")}
              </span>
            </p>
            <button
              type="button"
              onClick={proceedToContact}
              className="group flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-bold text-secondary transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Proceed to contact
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        )}
      </div>

      <Faq />
    </div>
  );
}

