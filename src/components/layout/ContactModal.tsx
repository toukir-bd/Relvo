"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Mail, PhoneCall, Send, X } from "lucide-react";
import { serviceNames } from "@/data/services";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

const EMPTY_SERVICE_SELECTION: string[] = [];
const COUNTRY_CODES = [
  ["Bangladesh", "+880"],
  ["Australia", "+61"],
  ["Austria", "+43"],
  ["Belgium", "+32"],
  ["Brazil", "+55"],
  ["Canada", "+1"],
  ["China", "+86"],
  ["Denmark", "+45"],
  ["Egypt", "+20"],
  ["Finland", "+358"],
  ["France", "+33"],
  ["Germany", "+49"],
  ["Ghana", "+233"],
  ["Hong Kong", "+852"],
  ["India", "+91"],
  ["Indonesia", "+62"],
  ["Ireland", "+353"],
  ["Israel", "+972"],
  ["Italy", "+39"],
  ["Japan", "+81"],
  ["Kenya", "+254"],
  ["Kuwait", "+965"],
  ["Malaysia", "+60"],
  ["Mexico", "+52"],
  ["Nepal", "+977"],
  ["Netherlands", "+31"],
  ["New Zealand", "+64"],
  ["Nigeria", "+234"],
  ["Norway", "+47"],
  ["Oman", "+968"],
  ["Pakistan", "+92"],
  ["Philippines", "+63"],
  ["Poland", "+48"],
  ["Portugal", "+351"],
  ["Qatar", "+974"],
  ["Saudi Arabia", "+966"],
  ["Singapore", "+65"],
  ["South Africa", "+27"],
  ["South Korea", "+82"],
  ["Spain", "+34"],
  ["Sri Lanka", "+94"],
  ["Sweden", "+46"],
  ["Switzerland", "+41"],
  ["Thailand", "+66"],
  ["Turkey", "+90"],
  ["United Arab Emirates", "+971"],
  ["United Kingdom", "+44"],
  ["United States", "+1"],
  ["Vietnam", "+84"],
] as const;
type CountryOption = { id: string; name: string; code: string; aliases: string[]; displayName: string; shortName: string };
type ApiCountry = { name?: string; callingCodes?: string[] };

const COUNTRY_SEARCH_ALIASES: Record<string, { displayName: string; shortName: string; aliases: string[] }> = {
  "united states": {
    displayName: "United States of America",
    shortName: "USA",
    aliases: ["USA", "US", "United States", "United States of America", "America"],
  },
  "united states of america": {
    displayName: "United States of America",
    shortName: "USA",
    aliases: ["USA", "US", "United States", "United States of America", "America"],
  },
  "united kingdom": {
    displayName: "United Kingdom",
    shortName: "UK",
    aliases: ["UK", "United Kingdom", "Great Britain", "Britain"],
  },
  "south korea": {
    displayName: "South Korea",
    shortName: "KOR",
    aliases: ["South Korea", "Republic of Korea", "Korea"],
  },
  "north korea": {
    displayName: "North Korea",
    shortName: "PRK",
    aliases: ["North Korea", "North Korea DPR", "DPRK"],
  },
  "united arab emirates": {
    displayName: "United Arab Emirates",
    shortName: "UAE",
    aliases: ["UAE", "United Arab Emirates", "Emirates"],
  },
  "czechia": {
    displayName: "Czech Republic",
    shortName: "CZE",
    aliases: ["Czechia", "Czech Republic"],
  },
  "czech republic": {
    displayName: "Czech Republic",
    shortName: "CZE",
    aliases: ["Czechia", "Czech Republic"],
  },
};

function countrySearchInfo(name: string) {
  const normalizedName = name.toLowerCase().trim();
  return COUNTRY_SEARCH_ALIASES[normalizedName] ?? {
    displayName: name,
    shortName: name.slice(0, 3).toUpperCase(),
    aliases: [name],
  };
}

const fieldClassName =
  "peer h-14 w-full rounded-xl border border-primary/0 bg-secondary/60 px-4 pb-1 pt-4 text-base font-medium tracking-wide text-white outline-none transition-colors placeholder:text-transparent focus:border-primary/70 focus:bg-[#12251a]";
