import type { UseFormReturn } from "react-hook-form";
import type { UpsertSaleInput } from "@/features/sales/schema";
import { formatMoney, type SalesSummary } from "@/features/sales/metrics";

type DailyEntryFieldsProps = {
  form: UseFormReturn<UpsertSaleInput>;
  summary: SalesSummary;
};

export function DailyEntryFields({ form, summary }: DailyEntryFieldsProps) {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#22efc8]">Revenue Streams</h2>
          <label className="block text-xs text-[#9db3c7]">
            Sales Count
            <input
              type="number"
              min={0}
              className="dashboard-input mt-2 w-full px-0 py-2 text-xl mono-metrics"
              {...form.register("salesCount", { valueAsNumber: true })}
            />
          </label>
          <label className="block text-xs text-[#9db3c7]">
            Sales Amount ($)
            <input
              type="number"
              min={0}
              step="0.01"
              className="dashboard-input mt-2 w-full px-0 py-2 text-xl mono-metrics"
              {...form.register("salesAmount", { valueAsNumber: true })}
            />
          </label>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff98a3]">Session Details</h2>
          <label className="block text-xs text-[#9db3c7]">
            Entry Date
            <input
              type="date"
              className="dashboard-input mt-2 w-full px-0 py-2 text-xl mono-metrics focus:border-[#ff98a3]"
              {...form.register("date")}
            />
          </label>
          <p className="rounded border border-[#2a3f53]/40 bg-[#0a1624]/70 p-3 text-xs text-[#9db3c7]">
            Son kayıt: {formatMoney(summary.lastAmount)} | Önceki: {formatMoney(summary.previousAmount)}
          </p>
        </section>
      </div>

      <section className="dashboard-panel-soft mt-8 rounded-lg p-5">
        <p className="text-[10px] uppercase tracking-widest text-[#9db3c7]">Real-time Net Impact</p>
        <p className="mono-metrics mt-2 text-3xl font-bold text-[#00e0ff]">{formatMoney(summary.totalAmount)}</p>
      </section>
    </>
  );
}

type DailyEntryActionsProps = {
  disabled: boolean;
  onClear: () => void;
};

export function DailyEntryActions({ disabled, onClear }: DailyEntryActionsProps) {
  return (
    <div className="mt-8 flex justify-end gap-3">
      <button type="button" onClick={onClear} className="btn-ghost rounded-lg px-4 py-2 text-xs uppercase tracking-widest">
        Temizle
      </button>
      <button disabled={disabled} className="btn-neon signal-cut-sm px-6 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50">
        Log Today Numbers
      </button>
    </div>
  );
}
