"use client";

import { animate } from "animejs";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { featuredIps, personalChannels } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type ShowcaseItem =
  | (typeof featuredIps)[number]
  | (typeof personalChannels)[number];

const accentClasses = {
  emerald: "from-emerald-400/42 via-emerald-300/8 to-transparent",
  lime: "from-lime-400/50 via-lime-300/10 to-transparent",
  cyan: "from-cyan-400/46 via-cyan-300/10 to-transparent"
} as const;

export function InteractiveIpShowcase({
  items
}: {
  items: readonly ShowcaseItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const imageRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [imageRef.current, panelRef.current].filter(Boolean);

    if (!targets.length) {
      return;
    }

    animate(targets, {
      opacity: [0.35, 1],
      translateY: [18, 0],
      scale: [0.985, 1],
      duration: 620,
      easing: "cubicBezier(.16, 1, .3, 1)"
    });
  }, [activeIndex]);

  if (!activeItem) {
    return null;
  }

  const activeReelEmbed =
    "reelEmbed" in activeItem ? activeItem.reelEmbed : undefined;
  const hasAnyReels = items.some(
    (item) => "reelEmbed" in item && Boolean(item.reelEmbed)
  );

  return (
    <div
      className={cn(
        "mx-auto grid gap-4",
        hasAnyReels
          ? "max-w-7xl lg:grid-cols-[1fr_0.68fr_0.72fr]"
          : "max-w-6xl lg:grid-cols-[1.08fr_0.92fr]"
      )}
    >
      <div
        ref={imageRef}
        className="relative min-h-[34rem] overflow-hidden border border-white/14 bg-black/35 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/[0.035]"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))"
        }}
      >
        <div className="absolute right-6 top-6 z-20 hidden items-center gap-3 rounded-full border border-white/14 bg-black/48 px-4 py-3 backdrop-blur-xl sm:flex">
          {items.map((item) => (
            <Image
              alt={`${item.title} logo`}
              className={cn(
                "size-10 border object-cover transition duration-300",
                item.title === activeItem.title
                  ? "scale-110 border-white/70 opacity-100"
                  : "border-white/18 opacity-48"
              )}
              height={40}
              key={item.title}
              src={item.companyLogo}
              width={40}
            />
          ))}
        </div>
        <Image
          alt={`${activeItem.title} channel preview`}
          className="h-full w-full object-contain p-4 opacity-94 brightness-110 contrast-110 saturate-125"
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 48vw, 100vw"
          src={activeItem.image}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-tr",
            accentClasses[activeItem.color]
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/28 to-black/12" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Image
                  alt={`${activeItem.title} logo`}
                  className="size-12 border border-white/20 bg-white object-contain p-2"
                  height={48}
                  src={activeItem.companyLogo}
                  width={48}
                />
                <div>
                  <h3 className="font-serif text-4xl font-medium leading-none tracking-[-0.05em] text-white sm:text-5xl">
                    {activeItem.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.34em] text-white/60">
                    {activeItem.brand}
                  </p>
                </div>
              </div>
              <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                {activeItem.summary}
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              {activeItem.links.map((link) => (
                <a
                  className="grid size-11 place-items-center border border-white/18 bg-white text-black transition hover:bg-[var(--gold)]"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                  title={link.label}
                >
                  <ExternalLink className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={panelRef} className="grid gap-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              className={cn(
                "group relative overflow-hidden border p-4 text-left transition duration-300",
                "bg-white/[0.03] backdrop-blur-xl ring-1 ring-white/[0.035] hover:-translate-y-1 hover:bg-white/[0.055]",
                isActive
                  ? "border-white/34 shadow-2xl shadow-cyan-950/30"
                  : "border-white/10"
              )}
              key={item.title}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                  return;
                }

                event.preventDefault();
                setActiveIndex(index);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              role="button"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 1.25rem) 0, 100% 1.25rem, 100% 100%, 0 100%)"
              }}
              tabIndex={0}
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-gradient-to-r",
                  accentClasses[item.color]
                )}
              />
              <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                <div className="grid h-24 place-items-center border border-white/10 bg-black/60">
                  <Image
                    alt={`${item.title} logo`}
                    className={cn(
                      "size-14 bg-white object-contain p-2 transition duration-500 group-hover:scale-110",
                      isActive ? "opacity-100" : "opacity-70"
                    )}
                    height={56}
                    sizes="96px"
                    src={item.companyLogo}
                    width={56}
                  />
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl font-medium leading-none tracking-[-0.04em] text-white">
                        {item.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "size-4 transition",
                        isActive ? "text-white" : "text-white/32"
                      )}
                    />
                  </div>
                  <div className="mt-5 grid gap-2">
                    {item.stats.slice(0, 2).map((stat) => (
                      <span
                        className="border-l border-white/22 bg-black/24 px-3 py-2 text-xs font-semibold text-white/76"
                        key={stat}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="grid gap-2 border border-white/12 bg-white/[0.03] p-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/54 backdrop-blur-xl ring-1 ring-white/[0.035] sm:grid-cols-3">
          {activeItem.stats.map((stat) => (
            <span className="border-l border-white/18 pl-3" key={stat}>
              {stat}
            </span>
          ))}
        </div>
      </div>

      {hasAnyReels ? (
        <div
          className="relative min-h-[34rem] overflow-hidden border border-white/14 bg-black/50 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/[0.035]"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 1.5rem) 0, 100% 1.5rem, 100% 100%, 0 100%)"
          }}
        >
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-px bg-gradient-to-r",
              accentClasses[activeItem.color]
            )}
          />
          <div className="border-b border-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-white/42">
              Active Reel
            </p>
            <h3 className="mt-2 font-serif text-3xl font-medium tracking-[-0.05em] text-white">
              {activeItem.title}
            </h3>
          </div>
          {activeReelEmbed ? (
            <iframe
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              className="h-[30rem] w-full bg-black"
              loading="lazy"
              src={activeReelEmbed}
              title={`${activeItem.title} Instagram reel`}
            />
          ) : (
            <div className="grid h-[30rem] place-items-center px-6 text-center text-sm text-white/58">
              Reel preview unavailable for this channel.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
