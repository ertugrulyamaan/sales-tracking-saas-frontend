import Link from "next/link";
import type { Workspace } from "@/types/api";

type HeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  homeButtonClassName: string;
};

export function DashboardHeader({ eyebrow, title, subtitle, homeButtonClassName }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em]">{eyebrow}</p>
        <h1 className="font-headline text-4xl font-black">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm">{subtitle}</p> : null}
      </div>
      <Link href="/" className={homeButtonClassName}>
        Ana Sayfa
      </Link>
    </header>
  );
}

type WorkspaceSelectProps = {
  value: string;
  onChange: (value: string) => void;
  workspaces: Workspace[];
  className: string;
};

export function WorkspaceSelect({ value, onChange, workspaces, className }: WorkspaceSelectProps) {
  return (
    <select className={className} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Workspace seç</option>
      {workspaces.map((workspace) => (
        <option key={workspace.id} value={workspace.id}>
          {workspace.name}
        </option>
      ))}
    </select>
  );
}
