import {
  ADDRESS,
  BUSINESS_NAME,
  EMAIL,
  HOURS_SCHEMA,
  PHONE,
  SERVICE_AREAS,
  SERVICES,
  SITE_URL,
  type Service,
  type ServiceArea,
} from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleData {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

// ─── LocalBusiness ────────────────────────────────────────────────────────────

export function generateLocalBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "10645 Mount Spalding Ln",
      addressLocality: "Englewood",
      addressRegion: "CO",
      postalCode: "80112",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.5501,
      longitude: -104.8821,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "State",
        name: "Colorado",
      },
    })),
    openingHoursSpecification: HOURS_SCHEMA.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing Services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.shortDescription,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    sameAs: [
      `https://www.facebook.com/${BUSINESS_NAME.toLowerCase()}`,
      `https://www.yelp.com/biz/${BUSINESS_NAME.toLowerCase()}`,
      `https://www.google.com/maps/search/${encodeURIComponent(ADDRESS)}`,
    ],
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export function generateServiceSchema(
  service: Service,
  area?: ServiceArea,
): Record<string, unknown> {
  const serviceUrl = area
    ? `${SITE_URL}/service-areas/${area.slug}/${service.slug}`
    : `${SITE_URL}/services/${service.slug}`;

  const name = area
    ? `${service.name} in ${area.name}, CO`
    : `${service.name} – ${BUSINESS_NAME}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name,
    description: service.shortDescription,
    url: serviceUrl,
    provider: {
      "@type": "Plumber",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress: "10645 Mount Spalding Ln",
        addressLocality: "Englewood",
        addressRegion: "CO",
        postalCode: "80112",
        addressCountry: "US",
      },
    },
    ...(area && {
      areaServed: {
        "@type": "City",
        name: area.name,
        containedInPlace: {
          "@type": "State",
          name: "Colorado",
        },
      },
    }),
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
      },
      availability: "https://schema.org/InStock",
    },
  };
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function generateFAQSchema(
  faqs: FAQItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── AggregateRating ──────────────────────────────────────────────────────────

export function generateAggregateRatingSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Plumber",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
    },
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
  };
}

// ─── Article ──────────────────────────────────────────────────────────────────

export function generateArticleSchema(
  article: ArticleData,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url.startsWith("http")
      ? article.url
      : `${SITE_URL}${article.url}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      "@type": "Organization",
      name: article.authorName ?? BUSINESS_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(article.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: article.imageUrl.startsWith("http")
          ? article.imageUrl
          : `${SITE_URL}${article.imageUrl}`,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url.startsWith("http")
        ? article.url
        : `${SITE_URL}${article.url}`,
    },
  };
}
