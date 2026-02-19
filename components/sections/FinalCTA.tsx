"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-[#264A7E] py-16 md:py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-accent/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-secondary/10 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-[2.5rem] md:leading-tight">
            Ready to Build Something Great?
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
            Let&apos;s discuss your project. No commitment, no pressure — just a
            conversation about how we can help your business grow online.
          </p>

          <a
            href={SITE_CONFIG.cta.href}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold text-brand-primary shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Book Your Free Consultation
          </a>

          <p className="mt-5 text-sm text-white/60">
            Free 30-min call&ensp;·&ensp;No obligation&ensp;·&ensp;Response
            within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
