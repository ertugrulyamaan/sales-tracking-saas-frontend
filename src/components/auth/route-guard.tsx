"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

type RouteGuardProps = {
  children: ReactNode;
};

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.accessToken);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const isPublicRoute = pathname === "/";
  const requiresAuth = !isPublicRoute;

  useEffect(() => {
    if (!isReady) return;
    if (!requiresAuth) return;
    if (token) return;
    router.replace("/");
  }, [isReady, requiresAuth, token, router]);

  if (!isReady) return null;
  if (requiresAuth && !token) return null;

  return <>{children}</>;
}
