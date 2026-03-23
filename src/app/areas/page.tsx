import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_LINK,
  SERVICE_AREAS,
  SERVICES,
  SITE_URL,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Service Areas — Denver Metro Plumbing | ${BUSINESS_NAME}`,
  description:
    "CatPlumber serves Englewood, Highlands Ranch, Centennial, Lone Tree, Littleton, Parker, Aurora, Denver, and more. Licensed local plumbers throughout the Denver metro area.",
  alternates: {
    canonical: `${SITE_URL}/areas`,
  },
  openGraph: {
    title: `Service Areas — Denver Metro Plumbing | ${BUSINESS_NAME}`,
    description:
      "CatPlumber provides professional plumbing services across 12 Denver metro communities. Same-day service available.",
    url: `${SITE_URL}/areas`,
  },
};

export default function AreasIndexPage() {
  const schema = generateLocalBusinessSchema();

  return (
    <>
      <StructuredData data={schema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16 lg:py-20"
          aria-label="Service areas hero"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-blue-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-blue-300">/</li>
                <li>
                  <span aria-current="page" className="text-white font-medium">
                    Service Areas
                  </span>
                </li>
              </ol>
            </nav>

            <Badge className="mb-4 bg-white/15 text-white border-white/30">
              12 Communities Served
            </Badge>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Service Areas — Denver Metro Plumbing
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
              Based in Englewood, Colorado, CatPlumber serves the entire south
              Denver metro with the same fast response times and flat-rate
              pricing — no matter which city you&apos;re in.
            </p>
          </div>
        </section>

        {/* ── Map Placeholder ──────────────────────────────────────────────── */}
        <section
          className="bg-[#F5F5F0] py-12"
          aria-label="Service area map"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-2xl overflow-hidden bg-[#1B5E8A]/10 border border-[#1B5E8A]/20 flex items-center justify-center"
              style={{ minHeight: "320px" }}
              role="img"
              aria-label="Map of CatPlumber service areas in the Denver metro"
            >
              <div className="text-center p-8">
                <span className="text-6xl block mb-4" aria-hidden="true">
                  🗺️
                </span>
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#2D3436] mb-2">
                  Denver Metro Coverage Map
                </p>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  We cover a 20-mile radius from our Englewood base, reaching
                  every major community in the south and southeast metro.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {SERVICE_AREAS.map((area) => (
                    <Badge key={area.slug} className="text-xs">
                      {area.name} · {area.distance}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Areas Grid ───────────────────────────────────────────────────── */}
        <section
          className="py-16 lg:py-20 bg-white"
          aria-labelledby="areas-grid-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="areas-grid-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Communities We Serve
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Click your city to see specific services, local information, and
                what customers in your area say about us.
              </p>
            </div>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              role="list"
            >
              {SERVICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="block h-full group focus-visible:outline-none"
                  >
                    <Card
                      hover
                      className="h-full p-6 group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-xl group-hover:text-[#1B5E8A] transition-colors">
                            {area.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Colorado · {area.distance} from base
                          </p>
                        </div>
                        {area.priority <= 3 && (
                          <Badge variant="success" className="shrink-0 ml-2">
                            Primary Area
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Full-service plumbing in {area.name} — drain cleaning,
                        water heaters, leak repair, faucets, and emergency
                        service.
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {SERVICES.slice(0, 3).map((s) => (
                          <span
                            key={s.slug}
                            className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-0.5"
                          >
                            <span aria-hidden="true">{s.icon}</span>
                            {s.name}
                          </span>
                        ))}
                        <span className="text-xs text-gray-400 px-2 py-0.5">
                          +{SERVICES.length - 3} more
                        </span>
                      </div>

                      <span className="inline-flex items-center text-sm font-semibold text-[#D4782F] gap-1 group-hover:gap-2 transition-all">
                        View {area.name} page
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
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why Local Matters ────────────────────────────────────────────── */}
        <section
          className="py-16 lg:py-20 bg-[#F5F5F0]"
          aria-labelledby="local-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3">Locally Based</Badge>
              <h2
                id="local-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Why a Local Plumber Matters
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We live and work in the Denver metro. That means faster response,
                better knowledge of local building codes, and a real stake in
                our community&apos;s satisfaction.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {[
                {
                  icon: "⚡",
                  title: "Fastest Response",
                  body: "We're 15–20 minutes away from most service areas, not 60+ minutes like a metro-wide franchise.",
                },
                {
                  icon: "📋",
                  title: "Colorado Code Expertise",
                  body: "We know Arapahoe and Douglas County permit requirements and pull permits when needed.",
                },
                {
                  icon: "🌡️",
                  title: "Colorado Climate Knowledge",
                  body: "We understand freeze risk, hard water impact, and altitude effects on water heater efficiency.",
                },
                {
                  icon: "🤝",
                  title: "Community Reputation",
                  body: "Our business depends on word-of-mouth in a small geographic area. We can't afford to cut corners.",
                },
              ].map((item) => (
                <li key={item.title} className="text-center">
                  <span className="text-4xl block mb-4" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#2D3436] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16"
          aria-labelledby="areas-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="areas-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3"
            >
              Not Sure If We Cover Your Area?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Give us a call — if we can reach you within a reasonable drive, we
              will. We regularly serve communities not listed here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" size="lg" variant="primary">
                Check My Area
              </Button>
              <Button
                href={PHONE_LINK}
                size="lg"
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-[#1B5E8A]"
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
