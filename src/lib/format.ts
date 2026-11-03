/**
 * Formatting helpers. Everything is pinned to en-US + UTC so server and client always render identical text.
 */

type DateStyle = "short" | "long" | "month" | "day";

const DATE_OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { month: "short", day: "numeric", year: "numeric" },
  long: { month: "long", day: "numeric", year: "numeric" },
  month: { month: "long", year: "numeric" },
  day: { month: "short", day: "numeric" },
};

export function formatDate(iso: string, style: DateStyle = "short"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { ...DATE_OPTIONS[style], timeZone: "UTC" });
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${formatNumber(count)} ${count === 1 ? singular : pluralForm}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
