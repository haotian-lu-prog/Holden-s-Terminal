import { HoldingsTable } from "../components/portfolio/holdings-table.js";
import { ExposureTable } from "../components/ui/exposure-table.js";
import { MetricCard } from "../components/ui/metric-card.js";
import { SectionHeader } from "../components/ui/section-header.js";
import { escapeHtml, formatCurrency, formatPercent, signedPercent, toneForNumber } from "../lib/format.js";
import { concentrationRisk, exposureByAssetClass, exposureByCountry, exposureByCurrency, netWorth, toBaseCurrency, totalCash, totalDebt, totalMarketValue, unrealizedProfitLoss, unrealizedProfitLossPercent } from "../lib/portfolio.js";
export function renderPortfolio(state) {
    const marketValue = totalMarketValue(state.holdings);
    const profitLoss = unrealizedProfitLoss(state.holdings);
    const risk = concentrationRisk(state.holdings);
    return `
    ${SectionHeader({
        eyebrow: "Portfolio",
        title: "Capital, Exposure, Concentration",
        description: "Accounts, holdings, allocation, country and currency exposure, unrealized P/L, and concentration risk.",
        meta: "Base currency USD"
    })}
    <section class="metric-grid">
      ${MetricCard({
        label: "Portfolio Value",
        value: formatCurrency(marketValue, "USD", true),
        delta: signedPercent(unrealizedProfitLossPercent(state.holdings)),
        meta: `${formatCurrency(profitLoss, "USD", true)} unrealized`,
        tone: toneForNumber(profitLoss)
    })}
      ${MetricCard({
        label: "Net Worth",
        value: formatCurrency(netWorth(state.accounts, state.holdings), "USD", true),
        meta: "cash + holdings - debt",
        tone: "neutral"
    })}
      ${MetricCard({
        label: "Cash",
        value: formatCurrency(totalCash(state.accounts), "USD", true),
        meta: "across accounts",
        tone: "neutral"
    })}
      ${MetricCard({
        label: "Debt",
        value: formatCurrency(totalDebt(state.accounts), "USD", true),
        meta: "credit balances",
        tone: totalDebt(state.accounts) > 0 ? "negative" : "positive"
    })}
    </section>
    <section class="page-grid">
      <section class="panel panel-span">
        <div class="panel-header">
          <h3>Accounts</h3>
          <span class="panel-kicker">${state.accounts.length} accounts</span>
        </div>
        <div class="panel-body table-scroll">
          ${accountsTable(state.accounts)}
        </div>
      </section>
      ${HoldingsTable(state.holdings, marketValue)}
      ${ExposureTable({ title: "Asset Class Allocation", rows: exposureByAssetClass(state.holdings) })}
      ${ExposureTable({ title: "Country Exposure", rows: exposureByCountry(state.holdings) })}
      ${ExposureTable({ title: "Currency Exposure", rows: exposureByCurrency(state.accounts, state.holdings) })}
      <section class="panel">
        <div class="panel-header">
          <h3>Concentration Risk</h3>
          <span class="panel-kicker">position sizing</span>
        </div>
        <div class="panel-body risk-stack">
          <div class="risk-row">
            <span>Largest holding</span>
            <b>${risk.topHolding ? escapeHtml(risk.topHolding.ticker) : "N/A"}</b>
            <small>${formatPercent(risk.topHoldingWeight)}</small>
          </div>
          <div class="risk-row">
            <span>Top five holdings</span>
            <b>${formatPercent(risk.topFiveWeight)}</b>
            <small>aggregate exposure</small>
          </div>
          <div class="risk-row">
            <span>Largest asset class</span>
            <b>${escapeHtml(risk.largestAssetClass.label)}</b>
            <small>${formatPercent(risk.largestAssetClass.weight)}</small>
          </div>
          <p class="note">Rule of thumb: new allocations should improve expected decision quality, not merely reduce discomfort with cash.</p>
        </div>
      </section>
    </section>
  `;
}
function accountsTable(accounts) {
    return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Institution</th>
          <th>Type</th>
          <th class="right">Cash</th>
          <th class="right">Invested Capital</th>
          <th class="right">Debt</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
        .map((account) => `
              <tr>
                <td>
                  <span class="table-title">${escapeHtml(account.name)}</span>
                  <small>${escapeHtml(account.notes)}</small>
                </td>
                <td>${escapeHtml(account.institution)}</td>
                <td>${escapeHtml(account.type)}</td>
                <td class="right mono">${formatCurrency(toBaseCurrency(account.cash, account.currency), "USD", true)}</td>
                <td class="right mono">${formatCurrency(toBaseCurrency(account.investedCapital, account.currency), "USD", true)}</td>
                <td class="right mono negative-text">${account.debt ? formatCurrency(toBaseCurrency(account.debt, account.currency), "USD", true) : "--"}</td>
              </tr>
            `)
        .join("")}
      </tbody>
    </table>
  `;
}
