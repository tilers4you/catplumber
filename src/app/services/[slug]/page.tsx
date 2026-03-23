import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_LINK,
  SERVICES,
  SITE_URL,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateServiceSchema } from "@/lib/schema";

// ─── Rich content per service ────────────────────────────────────────────────

interface ServiceContent {
  intro: string[];
  whenToCall: { heading: string; items: string[] };
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "toilet-replacement": {
    intro: [
      "A malfunctioning toilet is more than an inconvenience — it can waste thousands of gallons of water per year and signal deeper plumbing issues. At CatPlumber, toilet replacement is one of our most common and most straightforward services, and we've streamlined the process so you're usually without a working toilet for less than two hours.",
      "We stock a variety of toilet models in our service vehicles, from economical standard-height units to comfort-height ADA-compliant designs and water-conserving dual-flush models. Whether you're upgrading for efficiency, accessibility, or simply replacing a cracked or perpetually running toilet, we bring the right unit to your door.",
      "Our technicians handle the complete job: shutting off the water supply, draining and disconnecting the old toilet, inspecting and replacing the wax ring, setting and leveling the new unit, connecting supply lines, and verifying flush performance. We also haul away the old toilet at no additional charge.",
      "We back every toilet replacement with a one-year labor warranty and pass through the full manufacturer's warranty on the new fixture — typically 5 to 10 years depending on the brand. If anything is wrong after we leave, we come back and fix it for free.",
    ],
    whenToCall: {
      heading: "Signs You Need a Toilet Replacement",
      items: [
        "The toilet rocks or shifts when you sit — a cracked base can cause sewage leaks",
        "Constant running that a new flapper hasn't fixed after two attempts",
        "Hairline cracks in the porcelain bowl or tank",
        "Frequent clogs requiring multiple plunging sessions per week",
        "The toilet was installed before 1994 and uses 3.5+ gallons per flush",
        "Surface staining or mineral buildup that won't clean off",
      ],
    },
    process: [
      { step: "Assessment", desc: "We verify the toilet type, floor flange condition, and supply line situation before ordering parts." },
      { step: "Shut-off & Drain", desc: "Water supply closed, tank drained fully to prevent spills during removal." },
      { step: "Removal", desc: "Old toilet disconnected, wax ring removed, flange inspected and repaired if needed." },
      { step: "Installation", desc: "New wax ring set, toilet positioned and bolted down, supply line connected." },
      { step: "Testing", desc: "Multiple test flushes, check for leaks at base and supply connection, adjustments made." },
      { step: "Cleanup & Haul", desc: "Work area cleaned, old toilet removed from your property at no charge." },
    ],
    faqs: [
      {
        q: "How long does a toilet replacement take?",
        a: "Most toilet replacements take 60 to 90 minutes from arrival to completion. If the floor flange needs repair, add another 30–45 minutes.",
      },
      {
        q: "Do I need to supply the new toilet?",
        a: "No. We carry standard and comfort-height toilets in our service vehicles. If you have a specific model in mind, let us know when booking and we can source it before arrival.",
      },
      {
        q: "Will you remove and dispose of my old toilet?",
        a: "Yes, old toilet removal and haul-away is included in every replacement service at no extra charge.",
      },
      {
        q: "Can you replace a toilet if the floor flange is damaged?",
        a: "Absolutely. Flange repair is a common add-on. We carry repair flanges and stainless bolts to handle most damage on the spot.",
      },
    ],
  },

