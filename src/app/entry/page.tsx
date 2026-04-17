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
import { AppSidebar } from "@/components/layout/app-sidebar";

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
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] ledger-grid-dark font-body">
      <AppSidebar
        userEmail={user?.email}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogoutClick={() => clearSession()}
      />
      <div className="mx-auto max-w-3xl p-6 lg:ml-64">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#44ddc1]">Session Ledger</p>
            <h1 className="font-headline text-3xl font-black">Daily Entry Form</h1>
          </div>
          <Link href="/" className="signal-cut-sm bg-[#44ddc1] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00382f]">
            Home
          </Link>
        </header>

        <section className="mb-4">
          <WorkspaceSelect
            className="rounded-lg border border-[#3c4a46] bg-[#1c1b1b] px-3 py-2 text-sm"
            value={currentWorkspaceId ?? ""}
            onChange={(value) => setCurrentWorkspaceId(value || null)}
            workspaces={workspacesQuery.data ?? []}
          />
        </section>

        <form
          className="signal-cut bg-[#1c1b1b] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
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
          <p className="mt-2 text-xs text-[#66dd8b]">{sales.length} kayıt</p>
          <DailyEntryActions disabled={!currentWorkspaceId || upsertSaleMutation.isPending} onClear={() => form.reset()} />
          {upsertSaleMutation.error ? <p className="mt-3 text-sm text-[#ffb4ac]">{upsertSaleMutation.error.message}</p> : null}
        </form>
      </div>
    </div>
  );
}
