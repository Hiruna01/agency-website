"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-[2.5rem] md:leading-tight">
            Questions? We&apos;ve Got Answers.
          </h2>
        </div>

        {/* Accordion */}
        <div className="mt-12">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="border-b border-gray-100"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "text-base font-semibold transition-colors duration-200 md:text-lg",
                      isOpen ? "text-brand-secondary" : "text-brand-primary"
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-all duration-200",
                      isOpen
                        ? "rotate-180 text-brand-secondary"
                        : "text-brand-muted"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-base leading-relaxed text-brand-body">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
