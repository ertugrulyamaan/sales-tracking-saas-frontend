"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSale, listSales, upsertSale } from "./api";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

const salesKeys = {
  list: (workspaceId: string, from?: string, to?: string) =>
    ["sales", workspaceId, from ?? "", to ?? ""] as const,
};

export function useSalesQuery(params: {
  workspaceId?: string | null;
  from?: string;
  to?: string;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const { workspaceId, from, to } = params;

  return useQuery({
    queryKey: salesKeys.list(workspaceId ?? "", from, to),
    queryFn: () => listSales(token!, { workspaceId: workspaceId!, from, to }),
    enabled: Boolean(token && workspaceId),
  });
}

export function useUpsertSaleMutation(current?: {
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
      salesCount: number;
      salesAmount: number;
    }) => upsertSale(token!, payload),
    onSuccess: () => {
      if (!current?.workspaceId) return;
      queryClient.invalidateQueries({
        queryKey: salesKeys.list(current.workspaceId, current.from, current.to),
      });
      toast.success("Satis kaydi guncellendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Satis kaydi guncellenemedi.");
    },
  });
}

export function useAddSaleMutation(current?: {
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
      addSalesCount: number;
      addSalesAmount: number;
    }) => addSale(token!, payload),
    onSuccess: () => {
      if (!current?.workspaceId) return;
      queryClient.invalidateQueries({
        queryKey: salesKeys.list(current.workspaceId, current.from, current.to),
      });
      toast.success("Satis verisi eklendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Satis verisi eklenemedi.");
    },
  });
}