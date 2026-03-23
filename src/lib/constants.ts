export const BUSINESS_NAME = "CatPlumber";
export const ADDRESS = "10645 Mount Spalding Ln, Englewood, CO 80112";
export const PHONE = "(720) 717-3990";
export const PHONE_LINK = "tel:+17207173990";
export const EMAIL = "info@catplumber.com";
export const DOMAIN = "catplumber.com";
export const SITE_URL = `https://${DOMAIN}`;

export const HOURS_DISPLAY = [
  { days: "Mon – Fri", hours: "7:00 AM – 7:00 PM" },
  { days: "Saturday", hours: "8:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "Emergency Only" },
];

export const HOURS_SCHEMA = [
  { dayOfWeek: "Monday", opens: "07:00", closes: "19:00" },
  { dayOfWeek: "Tuesday", opens: "07:00", closes: "19:00" },
  { dayOfWeek: "Wednesday", opens: "07:00", closes: "19:00" },
  { dayOfWeek: "Thursday", opens: "07:00", closes: "19:00" },
  { dayOfWeek: "Friday", opens: "07:00", closes: "19:00" },
  { dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
];

export interface ServiceArea {
  name: string;
  slug: string;
  distance: string;
  priority: number;
}

export const SERVICE_AREAS: ServiceArea[] = [
  { name: "Englewood", slug: "englewood", distance: "0 mi", priority: 1 },
  { name: "Highlands Ranch", slug: "highlands-ranch", distance: "3 mi", priority: 2 },
  { name: "Centennial", slug: "centennial", distance: "4 mi", priority: 3 },
  { name: "Lone Tree", slug: "lone-tree", distance: "5 mi", priority: 4 },
  { name: "Greenwood Village", slug: "greenwood-village", distance: "6 mi", priority: 5 },
  { name: "Littleton", slug: "littleton", distance: "6 mi", priority: 6 },
  { name: "Parker", slug: "parker", distance: "12 mi", priority: 7 },
  { name: "Aurora", slug: "aurora", distance: "14 mi", priority: 8 },
  { name: "Denver", slug: "denver", distance: "15 mi", priority: 9 },
  { name: "Castle Pines", slug: "castle-pines", distance: "15 mi", priority: 10 },
  { name: "Castle Rock", slug: "castle-rock", distance: "20 mi", priority: 11 },
  { name: "Foxfield", slug: "foxfield", distance: "8 mi", priority: 12 },
];

export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    name: "Toilet Replacement",
    slug: "toilet-replacement",
    shortDescription:
      "Full toilet replacement and installation with warranty on parts and labor.",
    icon: "🚽",
  },
  {
    name: "Vanity Installation",
    slug: "vanity-installation",
    shortDescription:
      "Bathroom vanity installation including plumbing hookups and fixture fitting.",
    icon: "🪥",
  },
  {
    name: "Drain & Trap Cleaning",
    slug: "drain-trap-cleaning",
    shortDescription:
      "Professional drain snaking and P-trap cleaning to restore full flow.",
    icon: "🔧",
  },
  {
    name: "Faucet Replacement",
    slug: "faucet-replacement",
    shortDescription:
      "Kitchen and bathroom faucet replacement with modern fixture options.",
    icon: "🚰",
  },
  {
    name: "Gasket Replacement",
    slug: "gasket-replacement",
    shortDescription:
      "Stop drips at the source with precision gasket and seal replacement.",
    icon: "⭕",
  },
  {
    name: "Leak Repair",
    slug: "leak-repair",
    shortDescription:
      "Fast detection and repair of pipe, joint, and fixture leaks.",
    icon: "💧",
  },
  {
    name: "Emergency Plumbing",
    slug: "emergency-plumbing",
    shortDescription:
      "24/7 emergency response for burst pipes, major leaks, and flooding.",
    icon: "🚨",
  },
  {
    name: "Water Heater Service",
    slug: "water-heater-service",
    shortDescription:
      "Water heater installation, repair, and maintenance for all makes and models.",
    icon: "🔥",
  },
];

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: SERVICE_AREAS.slice(0, 6).map((a) => ({
      label: a.name,
      href: `/service-areas/${a.slug}`,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const COLORS = {
  deepBlue: "#1B5E8A",
  copper: "#D4782F",
  teal: "#2EC4B6",
  charcoal: "#2D3436",
  warmGray: "#F5F5F0",
  white: "#FFFFFF",
  alertRed: "#E74C3C",
} as const;
