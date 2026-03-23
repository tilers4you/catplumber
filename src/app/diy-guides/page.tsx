import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, SITE_URL } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: `DIY Plumbing Guides for Denver Homeowners | ${BUSINESS_NAME}`,
  description:
    "Step-by-step DIY plumbing guides written by licensed master plumbers. Learn how to unclog drains, fix dripping faucets, replace a toilet, and more — safely.",
  alternates: {
    canonical: `${SITE_URL}/diy-guides`,
  },
  openGraph: {
    title: `DIY Plumbing Guides | ${BUSINESS_NAME}`,
    description:
      "Step-by-step plumbing guides for Denver homeowners. Written by licensed pros who know when a job is DIY-friendly and when to call for help.",
    url: `${SITE_URL}/diy-guides`,
  },
};

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface DIYGuide {
  slug: string;
  title: string;
  excerpt: string;
  difficulty: Difficulty;
  timeEstimate: string;
  toolsNeeded: string[];
  category: string;
  date?: string;
}

export const DIY_GUIDES: DIYGuide[] = [
  {
    slug: "unclog-drain-without-chemicals",
    title: "How to Unclog a Drain Without Chemicals",
    excerpt:
      "The safest and most effective way to clear a clogged bathroom or kitchen drain using tools you likely already have — no Drano required.",
    difficulty: "Beginner",
    timeEstimate: "20–45 minutes",
    toolsNeeded: ["Plunger", "Screwdriver", "Small bucket", "Flashlight"],
    category: "Drains",
  },
  {
    slug: "fix-running-toilet",
    title: "How to Fix a Running Toilet",
    excerpt:
      "A toilet that runs constantly wastes 200+ gallons a day. This guide walks you through diagnosing whether it's the flapper, fill valve, or float — and how to fix each one.",
    difficulty: "Beginner",
    timeEstimate: "30–60 minutes",
    toolsNeeded: ["Adjustable wrench", "Replacement flapper", "Sponge"],
    category: "Toilets",
  },
  {
    slug: "replace-faucet-aerator",
    title: "How to Clean or Replace a Faucet Aerator",
    excerpt:
      "Low water pressure or splashing from your faucet is usually a clogged aerator — a five-minute fix that most homeowners can do without a plumber.",
    difficulty: "Beginner",
    timeEstimate: "5–15 minutes",
    toolsNeeded: ["Pliers", "Rag or tape", "White vinegar"],
    category: "Faucets",
  },
  {
    slug: "shut-off-valve-repair",
    title: "How to Repair a Leaking Shut-Off Valve",
    excerpt:
      "A weeping shut-off valve under your sink is usually a worn packing washer — something you can replace in 20 minutes without turning off the main water supply.",
    difficulty: "Intermediate",
    timeEstimate: "20–45 minutes",
    toolsNeeded: ["Adjustable wrench", "Screwdriver", "Packing washer replacement kit"],
    category: "Valves",
  },
];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

const DIFFICULTY_ICONS: Record<Difficulty, string> = {
  Beginner: "🟢",
  Intermediate: "🟡",
  Advanced: "🔴",
};

export default function DIYGuidesIndexPage() {
  const howToListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DIY Plumbing Guides",
    description: "Step-by-step plumbing guides for homeowners",
    url: `${SITE_URL}/diy-guides`,
    numberOfItems: DIY_GUIDES.length,
    itemListElement: DIY_GUIDES.map((guide, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: guide.title,
      url: `${SITE_URL}/diy-guides/${guide.slug}`,
    })),
  };

  return (
    <>
      <StructuredData data={howToListSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16 lg:py-20"
          aria-label="DIY guides hero"
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
                    DIY Guides
                  </span>
                </li>
              </ol>
            </nav>
            <Badge className="mb-4 bg-white/15 text-white border-white/30">
              Written by Licensed Plumbers
            </Badge>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              DIY Plumbing Guides
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
              Not every plumbing job requires a service call. Our licensed
              plumbers wrote these guides to help Denver homeowners safely handle
              the tasks that really are DIY-friendly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map(
                (level) => (
                  <span
                    key={level}
                    className="flex items-center gap-1.5 text-sm text-blue-100"
                  >
                    <span aria-hidden="true">{DIFFICULTY_ICONS[level]}</span>
                    {level}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── Guides Grid ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-[#F5F5F0]" aria-labelledby="guides-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="guides-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436] mb-10"
            >
              All DIY Plumbing Guides
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
              {DIY_GUIDES.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/diy-guides/${guide.slug}`}
                    className="block h-full group focus-visible:outline-none"
                  >
                    <Card
                      hover
                      className="h-full p-6 flex flex-col group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge>{guide.category}</Badge>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${DIFFICULTY_COLORS[guide.difficulty]}`}
                        >
                          <span aria-hidden="true">
                            {DIFFICULTY_ICONS[guide.difficulty]}
                          </span>
                          {guide.difficulty}
                        </span>
                        <span className="text-gray-400 text-xs">
                          ⏱ {guide.timeEstimate}
                        </span>
                      </div>

                      <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-xl mb-2 group-hover:text-[#1B5E8A] transition-colors">
                        {guide.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                        {guide.excerpt}
                      </p>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Tools Needed
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {guide.toolsNeeded.map((tool) => (
                            <span
                              key={tool}
                              className="inline-flex text-xs bg-gray-50 text-gray-500 rounded-full px-2.5 py-0.5 border border-gray-100"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="mt-auto inline-flex items-center text-sm font-semibold text-[#D4782F] gap-1 group-hover:gap-2 transition-all">
                        Read guide
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

        {/* ── Safety Notice ─────────────────────────────────────────────────── */}
        <section className="py-12 bg-white" aria-labelledby="safety-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="p-6 border-l-4 border-amber-400 bg-amber-50">
              <h2
                id="safety-heading"
                className="font-[family-name:var(--font-space-grotesk)] font-bold text-amber-800 text-lg mb-2"
              >
                ⚠️ Know Your Limits
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                These guides cover tasks that are genuinely safe for a careful
                homeowner with basic tools. They are <strong>not</strong> a
                substitute for professional plumbing work on gas lines, main
                sewer lines, water heater replacements, or any work requiring a
                permit. When in doubt, call a licensed plumber. A $150 service
                call is always less expensive than the water damage that results
                from a DIY job gone wrong.
              </p>
            </Card>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16"
          aria-labelledby="diy-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="diy-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold mb-3"
            >
              Problem Beyond the DIY? We&apos;re a Call Away.
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              If you followed a guide and the problem persists — or you&apos;d
              just rather have a professional handle it — CatPlumber is available
              same-day throughout Denver metro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-lg font-semibold rounded-xl bg-[#D4782F] text-white hover:bg-[#b8601f] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-7 py-3.5 text-lg font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-[#1B5E8A] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
