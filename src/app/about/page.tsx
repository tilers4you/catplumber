import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_LINK,
  ADDRESS,
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
  title: `About Us — Denver's Trusted Local Plumbers | ${BUSINESS_NAME}`,
  description:
    "Learn about CatPlumber — a family-owned plumbing company based in Englewood, CO. Our story, mission, values, certifications, and the communities we serve throughout the Denver metro.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About CatPlumber — Denver's Trusted Local Plumbers`,
    description:
      "Family-owned plumbing in Englewood, CO. Licensed master plumbers serving Denver and the south metro since day one.",
    url: `${SITE_URL}/about`,
  },
};

const VALUES = [
  {
    icon: "🏅",
    title: "Honest Pricing",
    body: "We quote the full price upfront and stick to it. No hourly billing, no surprise line items, no bait-and-switch. If the scope changes, we discuss it with you before proceeding.",
  },
  {
    icon: "⚡",
    title: "Urgency",
    body: "Plumbing problems don't get better with time. We answer the phone, dispatch quickly, and treat every call with the urgency it deserves — even the small ones.",
  },
  {
    icon: "🔬",
    title: "Craftsmanship",
    body: "We take pride in the quality of our work. A properly soldered joint, a perfectly level toilet, a clean and tidy job site — these details matter to us even when the customer might not notice.",
  },
  {
    icon: "🤝",
    title: "Community",
    body: "We're a local business serving our neighbors. We support the communities we work in, hire locally, and take our community reputation seriously in every interaction.",
  },
];

const CERTIFICATIONS = [
  {
    title: "Colorado Master Plumber License",
    body: "All lead technicians hold Colorado State Master Plumber licenses, the highest qualification level in the state plumbing code.",
    code: "CO-MPL",
  },
  {
    title: "Fully Bonded & Insured",
    body: "CatPlumber carries $2 million general liability coverage and workers' compensation for all employees on every job.",
    code: "GL-2M",
  },
  {
    title: "EPA Section 608 Certified",
    body: "Certification for handling refrigerants, required for work on certain hybrid water heaters and heat pump installations.",
    code: "EPA-608",
  },
  {
    title: "Navien & Rinnai Trained",
    body: "Factory-trained and authorized for Navien and Rinnai tankless water heater installation and service.",
    code: "OEM-AUTH",
  },
];

const TEAM = [
  {
    name: "Alex Rivera",
    role: "Owner & Master Plumber",
    bio: "20+ years in residential plumbing. Licensed master plumber since 2008. Moved from Phoenix to Englewood in 2015 and founded CatPlumber after seeing the gap between what Denver homeowners needed and what they were getting.",
    initials: "AR",
  },
  {
    name: "Jordan Kim",
    role: "Lead Technician",
    bio: "Journeyman plumber with 10 years of experience specializing in water heater systems, tankless conversions, and complex fixture installations.",
    initials: "JK",
  },
  {
    name: "Sam Okonkwo",
    role: "Service Technician",
    bio: "Apprentice-trained in Denver, specializing in drain diagnostics, P-trap service, and residential leak detection. Known for methodical problem-solving.",
    initials: "SO",
  },
];

