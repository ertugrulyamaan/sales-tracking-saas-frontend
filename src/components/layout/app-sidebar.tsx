"use client";

import Link from "next/link";

type AppSidebarProps = {
  userEmail?: string | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
};

const navItems = [
  { href: "/mission-control", label: "Mission Control" },
  { href: "/entry", label: "Daily Entry" },
  { href: "/summary", label: "Weekly Summary" },
  { href: "/workbench", label: "Workbench" },
];

export function AppSidebar({
  userEmail,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}: AppSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-[#3c4a46]/30 bg-[#101010] p-6 lg:flex">
      <div className="mb-8">
        <Link href="/" className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#44ddc1]">
          Sales Pulse
        </Link>
        <h2 className="mt-2 text-xl font-black text-[#e5e2e1]">Control Panel</h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm text-[#bbcac4] transition hover:bg-[#1d1d1d] hover:text-[#44ddc1]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        {userEmail ? (
          <>
            <p className="text-xs text-[#85948f]">{userEmail}</p>
            <button
              onClick={onLogoutClick}
              className="w-full rounded-md border border-[#3c4a46] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#e5e2e1] hover:bg-[#1d1d1d]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLoginClick}
              className="w-full rounded-md bg-[#44ddc1] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#00382f]"
            >
              Login
            </button>
            <button
              onClick={onRegisterClick}
              className="w-full rounded-md border border-[#3c4a46] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#e5e2e1] hover:bg-[#1d1d1d]"
            >
              Register
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
