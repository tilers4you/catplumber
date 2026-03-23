import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BUSINESS_NAME, PHONE, PHONE_LINK, SITE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateArticleSchema } from "@/lib/schema";
import { BLOG_POSTS } from "../page";

// ─── Post content ─────────────────────────────────────────────────────────────

interface PostContent {
  html: string;
}

const POST_CONTENT: Record<string, PostContent> = {
  "winterize-pipes-colorado": {
    html: `
<p class="lead">Every October, thousands of Colorado homeowners discover a hard lesson: the Denver metro's temperature swings are more extreme than most of the country. A warm afternoon followed by a below-zero night is enough to freeze an exposed pipe — and a frozen pipe can burst, releasing hundreds of gallons of water before anyone notices. The good news is that pipe winterization takes a few hours and costs almost nothing if you do it yourself.</p>

<h2>Why Colorado Is Particularly Challenging for Pipes</h2>
<p>Colorado's "semi-arid" climate means temperatures swing dramatically — sometimes 50°F in a single day. That thermal cycling creates special risk for pipes in three vulnerable locations:</p>
<ul>
  <li><strong>Exterior walls</strong>: Pipes running through exterior walls with inadequate insulation are the most common freeze point in Denver-area homes.</li>
  <li><strong>Crawl spaces</strong>: Many ranch homes and older Denver bungalows have crawl spaces where supply lines run exposed, sometimes with little to no insulation around the foundation.</li>
  <li><strong>Attached garages</strong>: A garage isn't heated — any pipe running through it is vulnerable. This includes the supply line to a utility sink or a laundry connection on a shared wall.</li>
</ul>
<p>Colorado also sits at elevation. Englewood is at 5,364 feet; Castle Rock is at 6,224 feet. At altitude, water's freezing behavior is essentially identical to sea level, but the wind chill is more severe and the nights are colder than the same latitude at sea level.</p>

<h2>Step 1: Disconnect and Drain Outdoor Hose Bibs</h2>
<p>This is the most important single step for most Denver homeowners. A garden hose left connected to an outdoor faucet traps water in the bib, which can freeze, expand, and crack the faucet body or the supply line behind the wall.</p>
<p><strong>What to do:</strong></p>
<ol>
  <li>Disconnect all garden hoses from outdoor faucets. Even a frost-free hose bib will freeze if a hose is left attached, because the hose traps water in the bib's drain port.</li>
  <li>If your hose bibs are the older style (not frost-free), shut them off at their individual shut-off valve inside the house, then open the bib outside to drain the remaining water in the pipe.</li>
  <li>If you're not sure whether your bibs are frost-free, assume they're not. Interior shut-off + drain is the safe approach.</li>
</ol>

<h2>Step 2: Insulate Exposed Pipes in Unheated Spaces</h2>
<p>Foam pipe insulation is inexpensive (usually $1–$3 per 6-foot section) and easy to install — it slips over the pipe with a pre-cut slit and can be taped closed. Target these areas:</p>
<ul>
  <li><strong>Crawl space supply lines</strong>: Wrap every visible supply line. Pay special attention to areas near the foundation vents.</li>
  <li><strong>Garage walls</strong>: Any pipe running through or adjacent to an unheated garage wall should be insulated, including the first 2–3 feet of pipe as it passes through the wall.</li>
  <li><strong>Basement rim joists</strong>: The area where the floor framing meets the foundation wall is often the coldest spot in the house. Supply lines in this zone need insulation.</li>
  <li><strong>Under kitchen and bathroom sinks on exterior walls</strong>: Cabinet doors keep warmth in, but if the cabinet backs up to an exterior wall, the pipes are still at risk on very cold nights. Leave cabinet doors open during cold snaps to let household heat circulate.</li>
</ul>

<h2>Step 3: Seal Air Leaks Near Plumbing Penetrations</h2>
<p>Pipes that pass through exterior walls or the foundation often have gaps around them that let cold air directly contact the pipe. This is more dangerous than just cold ambient air — it's a direct cold-air channel.</p>
<p>Use expanding foam sealant or plumber's pipe insulation tape to fill gaps around pipes where they pass through exterior walls. This is a 15-minute job that can make a significant difference.</p>

<h2>Step 4: Know Where Your Main Shut-Off Is</h2>
<p>If a pipe does freeze and burst, the first thing you'll need to do is shut off your main water supply. Every adult in your household should know where this valve is <em>before</em> an emergency.</p>
<p>In most Denver-area homes built after 1980, the main shut-off is near the water meter, typically in the basement or utility room. In older homes, it may be outside near the foundation or at the street curb. Turn it clockwise (right) to close. Test it annually to make sure it moves freely.</p>

<h2>Step 5: Winterize Irrigation Systems</h2>
<p>If your home has an in-ground irrigation system, it needs to be blown out with compressed air before the first freeze. Water left in irrigation lines will freeze, expand, and crack the lateral lines and spray heads.</p>
<p>Most irrigation companies offer blow-out service for $75–$150, and it's worth every dollar. The repair cost for a single cracked zone lateral line typically exceeds $300, not counting the blow-out you'll still need to do anyway.</p>

<h2>Step 6: Set a Minimum Thermostat Temperature When Away</h2>
<p>If you leave your home for the holidays or an extended weekend trip, do not set the thermostat below 55°F. The interior walls and the pipes running through them take a long time to cool down, but they will eventually equilibrate with the ambient temperature. A thermostat set to 60°F provides a meaningful buffer.</p>
<p>This is especially important for vacant or seasonal properties. A home that isn't occupied during a Colorado cold snap needs either heat maintenance or full pipe draining (see below).</p>

<h2>Step 7: If You're Leaving for an Extended Period — Drain the System</h2>
<p>For vacant properties during winter, the safest approach is full pipe draining:</p>
<ol>
  <li>Shut off the main water supply.</li>
  <li>Open all faucets, starting with the highest point in the house and working down.</li>
  <li>Flush all toilets and leave the handles depressed to drain the tanks.</li>
  <li>Pour non-toxic RV antifreeze into each drain trap to prevent sewer gas infiltration and trap freeze.</li>
  <li>If you have a water heater on a timer, turn it off.</li>
</ol>

<h2>What to Do If a Pipe Freezes</h2>
<p>If you turn on a faucet in winter and get no water (or just a trickle), you likely have a frozen pipe. Here's the protocol:</p>
<ol>
  <li><strong>Don't panic, but act quickly.</strong> A frozen pipe hasn't burst yet. Your goal is to thaw it before it splits.</li>
  <li><strong>Locate the frozen section.</strong> It's usually in one of the three vulnerable areas described above.</li>
  <li><strong>Apply gentle heat.</strong> A hair dryer on low, heat tape, or warm towels applied to the pipe. Never use an open flame — this is a fire hazard and can damage the pipe.</li>
  <li><strong>Keep a faucet open</strong> while thawing. Running water helps melt the ice and relieves pressure in the line.</li>
  <li><strong>If you can't locate the frozen section, call us.</strong> We have non-invasive detection equipment and can often locate and thaw a frozen pipe without opening walls.</li>
</ol>

<h2>When to Call a Plumber for Winterization</h2>
<p>The steps above are genuinely DIY-friendly for most homeowners. However, call a professional if:</p>
<ul>
  <li>Your home has a crawl space or basement you can't safely access</li>
  <li>You have older galvanized or polybutylene pipes that are already in questionable condition</li>
  <li>You want a comprehensive plumbing inspection that includes the irrigation system, outdoor bibs, and interior supply lines</li>
  <li>You're leaving town for an extended period and want confirmation that the system is properly winterized</li>
</ul>
<p>CatPlumber offers winterization inspections starting in October. We'll walk through every vulnerable area, insulate exposed pipes, test all shut-off valves, and document the condition of your plumbing before winter sets in. Call us at ${PHONE} to schedule.</p>
    `,
  },

  "water-heater-lifespan-signs-replacement": {
    html: `
<p class="lead">The average water heater lasts 10–15 years. Most fail without much warning — but there <em>are</em> signs that appear weeks or months before complete failure if you know what to look for.</p>

<h2>How Long Do Water Heaters Last?</h2>
<p>Tank water heaters typically last 8–12 years in Denver's hard water environment. Tankless units generally last 15–20 years. The primary factor is water hardness — Denver Water delivers moderately hard water, and the southern suburbs (Castle Rock, Highlands Ranch) receive even harder water from the Denver South metropolitan area.</p>
<p>Hard water deposits mineral scale inside the tank and on heating elements, accelerating wear and reducing efficiency. Annual flushing and anode rod replacement extend tank life significantly.</p>

<h2>Warning Signs to Watch For</h2>
<ul>
  <li><strong>Rusty or discolored hot water</strong>: Brown or reddish hot water indicates the sacrificial anode rod has been fully consumed and the tank itself is beginning to corrode.</li>
  <li><strong>Rumbling or popping sounds</strong>: Sediment buildup on the tank floor causes these sounds as water is heated through the mineral layer.</li>
  <li><strong>Water around the base of the heater</strong>: A small puddle or mineral staining around the base often indicates a slow internal leak — replace before it fails completely.</li>
  <li><strong>Running out of hot water faster</strong>: Sediment displaces tank volume, reducing effective capacity.</li>
  <li><strong>Higher energy bills</strong>: A scale-covered element works harder and consumes more energy for the same hot water output.</li>
</ul>

<h2>Repair vs. Replace Decision</h2>
<p>As a rule of thumb: if your water heater is under 8 years old and the repair is a single component (element, thermostat, T&P valve, anode rod), repair is usually the right call. If it's over 10 years old or requires multiple repairs, replacement provides better long-term value.</p>
<p>Call CatPlumber at ${PHONE} for an honest assessment.</p>
    `,
  },

  "hard-water-denver-plumbing-effects": {
    html: `
<p class="lead">Denver Water reports an average hardness of 110–140 mg/L — classified as "moderately hard." The southern suburbs, served by the Denver South metro district, often measure 200+ mg/L — definitively "very hard."</p>

<h2>What Hard Water Does to Your Plumbing</h2>
<p>Hard water contains dissolved calcium and magnesium minerals. When heated, these minerals precipitate out of solution and deposit on surfaces — a process called scaling. Over time:</p>
<ul>
  <li><strong>Water heater tanks</strong> accumulate sediment that reduces capacity and efficiency</li>
  <li><strong>Faucet aerators and shower heads</strong> clog with mineral deposits, reducing flow</li>
  <li><strong>Cartridge faucets</strong> wear out faster as minerals score the ceramic discs</li>
  <li><strong>Supply lines</strong> in older galvanized pipes develop internal scale that progressively restricts flow</li>
</ul>

<h2>Solutions</h2>
<p>A whole-house water softener is the most effective solution. Salt-based softeners exchange calcium and magnesium for sodium, eliminating scale buildup throughout the system. Salt-free conditioners don't remove minerals but change their crystalline structure so they're less likely to adhere to surfaces.</p>
<p>We install and service both types. Contact us at ${PHONE} to discuss the right solution for your home's water.</p>
    `,
  },

  "plumbing-permit-colorado-when-you-need-one": {
    html: `
<p class="lead">Colorado requires permits for a wider range of plumbing work than most homeowners realize. Skipping a permit isn't just a technical violation — it can void your homeowner's insurance coverage for related damage and create disclosure problems when you sell.</p>

<h2>Work That Always Requires a Permit</h2>
<ul>
  <li>Water heater replacement (tank or tankless)</li>
  <li>New fixture rough-ins (adding a bathroom, laundry hookup)</li>
  <li>Supply or drain line relocation</li>
  <li>Water main service work at or near the meter</li>
  <li>Sewer line repair or replacement</li>
</ul>

<h2>Work That Generally Doesn't Require a Permit</h2>
<ul>
  <li>Like-for-like faucet replacement at an existing fixture</li>
  <li>Toilet replacement (same location)</li>
  <li>Drain cleaning and P-trap service</li>
  <li>Supply line and shut-off valve replacement</li>
</ul>

<h2>The Permit Process</h2>
<p>In most Denver-area jurisdictions, permits are pulled by the contractor, not the homeowner. CatPlumber handles the permit application, scheduling the inspection, and closing the permit on all work that requires it — at no extra charge to you. Call us at ${PHONE} if you have questions about your specific project.</p>
    `,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${BUSINESS_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = POST_CONTENT[slug];
  if (!content) notFound();

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${slug}`,
    datePublished: post.date,
    authorName: BUSINESS_NAME,
  });

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <StructuredData data={articleSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#1B5E8A] text-white py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title, href: `/blog/${slug}` },
              ]}
            />
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-white/15 text-white border-white/30">
                  {post.category}
                </Badge>
                <span className="text-blue-200 text-sm">
                  {formatDate(post.date)}
                </span>
                <span className="text-blue-200 text-sm">· {post.readTime}</span>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-blue-100 text-xl leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  CP
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {BUSINESS_NAME} Team
                  </p>
                  <p className="text-blue-200 text-xs">
                    Licensed Master Plumbers, Denver, CO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Article Body ─────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">
              {/* Article content */}
              <article>
                <div
                  className="
                    prose prose-lg max-w-none
                    prose-headings:font-[family-name:var(--font-space-grotesk)]
                    prose-headings:font-bold
                    prose-headings:text-[#2D3436]
                    prose-h2:text-2xl
                    prose-h2:mt-10
                    prose-h2:mb-4
                    prose-p:text-gray-600
                    prose-p:leading-relaxed
                    prose-p:mb-4
                    prose-ul:text-gray-600
                    prose-ol:text-gray-600
                    prose-li:mb-1
                    prose-strong:text-[#2D3436]
                    prose-a:text-[#1B5E8A]
                    prose-a:underline
                    [&_.lead]:text-xl
                    [&_.lead]:text-gray-600
                    [&_.lead]:leading-relaxed
                    [&_.lead]:mb-8
                    [&_.lead]:font-medium
                  "
                  dangerouslySetInnerHTML={{ __html: content.html }}
                />
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-[#1B5E8A] rounded-2xl p-6 text-white">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg mb-2">
                      Need Help?
                    </h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Have a plumbing question or need service in Denver? We&apos;re
                      here.
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button
                        href="/contact"
                        variant="primary"
                        size="sm"
                        className="w-full justify-center"
                      >
                        Free Quote
                      </Button>
                      <Button
                        href={PHONE_LINK}
                        variant="secondary"
                        size="sm"
                        className="w-full justify-center border-white text-white hover:bg-white hover:text-[#1B5E8A]"
                        aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                      >
                        Call {PHONE}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-base mb-3">
                      Related Services
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { label: "Emergency Plumbing", href: "/services/emergency-plumbing" },
                        { label: "Water Heater Service", href: "/services/water-heater-service" },
                        { label: "Leak Repair", href: "/services/leak-repair" },
                        { label: "Drain Cleaning", href: "/services/drain-trap-cleaning" },
                      ].map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-[#1B5E8A] hover:underline underline-offset-2"
                          >
                            → {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Related Posts ─────────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-[#F5F5F0]" aria-labelledby="related-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2
                id="related-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#2D3436] mb-8"
              >
                More Articles
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group block h-full focus-visible:outline-none"
                    >
                      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full hover:shadow-md hover:-translate-y-1 transition-all group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]">
                        <Badge className="mb-3 text-xs">{p.category}</Badge>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] mb-2 group-hover:text-[#1B5E8A] transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {p.excerpt}
                        </p>
                        <p className="text-gray-400 text-xs mt-4">
                          {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          {" · "}{p.readTime}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
