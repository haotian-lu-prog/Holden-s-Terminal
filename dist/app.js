import { createMockState } from "./data/mock-data.js";
import { escapeHtml, todayIso } from "./lib/format.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderJournal } from "./pages/journal.js";
import { renderMacro } from "./pages/macro.js";
import { renderPortfolio } from "./pages/portfolio.js";
import { renderResearch } from "./pages/research.js";
import { renderSubscriptions } from "./pages/subscriptions.js";
const STORAGE_KEY = "holdens-terminal:v2";
const GITHUB_PAGES_BASE_PATH = "/Holden-s-Terminal";
const navItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        description: "Net worth, cash, invested capital, debt, exposures, research, journal, and watchlist."
    },
    {
        id: "portfolio",
        label: "Portfolio",
        description: "Accounts, holdings, allocation, country exposure, currency exposure, P/L, and concentration."
    },
    {
        id: "research",
        label: "Research",
        description: "Research notes, theses, statuses, tags, conviction, and linked tickers."
    },
    {
        id: "journal",
        label: "Journal",
        description: "Investment decisions with rationale, expected outcome, review date, and actual result."
    },
    {
        id: "macro",
        label: "Macro",
        description: "Mock macro indicators for FX, rates, volatility, commodities, CPI, and policy."
    },
    {
        id: "subscriptions",
        label: "Subscriptions",
        description: "Research, AI, infra, media, and learning tools with annualized costs."
    }
];
const pageRenderers = {
    dashboard: renderDashboard,
    portfolio: renderPortfolio,
    research: renderResearch,
    journal: renderJournal,
    macro: renderMacro,
    subscriptions: renderSubscriptions
};
const appRoot = document.querySelector("#app");
if (!appRoot) {
    throw new Error("Holden's Terminal requires an #app root.");
}
const app = appRoot;
let state = loadState();
function loadState() {
    const fallback = createMockState();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored)
        return fallback;
    try {
        const parsed = JSON.parse(stored);
        if (parsed.schemaVersion !== 2)
            return fallback;
        return {
            ...fallback,
            ...parsed,
            accounts: parsed.accounts || fallback.accounts,
            holdings: parsed.holdings || fallback.holdings,
            watchlist: parsed.watchlist || fallback.watchlist,
            researchTopics: parsed.researchTopics || fallback.researchTopics,
            journalEntries: parsed.journalEntries || fallback.journalEntries,
            macroIndicators: parsed.macroIndicators || fallback.macroIndicators,
            subscriptions: parsed.subscriptions || fallback.subscriptions
        };
    }
    catch {
        return fallback;
    }
}
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function basePath() {
    const pathname = window.location.pathname;
    return pathname === GITHUB_PAGES_BASE_PATH || pathname.startsWith(`${GITHUB_PAGES_BASE_PATH}/`)
        ? GITHUB_PAGES_BASE_PATH
        : "";
}
function routePath() {
    const base = basePath();
    const pathname = window.location.pathname;
    return base && (pathname === base || pathname.startsWith(`${base}/`))
        ? pathname.slice(base.length) || "/"
        : pathname;
}
function pageHref(page) {
    return `${basePath()}/${page}`;
}
function currentPage() {
    const slug = routePath().replace(/^\/+|\/+$/g, "") || "dashboard";
    return navItems.some((item) => item.id === slug) ? slug : "dashboard";
}
function countFor(page) {
    const counts = {
        dashboard: state.watchlist.length,
        portfolio: state.holdings.length,
        research: state.researchTopics.length,
        journal: state.journalEntries.length,
        macro: state.macroIndicators.length,
        subscriptions: state.subscriptions.length
    };
    return String(counts[page]);
}
function render() {
    const page = currentPage();
    const pageMeta = navItems.find((item) => item.id === page) ?? navItems[0];
    document.title = `Holden's Terminal · ${pageMeta.label}`;
    app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="eyebrow">Holden's Terminal v0.1</span>
          <h1>Investment OS</h1>
          <p>Personal portfolio command surface for decision quality, not budgeting.</p>
        </div>
        <nav class="nav" aria-label="Primary pages">
          ${navItems
        .map((item, index) => `
                <a class="${item.id === page ? "active" : ""}" href="${pageHref(item.id)}" data-nav="${item.id}">
                  <b>${String(index + 1).padStart(2, "0")}</b>
                  <span>${escapeHtml(item.label)}</span>
                  <small>${countFor(item.id)}</small>
                </a>
              `)
        .join("")}
        </nav>
        <div class="utility">
          <button type="button" data-action="export">Export JSON</button>
          <label class="button-label">
            <input type="file" accept="application/json" data-action="import" />
            <button type="button" data-action="choose-import">Import JSON</button>
          </label>
          <button type="button" class="danger" data-action="reset">Reset Mock Data</button>
        </div>
      </aside>
      <main class="main">
        ${pageRenderers[page](state)}
      </main>
    </div>
  `;
    bindEvents();
}
function bindEvents() {
    app.querySelectorAll("[data-nav]").forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            window.history.pushState({}, "", anchor.href);
            render();
        });
    });
    app.querySelectorAll("[data-action='export']").forEach((button) => {
        button.addEventListener("click", exportData);
    });
    app.querySelectorAll("[data-action='choose-import']").forEach((button) => {
        button.addEventListener("click", () => {
            app.querySelector("[data-action='import']")?.click();
        });
    });
    app.querySelectorAll("[data-action='import']").forEach((input) => {
        input.addEventListener("change", importData);
    });
    app.querySelectorAll("[data-action='reset']").forEach((button) => {
        button.addEventListener("click", () => {
            if (!confirm("Reset Holden's Terminal to mock data? This clears v0.1 local changes in this browser.")) {
                return;
            }
            state = createMockState();
            saveState();
            render();
        });
    });
}
function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `holdens-terminal-${todayIso()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}
async function importData(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
        return;
    try {
        const imported = JSON.parse(await file.text());
        if (imported.schemaVersion !== 2) {
            throw new Error("Unsupported schema");
        }
        state = {
            ...createMockState(),
            ...imported,
            schemaVersion: 2
        };
        saveState();
        render();
    }
    catch {
        alert("Could not import JSON. Check that the file is a Holden's Terminal v0.1 export.");
    }
    finally {
        input.value = "";
    }
}
window.addEventListener("popstate", render);
render();
