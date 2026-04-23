import Link from "next/link";
import { MissionRevenueBarChart } from "@/components/charts/sales-charts";
import { formatMoney, formatPercent } from "@/features/sales/metrics";
import type { SaleRecord } from "@/types/api";

type MissionSidebarProps = {
  isLoggedIn: boolean;
};

export function MissionSidebar({ isLoggedIn }: MissionSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-[#3c4a46]/20 bg-[#131313] p-6 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="signal-cut-sm flex h-8 w-8 items-center justify-center bg-[#44ddc1] text-[#00382f]">✦</div>
        <div>
          <p className="font-headline text-sm font-black uppercase tracking-[0.2em] text-[#44ddc1]">Sales Pulse</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#85948f]">Precision Ledger</p>
        </div>
      </div>
      <nav className="space-y-2 text-xs uppercase tracking-widest">
        <div className="rounded-lg bg-[#1c1b1b] px-4 py-3 text-[#44ddc1]">Pulse Overview</div>
        <Link href="/weekly-summary-analysis" className="block px-4 py-3 text-[#85948f] hover:text-[#44ddc1]">Impact Ledger</Link>
        <Link href="/daily-entry-form" className="block px-4 py-3 text-[#85948f] hover:text-[#44ddc1]">Data Entry</Link>
        <Link href="/dashboard-light-mode" className="block px-4 py-3 text-[#85948f] hover:text-[#44ddc1]">Light Mode</Link>
      </nav>
      {!isLoggedIn ? <p className="mt-4 text-xs text-[#ffb4ac]">Önce giriş yapmalısın.</p> : null}
    </aside>
  );
}

type MissionKpiGridProps = {
  totalAmount: number;
  netRevenue: number;
  trendPercent: number;
  totalRecords: number;
};

export function MissionKpiGrid({
  totalAmount,
  netRevenue,
  trendPercent,
  totalRecords,
}: MissionKpiGridProps) {
  const cards = [
    { label: "Gross Revenue", value: formatMoney(totalAmount), trend: formatPercent(trendPercent) },
    { label: "Active Pipelines", value: String(totalRecords), trend: `${totalRecords} records` },
    { label: "Net Revenue", value: formatMoney(netRevenue), trend: `${totalRecords} records` },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="dashboard-panel signal-cut p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7f98ae]">{card.label}</p>
          <p className="mono-metrics mt-3 text-3xl font-bold text-[#def5ff]">{card.value}</p>
          <p className="mt-3 text-xs font-bold text-[#27f0c9]">{card.trend}</p>
        </article>
      ))}
    </section>
  );
}

type MissionAnalyticsProps = {
  chartData: SaleRecord[];
  latestAmount: number;
  previousAmount: number;
  trendPercent: number;
  insights: string[];
};

export function MissionAnalytics({
  chartData,
  latestAmount,
  previousAmount,
  trendPercent,
  insights,
}: MissionAnalyticsProps) {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-3">
      <article className="dashboard-panel signal-cut lg:col-span-2 p-6">
        <h2 className="font-headline text-xl font-bold text-[#def5ff]">Pulse Velocity Analytics</h2>
        <p className="mt-2 text-sm text-[#9db3c7]">Son 7 satış kaydı görselleştiriliyor.</p>
        <div className="mt-6 h-64">
          <MissionRevenueBarChart sales={chartData} />
        </div>
      </article>
      <article className="dashboard-panel-soft signal-cut p-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#00e0ff]">Pulse Insights</h3>
        <ul className="mt-4 space-y-3 text-sm text-[#a7bfd4]">
          <li>Latest sale amount: {formatMoney(latestAmount)}</li>
          <li>Previous sale amount: {formatMoney(previousAmount)}</li>
          <li>Trend delta: {formatPercent(trendPercent)}</li>
          {insights.slice(0, 2).map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
