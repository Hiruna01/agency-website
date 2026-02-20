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
    <span className="relative inline-block min-w-[180px] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[320px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[wordIndex]}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
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
}: {
  target: number;
  suffix: string;
  label: string;
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
      <span className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        {count}
        {suffix}
      </span>
      <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-white/40 sm:text-sm">
        {label}
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
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#050a15]"
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-4 pt-24 pb-32 text-center md:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-md sm:text-sm">
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
          className="mt-8 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
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
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg md:text-xl md:leading-relaxed"
        >
          High-performance websites, e-commerce stores, and web applications
          that help your business grow — delivered fast, priced fairly.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" as const }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={SITE_CONFIG.cta.href}
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-lg shadow-white/10 transition-all duration-200 hover:bg-white/90 hover:shadow-xl hover:shadow-white/15 sm:text-base"
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
            className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:text-base"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Play className="h-3.5 w-3.5 fill-white text-white" />
            </span>
            See Our Work
          </a>
        </motion.div>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8 flex items-center gap-1.5"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="ml-2 text-sm text-white/35">
            4.9/5 from 40+ clients
          </span>
        </motion.div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8"
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" as const }}
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 divide-x divide-white/[0.06] px-4 py-8 md:px-6 md:py-10 lg:px-8">
          <AnimatedCounter target={200} suffix="+" label="Projects Delivered" />
          <AnimatedCounter target={50} suffix="+" label="Happy Clients" />
          <AnimatedCounter target={98} suffix="%" label="Satisfaction Rate" />
        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 md:bottom-6"
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
