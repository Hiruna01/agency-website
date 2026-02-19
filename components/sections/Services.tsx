"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code,
  ShoppingCart,
  Figma,
  Wrench,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Palette,
  Code,
  ShoppingCart,
  Figma,
  Wrench,
  Rocket,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-[2.5rem] md:leading-tight">
            Services Tailored to Your Business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-body md:text-lg">
            From concept to launch, we handle every aspect of your web presence.
          </p>
        </div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-surface transition-colors duration-200 group-hover:bg-brand-secondary">
                  {Icon && (
                    <Icon className="h-7 w-7 text-brand-secondary transition-colors duration-200 group-hover:text-white" />
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-semibold text-brand-primary">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-base leading-relaxed text-brand-body">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
