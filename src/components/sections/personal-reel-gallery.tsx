"use client";

import { animate } from "animejs";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { personalReelCollections } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type ReelCollection = (typeof personalReelCollections)[number];

const accentClasses = {
  emerald: "from-emerald-300/40 via-emerald-300/10 to-transparent",
  lime: "from-lime-300/40 via-lime-300/10 to-transparent",
  cyan: "from-cyan-300/40 via-cyan-300/10 to-transparent"
} as const;

export function PersonalReelGallery({
  collections
}: {
  collections: readonly ReelCollection[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCollection = collections[activeIndex];
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = panelRef.current;

    if (!element) {
      return;
    }

    animate(element, {
      opacity: [0.35, 1],
      translateY: [18, 0],
      scale: [0.985, 1],
      duration: 620,
      easing: "cubicBezier(.16, 1, .3, 1)"
    });
  }, [activeIndex]);

  if (!activeCollection) {
    return null;
  }

  const [primaryReel, secondaryReel] = activeCollection.reels;
  const activeReels = [primaryReel, secondaryReel].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 grid gap-3 md:grid-cols-5">
        {collections.map((collection, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              className={cn(
                "group relative min-h-36 overflow-hidden border p-4 text-left backdrop-blur-xl ring-1 ring-white/[0.035] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.055]",
                isActive
                  ? "border-white/34 bg-white/[0.055] shadow-2xl shadow-black/35"
                  : "border-white/12 bg-white/[0.028]"
              )}
              key={collection.title}
              onClick={() => setActiveIndex(index)}
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 1.25rem) 0, 100% 1.25rem, 100% 100%, 0 100%)"
              }}
              type="button"
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-gradient-to-r",
                  accentClasses[collection.accent]
                )}
              />
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-white/38">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-serif text-3xl font-medium leading-none tracking-[-0.05em] text-white">
                {collection.title}
              </h3>
              <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]/80">
                <span>{collection.reels.length} Reels</span>
                <ArrowUpRight
                  className={cn(
                    "size-4 transition",
                    isActive ? "text-white" : "text-white/34"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        className="relative overflow-hidden border border-white/14 bg-black/42 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/[0.035]"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 1.8rem) 0, 100% 1.8rem, 100% 100%, 1.8rem 100%, 0 calc(100% - 1.8rem))"
        }}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-px bg-gradient-to-r",
            accentClasses[activeCollection.accent]
          )}
        />
        <div className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.42em] text-[var(--gold)]">
              Active Collection
            </p>
            <h3 className="mt-3 font-serif text-5xl font-medium leading-none tracking-[-0.06em] text-white">
              {activeCollection.title}
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/66">
            {activeCollection.description}
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {activeReels.map((reel, index) => (
            <div
              className="overflow-hidden border border-white/14 bg-black/70 shadow-2xl shadow-black/30 ring-1 ring-white/[0.035]"
              key={reel.href}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.32em] text-white/42">
                  Reel 0{index + 1}
                </p>
                <a
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)] transition hover:text-white"
                  href={reel.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
              <iframe
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                className="h-[42rem] w-full bg-black"
                loading="lazy"
                src={reel.embed}
                title={`${activeCollection.title} reel ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
