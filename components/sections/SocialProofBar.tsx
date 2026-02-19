"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function parseStatValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayNumber, setDisplayNumber] = useState(0);
  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const steps = 40;
    const increment = parsed.number / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, parsed.number);
      setDisplayNumber(current);
      if (step >= steps) {
        setDisplayNumber(parsed.number);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, parsed.number]);

  const formattedNumber = parsed.number % 1 === 0
    ? Math.round(displayNumber).toString()
    : displayNumber.toFixed(1);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 py-2">
      <span className="text-[2rem] font-bold leading-tight text-brand-primary">
        {parsed.prefix}
        {formattedNumber}
        {parsed.suffix}
      </span>
      <span className="text-sm text-brand-muted">{label}</span>
    </div>
  );
}

export function SocialProofBar() {
  return (
    <section
      id="social-proof"
      className="border-y border-gray-200 bg-brand-surface py-8 md:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-gray-200"
        >
          {STATS.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
