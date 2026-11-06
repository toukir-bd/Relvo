"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Mail, Phone, Sparkles } from "lucide-react";
import { serviceNames } from "@/data/services";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

const EMPTY_SERVICE_SELECTION: string[] = [];

const fieldClassName =
  "peer h-14 w-full rounded-xl border border-transparent bg-[#101b15] px-4 pb-1 pt-7 text-base font-medium tracking-wide text-white outline-none transition-colors placeholder:text-transparent focus:border-primary/70 focus:bg-[#12251a]";
const floatingLabelClassName =
  "pointer-events-none absolute left-4 top-1 z-10 text-xs font-medium tracking-wide text-white/60 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/55 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary";

function ContactForm({
  initialSelectedServices = EMPTY_SERVICE_SELECTION,
}: {
  initialSelectedServices?: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pendingFocusRef = useRef<HTMLElement | null>(null);
  const { start: startSmoothScroll, stop: stopSmoothScroll, scrollTo } = useSmoothScroll();
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  function closeValidation() {
    setValidationMessage("");
    requestAnimationFrame(() => pendingFocusRef.current?.focus());
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isHolding = false;
    let heldScroll = 0;
    let canHoldAgain = true;
    // Consume about one wheel-step equivalent after the section is reached.
    const holdDistance = 50;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1;
      const deltaY = event.deltaY * deltaMultiplier;

      if (deltaY < 0) {
        const wasHolding = isHolding;
        isHolding = false;
        heldScroll = 0;
        canHoldAgain = true;
        if (wasHolding) startSmoothScroll();
        return;
      }

      const bounds = section.getBoundingClientRect();
      const isAtSectionStart = bounds.top <= 2 && bounds.top > -24;
      const isCrossingSectionStart = bounds.top > 2 && bounds.top <= deltaY + 2;

      if (!isHolding && canHoldAgain && (isAtSectionStart || isCrossingSectionStart)) {
        event.preventDefault();
        stopSmoothScroll();
        scrollTo(window.scrollY + bounds.top);
        isHolding = true;
        heldScroll = 0;
        return;
      }

      if (!isHolding) return;

      heldScroll += Math.abs(deltaY);

      if (heldScroll <= holdDistance) {
        event.preventDefault();
        return;
      }

      isHolding = false;
      canHoldAgain = false;
      startSmoothScroll();
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", handleWheel, true);
      if (isHolding) startSmoothScroll();
    };
  }, [scrollTo, startSmoothScroll, stopSmoothScroll]);

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
    setValidationMessage("");
    clearFieldError("services", true);
  }

  function clearFieldError(field: string, isValid: boolean) {
    if (!isValid) return;
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const emailField = form.elements.namedItem("email") as HTMLInputElement;
    const phoneField = form.elements.namedItem("phone") as HTMLInputElement;
    const projectField = form.elements.namedItem("project") as HTMLTextAreaElement;
    const errors: Record<string, string> = {};

    if (!nameField.value.trim()) errors.name = "Enter your name.";
    if (!emailField.value.trim()) errors.email = "Enter your email address.";
    else if (!emailField.validity.valid) errors.email = "Enter a valid email address.";
    if (!phoneField.value.trim()) errors.phone = "Enter your mobile number.";
    if (!projectField.value.trim()) errors.project = "Tell us a little about your project.";
    if (selectedServices.length === 0) errors.services = "Choose at least one service.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      pendingFocusRef.current = errors.services
        ? form.querySelector<HTMLButtonElement>("[data-service-option]")
        : form.querySelector<HTMLElement>("[aria-invalid='true']");
      setValidationMessage("Please review the highlighted fields below.");
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
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-16 -z-10 size-[28rem] rounded-full bg-primary/[0.08] blur-[100px]" />

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
          <form noValidate onSubmit={handleSubmit}
            className="relative isolate overflow-hidden rounded-[30px] p-5 text-white sm:rounded-[52px] sm:p-10 lg:p-14 border border-white/[0.05] bg-secondary/[0.5]"
              style={{backgroundImage:"linear-gradient(rgb(187 255 0 / 2%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 2%) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-[18%] -bottom-[22%] z-0 aspect-square w-full rounded-full bg-primary/20 blur-[100px]"/>
            <div className="relative">
              <div className="mb-10">
                <div>
                  <h4 className="max-w-[480px] text-[clamp(1.8rem,3.2vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-white">
                    A quick conversation.
                    <br />
                    A clear next step.
                  </h4>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="relative block">
                  <input required name="name" autoComplete="name" placeholder=" " className={fieldClassName} aria-invalid={Boolean(fieldErrors.name)} style={fieldErrors.name ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("name", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Your name</span>
                  {fieldErrors.name && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.name}</span>}
                </label>
                <label className="relative block">
                  <input required type="email" name="email" autoComplete="email" placeholder=" " className={fieldClassName} aria-invalid={Boolean(fieldErrors.email)} style={fieldErrors.email ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("email", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Email address</span>
                  {fieldErrors.email && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.email}</span>}
                </label>
                <label className="relative block sm:col-span-2">
                  <input required type="tel" name="phone" autoComplete="tel" placeholder=" " className={fieldClassName} aria-invalid={Boolean(fieldErrors.phone)} style={fieldErrors.phone ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("phone", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Mobile number</span>
                  {fieldErrors.phone && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.phone}</span>}
                </label>
              </div>
              <fieldset className="mt-4">
                <label className="mb-1 block text-md font-[500] text-white/50 tracking-wide capitalize">
                  Interested in
                </label>
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
                        className={`inline-flex min-h-6 items-center gap-1.5 rounded-full border px-4 py-1.5 text-[14px] font-medium transition sm:text-[14px] tracking-wide cursor-pointer ${
                          selected
                            ? "border-primary/60 bg-primary text-secondary"
                            : "border-primary/15 bg-primary/10 text-white hover:border-primary/70 hover:text-white"
                        }`}
                      >
                        {selected && <Check size={13} strokeWidth={2.5} />}
                        {service}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.services && <p role="alert" className="mt-2 text-xs font-medium text-red-400">{fieldErrors.services}</p>}
              </fieldset>

              <label className="relative mt-6 block">
                <textarea
                  required
                  name="project"
                  placeholder=" "
                  rows={2}
                  className="peer min-h-28 w-full resize-y rounded-xl border border-transparent bg-[#101b15] px-4 pb-3 pt-8 text-base font-medium tracking-wide text-white outline-none transition-colors placeholder:text-transparent focus:border-primary/70 focus:bg-[#12251a]"
                  aria-invalid={Boolean(fieldErrors.project)}
                  style={fieldErrors.project ? { borderColor: "#f87171" } : undefined}
                  onChange={(event) => clearFieldError("project", event.currentTarget.value.trim().length > 0)}
                />
                <span className="pointer-events-none absolute left-4 top-2 z-10 text-xs font-medium tracking-wide text-white/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/55 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                  About the project
                </span>
                {fieldErrors.project && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.project}</span>}
              </label>
              <p aria-live="polite" className="min-h-4 text-sm text-[#555]">{submitMessage}</p>
              <button
                type="submit"
                className="group mt-5 flex min-h-14 w-full items-center justify-center rounded-full bg-[#090909] px-5 text-base font-semibold text-white transition hover:bg-[#252525] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      {validationMessage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeValidation();
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeValidation();
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="contact-validation-title"
            aria-describedby="contact-validation-description"
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d1911] p-6 text-white shadow-2xl sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Please check your form</p>
            <h2 id="contact-validation-title" className="mt-3 text-2xl font-semibold tracking-tight">One more step</h2>
            <p id="contact-validation-description" className="mt-2 text-base leading-relaxed text-white/70">
              {validationMessage}
            </p>
            <button
              type="button"
              autoFocus
              onClick={closeValidation}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-secondary transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
            >
              Got it
            </button>
          </div>
        </div>
      )}
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
