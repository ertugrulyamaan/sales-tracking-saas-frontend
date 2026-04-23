"use client";

import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";

type DashboardShellProps = {
  userEmail?: string | null;
  onLogout: () => void;
  children: ReactNode;
  contentClassName?: string;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const defaultContentClassName = "mx-auto w-full max-w-6xl space-y-6 px-6 py-8";

export function DashboardShell({
  userEmail,
  onLogout,
  children,
  contentClassName,
}: DashboardShellProps) {
  return (
    <div className="dashboard-shell neo-grid min-h-screen font-body">
      <AppSidebar
        userEmail={userEmail}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogoutClick={onLogout}
      />
      <main className={cx("lg:ml-64", contentClassName ?? defaultContentClassName)}>
        {children}
      </main>
    </div>
  );
}
