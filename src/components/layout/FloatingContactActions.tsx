import { CalendarDays } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContactActions() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
      <a
        href="https://calendly.com/hello-relvodev/30min"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a meeting"
        className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/75 p-1.5 pl-4 text-sm font-medium text-white backdrop-blur-[10px] transition hover:bg-secondary sm:pl-5 sm:text-base"
      >
        <span>Book a Meeting</span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 sm:size-12">
          <CalendarDays className="size-5 text-primary" />
        </span>
      </a>
      <a
        href="https://wa.me/8801410485824"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to an expert on WhatsApp"
        className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/75 p-1.5 pl-4 text-sm font-medium text-white backdrop-blur-[10px] transition hover:bg-secondary sm:pl-5 sm:text-base"
      >
        <span>Talk to an Expert</span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 sm:size-12">
          <FaWhatsapp className="size-6 text-[#27D367]" />
        </span>
      </a>
    </div>
  );
}
