import { CalendarDays } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContactActions() {
  return (
    <div className="fixed bottom-4 right-4 z-20 flex flex-row items-end justify-end gap-2 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 lg:flex-col">
      <a
        href="https://calendly.com/hello-relvodev/30min"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a meeting"
        className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/70 p-1.5 text-sm font-medium text-white backdrop-blur-[10px] transition hover:text-primary sm:ps-4 lg:ps-7"
      >
        <span className="hidden text-base font-normal tracking-wide md:inline lg:text-[18px]">Book a Meeting</span>
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary sm:h-12 sm:w-12">
          <CalendarDays className="h-5 w-5 text-primary" />
        </span>
      </a>
      <a
        href="https://wa.me/8801410485824"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to an expert on WhatsApp"
        className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/70 p-1.5 text-sm font-medium text-white backdrop-blur-[10px] transition hover:text-primary sm:ps-4 lg:ps-7"
      >
        <span className="hidden text-base font-normal tracking-wide md:inline lg:text-[18px]">Talk to an Expert</span>
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary sm:h-12 sm:w-12">
          <FaWhatsapp className="h-6 w-6 text-[#27D367]" />
        </span>
      </a>
    </div>
  );
}
