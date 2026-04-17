 "use client";

import Link from "next/link";
import { useSalesQuery } from "@/features/sales/hook";
import { summarizeSales } from "@/features/sales/metrics";
import { useWorkspacesQuery } from "@/features/workspaces/hook";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { WorkspaceSelect } from "@/components/sales-dashboard/common";
import { WeeklyLedgerTable, WeeklyStats } from "@/components/sales-dashboard/weekly-summary-sections";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function WeeklySummaryAnalysisPage() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const currentWorkspaceId = useWorkspaceStore((s) => s.currentWorkspaceId);
  const setCurrentWorkspaceId = useWorkspaceStore((s) => s.setCurrentWorkspaceId);
  const workspacesQuery = useWorkspacesQuery();
  const salesQuery = useSalesQuery({ workspaceId: currentWorkspaceId });
  const sales = salesQuery.data ?? [];
  const summary = summarizeSales(sales);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] ledger-grid-dark font-body">
      <AppSidebar
        userEmail={user?.email}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogoutClick={() => clearSession()}
      />
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8 lg:ml-64">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-metrics text-xs uppercase tracking-[0.2em] text-[#85948f]">Detailed Report</p>
            <h1 className="font-headline text-5xl font-black">Weekly Summary</h1>
            <p className="mono-metrics mt-2 text-sm text-[#85948f]">OCT 14 — OCT 20, 2024</p>
          </div>
          <Link href="/" className="signal-cut-sm bg-[#44ddc1] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00382f]">
            Ana Sayfa
          </Link>
        </header>

        <section>
          <WorkspaceSelect
            className="rounded-lg border border-[#3c4a46] bg-[#1c1b1b] px-3 py-2 text-sm"
            value={currentWorkspaceId ?? ""}
            onChange={(value) => setCurrentWorkspaceId(value || null)}
            workspaces={workspacesQuery.data ?? []}
          />
        </section>

        <WeeklyStats sales={sales} summary={summary} />
        <WeeklyLedgerTable sales={sales} />

        {salesQuery.isLoading ? <p className="text-sm text-[#85948f]">Satışlar yükleniyor...</p> : null}
        {salesQuery.isError ? <p className="text-sm text-[#ffb4ac]">Hata: {(salesQuery.error as Error).message}</p> : null}
      </div>
    </div>
  );
}
