import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendTelegramMessage } from "@/lib/telegram";

// ── Schema (mirror of client schema) ────────────────────────────────────────

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(
      /^[0-9()\-+\s.]+$/,
      "Phone number may only contain digits, spaces, and ( ) - + ."
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email address is too long"),
  service: z.string().optional(),
  preferredDate: z.string().optional(),
  address: z.string().max(200, "Address is too long").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1 000 characters or fewer"),
  emergency: z.boolean(),
  website: z.literal("").optional(),
});

// ── POST /api/contact ────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot check — bots fill the hidden field
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    (body as Record<string, unknown>).website !== ""
  ) {
    // Silently accept to not reveal the trap
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return NextResponse.json(
      {
        error:
          firstIssue?.message ??
          "Please check your form and try again.",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = result.data;

  // Build a human-readable area string for Telegram
  const area = [data.address, data.preferredDate]
    .filter(Boolean)
    .join(" | ") || undefined;

  const messageParts: string[] = [];
  if (data.emergency) {
    messageParts.push("🚨 EMERGENCY REQUEST");
  }
  if (data.service) {
    messageParts.push(data.service);
  }
  if (data.preferredDate) {
    messageParts.push(`Preferred date: ${data.preferredDate}`);
  }
  if (data.address) {
    messageParts.push(`Address: ${data.address}`);
  }
  messageParts.push(data.message);

  try {
    await sendTelegramMessage({
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      service: data.service,
      area,
      message: messageParts.join("\n"),
      source: "contact-form",
    });
  } catch (err) {
    console.error("[contact/route] Telegram send failed:", err);
    return NextResponse.json(
      {
        error:
          "We received your message but had trouble delivering it. Please call us directly at (720) 717-3990.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