  "vanity-installation": {
    intro: [
      "A bathroom vanity replacement transforms the look and function of your bathroom in a single day. The plumbing side of a vanity installation — supply connections, drain hookup, and P-trap assembly — is precisely where DIY projects most often go wrong, leading to hidden leaks that can damage cabinets and subfloors over time.",
      "CatPlumber handles vanity installations for both prefabricated cabinet-and-sink combos and custom vanities sourced separately. We coordinate the plumbing to match the new cabinet dimensions, whether that means adjusting supply line lengths, extending drain rough-ins, or relocating shut-off valves to fit inside the new cabinet.",
      "Our process includes disconnecting and removing the old vanity, preparing the supply and drain connections for the new unit, setting and securing the cabinet, installing the sink and faucet hardware, connecting all water lines, and verifying every connection is leak-free before we leave.",
      "We recommend pairing a vanity installation with a faucet upgrade at the same visit — the labor overlap means you get a full bathroom refresh for a fraction of scheduling two separate appointments.",
    ],
    whenToCall: {
      heading: "When to Replace Your Bathroom Vanity",
      items: [
        "Cabinet doors are warped or swollen from water damage under the sink",
        "Slow drain that repeated cleaning hasn't resolved — may require new P-trap",
        "Remodeling or updating your bathroom's style",
        "Converting from a pedestal sink to a vanity for more storage",
        "Current vanity is too low for comfortable use (ADA height upgrade)",
        "Supply valves are corroded and need replacement during the job",
      ],
    },
    process: [
      { step: "Measure & Plan", desc: "Confirm rough-in dimensions, supply valve locations, and drain placement before ordering." },
      { step: "Shut-off", desc: "Hot and cold supply valves closed, lines drained." },
      { step: "Old Vanity Out", desc: "Disconnect plumbing, detach from wall, remove cabinet and sink." },
      { step: "Rough-in Prep", desc: "Adjust supply stub-outs and drain if needed to match new vanity layout." },
      { step: "New Vanity Set", desc: "Cabinet secured to wall studs, sink and faucet installed, drain assembled." },
      { step: "Final Connection", desc: "Supply lines connected, P-trap set, all joints checked under pressure." },
    ],
    faqs: [
      {
        q: "Can you install a vanity I purchased myself?",
        a: "Yes. We install customer-supplied vanities frequently. Just confirm the rough-in dimensions match your existing plumbing before purchasing.",
      },
      {
        q: "Do you install the faucet as part of the vanity job?",
        a: "Faucet installation is typically included when it's part of a vanity replacement. If you're adding a faucet to an existing sink, it's a separate service.",
      },
      {
        q: "How long does vanity installation take?",
        a: "A standard vanity swap takes 2–4 hours. If significant rough-in modifications are needed, it could run up to a full day.",
      },
      {
        q: "Will you haul away the old vanity?",
        a: "Yes, old vanity and sink removal and disposal is included.",
      },
    ],
  },

  "drain-trap-cleaning": {
    intro: [
      "A slow or completely blocked drain is one of the most common plumbing complaints in Denver homes, and it's almost always fixable in a single visit. CatPlumber's drain and trap cleaning service goes beyond the store-bought liquid drain cleaners that temporarily dissolve organic matter — we physically remove the blockage and leave the drain flowing at full capacity.",
      "Most slow drains are caused by hair, soap scum, and grease accumulating in the P-trap and the first few feet of drain pipe. Our technicians start with a P-trap disassembly and cleaning, then use a professional-grade drain snake to clear deeper obstructions. For persistent or recurring clogs, we can run a camera to identify root intrusion or pipe scale buildup.",
      "We avoid chemical drain cleaners on principle: they're corrosive to older pipe materials, they rarely clear solid obstructions fully, and they create hazardous conditions for the next plumber who opens the drain. Mechanical cleaning is both more effective and safer for your plumbing system.",
      "After clearing the drain, we run hot water for several minutes, verify the drain rate, and reassemble the trap with new washers to prevent future odor seepage. We also check the adjacent fixtures to catch any related issues before we pack up.",
    ],
    whenToCall: {
      heading: "Signs You Need Professional Drain Cleaning",
      items: [
        "Sink or tub takes more than 60 seconds to drain after use",
        "Gurgling sounds from the drain after water runs down",
        "Foul odors rising from the drain even after cleaning the stopper",
        "Multiple fixtures draining slowly at the same time — indicates a main line issue",
        "Water backing up into other fixtures (e.g., toilet gurgles when sink drains)",
        "Recurring clogs within weeks of DIY treatment",
      ],
    },
    process: [
      { step: "Diagnosis", desc: "Identify whether the clog is localized (P-trap, individual line) or a main-line issue." },
      { step: "P-Trap Pull", desc: "Remove and clean the P-trap by hand — catches most hair and soap clogs immediately." },
      { step: "Snake the Line", desc: "Professional drum snake or sectional machine clears the drain line to the stack." },
      { step: "Flush Test", desc: "Run hot water for 2–3 minutes to confirm full flow is restored." },
      { step: "Trap Reassembly", desc: "Reinstall P-trap with new washers; check all joints for leaks." },
      { step: "Odor Treatment", desc: "Optional enzyme treatment for persistent drain odors." },
    ],
    faqs: [
      {
        q: "Why not just use Drano or similar products?",
        a: "Chemical drain cleaners dissolve organic matter but don't remove solid blockages like grease plugs or solid debris. They also degrade PVC fittings and leave caustic residue that's dangerous for technicians. Mechanical snaking is faster, safer, and more thorough.",
      },
      {
        q: "How often should drains be professionally cleaned?",
        a: "Kitchen drains benefit from an annual cleaning due to grease buildup. Bathroom drains typically need service every 2–3 years unless you have multiple people in the household.",
      },
      {
        q: "Can you clean a main sewer line?",
        a: "Yes. Main sewer line clearing is a separate service requiring larger equipment. If we find your clog is in the main line, we'll quote that work on the spot.",
      },
      {
        q: "Will you make a mess cleaning the drain?",
        a: "We protect your vanity cabinet and floor with drop cloths and clean up completely before leaving.",
      },
    ],
  },

