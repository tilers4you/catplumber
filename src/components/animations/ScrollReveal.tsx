"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      ...(direction === "up" && { y: 40 }),
      ...(direction === "left" && { x: -40 }),
      ...(direction === "right" && { x: 40 }),
    };

    gsap.set(el, fromVars);

    const anim = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
