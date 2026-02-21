"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────

interface BookingToastProps {
  message: string;
  description?: string;
  variant: "success" | "error" | "warning";
  onDismiss: () => void;
  duration?: number;
}

// ─── Component ──────────────────────────────────────────────────────

export function BookingToast({
  message,
  description,
  variant,
  onDismiss,
  duration = 5000,
}: BookingToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, y: 16, x: 16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 8, x: 16 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl px-5 py-4 shadow-2xl max-w-sm ${
        variant === "success"
          ? "bg-brand-dark text-white"
          : variant === "error"
            ? "bg-red-50 border border-red-200 text-red-700"
            : "bg-amber-50 border border-amber-200 text-amber-700"
      }`}
    >
      {/* Icon */}
      {variant === "success" ? (
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight">{message}</p>
        {description && (
          <p
            className={`text-xs mt-1 ${
              variant === "success" ? "text-gray-400" : "opacity-80"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onDismiss}
        className={`shrink-0 rounded-md p-0.5 transition-opacity hover:opacity-70 ${
          variant === "success" ? "text-gray-400" : "opacity-60"
        }`}
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