  "faucet-replacement": {
    intro: [
      "A dripping faucet wastes up to 3,000 gallons of water per year and adds roughly $20–$35 to your annual water bill — and that's just a slow drip. A leaking faucet that requires multiple turns to fully close, or one with inconsistent temperature control, is ready for replacement. At CatPlumber, faucet replacement is a clean, predictable job that usually takes under 90 minutes.",
      "We replace all types of residential faucets: kitchen single-handle and double-handle designs, widespread bathroom faucets, vessel sink faucets, pull-out and pull-down kitchen faucets, and utility/laundry room faucets. If you've already purchased a faucet you love, we'll install it. If you want recommendations, we stock popular mid-range brands including Moen, Delta, and Kohler.",
      "Faucet replacement in older Denver homes sometimes surfaces corroded supply valves or worn supply lines that need addressing at the same time. We identify these issues before quoting so you're not surprised mid-job. Replacing the supply lines and valves at the same time as the faucet is always more cost-effective than a return visit.",
      "Every faucet we install is tested through full hot-and-cold cycling, flow rate verification, and a check of the aerator and spray head. We leave the work area clean and provide you with the warranty card and documentation for the new fixture.",
    ],
    whenToCall: {
      heading: "When to Replace Rather Than Repair a Faucet",
      items: [
        "The faucet drips even after replacing the cartridge or washers twice",
        "Mineral staining or corrosion that won't clean off the fixture body",
        "Low water pressure only at one faucet — often a blocked aerator or worn cartridge",
        "The handle is loose, stripped, or requires excessive force to operate",
        "Squealing or grinding noise when the handle is turned",
        "You want to upgrade to a touchless, pull-down, or high-arc design",
      ],
    },
    process: [
      { step: "Shut-off Valves", desc: "Close hot and cold supply valves under the sink or at the main." },
      { step: "Old Faucet Out", desc: "Disconnect supply lines, remove mounting hardware, pull old faucet." },
      { step: "Valve & Supply Check", desc: "Inspect shut-off valves and supply lines; replace if corroded." },
      { step: "New Faucet Install", desc: "Set new faucet deck plate if needed, thread through sink deck, hand-tighten mounting nut." },
      { step: "Supply Connection", desc: "Connect new supply lines, apply thread sealant at compression fittings." },
      { step: "Test & Adjust", desc: "Open supply valves, test full hot/cold cycle, adjust handle limit if applicable." },
    ],
    faqs: [
      {
        q: "Can you install a faucet I already bought?",
        a: "Yes, customer-supplied faucets are a large part of what we install. Make sure it's the correct hole configuration for your sink before purchasing.",
      },
      {
        q: "How do I know if my faucet needs 1, 2, or 3 holes?",
        a: "Look under your sink — you'll see how many supply lines attach to the faucet deck. Single-handle faucets typically use 1 or 3 holes; double-handle widespread faucets use 3. We can assess this during a free estimate.",
      },
      {
        q: "Do you replace the supply lines too?",
        a: "We include new braided stainless supply lines with every faucet replacement. Using old supply lines with a new faucet is false economy — they're inexpensive and often the first thing to fail.",
      },
      {
        q: "What brands do you carry?",
        a: "We stock Moen and Delta in our most-requested configurations. For specialty finishes or brands, we can source and pre-order before the appointment.",
      },
    ],
  },

