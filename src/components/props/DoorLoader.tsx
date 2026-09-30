"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Stage = "logo" | "doors" | "done";

export default function DoorLoader() {
  const [stage, setStage] = useState<Stage>("logo");

  useEffect(() => {
    const openDoors = window.setTimeout(() => {
      setStage("doors");
    }, 1800);

    const finishLoader = window.setTimeout(() => {
      setStage("done");
    }, 3100);

    return () => {
      window.clearTimeout(openDoors);
      window.clearTimeout(finishLoader);
    };
  }, []);

  useEffect(() => {
    if (stage === "done") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [stage]);

  if (stage === "done") return null;

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
            "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            stage === "doors"
            ? "scale-[0.92] opacity-0"
            : "scale-100 opacity-100",
        ].join(" ")}
        >
        <Image
            src="/img/elements/logo.webp"
            alt="Relvo"
            width={220}
            height={220}
            priority
            className="door-logo h-auto w-[clamp(130px,16vw,240px)]"
        />
        </div>
    </div>
  );
}