"use client";

import Link from "next/link";
import { TiltCard } from "../../../components/ui/TiltCard";
import { LogoutButton } from "../../../components/auth/LogoutButton";

// Mock data for organization passes
const orgPasses = [
  { id: "A-01", name: "Alice Smith", role: "Employee", status: "Active" },
  { id: "A-02", name: "Bob Jones", role: "Visitor", status: "Active" },
  { id: "A-03", name: "Charlie Davis", role: "Contractor", status: "Expired" },
  { id: "A-04", name: "Diana Prince", role: "VIP", status: "Revoked" },
];

export default function OrganizationDashboard() {
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div>
            <h1
              className="text-4xl font-bold font-pixel"
              style={{
                textShadow: "0 0 10px #fff, 0 0 20px #00f5ff, 0 0 40px #00f5ff",
              }}
            >
              ORGANIZATION DASHBOARD
            </h1>
            <p className="mt-2 text-slate-300 font-pixel text-sm uppercase tracking-widest">
              Organization Pass Management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/organization/templates"
              className="btn-neon rounded-full px-6 py-3 text-sm font-bold text-white font-pixel flex items-center gap-2 shrink-0"
              style={{
                background: "linear-gradient(90deg, #00f5ff, #0066ff)",
                boxShadow: "0 0 20px rgba(0,245,255,0.5)",
              }}
            >
              <span>+</span> ISSUE PASSES
            </Link>
            <LogoutButton workspace="organization" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Issued", value: "1,024", color: "#00f5ff" },
            { label: "Active Passes", value: "942", color: "#39ff14" },
            { label: "Revoked", value: "12", color: "#ff2d78" },
          ].map((stat, i) => (
            <TiltCard
              key={i}
              glowColor={`${stat.color}60`}
              className="rounded-2xl border-2 p-6 backdrop-blur-md"
              style={{
                borderColor: `${stat.color}40`,
                background: "rgba(2,8,23,0.6)",
              }}
            >
              <div className="text-slate-400 font-pixel text-xs uppercase tracking-widest mb-2">
                {stat.label}
              </div>
              <div
                className="text-4xl font-bold font-pixel"
                style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}` }}
              >
                {stat.value}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Members Table Area */}
        <div className="rounded-3xl border-2 border-cyan-500/30 bg-slate-900/60 backdrop-blur-md overflow-hidden">
          <div className="p-6 border-b border-cyan-500/30 flex justify-between items-center bg-black/40">
            <h2 className="font-pixel font-bold text-lg text-cyan-400" style={{ textShadow: "0 0 8px #00f5ff" }}>
              RECENT LOGS
            </h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-black/50 border border-cyan-500/50 rounded-lg px-3 py-1 text-sm font-pixel outline-none focus:border-cyan-400 text-white"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead className="bg-black/20 font-pixel text-xs text-slate-400 uppercase tracking-widest border-b border-cyan-500/20">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10 text-sm">
                {orgPasses.map((pass) => (
                  <tr key={pass.id} className="hover:bg-cyan-900/20 transition-colors">
                    <td className="px-6 py-4 font-pixel text-cyan-300">{pass.id}</td>
                    <td className="px-6 py-4 font-bold">{pass.name}</td>
                    <td className="px-6 py-4 text-slate-300">{pass.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className="font-pixel text-[10px] uppercase px-2 py-1 rounded-full border border-slate-600"
                        style={{
                          color: pass.status === "Active" ? "#39ff14" : pass.status === "Revoked" ? "#ff2d78" : "#ffe600",
                          borderColor: pass.status === "Active" ? "#39ff14" : pass.status === "Revoked" ? "#ff2d78" : "#ffe600",
                        }}
                      >
                        {pass.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white transition-colors text-xs font-pixel">
                        MANAGE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
