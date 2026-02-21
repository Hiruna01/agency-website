import type { Booking, ServiceType } from "@prisma/client";

// ─── Telegram API types ─────────────────────────────────────────────

interface TelegramSendMessageResponse {
  ok: boolean;
  result?: {
    message_id: number;
    chat: { id: number; type: string };
    date: number;
    text?: string;
  };
  description?: string;
  error_code?: number;
}

// ─── Service label mapping ──────────────────────────────────────────

const SERVICE_LABELS: Record<ServiceType, string> = {
  WEB_DESIGN: "Web Design",
  WEB_DEVELOPMENT: "Web Development",
  ECOMMERCE: "E-Commerce",
  UIUX_DESIGN: "UI/UX Design",
  MAINTENANCE: "Maintenance",
  LANDING_PAGES: "Landing Pages",
  OTHER: "Other",
};

// ─── Reference generator ────────────────────────────────────────────

export function generateReference(): string {
  const year = new Date().getFullYear();
  const timestampPart = String(Date.now()).slice(-4);
  const randomSuffix = String(Math.floor(Math.random() * 100)).padStart(2, "0");

  return `BK-${year}-${timestampPart}${randomSuffix}`;
}

// ─── Date formatter ─────────────────────────────────────────────────

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Message formatters ─────────────────────────────────────────────

function formatConsultationMessage(booking: Booking): string {
  const lines: string[] = [
    `🔔 <b>New Consultation Booking</b>`,
    ``,
    `📋 <b>Reference:</b> ${booking.reference}`,
    `👤 <b>Name:</b> ${booking.fullName}`,
    `📧 <b>Email:</b> ${booking.email}`,
    `📱 <b>Phone:</b> ${booking.phone}`,
  ];

  if (booking.preferredDate) {
    lines.push(`📅 <b>Date:</b> ${formatDate(booking.preferredDate)}`);
  }

  if (booking.preferredTime) {
    lines.push(`🕒 <b>Time:</b> ${booking.preferredTime}`);
  }

  if (booking.source) {
    lines.push(`🔍 <b>Found us via:</b> ${booking.source}`);
  }

  if (booking.description) {
    lines.push(`💬 <b>Notes:</b> ${booking.description}`);
  }

  lines.push(``, `Status: 🟢 New`);

  return lines.join("\n");
}

function formatProjectMessage(booking: Booking): string {
  const lines: string[] = [
    `🚀 <b>New Project Brief</b>`,
    ``,
    `📋 <b>Reference:</b> ${booking.reference}`,
    `👤 <b>Name:</b> ${booking.fullName}`,
    `📧 <b>Email:</b> ${booking.email}`,
    `📱 <b>Phone:</b> ${booking.phone}`,
  ];

  if (booking.service) {
    lines.push(`🎯 <b>Service:</b> ${SERVICE_LABELS[booking.service]}`);
  }

  if (booking.budgetRange) {
    lines.push(`💰 <b>Budget:</b> ${booking.budgetRange}`);
  }

  if (booking.timeline) {
    lines.push(`⏰ <b>Timeline:</b> ${booking.timeline}`);
  }

  if (booking.source) {
    lines.push(`🔍 <b>Found us via:</b> ${booking.source}`);
  }

  if (booking.description) {
    lines.push(`📝 <b>Description:</b> ${booking.description}`);
  }

  lines.push(``, `Status: 🟢 New`);

  return lines.join("\n");
}

// ─── Main notification sender ───────────────────────────────────────

export async function sendBookingNotification(
  booking: Booking
): Promise<string | null> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error(
      "[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env variables"
    );
    return null;
  }

  const text =
    booking.type === "CONSULTATION"
      ? formatConsultationMessage(booking)
      : formatProjectMessage(booking);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    const data: TelegramSendMessageResponse = await response.json();

    if (!data.ok) {
      console.error(
        `[Telegram] API error: ${data.error_code} — ${data.description}`
      );
      return null;
    }

    return String(data.result?.message_id ?? null);
  } catch (error) {
    console.error("[Telegram] Failed to send notification:", error);
    return null;
  }
}