  "gasket-replacement": {
    intro: [
      "A faucet that drips even when fully closed is almost always a worn internal seal — a washer, O-ring, cartridge, or ceramic disc depending on your faucet type. While this sounds like a DIY repair, the reality is that misdiagnosis (replacing the wrong component), over-tightening, or re-assembly errors cause more damage than the original drip in roughly 30% of attempted DIY gasket jobs.",
      "CatPlumber's gasket and seal replacement service identifies the exact failure point, sources the correct replacement part, and reassembles the faucet properly so the drip doesn't return within a few months. We carry a comprehensive parts inventory covering most Moen, Delta, Kohler, American Standard, and Price Pfister models.",
      "In some cases, particularly with older faucets, the valve seat — the metal surface the washer presses against — becomes pitted and causes drips that reoccur even after washer replacement. We check the valve seat condition on every job and can dress or replace it on the spot to give the repair lasting results.",
      "Beyond faucets, we also replace gaskets in toilet fill valves, flush valves, and supply line connections — any point in your plumbing where a rubber or fiber seal is failing and causing a drip or seepage.",
    ],
    whenToCall: {
      heading: "Signs of Gasket or Seal Failure",
      items: [
        "Faucet drips at the spout when closed — worn cartridge or seat washer",
        "Leak around the base of the faucet handle — failed O-ring",
        "Water seeping from supply line connections — worn compression ring",
        "Toilet running intermittently — failed flapper or fill valve seal",
        "Dripping sound inside the wall after the faucet is closed",
        "Water staining or mineral deposits at a fitting connection",
      ],
    },
    process: [
      { step: "Identify Faucet Type", desc: "Determine whether it's a ball, cartridge, compression, or ceramic disc faucet." },
      { step: "Disassembly", desc: "Remove handle, trim, and packing nut to expose the cartridge or valve mechanism." },
      { step: "Part Identification", desc: "Match the worn part to the correct replacement from our parts inventory." },
      { step: "Valve Seat Check", desc: "Inspect and dress or replace the valve seat if pitting is present." },
      { step: "Reassembly", desc: "Install new gasket/cartridge, reassemble all components to spec." },
      { step: "Test", desc: "Verify no drip at spout or handle, no leaks at packing nut." },
    ],
    faqs: [
      {
        q: "Is gasket replacement cheaper than faucet replacement?",
        a: "Usually yes, if the faucet body is in good condition. We'll tell you honestly if the repair cost approaches replacement cost — at that point, a new faucet is the better value.",
      },
      {
        q: "Why does my faucet start dripping again a few months after I fix it myself?",
        a: "Usually because the valve seat is pitted. Replacing the washer on a pitted seat gives temporary relief, but the new washer wears out quickly against the rough surface. Dressing or replacing the valve seat is the permanent fix.",
      },
      {
        q: "Do you carry parts for older or unusual faucet brands?",
        a: "We stock parts for most major brands. For unusual or discontinued models, we may need to order parts — we'll confirm availability and timeline before scheduling.",
      },
      {
        q: "Can you repair a cartridge faucet?",
        a: "Yes. Cartridge replacement is one of the most common faucet repairs. Most single-handle faucets made in the last 30 years are cartridge-based.",
      },
    ],
  },

