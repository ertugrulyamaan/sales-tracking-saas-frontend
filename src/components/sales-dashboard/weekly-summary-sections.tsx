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
      <article className="dashboard-panel signal-cut p-6 md:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#7f98ae]">Total Performance</p>
        <p className="mono-metrics mt-3 text-5xl font-black text-[#def5ff]">{formatMoney(totalAmount)}</p>
        <p className="mt-2 text-sm font-bold text-[#27f0c9]">{formatPercent(trendPercent)}</p>
      </article>
      <article className="dashboard-panel-soft signal-cut border-t-2 border-[#27f0c9] p-6">
        <p className="text-xs uppercase tracking-widest text-[#7f98ae]">Best Day</p>
        <p className="mt-3 text-2xl font-bold text-[#27f0c9]">{bestDay ? shortDateLabel(bestDay.date) : "-"}</p>
        <p className="mono-metrics mt-2 text-3xl text-[#ddf6ff]">{formatMoney(bestDay?.salesAmount ?? 0)}</p>
      </article>
      <article className="dashboard-panel-soft signal-cut border-t-2 border-[#ff8f9a] p-6">
        <p className="text-xs uppercase tracking-widest text-[#7f98ae]">Worst Day</p>
        <p className="mt-3 text-2xl font-bold text-[#ff8f9a]">{worstDay ? shortDateLabel(worstDay.date) : "-"}</p>
        <p className="mono-metrics mt-2 text-3xl text-[#ddf6ff]">{formatMoney(worstDay?.salesAmount ?? 0)}</p>
      </article>
    </section>
  );
}

type WeeklyLedgerTableProps = {
  dailyBreakdown: WeeklySummaryDaily[];
};

export function WeeklyLedgerTable({ dailyBreakdown }: WeeklyLedgerTableProps) {
  return (
    <section className="dashboard-panel signal-cut overflow-hidden">
      <div className="border-b border-[#2e4358]/40 p-6">
        <h2 className="font-headline text-2xl font-black text-[#def5ff]">Daily Transaction Ledger</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-[#0b1522] text-left text-[10px] uppercase tracking-[0.2em] text-[#7f98ae]">
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
                <tr key={day.date} className="border-t border-[#2b4054]/35 text-sm">
                  <td className="px-6 py-4 mono-metrics text-[#c5d9e9]">{shortDateLabel(day.date)}</td>
                  <td className="px-6 py-4 mono-metrics text-[#dcf4ff]">{formatMoney(amount)}</td>
                  <td className="px-6 py-4 mono-metrics text-[#ff8f9a]">{formatMoney(day.refundAmount)}</td>
                  <td className="px-6 py-4 mono-metrics text-[#c5d9e9]">{day.salesCount}</td>
                  <td className="px-6 py-4 mono-metrics font-bold text-[#2aeac6]">{formatMoney(day.netRevenue)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
