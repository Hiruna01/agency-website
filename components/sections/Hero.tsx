"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Play, ArrowDown, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

// ── Typing animation words ──────────────────────────────────────────────────
const ROTATING_WORDS = ["Revenue", "Conversions", "Growth", "Results"];

function TypingRotator() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[wordIndex]}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="inline-block bg-gradient-to-r from-brand-accent via-sky-400 to-blue-400 bg-clip-text text-transparent"
        >
          {ROTATING_WORDS[wordIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Animated counter for stats row ──────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix,
  label,
  shortLabel,
}: {
  target: number;
  suffix: string;
  label: string;
  shortLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setCount(Math.round(current));
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
        {count}
        {suffix}
      </span>
      {/* Short label on mobile, full label on sm+ */}
      <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-white/40 sm:mt-1 sm:text-xs md:text-sm">
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </div>
  );
}

// ── Client logo placeholders ────────────────────────────────────────────────
const CLIENT_LOGOS = [
  "Bloom Botanics",
  "Apex Fitness",
  "Ceylon Spice",
  "TechPulse",
  "Island Escapes",
];

// ── Main Hero ───────────────────────────────────────────────────────────────
export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#050a15]"
    >
      {/* ── Video Background ─────────────────────────────────────────── */}
      {/* Fallback gradient — sits behind video, visible until video loads */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#0B1D3A] via-brand-primary/80 to-[#162D54] transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlays for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* ── Subtle animated grain texture ────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
      >
        <svg width="100%" height="100%">
          <filter id="heroGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-5 pt-20 pb-6 text-center sm:px-6 sm:pt-24 sm:pb-8 md:px-6 md:pb-12 lg:px-8">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 backdrop-blur-md sm:gap-2.5 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.15em] md:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
            </span>
            Web Development Agency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" as const }}
          className="mt-6 max-w-4xl text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl md:leading-[1.08] lg:text-7xl"
        >
          We Build Websites
          <br />
          That Drive <TypingRotator />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" as const }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:mt-6 sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg md:leading-relaxed lg:text-xl"
        >
          High-performance websites, e-commerce stores, and web applications
          that help your business grow — delivered fast, priced fairly.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" as const }}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
        >
          <a
            href={SITE_CONFIG.cta.href}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark shadow-lg shadow-white/10 transition-all duration-200 hover:bg-white/90 hover:shadow-xl hover:shadow-white/15 sm:min-h-[52px] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          >
            {SITE_CONFIG.cta.label}
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("portfolio");
              if (el) {
                const offset =
                  el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: "smooth" });
              }
            }}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:min-h-[52px] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 sm:h-8 sm:w-8">
              <Play className="h-3 w-3 fill-white text-white sm:h-3.5 sm:w-3.5" />
            </span>
            See Our Work
          </a>
        </motion.div>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-6 flex items-center gap-1 sm:mt-8 sm:gap-1.5"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400 sm:h-4 sm:w-4"
            />
          ))}
          <span className="ml-1.5 text-xs text-white/35 sm:ml-2 sm:text-sm">
            4.9/5 from 40+ clients
          </span>
        </motion.div>

        {/* Trusted by logos — hidden on very small, shown from sm up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-4 hidden flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-6 sm:flex sm:gap-x-8"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-white/20">
            Trusted by
          </span>
          {CLIENT_LOGOS.map((name) => (
            <span
              key={name}
              className="text-xs font-semibold tracking-wide text-white/15 transition-colors duration-300 hover:text-white/30 sm:text-sm"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom Stats Bar ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" as const }}
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 divide-x divide-white/[0.06] px-2 py-5 sm:px-4 sm:py-8 md:px-6 md:py-10 lg:px-8">
          <AnimatedCounter
            target={200}
            suffix="+"
            label="Projects Delivered"
            shortLabel="Projects"
          />
          <AnimatedCounter
            target={50}
            suffix="+"
            label="Happy Clients"
            shortLabel="Clients"
          />
          <AnimatedCounter
            target={98}
            suffix="%"
            label="Satisfaction Rate"
            shortLabel="Satisfaction"
          />
        </div>
      </motion.div>

      {/* ── Scroll indicator — hidden on mobile, shown md+ ───────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.button
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            const next = document.getElementById("hero");
            if (next?.nextElementSibling) {
              const offset =
                next.nextElementSibling.getBoundingClientRect().top +
                window.scrollY -
                80;
              window.scrollTo({ top: offset, behavior: "smooth" });
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/30 backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:text-white/50"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}