  "leak-repair": {
    intro: [
      "Water leaks are deceptive. A pinhole in a copper supply line, a slow seep at a threaded joint, or a weeping connection under the sink can run for weeks or months before becoming visible — all the while saturating framing, insulation, and drywall and creating ideal conditions for mold growth. The moment you suspect a leak, call us. Early intervention is dramatically less expensive than water damage remediation.",
      "CatPlumber's leak repair service begins with a systematic diagnosis to pinpoint the source before any walls or ceilings are opened. We use moisture meters, pressure testing, and in-wall acoustic detection to locate leaks non-invasively. In most cases we can identify the exact location and extent of the leak without cutting into your drywall.",
      "Once located, we repair the leak using the appropriate method for the pipe type and situation: solder patch or coupling for copper, push-to-connect fittings for fast accessible repairs, PEX repair couplings for flex lines, or full section replacement where the pipe condition warrants it. We always use code-approved materials and methods.",
      "After the repair, we pressure-test the line and monitor for at least 30 minutes before closing up any access points. We also document the repair with photos so you have a record for insurance purposes and future reference.",
    ],
    whenToCall: {
      heading: "Warning Signs of a Hidden Leak",
      items: [
        "Unexplained increase in your water bill — even 10% increase warrants investigation",
        "Sound of running water when all fixtures are off",
        "Damp or soft spots in walls, ceilings, or floors",
        "Mold or mildew smell in a room with no visible moisture source",
        "Paint bubbling, wallpaper peeling, or ceiling staining",
        "Meter continues to move when all water in the home is turned off",
      ],
    },
    process: [
      { step: "Meter Test", desc: "Confirm active leak by reading water meter with all fixtures off." },
      { step: "Zone Isolation", desc: "Isolate leak to supply side vs. drain side, hot vs. cold, indoor vs. outdoor." },
      { step: "Detection", desc: "Moisture meter scan of walls and floor, acoustic listening at suspected areas." },
      { step: "Access", desc: "Minimal targeted opening of wall or ceiling — we keep cuts as small as possible." },
      { step: "Repair", desc: "Patch, coupling, or section replacement using code-approved materials." },
      { step: "Pressure Test", desc: "30-minute pressure hold test to confirm repair integrity before closing up." },
    ],
    faqs: [
      {
        q: "Can you find a leak without tearing out my walls?",
        a: "In most cases, yes. We use non-invasive acoustic and moisture detection tools that let us pinpoint a leak within 12 inches of its location before we open anything.",
      },
      {
        q: "Do you repair the drywall after opening it?",
        a: "We're plumbers, not drywall contractors. We make the smallest access cut possible and leave the opening clean for patching. We can recommend a trusted drywall contractor if needed.",
      },
      {
        q: "How urgent is a small drip?",
        a: "More urgent than most people think. A drip that sounds minor can saturate wood framing within days during Denver's dry climate. Dry wood soaks up moisture quickly and holds it. Call within 24–48 hours of first noticing a potential leak.",
      },
      {
        q: "Is my leak covered by homeowner's insurance?",
        a: "Sudden and accidental leaks (like a burst pipe) are generally covered. Slow leaks due to deferred maintenance typically aren't. We provide detailed documentation to support your claim regardless.",
      },
    ],
  },

