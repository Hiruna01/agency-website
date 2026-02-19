"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BadgeDollarSign,
  Target,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { BENEFITS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  BadgeDollarSign,
  Target,
  Cpu,
};

const CARD_TINTS = [
  { bg: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-50 text-blue-700" },
  { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700" },
  { bg: "bg-amber-50", icon: "text-amber-600", badge: "bg-amber-50 text-amber-700" },
  { bg: "bg-violet-50", icon: "text-violet-600", badge: "bg-violet-50 text-violet-700" },
];

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
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Benefits() {
  return (
    <section id="benefits" className="bg-brand-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-[2.5rem] md:leading-tight">
            Built Different. Built Better.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-body md:text-lg">
            We combine speed, quality, and value to deliver results that
            traditional agencies simply cannot match.
          </p>
        </div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {BENEFITS.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.iconName];
            const tint = CARD_TINTS[index % CARD_TINTS.length];

            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                className="group relative rounded-xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg sm:p-8"
              >
                {/* Stat Badge */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold sm:absolute sm:top-6 sm:right-6 ${tint.badge}`}
                >
                  {benefit.stat}
                </span>

                {/* Icon */}
                <div
                  className={`mt-4 flex h-12 w-12 items-center justify-center rounded-full sm:mt-0 ${tint.bg} transition-transform duration-200 group-hover:scale-110`}
                >
                  {Icon && <Icon className={`h-6 w-6 ${tint.icon}`} />}
                </div>

                {/* Headline */}
                <h3 className="mt-5 text-xl font-bold text-brand-primary">
                  {benefit.headline}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-base leading-relaxed text-brand-body">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
