"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedKeywordCloud({
  items,
  className
}: {
  items: readonly string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    animate(element.children, {
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.96, 1],
      delay: (_target: unknown, index: number) => index * 60,
      duration: 720,
      easing: "cubicBezier(.16, 1, .3, 1)"
    });

    const pulse = animate(element.children, {
      translateY: [
        { to: -3, duration: 1400 },
        { to: 0, duration: 1400 }
      ],
      delay: (_target: unknown, index: number) => index * 120,
      loop: true,
      easing: "inOutSine"
    });

    return () => {
      pulse.cancel();
    };
  }, []);

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item) => (
        <span
          className="rounded-full border border-emerald-200/18 bg-emerald-300/[0.055] px-4 py-2 text-sm font-semibold text-emerald-50/86 shadow-inner shadow-white/10 backdrop-blur-xl ring-1 ring-white/[0.035]"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
