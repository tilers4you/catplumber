"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { NAV_ITEMS, PHONE, PHONE_LINK, BUSINESS_NAME } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = useCallback(() => setMobileOpen(true), []);
  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* Emergency banner */}
      <div className="bg-[#E74C3C] text-white text-center text-sm font-semibold py-2 px-4">
        <a
          href={PHONE_LINK}
          className="inline-flex items-center gap-2 hover:underline focus-visible:underline focus-visible:outline-none"
          aria-label={`24/7 Emergency plumbing. Call ${PHONE}`}
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          24/7 Emergency? Call{" "}
          <span className="underline decoration-white/60">{PHONE}</span>
        </a>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[#1B5E8A] rounded-lg"
              aria-label={`${BUSINESS_NAME} — Home`}
            >
              {/* Pipe + cat paw icon */}
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B5E8A] text-white text-lg font-black select-none"
                aria-hidden="true"
              >
                🐱
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-black text-[#1B5E8A] tracking-tight">
                  Cat
                  <span className="text-[#D4782F]">Plumber</span>
                </span>
                <span className="block text-[10px] font-medium text-gray-400 tracking-widest uppercase">
                  Denver&apos;s Best
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#2D3436] hover:bg-[#F5F5F0] hover:text-[#1B5E8A] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={PHONE_LINK}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#D4782F] px-4 py-2 text-sm font-bold text-white hover:bg-[#b8601f] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4782F]"
                aria-label={`Call ${PHONE}`}
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {PHONE}
              </a>

              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-[#2D3436] hover:bg-[#F5F5F0] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                onClick={openMenu}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={closeMenu} />
    </>
  );
}
