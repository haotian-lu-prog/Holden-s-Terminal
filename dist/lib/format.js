const currencyLocales = {
    USD: "en-US",
    JPY: "ja-JP",
    EUR: "de-DE"
};
export function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
export function formatCurrency(value, currency = "USD", compact = false) {
    return new Intl.NumberFormat(currencyLocales[currency], {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "JPY" || compact ? 0 : 2,
        notation: compact ? "compact" : "standard"
    }).format(value);
}
export function formatNumber(value, maximumFractionDigits = 0) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}
export function formatPercent(value, maximumFractionDigits = 1) {
    return `${new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value)}%`;
}
export function signedPercent(value) {
    const sign = value > 0 ? "+" : "";
    return `${sign}${formatPercent(value)}`;
}
export function toneForNumber(value) {
    if (value > 0)
        return "positive";
    if (value < 0)
        return "negative";
    return "neutral";
}
export function todayIso() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 10);
}
