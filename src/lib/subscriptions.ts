import type { Subscription } from "../types/investment.js";

export function annualizedCost(subscription: Subscription): number {
  return subscription.cadence === "monthly" ? subscription.cost * 12 : subscription.cost;
}

export function monthlyRunRate(subscriptions: Subscription[]): number {
  return subscriptions.reduce((sum, subscription) => sum + annualizedCost(subscription) / 12, 0);
}

export function annualRunRate(subscriptions: Subscription[]): number {
  return subscriptions.reduce((sum, subscription) => sum + annualizedCost(subscription), 0);
}
