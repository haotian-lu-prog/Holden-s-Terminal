import { escapeHtml, formatPercent } from "../../lib/format.js";
import type { ResearchTopic } from "../../types/investment.js";

export function ResearchCard(topic: ResearchTopic): string {
  return `
    <article class="item research-card">
      <div class="item-header">
        <div>
          <h4>${escapeHtml(topic.title)}</h4>
          <small>${escapeHtml(topic.status)} · conviction ${formatPercent(topic.conviction, 0)} · updated ${escapeHtml(topic.updatedAt)}</small>
        </div>
        <span class="status-pill">${escapeHtml(topic.status)}</span>
      </div>
      <p>${escapeHtml(topic.note)}</p>
      <div class="thesis-box">
        <b>Thesis</b>
        <span>${escapeHtml(topic.thesis)}</span>
      </div>
      <div class="matrix">
        <div class="scenario">
          <b>Bull</b>
          <p>${escapeHtml(topic.bullCase)}</p>
        </div>
        <div class="scenario">
          <b>Bear</b>
          <p>${escapeHtml(topic.bearCase)}</p>
        </div>
      </div>
      <div class="meta">
        ${topic.linkedAssets.map((asset) => `<span class="ticker-chip">${escapeHtml(asset)}</span>`).join("")}
        ${topic.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    </article>
  `;
}
