"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS, PHONE, PHONE_LINK } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        // Return focus to the hamburger button would be handled in parent
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements =
      menuRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    // Focus first element when menu opens
    firstEl?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-[#2D3436]/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-bold text-[#1B5E8A]">Menu</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#2D3436] hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[#1B5E8A] transition-colors"
            aria-label="Close navigation menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-[#2D3436] hover:bg-[#F5F5F0] hover:text-[#1B5E8A] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer CTA */}
        <div className="border-t border-gray-100 px-5 py-5 space-y-3">
          <a
            href={PHONE_LINK}
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#E74C3C] px-4 py-3.5 text-base font-bold text-white hover:bg-[#c0392b] transition-colors focus-visible:outline-2 focus-visible:outline-[#E74C3C]"
            aria-label={`Call us at ${PHONE} for emergency plumbing`}
          >
            <svg
              className="h-5 w-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Emergency: {PHONE}
          </a>

          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="flex items-center justify-center w-full rounded-xl border-2 border-[#1B5E8A] px-4 py-3 text-base font-semibold text-[#1B5E8A] hover:bg-[#1B5E8A] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
          >
            Free Estimate
          </Link>
        </div>
      </div>
    </>
  );
}
