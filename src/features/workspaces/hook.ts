"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkspace,
  listWorkspaces,
  updateWorkspace,
} from "./api";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

const workspaceKeys = {
  all: ["workspaces"] as const,
};

export function useWorkspacesQuery() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: workspaceKeys.all,
    queryFn: () => listWorkspaces(token!),
    enabled: Boolean(token),
  });
}

export function useCreateWorkspaceMutation() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string }) => createWorkspace(token!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
      toast.success("Workspace olusturuldu.");
    },
    onError: (error) => {
      toast.error(error.message || "Workspace olusturulamadi.");
    },
  });
}

export function useUpdateWorkspaceMutation(id: string) {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string }) => updateWorkspace(token!, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
      toast.success("Workspace guncellendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Workspace guncellenemedi.");
    },
  });
}