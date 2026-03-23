/**
 * Merges class names, filtering out falsy values.
 * Handles string, undefined, null, and boolean inputs.
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a 10-digit US phone number string to (XXX) XXX-XXXX format.
 * Accepts digits-only strings or strings with common separators.
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    const d = digits.slice(1);
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  // Return as-is if format is unrecognized
  return raw;
}

/**
 * Converts a string to a URL-safe slug.
 * Lowercases, strips non-alphanumeric characters, replaces spaces/underscores with hyphens.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Capitalizes the first letter of each word in a string.
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Truncates a string to maxLength, appending an ellipsis if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}
