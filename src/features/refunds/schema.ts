import { z } from "zod";

const ymdDate = z.iso.date("Tarih YYYY-MM-DD formatinda olmali");

export const upsertRefundSchema = z.object({
  date: ymdDate,
  refundCount: z.number().int().min(0),
  refundAmount: z.number().min(0),
});

export const addRefundSchema = z.object({
  date: ymdDate,
  addRefundCount: z.number().int().min(0),
  addRefundAmount: z.number().min(0),
});

export type UpsertRefundInput = z.infer<typeof upsertRefundSchema>;
export type AddRefundInput = z.infer<typeof addRefundSchema>;
