import type { Currency } from "../types/investment.js";

const currencyLocales: Record<Currency, string> = {
  USD: "en-US",
  JPY: "ja-JP",
  EUR: "de-DE"
};

export function escapeHtml(value: unknown = ""): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatCurrency(value: number, currency: Currency = "USD", compact = false): string {
  return new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" || compact ? 0 : 2,
    notation: compact ? "compact" : "standard"
  }).format(value);
}

export function formatNumber(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

export function formatPercent(value: number, maximumFractionDigits = 1): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value)}%`;
}

export function signedPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatPercent(value)}`;
}

export function toneForNumber(value: number): "positive" | "negative" | "neutral" {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

export function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}
