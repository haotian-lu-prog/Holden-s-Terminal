import { escapeHtml } from "../../lib/format.js";
import type { MetricCardModel } from "../../types/investment.js";

export function MetricCard({ label, value, meta, delta, tone = "neutral" }: MetricCardModel): string {
  return `
    <article class="metric-card ${tone}">
      <span>${escapeHtml(label)}</span>
      <b>${escapeHtml(value)}</b>
      <div class="metric-foot">
        ${delta ? `<strong>${escapeHtml(delta)}</strong>` : "<strong>--</strong>"}
        ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
      </div>
    </article>
  `;
}
