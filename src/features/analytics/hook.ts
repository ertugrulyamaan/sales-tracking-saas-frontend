"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeklySummary } from "./api";
import { useAuthStore } from "@/stores/auth-store";

const analyticsKeys = {
  weeklySummary: (workspaceId: string, weekStartDate: string) =>
    ["analytics", "weekly-summary", workspaceId, weekStartDate] as const,
};

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
