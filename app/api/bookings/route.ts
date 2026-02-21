import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { BookingType, ServiceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations/booking";
import {
  generateReference,
  sendBookingNotification,
} from "@/lib/telegram";

// ─── In-memory rate limiter ─────────────────────────────────────────
// Allows 5 requests per IP per hour. Can be swapped for Upstash Redis later.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up expired entry
  if (entry && now >= entry.resetAt) {
    rateLimitMap.delete(ip);
  }

  const current = rateLimitMap.get(ip);

  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

// ─── Helper: get client IP ──────────────────────────────────────────

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

// ─── POST /api/bookings ─────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Rate limiting
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body: unknown = await request.json();

    // 3. Validate
    const validated = bookingSchema.parse(body);

    // 4. Generate reference
    const reference = generateReference();

    // 5. Map validated data to Prisma create input
    const booking = await prisma.booking.create({
      data: {
        reference,
        type: validated.type as BookingType,
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        source: validated.source ?? null,
        description: validated.description ?? null,

        // Consultation-specific fields
        preferredDate:
          validated.type === "CONSULTATION"
            ? new Date(validated.preferredDate)
            : null,
        preferredTime:
          validated.type === "CONSULTATION"
            ? validated.preferredTime
            : null,

        // Project-specific fields
        service:
          validated.type === "PROJECT"
            ? (validated.service as ServiceType)
            : null,
        budgetRange:
          validated.type === "PROJECT" ? validated.budgetRange : null,
        timeline:
          validated.type === "PROJECT" ? validated.timeline : null,
      },
    });

    // 6. Send Telegram notification (non-blocking for the response)
    const telegramMsgId = await sendBookingNotification(booking);

    if (telegramMsgId) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { telegramMsgId },
      });
    }

    // 7. Return success
    return NextResponse.json(
      { success: true, reference: booking.reference },
      { status: 201 }
    );
  } catch (error) {
    // Zod validation errors → 400
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten() },
        { status: 400 }
      );
    }

    // Unexpected errors → 500 (never expose details)
    console.error("[Bookings API] Unexpected error:", error);

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
