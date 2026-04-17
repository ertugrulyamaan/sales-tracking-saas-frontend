import { http } from "@/libs/http";
import type { AuthResponse, MeResponse } from "@/types/api";

type Credentials = {
  email: string;
  password: string;
};

export function login(payload: Credentials) {
  return http<AuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function register(payload: Credentials) {
  return http<AuthResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function me(token: string) {
  return http<MeResponse>("/auth/me", {
    method: "GET",
    token,
  });
}
