import { http } from "@/libs/http";
import type { WeeklySummaryResponse } from "@/types/api";

export type WeeklySummaryParams = {
  workspaceId: string;
  weekStartDate: string;
};

export function getWeeklySummary(token: string, params: WeeklySummaryParams) {
  const query = new URLSearchParams({
    workspaceId: params.workspaceId,
    weekStartDate: params.weekStartDate,
  });

  return http<WeeklySummaryResponse>(`/analytics/weekly-summary?${query.toString()}`, {
    method: "GET",
    token,
  });
}
