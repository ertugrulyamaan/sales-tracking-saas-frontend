"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listTargets, upsertTarget } from "./api";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

const targetKeys = {
  list: (workspaceId: string, fromWeekStart?: string, toWeekStart?: string) =>
    ["targets", workspaceId, fromWeekStart ?? "", toWeekStart ?? ""] as const,
};

export function useTargetsQuery(params: {
  workspaceId?: string | null;
  fromWeekStart?: string;
  toWeekStart?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const { workspaceId, fromWeekStart, toWeekStart } = params;

  return useQuery({
    queryKey: targetKeys.list(workspaceId ?? "", fromWeekStart, toWeekStart),
    queryFn: () =>
      listTargets(token!, { workspaceId: workspaceId!, fromWeekStart, toWeekStart }),
    enabled: Boolean(token && workspaceId),
  });
}

export function useUpsertTargetMutation(current?: {
  workspaceId?: string | null;
  fromWeekStart?: string;
  toWeekStart?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      workspaceId: string;
      weekStartDate: string;
      targetSalesAmount: number;
      targetSalesCount: number;
    }) => upsertTarget(token!, payload),
    onSuccess: () => {
      if (!current?.workspaceId) return;
      queryClient.invalidateQueries({
        queryKey: targetKeys.list(
          current.workspaceId,
          current.fromWeekStart,
          current.toWeekStart,
        ),
      });
      toast.success("Haftalik hedef guncellendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Haftalik hedef guncellenemedi.");
    },
  });
}
