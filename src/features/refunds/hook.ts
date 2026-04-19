"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRefund, listRefunds, upsertRefund } from "./api";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

const refundKeys = {
  list: (workspaceId: string, from?: string, to?: string) =>
    ["refunds", workspaceId, from ?? "", to ?? ""] as const,
};

export function useRefundsQuery(params: {
  workspaceId?: string | null;
  from?: string;
  to?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const { workspaceId, from, to } = params;

  return useQuery({
    queryKey: refundKeys.list(workspaceId ?? "", from, to),
    queryFn: () => listRefunds(token!, { workspaceId: workspaceId!, from, to }),
    enabled: Boolean(token && workspaceId),
  });
}

export function useUpsertRefundMutation(current?: {
  workspaceId?: string | null;
  from?: string;
  to?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      workspaceId: string;
      date: string;
      refundCount: number;
      refundAmount: number;
    }) => upsertRefund(token!, payload),
    onSuccess: () => {
      if (!current?.workspaceId) return;
      queryClient.invalidateQueries({
        queryKey: refundKeys.list(current.workspaceId, current.from, current.to),
      });
      toast.success("Iade kaydi guncellendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Iade kaydi guncellenemedi.");
    },
  });
}

export function useAddRefundMutation(current?: {
  workspaceId?: string | null;
  from?: string;
  to?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      workspaceId: string;
      date: string;
      addRefundCount: number;
      addRefundAmount: number;
    }) => addRefund(token!, payload),
    onSuccess: () => {
      if (!current?.workspaceId) return;
      queryClient.invalidateQueries({
        queryKey: refundKeys.list(current.workspaceId, current.from, current.to),
      });
      toast.success("Iade verisi eklendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Iade verisi eklenemedi.");
    },
  });
}
