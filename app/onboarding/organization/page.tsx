"use client";

import Link from "next/link";
import { useState } from "react";
import { TiltCard } from "../../../components/ui/TiltCard";

export default function OrganizationOnboarding() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard/organization";
    }, 1500);
  };

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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,8,23,0.7), rgba(2,8,23,0.5), rgba(2,8,23,0.8))",
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <TiltCard
          glowColor="rgba(0,245,255,0.5)"
          className="rounded-3xl border-2 neon-border-cyan p-8 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(2,8,23,0.8) 60%, rgba(0,100,255,0.1) 100%)",
          }}
        >
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold font-pixel"
              style={{
                textShadow:
                  "0 0 10px #fff, 0 0 20px #00f5ff, 0 0 40px #00f5ff",
              }}
            >
              SETUP ORGANIZATION
            </h1>
            <p className="mt-2 text-slate-300 font-pixel text-sm uppercase tracking-widest">
              Organization Setup
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-bold font-pixel text-slate-200">
                Organization Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border-2 border-cyan-500/30 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all font-sans"
                placeholder="e.g. Acme Corp"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold font-pixel text-slate-200">
                Industry / Category
              </label>
              <select
                required
                className="w-full rounded-xl border-2 border-cyan-500/30 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all font-sans"
              >
                <option value="">Select industry...</option>
                <option value="tech">Technology</option>
                <option value="edu">Education</option>
                <option value="event">Event Management</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-bold font-pixel text-slate-200">
                Organization Logo (Optional)
              </span>
              <label className="block border-2 border-dashed border-cyan-500/30 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors bg-slate-900/50 cursor-pointer relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      e.target.nextElementSibling!.textContent = `Selected: ${file.name}`;
                    }
                  }}
                />
                <p className="text-slate-400 font-sans text-sm pointer-events-none">
                  Click to upload your logo
                </p>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-neon w-full rounded-xl px-6 py-4 text-sm font-bold text-white font-pixel mt-4"
              style={{
                background: "linear-gradient(90deg, #00f5ff, #0066ff)",
                boxShadow: "0 0 20px rgba(0,245,255,0.4)",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "SAVING PROFILE..." : "ENTER DASHBOARD →"}
            </button>
          </form>
        </TiltCard>
      </div>
    </main>
  );
}