  "emergency-plumbing": {
    intro: [
      "Plumbing emergencies don't wait for business hours. A burst pipe in January at midnight, a sewage backup on a Sunday morning, or a gas-adjacent water heater failure — these are situations that can cause thousands of dollars in damage for every hour of delay. CatPlumber maintains a 24/7 emergency dispatch line and we guarantee a response time of under two hours anywhere in the Denver metro.",
      "Our emergency response vehicles are fully stocked with the most common repair materials: copper pipe and fittings, push-to-connect couplings, replacement shut-off valves, pipe repair clamps, drain cleaning equipment, and water heater components. In most emergency cases, we can complete the repair in the same visit without needing to source parts.",
      "When you call our emergency line, a real person answers — not a voicemail. We'll walk you through immediate steps to minimize damage (locating your main shut-off, for example), give you an honest ETA, and arrive ready to work. We carry wet-vac equipment for water removal and provide a damage assessment report for insurance purposes.",
      "Critically, CatPlumber does not charge after-hours or weekend surcharges. You pay the same flat rate at 2 AM on a Sunday as you would at 2 PM on a Tuesday. We believe emergency pricing is predatory and we refuse to participate in it.",
    ],
    whenToCall: {
      heading: "Situations That Require Emergency Plumbing",
      items: [
        "Burst or split pipe with active water discharge — shut off the main and call immediately",
        "Sewage backup — drain line obstruction with backup into multiple fixtures",
        "Gas smell near a water heater or any gas-supply plumbing fitting",
        "Flooding from any source that is not immediately controllable",
        "Complete loss of water supply to the entire home",
        "Toilet overflow that cannot be stopped by the supply shut-off valve",
      ],
    },
    process: [
      { step: "Immediate Triage", desc: "We walk you through shutting off water or isolating the affected zone while we're en route." },
      { step: "Arrival & Assessment", desc: "Full situation assessment within 15 minutes of arrival — cause, extent, repair options." },
      { step: "Containment", desc: "Stop active water flow, pump standing water if present, protect unaffected areas." },
      { step: "Emergency Repair", desc: "Permanent or interim repair completed using on-vehicle stock." },
      { step: "System Test", desc: "Verify repair integrity under live pressure, check all adjacent connections." },
      { step: "Documentation", desc: "Provide written report and photos for insurance claim documentation." },
    ],
    faqs: [
      {
        q: "What is your response time for emergencies?",
        a: "We guarantee arrival within 2 hours anywhere in the Denver metro. In Englewood, Highlands Ranch, and Centennial, typical response time is 45–60 minutes.",
      },
      {
        q: "Do you charge extra for nights and weekends?",
        a: "No. CatPlumber does not charge after-hours, weekend, or holiday surcharges. The price you pay is the same regardless of when you call.",
      },
      {
        q: "Where is my home's main water shut-off?",
        a: "In most Denver-area homes built after 1980, it's near the water meter in the basement or utility room. In older homes it may be outside near the foundation or at the street curb. If you can't find it, call us — we'll locate it remotely.",
      },
      {
        q: "Can you document the damage for my insurance claim?",
        a: "Yes. We photograph the damage and repair, document the cause and timeline, and provide a written report you can submit directly to your insurance company.",
      },
    ],
  },

