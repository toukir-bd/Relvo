"use client";

import { useState } from "react";

const services = ["Interface Design", "Branding", "Development"];

const socials = [
  { label: "Dribbble", mark: "◉", href: "#" },
  { label: "Behance", mark: "Bē", href: "#" },
  { label: "LinkedIn", mark: "in", href: "#" },
  { label: "Telegram", mark: "➤", href: "#" },
  { label: "Website", mark: "W.", href: "#" },
];

export default function ContactSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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
      className="bg-[#101010] px-6 py-16 text-white md:px-10 md:py-20 lg:px-14"
    >
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="max-w-[520px] text-5xl font-medium leading-[0.98] tracking-tight md:text-6xl">
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
              className="text-xl font-semibold hover:text-[#aeb4ff] md:text-2xl"
            >
              partner@bytetown.agency
            </a>

            <div className="mt-4 flex gap-7 text-sm">
              <a href="#" className="hover:text-[#aeb4ff]">
                Telegram ↗
              </a>
              <a href="#" className="hover:text-[#aeb4ff]">
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
                className="grid h-[68px] w-[100px] place-items-center rounded-2xl border border-white/30 text-2xl font-bold transition hover:border-[#5964ff] hover:bg-[#5964ff]"
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
            <legend className="mb-3 text-sm font-semibold text-[#c4caff]">
              Contact information*
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Your name"
                aria-label="Your name"
                className="h-[60px] min-w-0 rounded-xl bg-[#272727] px-4 text-white outline-none placeholder:text-white/65 focus:ring-2 focus:ring-[#5964ff]"
              />
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email"
                aria-label="Your email"
                className="h-[60px] min-w-0 rounded-xl bg-[#272727] px-4 text-white outline-none placeholder:text-white/65 focus:ring-2 focus:ring-[#5964ff]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-[#c4caff]">
              You’re interested in
            </legend>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => {
                const selected = selectedServices.includes(service);

                return (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service)}
                    className={`rounded-xl border px-5 py-4 text-sm font-semibold transition ${
                      selected
                        ? "border-[#5964ff] bg-[#5964ff] text-white"
                        : "border-white/30 text-white/80 hover:border-white/70"
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-3 block text-sm font-semibold text-[#c4caff]">
              About the project
            </span>
            <textarea
              name="project"
              placeholder="Describe the task"
              rows={5}
              className="w-full resize-y rounded-xl bg-[#272727] px-4 py-4 text-white outline-none placeholder:text-white/65 focus:ring-2 focus:ring-[#5964ff]"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#5964ff] py-5 font-bold transition hover:bg-[#7079ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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