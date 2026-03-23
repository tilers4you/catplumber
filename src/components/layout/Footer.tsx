import Link from "next/link";
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_LINK,
  ADDRESS,
  EMAIL,
  NAV_ITEMS,
  SERVICES,
  SERVICE_AREAS,
} from "@/lib/constants";

const QUICK_LINKS = [
  { label: "Free Estimate", href: "/contact#estimate" },
  { label: "DIY Guides", href: "/diy-guides" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D3436] text-gray-300" aria-label="Site footer">
      {/* Emergency CTA bar */}
      <div className="bg-[#1B5E8A] py-4 px-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-center sm:text-left">
            Plumbing emergency? We&apos;re available 24/7 — fast response
            guaranteed.
          </p>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center gap-2 shrink-0 rounded-lg bg-[#E74C3C] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#c0392b] transition-colors focus-visible:outline-2 focus-visible:outline-white"
            aria-label={`Call us at ${PHONE} now`}
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call {PHONE}
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand / NAP */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-white"
              aria-label={`${BUSINESS_NAME} — Home`}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B5E8A] text-lg select-none"
                aria-hidden="true"
              >
                🐱
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Cat<span className="text-[#D4782F]">Plumber</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Denver&apos;s trusted local plumber. Family-owned, fully licensed
              &amp; insured. Available 24/7 for emergencies.
            </p>

            {/* NAP */}
            <address className="not-italic space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-[#2EC4B6]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.145 16.085 16.085 0 0 0 3.049-2.567C15.193 14.48 17 11.89 17 9A7 7 0 1 0 3 9c0 2.89 1.807 5.48 3.336 7.21a16.087 16.087 0 0 0 3.049 2.567 5.743 5.743 0 0 0 .281.145l.018.008.006.003zM10 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    clipRule="evenodd"
                  />
                </svg>
                {ADDRESS}
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 shrink-0 text-[#2EC4B6]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href={PHONE_LINK}
                  className="hover:text-white transition-colors focus-visible:outline-1 focus-visible:outline-white"
                >
                  {PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 shrink-0 text-[#2EC4B6]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z" />
                  <path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z" />
                </svg>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-white transition-colors focus-visible:outline-1 focus-visible:outline-white"
                >
                  {EMAIL}
                </a>
              </p>
            </address>

            <p className="text-xs text-gray-500">
              License #: CO-PLB-2024-00142
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Services
            </h2>
            <ul className="space-y-2" role="list">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm hover:text-white transition-colors focus-visible:outline-1 focus-visible:outline-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Service Areas */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Service Areas
            </h2>
            <ul className="space-y-2" role="list">
              {SERVICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="text-sm hover:text-white transition-colors focus-visible:outline-1 focus-visible:outline-white"
                  >
                    {area.name}
                    <span className="ml-1.5 text-xs text-gray-500">
                      {area.distance}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Quick Links */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors focus-visible:outline-1 focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2" role="list">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors focus-visible:outline-1 focus-visible:outline-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {currentYear} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p>
            Proudly serving the Denver metro area. Licensed &amp; Insured.
          </p>
        </div>
      </div>
    </footer>
  );
}
