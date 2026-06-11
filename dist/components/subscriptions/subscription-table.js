import { escapeHtml, formatCurrency } from "../../lib/format.js";
import { annualizedCost } from "../../lib/subscriptions.js";
export function SubscriptionTable(subscriptions) {
    return `
    <section class="panel panel-span">
      <div class="panel-header">
        <h3>Subscriptions</h3>
        <span class="panel-kicker">${subscriptions.length} active tools</span>
      </div>
      <div class="panel-body table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Strategic Value</th>
              <th class="right">Cost</th>
              <th class="right">Annualized</th>
              <th>Renewal</th>
            </tr>
          </thead>
          <tbody>
            ${subscriptions
        .map((subscription) => `
                  <tr>
                    <td>
                      <span class="table-title">${escapeHtml(subscription.name)}</span>
                      <small>${escapeHtml(subscription.ownerNote)}</small>
                    </td>
                    <td>${escapeHtml(subscription.category)}</td>
                    <td><span class="status-pill">${escapeHtml(subscription.strategicValue)}</span></td>
                    <td class="right mono">
                      ${formatCurrency(subscription.cost, subscription.currency)}
                      <small>${escapeHtml(subscription.cadence)}</small>
                    </td>
                    <td class="right mono">${formatCurrency(annualizedCost(subscription), subscription.currency)}</td>
                    <td class="mono">${escapeHtml(subscription.renewalDate)}</td>
                  </tr>
                `)
        .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
