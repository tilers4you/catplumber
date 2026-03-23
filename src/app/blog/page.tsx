import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, SITE_URL } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";

export const revalidate = 300;

export const metadata: Metadata = {
  title: `Plumbing Tips & Guides — Denver Homeowner Resources | ${BUSINESS_NAME}`,
  description:
    "Free plumbing tips, guides, and how-tos for Denver homeowners. Learn how to winterize pipes, prevent leaks, maintain your water heater, and when to call a plumber.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Plumbing Tips & Guides | ${BUSINESS_NAME}`,
    description:
      "Practical plumbing advice for Denver homeowners from CatPlumber's licensed master plumbers.",
    url: `${SITE_URL}/blog`,
  },
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "winterize-pipes-colorado",
    title: "How to Winterize Your Pipes in Colorado: A Homeowner's Guide",
    excerpt:
      "Colorado's temperature swings can turn a small oversight into a burst pipe and thousands in damage. Here's exactly how to prepare your home's plumbing for every winter season.",
    date: "2025-11-01",
    readTime: "8 min read",
    category: "Seasonal Maintenance",
    featured: true,
  },
  {
    slug: "water-heater-lifespan-signs-replacement",
    title: "How Long Should a Water Heater Last? Signs It's Time to Replace Yours",
    excerpt:
      "Most Denver homeowners don't think about their water heater until it fails completely. Learn the warning signs that give you weeks to plan a replacement instead of days.",
    date: "2025-10-15",
    readTime: "6 min read",
    category: "Water Heaters",
  },
  {
    slug: "hard-water-denver-plumbing-effects",
    title: "Denver's Hard Water Problem: What It's Doing to Your Pipes and Fixtures",
    excerpt:
      "The Denver metro has some of the hardest water in Colorado. Understand what that means for your water heater, faucets, and supply lines — and what you can do about it.",
    date: "2025-09-20",
    readTime: "7 min read",
    category: "Water Quality",
  },
  {
    slug: "plumbing-permit-colorado-when-you-need-one",
    title: "When Do You Need a Plumbing Permit in Colorado? A Homeowner's Guide",
    excerpt:
      "Skipping a required permit can void your homeowner's insurance and create headaches when you sell. Here's exactly when Colorado law requires a permit for plumbing work.",
    date: "2025-09-05",
    readTime: "5 min read",
    category: "Regulations & Permits",
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BUSINESS_NAME} Plumbing Blog`,
    description: "Plumbing tips and guides for Denver metro homeowners",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <>
      <StructuredData data={blogListSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16 lg:py-20"
          aria-label="Blog hero"
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
                    Blog
                  </span>
                </li>
              </ol>
            </nav>
            <Badge className="mb-4 bg-white/15 text-white border-white/30">
              Free Homeowner Resources
            </Badge>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Plumbing Tips &amp; Guides
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
              Practical plumbing advice for Denver metro homeowners — written by
              our licensed master plumbers with real field experience.
            </p>
          </div>
        </section>

        {/* ── Featured Post ─────────────────────────────────────────────────── */}
        {featured && (
          <section className="py-12 bg-[#F5F5F0]" aria-labelledby="featured-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2
                id="featured-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-[#D4782F] uppercase tracking-wider mb-6"
              >
                Featured Article
              </h2>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block focus-visible:outline-none"
              >
                <Card
                  hover
                  className="p-8 lg:p-10 group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge>{featured.category}</Badge>
                    <span className="text-gray-400 text-sm">
                      {formatDate(featured.date)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      · {featured.readTime}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-[#2D3436] mb-3 group-hover:text-[#1B5E8A] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4 max-w-3xl">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-[#D4782F] gap-1 group-hover:gap-2 transition-all">
                    Read full guide
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
            </div>
          </section>
        )}

        {/* ── All Posts ─────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="posts-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="posts-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#2D3436] mb-8"
            >
              More Articles
            </h2>
            <ul
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
            >
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full group focus-visible:outline-none"
                  >
                    <Card
                      hover
                      className="h-full p-6 flex flex-col group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="text-xs">{post.category}</Badge>
                      </div>
                      <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-lg mb-2 group-hover:text-[#1B5E8A] transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <span className="text-gray-400 text-xs">
                          {formatDate(post.date)}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {post.readTime}
                        </span>
                      </div>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Newsletter / CTA ──────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16"
          aria-labelledby="blog-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="blog-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold mb-3"
            >
              Plumbing Problem? We Can Help Right Now.
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Sometimes reading a guide is enough. Other times you just need a
              plumber. We&apos;re available same-day throughout the Denver metro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-lg font-semibold rounded-xl bg-[#D4782F] text-white hover:bg-[#b8601f] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/diy-guides"
                className="inline-flex items-center justify-center px-7 py-3.5 text-lg font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-[#1B5E8A] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                Browse DIY Guides
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
