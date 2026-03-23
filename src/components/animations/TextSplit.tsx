"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TagName = "h1" | "h2" | "h3" | "p";

interface TextSplitProps {
  text: string;
  tag?: TagName;
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function TextSplit({
  text,
  tag: Tag = "h1",
  className,
  delay = 0,
  triggerOnScroll = false,
}: TextSplitProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    // Split text into individual letter spans
    const letters = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00a0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(24px)";
      return span;
    });

    el.textContent = "";
    letters.forEach((span) => el.appendChild(span));

    const animProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.025,
      ease: "power3.out",
      delay,
    };

    let anim: gsap.core.Tween;

    if (triggerOnScroll) {
      anim = gsap.to(letters, {
        ...animProps,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    } else {
      anim = gsap.to(letters, animProps);
    }

    return () => {
      anim.kill();
      if (triggerOnScroll) {
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === el)
          .forEach((t) => t.kill());
      }
      // Restore original text on unmount
      if (el) el.textContent = text;
    };
  }, [text, delay, triggerOnScroll]);

  return (
    // @ts-expect-error — dynamic tag cast
    <Tag ref={containerRef} className={className}>
      {text}
    </Tag>
  );
}
