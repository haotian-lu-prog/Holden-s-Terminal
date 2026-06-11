export type Currency = "USD" | "JPY" | "EUR";

export type PageId =
  | "dashboard"
  | "portfolio"
  | "research"
  | "journal"
  | "macro"
  | "subscriptions";

export type AssetClass =
  | "Equity"
  | "ETF"
  | "Bond"
  | "Cash"
  | "Commodity"
  | "Crypto"
  | "Private";

export type AccountType = "Brokerage" | "Retirement" | "Cash" | "Credit";

export type ResearchStatus = "idea" | "researching" | "active thesis" | "closed";

export type DecisionType = "buy" | "sell" | "hold" | "rebalance" | "observe";

export type StrategicValue = "research" | "AI" | "infra" | "media" | "learning";

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  currency: Currency;
  cash: number;
  investedCapital: number;
  debt: number;
  notes: string;
}

export interface Holding {
  id: string;
  accountId: string;
  ticker: string;
  name: string;
  assetClass: AssetClass;
  country: string;
  currency: Currency;
  quantity: number;
  price: number;
  costBasis: number;
  marketValue: number;
  thesis: string;
}

export interface WatchlistItem {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  currency: Currency;
  status: ResearchStatus;
  note: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  status: ResearchStatus;
  tags: string[];
  linkedAssets: string[];
  note: string;
  thesis: string;
  bullCase: string;
  bearCase: string;
  conviction: number;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  type: DecisionType;
  asset: string;
  rationale: string;
  expectedOutcome: string;
  reviewDate: string;
  actualResult?: string;
  linkedThesis: string;
}

export interface MacroIndicator {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: "positive" | "negative" | "neutral" | "watch";
  note: string;
  asOf: string;
}

export interface Subscription {
  id: string;
  name: string;
  category: string;
  cadence: "monthly" | "annual";
  cost: number;
  currency: Currency;
  renewalDate: string;
  strategicValue: StrategicValue;
  ownerNote: string;
}

export interface TerminalState {
  schemaVersion: 2;
  accounts: Account[];
  holdings: Holding[];
  watchlist: WatchlistItem[];
  researchTopics: ResearchTopic[];
  journalEntries: JournalEntry[];
  macroIndicators: MacroIndicator[];
  subscriptions: Subscription[];
}

export interface ExposureRow {
  label: string;
  value: number;
  weight: number;
  meta?: string;
}

export interface MetricCardModel {
  label: string;
  value: string;
  meta?: string;
  delta?: string;
  tone?: "positive" | "negative" | "neutral" | "watch";
}

export interface ConcentrationRisk {
  topHolding?: Holding;
  topHoldingWeight: number;
  topFiveWeight: number;
  largestAssetClass: ExposureRow;
}
