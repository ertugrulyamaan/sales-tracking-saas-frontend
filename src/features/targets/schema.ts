import { z } from "zod";

const ymdDate = z.iso.date("Tarih YYYY-MM-DD formatinda olmali");

export const upsertTargetSchema = z.object({
  weekStartDate: ymdDate,
  targetSalesAmount: z.number().min(0),
  targetSalesCount: z.number().int().min(0),
});

export type UpsertTargetInput = z.infer<typeof upsertTargetSchema>;
