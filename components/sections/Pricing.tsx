"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_TIERS, SITE_CONFIG } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Transparent Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-[2.5rem] md:leading-tight">
            Simple Plans. No Surprises.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-body md:text-lg">
            Choose the package that fits your needs. Every plan includes a free
            consultation.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-3 lg:gap-8"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={cn(
                "relative rounded-2xl border bg-white p-6 sm:p-8 lg:p-10",
                tier.isPopular
                  ? "border-brand-secondary shadow-xl shadow-brand-secondary/10 lg:scale-105 lg:z-10"
                  : "border-gray-100 shadow-sm"
              )}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Tier Name */}
              <h3 className="text-lg font-semibold text-brand-primary">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
                  {tier.price}
                </span>
                <span className="ml-1 text-sm text-brand-muted">/project</span>
              </div>

              {/* Subtitle */}
              <p className="mt-2 text-base text-brand-body">{tier.subtitle}</p>

              {/* Divider */}
              <hr className="my-6 border-gray-100" />

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm leading-snug text-brand-body">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={SITE_CONFIG.cta.href}
                className={cn(
                  "mt-8 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                  tier.isPopular
                    ? "bg-gradient-to-r from-brand-secondary to-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/25 hover:brightness-110"
                    : "border border-brand-secondary/30 text-brand-secondary hover:border-brand-secondary hover:bg-brand-secondary/5"
                )}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Note */}
        <p className="mt-12 text-center text-sm text-brand-muted">
          All plans include a free 30-minute consultation. Need a custom quote?{" "}
          <a
            href={SITE_CONFIG.cta.href}
            className="font-medium text-brand-secondary hover:underline"
          >
            Let&apos;s talk.
          </a>
        </p>
      </div>
    </section>
  );
}
