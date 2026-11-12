"use client";

import type { MouseEvent, ReactNode } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

export default function AboutStudioLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollTo } = useSmoothScroll();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById("studio");
    if (!target) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#studio`);
    scrollTo(window.scrollY + target.getBoundingClientRect().top, false, 1.5);
  }

  return (
    <a href="#studio" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
