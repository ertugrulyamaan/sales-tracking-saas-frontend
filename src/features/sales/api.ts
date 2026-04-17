import { http } from "@/libs/http";
import type { SaleRecord } from "@/types/api";

export type ListSalesParams = {
  workspaceId: string;
  from?: string;
  to?: string;
};

function toQuery(params: ListSalesParams): string {
  const query = new URLSearchParams();
  query.set("workspaceId", params.workspaceId);
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);
  return query.toString();
}

export function upsertSale(
  token: string,
  payload: {
    workspaceId: string;
    date: string;
    salesCount: number;
    salesAmount: number;
  },
) {
  return http<SaleRecord>("/sales", {
    method: "POST",
    token,
    body: payload,
  });
}

export function addSale(
  token: string,
  payload: {
    workspaceId: string;
    date: string;
    addSalesCount: number;
    addSalesAmount: number;
  },
) {
  return http<SaleRecord>("/sales/add", {
    method: "PATCH",
    token,
    body: payload,
  });
}

export function listSales(token: string, params: ListSalesParams) {
  return http<SaleRecord[]>(`/sales?${toQuery(params)}`, {
    method: "GET",
    token,
  });
}

export function getSaleById(token: string, id: string) {
  return http<SaleRecord>(`/sales/${id}`, {
    method: "GET",
    token,
  });
}