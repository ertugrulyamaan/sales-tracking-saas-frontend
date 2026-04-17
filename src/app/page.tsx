"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthModal } from "@/components/auth/auth-modal";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/hook";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/features/auth/schemas";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

const chaosCards = [
  {
    title: "Generic Spreadsheets",
    description:
      "Notes apps and messy sheets blur signal. You lose the modern sales rhythm.",
  },
  {
    title: "Excel Fatigue",
    description:
      "Raw formulas and manual reports waste time and hide momentum changes.",
  },
  {
    title: "The Signal Ledger",
    description:
      "A focused ledger for teams that need clarity without enterprise overhead.",
  },
];

const pillars = [
  {
    title: "The 60-Second Ritual",
    description:
      "Log daily count and amount in one pass. Focus on movement, not tool friction.",
    footer: "input only, rapid feedback",
  },
  {
    title: "Automatic Intelligence",
    description:
      "Your trend windows update instantly so every number has context.",
    footer: "stable baseline, visible delta",
  },
  {
    title: "Trend Precision",
    description:
      "Track direction early and act before weekly reports become stale.",
    footer: "early signal, weekly clarity",
  },
];

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null,
  );

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitLogin = loginForm.handleSubmit(async (values) => {
    await loginMutation.mutateAsync(values);
    loginForm.reset();
    setActiveModal(null);
  });

  const submitRegister = registerForm.handleSubmit(async (values) => {
    await registerMutation.mutateAsync(values);
    registerForm.reset();
    setActiveModal(null);
  });

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] ledger-grid-dark font-body">
      <main className="px-4 py-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="flex items-center justify-between border-b border-[#202020] pb-4">
            <Link href="/" className="font-headline text-sm font-black text-[#44ddc1]">
              Sales Pulse
            </Link>
            <nav className="hidden items-center gap-6 text-xs text-[#8f9d99] md:flex">
              <a href="#product" className="hover:text-[#d7dfdc]">Product</a>
              <a href="#workflow" className="hover:text-[#d7dfdc]">Workflow</a>
              <a href="#pricing" className="hover:text-[#d7dfdc]">Pricing</a>
              <a href="#roadmap" className="hover:text-[#d7dfdc]">Roadmap</a>
            </nav>
            {!user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModal("login")}
                  className="text-xs text-[#d7dfdc] hover:text-[#44ddc1]"
                >
                  Log in
                </button>
                <button
                  onClick={() => setActiveModal("register")}
                  className="rounded bg-[#44ddc1] px-3 py-2 text-xs font-bold text-[#00382f]"
                >
                  Start Tracking
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8f9d99]">{user.email}</span>
                <button
                  onClick={() => clearSession()}
                  className="rounded border border-[#3c4a46] px-3 py-2 text-xs"
                >
                  Logout
                </button>
              </div>
            )}
          </header>

          <section
            id="product"
            className="mt-10 grid items-center gap-8 border-b border-[#202020] pb-12 md:grid-cols-2"
          >
            <div>
              <p className="inline-flex rounded-full border border-[#21443f] bg-[#102421] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#7fe7d2]">
                7.5 min setup
              </p>
              <h1 className="mt-5 font-headline text-4xl font-black leading-tight md:text-6xl">
                Manual input,
                <br />
                <span className="text-[#44ddc1]">automatic insight.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#a3b1ad]">
                Bring daily totals into one dark command center. Get trend context,
                signal movement and clear decisions in seconds.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {!user ? (
                  <>
                    <button
                      onClick={() => setActiveModal("register")}
                      className="signal-cut-sm bg-[#44ddc1] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00382f]"
                    >
                      Start Mission
                    </button>
                    <button
                      onClick={() => setActiveModal("login")}
                      className="signal-cut-sm border border-[#3c4a46] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#e5e2e1] hover:bg-[#1e1e1e]"
                    >
                      Watch Walkthrough
                    </button>
                  </>
                ) : (
                  <Link
                    href="/dashboard-mission-control"
                    className="signal-cut-sm bg-[#44ddc1] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00382f]"
                  >
                    Open Mission Control
                  </Link>
                )}
              </div>
            </div>

            <div className="signal-cut border border-[#2a2a2a] bg-[#171717] p-4 md:p-6">
              <div className="rounded border border-[#242424] bg-[#111111] p-4">
                <div className="grid gap-3 text-xs text-[#7d8a87]">
                  <div className="h-2 w-24 rounded bg-[#2a2a2a]" />
                  <div className="h-2 w-40 rounded bg-[#2a2a2a]" />
                  <div className="h-2 w-32 rounded bg-[#2a2a2a]" />
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  <article className="rounded border border-[#21443f] bg-[#101c1a] p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#7fe7d2]">
                      Signal Lift
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#e8fff9]">+12.4%</p>
                  </article>
                  <article className="rounded border border-[#21443f] bg-[#101c1a] p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#7fe7d2]">
                      Net Flow
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#e8fff9]">$42.1k</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section
            id="workflow"
            className="mt-12 border-b border-[#202020] pb-12"
          >
            <h2 className="font-headline text-3xl font-black">Escape the chaos.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {chaosCards.map((item) => (
                <article key={item.title} className="signal-cut border border-[#232323] bg-[#171717] p-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#a3b1ad]">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="pricing" className="mt-12 border-b border-[#202020] pb-12">
            <h2 className="font-headline text-3xl font-black">Precision Engineering.</h2>
            <p className="mt-2 text-sm text-[#a3b1ad]">
              Three pillars built for high-stakes weekly decisions.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pillars.map((item) => (
                <article key={item.title} className="signal-cut border border-[#232323] bg-[#1a1a1a] p-5">
                  <div className="mb-3 inline-flex rounded bg-[#44ddc1] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00382f]">
                    core
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#a3b1ad]">{item.description}</p>
                  <p className="mono-metrics mt-4 text-[10px] uppercase tracking-[0.16em] text-[#69d9c2]">
                    {item.footer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="roadmap" className="py-14">
            <article className="signal-cut border border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a] to-[#111111] p-10 text-center">
              <h2 className="font-headline text-4xl font-black">
                Ready for mission control?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#a3b1ad]">
                Join focused teams already tracking daily totals with signal-first
                clarity.
              </p>
              <div className="mt-6">
                {!user ? (
                  <button
                    onClick={() => setActiveModal("register")}
                    className="signal-cut-sm bg-[#44ddc1] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00382f]"
                  >
                    Initialize Your Ledger
                  </button>
                ) : (
                  <Link
                    href="/mission-control"
                    className="signal-cut-sm bg-[#44ddc1] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00382f]"
                  >
                    Continue to Dashboard
                  </Link>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>

      {activeModal === "login" ? (
        <AuthModal
          title="Login"
          description="Hesabina giris yaparak workspace verilerine eris."
          onClose={() => setActiveModal(null)}
        >
          <form className="space-y-3" onSubmit={submitLogin}>
            <input
              className="w-full rounded border border-[#3c4a46] bg-[#101010] px-3 py-2 text-sm"
              placeholder="Email"
              {...loginForm.register("email")}
            />
            {loginForm.formState.errors.email?.message ? (
              <p className="text-xs text-[#ffb4ac]">
                {loginForm.formState.errors.email.message}
              </p>
            ) : null}
            <input
              type="password"
              className="w-full rounded border border-[#3c4a46] bg-[#101010] px-3 py-2 text-sm"
              placeholder="Password"
              {...loginForm.register("password")}
            />
            {loginForm.formState.errors.password?.message ? (
              <p className="text-xs text-[#ffb4ac]">
                {loginForm.formState.errors.password.message}
              </p>
            ) : null}
            {loginMutation.error ? (
              <p className="text-xs text-[#ffb4ac]">{loginMutation.error.message}</p>
            ) : null}
            <button
              disabled={loginMutation.isPending}
              className="w-full rounded bg-[#44ddc1] px-3 py-2 text-sm font-semibold text-[#00382f]"
            >
              {loginMutation.isPending ? "Giris yapiliyor..." : "Giris yap"}
            </button>
          </form>
        </AuthModal>
      ) : null}

      {activeModal === "register" ? (
        <AuthModal
          title="Register"
          description="Yeni hesap olustur ve tracking akisini baslat."
          onClose={() => setActiveModal(null)}
        >
          <form className="space-y-3" onSubmit={submitRegister}>
            <input
              className="w-full rounded border border-[#3c4a46] bg-[#101010] px-3 py-2 text-sm"
              placeholder="Email"
              {...registerForm.register("email")}
            />
            {registerForm.formState.errors.email?.message ? (
              <p className="text-xs text-[#ffb4ac]">
                {registerForm.formState.errors.email.message}
              </p>
            ) : null}
            <input
              type="password"
              className="w-full rounded border border-[#3c4a46] bg-[#101010] px-3 py-2 text-sm"
              placeholder="Password"
              {...registerForm.register("password")}
            />
            {registerForm.formState.errors.password?.message ? (
              <p className="text-xs text-[#ffb4ac]">
                {registerForm.formState.errors.password.message}
              </p>
            ) : null}
            {registerMutation.error ? (
              <p className="text-xs text-[#ffb4ac]">
                {registerMutation.error.message}
              </p>
            ) : null}
            <button
              disabled={registerMutation.isPending}
              className="w-full rounded bg-[#44ddc1] px-3 py-2 text-sm font-semibold text-[#00382f]"
            >
              {registerMutation.isPending ? "Kayit yapiliyor..." : "Kayit ol"}
            </button>
          </form>
        </AuthModal>
      ) : null}
    </div>
  );
}