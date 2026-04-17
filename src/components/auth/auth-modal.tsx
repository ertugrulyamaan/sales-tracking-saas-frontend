"use client";

import type { ReactNode } from "react";

type AuthModalProps = {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

export function AuthModal({
  title,
  description,
  onClose,
  children,
}: AuthModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="signal-cut w-full max-w-md border border-[#3c4a46] bg-[#181818] p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-headline text-2xl font-black text-[#e5e2e1]">
              {title}
            </h2>
            <p className="mt-1 text-sm text-[#bbcac4]">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded border border-[#3c4a46] px-2 py-1 text-xs text-[#bbcac4] hover:bg-[#232323]"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
