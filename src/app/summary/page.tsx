 "use client";

import Link from "next/link";
import { useSalesQuery } from "@/features/sales/hook";
import { summarizeSales } from "@/features/sales/metrics";
import { useWeeklySummaryQuery } from "@/features/analytics/hook";
import { useWorkspacesQuery } from "@/features/workspaces/hook";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { WorkspaceSelect } from "@/components/sales-dashboard/common";
import { WeeklyLedgerTable, WeeklyStats } from "@/components/sales-dashboard/weekly-summary-sections";
import { DashboardShell } from "@/components/layout/dashboard-shell";

function getCurrentWeekStartDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  now.setDate(now.getDate() + diff);
  return now.toISOString().slice(0, 10);
}

export default function WeeklySummaryAnalysisPage() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const currentWorkspaceId = useWorkspaceStore((s) => s.currentWorkspaceId);
  const setCurrentWorkspaceId = useWorkspaceStore((s) => s.setCurrentWorkspaceId);
  const workspacesQuery = useWorkspacesQuery();
  const salesQuery = useSalesQuery({ workspaceId: currentWorkspaceId });
  const weeklySummaryQuery = useWeeklySummaryQuery({
    workspaceId: currentWorkspaceId,
    weekStartDate: getCurrentWeekStartDate(),
  });
  const sales = salesQuery.data ?? [];
  const summary = summarizeSales(sales);
  const weeklySummary = weeklySummaryQuery.data;
  const trendPercent =
    weeklySummary?.weekOverWeek?.salesAmountChangePct ?? summary.trendPercent;
  const totalAmount = weeklySummary?.totals.totalSalesAmount ?? summary.totalAmount;

  return (
    <DashboardShell userEmail={user?.email} onLogout={() => clearSession()}>
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-metrics text-xs uppercase tracking-[0.2em] text-[#7f98ae]">Detailed Report</p>
            <h1 className="font-headline text-5xl font-black text-[#e0f7ff]">Weekly Summary</h1>
            <p className="mono-metrics mt-2 text-sm text-[#7f98ae]">
              {weeklySummary
                ? `${weeklySummary.weekStartDate} — ${weeklySummary.weekEndDate}`
                : "Current week"}
            </p>
          </div>
          <Link href="/" className="btn-neon signal-cut-sm px-4 py-2 text-xs font-bold uppercase tracking-widest">
            Home
          </Link>
        </header>

        <section>
          <WorkspaceSelect
            className="dashboard-select rounded-lg px-3 py-2 text-sm"
            value={currentWorkspaceId ?? ""}
            onChange={(value) => setCurrentWorkspaceId(value || null)}
            workspaces={workspacesQuery.data ?? []}
          />
        </section>

        <WeeklyStats
          totalAmount={totalAmount}
          trendPercent={trendPercent}
          bestDay={weeklySummary?.bestDay}
          worstDay={weeklySummary?.worstDay}
        />
        <WeeklyLedgerTable dailyBreakdown={weeklySummary?.dailyBreakdown ?? []} />

        {salesQuery.isLoading ? <p className="text-sm text-[#7f98ae]">Sales are loading...</p> : null}
        {salesQuery.isError ? <p className="text-sm text-[#ff98a3]">Error: {(salesQuery.error as Error).message}</p> : null}
        {weeklySummaryQuery.isError ? (
          <p className="text-sm text-[#ff98a3]">Weekly summary error: {(weeklySummaryQuery.error as Error).message}</p>
        ) : null}
    </DashboardShell>
  );
}
