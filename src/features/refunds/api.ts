import { http } from "@/libs/http";
import type { RefundRecord } from "@/types/api";

export type ListRefundsParams = {
  workspaceId: string;
  from?: string;
  to?: string;
};

function toQuery(params: ListRefundsParams): string {
  const query = new URLSearchParams();
  query.set("workspaceId", params.workspaceId);
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);
  return query.toString();
}

export function upsertRefund(
  token: string,
  payload: {
    workspaceId: string;
    date: string;
    refundCount: number;
    refundAmount: number;
  },
) {
  return http<RefundRecord>("/refunds", {
    method: "POST",
    token,
    body: payload,
  });
}

export function addRefund(
  token: string,
  payload: {
    workspaceId: string;
    date: string;
    addRefundCount: number;
    addRefundAmount: number;
  },
) {
  return http<RefundRecord>("/refunds/add", {
    method: "PATCH",
    token,
    body: payload,
  });
}

export function listRefunds(token: string, params: ListRefundsParams) {
  return http<RefundRecord[]>(`/refunds?${toQuery(params)}`, {
    method: "GET",
    token,
  });
}

export function getRefundById(token: string, id: string) {
  return http<RefundRecord>(`/refunds/${id}`, {
    method: "GET",
    token,
  });
}
