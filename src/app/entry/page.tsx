 "use client";

import { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertSaleMutation, useSalesQuery } from "@/features/sales/hook";
import { upsertSaleSchema, type UpsertSaleInput } from "@/features/sales/schema";
import { summarizeSales } from "@/features/sales/metrics";
import { useWorkspacesQuery } from "@/features/workspaces/hook";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { useAuthStore } from "@/stores/auth-store";
import { WorkspaceSelect } from "@/components/sales-dashboard/common";
import { DailyEntryActions, DailyEntryFields } from "@/components/sales-dashboard/daily-entry-sections";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function DailyEntryFormPage() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const currentWorkspaceId = useWorkspaceStore((s) => s.currentWorkspaceId);
  const setCurrentWorkspaceId = useWorkspaceStore((s) => s.setCurrentWorkspaceId);
  const workspacesQuery = useWorkspacesQuery();
  const salesQuery = useSalesQuery({ workspaceId: currentWorkspaceId });
  const upsertSaleMutation = useUpsertSaleMutation({ workspaceId: currentWorkspaceId });
  const sales = salesQuery.data ?? [];
  const summary = summarizeSales(sales);
  const form = useForm<UpsertSaleInput>({
    resolver: zodResolver(upsertSaleSchema),
    defaultValues: { date: "", salesCount: 0, salesAmount: 0 },
  });

  useEffect(() => {
    const last = sales.at(-1);
    if (!last) return;
    form.reset({
      date: new Date().toISOString().slice(0, 10),
      salesCount: last.salesCount,
      salesAmount: Number(last.salesAmount),
    });
  }, [sales, form]);

  return (
    <DashboardShell
      userEmail={user?.email}
      onLogout={() => clearSession()}
      contentClassName="mx-auto w-full max-w-3xl p-6"
    >
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#00e0ff]">Session Ledger</p>
            <h1 className="font-headline text-3xl font-black text-[#e0f7ff]">Daily Entry Form</h1>
          </div>
          <Link href="/" className="btn-neon signal-cut-sm px-4 py-2 text-xs font-bold uppercase tracking-widest">
            Home
          </Link>
        </header>

        <section className="mb-4">
          <WorkspaceSelect
            className="dashboard-select rounded-lg px-3 py-2 text-sm"
            value={currentWorkspaceId ?? ""}
            onChange={(value) => setCurrentWorkspaceId(value || null)}
            workspaces={workspacesQuery.data ?? []}
          />
        </section>

        <form
          className="dashboard-panel signal-cut p-8"
          onSubmit={form.handleSubmit((values) => {
            if (!currentWorkspaceId) return;
            upsertSaleMutation.mutate({
              workspaceId: currentWorkspaceId,
              date: values.date,
              salesCount: values.salesCount,
              salesAmount: values.salesAmount,
            });
          })}
        >
          <DailyEntryFields form={form} summary={summary} />
          <p className="mt-2 text-xs text-[#22efc8]">{sales.length} kayıt</p>
          <DailyEntryActions disabled={!currentWorkspaceId || upsertSaleMutation.isPending} onClear={() => form.reset()} />
          {upsertSaleMutation.error ? <p className="mt-3 text-sm text-[#ff98a3]">{upsertSaleMutation.error.message}</p> : null}
        </form>
    </DashboardShell>
  );
}
