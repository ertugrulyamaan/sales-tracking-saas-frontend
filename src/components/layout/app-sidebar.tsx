"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

const styles = {
  mobileHeader:
    "fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[#3b4f65]/50 bg-[#070d15]/95 px-4 py-3 backdrop-blur lg:hidden",
  shellDesktop:
    "fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-[#31465e]/45 bg-[#060b12] p-6 lg:flex",
  shellMobile:
    "relative ml-auto flex h-full w-[84vw] max-w-xs flex-col border-l border-[#31465e]/40 bg-[#070d15] p-6",
  brandName:
    "font-headline text-xs font-black uppercase tracking-[0.2em] text-[#00e0ff]",
  panelTitle: "mt-2 text-xl font-black text-[#d7edf8]",
  navContainer: "space-y-2",
  navLinkBase:
    "block rounded-md px-3 py-2 text-sm transition",
  navLinkActive:
    "bg-[#11273c] text-[#00e0ff]",
  navLinkIdle:
    "text-[#9bb0c2] hover:bg-[#101f2f] hover:text-[#00e0ff]",
  accountMail: "text-xs text-[#7e95aa]",
  panelAction:
    "w-full rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SidebarBrandProps = {
  onHomeClick?: () => void;
};

function SidebarBrand({ onHomeClick }: SidebarBrandProps) {
  return (
    <div>
      <Link href="/" onClick={onHomeClick} className={styles.brandName}>
        Sales Pulse
      </Link>
      <h2 className={styles.panelTitle}>Control Panel</h2>
    </div>
  );
}

type SidebarNavProps = {
  pathname: string;
  onNavigate?: () => void;
};

function SidebarNav({ pathname, onNavigate }: SidebarNavProps) {
  return (
    <nav className={styles.navContainer}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cx(
              styles.navLinkBase,
              isActive ? styles.navLinkActive : styles.navLinkIdle,
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

type SidebarAccountActionsProps = {
  userEmail?: string | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
};

function SidebarAccountActions({
  userEmail,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}: SidebarAccountActionsProps) {
  return (
    <div className="mt-auto space-y-3">
      {userEmail ? (
        <>
          <p className={styles.accountMail}>{userEmail}</p>
          <button
            onClick={onLogoutClick}
            className={cx(
              "btn-ghost hover:bg-[#102033]",
              styles.panelAction,
            )}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onLoginClick}
            className={cx("btn-neon", styles.panelAction)}
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            className={cx(
              "btn-ghost hover:bg-[#102033]",
              styles.panelAction,
            )}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
}

export function AppSidebar({
  userEmail,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogoutClick();
    setIsMobileMenuOpen(false);
    router.replace("/");
  };

  return (
    <>
      <header className={styles.mobileHeader}>
        <Link href="/" className={styles.brandName}>
          Sales Pulse
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen(true)}
          className="btn-ghost rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide"
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
          <aside className={styles.shellMobile}>
            <div className="mb-8 flex items-start justify-between">
              <SidebarBrand onHomeClick={() => setIsMobileMenuOpen(false)} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ghost rounded-md px-2 py-1 text-xs"
              >
                X
              </button>
            </div>

            <SidebarNav
              pathname={pathname}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
            <SidebarAccountActions
              userEmail={userEmail}
              onLoginClick={onLoginClick}
              onRegisterClick={onRegisterClick}
              onLogoutClick={handleLogout}
            />
          </aside>
        </div>
      ) : null}

      <aside className={styles.shellDesktop}>
        <div className="mb-8">
          <SidebarBrand />
        </div>
        <SidebarNav pathname={pathname} />
        <SidebarAccountActions
          userEmail={userEmail}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          onLogoutClick={handleLogout}
        />
      </aside>
    </>
  );
}
