export const BASE_CURRENCY = "USD";
const usdRates = {
    USD: 1,
    JPY: 0.00635,
    EUR: 1.08
};
export function toBaseCurrency(value, currency) {
    return value * usdRates[currency];
}
export function holdingMarketValue(holding) {
    return toBaseCurrency(holding.marketValue, holding.currency);
}
export function holdingCostBasis(holding) {
    return toBaseCurrency(holding.costBasis, holding.currency);
}
export function totalMarketValue(holdings) {
    return holdings.reduce((sum, holding) => sum + holdingMarketValue(holding), 0);
}
export function totalCostBasis(holdings) {
    return holdings.reduce((sum, holding) => sum + holdingCostBasis(holding), 0);
}
export function totalCash(accounts) {
    return accounts.reduce((sum, account) => sum + toBaseCurrency(account.cash, account.currency), 0);
}
export function totalDebt(accounts) {
    return accounts.reduce((sum, account) => sum + toBaseCurrency(account.debt, account.currency), 0);
}
export function netWorth(accounts, holdings) {
    return totalCash(accounts) + totalMarketValue(holdings) - totalDebt(accounts);
}
export function unrealizedProfitLoss(holdings) {
    return totalMarketValue(holdings) - totalCostBasis(holdings);
}
export function unrealizedProfitLossPercent(holdings) {
    const basis = totalCostBasis(holdings);
    return basis ? (unrealizedProfitLoss(holdings) / basis) * 100 : 0;
}
export function exposureByAssetClass(holdings) {
    return exposureBy(holdings, (holding) => holding.assetClass);
}
export function exposureByCountry(holdings) {
    return exposureBy(holdings, (holding) => holding.country);
}
export function exposureByCurrency(accounts, holdings) {
    const totals = new Map();
    for (const holding of holdings) {
        totals.set(holding.currency, (totals.get(holding.currency) || 0) + holdingMarketValue(holding));
    }
    for (const account of accounts) {
        totals.set(account.currency, (totals.get(account.currency) || 0) +
            toBaseCurrency(account.cash - account.debt, account.currency));
    }
    const denominator = Array.from(totals.values()).reduce((sum, value) => sum + Math.max(value, 0), 0);
    return Array.from(totals.entries())
        .map(([label, value]) => ({
        label,
        value,
        weight: denominator ? (Math.max(value, 0) / denominator) * 100 : 0
    }))
        .sort((a, b) => b.value - a.value);
}
export function concentrationRisk(holdings) {
    const total = totalMarketValue(holdings);
    const sorted = [...holdings].sort((a, b) => holdingMarketValue(b) - holdingMarketValue(a));
    const topHolding = sorted[0];
    const topFiveValue = sorted.slice(0, 5).reduce((sum, holding) => sum + holdingMarketValue(holding), 0);
    const largestAssetClass = exposureByAssetClass(holdings)[0] || {
        label: "Unallocated",
        value: 0,
        weight: 0
    };
    return {
        topHolding,
        topHoldingWeight: total && topHolding ? (holdingMarketValue(topHolding) / total) * 100 : 0,
        topFiveWeight: total ? (topFiveValue / total) * 100 : 0,
        largestAssetClass
    };
}
function exposureBy(holdings, getLabel) {
    const total = totalMarketValue(holdings);
    const totals = new Map();
    for (const holding of holdings) {
        const label = getLabel(holding);
        totals.set(label, (totals.get(label) || 0) + holdingMarketValue(holding));
    }
    return Array.from(totals.entries())
        .map(([label, value]) => ({
        label,
        value,
        weight: total ? (value / total) * 100 : 0
    }))
        .sort((a, b) => b.value - a.value);
}
