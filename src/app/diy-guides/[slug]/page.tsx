import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BUSINESS_NAME, PHONE, PHONE_LINK, SITE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { DIY_GUIDES, type DIYGuide } from "../page";

// ─── Guide content ────────────────────────────────────────────────────────────

interface GuideStep {
  name: string;
  text: string;
  tip?: string;
}

interface GuideContent {
  problem: string;
  tools: { name: string; optional?: boolean; note?: string }[];
  steps: GuideStep[];
  whenToCallPro: string[];
  proTips: string[];
}

const GUIDE_CONTENT: Record<string, GuideContent> = {
  "unclog-drain-without-chemicals": {
    problem:
      "A clogged drain is one of the most common household plumbing problems — and one of the easiest to fix yourself without spending money on chemical drain cleaners that are bad for your pipes, the environment, and anyone who handles them afterward. This guide covers bathroom sink drains, tub drains, and kitchen sink drains. The technique is the same for all three, with minor variations.",
    tools: [
      { name: "Cup plunger or flange plunger", note: "A flange plunger works for both sinks and toilets. A cup plunger is better for flat drains." },
      { name: "Screwdriver (Phillips and flathead)" },
      { name: "Small bucket or container", note: "For catching water from the P-trap if needed." },
      { name: "Old toothbrush or wire brush" },
      { name: "Needle-nose pliers", optional: true },
      { name: "Flashlight", optional: true },
      { name: "Rubber gloves" },
    ],
    steps: [
      {
        name: "Clear the area and protect the floor",
        text: "Place a towel or drop cloth under the sink and clear out the cabinet so you have room to work. Put on rubber gloves — you'll likely be handling hair and organic buildup.",
      },
      {
        name: "Try plunging first",
        text: "Fill the sink with 2–3 inches of water. This gives the plunger something to push against. Cover the overflow hole (the small hole near the top of the basin on most sinks) with a wet rag — this prevents air from escaping and makes the plunger more effective. Place the plunger cup over the drain opening, ensuring a tight seal. Use firm, steady pumping strokes — push down and pull up 10–15 times without breaking the seal. On the last stroke, pull up sharply to break suction. Run hot water to test.",
        tip: "The pull stroke is as important as the push. You're trying to dislodge the clog in both directions.",
      },
      {
        name: "Remove and clean the stopper or strainer",
        text: "If plunging didn't clear it, remove the drain stopper or strainer. For a bathroom sink, the stopper usually lifts out (some require a slight turn first). For a bathtub, the stopper may be attached to a linkage under the overflow plate — unscrew the overflow cover plate and pull the linkage assembly out. Clean all hair, soap scum, and debris from the stopper using an old toothbrush. Reinstall and test.",
        tip: "Hair wrapped around the stopper pivot rod is the single most common cause of slow bathroom drains. It's gross but removing it usually solves the problem immediately.",
      },
      {
        name: "Clean the P-trap",
        text: "The P-trap is the curved pipe section under the drain — the U-shaped piece you can see in the cabinet under the sink. Place your bucket under the P-trap. Most P-traps have hand-tightenable slip nuts at each end; turn them counterclockwise and slide the trap off. Empty it into the bucket. Clean the interior with your brush under running water (use another sink). Look inside the pipe openings above and below where the trap was — shine your flashlight in. If you can see or reach a clog, remove it by hand or with needle-nose pliers. Reattach the P-trap, hand-tighten the slip nuts (no tools required — over-tightening cracks the nut), and run water for 30 seconds to verify no leaks.",
        tip: "After reattaching the P-trap, fill the sink and watch the drain connections while the water drains. Any drip means the slip nut needs slight adjustment.",
      },
      {
        name: "Use a drain snake for deeper clogs",
        text: "If the P-trap was clean and the clog persists, it's deeper in the drain line. A hand-cranked drain snake ($15–$25 at any hardware store) can reach 15–25 feet into the drain. Remove the P-trap again to access the pipe opening. Insert the snake cable and crank it clockwise as you push it into the pipe. When you feel resistance, you've reached the clog. Rotate the snake to break through or hook the obstruction. Pull back slowly, wiping the cable with a rag. Repeat until the snake moves freely. Reassemble the P-trap and test.",
      },
      {
        name: "Run hot water and verify",
        text: "Run the hottest water from your tap for 2–3 minutes. This helps flush away any remaining debris and confirms the drain is fully clear. Watch the drain rate — it should be fast with no pooling.",
        tip: "Pouring a cup of baking soda followed by white vinegar down a clear drain monthly is an effective odor treatment and mild maintenance, but it won't clear a solid clog.",
      },
    ],
    whenToCallPro: [
      "Multiple drains in the house are slow or backed up at the same time — this indicates a main sewer line issue that requires professional equipment",
      "The clog is in a drain you can't access (behind a wall, under a slab)",
      "Water is backing up into other fixtures when you run water — e.g., the toilet gurgles when you run the sink",
      "The drain clears temporarily but clogs again within a week — may indicate a structural issue, root intrusion, or partial pipe collapse",
      "You smell sewage gas from the drain — could indicate a dry or broken P-trap deeper in the system",
    ],
    proTips: [
      "Prevention is the best tool: use a mesh drain screen to catch hair and debris before it enters the pipe.",
      "Never pour grease down a kitchen drain. Let it solidify in a container and dispose in the trash.",
      "If you have a garbage disposal, run cold water (not hot) while the disposal is running — cold water keeps fats solid so they can be chopped and flushed. Hot water melts them and they re-solidify further down the pipe.",
      "Enzyme drain cleaners (not the same as caustic Drano) are safe for pipes and can be used monthly for maintenance — they digest organic matter without damaging pipes.",
    ],
  },

  "fix-running-toilet": {
    problem:
      "A toilet that runs continuously — or that fills and runs in cycles — is wasting water and money. Most running toilet causes are inexpensive, easy-to-replace parts. This guide walks through diagnosing the three most common causes: the flapper, the fill valve float, and the fill valve itself.",
    tools: [
      { name: "Replacement flapper (universal or brand-specific)" },
      { name: "Adjustable wrench" },
      { name: "Sponge or small towel" },
      { name: "Food coloring (optional, for diagnosis)" },
    ],
    steps: [
      {
        name: "Diagnose the cause with the food coloring test",
        text: "Remove the toilet tank lid and add 5–10 drops of food coloring. Do not flush. Wait 15 minutes. If color appears in the bowl without flushing, the flapper is leaking. If the tank fills and then the overflow tube drains (you'll see water going into the center tube), the float is set too high.",
      },
      {
        name: "Replace the flapper (most common fix)",
        text: "Turn off the water supply valve at the wall behind the toilet — turn clockwise until it stops. Flush to drain the tank. Unhook the old flapper from the two pegs on the overflow tube and disconnect the chain from the flush handle arm. Take the old flapper to the hardware store to match it, or buy a universal replacement. Hook the new flapper's ears onto the overflow tube pegs, attach the chain to the handle arm (leaving ½ inch of slack — too tight prevents the flapper from seating), and turn the water back on. The food coloring test should now show no leakage.",
      },
      {
        name: "Adjust the float if the tank overfills",
        text: "If water is running into the overflow tube, the water level is set too high. The float controls when the fill valve shuts off. On a ball-float design, bend the float arm slightly downward to lower the shutoff point. On a cup-float design, pinch the clip and slide the float down the shaft. The water level should be 1 inch below the top of the overflow tube.",
      },
      {
        name: "Replace the fill valve if it still runs",
        text: "If adjusting the float doesn't stop the running, the fill valve itself is worn. Fluidmaster 400A is the most universal replacement ($12–$15). Shut off the supply valve, flush, and sponge out remaining water. Disconnect the supply line from the bottom of the tank. Unscrew the locknut under the tank (counterclockwise) and pull out the old fill valve. Install the new valve per its instructions, reconnect the supply line, and turn the water on slowly.",
      },
    ],
    whenToCallPro: [
      "Water is leaking at the base of the toilet (around the floor) — the wax ring may be failing",
      "The toilet rocks or shifts — the floor flange may be cracked",
      "The tank-to-bowl bolts are leaking — tank gasket failure",
      "After replacing both flapper and fill valve, the toilet still runs",
    ],
    proTips: [
      "Keep the flush chain just slack enough — not tight. A taut chain is the most common cause of a flapper not seating properly.",
      "Buy a name-brand fill valve (Fluidmaster, Korky) — cheap generics fail faster.",
      "If your toilet requires multiple flushes regularly, check for partial drain blockage, not just the fill/flush mechanism.",
    ],
  },

  "replace-faucet-aerator": {
    problem:
      "An aerator is the small screen fitting screwed onto the tip of your faucet spout. It mixes air into the water stream, reduces splash, and saves water. Mineral deposits from Denver's hard water clog aerators and dramatically reduce water flow. Cleaning or replacing it is a 5-minute task.",
    tools: [
      { name: "Pliers (channel-lock or slip-joint)" },
      { name: "Rag or plumber's tape (to protect the aerator finish)" },
      { name: "White vinegar" },
      { name: "Old toothbrush" },
      { name: "Replacement aerator (same thread size)", optional: true },
    ],
    steps: [
      {
        name: "Unscrew the aerator",
        text: "Wrap a rag around the aerator to protect the finish. Grip with pliers and turn counterclockwise. Most aerators are hand-tight after a few months but may need a slight wrench assist to break loose the first time. Keep track of the order of the small parts (screen, washer, housing) as you disassemble.",
      },
      {
        name: "Soak in white vinegar",
        text: "Place the aerator parts in a cup of undiluted white vinegar and soak for 30–60 minutes. The acetic acid dissolves calcium and magnesium deposits. Use an old toothbrush to scrub away loosened deposits from the screen.",
      },
      {
        name: "Rinse and reassemble",
        text: "Rinse all parts thoroughly under running water. Reassemble in the same order and screw back onto the faucet hand-tight. Turn the water on and check for leaks at the aerator joint.",
      },
      {
        name: "Replace if cleaning doesn't restore flow",
        text: "If the screen is damaged or the flow still doesn't improve after cleaning, replacement aerators cost $3–$8 at any hardware store. Take the old one with you to match the thread size (standard is 15/16\" male or 55/64\" female, but sizes vary). If you can't find a match, a universal aerator kit includes multiple adapters.",
      },
    ],
    whenToCallPro: [
      "Low pressure at the aerator is the same before and after replacement — the issue is upstream (pressure-reducing valve, supply valve, or pipe)",
      "The aerator won't unscrew and the faucet spout is damaged trying to remove it",
      "All faucets in the house have low pressure simultaneously",
    ],
    proTips: [
      "In Denver's hard water areas, aerators benefit from vinegar soaking every 6 months.",
      "If you're doing other faucet work, always check the aerator at the same time — it's the most commonly overlooked maintenance item.",
    ],
  },

  "shut-off-valve-repair": {
    problem:
      "Shut-off valves under sinks and behind toilets are designed to last decades, but in Denver's hard-water environment, the packing around the valve stem gradually wears. A slow drip at the handle base is almost always the packing — not the valve body — and can be fixed without turning off the main water supply.",
    tools: [
      { name: "Adjustable wrench" },
      { name: "Screwdriver" },
      { name: "Packing washer set or graphite packing string" },
      { name: "Teflon tape" },
    ],
    steps: [
      {
        name: "Identify the drip source",
        text: "Dry the valve and handle completely with a towel. Watch carefully for 2–3 minutes. If the drip originates from the handle base (around the packing nut), proceed with this guide. If it's from the valve body, the connection, or the supply line itself, that's a different repair.",
      },
      {
        name: "Tighten the packing nut first",
        text: "Using an adjustable wrench, try tightening the packing nut (the large nut just below the handle) by one-quarter turn clockwise. Often this simple step stops the drip. Turn the water on and test before proceeding to disassembly.",
      },
      {
        name: "Replace the packing if tightening doesn't help",
        text: "Leave the water supply on. Use an adjustable wrench to turn the handle to the open position. Remove the handle (usually one screw under a decorative cap). Unscrew the packing nut and pull the stem out. Take the old packing material off the stem and replace with new packing from a washer set, or wrap several turns of graphite packing string around the stem groove. Reassemble in reverse order.",
      },
      {
        name: "Test under pressure",
        text: "With everything reassembled, cycle the valve open and closed several times. Dry the area and watch for 5 minutes to confirm the drip has stopped.",
      },
    ],
    whenToCallPro: [
      "The valve handle turns freely without engaging — the stem may be broken",
      "The valve won't close fully (water still flows when closed) — internal washer failure, replace the valve",
      "The valve body shows corrosion, green staining, or white mineral deposits on the body itself (not just the aerator)",
      "You can't turn off the fixture supply valve because it's stuck — don't force it; call us",
    ],
    proTips: [
      "Exercising shut-off valves annually — turning them fully off and back on — prevents them from seizing in the open position over years of non-use.",
      "If a valve hasn't been operated in years and feels stiff, don't force it. A seized valve is a common cause of homeowner-induced flooding.",
    ],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DIY_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = DIY_GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: `${guide.title} | ${BUSINESS_NAME} DIY Guides`,
    description: guide.excerpt,
    alternates: {
      canonical: `${SITE_URL}/diy-guides/${slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `${SITE_URL}/diy-guides/${slug}`,
    },
  };
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

export default async function DIYGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = DIY_GUIDES.find((g) => g.slug === slug) as DIYGuide | undefined;
  if (!guide) notFound();

  const content = GUIDE_CONTENT[slug];
  if (!content) notFound();

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.excerpt,
    url: `${SITE_URL}/diy-guides/${slug}`,
    totalTime: `PT${guide.timeEstimate.replace(/\D/g, "")}M`,
    supply: content.tools.map((t) => ({
      "@type": "HowToSupply",
      name: t.name,
    })),
    step: content.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
    author: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
  };

  const relatedGuides = DIY_GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <>
      <StructuredData data={howToSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#1B5E8A] text-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "DIY Guides", href: "/diy-guides" },
                { label: guide.title, href: `/diy-guides/${slug}` },
              ]}
            />
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-white/15 text-white border-white/30">
                  {guide.category}
                </Badge>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${DIFFICULTY_COLORS[guide.difficulty]}`}
                >
                  {guide.difficulty}
                </span>
                <span className="text-blue-200 text-sm">⏱ {guide.timeEstimate}</span>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {guide.title}
              </h1>
              <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
                {guide.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* ── Guide Content ─────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_300px] gap-12">

              {/* Main content */}
              <div>
                {/* Problem description */}
                <div className="mb-10">
                  <Badge className="mb-4">The Problem</Badge>
                  <p className="text-gray-600 text-lg leading-relaxed">{content.problem}</p>
                </div>

                {/* Tools */}
                <div className="mb-10">
                  <Badge className="mb-4">Tools &amp; Materials Needed</Badge>
                  <ul className="space-y-2.5" role="list">
                    {content.tools.map((tool) => (
                      <li key={tool.name} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-[#1B5E8A]/10 flex items-center justify-center text-[#1B5E8A] text-xs font-bold"
                          aria-hidden="true"
                        >
                          {tool.optional ? "○" : "●"}
                        </span>
                        <div>
                          <span className="font-medium text-[#2D3436] text-sm">
                            {tool.name}
                          </span>
                          {tool.optional && (
                            <span className="ml-1.5 text-xs text-gray-400 font-normal">
                              (optional)
                            </span>
                          )}
                          {tool.note && (
                            <p className="text-gray-400 text-xs mt-0.5">{tool.note}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="mb-10">
                  <Badge className="mb-6">Step-by-Step Guide</Badge>
                  <ol className="space-y-8" role="list">
                    {content.steps.map((step, i) => (
                      <li key={step.name} className="flex gap-5">
                        <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#1B5E8A] text-white font-bold text-sm mt-0.5">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] text-lg mb-2">
                            {step.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">{step.text}</p>
                          {step.tip && (
                            <div className="mt-3 flex items-start gap-2 bg-[#2EC4B6]/10 rounded-lg px-4 py-3">
                              <span className="text-[#2EC4B6] shrink-0" aria-hidden="true">
                                💡
                              </span>
                              <p className="text-sm text-gray-600">{step.tip}</p>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Pro Tips */}
                {content.proTips.length > 0 && (
                  <div className="mb-10">
                    <Badge className="mb-4">Pro Tips</Badge>
                    <ul className="space-y-3">
                      {content.proTips.map((tip) => (
                        <li key={tip} className="flex items-start gap-3">
                          <span className="text-[#D4782F] mt-0.5 shrink-0" aria-hidden="true">
                            ⭐
                          </span>
                          <span className="text-gray-600 text-sm leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* When to call a pro */}
                <div>
                  <Badge variant="warning" className="mb-4">
                    When to Call a Professional
                  </Badge>
                  <p className="text-gray-600 mb-4">
                    Stop and call a plumber if you encounter any of these situations:
                  </p>
                  <ul className="space-y-3">
                    {content.whenToCallPro.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true">
                          ⚠️
                        </span>
                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Card className="mt-6 p-5 bg-[#1B5E8A]/5 border-[#1B5E8A]/20">
                    <p className="font-semibold text-[#2D3436] mb-2">
                      Need a professional plumber in Denver?
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      CatPlumber is available same-day throughout the Denver metro. Free quotes, no obligation.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button href="/contact" variant="secondary" size="sm" className="bg-transparent text-[#1B5E8A] border-[#1B5E8A] hover:bg-[#1B5E8A] hover:text-white">
                        Get a Free Quote
                      </Button>
                      <Button
                        href={PHONE_LINK}
                        variant="primary"
                        size="sm"
                        aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                      >
                        Call {PHONE}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-5">
                <div className="sticky top-24 space-y-5">
                  {/* Quick facts */}
                  <Card className="p-5">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#2D3436] mb-4">
                      Guide Summary
                    </h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Difficulty</dt>
                        <dd className="font-semibold text-[#2D3436]">{guide.difficulty}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Time Required</dt>
                        <dd className="font-semibold text-[#2D3436]">{guide.timeEstimate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Steps</dt>
                        <dd className="font-semibold text-[#2D3436]">{content.steps.length}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Tools Needed</dt>
                        <dd className="font-semibold text-[#2D3436]">
                          {content.tools.filter((t) => !t.optional).length}
                        </dd>
                      </div>
                    </dl>
                  </Card>

                  {/* CTA */}
                  <div className="bg-[#1B5E8A] rounded-2xl p-5 text-white">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold mb-2">
                      Prefer a Pro?
                    </h3>
                    <p className="text-blue-100 text-sm mb-4">
                      We handle all of these jobs and more — same-day in Denver metro.
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button
                        href="/contact"
                        variant="primary"
                        size="sm"
                        className="justify-center"
                      >
                        Free Quote
                      </Button>
                      <Button
                        href={PHONE_LINK}
                        variant="secondary"
                        size="sm"
                        className="justify-center border-white text-white hover:bg-white hover:text-[#1B5E8A]"
                        aria-label={`Call ${BUSINESS_NAME} at ${PHONE}`}
                      >
                        Call {PHONE}
                      </Button>
                    </div>
                  </div>

                  {/* Related services */}
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#2D3436] text-sm mb-3">
                      Related Services
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { label: "Drain & Trap Cleaning", href: "/services/drain-trap-cleaning" },
                        { label: "Faucet Replacement", href: "/services/faucet-replacement" },
                        { label: "Gasket Replacement", href: "/services/gasket-replacement" },
                        { label: "Toilet Replacement", href: "/services/toilet-replacement" },
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

        {/* ── Related Guides ────────────────────────────────────────────────── */}
        {relatedGuides.length > 0 && (
          <section className="py-16 bg-[#F5F5F0]" aria-labelledby="related-guides-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2
                id="related-guides-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#2D3436] mb-8"
              >
                More DIY Guides
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
                {relatedGuides.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/diy-guides/${g.slug}`}
                      className="group block h-full focus-visible:outline-none"
                    >
                      <Card
                        hover
                        className="h-full p-5 group-focus-visible:ring-2 group-focus-visible:ring-[#1B5E8A]"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-xs">{g.category}</Badge>
                          <span className="text-gray-400 text-xs">{g.timeEstimate}</span>
                        </div>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#2D3436] group-hover:text-[#1B5E8A] transition-colors">
                          {g.title}
                        </h3>
                      </Card>
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
