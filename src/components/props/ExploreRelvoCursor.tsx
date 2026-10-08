"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";

type ExploreRelvoCursorProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export default function ExploreRelvoCursor({
  children,
  className = "relative",
  href = "/about",
}: ExploreRelvoCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const bounds = containerRef.current?.getBoundingClientRect();
    const link = linkRef.current;

    if (!bounds || !link) return;

    link.style.left = `${event.clientX - bounds.left}px`;
    link.style.top = `${event.clientY - bounds.top}px`;
  };

  return (
    <div
      ref={containerRef}
      className={[
        className,
        isHovering ? "!cursor-none [&_*]:!cursor-none" : "",
      ].join(" ")}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {children}

      <Link
        ref={linkRef}
        href={href}
        aria-label="Explore Relvo"
        className={[
          "absolute left-1/2 top-1/2 z-[60]",
          "flex h-32 w-32 -translate-x-1/2 -translate-y-1/2",
          "flex-col items-center justify-center gap-1 rounded-full",
          "bg-primary text-sm font-semibold text-secondary",
          "shadow-[0_0_50px_rgba(187,255,0,0.25)]",
          "transition-[opacity,transform,background-color] duration-300",
          "hover:bg-white focus-visible:scale-100 focus-visible:opacity-100",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40",
          isHovering
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-50 opacity-0",
        ].join(" ")}
        style={{ left: "50%", top: "50%" }}
      >
        <span>Explore Relvo</span>
        <ArrowUpRight className="h-5 w-5" strokeWidth={1.7} />
      </Link>
    </div>
  );
}