export default function AboutPage() {
  const schema = generateLocalBusinessSchema();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/about#about`,
    name: BUSINESS_NAME,
    foundingDate: "2018",
    foundingLocation: {
      "@type": "Place",
      name: "Englewood, Colorado",
    },
    description:
      "CatPlumber is a family-owned plumbing company based in Englewood, Colorado, providing professional residential plumbing services throughout the Denver metro area.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "10645 Mount Spalding Ln",
      addressLocality: "Englewood",
      addressRegion: "CO",
      postalCode: "80112",
      addressCountry: "US",
    },
  };

  return (
    <>
      <StructuredData data={schema} />
      <StructuredData data={orgSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16 lg:py-20"
          aria-label="About hero"
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
                    About
                  </span>
                </li>
              </ol>
            </nav>
            <Badge className="mb-4 bg-white/15 text-white border-white/30">
              Family-Owned · Englewood, CO
            </Badge>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Denver&apos;s Trusted Local Plumbers
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
              CatPlumber started with a simple belief: Denver homeowners deserve
              a plumber who shows up on time, charges a fair price, and fixes
              the problem right the first time. We built our business around that
              belief, one customer at a time.
            </p>
          </div>
        </section>

        {/* ── Our Story ────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="story-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-4">Our Story</Badge>
                <h2
                  id="story-heading"
                  className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-6"
                >
                  Built on a Handshake and a Fair Quote
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    CatPlumber was founded in Englewood by master plumber Alex Rivera, who spent two decades working for large plumbing franchises and growing increasingly frustrated with what he saw: customers overcharged for simple repairs, upsold on unnecessary services, and left waiting hours for a technician because the dispatch center was 40 miles away.
                  </p>
                  <p>
                    In 2018, Alex started CatPlumber out of his garage with one truck, a commitment to transparent pricing, and a service area he could reach quickly — the south Denver metro he&apos;d called home for three years. Word spread fast. Within two years, we had three technicians and a waiting list.
                  </p>
                  <p>
                    Today, CatPlumber serves 12 communities across the Denver metro. We&apos;ve replaced thousands of water heaters, cleared thousands of drains, and repaired countless leaks. Our business has grown entirely through referrals and online reviews — no paid advertising, just the reputation we&apos;ve earned.
                  </p>
                  <p>
                    The name? Alex&apos;s cat, Wrench, has been in the shop since day one. He doesn&apos;t do much plumbing, but he&apos;s been in more jobsite photos than any of us.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "2018", label: "Year Founded" },
                    { num: "12", label: "Cities Served" },
                    { num: "200+", label: "5-Star Reviews" },
                    { num: "1,000+", label: "Jobs Completed" },
                  ].map((stat) => (
                    <Card key={stat.label} className="p-6 text-center">
                      <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-black text-[#1B5E8A]">
                        {stat.num}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-[#F5F5F0] border-l-4 border-[#D4782F]">
                  <p className="font-semibold text-[#2D3436] mb-1">
                    Our Promise
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    &ldquo;If we can&apos;t fix it right, we won&apos;t charge you for it.
                    Every job comes with a one-year labor warranty — no questions
                    asked, no fine print.&rdquo;
                  </p>
                  <p className="text-[#D4782F] font-semibold text-sm mt-2">
                    — Alex Rivera, Owner
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Values ─────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-[#F5F5F0]" aria-labelledby="values-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3">What We Believe</Badge>
              <h2
                id="values-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Our Mission &amp; Values
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Our mission is simple: provide the best residential plumbing
                experience in the Denver metro. These are the values that guide
                every decision we make.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {VALUES.map((value) => (
                <li key={value.title}>
                  <Card className="h-full p-6 text-center">
                    <span className="text-4xl block mb-4" aria-hidden="true">
                      {value.icon}
                    </span>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-base mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {value.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Team ─────────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="team-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3">Meet the Team</Badge>
              <h2
                id="team-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                The Plumbers Behind CatPlumber
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Our small, dedicated team is what makes us different. You&apos;ll
                get to know our plumbers by name — and they&apos;ll get to know
                your home&apos;s plumbing.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
              {TEAM.map((member) => (
                <li key={member.name}>
                  <Card className="p-6 text-center h-full">
                    <div
                      className="mx-auto h-20 w-20 rounded-full bg-[#1B5E8A] flex items-center justify-center text-white text-2xl font-black mb-4"
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-lg">
                      {member.name}
                    </h3>
                    <p className="text-[#D4782F] font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Certifications ────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-[#F5F5F0]" aria-labelledby="certs-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3">Credentials</Badge>
              <h2
                id="certs-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Licensing &amp; Certifications
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                We hold every certification required by Colorado law, plus
                several voluntary factory training credentials that set our work
                apart.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5" role="list">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.title}>
                  <Card className="h-full p-6 flex items-start gap-4">
                    <div
                      className="shrink-0 h-12 w-12 rounded-lg bg-[#1B5E8A]/10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="text-[#1B5E8A] text-xs font-black text-center leading-tight">
                        {cert.code}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {cert.body}
                      </p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Service Area Coverage ─────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="coverage-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-3">Coverage</Badge>
              <h2
                id="coverage-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#2D3436] mb-3"
              >
                Where We Work
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Based at{" "}
                <span className="font-medium text-[#2D3436]">{ADDRESS}</span>,
                we cover a 20-mile radius throughout the south Denver metro.
              </p>
            </div>

            <nav aria-label="Service areas">
              <ul className="flex flex-wrap justify-center gap-3" role="list">
                {SERVICE_AREAS.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/areas/${area.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1B5E8A]/20 text-[#1B5E8A] text-sm font-medium hover:bg-[#1B5E8A] hover:text-white hover:border-[#1B5E8A] transition-all focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                    >
                      {area.name}
                      <span className="text-xs opacity-60">{area.distance}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ── Services Quick List ───────────────────────────────────────────── */}
        <section className="py-12 bg-[#F5F5F0]" aria-labelledby="services-list-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="services-list-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#2D3436] mb-6"
            >
              Everything We Do
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="list">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-2 rounded-lg bg-white border border-gray-100 px-4 py-3 text-sm font-medium text-[#2D3436] hover:border-[#1B5E8A]/30 hover:text-[#1B5E8A] transition-all focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                  >
                    <span aria-hidden="true">{service.icon}</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16"
          aria-labelledby="about-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="about-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3"
            >
              Ready to Experience the Difference?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of Denver metro homeowners who trust CatPlumber for
              all their plumbing needs.
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
          </div>
        </section>
      </main>
    </>
  );
}
