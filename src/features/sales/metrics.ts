import type { SaleRecord } from "@/types/api";

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export type SalesSummary = {
  totalCount: number;
  totalAmount: number;
  averageAmount: number;
  lastAmount: number;
  lastCount: number;
  previousAmount: number;
  previousCount: number;
  trendPercent: number;
};

export function summarizeSales(sales: SaleRecord[]): SalesSummary {
  const sorted = [...sales].sort((a, b) => a.date.localeCompare(b.date));
  const totalCount = sorted.reduce((sum, sale) => sum + sale.salesCount, 0);
  const totalAmount = sorted.reduce((sum, sale) => sum + toNumber(sale.salesAmount), 0);
  const averageAmount = sorted.length ? totalAmount / sorted.length : 0;
  const last = sorted.at(-1);
  const previous = sorted.at(-2);
  const lastAmount = last ? toNumber(last.salesAmount) : 0;
  const previousAmount = previous ? toNumber(previous.salesAmount) : 0;
  const base = previousAmount === 0 ? 1 : previousAmount;
  const trendPercent = ((lastAmount - previousAmount) / base) * 100;

  return {
    totalCount,
    totalAmount,
    averageAmount,
    lastAmount,
    lastCount: last?.salesCount ?? 0,
    previousAmount,
    previousCount: previous?.salesCount ?? 0,
    trendPercent,
  };
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function shortDateLabel(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
}
