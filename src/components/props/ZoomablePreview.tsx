"use client";

import Image from "next/image";
import { Expand, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

type ZoomablePreviewProps = {
  src: string;
  alt: string;
  title: string;
  description?: string;
  badge?: string;
  triggerClassName?: string;
};

export default function ZoomablePreview({
  src,
  alt,
  title,
  description,
  triggerClassName = "",
}: ZoomablePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closePreview = useCallback(() => {
    setIsOpen(false);
    setIsDescriptionExpanded(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePreview]);

  const lightbox =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[9999] bg-[#050b09]/95 p-3 backdrop-blur-xl sm:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) closePreview();
            }}
          >
            <div role="dialog" aria-modal="true" aria-labelledby="zoomed-preview-title" className="relative mx-auto h-full w-full max-w-[1800px]">
              <div className="absolute inset-0 rounded-2xl bg-secondary"/>
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
              </div>
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-end gap-4">
                  <button ref={closeButtonRef} type="button" onClick={closePreview} aria-label="Close fullscreen preview"
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:border-red-200 hover:bg-black/40 hover:text-red-600"
                  >
                    <X className="h-7 w-7"/>
                  </button>
                </div>
                <div className="max-w-4xl mx-auto text-center w-full bg-gradient-to-t from-secondary via-secondary to-transparent p-6 pt-20">
                  <h2 id="zoomed-preview-title" className="text-3xl font-semibold text-white sm:text-5xl">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-3 text-[16px] font-[500] leading-relaxed text-white sm:text-medium tracking-wide sm:mt-4 sm:text-[18px] sm:leading-relaxed">
                      {(() => {
                        const words = description.trim().split(/\s+/);
                        const previewWordCount = 12;
                        const shouldTruncate = words.length > previewWordCount;
                        return (
                          <>
                            {shouldTruncate && !isDescriptionExpanded
                              ? `${words.slice(0, previewWordCount).join(" ")}… `
                              : description}
                            {shouldTruncate && (
                              <button
                                type="button"
                                onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
                                aria-expanded={isDescriptionExpanded}
                                className="ml-1 cursor-pointer font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                              >
                                {isDescriptionExpanded ? "Hide details" : "See more"}
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`View ${title} fullscreen`}
        className={`flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary/40 text-white 
        backdrop-blur-sm transition hover:bg-secondary/60 hover:text-primary sm:h-16 sm:w-16 ${triggerClassName}`}
      >
        <Expand className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>

      {lightbox}
    </>
  );
}
