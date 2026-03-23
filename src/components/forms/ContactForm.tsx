"use client";

import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import { FormSuccess } from "@/components/animations/FormSuccess";

// ── Validation schema ────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
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
  address: z
    .string()
    .max(200, "Address is too long")
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1 000 characters or fewer"),
  emergency: z.boolean(),
  // honeypot — must be empty
  website: z.literal("").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

// ── Service options ──────────────────────────────────────────────────────────

const SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.name,
  label: `${s.icon}  ${s.name}`,
}));

// ── Component ────────────────────────────────────────────────────────────────

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    preferredDate: "",
    address: "",
    message: "",
    emergency: false,
    website: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string>("");

  // ── Helpers ────────────────────────────────────────────────────────────────

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ?? false) : value,
    }));

    // Clear per-field error on change
    if (name in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FieldErrors];
        return next;
      });
    }
  }

  function validate(): boolean {
    const result = contactFormSchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ContactFormValues;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setServerError(
          body.error ?? "Something went wrong. Please try again or call us directly."
        );
        setStatus("error");
      }
    } catch {
      setServerError(
        "Unable to send your message. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────

  if (status === "success") {
    return <FormSuccess show />;
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot – hidden from humans, bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={handleChange}
        />
      </div>

      {/* Row 1 — Name + Phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="fullName"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(720) 555-0100"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />
      </div>

      {/* Row 2 — Email + Service */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Select
          label="Service Needed"
          name="service"
          placeholder="Select a service…"
          options={SERVICE_OPTIONS}
          value={values.service ?? ""}
          onChange={handleChange}
          error={errors.service}
        />
      </div>

      {/* Row 3 — Preferred Date + Address */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Preferred Date"
          name="preferredDate"
          type="date"
          autoComplete="off"
          value={values.preferredDate ?? ""}
          onChange={handleChange}
          error={errors.preferredDate}
          min={new Date().toISOString().split("T")[0]}
          hint="Leave blank for ASAP"
        />
        <Input
          label="Address / Area"
          name="address"
          autoComplete="street-address"
          placeholder="Highlands Ranch, CO"
          value={values.address ?? ""}
          onChange={handleChange}
          error={errors.address}
        />
      </div>

      {/* Message */}
      <Textarea
        label="Message"
        name="message"
        required
        rows={4}
        maxLength={1000}
        currentLength={values.message.length}
        placeholder="Describe what's happening — e.g. dripping faucet in kitchen, no hot water since this morning…"
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      {/* Emergency toggle */}
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-[#F5F5F0] px-4 py-3 transition-colors has-[:checked]:border-[#E74C3C] has-[:checked]:bg-red-50/40">
        <input
          type="checkbox"
          name="emergency"
          id="checkbox-emergency"
          checked={values.emergency}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#E74C3C]"
          aria-describedby="emergency-desc"
        />
        <span className="text-sm leading-snug">
          <span className="font-semibold text-[#2D3436]">
            This is an emergency
          </span>
          <span
            id="emergency-desc"
            className="block text-gray-500 text-xs mt-0.5"
          >
            Burst pipe, active flooding, or no water — we&apos;ll prioritise your
            call.
          </span>
        </span>
      </label>

      {/* Server error */}
      {status === "error" && serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-2.5 rounded-lg border border-[#E74C3C]/30 bg-red-50 px-4 py-3"
        >
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-[#E74C3C]"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm.75-4.5a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v3z" />
          </svg>
          <p className="text-sm text-[#E74C3C]">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant={values.emergency ? "emergency" : "primary"}
        size="lg"
        disabled={status === "loading"}
        className="w-full"
        aria-label={
          status === "loading" ? "Sending your message…" : "Submit contact form"
        }
      >
        {status === "loading" ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
              />
            </svg>
            Sending…
          </>
        ) : values.emergency ? (
          "Send Emergency Request"
        ) : (
          "Get My Free Quote"
        )}
      </Button>

      <p className="text-center text-xs text-gray-400">
        We never share your information. Typical response: under 1 hour during
        business hours.
      </p>
    </form>
  );
}
