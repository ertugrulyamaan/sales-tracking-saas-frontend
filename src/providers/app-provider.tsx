"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { createQueryClient } from "@/libs/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { RouteGuard } from "@/components/auth/route-guard";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  const [queryClient] = useState(() => createQueryClient());
  const clearSession = useAuthStore((s) => s.clearSession);
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
      router.replace("/");
    };

    window.addEventListener("app:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("app:unauthorized", handleUnauthorized);
  }, [clearSession, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard>{children}</RouteGuard>
      <Toaster position="top-right" richColors closeButton />
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
}