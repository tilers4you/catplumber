"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FormSuccessProps {
  show: boolean;
}

const CONFETTI_COLORS = [
  "#D4782F",
  "#1B5E8A",
  "#2EC4B6",
  "#F5C842",
  "#E74C3C",
  "#6C5CE7",
];

const CONFETTI_COUNT = 18;

// Pre-generate stable confetti data to avoid re-randomising on each render
const CONFETTI_ITEMS = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${10 + (i / (CONFETTI_COUNT - 1)) * 80}%`,
  delay: `${(i * 0.07).toFixed(2)}s`,
  size: i % 3 === 0 ? 8 : i % 3 === 1 ? 6 : 5,
  rotate: `${(i * 47) % 360}deg`,
}));

export function FormSuccess({ show }: FormSuccessProps) {
  const checkRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const path = checkRef.current;
    const wrapper = wrapperRef.current;
    if (!path || !wrapper) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(path, { strokeDashoffset: 0, opacity: 1 });
      gsap.set(wrapper, { opacity: 1, scale: 1 });
      return;
    }

    // Measure path length for draw animation
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });

    // Fade + scale wrapper in
    gsap.fromTo(
      wrapper,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" }
    );

    // Draw the checkmark
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.55,
      delay: 0.2,
      ease: "power3.inOut",
    });
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={wrapperRef}
      role="status"
      aria-live="polite"
      className="relative overflow-hidden rounded-2xl bg-green-50 border border-green-200 p-8 text-center space-y-4"
      style={{ opacity: 0 }}
    >
      {/* CSS confetti dots */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        {CONFETTI_ITEMS.map((dot) => (
          <span
            key={dot.id}
            className="absolute top-0 animate-confetti-fall"
            style={{
              left: dot.left,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              borderRadius: dot.id % 2 === 0 ? "50%" : "2px",
              transform: `rotate(${dot.rotate})`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* Animated checkmark circle */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg
          viewBox="0 0 40 40"
          className="h-9 w-9"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={checkRef}
            d="M10 21 L17 28 L30 13"
            stroke="#16a34a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-green-800">Message Sent!</h2>
      <p className="text-green-700 text-sm leading-relaxed max-w-xs mx-auto">
        Thanks for reaching out. We&apos;ll review your request and get back to
        you within one business hour. For emergencies, call us directly at{" "}
        <a
          href="tel:+17207173990"
          className="font-semibold underline underline-offset-2"
        >
          (720) 717-3990
        </a>
        .
      </p>
    </div>
  );
}