  "water-heater-service": {
    intro: [
      "Cold showers aren't just uncomfortable — they're often the first sign of a water heater that's been quietly failing for weeks. At CatPlumber, water heater service covers the full lifecycle: diagnostic inspection of underperforming units, repair of specific component failures, and complete replacement when repair is no longer cost-effective.",
      "We work on all water heater types: traditional tank heaters in gas, electric, and propane configurations; tankless on-demand heaters from Navien, Rinnai, Rheem, and Bradford White; heat pump hybrid units; and solar-assisted systems. Our technicians are trained and certified on all major brands.",
      "For tank water heater replacement, we stock the most common residential sizes (40, 50, and 80 gallon) in our service vehicles and can typically complete a full swap — including hauling away the old unit — in under three hours. For tankless conversions, which often require gas line upsizing and dedicated venting, we provide a detailed scope before beginning work.",
      "Colorado's hard water is particularly damaging to water heater anode rods, heating elements, and heat exchangers. We recommend an annual inspection for all water heaters over five years old and can extend unit life significantly by replacing the sacrificial anode rod before sediment buildup compromises the tank.",
    ],
    whenToCall: {
      heading: "Water Heater Warning Signs",
      items: [
        "Water is noticeably less hot than it used to be or runs out faster",
        "Rumbling, popping, or banging from the tank — severe sediment accumulation",
        "Water discoloration or rusty water from hot taps — tank corrosion",
        "Visible corrosion or rust around fittings, the anode rod port, or the tank body",
        "Pooling water or moisture around the base of the heater",
        "Unit is more than 10–12 years old and hasn't been inspected recently",
      ],
    },
    process: [
      { step: "Diagnostic", desc: "Assess element, thermostat, anode, dip tube, and tank condition." },
      { step: "Repair Decision", desc: "If repair cost exceeds 50% of replacement cost, we recommend replacement and explain why." },
      { step: "Shut-off & Drain", desc: "Gas or electrical supply closed, tank drained — typically 30–45 minutes for a full tank." },
      { step: "Removal", desc: "Old unit disconnected from gas/electric supply, vent, and plumbing connections." },
      { step: "New Installation", desc: "New heater positioned, all connections made per manufacturer and code requirements." },
      { step: "Test & Verify", desc: "Burner or elements fired, temperature set to 120°F standard, T&P valve tested." },
    ],
    faqs: [
      {
        q: "Should I repair or replace my water heater?",
        a: "If the unit is under 8 years old and the issue is a single component (element, thermostat, T&P valve), repair usually makes sense. If it's over 10 years old or has multiple issues, replacement is almost always the better value.",
      },
      {
        q: "How long does water heater replacement take?",
        a: "For a standard tank swap, plan on 2.5 to 3.5 hours including the 40–50 minute drain time. Tankless installations take 4–6 hours depending on venting requirements.",
      },
      {
        q: "What size water heater do I need?",
        a: "For 1–2 people: 30–40 gallons. For 3–4 people: 50 gallons. For 5+: 75–80 gallons or a tankless unit. We recommend the right size based on your household and hot water usage patterns.",
      },
      {
        q: "Is a tankless water heater worth the upgrade?",
        a: "For most Denver households using natural gas, a tankless heater pays for itself in energy savings within 6–8 years and eliminates the possibility of a catastrophic tank failure. The upfront cost is higher, but the long-term value is usually favorable.",
      },
    ],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.name} in Denver, CO | ${BUSINESS_NAME}`,
    description: `Professional ${service.name.toLowerCase()} service in Denver and surrounding areas. ${service.shortDescription} Licensed, insured, same-day service available. Call (720) 717-3990.`,
    alternates: {
      canonical: `${SITE_URL}/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} in Denver, CO | ${BUSINESS_NAME}`,
      description: service.shortDescription,
      url: `${SITE_URL}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[slug];
  if (!content) notFound();

  const serviceSchema = generateServiceSchema(service);
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
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#1B5E8A] text-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.name, href: `/services/${slug}` },
              ]}
            />
            <div className="mt-6">
              <Badge className="mb-4 bg-white/15 text-white border-white/30">
                {service.icon} {service.name}
              </Badge>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                {service.name} in Denver, CO
              </h1>
              <p className="text-blue-100 text-xl max-w-2xl leading-relaxed mb-8">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Get a Free Quote
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

        {/* ── About the Service ─────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="about-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Badge className="mb-4">About This Service</Badge>
            <h2
              id="about-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436] mb-8"
            >
              Professional {service.name} — Done Right the First Time
            </h2>
            <div className="prose-lg space-y-5 text-gray-600 leading-relaxed">
              {content.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── When to Call ─────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-[#F5F5F0]" aria-labelledby="when-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <Badge className="mb-4">Know the Signs</Badge>
                <h2
                  id="when-heading"
                  className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436] mb-6"
                >
                  {content.whenToCall.heading}
                </h2>
                <ul className="space-y-3">
                  {content.whenToCall.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#D4782F] mt-1 shrink-0 font-bold" aria-hidden="true">
                        ✓
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Badge className="mb-4">Our Process</Badge>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#2D3436] mb-6">
                  How We Handle It
                </h3>
                <ol className="space-y-4">
                  {content.process.map((step, i) => (
                    <li key={step.step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B5E8A] text-white text-sm font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-[#2D3436]">{step.step}</p>
                        <p className="text-gray-500 text-sm mt-0.5">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4">Common Questions</Badge>
              <h2
                id="faq-heading"
                className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#2D3436]"
              >
                Frequently Asked Questions
              </h2>
            </div>
            <dl className="space-y-6">
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

        {/* ── Other Services ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-[#F5F5F0]" aria-labelledby="other-services-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="other-services-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#2D3436] mb-8"
            >
              Other Services We Offer
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
              {SERVICES.filter((s) => s.slug !== slug)
                .slice(0, 4)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-4 hover:border-[#1B5E8A]/30 hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[#1B5E8A]"
                    >
                      <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                      <span className="font-medium text-[#2D3436] text-sm group-hover:text-[#1B5E8A] transition-colors">
                        {s.name}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1B5E8A] text-white py-16"
          aria-labelledby="service-cta-heading"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="service-cta-heading"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3"
            >
              Ready to Schedule {service.name}?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Get a free estimate today. We serve Denver and the entire metro
              area with same-day availability.
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
