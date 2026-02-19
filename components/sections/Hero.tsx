"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-white to-brand-surface lg:min-h-screen"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg
          className="absolute -top-24 -right-24 h-[500px] w-[500px] opacity-[0.04] lg:h-[700px] lg:w-[700px]"
          viewBox="0 0 600 600"
          fill="none"
        >
          <circle cx="300" cy="300" r="300" fill="#2E75B6" />
        </svg>
        <svg
          className="absolute -bottom-32 -left-32 h-[400px] w-[400px] opacity-[0.03] lg:h-[600px] lg:w-[600px]"
          viewBox="0 0 600 600"
          fill="none"
        >
          <circle cx="300" cy="300" r="300" fill="#1A3C6E" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-[1280px] items-center px-4 pt-28 pb-16 md:px-6 md:pt-32 md:pb-20 lg:min-h-screen lg:px-8 lg:pt-0 lg:pb-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.65fr] lg:gap-16">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-secondary/20 bg-brand-secondary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
              Trusted by 50+ Businesses
            </span>

            {/* Headline */}
            <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-brand-primary sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              {SITE_CONFIG.tagline}
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-body md:text-lg md:leading-relaxed">
              We design and develop high-performance websites, e-commerce stores,
              and web applications that help your business grow — delivered fast,
              priced fairly.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={SITE_CONFIG.cta.href}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-primary/25 hover:brightness-110 sm:px-7 sm:py-3.5"
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
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-brand-primary/20 px-6 py-3 text-sm font-semibold text-brand-primary transition-all duration-200 hover:border-brand-primary/40 hover:bg-brand-primary/5 sm:px-7 sm:py-3.5"
              >
                See Our Work&nbsp;&darr;
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-6 flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-1.5 text-sm text-brand-muted">
                4.9/5 from 40+ clients
              </span>
            </div>
          </motion.div>

          {/* Visual Column (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-brand-secondary/10 via-brand-accent/10 to-brand-primary/10 border border-brand-secondary/10">
              <span className="text-sm font-medium text-brand-muted">
                Hero Visual Placeholder
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
