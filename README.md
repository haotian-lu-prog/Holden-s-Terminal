# Holden's Terminal

A local-first personal investment operating system. It is structured around:

`Dashboard -> Portfolio -> Research -> Journal -> Macro -> Subscriptions`

The app is intentionally not a budgeting app or bank-sync product. It focuses on portfolio state, exposure quality, thesis quality, decision hygiene, macro context, and tool-cost discipline.

## Run

```bash
npm run dev
```

Open `http://localhost:4173`.

Direct routes are available for:

- `/dashboard`
- `/portfolio`
- `/research`
- `/journal`
- `/macro`
- `/subscriptions`

## Check

```bash
npm run check
```

## Current Scope

- Dashboard with net worth, cash, invested capital, debt, asset allocation, currency exposure, journal entries, active research, and watchlist snapshot.
- Portfolio with accounts, holdings, asset allocation, country exposure, currency exposure, unrealized P/L, and concentration risk.
- Research workspace with notes, theses, topic tags, workflow status, and linked assets.
- Journal with investment decisions, rationale, expected outcomes, review dates, and actual result placeholders.
- Macro board with mock USDJPY, US10Y, JGB10Y, VIX, gold, oil, CPI, and policy-rate indicators.
- Subscriptions with category, cadence, currency, renewal date, strategic value, and annualized cost.
- Local-first persistence through `localStorage`.
- JSON export/import for backups or migration.
- Mock-data-first implementation with no external APIs, bank sync, auth changes, payments, tax logic, or budgeting workflows.
