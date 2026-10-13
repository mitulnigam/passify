"use client";

import Link from "next/link";
import { TiltCard } from "../../../components/ui/TiltCard";
import { LogoutButton } from "../../../components/auth/LogoutButton";


export default function PersonalDashboard() {
  return (
    <main
      className="scanlines relative min-h-screen p-6 md:p-12 text-white overflow-x-hidden"
      style={{
        backgroundImage: "url('/arcade-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,8,23,0.85), rgba(2,8,23,0.7), rgba(2,8,23,0.9))",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1
              className="text-4xl font-bold font-pixel"
              style={{
                textShadow: "0 0 10px #fff, 0 0 20px #ff2d78, 0 0 40px #ff2d78",
              }}
            >
              PERSONAL DASHBOARD
            </h1>
            <p className="mt-2 text-slate-300 font-pixel text-sm uppercase tracking-widest">
              Manage your personal passes
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/personal/templates"
              className="btn-neon rounded-full px-6 py-3 text-sm font-bold text-white font-pixel flex items-center gap-2 shrink-0"
              style={{
                background: "linear-gradient(90deg, #ff2d78, #bf00ff)",
                boxShadow: "0 0 20px rgba(255,45,120,0.5)",
              }}
            >
              <span>+</span> CREATE NEW PASS
            </Link>
            <LogoutButton workspace="personal" />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Pass Card */}
          <Link href="/dashboard/personal/templates" className="block">
            <TiltCard
              glowColor="rgba(255,45,120,0.4)"
              className="rounded-3xl border-2 border-dashed border-slate-600 p-6 flex flex-col items-center justify-center h-full min-h-[220px] hover:border-pink-500 hover:bg-pink-500/10 transition-colors group cursor-pointer"
              style={{ background: "rgba(2,8,23,0.4)" }}
            >
              <div className="text-5xl text-slate-500 group-hover:text-pink-500 transition-colors mb-4">
                +
              </div>
              <p className="text-sm font-pixel font-bold text-slate-500 group-hover:text-pink-400 transition-colors">
                CREATE NEW PASS
              </p>
            </TiltCard>
          </Link>
        </div>
      </div>
    </main>
  );
}
