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
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#66dd8b]">Revenue Streams</h2>
          <label className="block text-xs text-[#bbcac4]">
            Sales Count
            <input
              type="number"
              min={0}
              className="mt-2 w-full border-b-2 border-[#3c4a46] bg-[#0e0e0e] px-0 py-2 text-xl mono-metrics focus:border-[#44ddc1] focus:outline-none"
              {...form.register("salesCount", { valueAsNumber: true })}
            />
          </label>
          <label className="block text-xs text-[#bbcac4]">
            Sales Amount ($)
            <input
              type="number"
              min={0}
              step="0.01"
              className="mt-2 w-full border-b-2 border-[#3c4a46] bg-[#0e0e0e] px-0 py-2 text-xl mono-metrics focus:border-[#44ddc1] focus:outline-none"
              {...form.register("salesAmount", { valueAsNumber: true })}
            />
          </label>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#ffb4ac]">Session Details</h2>
          <label className="block text-xs text-[#bbcac4]">
            Entry Date
            <input
              type="date"
              className="mt-2 w-full border-b-2 border-[#3c4a46] bg-[#0e0e0e] px-0 py-2 text-xl mono-metrics focus:border-[#ffb4ac] focus:outline-none"
              {...form.register("date")}
            />
          </label>
          <p className="rounded bg-[#0e0e0e] p-3 text-xs text-[#bbcac4]">
            Son kayıt: {formatMoney(summary.lastAmount)} | Önceki: {formatMoney(summary.previousAmount)}
          </p>
        </section>
      </div>

      <section className="mt-8 rounded-lg bg-[#353534] p-5">
        <p className="text-[10px] uppercase tracking-widest text-[#bbcac4]">Real-time Net Impact</p>
        <p className="mono-metrics mt-2 text-3xl font-bold text-[#44ddc1]">{formatMoney(summary.totalAmount)}</p>
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
      <button type="button" onClick={onClear} className="rounded-lg border border-[#3c4a46] px-4 py-2 text-xs uppercase tracking-widest text-[#bbcac4]">
        Temizle
      </button>
      <button disabled={disabled} className="signal-cut-sm bg-linear-to-br from-[#44ddc1] to-[#00bfa5] px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#00382f] disabled:opacity-50">
        Log Today Numbers
      </button>
    </div>
  );
}
