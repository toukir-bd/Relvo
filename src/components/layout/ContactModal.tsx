"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Started from "@/components/sections/Started";

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
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

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
  }, [isOpen, onClose]);

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
            className="pointer-events-none fixed inset-0 opacity-65"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgb(187 255 0 / 17%) 0.7px, transparent 1px), linear-gradient(rgb(187 255 0 / 2%) 1px, transparent 1px), linear-gradient(90deg, rgb(187 255 0 / 2%) 1px, transparent 1px)",
              backgroundSize: "18px 18px, 52px 52px, 52px 52px",
              maskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none fixed -left-48 top-[12%] size-[34rem] rounded-full bg-primary/[0.1] blur-[120px]" />
          <div aria-hidden="true" className="pointer-events-none fixed -right-40 bottom-[-8%] size-[32rem] rounded-full bg-primary/[0.08] blur-[120px]" />
          <div
            className="relative z-10 flex min-h-svh w-full items-center justify-center p-3 sm:p-6 lg:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[960px]"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close contact form"
                className="absolute right-8 top-8 z-50 grid size-11 cursor-pointer place-items-center rounded-full border border-red-200 bg-[#081111]/90 text-white/80 shadow-lg backdrop-blur transition-colors hover:border-red-400 hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-[50px]"
              >
                <X size={21} strokeWidth={2} />
              </button>
              <div className="flex w-full items-center justify-center">
                <Started isModal initialSelectedServices={initialSelectedServices} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
