import { http } from "@/libs/http";
import type { TargetRecord } from "@/types/api";

export type ListTargetsParams = {
  workspaceId: string;
  fromWeekStart?: string;
  toWeekStart?: string;
};

function toQuery(params: ListTargetsParams): string {
  const query = new URLSearchParams();
  query.set("workspaceId", params.workspaceId);
  if (params.fromWeekStart) query.set("fromWeekStart", params.fromWeekStart);
  if (params.toWeekStart) query.set("toWeekStart", params.toWeekStart);
  return query.toString();
}

export function upsertTarget(
  token: string,
  payload: {
    workspaceId: string;
    weekStartDate: string;
    targetSalesAmount: number;
    targetSalesCount: number;
  },
) {
  return http<TargetRecord>("/targets", {
    method: "POST",
    token,
    body: payload,
  });
}

export function listTargets(token: string, params: ListTargetsParams) {
  return http<TargetRecord[]>(`/targets?${toQuery(params)}`, {
    method: "GET",
    token,
  });
}

export function getTargetById(token: string, id: string) {
  return http<TargetRecord>(`/targets/${id}`, {
    method: "GET",
    token,
  });
}
