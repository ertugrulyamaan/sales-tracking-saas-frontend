import type { WeeklySummaryDaily } from "@/types/api";
import { formatMoney, formatPercent, shortDateLabel } from "@/features/sales/metrics";

type WeeklyStatsProps = {
  totalAmount: number;
  trendPercent: number;
  bestDay?: WeeklySummaryDaily | null;
  worstDay?: WeeklySummaryDaily | null;
};

export function WeeklyStats({
  totalAmount,
  trendPercent,
  bestDay,
  worstDay,
}: WeeklyStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <article className="signal-cut bg-[#201f1f] p-6 md:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#85948f]">Total Performance</p>
        <p className="mono-metrics mt-3 text-5xl font-black">{formatMoney(totalAmount)}</p>
        <p className="mt-2 text-sm font-bold text-[#66dd8b]">{formatPercent(trendPercent)}</p>
      </article>
      <article className="signal-cut border-t-2 border-[#66dd8b] bg-[#2a2a2a] p-6">
        <p className="text-xs uppercase tracking-widest text-[#85948f]">Best Day</p>
        <p className="mt-3 text-2xl font-bold text-[#66dd8b]">{bestDay ? shortDateLabel(bestDay.date) : "-"}</p>
        <p className="mono-metrics mt-2 text-3xl">{formatMoney(bestDay?.salesAmount ?? 0)}</p>
      </article>
      <article className="signal-cut border-t-2 border-[#ffb4ac] bg-[#2a2a2a] p-6">
        <p className="text-xs uppercase tracking-widest text-[#85948f]">Worst Day</p>
        <p className="mt-3 text-2xl font-bold text-[#ffb4ac]">{worstDay ? shortDateLabel(worstDay.date) : "-"}</p>
        <p className="mono-metrics mt-2 text-3xl">{formatMoney(worstDay?.salesAmount ?? 0)}</p>
      </article>
    </section>
  );
}

type WeeklyLedgerTableProps = {
  dailyBreakdown: WeeklySummaryDaily[];
};

export function WeeklyLedgerTable({ dailyBreakdown }: WeeklyLedgerTableProps) {
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
            {dailyBreakdown.slice().reverse().map((day) => {
              const amount = day.salesAmount;
              return (
                <tr key={day.date} className="border-t border-[#3c4a46]/10 text-sm">
                  <td className="px-6 py-4 mono-metrics">{shortDateLabel(day.date)}</td>
                  <td className="px-6 py-4 mono-metrics">{formatMoney(amount)}</td>
                  <td className="px-6 py-4 mono-metrics text-[#ffb4ac]">{formatMoney(day.refundAmount)}</td>
                  <td className="px-6 py-4 mono-metrics">{day.salesCount}</td>
                  <td className="px-6 py-4 mono-metrics font-bold">{formatMoney(day.netRevenue)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
