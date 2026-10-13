"use client";

import Link from "next/link";
import { useActionState } from "react";
import { type Workspace, workspaceConfig } from "./workspace";
import { TiltCard } from "../ui/TiltCard";
import { login, register } from "../../lib/auth/actions";

type WorkspaceAuthFormProps = {
  mode: Workspace;
  action: "login" | "register";
};

export function WorkspaceAuthForm({ mode, action }: WorkspaceAuthFormProps) {
  const [state, formAction, isPending] = useActionState(action === "login" ? login : register, undefined);
  const config = workspaceConfig[mode];
  const isOrganization = mode === "organization";

  return (
    <main
      className="scanlines relative min-h-screen px-6 py-12 text-white overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url('/arcade-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-slate-950/70" />
      <div className="relative z-10 w-full max-w-md">
        <Link
          href={mode === "personal" ? "/personal" : "/organization"}
          className="inline-block mb-6 text-sm font-pixel font-bold text-slate-300 hover:text-white"
        >
          ← Back to {config.label} setup
        </Link>

        <TiltCard
          glowColor={`${config.accent}80`}
          className="rounded-3xl border-2 p-8 backdrop-blur-md"
          style={{
            borderColor: `${config.accent}80`,
            background: `linear-gradient(135deg, ${config.accent}18 0%, rgba(2,8,23,0.85) 65%)`,
          }}
        >
          <div className="text-center mb-8">
            <p
              className="font-pixel text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: config.accent }}
            >
              {config.label} account
            </p>
            <h1 className="mt-3 text-3xl font-bold font-pixel">
              {action === "login" ? "ACCOUNT LOGIN" : "CREATE ACCOUNT"}
            </h1>
            <p className="mt-2 text-slate-300 font-pixel text-sm uppercase tracking-widest">
              {isOrganization
                ? "Manage teams, groups, and issued passes"
                : "Create and manage your personal passes"}
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <input type="hidden" name="workspace" value={mode} />
            {action === "register" && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold font-pixel text-slate-200">
                  Display Name
                </label>
                <input
                  id="name"
                  name="name"
                  defaultValue={state?.name}
                  autoComplete="name"
                  type="text"
                  required
                  className="w-full rounded-xl border-2 bg-slate-900/50 px-4 py-3 text-white"
                  style={{ borderColor: `${config.accent}50` }}
                  placeholder={isOrganization ? "Organization admin" : "Jane Doe"}
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold font-pixel text-slate-200">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                defaultValue={state?.email}
                autoComplete="email"
                type="email"
                required
                className="w-full rounded-xl border-2 bg-slate-900/50 px-4 py-3 text-white"
                style={{ borderColor: `${config.accent}50` }}
                placeholder={isOrganization ? "admin@company.com" : "user@example.com"}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold font-pixel text-slate-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                autoComplete={action === "login" ? "current-password" : "new-password"}
                minLength={action === "register" ? 8 : undefined}
                type="password"
                required
                className="w-full rounded-xl border-2 bg-slate-900/50 px-4 py-3 text-white"
                style={{ borderColor: `${config.accent}50` }}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn-neon w-full rounded-xl px-6 py-4 text-sm font-bold text-white font-pixel"
              style={{ background: config.gradient, boxShadow: `0 0 20px ${config.accent}66` }}
            >
              {isPending ? (action === "login" ? "STARTING SESSION..." : "CREATING ACCOUNT...") : action === "login" ? "START SESSION →" : "CREATE ACCOUNT →"}
            </button>
            {state?.error && (
              <p className="text-center text-sm text-rose-300" role="alert">
                {state.error}
              </p>
            )}
          </form>

          <div className="mt-8 text-center text-sm text-slate-400 font-pixel">
            {action === "login" ? "New user? " : "Already registered? "}
            <Link
              href={action === "login" ? config.registerPath : config.loginPath}
              className="font-bold"
              style={{ color: config.accent }}
            >
              {action === "login" ? "REGISTER ACCOUNT" : "LOGIN HERE"}
            </Link>
          </div>
        </TiltCard>
      </div>
    </main>
  );
}

