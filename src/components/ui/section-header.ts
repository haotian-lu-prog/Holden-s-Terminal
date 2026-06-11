import { escapeHtml } from "../../lib/format.js";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string;
}

export function SectionHeader({ eyebrow, title, description, meta }: SectionHeaderProps): string {
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
