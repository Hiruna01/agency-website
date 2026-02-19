"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

const FILTER_TABS = [
  { label: "All", value: "All" },
  { label: "Web Design", value: "Web Design" },
  { label: "E-Commerce", value: "E-Commerce" },
  { label: "Web Apps", value: "Web Application" },
  { label: "Landing Pages", value: "Landing Page" },
];

const CARD_GRADIENTS = [
  "from-brand-secondary/30 to-brand-primary/30",
  "from-violet-400/30 to-indigo-500/30",
  "from-emerald-400/30 to-teal-500/30",
  "from-amber-400/30 to-orange-500/30",
  "from-rose-400/30 to-pink-500/30",
  "from-cyan-400/30 to-blue-500/30",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
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

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Our Work
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-[2.5rem] md:leading-tight">
            Projects That Speak for Themselves
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                "min-h-[44px] rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 sm:px-4",
                activeFilter === tab.value
                  ? "bg-brand-secondary/10 text-brand-secondary"
                  : "text-brand-muted hover:text-brand-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((project, index) => {
              const gradient =
                CARD_GRADIENTS[
                  PORTFOLIO_ITEMS.indexOf(project) % CARD_GRADIENTS.length
                ];

              return (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  className="group"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                    />
                    <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-brand-primary/50">
                      {project.title}
                    </span>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-dark/80 px-6 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="text-xs font-medium uppercase tracking-wider text-brand-accent">
                        {project.category}
                      </span>
                      <h4 className="text-lg font-semibold text-white">
                        {project.title}
                      </h4>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
                        View Project
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Info Below Image */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-brand-primary">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-surface px-2.5 py-0.5 text-xs font-medium text-brand-body"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-full border border-brand-primary/20 px-7 py-3 text-sm font-semibold text-brand-primary transition-all duration-200 hover:border-brand-primary/40 hover:bg-brand-primary/5"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
