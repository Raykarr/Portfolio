import type { ReactNode } from "react";
import { ArrowUpRight, CodeXml, ExternalLink, Globe2, Mail } from "lucide-react";
import Image from "next/image";
import { AnimatedPillPair } from "@/components/motion/animated-pill-pair";
import { Reveal } from "@/components/motion/reveal";
import { InteractiveIpShowcase } from "@/components/sections/interactive-ip-showcase";
import {
  about,
  creativeFormats,
  currentInterests,
  experience,
  featuredIps,
  featuredWorkTitle,
  finalCta,
  footerText,
  hero,
  heroChannels,
  heroMetrics,
  personalChannels,
  profileLinks,
  selectedProjects,
  signatureLine,
  techStack,
  whatIDo
} from "@/content/portfolio";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Impact", href: "#impact" },
  { label: "About", href: "#about" },
  { label: "Systems", href: "#systems" },
  { label: "Films", href: "#films" },
  { label: "Formats", href: "#formats" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
] as const;

function Lines({ lines, className }: { lines: readonly string[]; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {lines.map((line) => (
        <p className="whitespace-pre-line" key={line}>
          {line}
        </p>
      ))}
    </div>
  );
}

function TextList({ items }: { items: readonly string[] }) {
  return <AnimatedPillPair items={items} />;
}

