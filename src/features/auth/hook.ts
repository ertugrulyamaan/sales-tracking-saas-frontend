"use client";

import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLoginMutation() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession({ accessToken: data.accessToken, user: data.user });
      toast.success("Giris basarili.");
      router.push("/mission-control");
    },
    onError: (error) => {
      toast.error(error.message || "Giris sirasinda bir hata olustu.");
    },
  });
}

export function useRegisterMutation() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setSession({ accessToken: data.accessToken, user: data.user });
      toast.success("Kayit basarili, hos geldin.");
      router.push("/mission-control");
    },
    onError: (error) => {
      toast.error(error.message || "Kayit sirasinda bir hata olustu.");
    },
  });
}
