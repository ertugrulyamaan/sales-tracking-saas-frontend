"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/hook";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/features/auth/schemas";
import { useAddSaleMutation, useSalesQuery, useUpsertSaleMutation } from "@/features/sales/hook";
import { addSaleSchema, upsertSaleSchema, type AddSaleInput, type UpsertSaleInput } from "@/features/sales/schema";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspacesQuery } from "@/features/workspaces/hook";
import { useWorkspaceStore } from "@/stores/workspace-store";

export default function WorkbenchPage() {
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const currentWorkspaceId = useWorkspaceStore((s) => s.currentWorkspaceId);
  const setCurrentWorkspaceId = useWorkspaceStore((s) => s.setCurrentWorkspaceId);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const workspacesQuery = useWorkspacesQuery();
  const salesQuery = useSalesQuery({ workspaceId: currentWorkspaceId });
  const upsertSaleMutation = useUpsertSaleMutation({ workspaceId: currentWorkspaceId });
  const addSaleMutation = useAddSaleMutation({ workspaceId: currentWorkspaceId });

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

  const workspaces = workspacesQuery.data ?? [];
  const sales = salesQuery.data ?? [];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] ledger-grid-dark font-body">
      <AppSidebar
        userEmail={user?.email}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogoutClick={() => clearSession()}
      />
      <main className="mx-auto max-w-4xl space-y-6 p-6 lg:ml-64">
      <h1 className="text-2xl font-semibold">Sales Tracking Workbench</h1>
      <p>Auth: {token ? "Giriş yapıldı" : "Giriş yok"}</p>
      <p>Kullanıcı: {user?.email ?? "-"}</p>

      {!token ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form className="space-y-2 rounded border p-4" onSubmit={loginForm.handleSubmit((values) => loginMutation.mutate(values))}>
            <h2 className="text-lg font-medium">Login</h2>
            <input className="w-full rounded border px-3 py-2" placeholder="email" {...loginForm.register("email")} />
            <input type="password" className="w-full rounded border px-3 py-2" placeholder="password" {...loginForm.register("password")} />
            <button className="rounded border px-3 py-2" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Giris yapiliyor..." : "Giris yap"}
            </button>
          </form>

          <form className="space-y-2 rounded border p-4" onSubmit={registerForm.handleSubmit((values) => registerMutation.mutate(values))}>
            <h2 className="text-lg font-medium">Register</h2>
            <input className="w-full rounded border px-3 py-2" placeholder="email" {...registerForm.register("email")} />
            <input type="password" className="w-full rounded border px-3 py-2" placeholder="password" {...registerForm.register("password")} />
            <button className="rounded border px-3 py-2" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Kayit yapiliyor..." : "Kayit ol"}
            </button>
          </form>
        </section>
      ) : (
        <button className="rounded border px-3 py-2" onClick={() => clearSession()}>
          Cikis yap
        </button>
      )}

      <section>
        <h2 className="text-lg font-medium">Workspaces</h2>
        <select className="mb-3 rounded border px-3 py-2" value={currentWorkspaceId ?? ""} onChange={(e) => setCurrentWorkspaceId(e.target.value || null)}>
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
    </main>
    </div>
  );
}
