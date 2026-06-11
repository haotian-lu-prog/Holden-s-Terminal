export function annualizedCost(subscription) {
    return subscription.cadence === "monthly" ? subscription.cost * 12 : subscription.cost;
}
export function monthlyRunRate(subscriptions) {
    return subscriptions.reduce((sum, subscription) => sum + annualizedCost(subscription) / 12, 0);
}
export function annualRunRate(subscriptions) {
    return subscriptions.reduce((sum, subscription) => sum + annualizedCost(subscription), 0);
}
