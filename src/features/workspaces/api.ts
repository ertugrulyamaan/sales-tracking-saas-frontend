import { http } from "@/libs/http";
import type { Workspace } from "@/types/api";

export function createWorkspace(
  token: string,
  payload: { name: string },
): Promise<Workspace> {
  return http<Workspace>("/workspaces", {
    method: "POST",
    token,
    body: payload,
  });
}

export function listWorkspaces(token: string): Promise<Workspace[]> {
  return http<Workspace[]>("/workspaces", {
    method: "GET",
    token,
  });
}

export function getWorkspace(token: string, id: string): Promise<Workspace> {
  return http<Workspace>(`/workspaces/${id}`, {
    method: "GET",
    token,
  });
}

export function updateWorkspace(
  token: string,
  id: string,
  payload: { name: string },
): Promise<Workspace> {
  return http<Workspace>(`/workspaces/${id}`, {
    method: "PATCH",
    token,
    body: payload,
  });
}