import { z } from "zod";

// ─── Shared constants (used by forms for dropdowns) ─────────────────

export const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
] as const;

export const BUDGET_RANGES = [
  "Under $500",
  "$500 - $1,500",
  "$1,500 - $4,000",
  "$4,000+",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1-2 weeks",
  "1 month",
  "Flexible",
] as const;

export const SERVICE_OPTIONS = [
  "WEB_DESIGN",
  "WEB_DEVELOPMENT",
  "ECOMMERCE",
  "UIUX_DESIGN",
  "MAINTENANCE",
  "LANDING_PAGES",
  "OTHER",
] as const;

// ─── Base schema (shared fields) ────────────────────────────────────

const baseBookingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long"),
  source: z
    .string()
    .trim()
    .optional(),
});

// ─── Consultation schema ────────────────────────────────────────────

export const consultationSchema = baseBookingSchema.extend({
  type: z.literal("CONSULTATION"),
  preferredDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        if (isNaN(date.getTime())) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: "Please select a future date" }
    ),
  preferredTime: z.enum(TIME_SLOTS, {
    error: "Please select a valid time slot",
  }),
  description: z
    .string()
    .trim()
    .max(500, "Notes must be under 500 characters")
    .optional(),
});

// ─── Project schema ─────────────────────────────────────────────────

export const projectSchema = baseBookingSchema.extend({
  type: z.literal("PROJECT"),
  service: z.enum(SERVICE_OPTIONS, {
    error: "Please select a service",
  }),
  budgetRange: z.enum(BUDGET_RANGES, {
    error: "Please select a budget range",
  }),
  timeline: z.enum(TIMELINE_OPTIONS, {
    error: "Please select a timeline",
  }),
  description: z
    .string()
    .trim()
    .min(10, "Please describe your project (at least 10 characters)")
    .max(2000, "Description must be under 2000 characters"),
});

// ─── Discriminated union ────────────────────────────────────────────

export const bookingSchema = z.discriminatedUnion("type", [
  consultationSchema,
  projectSchema,
]);

// ─── Inferred types ─────────────────────────────────────────────────

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
