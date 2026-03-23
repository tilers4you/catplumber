import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_LINK,
  ADDRESS,
  SERVICES,
  SERVICE_AREAS,
  SITE_URL,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { generateLocalBusinessSchema, generateAggregateRatingSchema } from "@/lib/schema";
import { StructuredData } from "@/components/seo/StructuredData";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { CountUp } from "@/components/animations/CountUp";
import { PulseGlow } from "@/components/animations/PulseGlow";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Expert Plumbing Services in Denver, Colorado | ${BUSINESS_NAME}`,
  description:
    "CatPlumber — Denver's trusted plumber for drain cleaning, water heaters, leak repair, sewer lines & more. Licensed & insured, same-day service. Free quotes.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `Expert Plumbing Services in Denver, Colorado | ${BUSINESS_NAME}`,
    description:
      "Trusted plumbing services in Denver & surrounding areas. Same-day service, free quotes, licensed & insured.",
    url: SITE_URL,
  },
};

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    neighborhood: "Capitol Hill",
    rating: 5,
    text: "CatPlumber came out within two hours of my call. Fixed a burst pipe under the kitchen sink quickly and cleanly. The price was fair and the plumber was professional. Will definitely call again.",
  },
  {
    id: 2,
    name: "James T.",
    neighborhood: "Washington Park",
    rating: 5,
    text: "I had a major drain backup on a Saturday evening and they picked up immediately. By 9 PM my drains were clear and the tech explained exactly what caused the problem. Outstanding service.",
  },
  {
    id: 3,
    name: "Maria L.",
    neighborhood: "Highlands",
    rating: 5,
    text: "They replaced my 20-year-old water heater with a tankless unit. The crew was on time, the installation looks immaculate, and my hot water is now instant. Couldn't be happier.",
  },
];

const WHY_US = [
  {
    icon: "🏅",
    title: "Licensed & Fully Insured",
    body: "All work performed by state-licensed master plumbers. Fully insured for your peace of mind.",
  },
  {
    icon: "⚡",
    title: "Same-Day Service",
    body: "We answer the phone and dispatch fast. Most calls in the Denver area are served the same day.",
  },
  {
    icon: "💰",
    title: "Transparent Flat-Rate Pricing",
    body: "No hidden fees or surprise invoices. We quote upfront and stick to it, guaranteed.",
  },
  {
    icon: "⭐",
    title: "5-Star Rated",
    body: "Hundreds of happy customers across Denver. Check our Google and Yelp reviews to see why.",
  },
];

const STATS = [
  { end: 500, suffix: "+", label: "Happy Customers" },
  { end: 24, suffix: "/7", label: "Emergency Service" },
  { end: 15, suffix: "+", label: "Years Experience" },
  { end: 100, suffix: "%", label: "Satisfaction Rate" },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-amber-400 fill-current"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
        </svg>
      ))}
    </span>
  );
}

export default function HomePage() {
  const schema = generateLocalBusinessSchema();
  const aggregateRatingSchema = generateAggregateRatingSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <StructuredData data={aggregateRatingSchema} />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative bg-[#1B5E8A] text-white overflow-hidden"
          aria-label="Hero"
        >
          {/* Decorative background pattern — visible before 3D loads */}
          <div
            className="absolute inset-0 opacity-10"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, #2EC4B6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4782F 0%, transparent 50%)",
            }}
          />

          {/* 3D animated pipe canvas — client component, ssr:false */}
          <HeroCanvas />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl">
              {/* Trust badges row */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="success" className="bg-white/15 text-white border-white/30">
                  ✓ Licensed &amp; Insured
                </Badge>
                <Badge variant="success" className="bg-white/15 text-white border-white/30">
                  ⭐ 5-Star Reviews
                </Badge>
                <Badge variant="success" className="bg-white/15 text-white border-white/30">
                  ⚡ Same-Day Service
                </Badge>
              </div>

              <TextSplit
                text="Expert Plumbing Services in Denver, Colorado"
                tag="h1"
                className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4"
                delay={0.2}
              />

              <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                From clogged drains to water heater replacements — we fix it fast,
                right, and at a price you can trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <PulseGlow>
                  <Button href="/contact" size="lg" variant="primary">
                    Get a Free Quote
                  </Button>
                </PulseGlow>
                <Button
                  href={PHONE_LINK}
                  size="lg"
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-[#1B5E8A]"
                  aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                >
                  <svg
                    className="w-5 h-5"
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
                  Call {PHONE}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1a4f75] text-white py-12"
          aria-label="Key statistics"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ul
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
              role="list"
            >
              {STATS.map((stat) => (
                <li key={stat.label}>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[#2EC4B6] tabular-nums">
                    <CountUp end={stat.end} suffix={stat.suffix} duration={2.2} />
                  </p>
                  <p className="mt-1 text-blue-200 text-sm font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Services Overview ─────────────────────────────────────────────── */}
        <section
          className="bg-[#F5F5F0] py-16 lg:py-20"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <Badge className="mb-3">Our Services</Badge>
              <h2
                id="services-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Everything Your Home&apos;s Plumbing Needs
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                From routine maintenance to emergency repairs, our licensed plumbers
                handle it all throughout Denver and the surrounding metro.
              </p>
            </ScrollReveal>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              role="list"
            >
              {SERVICES.map((service, i) => (
                <li key={service.slug}>
                  <ScrollReveal direction="up" delay={i * 0.08}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block h-full group focus-visible:outline-none"
                    >
                      <Card
                        hover
                        className="h-full p-6 group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                      >
                        <span
                          className="text-3xl block mb-3"
                          aria-hidden="true"
                        >
                          {service.icon}
                        </span>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#2D3436] text-base mb-2 group-hover:text-[#1B5E8A] transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {service.shortDescription}
                        </p>
                        <span className="mt-3 inline-flex items-center text-sm font-medium text-[#D4782F] group-hover:gap-1.5 transition-all gap-1">
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
                  </ScrollReveal>
                </li>
              ))}
            </ul>

            <div className="text-center mt-10">
              <Button href="/services" variant="secondary" size="lg">
                View All Services
              </Button>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="why-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <Badge className="mb-3">Why CatPlumber</Badge>
              <h2
                id="why-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Denver&apos;s Trusted Plumbing Experts
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                We&apos;re not just a plumbing company — we&apos;re your neighbors.
              </p>
            </ScrollReveal>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              role="list"
            >
              {WHY_US.map((item, i) => (
                <li key={item.title}>
                  <ScrollReveal direction="up" delay={i * 0.1} className="text-center">
                    <span
                      className="text-4xl block mb-4"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#2D3436] text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section
          className="bg-[#F5F5F0] py-16 lg:py-20"
          aria-labelledby="testimonials-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <Badge className="mb-3">Reviews</Badge>
              <h2
                id="testimonials-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                What Our Customers Say
              </h2>
              <div className="flex items-center justify-center gap-2">
                <StarRating count={5} />
                <span className="text-gray-600 text-sm">
                  5.0 average across 200+ reviews
                </span>
              </div>
            </ScrollReveal>

            <ul
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
            >
              {TESTIMONIALS.map((t, i) => (
                <li key={t.id}>
                  <ScrollReveal direction="up" delay={i * 0.12}>
                    <Card className="p-6 h-full flex flex-col">
                      <StarRating count={t.rating} />
                      <blockquote className="flex-1 mt-3 text-gray-600 text-sm leading-relaxed italic">
                        &ldquo;{t.text}&rdquo;
                      </blockquote>
                      <footer className="mt-4 pt-4 border-t border-gray-100">
                        <p className="font-semibold text-[#2D3436] text-sm">
                          {t.name}
                        </p>
                        <p className="text-gray-400 text-xs">{t.neighborhood}, Denver</p>
                      </footer>
                    </Card>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Service Areas ─────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="areas-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-10">
              <Badge className="mb-3">Coverage</Badge>
              <h2
                id="areas-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Service Areas in the Denver Metro
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                We serve Englewood and every surrounding community.
              </p>
            </ScrollReveal>

            <nav aria-label="Service areas">
              <ul className="flex flex-wrap justify-center gap-3" role="list">
                {SERVICE_AREAS.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-[#1B5E8A]/20 text-[#1B5E8A] text-sm font-medium hover:bg-[#1B5E8A] hover:text-white hover:border-[#1B5E8A] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="text-center mt-8">
              <Link
                href="/service-areas"
                className="text-[#D4782F] text-sm font-medium hover:underline"
              >
                See all service areas →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16 lg:py-20"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <h2
                id="cta-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3"
              >
                Need a Plumber? Get a Free Quote Today
              </h2>
              <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
                No hassle, no hidden fees. One call and we handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/contact" size="lg" variant="primary">
                  Get a Free Quote
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

              {/* Quick trust row */}
              <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
                <span>✓ Licensed &amp; Insured</span>
                <span>✓ No After-Hours Fees</span>
                <span>✓ Same-Day Appointments</span>
                <span>✓ Serving Denver &amp; Metro</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Address Footer Strip ─────────────────────────────────────────── */}
        <div className="bg-[#2D3436] text-gray-400 text-sm py-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              <span className="font-medium text-white">{BUSINESS_NAME}</span>
              {" · "}{ADDRESS}
            </p>
            <a
              href={PHONE_LINK}
              className="text-[#D4782F] font-medium hover:underline"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
