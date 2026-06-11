import { escapeHtml, formatCurrency, formatPercent } from "../../lib/format.js";
export function ExposureTable({ title, rows, valueLabel = "Value" }) {
    if (!rows.length) {
        return `
      <section class="panel">
        <div class="panel-header"><h3>${escapeHtml(title)}</h3></div>
        <div class="panel-body"><div class="empty">No exposure data available.</div></div>
      </section>
    `;
    }
    return `
    <section class="panel">
      <div class="panel-header">
        <h3>${escapeHtml(title)}</h3>
      </div>
      <div class="panel-body">
        <table class="data-table exposure-table">
          <thead>
            <tr>
              <th>Exposure</th>
              <th class="right">${escapeHtml(valueLabel)}</th>
              <th class="right">Weight</th>
            </tr>
          </thead>
          <tbody>
            ${rows
        .map((row) => `
                  <tr>
                    <td>
                      <span class="table-title">${escapeHtml(row.label)}</span>
                      ${row.meta ? `<small>${escapeHtml(row.meta)}</small>` : ""}
                    </td>
                    <td class="right mono">${formatCurrency(row.value, "USD", true)}</td>
                    <td class="right">
                      <span class="weight-cell">
                        <span class="weight-bar"><span style="width: ${Math.min(Math.max(row.weight, 0), 100).toFixed(2)}%"></span></span>
                        <span class="mono">${formatPercent(row.weight)}</span>
                      </span>
                    </td>
                  </tr>
                `)
        .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
