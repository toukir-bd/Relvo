"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Stage = "logo" | "doors" | "done";

export default function DoorLoader() {
  const pathname = usePathname();
  const isAosRoute = pathname === "/aos" || pathname.startsWith("/aos/");
  const [stage, setStage] = useState<Stage>(isAosRoute ? "done" : "logo");

  useEffect(() => {
    if (isAosRoute) return;
    const openDoors = window.setTimeout(() => {
      setStage("doors");
    }, 400);

    const finishLoader = window.setTimeout(() => {
      setStage("done");
    }, 1050);

    return () => {
      window.clearTimeout(openDoors);
      window.clearTimeout(finishLoader);
    };
  }, [isAosRoute]);

  useEffect(() => {
    if (stage === "done" || isAosRoute) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAosRoute, stage]);

  if (stage === "done" || isAosRoute) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      {/* Left door */}
      <div
        className={[
          "door-panel absolute inset-y-0 left-0 w-1/2",
          "bg-secondary",
          stage === "doors" ? "door-left-open" : "",
        ].join(" ")}
      />

      {/* Right door */}
      <div
        className={[
          "door-panel absolute inset-y-0 right-0 w-1/2",
          "bg-secondary",
          stage === "doors" ? "door-right-open" : "",
        ].join(" ")}
      />

      {/* Logo */}
      <div
        className={[
            "absolute inset-0 z-30 flex items-center justify-center",
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            stage === "doors"
            ? "scale-[0.92] opacity-0"
            : "scale-100 opacity-100",
        ].join(" ")}
        >
        <div className="relative aspect-[48/13] w-[clamp(130px,16vw,240px)]">
          <Image
            src="/img/elements/logo.webp"
            alt="Relvo"
            fill
            sizes="(max-width: 768px) 16vw, 240px"
            priority
            className="door-logo object-contain"
          />
        </div>
        </div>
    </div>
  );
}
