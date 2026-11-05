"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Mail, Phone, Sparkles } from "lucide-react";
import { serviceNames } from "@/data/services";

const EMPTY_SERVICE_SELECTION: string[] = [];

const fieldClassName =
  "h-14 w-full rounded-2xl border border-white/[0.09] bg-[#111915]/90 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary/60 focus:ring-2 focus:ring-primary/15";

function ContactForm({
  initialSelectedServices = EMPTY_SERVICE_SELECTION,
}: {
  initialSelectedServices?: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices);
  const [serviceError, setServiceError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isHolding = false;
    let holdGestures = 0;
    let lastGestureAt = 0;
    let canHoldAgain = true;
    const gestureGap = 350;
    const gesturesToHold = 2;

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024 || event.deltaY === 0) return;

      if (event.deltaY < 0) {
        isHolding = false;
        holdGestures = 0;
        canHoldAgain = true;
        return;
      }

      const bounds = section.getBoundingClientRect();
      const isAtSectionStart = bounds.top <= 2 && bounds.top > -24;
      const isCrossingSectionStart = bounds.top > 2 && bounds.top <= event.deltaY + 2;

      if (!isHolding && canHoldAgain && (isAtSectionStart || isCrossingSectionStart)) {
        event.preventDefault();
        window.scrollTo({ top: window.scrollY + bounds.top, behavior: "instant" });
        isHolding = true;
        holdGestures = 1;
        lastGestureAt = performance.now();
        return;
      }

      if (!isHolding) return;

      const now = performance.now();
      if (now - lastGestureAt >= gestureGap) {
        holdGestures += 1;
        lastGestureAt = now;
      }

      if (holdGestures <= gesturesToHold) {
        event.preventDefault();
        return;
      }

      isHolding = false;
      canHoldAgain = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
    setServiceError(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (selectedServices.length === 0) {
      setServiceError(true);
      form.querySelector<HTMLButtonElement>("[data-service-option]")?.focus();
      return;
    }

    const values = new FormData(form);
    const name = String(values.get("name") ?? "");
    const email = String(values.get("email") ?? "");
    const phone = String(values.get("phone") ?? "");
    const project = String(values.get("project") ?? "");
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterested in: ${selectedServices.join(", ")}\n\nAbout the project:\n${project}`,
    );

    window.location.href = `mailto:partner@bytetown.agency?subject=${subject}&body=${body}`;
    setSubmitMessage("Your email app should open with your project inquiry ready to send.");
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate overflow-hidden bg-[#0b100d] px-4 py-20 text-white sm:px-6 sm:py-24 md:px-10 lg:min-h-svh lg:px-14 lg:py-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(187 255 0 / 12%) 0.7px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-16 -z-10 size-[28rem] rounded-full bg-primary/[0.08] blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-start gap-12 lg:sticky lg:top-0 lg:min-h-svh lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:py-10">
        <div className="lg:pb-12">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles size={14} /> Let’s make it happen
          </p>
          <h2 className="focus-title max-w-[620px] text-[clamp(2.8rem,7vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white">
            Have a project?
            <br />
            <span className="hero-text-neon">Let’s build it.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Tell us what you’re working on. Share a few details and we’ll get back to you to talk through the next steps.
          </p>

          <div className="mt-9 grid max-w-lg gap-3 sm:grid-cols-2">
            <a
              href="mailto:partner@bytetown.agency"
              className="group flex min-h-[78px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-primary/40"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/[0.1] text-primary"><Mail size={18} /></span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wider text-white/40">Email us</span>
                <span className="mt-1 block truncate text-sm font-medium text-white/85">partner@bytetown.agency</span>
              </span>
            </a>
            <div className="flex min-h-[78px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/[0.1] text-primary"><Phone size={18} /></span>
              <span>
                <span className="block text-[11px] uppercase tracking-wider text-white/40">Your phone</span>
                <span className="mt-1 block text-sm font-medium text-white/85">Add it in the form</span>
              </span>
            </div>
          </div>

          <div className="mt-10 max-w-lg border-t border-white/10 pt-6">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">A simple start</p>
            <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                ["01", "Tell us the goal"],
                ["02", "Choose your services"],
                ["03", "Start a conversation"],
              ].map(([step, title]) => (
                <li key={step} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 text-[11px] font-semibold text-primary">{step}</span>
                  {title}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#111713]/95 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:rounded-[36px] sm:p-8 lg:p-9"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="relative">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Project inquiry</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Let’s talk details</h3>
                  <p className="mt-2 text-sm text-white/45"><span className="text-primary">*</span> Required fields</p>
                </div>
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-[#101510] sm:size-14"><ArrowUpRight size={24} /></span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-white/65">Your name <span className="text-primary">*</span></span>
                  <input required name="name" autoComplete="name" placeholder="Name" className={fieldClassName} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-white/65">Email address <span className="text-primary">*</span></span>
                  <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className={fieldClassName} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-medium text-white/65">Mobile number <span className="text-primary">*</span></span>
                  <input required type="tel" name="phone" autoComplete="tel" placeholder="Include your country code" className={fieldClassName} />
                </label>
              </div>

              <fieldset className="mt-6">
                <legend className="mb-3 text-xs font-medium text-white/65">
                  Interested in <span className="text-primary">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {serviceNames.map((service) => {
                    const selected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        data-service-option
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(service)}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition sm:text-[13px] ${
                          selected
                            ? "border-primary/60 bg-primary text-[#101510]"
                            : "border-white/10 bg-white/[0.025] text-white/70 hover:border-primary/40 hover:text-white"
                        }`}
                      >
                        {selected && <Check size={13} strokeWidth={2.5} />}
                        {service}
                      </button>
                    );
                  })}
                </div>
                {serviceError && (
                  <p role="alert" className="mt-2 text-xs text-primary">Choose at least one service to continue.</p>
                )}
              </fieldset>

              <label className="mt-6 block">
                <span className="mb-2 block text-xs font-medium text-white/65">About the project <span className="text-primary">*</span></span>
                <textarea
                  required
                  name="project"
                  placeholder="What are you looking to create or improve?"
                  rows={4}
                  className="w-full resize-y rounded-2xl border border-white/[0.09] bg-[#111915]/90 px-4 py-3.5 text-sm leading-relaxed text-white outline-none transition placeholder:text-white/35 focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                />
              </label>

              <button
                type="submit"
                className="group mt-5 flex min-h-14 w-full items-center justify-between rounded-2xl bg-primary px-5 text-sm font-bold text-[#101510] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
              >
                Send project inquiry
                <span className="grid size-9 place-items-center rounded-xl bg-black/[0.09] transition-transform group-hover:translate-x-1"><ArrowUpRight size={19} /></span>
              </button>
              <p aria-live="polite" className="mt-3 min-h-4 text-xs text-white/50">{submitMessage}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/35">Your details are only used to follow up about this project.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function ContactSection({
  initialSelectedServices = EMPTY_SERVICE_SELECTION,
}: {
  initialSelectedServices?: string[];
}) {
  const selectionKey = initialSelectedServices.join("|") || "empty";
  return <ContactForm key={selectionKey} initialSelectedServices={initialSelectedServices} />;
}
