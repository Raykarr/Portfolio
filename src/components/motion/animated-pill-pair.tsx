"use client";

import { animate } from "animejs";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedPillPairProps = {
  items: readonly string[];
  className?: string;
};

export function AnimatedPillPair({ items, className }: AnimatedPillPairProps) {
  const [index, setIndex] = useState(0);
  const pairRef = useRef<HTMLDivElement | null>(null);
  const visibleItems = useMemo(() => {
    if (items.length <= 2) {
      return items;
    }

    return [items[index], items[(index + 1) % items.length]];
  }, [index, items]);

  useEffect(() => {
    if (items.length <= 2) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 2) % items.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const element = pairRef.current;

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
      translateY: [12, 0],
      filter: ["blur(8px)", "blur(0px)"],
      delay: (_target: unknown, itemIndex: number) => itemIndex * 70,
      duration: 520,
      easing: "cubicBezier(.16, 1, .3, 1)"
    });
  }, [visibleItems]);

  return (
    <div
      ref={pairRef}
      className={cn("mt-5 grid gap-2 sm:grid-cols-2", className)}
    >
      {visibleItems.map((item) => (
        <span
          className="relative overflow-hidden rounded-full border border-white/14 bg-white/[0.065] px-4 py-2 text-sm text-white/78 shadow-inner shadow-white/10 backdrop-blur-xl ring-1 ring-white/[0.035] before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-white/40"
          key={`${index}-${item}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
