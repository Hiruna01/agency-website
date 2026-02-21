"use client";

import {
  Palette,
  Code,
  ShoppingCart,
  Figma,
  Wrench,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Palette,
  Code,
  ShoppingCart,
  Figma,
  Wrench,
  Rocket,
};

const CARD_THEMES = [
  {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accent: "bg-blue-500",
  },
  {
    bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accent: "bg-emerald-500",
  },
  {
    bg: "bg-gradient-to-br from-violet-50 to-purple-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    accent: "bg-violet-500",
  },
  {
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    accent: "bg-amber-500",
  },
  {
    bg: "bg-gradient-to-br from-rose-50 to-pink-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    accent: "bg-rose-500",
  },
  {
    bg: "bg-gradient-to-br from-cyan-50 to-sky-50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    accent: "bg-cyan-500",
  },
];

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

        {/* Cards Grid */}
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.iconName];
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                className={`${theme.bg} group rounded-2xl border border-gray-100/80 shadow-md transition-shadow hover:shadow-lg sm:rounded-3xl`}
              >
                <div className="px-6 py-7 sm:px-7 sm:py-8">
                  {/* Top row: Step number + Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.iconBg} sm:h-14 sm:w-14`}
                    >
                      {Icon && (
                        <Icon
                          className={`h-6 w-6 ${theme.iconColor} sm:h-7 sm:w-7`}
                        />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-brand-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-brand-dark sm:text-xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-brand-body">
                    {service.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div className="mt-5 flex items-center gap-3 sm:mt-6">
                    <div
                      className={`h-1 w-10 rounded-full ${theme.accent} opacity-30`}
                    />
                    <div
                      className={`h-1 w-4 rounded-full ${theme.accent} opacity-15`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
