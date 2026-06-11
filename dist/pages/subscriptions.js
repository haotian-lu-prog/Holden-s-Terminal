import { SubscriptionTable } from "../components/subscriptions/subscription-table.js";
import { MetricCard } from "../components/ui/metric-card.js";
import { SectionHeader } from "../components/ui/section-header.js";
import { escapeHtml, formatCurrency } from "../lib/format.js";
import { annualRunRate, monthlyRunRate } from "../lib/subscriptions.js";
const strategicValues = ["research", "AI", "infra", "media", "learning"];
export function renderSubscriptions(state) {
    const nextRenewal = [...state.subscriptions].sort((a, b) => a.renewalDate.localeCompare(b.renewalDate))[0];
    return `
    ${SectionHeader({
        eyebrow: "Subscriptions",
        title: "Tooling Cost and Strategic Value",
        description: "Track research, AI, infrastructure, media, and learning subscriptions by renewal and annualized cost.",
        meta: "no payment integration"
    })}
    <section class="metric-grid">
      ${MetricCard({
        label: "Monthly Run Rate",
        value: formatCurrency(monthlyRunRate(state.subscriptions), "USD"),
        meta: "annualized / 12",
        tone: "neutral"
    })}
      ${MetricCard({
        label: "Annualized Cost",
        value: formatCurrency(annualRunRate(state.subscriptions), "USD"),
        meta: "all active subscriptions",
        tone: "watch"
    })}
      ${MetricCard({
        label: "Next Renewal",
        value: nextRenewal ? nextRenewal.renewalDate : "--",
        meta: nextRenewal ? nextRenewal.name : "none",
        tone: "watch"
    })}
      ${MetricCard({
        label: "Research / AI Stack",
        value: String(state.subscriptions.filter((sub) => sub.strategicValue === "research" || sub.strategicValue === "AI").length),
        meta: "decision quality tools",
        tone: "positive"
    })}
    </section>
    <section class="page-grid">
      <section class="panel">
        <div class="panel-header">
          <h3>Strategic Value Mix</h3>
          <span class="panel-kicker">why it exists</span>
        </div>
        <div class="panel-body status-lane">
          ${strategicValues
        .map((value) => `
                <div class="status-row">
                  <span>${escapeHtml(value)}</span>
                  <b>${countByValue(state.subscriptions, value)}</b>
                </div>
              `)
        .join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h3>Cost Discipline</h3>
          <span class="panel-kicker">operating principle</span>
        </div>
        <div class="panel-body stack">
          <p class="note">Subscriptions are portfolio infrastructure. They earn their place by improving research quality, decision speed, or operating reliability.</p>
          <div class="checklist">
            <span>Clear strategic value</span>
            <span>Renewal date visible</span>
            <span>Annualized cost known</span>
            <span>Redundant tools challenged</span>
          </div>
        </div>
      </section>
      ${SubscriptionTable(state.subscriptions)}
    </section>
  `;
}
function countByValue(subscriptions, value) {
    return subscriptions.filter((subscription) => subscription.strategicValue === value).length;
}
