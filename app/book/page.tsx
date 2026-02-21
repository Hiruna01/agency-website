"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileText,
  Loader2,
  AlertCircle,
  Sparkles,
  Clock,
  Mail,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import {
  consultationSchema,
  projectSchema,
  TIME_SLOTS,
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/validations/booking";
import type { ConsultationInput, ProjectInput } from "@/lib/validations/booking";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { BookingToast } from "@/components/booking/BookingToast";

// ─── Types ──────────────────────────────────────────────────────────

type BookingType = "CONSULTATION" | "PROJECT";

interface ApiSuccessResponse {
  success: true;
  reference: string;
}

interface ApiErrorResponse {
  success: false;
  error?: string;
  errors?: {
    formErrors: string[];
    fieldErrors: Record<string, string[]>;
  };
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// ─── Constants ──────────────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: "+94", label: "🇱🇰 +94", country: "Sri Lanka" },
  { code: "+1", label: "🇺🇸 +1", country: "US" },
  { code: "+44", label: "🇬🇧 +44", country: "UK" },
  { code: "+91", label: "🇮🇳 +91", country: "India" },
  { code: "+61", label: "🇦🇺 +61", country: "Australia" },
  { code: "+971", label: "🇦🇪 +971", country: "UAE" },
  { code: "+65", label: "🇸🇬 +65", country: "Singapore" },
  { code: "+49", label: "🇩🇪 +49", country: "Germany" },
  { code: "+33", label: "🇫🇷 +33", country: "France" },
  { code: "+81", label: "🇯🇵 +81", country: "Japan" },
] as const;

const SERVICE_LABELS: Record<(typeof SERVICE_OPTIONS)[number], string> = {
  WEB_DESIGN: "Web Design",
  WEB_DEVELOPMENT: "Web Development",
  ECOMMERCE: "E-Commerce",
  UIUX_DESIGN: "UI/UX Design",
  MAINTENANCE: "Maintenance & Support",
  LANDING_PAGES: "Landing Pages",
  OTHER: "Other",
};

const SOURCE_OPTIONS = [
  "Google Search",
  "Social Media",
  "Referral",
  "Previous Client",
  "Other",
] as const;

// ─── Animations ─────────────────────────────────────────────────────

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUpItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

// ─── Helper: get tomorrow's date as YYYY-MM-DD ─────────────────────

function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

// ─── Field wrapper component ────────────────────────────────────────

function FieldGroup({
  label,
  htmlFor,
  error,
  children,
  icon,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUpItem} className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
      >
        {icon && <span className="text-brand-muted">{icon}</span>}
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${htmlFor}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[13px] text-red-500 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Input base classes ─────────────────────────────────────────────

const inputBase =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-brand-dark placeholder:text-gray-400 transition-all duration-200 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400";

const inputError = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

const selectBase =
  "w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-base text-brand-dark transition-all duration-200 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat";

// ─── Main Page Component ────────────────────────────────────────────

interface SuccessData {
  reference: string;
  type: BookingType;
  name: string;
  preferredDate?: string;
  preferredTime?: string;
}

interface ToastData {
  message: string;
  description?: string;
  variant: "success" | "error" | "warning";
}

export default function BookingPage() {
  const [bookingType, setBookingType] = useState<BookingType>("CONSULTATION");
  const [countryCode, setCountryCode] = useState("+94");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);

  // ─── Form setup with discriminated schemas ────────────────────────

  const consultationForm = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      type: "CONSULTATION",
      fullName: "",
      email: "",
      phone: "",
      source: undefined,
      preferredDate: "",
      preferredTime: "" as ConsultationInput["preferredTime"],
      description: "",
    },
    mode: "onTouched",
  });

  const projectForm = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      type: "PROJECT",
      fullName: "",
      email: "",
      phone: "",
      source: undefined,
      service: "" as ProjectInput["service"],
      budgetRange: "" as ProjectInput["budgetRange"],
      timeline: "" as ProjectInput["timeline"],
      description: "",
    },
    mode: "onTouched",
  });

  const activeForm = bookingType === "CONSULTATION" ? consultationForm : projectForm;

  // ─── Toggle handler (preserve shared fields) ─────────────────────

  const handleToggle = useCallback(
    (newType: BookingType) => {
      if (newType === bookingType) return;

      const currentValues = activeForm.getValues();
      const shared = {
        fullName: currentValues.fullName,
        email: currentValues.email,
        phone: currentValues.phone,
        source: currentValues.source,
      };

      if (newType === "CONSULTATION") {
        consultationForm.reset({
          type: "CONSULTATION",
          ...shared,
          preferredDate: "",
          preferredTime: "" as ConsultationInput["preferredTime"],
          description: "",
        });
      } else {
        projectForm.reset({
          type: "PROJECT",
          ...shared,
          service: "" as ProjectInput["service"],
          budgetRange: "" as ProjectInput["budgetRange"],
          timeline: "" as ProjectInput["timeline"],
          description: "",
        });
      }

      setBookingType(newType);
    },
    [bookingType, activeForm, consultationForm, projectForm]
  );

  // ─── Toast helper ──────────────────────────────────────────────

  const showToast = useCallback(
    (message: string, variant: "success" | "error" | "warning", description?: string) => {
      setToast({ message, description, variant });
    },
    []
  );

  const dismissToast = useCallback(() => setToast(null), []);

  // ─── Submit handler ──────────────────────────────────────────────

  const onSubmit = useCallback(
    async (data: ConsultationInput | ProjectInput) => {
      setIsSubmitting(true);

      const payload = {
        ...data,
        phone: `${countryCode}${data.phone}`,
      };

      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json: ApiResponse = await res.json();

        if (res.status === 201 && json.success) {
          setSuccessData({
            reference: json.reference,
            type: data.type,
            name: data.fullName,
            preferredDate:
              data.type === "CONSULTATION"
                ? (data as ConsultationInput).preferredDate
                : undefined,
            preferredTime:
              data.type === "CONSULTATION"
                ? (data as ConsultationInput).preferredTime
                : undefined,
          });
          showToast(
            "Booking submitted successfully!",
            "success",
            `Reference: ${json.reference}`
          );
          return;
        }

        if (res.status === 400 && !json.success && "errors" in json && json.errors) {
          const { fieldErrors } = json.errors;
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              activeForm.setError(field as keyof typeof data, {
                type: "server",
                message: messages[0],
              });
            }
          });
          return;
        }

        if (res.status === 429) {
          showToast("Too many requests, please try again later.", "warning");
          return;
        }

        showToast("Something went wrong, please try again.", "error");
      } catch {
        showToast("Something went wrong, please try again.", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [countryCode, activeForm, showToast]
  );

  // ─── Textarea watchers ───────────────────────────────────────────

  const consultationDescription = consultationForm.watch("description") ?? "";
  const projectDescription = projectForm.watch("description") ?? "";

  const descriptionLength = bookingType === "CONSULTATION"
    ? consultationDescription.length
    : projectDescription.length;

  const descriptionMax = bookingType === "CONSULTATION" ? 500 : 2000;

  // ─── Tomorrow's date for min attribute ───────────────────────────

  const tomorrowDate = useMemo(() => getTomorrowDate(), []);

  // ─── Book Another handler ──────────────────────────────────────

  const handleBookAnother = useCallback(() => {
    setSuccessData(null);
    setBookingType("CONSULTATION");
    consultationForm.reset();
    projectForm.reset();
  }, [consultationForm, projectForm]);

  // ─── Render ──────────────────────────────────────────────────────

  if (successData) {
    return (
      <main className="min-h-screen bg-[#F9FAFB]">
        {/* Success toast */}
        <AnimatePresence>
          {toast && (
            <BookingToast
              message={toast.message}
              description={toast.description}
              variant={toast.variant}
              onDismiss={dismissToast}
            />
          )}
        </AnimatePresence>

        <div className="mx-auto max-w-2xl px-5 py-16 md:py-24">
          <BookingConfirmation
            reference={successData.reference}
            type={successData.type}
            name={successData.name}
            preferredDate={successData.preferredDate}
            preferredTime={successData.preferredTime}
            onBookAnother={handleBookAnother}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <BookingToast
            message={toast.message}
            description={toast.description}
            variant={toast.variant}
            onDismiss={dismissToast}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-2xl px-5 py-12 md:py-20">
        {/* ── Page header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-secondary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-[34px] font-extrabold text-brand-primary tracking-tight mb-3">
            Let&apos;s Work Together
          </h1>
          <p className="text-base text-brand-body leading-relaxed max-w-lg">
            Tell us about your project or book a free consultation. We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* ── Form card ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
        >
          {/* ── Segmented toggle ────────────────────────────────── */}
          <div className="mb-8">
            <div role="tablist" aria-label="Booking type" className="flex rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                role="tab"
                aria-selected={bookingType === "CONSULTATION"}
                onClick={() => handleToggle("CONSULTATION")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  bookingType === "CONSULTATION"
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Book a</span> Consultation
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={bookingType === "PROJECT"}
                onClick={() => handleToggle("PROJECT")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  bookingType === "PROJECT"
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Submit a</span> Project Brief
              </button>
            </div>
          </div>

          {/* ── Form body ───────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {bookingType === "CONSULTATION" ? (
              <motion.form
                key="consultation"
                {...fadeIn}
                onSubmit={consultationForm.handleSubmit(onSubmit)}
                noValidate
              >
                <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FieldGroup
                      label="Full Name"
                      htmlFor="c-fullName"
                      error={consultationForm.formState.errors.fullName?.message}
                      icon={<User className="h-3.5 w-3.5" />}
                    >
                      <input
                        id="c-fullName"
                        type="text"
                        placeholder="John Smith"
                        disabled={isSubmitting}
                        aria-invalid={!!consultationForm.formState.errors.fullName}
                        aria-describedby={consultationForm.formState.errors.fullName ? "c-fullName-error" : undefined}
                        className={`${inputBase} ${consultationForm.formState.errors.fullName ? inputError : ""}`}
                        {...consultationForm.register("fullName")}
                      />
                    </FieldGroup>

                    <FieldGroup
                      label="Email Address"
                      htmlFor="c-email"
                      error={consultationForm.formState.errors.email?.message}
                      icon={<Mail className="h-3.5 w-3.5" />}
                    >
                      <input
                        id="c-email"
                        type="email"
                        placeholder="john@example.com"
                        disabled={isSubmitting}
                        aria-invalid={!!consultationForm.formState.errors.email}
                        aria-describedby={consultationForm.formState.errors.email ? "c-email-error" : undefined}
                        className={`${inputBase} ${consultationForm.formState.errors.email ? inputError : ""}`}
                        {...consultationForm.register("email")}
                      />
                    </FieldGroup>
                  </div>

                  {/* Phone */}
                  <FieldGroup
                    label="Phone Number"
                    htmlFor="c-phone"
                    error={consultationForm.formState.errors.phone?.message}
                    icon={<Phone className="h-3.5 w-3.5" />}
                  >
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={isSubmitting}
                        className={`${selectBase} w-[110px] shrink-0`}
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id="c-phone"
                        type="tel"
                        placeholder="771234567"
                        disabled={isSubmitting}
                        aria-invalid={!!consultationForm.formState.errors.phone}
                        aria-describedby={consultationForm.formState.errors.phone ? "c-phone-error" : undefined}
                        className={`${inputBase} ${consultationForm.formState.errors.phone ? inputError : ""}`}
                        {...consultationForm.register("phone")}
                      />
                    </div>
                  </FieldGroup>

                  {/* Date + Time row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FieldGroup
                      label="Preferred Date"
                      htmlFor="c-date"
                      error={consultationForm.formState.errors.preferredDate?.message}
                      icon={<Calendar className="h-3.5 w-3.5" />}
                    >
                      <input
                        id="c-date"
                        type="date"
                        min={tomorrowDate}
                        disabled={isSubmitting}
                        aria-invalid={!!consultationForm.formState.errors.preferredDate}
                        aria-describedby={consultationForm.formState.errors.preferredDate ? "c-date-error" : undefined}
                        className={`${inputBase} ${consultationForm.formState.errors.preferredDate ? inputError : ""}`}
                        {...consultationForm.register("preferredDate")}
                      />
                    </FieldGroup>

                    <FieldGroup
                      label="Preferred Time"
                      htmlFor="c-time"
                      error={consultationForm.formState.errors.preferredTime?.message}
                      icon={<Clock className="h-3.5 w-3.5" />}
                    >
                      <select
                        id="c-time"
                        disabled={isSubmitting}
                        aria-invalid={!!consultationForm.formState.errors.preferredTime}
                        aria-describedby={consultationForm.formState.errors.preferredTime ? "c-time-error" : undefined}
                        className={`${selectBase} ${consultationForm.formState.errors.preferredTime ? inputError : ""}`}
                        {...consultationForm.register("preferredTime")}
                      >
                        <option value="" disabled>
                          Select a time slot
                        </option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>
                  </div>

                  {/* How did you find us */}
                  <FieldGroup label="How did you find us?" htmlFor="c-source" icon={<Sparkles className="h-3.5 w-3.5" />}>
                    <select
                      id="c-source"
                      disabled={isSubmitting}
                      className={selectBase}
                      {...consultationForm.register("source")}
                    >
                      <option value="">Select an option (optional)</option>
                      {SOURCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  {/* Notes */}
                  <FieldGroup
                    label="Additional Notes"
                    htmlFor="c-description"
                    error={consultationForm.formState.errors.description?.message}
                    icon={<MessageSquare className="h-3.5 w-3.5" />}
                  >
                    <textarea
                      id="c-description"
                      rows={4}
                      placeholder="Tell us briefly what you'd like to discuss..."
                      disabled={isSubmitting}
                      aria-invalid={!!consultationForm.formState.errors.description}
                      aria-describedby={consultationForm.formState.errors.description ? "c-description-error" : undefined}
                      className={`${inputBase} min-h-[120px] resize-y ${consultationForm.formState.errors.description ? inputError : ""}`}
                      {...consultationForm.register("description")}
                    />
                    <div className="flex justify-end">
                      <span
                        className={`text-xs ${
                          descriptionLength > descriptionMax
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {descriptionLength}/{descriptionMax}
                      </span>
                    </div>
                  </FieldGroup>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-primary/25 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Booking Request
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form
                key="project"
                {...fadeIn}
                onSubmit={projectForm.handleSubmit(onSubmit)}
                noValidate
              >
                <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FieldGroup
                      label="Full Name"
                      htmlFor="p-fullName"
                      error={projectForm.formState.errors.fullName?.message}
                      icon={<User className="h-3.5 w-3.5" />}
                    >
                      <input
                        id="p-fullName"
                        type="text"
                        placeholder="Jane Doe"
                        disabled={isSubmitting}
                        aria-invalid={!!projectForm.formState.errors.fullName}
                        aria-describedby={projectForm.formState.errors.fullName ? "p-fullName-error" : undefined}
                        className={`${inputBase} ${projectForm.formState.errors.fullName ? inputError : ""}`}
                        {...projectForm.register("fullName")}
                      />
                    </FieldGroup>

                    <FieldGroup
                      label="Email Address"
                      htmlFor="p-email"
                      error={projectForm.formState.errors.email?.message}
                      icon={<Mail className="h-3.5 w-3.5" />}
                    >
                      <input
                        id="p-email"
                        type="email"
                        placeholder="jane@company.com"
                        disabled={isSubmitting}
                        aria-invalid={!!projectForm.formState.errors.email}
                        aria-describedby={projectForm.formState.errors.email ? "p-email-error" : undefined}
                        className={`${inputBase} ${projectForm.formState.errors.email ? inputError : ""}`}
                        {...projectForm.register("email")}
                      />
                    </FieldGroup>
                  </div>

                  {/* Phone */}
                  <FieldGroup
                    label="Phone Number"
                    htmlFor="p-phone"
                    error={projectForm.formState.errors.phone?.message}
                    icon={<Phone className="h-3.5 w-3.5" />}
                  >
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={isSubmitting}
                        className={`${selectBase} w-[110px] shrink-0`}
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id="p-phone"
                        type="tel"
                        placeholder="771234567"
                        disabled={isSubmitting}
                        aria-invalid={!!projectForm.formState.errors.phone}
                        aria-describedby={projectForm.formState.errors.phone ? "p-phone-error" : undefined}
                        className={`${inputBase} ${projectForm.formState.errors.phone ? inputError : ""}`}
                        {...projectForm.register("phone")}
                      />
                    </div>
                  </FieldGroup>

                  {/* Service + Budget row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FieldGroup
                      label="Service Needed"
                      htmlFor="p-service"
                      error={projectForm.formState.errors.service?.message}
                    >
                      <select
                        id="p-service"
                        disabled={isSubmitting}
                        aria-invalid={!!projectForm.formState.errors.service}
                        aria-describedby={projectForm.formState.errors.service ? "p-service-error" : undefined}
                        className={`${selectBase} ${projectForm.formState.errors.service ? inputError : ""}`}
                        {...projectForm.register("service")}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICE_OPTIONS.map((key) => (
                          <option key={key} value={key}>
                            {SERVICE_LABELS[key]}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>

                    <FieldGroup
                      label="Budget Range"
                      htmlFor="p-budget"
                      error={projectForm.formState.errors.budgetRange?.message}
                    >
                      <select
                        id="p-budget"
                        disabled={isSubmitting}
                        aria-invalid={!!projectForm.formState.errors.budgetRange}
                        aria-describedby={projectForm.formState.errors.budgetRange ? "p-budget-error" : undefined}
                        className={`${selectBase} ${projectForm.formState.errors.budgetRange ? inputError : ""}`}
                        {...projectForm.register("budgetRange")}
                      >
                        <option value="" disabled>
                          Select budget
                        </option>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>
                  </div>

                  {/* Timeline */}
                  <FieldGroup
                    label="Project Timeline"
                    htmlFor="p-timeline"
                    error={projectForm.formState.errors.timeline?.message}
                    icon={<Clock className="h-3.5 w-3.5" />}
                  >
                    <select
                      id="p-timeline"
                      disabled={isSubmitting}
                      aria-invalid={!!projectForm.formState.errors.timeline}
                      aria-describedby={projectForm.formState.errors.timeline ? "p-timeline-error" : undefined}
                      className={`${selectBase} ${projectForm.formState.errors.timeline ? inputError : ""}`}
                      {...projectForm.register("timeline")}
                    >
                      <option value="" disabled>
                        Select timeline
                      </option>
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  {/* How did you find us */}
                  <FieldGroup label="How did you find us?" htmlFor="p-source" icon={<Sparkles className="h-3.5 w-3.5" />}>
                    <select
                      id="p-source"
                      disabled={isSubmitting}
                      className={selectBase}
                      {...projectForm.register("source")}
                    >
                      <option value="">Select an option (optional)</option>
                      {SOURCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  {/* Description */}
                  <FieldGroup
                    label="Project Description"
                    htmlFor="p-description"
                    error={projectForm.formState.errors.description?.message}
                    icon={<MessageSquare className="h-3.5 w-3.5" />}
                  >
                    <textarea
                      id="p-description"
                      rows={5}
                      placeholder="Describe your project goals, features you need, and any relevant details..."
                      disabled={isSubmitting}
                      aria-invalid={!!projectForm.formState.errors.description}
                      aria-describedby={projectForm.formState.errors.description ? "p-description-error" : undefined}
                      className={`${inputBase} min-h-[160px] resize-y ${projectForm.formState.errors.description ? inputError : ""}`}
                      {...projectForm.register("description")}
                    />
                    <div className="flex justify-end">
                      <span
                        className={`text-xs ${
                          descriptionLength > descriptionMax
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {descriptionLength}/{descriptionMax}
                      </span>
                    </div>
                  </FieldGroup>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-primary/25 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Booking Request
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Footer note ────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-xs text-brand-muted"
        >
          By submitting this form, you agree to be contacted regarding your inquiry. We respect your privacy.
        </motion.p>
      </div>
    </main>
  );
}
