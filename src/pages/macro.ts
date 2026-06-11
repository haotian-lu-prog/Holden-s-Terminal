import { MetricCard } from "../components/ui/metric-card.js";
import { SectionHeader } from "../components/ui/section-header.js";
import { escapeHtml } from "../lib/format.js";
import type { MacroIndicator, TerminalState } from "../types/investment.js";

export function renderMacro(state: TerminalState): string {
  return `
    ${SectionHeader({
      eyebrow: "Macro",
      title: "Macro Indicators",
      description:
        "Mock macro board for USDJPY, rates, volatility, commodities, CPI, and policy-rate placeholders.",
      meta: "external APIs intentionally not wired"
    })}
    <section class="metric-grid macro-grid">
      ${state.macroIndicators.map(indicatorMetric).join("")}
    </section>
    <section class="page-grid">
      <section class="panel panel-span">
        <div class="panel-header">
          <h3>Indicator Notes</h3>
          <span class="panel-kicker">mock signals</span>
        </div>
        <div class="panel-body table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Value</th>
                <th>Change</th>
                <th>Signal</th>
                <th>Portfolio Relevance</th>
              </tr>
            </thead>
            <tbody>
              ${state.macroIndicators
                .map(
                  (indicator) => `
                    <tr>
                      <td><span class="ticker">${escapeHtml(indicator.label)}</span></td>
                      <td class="mono">${escapeHtml(indicator.value)}</td>
                      <td class="mono">${escapeHtml(indicator.change)}</td>
                      <td><span class="status-pill">${escapeHtml(indicator.tone)}</span></td>
                      <td>${escapeHtml(indicator.note)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function indicatorMetric(indicator: MacroIndicator): string {
  return MetricCard({
    label: indicator.label,
    value: indicator.value,
    delta: indicator.change,
    meta: indicator.asOf,
    tone: indicator.tone
  });
}
