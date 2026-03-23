import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BUSINESS_NAME, PHONE, PHONE_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Page Not Found | ${BUSINESS_NAME}`,
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F5F5F0] px-4 py-20 text-center">
      {/* Decorative pipe illustration */}
      <div aria-hidden="true" className="mb-6 text-6xl select-none">
        🔧
      </div>

      <p className="text-sm font-semibold uppercase tracking-widest text-[#D4782F] mb-2">
        404 — Page Not Found
      </p>

      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3">
        Looks like this pipe leads nowhere.
      </h1>

      <p className="text-gray-500 text-lg max-w-md leading-relaxed mb-8">
        The page you&apos;re looking for has moved, been removed, or never existed.
        Let us point you in the right direction.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>
        <Button href="/contact" variant="secondary" size="lg" className="bg-transparent text-[#1B5E8A] border-[#1B5E8A] hover:bg-[#1B5E8A] hover:text-white">
          Request a Quote
        </Button>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Need help right now?{" "}
        <Link
          href={PHONE_LINK}
          className="font-semibold text-[#1B5E8A] hover:underline underline-offset-2"
          aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
        >
          Call us at {PHONE}
        </Link>
      </p>
    </main>
  );
}
