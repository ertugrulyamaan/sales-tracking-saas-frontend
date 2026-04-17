import type { SaleRecord } from "@/types/api";
import { formatMoney, formatPercent, shortDateLabel, type SalesSummary } from "@/features/sales/metrics";

type WeeklyStatsProps = {
  sales: SaleRecord[];
  summary: SalesSummary;
};

export function WeeklyStats({ sales, summary }: WeeklyStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <article className="signal-cut bg-[#201f1f] p-6 md:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#85948f]">Total Performance</p>
        <p className="mono-metrics mt-3 text-5xl font-black">{formatMoney(summary.totalAmount)}</p>
        <p className="mt-2 text-sm font-bold text-[#66dd8b]">{formatPercent(summary.trendPercent)}</p>
      </article>
      <article className="signal-cut border-t-2 border-[#66dd8b] bg-[#2a2a2a] p-6">
        <p className="text-xs uppercase tracking-widest text-[#85948f]">Best Day</p>
        <p className="mt-3 text-2xl font-bold text-[#66dd8b]">{sales.at(-1) ? shortDateLabel(sales.at(-1)!.date) : "-"}</p>
        <p className="mono-metrics mt-2 text-3xl">{formatMoney(summary.lastAmount)}</p>
      </article>
      <article className="signal-cut border-t-2 border-[#ffb4ac] bg-[#2a2a2a] p-6">
        <p className="text-xs uppercase tracking-widest text-[#85948f]">Worst Day</p>
        <p className="mt-3 text-2xl font-bold text-[#ffb4ac]">{sales.at(-2) ? shortDateLabel(sales.at(-2)!.date) : "-"}</p>
        <p className="mono-metrics mt-2 text-3xl">{formatMoney(summary.previousAmount)}</p>
      </article>
    </section>
  );
}

type WeeklyLedgerTableProps = {
  sales: SaleRecord[];
};

export function WeeklyLedgerTable({ sales }: WeeklyLedgerTableProps) {
  return (
    <section className="signal-cut overflow-hidden bg-[#201f1f]">
      <div className="border-b border-[#3c4a46]/20 p-6">
        <h2 className="font-headline text-2xl font-black">Daily Transaction Ledger</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-[#1c1b1b] text-left text-[10px] uppercase tracking-[0.2em] text-[#85948f]">
            <tr>
              <th className="px-6 py-4">Date / Day</th>
              <th className="px-6 py-4">Gross Sales</th>
              <th className="px-6 py-4">Refunds</th>
              <th className="px-6 py-4">Volume</th>
              <th className="px-6 py-4">Net Signal</th>
            </tr>
          </thead>
          <tbody>
            {sales.slice().reverse().map((sale) => {
              const amount = Number(sale.salesAmount);
              return (
                <tr key={sale.id} className="border-t border-[#3c4a46]/10 text-sm">
                  <td className="px-6 py-4 mono-metrics">{shortDateLabel(sale.date)}</td>
                  <td className="px-6 py-4 mono-metrics">{formatMoney(amount)}</td>
                  <td className="px-6 py-4 mono-metrics text-[#ffb4ac]">{formatMoney(0)}</td>
                  <td className="px-6 py-4 mono-metrics">{sale.salesCount}</td>
                  <td className="px-6 py-4 mono-metrics font-bold">{formatMoney(amount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
