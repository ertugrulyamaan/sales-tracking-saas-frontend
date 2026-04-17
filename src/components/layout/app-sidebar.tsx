"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogoutClick();
    setIsMobileMenuOpen(false);
    router.replace("/");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[#3c4a46]/40 bg-[#101010]/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#44ddc1]">
          Sales Pulse
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-md border border-[#3c4a46] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#e5e2e1]"
        >
          Menu
        </button>
      </header>
      <div className="h-[61px] lg:hidden" aria-hidden />

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative ml-auto flex h-full w-[84vw] max-w-xs flex-col border-l border-[#3c4a46]/30 bg-[#101010] p-6">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#44ddc1]"
                >
                  Sales Pulse
                </Link>
                <h2 className="mt-2 text-xl font-black text-[#e5e2e1]">Control Panel</h2>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md border border-[#3c4a46] px-2 py-1 text-xs text-[#e5e2e1]"
              >
                X
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={handleLogout}
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
        </div>
      ) : null}

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
                onClick={handleLogout}
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
    </>
  );
}
