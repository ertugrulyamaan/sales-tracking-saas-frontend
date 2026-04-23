"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/hook";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/features/auth/schemas";
import { useAddSaleMutation, useSalesQuery, useUpsertSaleMutation } from "@/features/sales/hook";
import { addSaleSchema, upsertSaleSchema, type AddSaleInput, type UpsertSaleInput } from "@/features/sales/schema";
import { useAddRefundMutation, useRefundsQuery, useUpsertRefundMutation } from "@/features/refunds/hook";
import { addRefundSchema, upsertRefundSchema, type AddRefundInput, type UpsertRefundInput } from "@/features/refunds/schema";
import { useUpsertTargetMutation, useTargetsQuery } from "@/features/targets/hook";
import { upsertTargetSchema, type UpsertTargetInput } from "@/features/targets/schema";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspacesQuery } from "@/features/workspaces/hook";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { useDailySummaryQuery, useWeeklySummaryQuery } from "@/features/analytics/hook";
import { useRouter } from "next/navigation";

function getCurrentWeekStartDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  now.setDate(now.getDate() + diff);
  return now.toISOString().slice(0, 10);
}

export default function WorkbenchPage() {
  const today = new Date().toISOString().slice(0, 10);
  const weekStartDate = getCurrentWeekStartDate();
  const router = useRouter();
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const currentWorkspaceId = useWorkspaceStore((s) => s.currentWorkspaceId);
  const setCurrentWorkspaceId = useWorkspaceStore((s) => s.setCurrentWorkspaceId);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const workspacesQuery = useWorkspacesQuery();
  const salesQuery = useSalesQuery({ workspaceId: currentWorkspaceId });
  const refundsQuery = useRefundsQuery({ workspaceId: currentWorkspaceId });
  const targetsQuery = useTargetsQuery({ workspaceId: currentWorkspaceId });
  const dailySummaryQuery = useDailySummaryQuery({
    workspaceId: currentWorkspaceId,
    date: today,
  });
  const weeklySummaryQuery = useWeeklySummaryQuery({
    workspaceId: currentWorkspaceId,
    weekStartDate,
  });
  const upsertSaleMutation = useUpsertSaleMutation({ workspaceId: currentWorkspaceId });
  const addSaleMutation = useAddSaleMutation({ workspaceId: currentWorkspaceId });
  const upsertRefundMutation = useUpsertRefundMutation({ workspaceId: currentWorkspaceId });
  const addRefundMutation = useAddRefundMutation({ workspaceId: currentWorkspaceId });
  const upsertTargetMutation = useUpsertTargetMutation({ workspaceId: currentWorkspaceId });

  const loginForm = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const registerForm = useForm<RegisterInput>({ resolver: zodResolver(registerSchema), defaultValues: { email: "", password: "" } });
  const upsertSaleForm = useForm<UpsertSaleInput>({
    resolver: zodResolver(upsertSaleSchema),
    defaultValues: { date: "", salesCount: 0, salesAmount: 0 },
  });
  const addSaleForm = useForm<AddSaleInput>({
    resolver: zodResolver(addSaleSchema),
    defaultValues: { date: "", addSalesCount: 0, addSalesAmount: 0 },
  });
  const upsertRefundForm = useForm<UpsertRefundInput>({
    resolver: zodResolver(upsertRefundSchema),
    defaultValues: { date: "", refundCount: 0, refundAmount: 0 },
  });
  const addRefundForm = useForm<AddRefundInput>({
    resolver: zodResolver(addRefundSchema),
    defaultValues: { date: "", addRefundCount: 0, addRefundAmount: 0 },
  });
  const upsertTargetForm = useForm<UpsertTargetInput>({
    resolver: zodResolver(upsertTargetSchema),
    defaultValues: { weekStartDate: "", targetSalesAmount: 0, targetSalesCount: 0 },
  });

  const workspaces = workspacesQuery.data ?? [];
  const sales = salesQuery.data ?? [];
  const refunds = refundsQuery.data ?? [];
  const targets = targetsQuery.data ?? [];

  return (
    <DashboardShell
      userEmail={user?.email}
      onLogout={() => clearSession()}
      contentClassName="mx-auto w-full max-w-4xl space-y-6 p-6"
    >
      <h1 className="font-headline text-3xl font-black text-[#e0f7ff]">Sales Tracking Workbench</h1>
      <p className="text-[#9db3c7]">Auth: {token ? "Giriş yapıldı" : "Giriş yok"}</p>
      <p className="text-[#9db3c7]">Kullanıcı: {user?.email ?? "-"}</p>

      {!token ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form className="dashboard-panel space-y-2 rounded p-4" onSubmit={loginForm.handleSubmit((values) => loginMutation.mutate(values))}>
            <h2 className="text-lg font-medium text-[#def5ff]">Login</h2>
            <input className="dashboard-select w-full rounded px-3 py-2" placeholder="email" {...loginForm.register("email")} />
            <input type="password" className="dashboard-select w-full rounded px-3 py-2" placeholder="password" {...loginForm.register("password")} />
            <button className="btn-neon rounded px-3 py-2" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Giris yapiliyor..." : "Giris yap"}
            </button>
          </form>

          <form className="dashboard-panel space-y-2 rounded p-4" onSubmit={registerForm.handleSubmit((values) => registerMutation.mutate(values))}>
            <h2 className="text-lg font-medium text-[#def5ff]">Register</h2>
            <input className="dashboard-select w-full rounded px-3 py-2" placeholder="email" {...registerForm.register("email")} />
            <input type="password" className="dashboard-select w-full rounded px-3 py-2" placeholder="password" {...registerForm.register("password")} />
            <button className="btn-neon rounded px-3 py-2" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Kayit yapiliyor..." : "Kayit ol"}
            </button>
          </form>
        </section>
      ) : (
        <button
          className="btn-ghost rounded px-3 py-2"
          onClick={() => {
            clearSession();
            router.replace("/");
          }}
        >
          Cikis yap
        </button>
      )}

      <section>
        <h2 className="text-lg font-medium text-[#def5ff]">Workspaces</h2>
        <select className="dashboard-select mb-3 rounded px-3 py-2" value={currentWorkspaceId ?? ""} onChange={(e) => setCurrentWorkspaceId(e.target.value || null)}>
          <option value="">Workspace sec</option>
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </section>

      {token && currentWorkspaceId ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form
            className="space-y-2 rounded border p-4"
            onSubmit={upsertSaleForm.handleSubmit((values) =>
              upsertSaleMutation.mutate({
                workspaceId: currentWorkspaceId,
                date: values.date,
                salesCount: values.salesCount,
                salesAmount: values.salesAmount,
              }),
            )}
          >
            <h2 className="text-lg font-medium">Sales Upsert</h2>
            <input className="w-full rounded border px-3 py-2" type="date" {...upsertSaleForm.register("date")} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} placeholder="salesCount" {...upsertSaleForm.register("salesCount", { valueAsNumber: true })} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} step="0.01" placeholder="salesAmount" {...upsertSaleForm.register("salesAmount", { valueAsNumber: true })} />
            <button className="rounded border px-3 py-2" disabled={upsertSaleMutation.isPending}>
              Kaydet
            </button>
          </form>

          <form
            className="space-y-2 rounded border p-4"
            onSubmit={addSaleForm.handleSubmit((values) =>
              addSaleMutation.mutate({
                workspaceId: currentWorkspaceId,
                date: values.date,
                addSalesCount: values.addSalesCount,
                addSalesAmount: values.addSalesAmount,
              }),
            )}
          >
            <h2 className="text-lg font-medium">Sales Add</h2>
            <input className="w-full rounded border px-3 py-2" type="date" {...addSaleForm.register("date")} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} placeholder="addSalesCount" {...addSaleForm.register("addSalesCount", { valueAsNumber: true })} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} step="0.01" placeholder="addSalesAmount" {...addSaleForm.register("addSalesAmount", { valueAsNumber: true })} />
            <button className="rounded border px-3 py-2" disabled={addSaleMutation.isPending}>
              Ekle
            </button>
          </form>
        </section>
      ) : null}

      {token && currentWorkspaceId ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form
            className="space-y-2 rounded border p-4"
            onSubmit={upsertRefundForm.handleSubmit((values) =>
              upsertRefundMutation.mutate({
                workspaceId: currentWorkspaceId,
                date: values.date,
                refundCount: values.refundCount,
                refundAmount: values.refundAmount,
              }),
            )}
          >
            <h2 className="text-lg font-medium">Refunds Upsert</h2>
            <input className="w-full rounded border px-3 py-2" type="date" {...upsertRefundForm.register("date")} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} placeholder="refundCount" {...upsertRefundForm.register("refundCount", { valueAsNumber: true })} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} step="0.01" placeholder="refundAmount" {...upsertRefundForm.register("refundAmount", { valueAsNumber: true })} />
            <button className="rounded border px-3 py-2" disabled={upsertRefundMutation.isPending}>
              Kaydet
            </button>
          </form>

          <form
            className="space-y-2 rounded border p-4"
            onSubmit={addRefundForm.handleSubmit((values) =>
              addRefundMutation.mutate({
                workspaceId: currentWorkspaceId,
                date: values.date,
                addRefundCount: values.addRefundCount,
                addRefundAmount: values.addRefundAmount,
              }),
            )}
          >
            <h2 className="text-lg font-medium">Refunds Add</h2>
            <input className="w-full rounded border px-3 py-2" type="date" {...addRefundForm.register("date")} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} placeholder="addRefundCount" {...addRefundForm.register("addRefundCount", { valueAsNumber: true })} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} step="0.01" placeholder="addRefundAmount" {...addRefundForm.register("addRefundAmount", { valueAsNumber: true })} />
            <button className="rounded border px-3 py-2" disabled={addRefundMutation.isPending}>
              Ekle
            </button>
          </form>
        </section>
      ) : null}

      {token && currentWorkspaceId ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form
            className="space-y-2 rounded border p-4"
            onSubmit={upsertTargetForm.handleSubmit((values) =>
              upsertTargetMutation.mutate({
                workspaceId: currentWorkspaceId,
                weekStartDate: values.weekStartDate,
                targetSalesAmount: values.targetSalesAmount,
                targetSalesCount: values.targetSalesCount,
              }),
            )}
          >
            <h2 className="text-lg font-medium">Target Upsert</h2>
            <input className="w-full rounded border px-3 py-2" type="date" {...upsertTargetForm.register("weekStartDate")} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} step="0.01" placeholder="targetSalesAmount" {...upsertTargetForm.register("targetSalesAmount", { valueAsNumber: true })} />
            <input className="w-full rounded border px-3 py-2" type="number" min={0} placeholder="targetSalesCount" {...upsertTargetForm.register("targetSalesCount", { valueAsNumber: true })} />
            <button className="rounded border px-3 py-2" disabled={upsertTargetMutation.isPending}>
              Kaydet
            </button>
          </form>
        </section>
      ) : null}

      <section>
        <h2 className="text-lg font-medium">Sales List</h2>
        <ul className="list-disc pl-6">
          {sales.map((sale) => (
            <li key={sale.id}>
              {sale.date} | count: {sale.salesCount} | amount: {sale.salesAmount}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium">Refunds List</h2>
        <ul className="list-disc pl-6">
          {refunds.map((refund) => (
            <li key={refund.id}>
              {refund.date} | count: {refund.refundCount} | amount: {refund.refundAmount}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium">Targets List</h2>
        <ul className="list-disc pl-6">
          {targets.map((target) => (
            <li key={target.id}>
              {target.weekStartDate} | count: {target.targetSalesCount} | amount: {target.targetSalesAmount}
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard-panel-soft space-y-2 rounded p-4">
        <h2 className="text-lg font-medium text-[#def5ff]">Analytics Snapshot</h2>
        <p className="text-[#a4bdd1]">Daily Summary (Today): {dailySummaryQuery.data ? JSON.stringify(dailySummaryQuery.data) : "-"}</p>
        <p className="text-[#a4bdd1]">Weekly Summary: {weeklySummaryQuery.data ? JSON.stringify(weeklySummaryQuery.data) : "-"}</p>
      </section>
    </DashboardShell>
  );
}
