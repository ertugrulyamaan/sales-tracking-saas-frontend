import { z } from "zod";

const ymdDate = z.iso.date("Tarih YYYY-MM-DD formatinda olmali");

export const upsertSaleSchema = z.object({
  date: ymdDate,
  salesCount: z.number().int().min(0),
  salesAmount: z.number().min(0),
});

export const addSaleSchema = z.object({
  date: ymdDate,
  addSalesCount: z.number().int().min(0),
  addSalesAmount: z.number().min(0),
});

export type UpsertSaleInput = z.infer<typeof upsertSaleSchema>;
export type AddSaleInput = z.infer<typeof addSaleSchema>;
