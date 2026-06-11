import { JournalEntryCard } from "../components/journal/journal-entry-card.js";
import { ResearchCard } from "../components/research/research-card.js";
import { ExposureTable } from "../components/ui/exposure-table.js";
import { MetricCard } from "../components/ui/metric-card.js";
import { SectionHeader } from "../components/ui/section-header.js";
import {
  exposureByAssetClass,
  exposureByCurrency,
  netWorth,
  totalCash,
  totalCostBasis,
  totalDebt,
  totalMarketValue,
  unrealizedProfitLoss,
  unrealizedProfitLossPercent
} from "../lib/portfolio.js";
import { escapeHtml, formatCurrency, signedPercent, toneForNumber } from "../lib/format.js";
import type { TerminalState, WatchlistItem } from "../types/investment.js";

export function renderDashboard(state: TerminalState): string {
  const marketValue = totalMarketValue(state.holdings);
  const costBasis = totalCostBasis(state.holdings);
  const profitLoss = unrealizedProfitLoss(state.holdings);
  const profitLossPercent = unrealizedProfitLossPercent(state.holdings);
  const activeResearch = state.researchTopics.filter((topic) => topic.status !== "closed").slice(0, 2);

  return `
    ${SectionHeader({
      eyebrow: "Dashboard",
      title: "Investment Operating System",
      description:
        "Net worth, exposures, research state, and decision queue in one dense cockpit.",
      meta: "Mock data · local-first"
    })}
    <section class="metric-grid">
      ${MetricCard({
        label: "Net Worth",
        value: formatCurrency(netWorth(state.accounts, state.holdings), "USD", true),
        delta: signedPercent(profitLossPercent),
        meta: "base USD, mock FX",
        tone: toneForNumber(profitLoss)
      })}
      ${MetricCard({
        label: "Cash",
        value: formatCurrency(totalCash(state.accounts), "USD", true),
        meta: "available liquidity",
        tone: "neutral"
      })}
      ${MetricCard({
        label: "Invested Capital",
        value: formatCurrency(costBasis, "USD", true),
        meta: `${formatCurrency(marketValue, "USD", true)} current value`,
        tone: "neutral"
      })}
      ${MetricCard({
        label: "Debt / Card Balance",
        value: formatCurrency(totalDebt(state.accounts), "USD", true),
        meta: "included in net worth",
        tone: totalDebt(state.accounts) > 0 ? "negative" : "positive"
      })}
    </section>
    <section class="page-grid">
      ${ExposureTable({ title: "Asset Allocation", rows: exposureByAssetClass(state.holdings) })}
      ${ExposureTable({ title: "Currency Exposure", rows: exposureByCurrency(state.accounts, state.holdings) })}
      <section class="panel panel-span">
        <div class="panel-header">
          <h3>Watchlist Snapshot</h3>
          <span class="panel-kicker">research-linked</span>
        </div>
        <div class="panel-body table-scroll">
          ${watchlistTable(state.watchlist)}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h3>Recent Journal Entries</h3>
          <span class="panel-kicker">${state.journalEntries.length} decisions</span>
        </div>
        <div class="panel-body list">
          ${state.journalEntries.slice(0, 2).map(JournalEntryCard).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h3>Active Research Topics</h3>
          <span class="panel-kicker">${activeResearch.length} in focus</span>
        </div>
        <div class="panel-body list">
          ${activeResearch.map(ResearchCard).join("")}
        </div>
      </section>
    </section>
  `;
}

function watchlistTable(items: WatchlistItem[]): string {
  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Name</th>
          <th class="right">Price</th>
          <th class="right">Move</th>
          <th>Status</th>
          <th>Research Note</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td><span class="ticker">${escapeHtml(item.ticker)}</span></td>
                <td>${escapeHtml(item.name)}</td>
                <td class="right mono">${formatCurrency(item.price, item.currency)}</td>
                <td class="right mono ${toneForNumber(item.changePercent)}-text">${signedPercent(item.changePercent)}</td>
                <td><span class="status-pill">${escapeHtml(item.status)}</span></td>
                <td>${escapeHtml(item.note)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}
