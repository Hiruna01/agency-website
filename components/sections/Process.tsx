"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Process() {
  return (
    <section id="process" className="bg-brand-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Our Process
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-[2.5rem] md:leading-tight">
            From Idea to Launch in 4 Simple Steps
          </h2>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.2 }}
          className="mt-16 hidden lg:grid lg:grid-cols-4 lg:gap-0"
        >
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              variants={stepVariants}
              className="relative flex flex-col items-center text-center"
            >
              {/* Connecting dashed line */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+28px)] h-0.5 w-[calc(100%-56px)] border-t-2 border-dashed border-brand-accent/40" />
              )}

              {/* Step circle */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white shadow-md shadow-brand-primary/20">
                {step.stepNumber}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-semibold text-brand-primary">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 max-w-[260px] text-sm leading-relaxed text-brand-body">
                {step.description}
              </p>

              {/* Duration badge */}
              <span className="mt-4 inline-flex rounded-full bg-brand-accent/10 px-3.5 py-1 text-xs font-semibold text-brand-accent">
                {step.duration}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Vertical Stepper */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.2 }}
          className="mt-12 lg:hidden"
        >
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              variants={stepVariants}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              {/* Vertical line + circle */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white shadow-md shadow-brand-primary/20">
                  {step.stepNumber}
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="mt-2 w-0.5 flex-1 border-l-2 border-dashed border-brand-accent/40" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 pt-1.5">
                <h3 className="text-lg font-semibold text-brand-primary">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-body">
                  {step.description}
                </p>
                <span className="mt-3 inline-flex rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
                  {step.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
