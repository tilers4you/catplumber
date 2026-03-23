"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PulseGlowProps {
  children: React.ReactNode;
  className?: string;
  /** Copper glow color — defaults to #D4782F */
  color?: string;
  /** Interval between pulses in seconds — defaults to 3 */
  interval?: number;
}

export function PulseGlow({
  children,
  className,
  color = "#D4782F",
  interval = 3,
}: PulseGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: interval - 0.6 });

    tl.to(el, {
      boxShadow: `0 0 0 0 ${color}00`,
      duration: 0,
    })
      .to(el, {
        boxShadow: `0 0 18px 6px ${color}66`,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(el, {
        boxShadow: `0 0 0 0 ${color}00`,
        duration: 0.3,
        ease: "power2.in",
      });

    return () => {
      tl.kill();
    };
  }, [color, interval]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </div>
  );
}
