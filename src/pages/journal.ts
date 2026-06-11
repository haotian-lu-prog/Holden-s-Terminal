import { JournalEntryCard } from "../components/journal/journal-entry-card.js";
import { MetricCard } from "../components/ui/metric-card.js";
import { SectionHeader } from "../components/ui/section-header.js";
import { escapeHtml } from "../lib/format.js";
import type { DecisionType, JournalEntry, TerminalState } from "../types/investment.js";

const decisionTypes: DecisionType[] = ["buy", "sell", "hold", "rebalance", "observe"];

export function renderJournal(state: TerminalState): string {
  const nextReview = [...state.journalEntries].sort((a, b) => a.reviewDate.localeCompare(b.reviewDate))[0];

  return `
    ${SectionHeader({
      eyebrow: "Journal",
      title: "Decision Journal",
      description:
        "Record the reasoning, expected outcome, review date, and eventual result before hindsight edits the story.",
      meta: "buy · sell · hold · rebalance · observe"
    })}
    <section class="metric-grid">
      ${MetricCard({
        label: "Journal Entries",
        value: String(state.journalEntries.length),
        meta: "investment decisions",
        tone: "neutral"
      })}
      ${MetricCard({
        label: "Next Review",
        value: nextReview ? nextReview.reviewDate : "--",
        meta: nextReview ? nextReview.asset : "none scheduled",
        tone: "watch"
      })}
      ${MetricCard({
        label: "Pending Results",
        value: String(state.journalEntries.filter((entry) => !entry.actualResult || entry.actualResult.includes("Pending")).length),
        meta: "need future review",
        tone: "watch"
      })}
      ${MetricCard({
        label: "Reviewed",
        value: String(state.journalEntries.filter((entry) => entry.actualResult && !entry.actualResult.includes("Pending")).length),
        meta: "result captured",
        tone: "positive"
      })}
    </section>
    <section class="page-grid">
      <section class="panel">
        <div class="panel-header">
          <h3>Decision Type Mix</h3>
          <span class="panel-kicker">behavior audit</span>
        </div>
        <div class="panel-body status-lane">
          ${decisionTypes
            .map(
              (type) => `
                <div class="status-row">
                  <span>${escapeHtml(type)}</span>
                  <b>${countByType(state.journalEntries, type)}</b>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h3>Journal Standard</h3>
          <span class="panel-kicker">required fields</span>
        </div>
        <div class="panel-body checklist">
          <span>Decision date</span>
          <span>Decision type</span>
          <span>Rationale</span>
          <span>Expected outcome</span>
          <span>Review date</span>
          <span>Actual result later</span>
        </div>
      </section>
      <section class="panel panel-span">
        <div class="panel-header">
          <h3>Investment Decisions</h3>
          <span class="panel-kicker">${state.journalEntries.length} entries</span>
        </div>
        <div class="panel-body list journal-list">
          ${state.journalEntries.map(JournalEntryCard).join("")}
        </div>
      </section>
    </section>
  `;
}

function countByType(entries: JournalEntry[], type: DecisionType): number {
  return entries.filter((entry) => entry.type === type).length;
}