function SectionHeader({
  eyebrow,
  title
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-white/42">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}

function GlassCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.032] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/28 hover:bg-white/[0.055]",
        "ring-1 ring-white/[0.035]",
        "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent",
        "before:opacity-80",
        "after:absolute after:-right-16 after:-top-16 after:size-40 after:rounded-full after:bg-cyan-300/10 after:blur-3xl after:transition-all after:duration-500 group-hover:after:scale-125 group-hover:after:opacity-90",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionFrame({
  children,
  background,
  className,
  id,
  ariaLabel
}: {
  children: ReactNode;
  background: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden px-5 py-24", className)}
      id={id}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-58 brightness-150 contrast-115 saturate-150"
        fill
        sizes="100vw"
        src={background}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/34 to-black/86" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.78)_100%)]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(94vw,1180px)]">
        <Reveal>
          <nav className="flex items-center gap-3 rounded-full border border-white/18 bg-black/42 px-3 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-2xl ring-1 ring-white/[0.035]">
            <a className="flex shrink-0 items-center gap-2 rounded-full px-2 text-sm font-semibold tracking-[-0.01em]" href="#hero">
              <span className="grid size-8 place-items-center rounded-full border border-white/20 bg-white/8">
                <Globe2 className="size-4" />
              </span>
              {hero.name}
            </a>
            <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto rounded-full border border-white/8 bg-white/[0.025] p-1 text-xs font-medium text-white/62 [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => (
                <a
                  className="shrink-0 rounded-full px-3 py-2 transition hover:bg-white/[0.08] hover:text-white"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              className="shrink-0 rounded-full border border-white/18 bg-white/[0.075] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black"
              href={profileLinks.resume}
              rel="noreferrer"
              target="_blank"
            >
              Resume
            </a>
          </nav>
        </Reveal>
      </header>

      <section
        className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 pb-10 pt-28 text-center"
        id="hero"
      >
        <video
          aria-label="Cinematic AI visual sequence"
          autoPlay
          className="absolute inset-x-0 bottom-0 h-[76vh] w-full object-cover object-center opacity-80 brightness-125 contrast-110 saturate-150"
          loop
          muted
          playsInline
          poster="/base-video-poster.jpg"
          preload="metadata"
        >
          <source src="/base-video.webm" type="video/webm" />
          <source src="/base-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,0.12),transparent_30rem)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/54 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-[66vh] bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(0,0,0,0.05)_38%,rgba(0,0,0,0.76)_92%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
          <Reveal className="max-w-5xl">
            <h1 className="font-serif text-[clamp(4.2rem,12vw,10.5rem)] font-medium leading-[0.72] tracking-[-0.08em] text-white">
              <span className="block">KAUSTUBH</span>
              <span className="block">RAYKAR</span>
            </h1>
          </Reveal>

          <Reveal className="mt-8 max-w-3xl space-y-3 text-base leading-7 text-white/86 sm:text-lg" delay={180}>
            {hero.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </Reveal>

          <Reveal className="mt-12 w-full max-w-3xl rounded-full border border-white/14 bg-white/[0.022] p-2 shadow-2xl shadow-cyan-950/15 backdrop-blur-md ring-1 ring-white/[0.025]" delay={260}>
            <div className="rounded-full bg-white/[0.015] px-7 py-4 text-center text-sm font-medium leading-6 tracking-[0.02em] text-white/84 backdrop-blur-sm">
              <span>
                {hero.currentlyOperatingAcross}
              </span>
            </div>
          </Reveal>

          <Reveal className="mt-10 grid w-full max-w-5xl gap-3 sm:grid-cols-3" delay={340}>
            {heroChannels.map((channel) => (
              <a
                className="group relative min-h-44 overflow-hidden border border-white/14 bg-white/[0.035] p-5 text-left shadow-2xl shadow-black/30 backdrop-blur-xl ring-1 ring-white/[0.035] transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.06]"
                href={channel.href}
                key={channel.title}
                rel="noreferrer"
                target="_blank"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 1.25rem) 0, 100% 1.25rem, 100% 100%, 0 100%)"
                }}
              >
                <Image
                  alt={`${channel.title} channel preview`}
                  className="absolute inset-0 h-full w-full object-cover opacity-22 brightness-125 saturate-125 transition duration-500 group-hover:scale-105 group-hover:opacity-34"
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  src={channel.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/74 to-black/18" />
                <div className="relative z-10">
                  <Image
                    alt={`${channel.title} logo`}
                    className="mb-4 size-10 border border-white/18 object-cover"
                    height={40}
                    src={channel.logo}
                    width={40}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl font-medium tracking-[-0.05em] text-white">
                        {channel.title}
                      </h2>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--gold)]/80">
                        {channel.company}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 text-white/42 transition group-hover:text-white" />
                  </div>
                  <div className="mt-5 space-y-2">
                    <p className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-2 text-sm font-semibold leading-5 text-white backdrop-blur-xl">
                      {channel.metric}
                    </p>
                    <p className="rounded-full border border-white/10 bg-black/18 px-3 py-2 text-xs leading-5 text-white/68 backdrop-blur-xl">
                      {channel.detail}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionFrame
        ariaLabel="HERO METRICS"
        background="/section-bg-01.webp"
        className="px-5 py-14"
        id="impact"
      >
        <Reveal className="mx-auto grid max-w-6xl gap-3 rounded-[2rem] border border-white/12 bg-white/[0.03] p-3 shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-white/[0.035] sm:grid-cols-2 lg:grid-cols-5">
          {heroMetrics.map((metric) => (
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5 text-center backdrop-blur-xl" key={metric.label}>
              <p className="font-serif text-5xl font-semibold tracking-[-0.06em] text-white">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-5 text-white/62">{metric.label}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 text-center text-xs font-bold uppercase tracking-[0.55em] text-[var(--gold)]">
          {signatureLine}
        </Reveal>
      </SectionFrame>

      <SectionFrame background="/section-bg-02.webp" id="about">
        <SectionHeader title={about.title} />
        <Reveal className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <GlassCard className="p-8 md:p-10">
            <Lines className="text-lg leading-8 text-white/76" lines={about.paragraphs.slice(0, 3)} />
            <TextList items={about.intersection} />
          </GlassCard>
          <GlassCard className="p-8 md:p-10">
            <Lines className="text-lg leading-8 text-white/76" lines={about.paragraphs.slice(3)} />
            <TextList items={about.building} />
          </GlassCard>
        </Reveal>
      </SectionFrame>

      <SectionFrame background="/section-bg-03.webp" id="systems">
        <SectionHeader title={featuredWorkTitle} />
        <Reveal>
          <InteractiveIpShowcase items={featuredIps} />
        </Reveal>
      </SectionFrame>

      <SectionFrame background="/section-bg-04.webp" id="films">
        <SectionHeader eyebrow="FILMS · VISUALS · EXPERIMENTS" title="Personal AI Channels" />
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
          {personalChannels.map((channel, index) => (
            <Reveal as="article" delay={index * 90} key={channel.title}>
              <a
                className="group relative block overflow-hidden border border-white/14 bg-white/[0.032] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/[0.035] transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.055]"
                href={channel.href}
                rel="noreferrer"
                target="_blank"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))"
                }}
              >
                <div className="absolute -right-20 -top-20 size-64 rounded-full bg-cyan-300/10 blur-3xl transition duration-700 group-hover:scale-125" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                <div className="relative mb-6 overflow-hidden rounded-[1.6rem] border border-white/12 bg-black/50">
                  <Image
                    alt={`${channel.title} channel preview`}
                    className="aspect-[16/9] w-full object-contain p-3 opacity-88 brightness-110 contrast-110 saturate-125 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                    height={360}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={channel.image}
                    width={640}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/[0.03]" />
                </div>
                <div className="relative z-10 p-2">
                  <div className="mb-5 flex items-center gap-4">
                    <Image
                      alt={`${channel.title} logo`}
                      className="size-14 border border-white/20 object-cover"
                      height={56}
                      src={channel.logo}
                      width={56}
                    />
                    <div>
                      <h3 className="font-serif text-5xl font-medium leading-none tracking-[-0.06em] text-white">
                        {channel.title}
                      </h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
                        AI Filmmaking Lab
                      </p>
                    </div>
                    <ArrowUpRight className="ml-auto size-5 text-white/44 transition group-hover:text-white" />
                  </div>
                  <p className="max-w-xl text-lg leading-7 text-white/82">
                    {channel.description}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
                    {channel.exploration}
                  </p>
                  <TextList items={channel.focus} />
                  <AnimatedPillPair className="mt-3" items={channel.formats} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame background="/section-bg-05.webp" id="formats">
        <SectionHeader eyebrow="CREATIVE FORMATS I WORK ACROSS" title="Creative Formats" />
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {creativeFormats.map((format, index) => (
            <Reveal as="article" delay={index * 55} key={format.title}>
              <GlassCard className="h-full">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-[var(--gold)]">
                  0{index + 1}
                </p>
                <h3 className="font-serif text-4xl font-medium tracking-[-0.05em] text-white">
                  {format.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/68">
                  {format.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame background="/section-bg-06.webp" id="interests">
        <Reveal>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] border border-white/14 bg-white/[0.032] p-8 shadow-2xl shadow-black/35 backdrop-blur-xl ring-1 ring-white/[0.035] md:p-12">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[var(--gold)]">
                  CURRENT INTERESTS
                </p>
                <h2 className="font-serif text-5xl font-medium leading-none tracking-[-0.06em] text-white md:text-7xl">
                  Building the future language of AI media.
                </h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {currentInterests.map((interest) => (
                  <span
                    className="rounded-full border border-white/14 bg-white/[0.065] px-4 py-2 text-sm text-white/78 shadow-inner shadow-white/10 backdrop-blur-xl ring-1 ring-white/[0.035]"
                    key={interest}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </SectionFrame>

      <SectionFrame background="/section-bg-07.webp" id="services">
        <SectionHeader eyebrow="WHAT I DO SECTION" title="What I Do" />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whatIDo.map((item, index) => (
            <Reveal as="article" delay={index * 55} key={item.title}>
              <GlassCard className="h-full">
                <h3 className="font-serif text-3xl font-medium tracking-[-0.04em]">
                  {item.title}
                </h3>
                <Lines className="mt-5 text-sm leading-7 text-white/70" lines={item.paragraphs} />
                {"list" in item ? <TextList items={item.list} /> : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame background="/section-bg-09.webp" id="stack">
        <SectionHeader eyebrow="TECH STACK SECTION" title="Tech Stack" />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {techStack.map((stack, index) => (
            <Reveal as="article" delay={index * 70} key={stack.title}>
              <GlassCard className="h-full">
                <h3 className="font-serif text-3xl font-medium tracking-[-0.04em]">
                  {stack.title}
                </h3>
                <TextList items={stack.items} />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame background="/section-bg-10.webp" id="experience">
        <SectionHeader eyebrow="EXPERIENCE SECTION" title="Experience" />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {experience.map((role, index) => (
            <Reveal as="article" delay={index * 90} key={role.title}>
              <GlassCard className="h-full p-8">
                <p className="mb-5 inline-flex rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {role.duration}
                </p>
                <h3 className="font-serif text-4xl font-medium tracking-[-0.05em]">
                  {role.title}
                </h3>
                <Lines className="mt-5 text-sm leading-7 text-white/70" lines={role.paragraphs} />
                <TextList items={role.list} />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame background="/section-bg-11.webp" id="projects">
        <SectionHeader eyebrow="SELECTED PROJECTS SECTION" title="Selected Projects" />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {selectedProjects.map((project, index) => (
            <Reveal as="article" delay={index * 70} key={project.title}>
              <GlassCard className="h-full p-8">
                <h3 className="font-serif text-4xl font-medium tracking-[-0.05em]">
                  {project.title}
                </h3>
                <Lines className="mt-6 text-sm leading-7 text-white/70" lines={project.paragraphs} />
                {"list" in project ? <TextList items={project.list} /> : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame background="/section-bg-12.webp" id="contact">
        <Reveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/14 bg-white/[0.035] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/[0.035] md:p-14">
            <h2 className="mx-auto max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-8 max-w-3xl whitespace-pre-line text-base leading-8 text-white/72">
              {finalCta.openTo}
            </p>
            <p className="mt-10 text-sm font-semibold text-white">{finalCta.contactLabel}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {finalCta.contacts.map((contact) => {
                const Icon =
                  contact.label === "Email"
                    ? Mail
                    : contact.label === "GitHub"
                      ? CodeXml
                      : contact.label === "+91 7020524609"
                        ? Globe2
                        : ExternalLink;

                return (
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-5 py-3 text-sm text-white/78 transition hover:border-white/34 hover:bg-white hover:text-black"
                    href={contact.href}
                    key={contact.label}
                    rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <Icon className="size-4" />
                    {contact.label}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </SectionFrame>

      <footer className="px-5 pb-10 text-center">
        <p className="whitespace-pre-line text-xs font-semibold tracking-[0.22em] text-white/42">
          {footerText}
        </p>
      </footer>
    </main>
  );
}
