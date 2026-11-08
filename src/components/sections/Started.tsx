"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, ChevronDown, Mail, Phone, Send, Sparkles } from "lucide-react";
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
  "peer h-14 w-full rounded-xl border border-primary/10 bg-[#101b15] px-4 pb-1 pt-4 text-base font-medium tracking-wide text-white outline-none transition-colors placeholder:text-transparent focus:border-primary/70 focus:bg-[#12251a]";
const floatingLabelClassName =
  "pointer-events-none absolute left-4 top-2 z-10 text-xs font-medium leading-none tracking-wider text-primary/40 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-primary/40 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary";

function ContactForm({
  initialSelectedServices = EMPTY_SERVICE_SELECTION,
}: {
  initialSelectedServices?: string[];
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
        // Keep the bundled country list available if the API cannot be reached.
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
    const section = sectionRef.current;
    if (!section) return;

    let isHolding = false;
    let heldScroll = 0;
    let canHoldAgain = true;
    // Consume about one wheel-step equivalent after the section is reached.
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

              <fieldset className="mb-5">
                <label className="mb-2 block text-md font-medium tracking-wide text-white/70 capitalize">
                  Interested In
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
                        className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold tracking-wide transition cursor-pointer sm:text-[15px] ${
                          selected
                            ? "border-primary/70 bg-primary text-secondary"
                            : "border-primary/20 bg-primary/[0.06] text-white/85 hover:border-primary/60 hover:bg-primary/[0.12] hover:text-white"
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
                {fieldErrors.services && <p role="alert" className="mt-2 text-xs font-medium text-red-400">{fieldErrors.services}</p>}
              </fieldset>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="relative block">
                  <input required name="name" autoComplete="name" placeholder="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.name)} style={fieldErrors.name ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("name", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Your Name</span>
                  {fieldErrors.name && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.name}</span>}
                </label>
                <label className="relative block">
                  <input required type="email" name="email" autoComplete="email" placeholder="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.email)} style={fieldErrors.email ? { borderColor: "#f87171" } : undefined} onChange={(event) => clearFieldError("email", event.currentTarget.checkValidity())} />
                  <span className={floatingLabelClassName}>Email Address</span>
                  {fieldErrors.email && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.email}</span>}
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
                          className={`h-14 w-full rounded-xl border bg-[#101b15] px-4 text-base font-medium tracking-wide text-white outline-none placeholder:text-white/45 transition-colors ${fieldErrors.country ? "border-red-400" : "border-primary/10"} focus:border-primary/70 focus:bg-[#12251a]`}
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
                          className={`relative flex h-14 w-full cursor-pointer items-center gap-2 rounded-xl border py-3 pl-4 pr-10 text-base font-medium outline-none transition-colors ${fieldErrors.country ? "border-red-400" : "border-primary/10"} bg-[#101b15] text-white focus:border-primary/70 focus:bg-[#12251a]`}
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
                  {fieldErrors.country && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.country}</span>}
                  {fieldErrors.phone && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.phone}</span>}
                </div>
              </div>
              <label className="relative mt-3 block">
                <textarea
                  required
                  name="project"
                  placeholder=" "
                  rows={2}
                  className="peer min-h-28 w-full resize-y rounded-xl border border-primary/10 bg-[#101b15] px-4 pb-3 pt-5 text-base font-medium tracking-wide text-white outline-none transition-colors placeholder:text-transparent focus:border-primary/70 focus:bg-[#12251a]"
                  aria-invalid={Boolean(fieldErrors.project)}
                  style={fieldErrors.project ? { borderColor: "#f87171" } : undefined}
                  onChange={(event) => clearFieldError("project", event.currentTarget.value.trim().length > 0)}
                />
                <span className="pointer-events-none absolute left-4 top-2 z-10 text-xs font-medium leading-none tracking-wide text-primary/40 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-primary/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                  About The Project
                </span>
                {fieldErrors.project && <span role="alert" className="mt-1 block text-xs font-medium text-red-400">{fieldErrors.project}</span>}
              </label>
              <p aria-live="polite" className="min-h-4 text-sm text-[#555]">{submitMessage}</p>
              <button
                type="submit"
                className="group mt-5 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-semibold text-secondary transition hover:bg-[#9ed900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
              >
                Send Message
                <Send size={17} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
