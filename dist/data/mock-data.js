export function createMockState() {
    return {
        schemaVersion: 2,
        accounts: [
            {
                id: "acct-ibkr",
                name: "Global Brokerage",
                institution: "IBKR",
                type: "Brokerage",
                currency: "USD",
                cash: 38500,
                investedCapital: 548000,
                debt: 0,
                notes: "Primary taxable portfolio with global equity and bond exposure."
            },
            {
                id: "acct-retirement",
                name: "Long Horizon IRA",
                institution: "Fidelity",
                type: "Retirement",
                currency: "USD",
                cash: 12200,
                investedCapital: 186000,
                debt: 0,
                notes: "Core compounding sleeve, benchmarked against global equities."
            },
            {
                id: "acct-jpy-cash",
                name: "JPY Operating Cash",
                institution: "Sony Bank",
                type: "Cash",
                currency: "JPY",
                cash: 2450000,
                investedCapital: 0,
                debt: 0,
                notes: "Local liquidity and upcoming yen obligations."
            },
            {
                id: "acct-card",
                name: "Amex Credit Balance",
                institution: "American Express",
                type: "Credit",
                currency: "USD",
                cash: 0,
                investedCapital: 0,
                debt: 6200,
                notes: "Short-term card balance; included to keep net worth honest."
            }
        ],
        holdings: [
            {
                id: "hold-vti",
                accountId: "acct-ibkr",
                ticker: "VTI",
                name: "Vanguard Total Stock Market ETF",
                assetClass: "ETF",
                country: "United States",
                currency: "USD",
                quantity: 610,
                price: 275,
                costBasis: 132800,
                marketValue: 167750,
                thesis: "Core US market beta remains the ballast for risk assets."
            },
            {
                id: "hold-vxus",
                accountId: "acct-retirement",
                ticker: "VXUS",
                name: "Vanguard Total International Stock ETF",
                assetClass: "ETF",
                country: "Global ex-US",
                currency: "USD",
                quantity: 1250,
                price: 63.8,
                costBasis: 73000,
                marketValue: 79750,
                thesis: "Diversifier against US concentration and valuation risk."
            },
            {
                id: "hold-msft",
                accountId: "acct-ibkr",
                ticker: "MSFT",
                name: "Microsoft",
                assetClass: "Equity",
                country: "United States",
                currency: "USD",
                quantity: 125,
                price: 428,
                costBasis: 38200,
                marketValue: 53500,
                thesis: "Enterprise AI distribution with durable cloud economics."
            },
            {
                id: "hold-sony",
                accountId: "acct-ibkr",
                ticker: "6758.T",
                name: "Sony Group",
                assetClass: "Equity",
                country: "Japan",
                currency: "JPY",
                quantity: 420,
                price: 13400,
                costBasis: 4780000,
                marketValue: 5628000,
                thesis: "IP, sensors, and gaming create high-quality yen-denominated exposure."
            },
            {
                id: "hold-sgov",
                accountId: "acct-ibkr",
                ticker: "SGOV",
                name: "iShares 0-3 Month Treasury Bond ETF",
                assetClass: "Bond",
                country: "United States",
                currency: "USD",
                quantity: 920,
                price: 100.6,
                costBasis: 92000,
                marketValue: 92552,
                thesis: "Dry powder with low duration while thesis queue matures."
            },
            {
                id: "hold-gld",
                accountId: "acct-ibkr",
                ticker: "GLD",
                name: "SPDR Gold Shares",
                assetClass: "Commodity",
                country: "Global",
                currency: "USD",
                quantity: 210,
                price: 222,
                costBasis: 39300,
                marketValue: 46620,
                thesis: "Macro hedge against real-rate and currency regime shocks."
            },
            {
                id: "hold-btc",
                accountId: "acct-ibkr",
                ticker: "BTC",
                name: "Bitcoin",
                assetClass: "Crypto",
                country: "Global",
                currency: "USD",
                quantity: 0.82,
                price: 68500,
                costBasis: 41500,
                marketValue: 56170,
                thesis: "Small asymmetric allocation with explicit volatility budget."
            }
        ],
        watchlist: [
            {
                ticker: "NVDA",
                name: "NVIDIA",
                price: 118.4,
                changePercent: 1.8,
                currency: "USD",
                status: "researching",
                note: "Need stronger disconfirming signal on hyperscaler capex digestion."
            },
            {
                ticker: "8058.T",
                name: "Mitsubishi Corp.",
                price: 3155,
                changePercent: -0.4,
                currency: "JPY",
                status: "idea",
                note: "Trading house exposure as Japan corporate governance basket."
            },
            {
                ticker: "TLT",
                name: "iShares 20+ Year Treasury Bond ETF",
                price: 91.2,
                changePercent: -0.9,
                currency: "USD",
                status: "idea",
                note: "Duration entry only after real-yield path is less ambiguous."
            },
            {
                ticker: "ASML",
                name: "ASML Holding",
                price: 948,
                changePercent: 0.6,
                currency: "EUR",
                status: "active thesis",
                note: "Semicap monopoly quality, but China/export controls cap sizing."
            }
        ],
        researchTopics: [
            {
                id: "topic-ai-infra",
                title: "AI infrastructure demand durability",
                status: "active thesis",
                tags: ["AI", "capex", "semis", "power"],
                linkedAssets: ["NVDA", "MSFT", "ASML", "VTI"],
                note: "Primary debate is whether data center capex remains supply-constrained or moves into digestion.",
                thesis: "Enterprise and hyperscaler AI spend can stay elevated if inference workloads absorb capacity and power availability remains the bottleneck.",
                bullCase: "New model deployment and agent workloads keep GPU utilization high.",
                bearCase: "Training demand slows, inference margins disappoint, and order visibility compresses.",
                conviction: 72,
                updatedAt: "2026-05-24"
            },
            {
                id: "topic-japan",
                title: "Japan shareholder return regime",
                status: "researching",
                tags: ["Japan", "governance", "yen", "value"],
                linkedAssets: ["6758.T", "8058.T"],
                note: "Need to separate currency noise from genuine return-on-equity improvement.",
                thesis: "Tokyo Stock Exchange pressure and buyback discipline can support selected Japan quality/value names.",
                bullCase: "Governance reform accelerates and domestic inflation improves pricing power.",
                bearCase: "Yen strength compresses exporters while reform momentum stalls.",
                conviction: 58,
                updatedAt: "2026-05-21"
            },
            {
                id: "topic-duration",
                title: "US duration re-entry conditions",
                status: "idea",
                tags: ["rates", "duration", "US10Y", "recession"],
                linkedAssets: ["TLT", "SGOV"],
                note: "Observe until inflation path and term premium stop fighting each other.",
                thesis: "Long-duration bonds become attractive if growth slows faster than inflation expectations rise.",
                bullCase: "Labor cooling and disinflation pull the Fed toward cuts.",
                bearCase: "Fiscal supply and sticky services inflation keep term premium elevated.",
                conviction: 44,
                updatedAt: "2026-05-18"
            },
            {
                id: "topic-gold",
                title: "Gold as policy credibility hedge",
                status: "active thesis",
                tags: ["gold", "real rates", "FX", "central banks"],
                linkedAssets: ["GLD", "USDJPY"],
                note: "Position is hedge-first, not price-chasing.",
                thesis: "Gold deserves a modest allocation while fiscal credibility and reserve diversification remain live risks.",
                bullCase: "Central bank buying persists and real yields roll over.",
                bearCase: "Dollar strength and positive real rates reassert pressure.",
                conviction: 63,
                updatedAt: "2026-05-20"
            }
        ],
        journalEntries: [
            {
                id: "journal-1",
                date: "2026-05-28",
                type: "hold",
                asset: "MSFT",
                rationale: "Maintain position. Cloud and enterprise AI distribution remain thesis-consistent, but valuation leaves little room for sloppy sizing.",
                expectedOutcome: "Azure growth and AI attach rates should remain resilient through the next two earnings cycles.",
                reviewDate: "2026-08-01",
                actualResult: "Pending review.",
                linkedThesis: "AI infrastructure demand durability"
            },
            {
                id: "journal-2",
                date: "2026-05-23",
                type: "observe",
                asset: "TLT",
                rationale: "Do not add duration yet. Inflation data and term premium are not aligned enough for a clean risk/reward.",
                expectedOutcome: "A better setup requires softer labor data or a clear break in services inflation.",
                reviewDate: "2026-07-15",
                actualResult: "Pending review.",
                linkedThesis: "US duration re-entry conditions"
            },
            {
                id: "journal-3",
                date: "2026-05-17",
                type: "rebalance",
                asset: "SGOV / cash",
                rationale: "Move excess idle USD cash into short-duration Treasury exposure while keeping optionality for researched ideas.",
                expectedOutcome: "Incremental yield pickup without adding meaningful duration or equity beta.",
                reviewDate: "2026-06-30",
                actualResult: "Yield capture on track; liquidity unchanged.",
                linkedThesis: "US duration re-entry conditions"
            }
        ],
        macroIndicators: [
            {
                id: "macro-usdjpy",
                label: "USDJPY",
                value: "157.2",
                change: "+0.4%",
                tone: "watch",
                note: "Yen weakness supports Japan exporters but raises local purchasing-power risk.",
                asOf: "Mock close"
            },
            {
                id: "macro-us10y",
                label: "US10Y",
                value: "4.48%",
                change: "-3 bps",
                tone: "neutral",
                note: "Still too high for aggressive duration without inflation confirmation.",
                asOf: "Mock close"
            },
            {
                id: "macro-jgb10y",
                label: "JGB10Y",
                value: "1.05%",
                change: "+2 bps",
                tone: "watch",
                note: "Japan rate normalization remains relevant to JPY cash and exporters.",
                asOf: "Mock close"
            },
            {
                id: "macro-vix",
                label: "VIX",
                value: "14.8",
                change: "-0.7",
                tone: "neutral",
                note: "Complacency risk: volatility budget should assume regime change, not current calm.",
                asOf: "Mock close"
            },
            {
                id: "macro-gold",
                label: "Gold",
                value: "$2,335",
                change: "+0.9%",
                tone: "positive",
                note: "Supports the policy credibility hedge thesis.",
                asOf: "Mock close"
            },
            {
                id: "macro-oil",
                label: "Oil",
                value: "$78.40",
                change: "-1.1%",
                tone: "neutral",
                note: "Energy impulse not currently the dominant macro risk.",
                asOf: "Mock close"
            },
            {
                id: "macro-cpi",
                label: "CPI",
                value: "placeholder",
                change: "next print",
                tone: "watch",
                note: "Placeholder until data ingestion is wired.",
                asOf: "Mock calendar"
            },
            {
                id: "macro-policy-rate",
                label: "Policy Rate",
                value: "placeholder",
                change: "Fed / BOJ",
                tone: "watch",
                note: "Placeholder for central-bank policy dashboard.",
                asOf: "Mock calendar"
            }
        ],
        subscriptions: [
            {
                id: "sub-koyfin",
                name: "Koyfin",
                category: "Market data",
                cadence: "monthly",
                cost: 49,
                currency: "USD",
                renewalDate: "2026-06-12",
                strategicValue: "research",
                ownerNote: "Primary screeners, charts, and watchlist monitor."
            },
            {
                id: "sub-chatgpt",
                name: "ChatGPT",
                category: "AI research",
                cadence: "monthly",
                cost: 20,
                currency: "USD",
                renewalDate: "2026-06-20",
                strategicValue: "AI",
                ownerNote: "Thesis stress-testing and summarization workflow."
            },
            {
                id: "sub-tradingview",
                name: "TradingView",
                category: "Charting",
                cadence: "annual",
                cost: 179,
                currency: "USD",
                renewalDate: "2026-11-08",
                strategicValue: "research",
                ownerNote: "Technical context only; not a signal generator."
            },
            {
                id: "sub-wsj",
                name: "Wall Street Journal",
                category: "News",
                cadence: "monthly",
                cost: 12,
                currency: "USD",
                renewalDate: "2026-06-01",
                strategicValue: "media",
                ownerNote: "Macro and market narrative awareness."
            },
            {
                id: "sub-vercel",
                name: "Vercel",
                category: "Infrastructure",
                cadence: "monthly",
                cost: 20,
                currency: "USD",
                renewalDate: "2026-06-05",
                strategicValue: "infra",
                ownerNote: "Prototype hosting and private app infrastructure."
            },
            {
                id: "sub-coursera",
                name: "Coursera Plus",
                category: "Education",
                cadence: "annual",
                cost: 399,
                currency: "USD",
                renewalDate: "2026-09-17",
                strategicValue: "learning",
                ownerNote: "Structured learning for accounting, markets, and AI tooling."
            }
        ]
    };
}
