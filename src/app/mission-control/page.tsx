 "use client";

import Link from "next/link";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useSalesQuery } from "@/features/sales/hook";
import { summarizeSales } from "@/features/sales/metrics";
import { useWorkspacesQuery } from "@/features/workspaces/hook";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { WorkspaceSelect } from "@/components/sales-dashboard/common";
import { MissionAnalytics, MissionKpiGrid } from "@/components/sales-dashboard/mission-control-sections";

export default function DashboardMissionControlPage() {
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const currentWorkspaceId = useWorkspaceStore((s) => s.currentWorkspaceId);
  const setCurrentWorkspaceId = useWorkspaceStore((s) => s.setCurrentWorkspaceId);
  const workspacesQuery = useWorkspacesQuery();
  const salesQuery = useSalesQuery({ workspaceId: currentWorkspaceId });
  const sales = salesQuery.data ?? [];
  const summary = summarizeSales(sales);
  const chartData = sales.slice(-7);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] ledger-grid-dark font-body">
      <AppSidebar
        userEmail={user?.email}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogoutClick={() => clearSession()}
      />

      <main className="p-6 lg:ml-64 lg:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#85948f]">Global Pulse Monitoring</p>
            <h1 className="font-headline text-4xl font-black">Mission Control</h1>
          </div>
          <Link href="/" className="signal-cut-sm bg-[#44ddc1] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00382f]">
            Sayfa Listesi
          </Link>
        </header>

        <section className="mb-6 flex flex-wrap items-center gap-3">
          <WorkspaceSelect
            className="rounded-lg border border-[#3c4a46] bg-[#1c1b1b] px-3 py-2 text-sm"
            value={currentWorkspaceId ?? ""}
            onChange={(value) => setCurrentWorkspaceId(value || null)}
            workspaces={workspacesQuery.data ?? []}
          />
          {!token ? <p className="text-xs text-[#ffb4ac]">Önce giriş yapmalısın.</p> : null}
        </section>

        <MissionKpiGrid summary={summary} totalRecords={sales.length} />
        <MissionAnalytics chartData={chartData} summary={summary} />

        {salesQuery.isLoading ? <p className="mt-4 text-sm text-[#85948f]">Satışlar yükleniyor...</p> : null}
        {salesQuery.isError ? (
          <p className="mt-4 text-sm text-[#ffb4ac]">Hata: {(salesQuery.error as Error).message}</p>
        ) : null}
      </main>
    </div>
  );
}
