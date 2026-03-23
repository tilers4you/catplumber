import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, PHONE, PHONE_LINK, SERVICES, SITE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Professional Plumbing Services in Denver, CO | ${BUSINESS_NAME}`,
  description:
    "Explore CatPlumber's full range of professional plumbing services in Denver and the surrounding metro. Drain cleaning, water heaters, leak repair, toilet replacement, and more. Licensed & insured.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: `Professional Plumbing Services in Denver, CO | ${BUSINESS_NAME}`,
    description:
      "Full-service plumbing in Denver and the surrounding metro. Same-day appointments, flat-rate pricing, licensed master plumbers.",
    url: `${SITE_URL}/services`,
  },
};

const SERVICE_DETAILS: Record<
  string,
  { tagline: string; bullets: string[] }
> = {
  "toilet-replacement": {
    tagline: "Old toilet constantly running or cracking? We replace it fast.",
    bullets: [
      "All major brands in stock",
      "Water-efficient models available",
      "Complete removal & haul-away",
    ],
  },
  "vanity-installation": {
    tagline: "New look for your bathroom — we handle all the plumbing hookups.",
    bullets: [
      "Supply line & drain connection",
      "Custom and prefab vanities",
      "Same-day finish available",
    ],
  },
  "drain-trap-cleaning": {
    tagline: "Slow or stopped drain? We clear it completely, not temporarily.",
    bullets: [
      "Professional power-snake equipment",
      "P-trap disassembly & cleaning",
      "Odor elimination treatment",
    ],
  },
  "faucet-replacement": {
    tagline: "Upgrade any faucet in your kitchen or bath — we do it right.",
    bullets: [
      "Kitchen, bath, and utility faucets",
      "Supply with premium fixtures",
      "Warranty on labor",
    ],
  },
  "gasket-replacement": {
    tagline: "Stop annoying drips at the source before they damage your home.",
    bullets: [
      "All faucet types and brands",
      "Seat washer & O-ring service",
      "Same-day parts availability",
    ],
  },
  "leak-repair": {
    tagline: "Water leaking? We detect the source and stop it permanently.",
    bullets: [
      "Non-invasive leak detection",
      "Pipe, joint & fixture repair",
      "Mold-prevention guidance",
    ],
  },
  "emergency-plumbing": {
    tagline: "24/7 response — we pick up at 2 AM and arrive fast.",
    bullets: [
      "Burst pipe immediate containment",
      "Flooding and backup response",
      "No after-hours surcharge",
    ],
  },
  "water-heater-service": {
    tagline: "No hot water? We repair or replace it — same day, guaranteed.",
    bullets: [
      "Tank and tankless units",
      "Gas, electric, and hybrid",
      "10-year extended warranty options",
    ],
  },
};

export default function ServicesIndexPage() {
  const schema = generateLocalBusinessSchema();

  return (
    <>
      <StructuredData data={schema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16 lg:py-20"
          aria-label="Services hero"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-blue-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-blue-300">
                  /
                </li>
                <li>
                  <span aria-current="page" className="text-white font-medium">
                    Services
                  </span>
                </li>
              </ol>
            </nav>

            <Badge className="mb-4 bg-white/15 text-white border-white/30">
              8 Plumbing Services
            </Badge>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Professional Plumbing Services in Denver, CO
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
              From routine maintenance to emergency repairs, our licensed master
              plumbers handle every plumbing need — fast, clean, and guaranteed.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-blue-100">
              <span className="flex items-center gap-1.5">
                <span className="text-[#2EC4B6]">✓</span> Licensed &amp; Insured
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#2EC4B6]">✓</span> Same-Day Service
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#2EC4B6]">✓</span> Flat-Rate Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#2EC4B6]">✓</span> 5-Star Reviews
              </span>
            </div>
          </div>
        </section>

        {/* ── Services Grid ─────────────────────────────────────────────────── */}
        <section className="bg-[#F5F5F0] py-16 lg:py-20" aria-labelledby="services-grid-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="services-grid-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Everything Your Home&apos;s Plumbing Needs
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We cover all residential plumbing needs throughout Denver and the
                surrounding communities. Click any service to learn more.
              </p>
            </div>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              role="list"
            >
              {SERVICES.map((service) => {
                const detail = SERVICE_DETAILS[service.slug];
                return (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block h-full group focus-visible:outline-none"
                    >
                      <Card
                        hover
                        className="h-full p-6 group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                      >
                        <span
                          className="text-4xl block mb-3"
                          aria-hidden="true"
                        >
                          {service.icon}
                        </span>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-lg mb-2 group-hover:text-[#1B5E8A] transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                          {detail?.tagline ?? service.shortDescription}
                        </p>
                        {detail && (
                          <ul className="space-y-1 mb-4">
                            {detail.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-1.5 text-xs text-gray-500"
                              >
                                <span
                                  className="text-[#2EC4B6] mt-0.5 shrink-0"
                                  aria-hidden="true"
                                >
                                  ✓
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                        <span className="mt-auto inline-flex items-center text-sm font-semibold text-[#D4782F] group-hover:gap-2 transition-all gap-1">
                          Learn more
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06L7.28 11.78a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06z"
                            />
                          </svg>
                        </span>
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── Why CatPlumber ────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="why-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Why Choose Us</Badge>
                <h2
                  id="why-heading"
                  className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-4"
                >
                  Denver&apos;s Most Trusted Plumbing Team
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Since opening our doors in Englewood, CatPlumber has built a
                  reputation on three things: showing up on time, fixing it right
                  the first time, and standing behind every job with a written
                  guarantee.
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      icon: "🏅",
                      title: "Master-Licensed Plumbers",
                      body: "All technicians hold Colorado state master plumbing licenses — not just journeyman cards.",
                    },
                    {
                      icon: "💰",
                      title: "Upfront Flat-Rate Pricing",
                      body: "You approve the price before we touch a wrench. No hourly surprises.",
                    },
                    {
                      icon: "⚡",
                      title: "Same-Day Availability",
                      body: "Call before noon and we can usually be there the same day.",
                    },
                    {
                      icon: "🛡️",
                      title: "1-Year Labor Warranty",
                      body: "All workmanship is covered for 12 months. Parts warranties passed directly to you.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="text-2xl shrink-0" aria-hidden="true">
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-[#2D3436] mb-0.5">
                          {item.title}
                        </p>
                        <p className="text-gray-500 text-sm">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#1B5E8A] rounded-2xl p-8 text-white">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-blue-100 mb-6">
                  Call us now or request a free quote online. We typically respond
                  within 30 minutes during business hours.
                </p>
                <div className="flex flex-col gap-3">
                  <Button href="/contact" variant="primary" size="lg" className="w-full justify-center">
                    Get a Free Quote
                  </Button>
                  <Button
                    href={PHONE_LINK}
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center border-white text-white hover:bg-white hover:text-[#1B5E8A]"
                    aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                  >
                    Call {PHONE}
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 text-blue-200 text-sm space-y-1">
                  <p>✓ Free estimates, no obligation</p>
                  <p>✓ Evening &amp; weekend appointments</p>
                  <p>✓ Serving all Denver metro neighborhoods</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <section
          className="bg-[#D4782F] text-white py-14"
          aria-labelledby="services-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="services-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3"
            >
              Plumbing Problem? Let&apos;s Fix It Today.
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Don&apos;t wait for a small leak to become a big repair. Call
              CatPlumber and get it handled right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-[#D4782F]">
                Schedule Service
              </Button>
              <Button
                href={PHONE_LINK}
                size="lg"
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-[#D4782F]"
                aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
              >
                Call {PHONE}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
