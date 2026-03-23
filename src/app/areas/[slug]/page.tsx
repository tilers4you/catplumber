import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleMap } from "@/components/maps/GoogleMap";

// ─── Area-specific content ────────────────────────────────────────────────────

interface AreaContent {
  intro: string;
  detail: string;
  highlight: string;
  faqs: { q: string; a: string }[];
}

const AREA_CONTENT: Record<string, AreaContent> = {
  "englewood-co": {
    intro:
      "Englewood is CatPlumber's home base — our shop is right here on Mount Spalding Lane, which means we can reach most Englewood addresses in under 20 minutes. We know Englewood's housing stock well, from the post-war ranch homes off South Broadway with their original copper supply lines to the newer townhomes along the South Platte River with PEX plumbing throughout.",
    detail:
      "Englewood's water comes from Denver Water, which delivers moderately hard water that tends to accelerate mineral buildup in water heaters and on faucet aerators. We recommend annual water heater inspections for Englewood homes, especially units over five years old. Our team handles everything from routine drain cleaning in the older bungalows near Cushing Park to full re-pipes in the mixed-use developments near CityCenter.",
    highlight: "Being headquartered in Englewood means same-day service is nearly always available, and emergency response typically arrives within 45 minutes.",
    faqs: [
      {
        q: "How quickly can you reach Englewood for an emergency?",
        a: "Typically 30–45 minutes for most Englewood addresses. Our shop is on Mount Spalding Lane, so we're already local.",
      },
      {
        q: "Do you service the older homes near South Broadway?",
        a: "Yes. We're experienced with the original galvanized and copper plumbing in Englewood's older housing stock, including pipe condition assessment and targeted re-pipe where deterioration is found.",
      },
      {
        q: "Are permits required for plumbing work in Englewood?",
        a: "Permits are required for major plumbing work including new installations and water heater replacements. We pull all required permits and schedule inspections on your behalf.",
      },
    ],
  },
  "highlands-ranch-co": {
    intro:
      "Highlands Ranch is one of the largest planned communities in Colorado, and its homes reflect that consistent build quality — mostly 1990s and 2000s construction with standard PVC drain lines and CPVC or PEX supply plumbing. CatPlumber serves all Highlands Ranch neighborhoods including Backcountry, Firelight, and Westridge.",
    detail:
      "The biggest plumbing challenges in Highlands Ranch relate to age: homes built in the 1990s are now hitting the 25–30 year mark where original water heaters, washing machine valves, and supply fixture shut-offs are reaching end of life. We proactively recommend a plumbing inspection for any Highlands Ranch home approaching the 20-year mark to catch these failures before they cause water damage.",
    highlight: "Highlands Ranch has one of the highest concentrations of our repeat customers — we're the go-to plumber for many HOA-managed communities throughout HRCA.",
    faqs: [
      {
        q: "Does the HRCA have specific plumbing requirements for repairs?",
        a: "HRCA governs exterior modifications, but interior plumbing is regulated by Douglas County. We're familiar with both and pull the correct permits for every job.",
      },
      {
        q: "Why is my water heater in Highlands Ranch failing earlier than expected?",
        a: "Douglas County water is very hard — among the hardest in the metro. This accelerates sediment buildup and anode rod consumption. We recommend flushing your tank annually and replacing the anode rod every 3–4 years.",
      },
      {
        q: "Can you service the townhomes and condos in Highlands Ranch?",
        a: "Yes. We work in both single-family homes and attached dwellings throughout the community. For condo work, we coordinate with HOA requirements as needed.",
      },
    ],
  },
  "centennial-co": {
    intro:
      "Centennial is one of the newest cities in the United States, incorporated in 2001, but its housing stock spans decades — from the 1970s ranches near Arapahoe Road to recent luxury builds in the Willow Creek and Foxridge neighborhoods. CatPlumber serves all of Centennial with the same flat-rate pricing and same-day availability.",
    detail:
      "Centennial's mix of older and newer homes means we see a wide range of plumbing infrastructure on our calls. Homes built before 1990 often have polybutylene supply lines ('Quest pipe'), which became notorious for failure and was removed from production — if your home has gray plastic supply piping, a re-pipe estimate is worth getting before a failure forces the issue. Newer Centennial homes are generally in great shape with quality PEX installations.",
    highlight: "Centennial is one of our fastest-growing service areas, with many families requesting us specifically after referrals from their Highlands Ranch and Englewood neighbors.",
    faqs: [
      {
        q: "How do I know if my Centennial home has polybutylene pipes?",
        a: "Polybutylene pipes are gray or sometimes white, and typically labeled 'PB' or 'Quest' on the pipe. They were commonly installed in the Denver metro from the 1970s through the mid-1990s. We provide free polybutylene identification during any service call.",
      },
      {
        q: "Do you serve the newer developments near E-470?",
        a: "Yes, including Saddle Rock, Piney Creek, and other communities along the E-470 corridor in Centennial.",
      },
      {
        q: "What permits are needed for plumbing work in Centennial?",
        a: "Centennial contracts its building department through Arapahoe County. Permits are required for water heater replacements and new fixture installations. We handle the permit process for you.",
      },
    ],
  },
  "lone-tree-co": {
    intro:
      "Lone Tree is a premium suburb with high-end housing stock and exacting standards — which is exactly the kind of work CatPlumber specializes in. From the estate homes in RidgeGate to the luxury townhomes near Park Meadows, our plumbers bring the precision and professionalism that Lone Tree residents expect.",
    detail:
      "Lone Tree homes are generally well-maintained and newer, which means plumbing calls here tend to be planned upgrades (luxury faucets, fixture replacements, water softener installations) alongside the occasional emergency. We stock premium fixture brands for Lone Tree customers who want quality matching their home, and we work cleanly — protecting flooring, cabinetry, and finishes on every call.",
    highlight: "Our Lone Tree customers consistently remark on our punctuality and clean work. We wear shoe covers, lay drop cloths, and leave every job site cleaner than we found it.",
    faqs: [
      {
        q: "Can you install high-end or designer faucets and fixtures?",
        a: "Yes. We install Waterworks, Brizo, Grohe, and other luxury fixture brands. We recommend you source the fixture through your designer or showroom, and we handle the professional installation.",
      },
      {
        q: "Do you install whole-house water filtration systems in Lone Tree?",
        a: "Yes. We install point-of-entry filtration and water softener systems, which are popular in Lone Tree given the hard water from the Aurora Water district.",
      },
      {
        q: "How far in advance should I book for a non-emergency job?",
        a: "For planned projects, 2–3 days notice is usually sufficient. We also have same-day availability most days of the week.",
      },
    ],
  },
  "greenwood-village-co": {
    intro:
      "Greenwood Village is home to some of the most distinctive properties in Arapahoe County — from the custom estates along Cherry Creek Reservoir to the executive homes in The Preserve. CatPlumber provides discreet, high-quality plumbing service for Greenwood Village homeowners who expect both expertise and professionalism.",
    detail:
      "Plumbing in Greenwood Village's custom homes often involves non-standard configurations: multiple water heaters, complex manifold systems, in-floor radiant heating plumbing, and premium fixture brands. Our technicians are comfortable with complex systems and take the time to understand each home's unique plumbing layout before beginning work.",
    highlight: "Greenwood Village has strict noise and access ordinances. We schedule work during permitted hours and coordinate with homeowners on discretion for gated communities.",
    faqs: [
      {
        q: "Can you work on custom homes with non-standard plumbing?",
        a: "Yes. Many Greenwood Village properties have custom manifold systems, multiple zones, or European fixture brands. We assess the system before quoting and arrive prepared.",
      },
      {
        q: "Do you work in gated communities?",
        a: "Yes. We coordinate gate codes and visitor access with the homeowner in advance to ensure smooth access.",
      },
      {
        q: "Can you service commercial properties in the Greenwood Village tech corridor?",
        a: "We focus on residential plumbing. For commercial properties, contact us and we can provide a referral to a commercial plumbing specialist.",
      },
    ],
  },
  "littleton-co": {
    intro:
      "Littleton is one of the Denver metro's most beloved communities — a historic downtown, excellent schools, and a wide range of housing from the original Craftsman bungalows near Main Street to newer construction in Ken Caryl Valley. CatPlumber serves all Littleton neighborhoods including downtown, Sterne Park, Columbine Valley, and Ken Caryl.",
    detail:
      "Littleton's housing stock spans over a century, which means our technicians encounter everything from cast iron drain pipes in 1920s downtown homes to modern PEX installations in new builds. We're experienced in all pipe materials and know when to repair versus when a full replacement is the better long-term choice. For older Littleton homes, a whole-house plumbing inspection every five years is a worthwhile investment.",
    highlight: "Littleton is one of our most active service areas, and many of our Littleton customers have been with us for multiple years of service.",
    faqs: [
      {
        q: "My downtown Littleton home has original cast iron drains. Should I replace them?",
        a: "Cast iron pipes from the mid-20th century are often still functional but should be camera-inspected for cracks, scale buildup, and root intrusion. We provide drain camera services and give honest replacement advice based on what we find.",
      },
      {
        q: "Do you serve Ken Caryl Valley?",
        a: "Yes. Ken Caryl is within our service area. Note that Ken Caryl is in Jefferson County, so permits go through Jefferson County Building, which we handle.",
      },
      {
        q: "Can you handle the older plumbing in historic downtown Littleton homes?",
        a: "Absolutely. We have specific experience with galvanized, cast iron, and early copper systems common in the pre-1960 homes in and around Littleton's historic district.",
      },
    ],
  },
  "parker-co": {
    intro:
      "Parker has grown dramatically over the past two decades, transforming from a small ranching community into one of Douglas County's largest towns. Our Parker service area covers the established neighborhoods like Stroh Ranch and Stonegate through to newer developments like Anthology and Lincoln Creek.",
    detail:
      "Parker's rapid growth means that many of its homes, while newer, were built during periods when some subcontractors cut corners on plumbing quality. We see a fair number of Parker homes with improper venting, undersized supply lines, and low-quality fixture connections that need correction. We also service Parker's older ranch properties, some of which still have original galvanized pipes from the 1960s and 1970s.",
    highlight: "Parker is our furthest primary service area, but we maintain a response time commitment and schedule Parker calls efficiently to keep wait times reasonable.",
    faqs: [
      {
        q: "Is Parker within your normal service area?",
        a: "Yes. Parker is 12 miles from our base and within our standard service area. Same-day availability may be slightly more limited than closer cities, but we typically serve Parker calls within 24 hours for non-emergencies.",
      },
      {
        q: "What permits are required for plumbing work in Parker?",
        a: "Parker is in Douglas County's unincorporated jurisdiction for many areas. Permits are handled through Douglas County Building. We manage the permit process for you.",
      },
      {
        q: "Do you service the horse properties and acreage lots outside Parker proper?",
        a: "Yes, within reason. Rural properties with well and septic systems are a slightly different scope — call us to discuss your specific situation.",
      },
    ],
  },
  "aurora-co": {
    intro:
      "Aurora is the third-largest city in Colorado and has one of the most diverse housing stocks in the metro, ranging from post-WWII starter homes near Havana Street to luxury townhomes near Southlands mall. CatPlumber serves Aurora's south and west quadrants, covering neighborhoods like Saddle Rock, Tallyn's Reach, and Wheatlands.",
    detail:
      "Aurora's water comes from Aurora Water, which sources from multiple reservoirs and delivers water with variable mineral content depending on the season. This variability accelerates wear on water heater elements and cartridge faucets. We're familiar with Aurora Water's seasonal hardness patterns and adjust our maintenance recommendations accordingly.",
    highlight: "Aurora's newer southeast neighborhoods are seeing strong growth, and we've become the preferred plumber for many of the family homes in Saddle Rock and Tollgate Crossing.",
    faqs: [
      {
        q: "Which parts of Aurora do you serve?",
        a: "We primarily serve south and southeast Aurora — the neighborhoods south of Jewell Avenue and east of Buckley. For north or west Aurora, response times may be longer; call us to confirm.",
      },
      {
        q: "Does Aurora require permits for water heater replacement?",
        a: "Yes. Aurora requires a permit for water heater replacements. We pull the permit, schedule the inspection, and handle all paperwork.",
      },
      {
        q: "My Aurora home has hard water stains everywhere. What can you do?",
        a: "A whole-house water softener or salt-free conditioner is the most effective solution. We install and service these systems and can assess your water hardness on the first visit.",
      },
    ],
  },
  "denver-co": {
    intro:
      "Denver proper is a large and varied market, and while our home base is in Englewood, we serve Denver neighborhoods throughout the south part of the city including Washington Park, Cherry Creek, Bonnie Brae, University Hills, Virginia Village, and Congress Park.",
    detail:
      "Denver's older neighborhoods have some of the most challenging plumbing in the metro — original cast iron drains, galvanized supply lines, and early copper installations that are now 60–80 years old. We've repiped dozens of Denver bungalows and are comfortable diagnosing complex multi-system failures in homes that have had decades of layered plumbing work by multiple previous contractors.",
    highlight: "Cherry Creek and Washington Park are among our most-requested Denver neighborhoods. We know the housing types in these areas well and can often diagnose issues over the phone before we arrive.",
    faqs: [
      {
        q: "Do you serve all Denver neighborhoods?",
        a: "We focus on south Denver neighborhoods — Washington Park, Cherry Creek, Bonnie Brae, University Hills, Overland, and nearby. Call us to confirm coverage for your specific address.",
      },
      {
        q: "My Denver home has galvanized pipes. Should I be concerned?",
        a: "Galvanized pipes typically last 40–70 years and many Denver bungalows are approaching that threshold. Warning signs include discolored water, reduced pressure, and visible exterior corrosion. We provide free re-pipe assessments.",
      },
      {
        q: "Do you pull Denver Water permits?",
        a: "Yes. Work on Denver Water service lines requires Denver Water permits, which we handle. Interior work goes through Denver Community Planning and Development — we manage those permits as well.",
      },
    ],
  },
  "castle-pines-co": {
    intro:
      "Castle Pines is an affluent community nestled in the pine forests of Douglas County, known for its estate homes, golf courses, and exceptional quality of life. CatPlumber provides the premium service level that Castle Pines homeowners expect — and our plumbers take extra care with the custom finishes, hardwood floors, and high-end fixtures common in the area.",
    detail:
      "Castle Pines homes tend to be large, custom-built, and well-equipped with premium plumbing fixtures. Service calls here often involve multiple bathrooms, whole-home water treatment systems, and sophisticated irrigation and outdoor plumbing. We arrive prepared for complexity and carry a broader parts selection for service calls in Castle Pines.",
    highlight: "Castle Pines Village requires contractors to check in with security, which we coordinate in advance for every appointment.",
    faqs: [
      {
        q: "Is Castle Pines Village accessible for service calls?",
        a: "Yes. We call ahead to provide our contractor information to the security gate and have your address confirmed before arrival. This is a routine part of how we handle gated communities.",
      },
      {
        q: "Do you install outdoor plumbing and irrigation backflow preventers in Castle Pines?",
        a: "Yes. Outdoor plumbing, hose bib replacements, and backflow preventer testing and replacement are part of our service menu.",
      },
      {
        q: "Can you service a home with a well and municipal water?",
        a: "Castle Pines has municipal water. If you have a well for irrigation, we can handle the plumbing on the domestic water side. For well pump service, we can refer a specialist.",
      },
    ],
  },
  "castle-rock-co": {
    intro:
      "Castle Rock is Douglas County's county seat and one of Colorado's fastest-growing cities. Situated between Denver and Colorado Springs, Castle Rock has seen explosive residential development, with neighborhoods like Crystal Valley, Cobblestone Ranch, and The Meadows adding thousands of homes over the past decade.",
    detail:
      "Castle Rock's newer housing is generally well-built with modern plumbing, but rapid growth means that some developments used builder-grade fixtures and supply lines that benefit from early replacement before failure. Castle Rock is also at 6,200 feet elevation, which affects water heater performance and can accelerate wear on pressure-regulating valves.",
    highlight: "Castle Rock is our most distant service area at 20 miles, and we prioritize emergency calls from Castle Rock to ensure reasonable response times.",
    faqs: [
      {
        q: "Does altitude affect plumbing in Castle Rock?",
        a: "Yes. At 6,200 feet, atmospheric pressure is lower, which can cause pressure-regulating valves (PRVs) to be set too high relative to sea-level standards. Water heater efficiency also drops at altitude. We calibrate for elevation on every job.",
      },
      {
        q: "Is Castle Rock in your service area for emergencies?",
        a: "Yes. We respond to Castle Rock emergencies, though arrival time may be 75–90 minutes depending on traffic on I-25. We'll give you an honest ETA when you call.",
      },
      {
        q: "Do you serve the newer subdivisions like Crystal Valley and The Meadows?",
        a: "Yes. These are among the fastest-growing parts of our service area and we have growing customer relationships in both neighborhoods.",
      },
    ],
  },
  "foxfield-co": {
    intro:
      "Foxfield is a small, tight-knit town of about 700 homes situated between Centennial and Arapahoe Road. Despite its size, Foxfield has a distinct community identity and a mix of larger lot homes with mature landscaping — the kind of properties where plumbing problems can be more complex due to older pipes and expansive irrigation systems.",
    detail:
      "Foxfield homes are predominantly from the 1970s and 1980s, an era when polybutylene pipes were commonly installed in Colorado. We've encountered polybutylene in a significant number of Foxfield homes and recommend all Foxfield homeowners have their supply pipes inspected if they're uncertain about the pipe material. We provide free polybutylene identification with any service call.",
    highlight: "Foxfield's small size means everyone knows everyone — our Foxfield customers are some of our most enthusiastic referral sources.",
    faqs: [
      {
        q: "Is Foxfield inside Arapahoe County for permits?",
        a: "Yes. Foxfield is an incorporated municipality within Arapahoe County. Building permits for plumbing work are handled through the Town of Foxfield and Arapahoe County Building. We manage this.",
      },
      {
        q: "Many Foxfield homes have large lots with older irrigation. Can you help?",
        a: "We handle the plumbing side of irrigation systems — backflow preventers, supply connections, and underground supply line repairs. For the irrigation system itself, we can refer a specialist.",
      },
      {
        q: "My Foxfield home is on the older side. Is a plumbing inspection worthwhile?",
        a: "Absolutely. Homes from the 1970s–1980s in Foxfield are prime candidates for a comprehensive plumbing inspection, particularly to check for polybutylene supply pipes, corroded shut-off valves, and water heater age.",
      },
    ],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) return {};

  return {
    title: `Plumbing Services in ${area.name}, Colorado | ${BUSINESS_NAME}`,
    description: `Licensed plumbers serving ${area.name}, CO. Drain cleaning, water heaters, leak repair, toilet replacement, and emergency plumbing. Same-day service. Call (720) 717-3990.`,
    alternates: {
      canonical: `${SITE_URL}/areas/${slug}`,
    },
    openGraph: {
      title: `Plumbing Services in ${area.name}, Colorado | ${BUSINESS_NAME}`,
      description: `Professional plumbing in ${area.name}. Licensed, insured, same-day service available.`,
      url: `${SITE_URL}/areas/${slug}`,
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const content = AREA_CONTENT[slug];
  if (!content) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE,
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: "Colorado" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Plumbing Services in ${area.name}`,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: `${s.name} in ${area.name}, CO`,
          description: s.shortDescription,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={faqSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#1B5E8A] text-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Service Areas", href: "/areas" },
                { label: area.name, href: `/areas/${slug}` },
              ]}
            />
            <div className="mt-6">
              <Badge className="mb-4 bg-white/15 text-white border-white/30">
                📍 {area.name}, Colorado · {area.distance} from base
              </Badge>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                Plumbing Services in {area.name}, Colorado
              </h1>
              <p className="text-blue-100 text-xl max-w-2xl leading-relaxed mb-8">
                {content.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Get a Free Quote in {area.name}
                </Button>
                <Button
                  href={PHONE_LINK}
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#1B5E8A]"
                  aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                >
                  Call {PHONE}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Area detail ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="area-detail-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Badge className="mb-4">About Our {area.name} Service</Badge>
                <h2
                  id="area-detail-heading"
                  className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436] mb-6"
                >
                  Why {area.name} Residents Choose CatPlumber
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>{content.detail}</p>
                </div>

                <div className="mt-8 p-5 bg-[#F5F5F0] rounded-xl border-l-4 border-[#2EC4B6]">
                  <p className="font-semibold text-[#2D3436] mb-1">
                    {area.name} Service Highlight
                  </p>
                  <p className="text-gray-600 text-sm">{content.highlight}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1B5E8A] rounded-2xl p-6 text-white">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg mb-4">
                    Request Service in {area.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                      Free Quote
                    </Button>
                    <Button
                      href={PHONE_LINK}
                      variant="secondary"
                      size="md"
                      className="w-full justify-center border-white text-white hover:bg-white hover:text-[#1B5E8A]"
                      aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                    >
                      Call {PHONE}
                    </Button>
                  </div>
                  <div className="mt-4 space-y-1.5 text-blue-200 text-xs">
                    <p>✓ Same-day availability most days</p>
                    <p>✓ Flat-rate upfront pricing</p>
                    <p>✓ 24/7 emergency response</p>
                    <p>✓ Licensed &amp; insured in Colorado</p>
                  </div>
                </div>

                <Card className="p-4">
                  <p className="font-semibold text-[#2D3436] text-sm mb-2">
                    Distance from Englewood
                  </p>
                  <p className="text-3xl font-bold text-[#1B5E8A]">{area.distance}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {area.priority <= 4
                      ? "Fast response, often within 30–45 min"
                      : area.priority <= 8
                      ? "Typical arrival 45–75 minutes"
                      : "Advance scheduling recommended"}
                  </p>
                </Card>

                <GoogleMap
                  address={`${area.name}, Colorado`}
                  city={area.name}
                  className="h-48 w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Services in this Area ─────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-[#F5F5F0]" aria-labelledby="area-services-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-3">What We Do in {area.name}</Badge>
              <h2
                id="area-services-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436] mb-3"
              >
                Full Plumbing Services Available in {area.name}
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Every service we offer is available in {area.name} — no
                restricted areas, no up-charging for location.
              </p>
            </div>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              role="list"
            >
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-start gap-3 rounded-xl bg-white border border-gray-100 p-4 hover:border-[#1B5E8A]/30 hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                  >
                    <span className="text-2xl mt-0.5 shrink-0" aria-hidden="true">
                      {service.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-[#2D3436] text-sm group-hover:text-[#1B5E8A] transition-colors">
                        {service.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="area-faq-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-3">Local Questions</Badge>
              <h2
                id="area-faq-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436]"
              >
                {area.name} Plumbing FAQ
              </h2>
            </div>
            <dl className="space-y-5">
              {content.faqs.map((faq) => (
                <Card key={faq.q} className="p-6">
                  <dt className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#2D3436] text-lg mb-2">
                    {faq.q}
                  </dt>
                  <dd className="text-gray-600 leading-relaxed">{faq.a}</dd>
                </Card>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Nearby Areas ─────────────────────────────────────────────────── */}
        <section className="py-12 bg-[#F5F5F0]" aria-labelledby="nearby-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="nearby-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#2D3436] mb-6"
            >
              Other Areas We Serve Near {area.name}
            </h2>
            <ul className="flex flex-wrap gap-2" role="list">
              {SERVICE_AREAS.filter((a) => a.slug !== slug)
                .slice(0, 8)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-[#1B5E8A]/20 text-[#1B5E8A] text-sm font-medium hover:bg-[#1B5E8A] hover:text-white hover:border-[#1B5E8A] transition-all focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16"
          aria-labelledby="area-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="area-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3"
            >
              Need a Plumber in {area.name}?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Call us now or fill out our quick contact form — we&apos;ll confirm
              availability in {area.name} and get you scheduled today.
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
