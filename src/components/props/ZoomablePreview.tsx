"use client";

import { Expand, X, ZoomOut } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

type ZoomablePreviewProps = {
  src: string;
  alt: string;
  triggerClassName?: string;
};

export default function ZoomablePreview({
  src,
  alt,
  triggerClassName = "",
}: ZoomablePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActualSize, setIsActualSize] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  const closePreview = useCallback(() => {
    setIsOpen(false);
    setIsActualSize(false);
    setIsDragging(false);
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

  useEffect(() => {
    if (!isActualSize) return;
    const frame = window.requestAnimationFrame(() => {
      const stage = stageRef.current;
      if (!stage) return;
      stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
      stage.scrollTop = Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isActualSize, originalSize]);

  const lightbox =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[9999] bg-secondary/95"
            onClick={(event) => {
              if (event.target === event.currentTarget) closePreview();
            }}
          >
            <div role="dialog" aria-modal="true" aria-label={`Image preview: ${alt}`} className="relative mx-auto h-full w-full max-w-full">
              <div className="absolute inset-0 bg-secondary"/>
              <div
                ref={stageRef}
                className={`zoomable-preview-stage absolute inset-0 overflow-auto ${isActualSize ? isDragging ? "cursor-grabbing" : "cursor-grab" : ""}`}
                style={{ touchAction: isActualSize ? "none" : "auto" }}
                onPointerDown={(event) => {
                  if (!isActualSize || !stageRef.current) return;
                  event.preventDefault();
                  dragStartRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                    left: stageRef.current.scrollLeft,
                    top: stageRef.current.scrollTop,
                  };
                  stageRef.current.setPointerCapture(event.pointerId);
                  setIsDragging(true);
                }}
                onPointerMove={(event) => {
                  const start = dragStartRef.current;
                  const stage = stageRef.current;
                  if (!start || !stage) return;
                  stage.scrollLeft = start.left - (event.clientX - start.x);
                  stage.scrollTop = start.top - (event.clientY - start.y);
                }}
                onPointerUp={() => {
                  dragStartRef.current = null;
                  setIsDragging(false);
                }}
                onPointerCancel={() => {
                  dragStartRef.current = null;
                  setIsDragging(false);
                }}
              >
                <div
                  className={isActualSize && originalSize ? "relative flex-none" : "absolute inset-0"}
                  style={isActualSize && originalSize ? { width: originalSize.width, height: originalSize.height } : undefined}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    priority
                    sizes="100vw"
                    className={`object-contain ${isActualSize ? isDragging ? "cursor-grabbing" : "cursor-grab" : "cursor-zoom-in"}`}
                    onLoad={(event) => {
                      const image = event.currentTarget;
                      setOriginalSize({ width: image.naturalWidth, height: image.naturalHeight });
                    }}
                    role={isActualSize ? undefined : "button"}
                    tabIndex={isActualSize ? undefined : 0}
                    aria-label={isActualSize ? undefined : "Show image at actual size"}
                    onClick={() => {
                      if (!isActualSize) setIsActualSize(true);
                    }}
                    onKeyDown={(event) => {
                      if (!isActualSize && (event.key === "Enter" || event.key === " ")) {
                        event.preventDefault();
                        setIsActualSize(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="absolute right-3 top-3 z-10 flex items-center gap-2 sm:right-4 sm:top-4">
                {isActualSize && (
                  <button type="button" onClick={() => setIsActualSize(false)} aria-label="Zoom out to preview"
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition 
                    hover:border-primary/50 hover:text-primary sm:h-12 sm:w-12">
                    <ZoomOut className="h-5 w-5" />
                  </button>
                )}
                <button ref={closeButtonRef} type="button" onClick={closePreview} aria-label="Close fullscreen preview"
                  className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition 
                  hover:border-red-200 hover:bg-black/40 hover:text-red-600 sm:h-12 sm:w-12">
                  <X className="h-6 w-6"/>
                </button>
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
        aria-label={`View ${alt} at original size`}
        className={`flex h-12 w-12 shrink-0 cursor-zoom-in items-center justify-center rounded-full bg-secondary/40 text-white
        backdrop-blur-sm transition hover:bg-secondary/60 hover:text-primary sm:h-16 sm:w-16 ${triggerClassName}`}
      >
        <Expand className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>

      {lightbox}
    </>
  );
}
