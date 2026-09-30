"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

export default function CursorTrail({ count = 6 }) {
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  /*
   * One extra invisible point follows the cursor.
   * Visible dots begin after it.
   */
  const points = useRef<Point[]>(
    Array.from({ length: count + 1 }, () => ({
      x: 0,
      y: 0,
    })),
  );

  const target = useRef<Point>({
    x: 0,
    y: 0,
  });

  const lastMoveTime = useRef(0);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const hideDots = () => {
      dots.current.forEach((dot) => {
        if (dot) dot.style.opacity = "0";
      });
    };

    const animate = () => {
      const timeSinceLastMove =
        performance.now() - lastMoveTime.current;

      /*
       * Cursor stopped: hide all dots and stop RAF.
       */
      if (timeSinceLastMove > 90) {
        hideDots();
        frameId.current = null;
        return;
      }

      let lead = target.current;

      points.current.forEach((point, index) => {
        /*
         * Higher values keep all dots closer together.
         */
        const speed = index === 0 ? 0.48 : 0.36;

        point.x += (lead.x - point.x) * speed;
        point.y += (lead.y - point.y) * speed;

        /*
         * index 0 is the invisible cursor leader.
         * It will never show as a ball.
         */
        if (index > 0) {
          const dotIndex = index - 1;
          const dot = dots.current[dotIndex];

          if (dot) {
            const scale = 1 - dotIndex * 0.09;

            dot.style.transform = `
              translate3d(${point.x}px, ${point.y}px, 0)
              translate(-50%, -50%)
              scale(${scale})
            `;

            dot.style.opacity = String(
              Math.max(0.2, 0.9 - dotIndex * 0.11),
            );
          }
        }

        lead = point;
      });

      frameId.current = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = {
        x: event.clientX,
        y: event.clientY,
      };

      lastMoveTime.current = performance.now();

      /*
       * Animation starts only when the cursor moves.
       */
      if (frameId.current === null) {
        frameId.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          ref={(element) => {
            dots.current[index] = element;
          }}
          className={[
            "absolute left-0 top-0 h-2.5 w-2.5 rounded-full",
            "bg-primary transition-opacity duration-200",
            "will-change-transform",
            index === 0
              ? "shadow-[0_0_16px_rgba(187,255,0,0.85)]"
              : "shadow-[0_0_10px_rgba(187,255,0,0.5)]",
          ].join(" ")}
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
}