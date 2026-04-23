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
    title: "Scattered Data Records",
    description:
      "When sales records are kept in different tools, teams struggle to build a shared and reliable view.",
  },
  {
    title: "Delayed Performance Visibility",
    description:
      "When weekly reports are prepared manually, momentum shifts are discovered too late.",
  },
  {
    title: "Single Source of Truth",
    description:
      "Collect sales, refunds, and target data in a single workspace-focused panel to speed up decisions.",
  },
];

const pillars = [
  {
    title: "Workspace-Oriented Structure",
    description:
      "Each team manages its own isolated data, so metrics stay meaningful within workspace boundaries.",
    footer: "multi-tenant model, clear boundaries",
  },
  {
    title: "Daily and Weekly Summaries",
    description:
      "As entries are created, totals, trend windows, and progress-to-target insights update in one place.",
    footer: "real-time visibility, faster action",
  },
  {
    title: "Scalable API Alignment",
    description:
      "UI flows are aligned with modular NestJS backend endpoints to keep development maintainable.",
    footer: "modular architecture, sustainable growth",
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
    <div className="dashboard-shell neo-grid min-h-screen font-body">
      <main className="px-4 py-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="flex items-center justify-between border-b border-[#24384b] pb-4">
            <Link href="/" className="font-headline text-sm font-black text-[#00e0ff]">
              Sales Pulse
            </Link>
            <nav className="hidden items-center gap-6 text-xs text-[#7f98ae] md:flex">
              <a href="#product" className="hover:text-[#dbf4ff]">Problem</a>
              <a href="#workflow" className="hover:text-[#dbf4ff]">Solution</a>
              <a href="#pricing" className="hover:text-[#dbf4ff]">Architecture</a>
              <a href="#roadmap" className="hover:text-[#dbf4ff]">Next Step</a>
            </nav>
            {!user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModal("login")}
                  className="text-xs text-[#d1e7f5] hover:text-[#00e0ff]"
                >
                  Log in
                </button>
                <button
                  onClick={() => setActiveModal("register")}
                  className="btn-neon rounded px-3 py-2 text-xs font-bold"
                >
                  Start Tracking
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#7f98ae]">{user.email}</span>
                <button
                  onClick={() => clearSession()}
                  className="btn-ghost rounded px-3 py-2 text-xs"
                >
                  Logout
                </button>
              </div>
            )}
          </header>

          <section
            id="product"
            className="mt-10 grid items-center gap-8 border-b border-[#24384b] pb-12 md:grid-cols-2"
          >
            <div>
              <p className="inline-flex rounded-full border border-[#2d536e] bg-[#0c1f2f] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#7ceeff]">
                workspace-based sales tracking
              </p>
              <h1 className="mt-5 font-headline text-4xl font-black leading-tight md:text-6xl">
                Turn scattered sales data
                <br />
                <span className="text-[#00e0ff]">into clear decisions.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#9db3c7]">
                This UI helps teams manage sales, refunds, and weekly targets in a
                single workflow. The goal is not only data entry, but making daily
                and weekly performance visible enough for fast action.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {!user ? (
                  <>
                    <button
                      onClick={() => setActiveModal("register")}
                      className="btn-neon signal-cut-sm px-5 py-3 text-xs font-bold uppercase tracking-[0.18em]"
                    >
                      Start Tracking
                    </button>
                    <button
                      onClick={() => setActiveModal("login")}
                      className="btn-ghost signal-cut-sm px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#122338]"
                    >
                      Log In
                    </button>
                  </>
                ) : (
                  <Link
                    href="/mission-control"
                    className="btn-neon signal-cut-sm px-5 py-3 text-xs font-bold uppercase tracking-[0.18em]"
                  >
                    Open Control Panel
                  </Link>
                )}
              </div>
            </div>

            <div className="dashboard-panel signal-cut p-4 md:p-6">
              <div className="rounded border border-[#2a4258] bg-[#0b1623] p-4">
                <div className="grid gap-3 text-xs text-[#7d97ac]">
                  <div className="h-2 w-24 rounded bg-[#22384d]" />
                  <div className="h-2 w-40 rounded bg-[#22384d]" />
                  <div className="h-2 w-32 rounded bg-[#22384d]" />
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  <article className="rounded border border-[#2a5b79] bg-[#0d2233] p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#7ceeff]">
                      Weekly Performance
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#e8fbff]">+12.4%</p>
                  </article>
                  <article className="rounded border border-[#2a5b79] bg-[#0d2233] p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#7ceeff]">
                      Net Sales
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#e8fbff]">$42.1k</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section
            id="workflow"
            className="mt-12 border-b border-[#24384b] pb-12"
          >
            <h2 className="font-headline text-3xl font-black">What problem does it solve?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {chaosCards.map((item) => (
                <article key={item.title} className="dashboard-panel-soft signal-cut p-5">
                  <h3 className="text-lg font-semibold text-[#dbf4ff]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#9db3c7]">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="pricing" className="mt-12 border-b border-[#24384b] pb-12">
            <h2 className="font-headline text-3xl font-black">How does it solve it?</h2>
            <p className="mt-2 text-sm text-[#9db3c7]">
              The product and architecture are designed to standardize performance tracking.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pillars.map((item) => (
                <article key={item.title} className="dashboard-panel-soft signal-cut p-5">
                  <div className="mb-3 inline-flex rounded bg-[#00e0ff] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#052a36]">
                    core
                  </div>
                  <h3 className="text-xl font-semibold text-[#dbf4ff]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#9db3c7]">{item.description}</p>
                  <p className="mono-metrics mt-4 text-[10px] uppercase tracking-[0.16em] text-[#45f2cd]">
                    {item.footer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="roadmap" className="py-14">
            <article className="dashboard-panel signal-cut p-10 text-center">
              <h2 className="font-headline text-4xl font-black">
                Next step: production readiness
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#9db3c7]">
                CI/CD, broader test coverage, and role-based authorization can move
                this project to enterprise-grade reliability.
              </p>
              <div className="mt-6">
                {!user ? (
                  <button
                    onClick={() => setActiveModal("register")}
                    className="btn-neon signal-cut-sm px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    Get Started
                  </button>
                ) : (
                  <Link
                    href="/mission-control"
                    className="btn-neon signal-cut-sm px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]"
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
          title="Log In"
          description="Log in to access your workspace data."
          onClose={() => setActiveModal(null)}
        >
          <form className="space-y-3" onSubmit={submitLogin}>
            <input
              className="dashboard-select w-full rounded px-3 py-2 text-sm"
              placeholder="Email"
              {...loginForm.register("email")}
            />
            {loginForm.formState.errors.email?.message ? (
              <p className="text-xs text-[#ff98a3]">
                {loginForm.formState.errors.email.message}
              </p>
            ) : null}
            <input
              type="password"
              className="dashboard-select w-full rounded px-3 py-2 text-sm"
              placeholder="Password"
              {...loginForm.register("password")}
            />
            {loginForm.formState.errors.password?.message ? (
              <p className="text-xs text-[#ff98a3]">
                {loginForm.formState.errors.password.message}
              </p>
            ) : null}
            {loginMutation.error ? (
              <p className="text-xs text-[#ff98a3]">{loginMutation.error.message}</p>
            ) : null}
            <button
              disabled={loginMutation.isPending}
              className="btn-neon w-full rounded px-3 py-2 text-sm font-semibold"
            >
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </button>
          </form>
        </AuthModal>
      ) : null}

      {activeModal === "register" ? (
        <AuthModal
          title="Register"
          description="Create a new account and start tracking team performance."
          onClose={() => setActiveModal(null)}
        >
          <form className="space-y-3" onSubmit={submitRegister}>
            <input
              className="dashboard-select w-full rounded px-3 py-2 text-sm"
              placeholder="Email"
              {...registerForm.register("email")}
            />
            {registerForm.formState.errors.email?.message ? (
              <p className="text-xs text-[#ff98a3]">
                {registerForm.formState.errors.email.message}
              </p>
            ) : null}
            <input
              type="password"
              className="dashboard-select w-full rounded px-3 py-2 text-sm"
              placeholder="Password"
              {...registerForm.register("password")}
            />
            {registerForm.formState.errors.password?.message ? (
              <p className="text-xs text-[#ff98a3]">
                {registerForm.formState.errors.password.message}
              </p>
            ) : null}
            {registerMutation.error ? (
              <p className="text-xs text-[#ff98a3]">
                {registerMutation.error.message}
              </p>
            ) : null}
            <button
              disabled={registerMutation.isPending}
              className="btn-neon w-full rounded px-3 py-2 text-sm font-semibold"
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
          </form>
        </AuthModal>
      ) : null}
    </div>
  );
}