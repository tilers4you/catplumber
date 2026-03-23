"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy-load the heavy Three.js scene — never SSR it
const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

// ── Device capability detection ───────────────────────────────────────────────
function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  // Check for hardware concurrency (< 4 logical cores = likely low-end)
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) {
    return true;
  }
  // Check for device memory (< 4 GB)
  if ("deviceMemory" in navigator && (navigator as { deviceMemory?: number }).deviceMemory !== undefined) {
    if (((navigator as { deviceMemory?: number }).deviceMemory ?? 8) < 4) return true;
  }
  return false;
}

// ── CSS gradient shown while Three.js loads or on low-end devices ─────────────
function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #0d3d5c 0%, #1B5E8A 40%, #164f78 70%, #0a2e45 100%)",
      }}
      aria-hidden="true"
    />
  );
}

// ── HeroCanvas ────────────────────────────────────────────────────────────────
export function HeroCanvas() {
  const [capable, setCapable] = useState<boolean | null>(null);

  useEffect(() => {
    setCapable(!isLowEndDevice());
  }, []);

  // While hydrating, render nothing (the hero section already has its own bg)
  if (capable === null) return null;

  if (!capable) return <GradientFallback />;

  return (
    <>
      {/* Gradient is visible instantly; Three.js canvas layers on top once loaded */}
      <GradientFallback />
      <HeroScene />
    </>
  );
}
