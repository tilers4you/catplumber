import type { Metadata } from "next";
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_LINK,
  ADDRESS,
  EMAIL,
  HOURS_DISPLAY,
  SERVICE_AREAS,
  SITE_URL,
} from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GoogleMap } from "@/components/maps/GoogleMap";

export const metadata: Metadata = {
  title: `Contact ${BUSINESS_NAME} — Get a Free Quote`,
  description:
    "Contact CatPlumber for expert plumbing services in Denver & the surrounding area. Fill out our quick form or call (720) 717-3990 — we respond within one hour.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact ${BUSINESS_NAME} — Get a Free Quote`,
    description:
      "Reach out for a free quote on plumbing services in Denver, Englewood, Highlands Ranch, and surrounding areas.",
    url: `${SITE_URL}/contact`,
  },
};

// ── Info card sub-components ─────────────────────────────────────────────────

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1B5E8A]/10 text-[#1B5E8A]">
        {icon}
      </span>
      <div className="text-sm leading-snug text-gray-700">{children}</div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="bg-[#1B5E8A] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <h1 className="font-[family-name:var(--font-space-grotesk)] mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Contact {BUSINESS_NAME} — Get a Free Quote
          </h1>
          <p className="mt-3 text-blue-200 text-lg max-w-2xl leading-relaxed">
            Tell us what you need and we&apos;ll get back to you within one business
            hour. For emergencies, call us directly.
          </p>
        </div>
      </section>

      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F0] py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            {/* ── Left — Form ─────────────────────────────────────────── */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#2D3436] mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* ── Right — Business info ────────────────────────────── */}
            <aside aria-label="Business information">
              <div className="space-y-8">
                {/* Contact details card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#2D3436]">
                    Contact Details
                  </h2>

                  <InfoRow
                    icon={
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    }
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-0.5">
                      Phone
                    </p>
                    <a
                      href={PHONE_LINK}
                      className="text-[#1B5E8A] font-semibold text-base hover:underline underline-offset-2"
                      aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                    >
                      {PHONE}
                    </a>
                  </InfoRow>

                  <InfoRow
                    icon={
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-0.5">
                      Email
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-[#1B5E8A] font-medium hover:underline underline-offset-2"
                    >
                      {EMAIL}
                    </a>
                  </InfoRow>

                  <InfoRow
                    icon={
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-0.5">
                      Address
                    </p>
                    <address className="not-italic leading-snug">{ADDRESS}</address>
                  </InfoRow>
                </div>

                {/* Hours card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#2D3436] mb-4 flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-[#D4782F]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6l4 2"
                      />
                    </svg>
                    Business Hours
                  </h2>
                  <ul className="space-y-2">
                    {HOURS_DISPLAY.map(({ days, hours }) => (
                      <li
                        key={days}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{days}</span>
                        <span className="font-medium text-[#2D3436]">
                          {hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-lg bg-[#E74C3C]/10 px-3 py-2 text-xs text-[#E74C3C] font-medium">
                    🚨 Emergency calls answered 24 / 7
                  </p>
                </div>

                {/* Service areas card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#2D3436] mb-4">
                    Service Areas
                  </h2>
                  <ul
                    className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm text-gray-600"
                    role="list"
                  >
                    {SERVICE_AREAS.map((area) => (
                      <li key={area.slug} className="flex items-center gap-1.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#2EC4B6] shrink-0"
                          aria-hidden="true"
                        />
                        {area.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map */}
                <GoogleMap
                  address={ADDRESS}
                  city="Englewood"
                  className="h-56 w-full shadow-sm border border-gray-100"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
