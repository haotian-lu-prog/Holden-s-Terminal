import { escapeHtml } from "../../lib/format.js";
export function SectionHeader({ eyebrow, title, description, meta }) {
    return `
    <div class="section-header">
      <div>
        ${eyebrow ? `<span class="eyebrow">${escapeHtml(eyebrow)}</span>` : ""}
        <h2>${escapeHtml(title)}</h2>
        ${description ? `<p>${escapeHtml(description)}</p>` : ""}
      </div>
      ${meta ? `<span class="section-meta">${escapeHtml(meta)}</span>` : ""}
    </div>
  `;
}
