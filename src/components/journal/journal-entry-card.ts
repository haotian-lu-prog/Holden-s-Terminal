import { escapeHtml } from "../../lib/format.js";
import type { JournalEntry } from "../../types/investment.js";

export function JournalEntryCard(entry: JournalEntry): string {
  return `
    <article class="item journal-card">
      <div class="item-header">
        <div>
          <h4>${escapeHtml(entry.asset)} · ${escapeHtml(entry.type)}</h4>
          <small>${escapeHtml(entry.date)} · review ${escapeHtml(entry.reviewDate)}</small>
        </div>
        <span class="status-pill">${escapeHtml(entry.type)}</span>
      </div>
      <dl class="decision-grid">
        <div>
          <dt>Rationale</dt>
          <dd>${escapeHtml(entry.rationale)}</dd>
        </div>
        <div>
          <dt>Expected Outcome</dt>
          <dd>${escapeHtml(entry.expectedOutcome)}</dd>
        </div>
        <div>
          <dt>Actual Result</dt>
          <dd>${escapeHtml(entry.actualResult || "Pending review.")}</dd>
        </div>
      </dl>
      <div class="meta">
        <span class="tag">Linked thesis: ${escapeHtml(entry.linkedThesis)}</span>
      </div>
    </article>
  `;
}
