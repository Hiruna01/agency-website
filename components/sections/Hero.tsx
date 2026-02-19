"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star } from "lucide-react";
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
          className="inline-block bg-gradient-to-r from-brand-accent to-sky-400 bg-clip-text text-transparent"
        >
          {ROTATING_WORDS[wordIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Animated counter ────────────────────────────────────────────────────────
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
    const duration = 1600;
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
      <span className="text-2xl font-bold text-white sm:text-3xl">
        {count}
        {suffix}
      </span>
      <span className="mt-0.5 block text-xs text-white/50">{label}</span>
    </div>
  );
}

// ── Floating shapes ─────────────────────────────────────────────────────────
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-brand-secondary/[0.07] blur-3xl lg:h-[600px] lg:w-[600px]"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-20 h-[350px] w-[350px] rounded-full bg-brand-accent/[0.06] blur-3xl lg:h-[500px] lg:w-[500px]"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 h-[200px] w-[200px] rounded-full bg-violet-500/[0.04] blur-3xl"
      />

      {/* Geometric floating shapes */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[12%] h-4 w-4 rounded-sm border border-white/[0.08] lg:h-5 lg:w-5"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -120, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[8%] h-3 w-3 rounded-full bg-brand-accent/10"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[25%] h-2 w-2 rounded-full bg-white/[0.08]"
      />
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[15%] h-5 w-5 rounded-sm border border-white/[0.05] lg:h-6 lg:w-6"
      />
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] right-[18%] h-2.5 w-2.5 rounded-full bg-brand-secondary/10"
      />

      {/* Dot grid patterns */}
      <svg className="absolute top-10 left-10 h-32 w-32 opacity-[0.03] lg:h-48 lg:w-48" fill="white">
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={(i % 6) * 10 + 5} cy={Math.floor(i / 6) * 10 + 5} r="1" />
        ))}
      </svg>
      <svg className="absolute right-16 bottom-20 h-32 w-32 opacity-[0.03] lg:h-48 lg:w-48" fill="white">
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={(i % 6) * 10 + 5} cy={Math.floor(i / 6) * 10 + 5} r="1" />
        ))}
      </svg>
    </div>
  );
}

// ── Client logo placeholders ────────────────────────────────────────────────
const CLIENT_LOGOS = ["Bloom Botanics", "Apex Fitness", "Ceylon Spice", "TechPulse", "Island Escapes"];

function ClientLogoBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="mt-10 border-t border-white/[0.08] pt-8"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-white/30">
        Trusted by leading brands
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
        {CLIENT_LOGOS.map((name) => (
          <span
            key={name}
            className="text-sm font-semibold tracking-wide text-white/20 transition-colors duration-300 hover:text-white/40"
          >
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Hero ───────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[650px] overflow-hidden bg-[#0B1D3A] lg:min-h-screen"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1D3A] via-brand-primary to-[#162D54]" />
        <motion.div
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,143,212,0.15)_0%,_transparent_60%)]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(46,117,182,0.12)_0%,_transparent_60%)]"
        />
      </div>

      <FloatingShapes />

      <div className="relative mx-auto flex max-w-[1280px] items-center px-4 pt-28 pb-16 md:px-6 md:pt-32 md:pb-20 lg:min-h-screen lg:px-8 lg:pt-0 lg:pb-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.55fr] lg:gap-16">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
          >
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Trusted by 50+ Businesses
            </span>

            {/* Headline with typing animation */}
            <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              We Build Websites
              <br />
              That Drive <TypingRotator />
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg md:leading-relaxed">
              We design and develop high-performance websites, e-commerce stores,
              and web applications that help your business grow — delivered fast,
              priced fairly.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={SITE_CONFIG.cta.href}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-accent/30 hover:brightness-110 sm:px-7 sm:py-3.5"
              >
                {SITE_CONFIG.cta.label}
              </a>
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("portfolio");
                  if (el) {
                    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offset, behavior: "smooth" });
                  }
                }}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white sm:px-7 sm:py-3.5"
              >
                See Our Work&nbsp;&darr;
              </a>
            </div>

            {/* Star rating */}
            <div className="mt-6 flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-1.5 text-sm text-white/40">
                4.9/5 from 40+ clients
              </span>
            </div>

            {/* Client logo bar */}
            <ClientLogoBar />
          </motion.div>

          {/* Right Column — Stats + Visual (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" as const }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Browser mockup */}
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 backdrop-blur-sm">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="ml-2 flex-1 rounded-md bg-white/[0.05] px-3 py-1">
                    <span className="text-[10px] text-white/25">yourwebsite.com</span>
                  </div>
                </div>
                {/* Screen content */}
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-6 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 p-8">
                  {/* Mini stat cards floating inside */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full max-w-[200px] rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/30">Conversion Rate</span>
                      <span className="text-xs font-bold text-emerald-400">+42%</span>
                    </div>
                    <div className="mt-2 flex gap-0.5">
                      {[40, 55, 35, 65, 50, 75, 60, 85, 70, 90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-brand-accent/20" style={{ height: `${h * 0.3}px` }} />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full max-w-[200px] rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/30">Monthly Traffic</span>
                      <span className="text-xs font-bold text-brand-accent">12.4k</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/[0.05]">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, delay: 1, ease: "easeOut" as const }}
                        className="h-full rounded-full bg-gradient-to-r from-brand-accent/60 to-brand-secondary/60"
                      />
                    </div>
                  </motion.div>

                  <span className="text-xs font-medium text-white/15">
                    Hero Visual Placeholder
                  </span>
                </div>
              </div>
            </div>

            {/* Animated counters below mockup */}
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5">
              <AnimatedCounter target={200} suffix="+" label="Projects" />
              <AnimatedCounter target={50} suffix="+" label="Clients" />
              <AnimatedCounter target={98} suffix="%" label="Satisfaction" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-surface to-transparent" />
    </section>
  );
}
