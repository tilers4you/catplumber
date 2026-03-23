"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { PHONE, PHONE_LINK } from "@/lib/constants";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F5F5F0] px-4 py-20 text-center">
      <div aria-hidden="true" className="mb-6 text-6xl select-none">
        💧
      </div>

      <p className="text-sm font-semibold uppercase tracking-widest text-[#E74C3C] mb-2">
        Something went wrong
      </p>

      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3">
        We&apos;ve hit an unexpected snag.
      </h1>

      <p className="text-gray-500 text-lg max-w-md leading-relaxed mb-8">
        Our team has been notified. Try refreshing the page — if the problem
        persists, give us a call and we&apos;ll sort it out.
      </p>

      {error.digest && (
        <p className="mb-6 text-xs text-gray-400 font-mono bg-gray-100 rounded px-3 py-1.5">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={reset}
          aria-label="Try reloading the page"
        >
          Try Again
        </Button>
        <Button href="/" variant="secondary" size="lg" className="bg-transparent text-[#1B5E8A] border-[#1B5E8A] hover:bg-[#1B5E8A] hover:text-white">
          Back to Home
        </Button>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Need immediate help?{" "}
        <a
          href={PHONE_LINK}
          className="font-semibold text-[#1B5E8A] hover:underline underline-offset-2"
          aria-label={`Call CatPlumber at ${PHONE}`}
        >
          Call {PHONE}
        </a>
      </p>
    </main>
  );
}
