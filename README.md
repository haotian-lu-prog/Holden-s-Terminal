# Holden's Terminal

A local-first personal investment operating system. It is structured around:

`Dashboard -> Portfolio -> Research -> Journal -> Macro -> Subscriptions`

The app is intentionally not a budgeting app or bank-sync product. It focuses on portfolio state, exposure quality, thesis quality, decision hygiene, macro context, and tool-cost discipline.

## Public Preview

GitHub Pages publishes the app at:

https://haotian-lu-prog.github.io/Holden-s-Terminal/

This repository should use **Settings → Pages → Source → GitHub Actions**. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds the TypeScript output, prepares a static Pages artifact, and deploys it to GitHub Pages.

Do not use **Deploy from a branch** for this project unless you intentionally want to serve committed files directly. The GitHub Actions workflow is preferred because Pages receives a fresh build artifact from `npm ci` and `npm run build` after every push to `main`.

## Setup

Install dependencies after cloning the repository. Do not commit `node_modules`;
it is generated locally from `package-lock.json`.

```bash
npm install
```

Build the TypeScript sources:

```bash
npm run build
```

Start the local server:

```bash
npm start
```

For development, build and start in one command:

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

On GitHub Pages, the same routes are served under the repository subpath:

- `/Holden-s-Terminal/dashboard`
- `/Holden-s-Terminal/portfolio`
- `/Holden-s-Terminal/research`
- `/Holden-s-Terminal/journal`
- `/Holden-s-Terminal/macro`
- `/Holden-s-Terminal/subscriptions`

## Deployment

1. In GitHub, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push or merge changes into `main`.
4. The **Deploy to GitHub Pages** workflow will run:
   - `npm ci`
   - `npm run build`
   - prepare `_site` with `index.html`, `404.html`, `src`, and `dist`
   - deploy the artifact with `actions/deploy-pages`
5. After the workflow succeeds, open https://haotian-lu-prog.github.io/Holden-s-Terminal/.

The app is not a Vite app; it is a TypeScript static app compiled with `tsc`. Therefore there is no Vite `base` option to set. The router handles the `/Holden-s-Terminal/` GitHub Pages subpath directly.

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
