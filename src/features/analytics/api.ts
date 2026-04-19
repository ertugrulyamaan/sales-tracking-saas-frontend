import { http } from "@/libs/http";
import type { DailySummaryResponse, WeeklySummaryResponse } from "@/types/api";

export type WeeklySummaryParams = {
  workspaceId: string;
  weekStartDate: string;
};

export type DailySummaryParams = {
  workspaceId: string;
  date: string;
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

export function getDailySummary(token: string, params: DailySummaryParams) {
  const query = new URLSearchParams({
    workspaceId: params.workspaceId,
    date: params.date,
  });

  return http<DailySummaryResponse>(`/analytics/daily-summary?${query.toString()}`, {
    method: "GET",
    token,
  });
}
