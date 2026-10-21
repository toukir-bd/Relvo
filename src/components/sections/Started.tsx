"use client";

import { useEffect, useState } from "react";
import { serviceNames } from "@/data/services";

const socials = [
  { label: "Dribbble", mark: "◉", href: "#" },
  { label: "Behance", mark: "Bē", href: "#" },
  { label: "LinkedIn", mark: "in", href: "#" },
  { label: "Telegram", mark: "➤", href: "#" },
  { label: "Website", mark: "W.", href: "#" },
];

const EMPTY_SERVICE_SELECTION: string[] = [];

export default function ContactSection({
  initialSelectedServices = EMPTY_SERVICE_SELECTION,
}: {
  initialSelectedServices?: string[];
}) {
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices);

  useEffect(() => {
    setSelectedServices(initialSelectedServices);
  }, [initialSelectedServices]);

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  return (
    <section
      id="contact"
      className="bg-[#101010] px-4 py-12 text-white sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="max-w-[520px] text-[clamp(2.5rem,8vw,3.75rem)] font-medium leading-[0.98] tracking-tight">
            Tell us about
            <br />
            the project
          </h2>

          <p className="mt-6 max-w-md text-lg leading-snug text-white/75">
            Please fill out the form, and we will contact you shortly to discuss
            the project details
          </p>

          <div className="mt-10 max-w-md border-t border-white/30 pt-5">
            <a
              href="mailto:partner@bytetown.agency"
              className="break-all text-lg font-semibold hover:text-primary sm:text-xl md:text-2xl"
            >
              partner@bytetown.agency
            </a>

            <div className="mt-4 flex gap-7 text-sm">
              <a href="#" className="hover:text-primary">
                Telegram ↗
              </a>
              <a href="#" className="hover:text-primary">
                WhatsApp ↗
              </a>
            </div>
          </div>

          <nav aria-label="Social links" className="mt-10 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="grid h-14 w-14 place-items-center rounded-xl border border-white/30 text-xl font-bold transition hover:border-primary hover:bg-primary hover:text-secondary sm:h-[68px] sm:w-[100px] sm:rounded-2xl sm:text-2xl"
              >
                {social.mark}
              </a>
            ))}
          </nav>
        </div>

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            // Send the form data to your API or email service here.
          }}
        >
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-primary/80">
              Contact information*
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Your name"
                aria-label="Your name"
                className="h-[60px] min-w-0 rounded-xl bg-[#272727] px-4 text-white outline-none placeholder:text-white/65 focus:ring-2 focus:ring-primary"
              />
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email"
                aria-label="Your email"
                className="h-[60px] min-w-0 rounded-xl bg-[#272727] px-4 text-white outline-none placeholder:text-white/65 focus:ring-2 focus:ring-primary"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-primary/80">
              You’re interested in
            </legend>
            <div className="flex flex-wrap gap-2">
              {serviceNames.map((service) => {
                const selected = selectedServices.includes(service);

                return (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service)}
                    className={`rounded-xl border px-5 py-4 text-sm font-semibold transition ${
                      selected
                        ? "border-primary bg-primary text-secondary"
                        : "border-white/30 text-white/80 hover:border-primary/70"
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-3 block text-sm font-semibold text-primary/80">
              About the project
            </span>
            <textarea
              name="project"
              placeholder="Describe the task"
              rows={5}
              className="w-full resize-y rounded-xl bg-[#272727] px-4 py-4 text-white outline-none placeholder:text-white/65 focus:ring-2 focus:ring-primary"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-5 font-bold text-secondary transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            SUBMIT
          </button>

          <p className="text-xs text-white/45">
            By clicking the “Submit” button, you agree to the privacy policy.
          </p>
        </form>
      </div>
    </section>
  );
}
