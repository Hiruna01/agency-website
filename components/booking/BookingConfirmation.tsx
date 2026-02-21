"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────

interface BookingConfirmationProps {
  reference: string;
  type: "CONSULTATION" | "PROJECT";
  name: string;
  preferredDate?: string;
  preferredTime?: string;
  onBookAnother: () => void;
}

// ─── Helpers ────────────────────────────────────────────────────────

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Component ──────────────────────────────────────────────────────

export function BookingConfirmation({
  reference,
  type,
  name,
  preferredDate,
  preferredTime,
  onBookAnother,
}: BookingConfirmationProps) {
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 text-center"
    >
      {/* ── Animated checkmark ──────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200/60"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* ── Heading ─────────────────────────────────────────────── */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-[28px] font-bold text-brand-primary mb-2"
      >
        Booking Confirmed!
      </motion.h2>

      {/* ── Reference pill ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full bg-gray-100 border border-gray-200 px-5 py-2.5 mb-6"
      >
        <span className="text-sm text-brand-muted">Reference:</span>
        <span className="font-mono font-bold text-brand-primary tracking-wide text-sm">
          {reference}
        </span>
      </motion.div>

      {/* ── Conditional message ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mb-2 max-w-md mx-auto space-y-3"
      >
        {type === "CONSULTATION" ? (
          <p className="text-brand-body leading-relaxed">
            Thanks, {firstName}! We&apos;ve received your consultation request
            {preferredDate && preferredTime && (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-brand-dark">
                  {formatDisplayDate(preferredDate)}
                </span>{" "}
                at{" "}
                <span className="font-semibold text-brand-dark">
                  {preferredTime}
                </span>
              </>
            )}
            . We&apos;ll confirm your slot within 24 hours.
          </p>
        ) : (
          <p className="text-brand-body leading-relaxed">
            Thanks, {firstName}! We&apos;ve received your project brief. Our
            team will review it and get back to you within 24 hours.
          </p>
        )}

        <p className="text-sm text-brand-muted">
          We&apos;ll be in touch soon via email or phone.
        </p>
      </motion.div>

      {/* ── Actions ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <button
          type="button"
          onClick={onBookAnother}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brand-muted transition-colors hover:text-brand-secondary"
        >
          <RotateCcw className="h-4 w-4" />
          Book Another
        </button>
      </motion.div>
    </motion.div>
  );
}
