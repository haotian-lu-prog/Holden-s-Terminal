import { ResearchCard } from "../components/research/research-card.js";
import { MetricCard } from "../components/ui/metric-card.js";
import { SectionHeader } from "../components/ui/section-header.js";
import { escapeHtml, formatPercent } from "../lib/format.js";
const statusOrder = ["idea", "researching", "active thesis", "closed"];
export function renderResearch(state) {
    const tags = tagInventory(state.researchTopics);
    const averageConviction = state.researchTopics.reduce((sum, topic) => sum + topic.conviction, 0) / state.researchTopics.length;
    return `
    ${SectionHeader({
        eyebrow: "Research",
        title: "Research Notes and Investment Theses",
        description: "Track topic tags, thesis state, linked tickers, conviction, and the current bull/bear debate.",
        meta: "idea → researching → active thesis → closed"
    })}
    <section class="metric-grid">
      ${MetricCard({
        label: "Research Topics",
        value: String(state.researchTopics.length),
        meta: "mock notes and theses",
        tone: "neutral"
    })}
      ${MetricCard({
        label: "Active Theses",
        value: String(state.researchTopics.filter((topic) => topic.status === "active thesis").length),
        meta: "sizing-relevant",
        tone: "positive"
    })}
      ${MetricCard({
        label: "Researching",
        value: String(state.researchTopics.filter((topic) => topic.status === "researching").length),
        meta: "evidence needed",
        tone: "watch"
    })}
      ${MetricCard({
        label: "Avg Conviction",
        value: formatPercent(averageConviction, 0),
        meta: "across open topics",
        tone: "neutral"
    })}
    </section>
    <section class="page-grid">
      <section class="panel">
        <div class="panel-header">
          <h3>Status Workflow</h3>
          <span class="panel-kicker">research state</span>
        </div>
        <div class="panel-body status-lane">
          ${statusOrder
        .map((status) => `
                <div class="status-row">
                  <span>${escapeHtml(status)}</span>
                  <b>${state.researchTopics.filter((topic) => topic.status === status).length}</b>
                </div>
              `)
        .join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h3>Topic Tags</h3>
          <span class="panel-kicker">${tags.length} tags</span>
        </div>
        <div class="panel-body tag-cloud">
          ${tags.map(([tag, count]) => `<span class="tag">${escapeHtml(tag)} <b>${count}</b></span>`).join("")}
        </div>
      </section>
      <section class="panel panel-span">
        <div class="panel-header">
          <h3>Thesis Register</h3>
          <span class="panel-kicker">linked tickers included</span>
        </div>
        <div class="panel-body list research-list">
          ${state.researchTopics.map(ResearchCard).join("")}
        </div>
      </section>
    </section>
  `;
}
function tagInventory(topics) {
    const counts = new Map();
    for (const topic of topics) {
        for (const tag of topic.tags) {
            counts.set(tag, (counts.get(tag) || 0) + 1);
        }
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
