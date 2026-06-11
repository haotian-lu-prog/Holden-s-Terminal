import { escapeHtml, formatCurrency, formatNumber, formatPercent, toneForNumber } from "../../lib/format.js";
import { holdingCostBasis, holdingMarketValue } from "../../lib/portfolio.js";
import type { Holding } from "../../types/investment.js";

export function HoldingsTable(holdings: Holding[], totalValue: number): string {
  return `
    <section class="panel panel-span">
      <div class="panel-header">
        <h3>Holdings</h3>
        <span class="panel-kicker">${holdings.length} positions</span>
      </div>
      <div class="panel-body table-scroll">
        <table class="data-table holdings-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Class</th>
              <th>Country</th>
              <th class="right">Qty</th>
              <th class="right">Market Value</th>
              <th class="right">Weight</th>
              <th class="right">Unrealized P/L</th>
            </tr>
          </thead>
          <tbody>
            ${holdings
              .map((holding) => {
                const value = holdingMarketValue(holding);
                const basis = holdingCostBasis(holding);
                const profitLoss = value - basis;
                const profitLossPercent = basis ? (profitLoss / basis) * 100 : 0;
                const tone = toneForNumber(profitLoss);
                return `
                  <tr>
                    <td><span class="ticker">${escapeHtml(holding.ticker)}</span></td>
                    <td>
                      <span class="table-title">${escapeHtml(holding.name)}</span>
                      <small>${escapeHtml(holding.thesis)}</small>
                    </td>
                    <td>${escapeHtml(holding.assetClass)}</td>
                    <td>${escapeHtml(holding.country)}</td>
                    <td class="right mono">${formatNumber(holding.quantity, 2)}</td>
                    <td class="right mono">${formatCurrency(value, "USD", true)}</td>
                    <td class="right mono">${formatPercent(totalValue ? (value / totalValue) * 100 : 0)}</td>
                    <td class="right mono ${tone}-text">
                      ${formatCurrency(profitLoss, "USD", true)}
                      <small>${formatPercent(profitLossPercent)}</small>
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