const floatingLabelClassName =
  "pointer-events-none absolute left-4 top-2 z-10 text-xs font-medium leading-none tracking-wider text-primary/40 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-primary/40 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary";

function ContactForm({
  initialSelectedServices = EMPTY_SERVICE_SELECTION,
  isModal = false,
}: {
  initialSelectedServices?: string[];
  isModal?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pendingFocusRef = useRef<HTMLElement | null>(null);
  const countryTriggerRef = useRef<HTMLButtonElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const countryPickerRef = useRef<HTMLDivElement>(null);
  const { start: startSmoothScroll, stop: stopSmoothScroll, scrollTo } = useSmoothScroll();
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices);
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryListLoading, setCountryListLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>(() =>
    COUNTRY_CODES.map(([name, code]) => ({
      id: `${name}-${code}`,
      name,
      code,
      ...countrySearchInfo(name),
    })),
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    async function loadCountryCodes() {
      try {
        const response = await fetch(
          "https://countries.dev/countries?fields=name,callingCodes&sort=name",
          { signal: controller.signal },
        );
        if (!response.ok) return;

        const countries = (await response.json()) as ApiCountry[];
        const options = countries
          .flatMap((country) =>
            country.name && Array.isArray(country.callingCodes)
              ? country.callingCodes
                  .filter((code) => /^\d+$/.test(code))
                  .map((code) => ({
                    id: `${country.name}-${code}`,
                    name: country.name!,
                    code: `+${code}`,
                    ...countrySearchInfo(country.name!),
                  }))
              : [],
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        if (options.length > 0) setCountryOptions(options);
      } catch {
      } finally {
        if (!controller.signal.aborted) setCountryListLoading(false);
      }
    }

    void loadCountryCodes();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!countryPickerOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!countryPickerRef.current?.contains(event.target as Node)) {
        setCountryPickerOpen(false);
        setCountrySearch("");
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [countryPickerOpen]);

  const normalizedCountrySearch = countrySearch.trim().toLowerCase();
  const filteredCountryOptions = countryOptions.filter(({ name, code, aliases }) => {
    if (!normalizedCountrySearch) return true;
    const normalizedCode = code.toLowerCase();
    const numericSearch = normalizedCountrySearch.replace(/^\+/, "");
    return aliases.some((alias) => alias.toLowerCase().startsWith(normalizedCountrySearch))
      || name.toLowerCase().startsWith(normalizedCountrySearch)
      || normalizedCode.startsWith(normalizedCountrySearch)
      || normalizedCode.slice(1).startsWith(numericSearch);
  });

  function closeValidation() {
    setValidationMessage("");
    requestAnimationFrame(() => pendingFocusRef.current?.focus());
  }

  useEffect(() => {
    if (isModal) return;
    const section = sectionRef.current;
    if (!section) return;

    let isHolding = false;
    let heldScroll = 0;
    let canHoldAgain = true;
    const holdDistance = 50;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      if ((event.target as HTMLElement).closest("[data-country-scroll]")) return;
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
  }, [isModal, scrollTo, startSmoothScroll, stopSmoothScroll]);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    if (!selectedCountryId) errors.country = "Select a country calling code.";
    if (!projectField.value.trim()) errors.project = "Tell us a little about your project.";
    if (selectedServices.length === 0) errors.services = "Choose at least one service.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      pendingFocusRef.current = errors.services
        ? form.querySelector<HTMLButtonElement>("[data-service-option]")
        : errors.country
          ? countryTriggerRef.current
          : form.querySelector<HTMLElement>("[aria-invalid='true']");
      setValidationMessage("Please review the highlighted fields below.");
      return;
    }

    const values = new FormData(form);
    const name = String(values.get("name") ?? "");
    const email = String(values.get("email") ?? "");
    const phone = `${countryCode} ${String(values.get("phone") ?? "")}`;
    const project = String(values.get("project") ?? "");
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          services: selectedServices,
          project,
          website: String(values.get("website") ?? ""),
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "We couldn’t send your message. Please try again.");
      }

      form.reset();
      setSelectedServices(initialSelectedServices);
      setCountryCode("");
      setSelectedCountryId("");
      setSubmitMessage("Thanks! Your project inquiry has been sent. We’ll be in touch soon.");
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "We couldn’t send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={isModal
        ? "relative isolate overflow-hidden px-0 py-0 text-white"
        : "relative isolate overflow-hidden px-4 py-20 text-white sm:px-6 sm:py-24 md:px-10 lg:min-h-svh lg:px-20 lg:py-0 xl:px-24"}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          backgroundSize: "4px 4px",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-16 -z-10 size-[28rem] rounded-full bg-primary/[0.13] blur-[100px]" />
      <div className={isModal
        ? "relative z-10 mx-auto w-full max-w-[960px]"
        : "relative z-10 mx-auto flex w-full max-w-[960px] items-center justify-center lg:min-h-svh lg:py-10"}>

        <div>
          <form noValidate onSubmit={handleSubmit}
            className="relative isolate overflow-hidden rounded-[30px] p-5 text-white sm:rounded-[52px] sm:p-10 lg:p-14 border border-white/[0.05] bg-secondary/[0.5]"
              style={{backgroundImage:"linear-gradient(rgb(187 255 0 / 2.5%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 2.5%) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          >
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute -left-[18%] -bottom-[22%] z-0 aspect-square w-full rounded-full bg-primary/20 blur-[100px]"/>
            <div className="relative">
              <div className="mb-9">
                <div>
                  <h4 id={isModal ? "contact-modal-title" : undefined} className="w-full text-center text-[clamp(3rem,5vw,4.25rem)] font-normal leading-[1.05] tracking-normal text-white">
                    Let’s build
                  </h4>
                </div>
              </div>

              <fieldset className="mb-5">
                <label className="mb-2 block text-[18px] font-medium tracking-wide text-white/70 capitalize">
                  Interested In
                </label>
                <div className="flex flex-wrap gap-3">
                  {serviceNames.map((service) => {
                    const selected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        data-service-option
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(service)}
                        className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-5 py-2 text-sm font-[500] tracking-wide transition cursor-pointer sm:text-[17px] ${
                          selected
                            ? "border-primary/70 bg-primary text-secondary"
                            : "border-primary/20 bg-primary/[0.06] text-white/70 hover:border-primary/60 hover:bg-primary/[0.12] hover:text-white"
                        }`}
                      >
                        <span className={`grid size-4 shrink-0 place-items-center rounded-[4px] border ${selected ? "border-secondary bg-secondary" : "border-white/45 bg-transparent"}`} aria-hidden="true">
                          {selected && <Check size={11} strokeWidth={2.5} className="text-primary" />}
                        </span>
                        {service}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.services && <p role="alert" className="mt-2 text-sm font-semibold tracking-wide text-red-400">{fieldErrors.services}</p>}
              </fieldset>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="relative block">
                  <input required name="name" autoComplete="name" placeholder="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.name)} style={fieldErrors.name ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("name", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Your Name</span>
                  {fieldErrors.name && <span role="alert" className="mt-1 block text-sm font-semibold tracking-wide text-red-400">{fieldErrors.name}</span>}
                </label>
                <label className="relative block">
                  <input required type="email" name="email" autoComplete="email" placeholder="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.email)} style={fieldErrors.email ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("email", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Email Address</span>
                  {fieldErrors.email && <span role="alert" className="mt-1 block text-sm font-semibold tracking-wide text-red-400">{fieldErrors.email}</span>}
                </label>
                <div className="sm:col-span-2">
                  <div className="flex gap-2">
                    <div ref={countryPickerRef} className="relative w-[42%] min-w-28 max-w-44 shrink-0 sm:w-44">
                      {countryPickerOpen ? (
                        <input
                          ref={countrySearchRef}
                          type="search"
                          role="combobox"
                          aria-label="Search"
                          aria-expanded="true"
                          aria-controls="country-code-options"
                          autoComplete="off"
                          value={countrySearch}
                          onChange={(event) => setCountrySearch(event.currentTarget.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") setCountryPickerOpen(false);
                            if (event.key === "ArrowDown") {
                              event.preventDefault();
                              countryListRef.current?.querySelector<HTMLButtonElement>("[data-country-option]")?.focus();
                            }
                          }}
                          placeholder="Search"
                          className={`h-14 w-full rounded-xl border bg-secondary/60 px-4 text-base font-medium tracking-wide text-white outline-none placeholder:text-white/45 transition-colors ${fieldErrors.country ? "border-red-400" : "border-primary/0"} focus:border-primary/70 focus:bg-[#12251a]`}
                        />
                      ) : (
                        <button
                          ref={countryTriggerRef}
                          type="button"
                          aria-label="Select country calling code"
                          aria-haspopup="listbox"
                          aria-expanded={false}
                          onClick={() => {
                            setCountryPickerOpen(true);
                            setCountrySearch("");
                            requestAnimationFrame(() => countrySearchRef.current?.focus());
                          }}
                          className={`relative flex h-14 w-full cursor-pointer items-center gap-2 rounded-xl border py-3 pl-4 pr-10 text-xs font-medium outline-none transition-colors ${fieldErrors.country ? "border-red-400" : "border-primary/0"} bg-secondary/60 text-white focus:border-primary/70 focus:bg-[#12251a]`}
                        >
                          <span className={`pointer-events-none absolute left-4 right-10 z-10 truncate text-left leading-none transition-all ${selectedCountryId ? "top-2 text-xs font-medium tracking-wider text-primary/40" : "top-1/2 -translate-y-1/2 text-base font-medium tracking-wide text-primary/40"}`}>
                            Country Code
                          </span>
                          {selectedCountryId && (
                            <span className="mt-3 truncate text-left text-base font-medium tracking-wide text-white">
                              {countryOptions.find((country) => country.id === selectedCountryId)?.shortName} ({countryCode})
                            </span>
                          )}
                          <ChevronDown aria-hidden="true" size={16} strokeWidth={1.8} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition-transform" />
                        </button>
                      )}
                      {countryPickerOpen && (
                        <div className="absolute left-0 top-full z-40 mt-2 w-[min(22rem,calc(100vw-3rem))] rounded-xl border border-primary/15 bg-[#08100b] p-2 shadow-xl shadow-black/40">
                          <div
                            ref={countryListRef}
                            id="country-code-options"
                            role="listbox"
                            data-country-scroll
                            data-lenis-prevent
                            className="max-h-50 overflow-y-auto overscroll-contain"
                          >
                            {filteredCountryOptions.map(({ id, code, displayName }) => (
                              <button
                                key={id}
                                type="button"
                                role="option"
                                aria-selected={selectedCountryId === id}
                                data-country-option
                                onClick={() => {
                                  setSelectedCountryId(id);
                                  setCountryCode(code);
                                  setCountryPickerOpen(false);
                                  setCountrySearch("");
                                  clearFieldError("country", true);
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Escape") setCountryPickerOpen(false);
                                  if (event.key === "ArrowDown") {
                                    event.preventDefault();
                                    (event.currentTarget.nextElementSibling as HTMLButtonElement | null)?.focus();
                                  }
                                  if (event.key === "ArrowUp") {
                                    event.preventDefault();
                                    const previous = event.currentTarget.previousElementSibling as HTMLButtonElement | null;
                                    if (previous) previous.focus();
                                    else countrySearchRef.current?.focus();
                                  }
                                }}
                                className="flex min-h-10 w-full cursor-pointer items-center justify-between rounded-lg px-3 text-left text-base font-medium tracking-wide text-white transition hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none"
                              >
                                <span>{displayName}</span>
                                <span className="text-primary">{code}</span>
                              </button>
                            ))}
                            {filteredCountryOptions.length === 0 && (
                              <p className="px-3 py-3 text-sm text-white/55">
                                {countryListLoading ? "Loading countries…" : "No matching countries found."}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative min-w-0 flex-1">
                      <input required type="tel" name="phone" aria-label="Mobile Number" autoComplete="tel-national" placeholder="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.phone)} style={fieldErrors.phone ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("phone", event.currentTarget.checkValidity())} />
                      <span className={floatingLabelClassName}>Mobile Number</span>
                    </div>
                  </div>
                  {fieldErrors.country && <span role="alert" className="mt-1 block text-sm font-semibold tracking-wide text-red-400">{fieldErrors.country}</span>}
                  {fieldErrors.phone && <span role="alert" className="mt-1 block text-sm font-semibold tracking-wide text-red-400">{fieldErrors.phone}</span>}
                </div>
              </div>
              <label className="relative mt-3 block">
                <textarea
                  required
                  name="project"
                  placeholder=" "
                  rows={2}
                  className="peer min-h-28 w-full resize-y rounded-xl border border-primary/0 bg-secondary/60 px-4 pb-3 pt-5 text-base font-medium tracking-wide text-white outline-none transition-colors placeholder:text-transparent focus:border-primary/70 focus:bg-[#12251a]"
                  aria-invalid={Boolean(fieldErrors.project)}
                  style={fieldErrors.project ? { borderColor: "#f87171" } : undefined}
                  onChange={(event) => clearFieldError("project", event.currentTarget.value.trim().length > 0)}
                />
                <span className="pointer-events-none absolute left-4 top-2 z-10 text-xs font-medium leading-none tracking-wide text-primary/40 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-primary/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                  About The Project
                </span>
                {fieldErrors.project && <span role="alert" className="mt-1 block text-sm font-semibold tracking-wide text-red-400">{fieldErrors.project}</span>}
              </label>
              <p aria-live="polite" className="min-h-5 text-sm font-medium text-white/70">{submitMessage}</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-5 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary/80 px-5 text-[20px] font-semibold text-secondary transition hover:bg-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                {!isSubmitting && <Send size={17} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
              </button>
              <div className="mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40" aria-hidden="true">
                <span className="h-px flex-1 bg-white/10" />
                <span>Or</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a href="mailto:hello@relvodev.com" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] px-5 text-sm font-semibold text-white/85 transition hover:border-primary/70 hover:bg-primary/[0.14] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base">
                  <Mail size={18} strokeWidth={2.2} className="text-primary" /> Email us
                </a>
                <a href="tel:+8801410485824" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] px-5 text-sm font-semibold text-white/85 transition hover:border-primary/70 hover:bg-primary/[0.14] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base">
                  <PhoneCall size={18} strokeWidth={2.2} className="text-primary" /> Call us
                </a>
              </div>
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
            <p id="contact-validation-description" className="mt-2 text-lg font-medium leading-relaxed tracking-wide text-white/80">
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

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedServices: string[];
};

export default function ContactModal({
  isOpen,
  onClose,
  initialSelectedServices,
}: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => previouslyFocused?.focus());
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          data-lenis-prevent
          className="fixed inset-0 z-[120] overflow-x-hidden overflow-y-auto overscroll-contain bg-[#020807]/80 backdrop-blur-md"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgb(187 255 0 / 10%) 0.7px, transparent 1px), linear-gradient(rgb(187 255 0 / 3%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 3%) 1px, transparent 1px)",
              backgroundSize: "8px 8px, 8px 8px, 8px 8px",
              maskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none fixed -left-48 top-[12%] size-[34rem] rounded-full bg-primary/[0.1] blur-[120px]" />
          <div aria-hidden="true" className="pointer-events-none fixed -right-40 bottom-[-8%] size-[32rem] rounded-full bg-primary/[0.08] blur-[120px]" />
          <div
            className="relative z-10 flex min-h-svh w-full items-center justify-center p-3 sm:p-6 lg:p-8"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[960px]"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close contact form"
                className="fixed right-4 top-4 z-[130] grid size-11 cursor-pointer place-items-center rounded-full border border-red-200 bg-[#081111]/90 text-white/80 shadow-lg backdrop-blur transition-colors hover:border-red-400 hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-6 sm:top-6 sm:size-[50px]"
              >
                <X size={21} strokeWidth={2} />
              </button>
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.99 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="flex w-full items-center justify-center">
                  <ContactForm isModal initialSelectedServices={initialSelectedServices} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
