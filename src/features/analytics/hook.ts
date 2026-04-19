"use client";

import { useQuery } from "@tanstack/react-query";
import { getDailySummary, getWeeklySummary } from "./api";
import { useAuthStore } from "@/stores/auth-store";

const analyticsKeys = {
  dailySummary: (workspaceId: string, date: string) =>
    ["analytics", "daily-summary", workspaceId, date] as const,
  weeklySummary: (workspaceId: string, weekStartDate: string) =>
    ["analytics", "weekly-summary", workspaceId, weekStartDate] as const,
};

export function useDailySummaryQuery(params: {
  workspaceId?: string | null;
  date?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const { workspaceId, date } = params;

  return useQuery({
    queryKey: analyticsKeys.dailySummary(workspaceId ?? "", date ?? ""),
    queryFn: () =>
      getDailySummary(token!, {
        workspaceId: workspaceId!,
        date: date!,
      }),
    enabled: Boolean(token && workspaceId && date),
  });
}

export function useWeeklySummaryQuery(params: {
  workspaceId?: string | null;
  weekStartDate?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const { workspaceId, weekStartDate } = params;

  return useQuery({
    queryKey: analyticsKeys.weeklySummary(workspaceId ?? "", weekStartDate ?? ""),
    queryFn: () =>
      getWeeklySummary(token!, {
        workspaceId: workspaceId!,
        weekStartDate: weekStartDate!,
      }),
    enabled: Boolean(token && workspaceId && weekStartDate),
  });
}
