"use client";

import Image from "next/image";
import { useState } from "react";
import Started from "@/components/sections/Started";
import { serviceOptions } from "@/data/services";

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
    history.replaceState(null, "", "#contact");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <div className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-[8vw]">
        <div className="space-y-4 sm:space-y-6">
          {serviceOptions.map((service, index) => {
            const selected = selectedServices.includes(service.name);

            return (
              <section
                key={service.id}
                id={`service-${service.id}`}
                aria-labelledby={`service-title-${service.id}`}
                className={`relative isolate grid min-h-[430px] overflow-hidden rounded-[28px] border transition-colors duration-300 sm:min-h-[480px] lg:grid-cols-[1.05fr_0.95fr] lg:rounded-[36px] ${
                  selected ? "border-primary/60 bg-[#0a1c18]" : "border-white/10 bg-white/[0.025]"
                }`}
              >
                <div className="relative z-10 flex flex-col p-6 sm:p-9 lg:p-12">
                  <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary/85">
                    <span>{service.number}</span>
                    <span aria-hidden="true" className="h-px w-10 bg-primary/50" />
                    <span>{service.name}</span>
                  </div>
                  <h2
                    id={`service-title-${service.id}`}
                    className="focus-title mt-7 max-w-2xl text-[clamp(2.2rem,4.5vw,4.8rem)] font-bold leading-[0.98] tracking-tight"
                  >
                    {service.headline}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                    {service.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${service.name} includes`}>
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70 sm:text-sm"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service.name)}
                    className={`mt-8 flex min-h-12 w-fit items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                      selected
                        ? "border-primary bg-primary text-secondary"
                        : "border-white/25 text-white hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 place-items-center rounded-full border ${
                        selected ? "border-secondary bg-secondary text-primary" : "border-current"
                      }`}
                    >
                      {selected ? "✓" : "+"}
                    </span>
                    {selected ? "Selected" : "Choose this service"}
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-20 lg:relative lg:z-0 lg:w-full lg:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent lg:from-secondary lg:via-secondary/20" />
                  <Image
                    src={`${service.image}?v=bbff00`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className={`object-contain object-right-bottom ${index % 2 === 0 ? "lg:object-right" : "lg:object-left"}`}
                    unoptimized
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-primary/[0.045] blur-3xl"
                />
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

      <Started initialSelectedServices={selectedServices} />
    </div>
  );
}

