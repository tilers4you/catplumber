import Link from "next/link";
import { StructuredData } from "./StructuredData";
import { SITE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <StructuredData data={schema} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-medium text-[#2D3436]"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-[#1B5E8A] transition-colors duration-150 underline-offset-2 hover:underline"
                    >
                      {item.label}
                    </Link>
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-gray-400"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06L7.28 11.78a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06z" />
                    </svg>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
