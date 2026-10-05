"use client";

import Link from "next/link";
import { useRef } from "react";

function TiltCard({
  children,
  className = "",
  glowColor = "rgba(0,245,255,0.4)",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(12px)`;
    el.style.boxShadow = `${-x * 25}px ${y * 25}px 50px ${glowColor}, 0 0 40px rgba(0,245,255,0.2)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";
    el.style.boxShadow = "";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  }

  return (
    <div className="perspective-container w-full">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`card-3d ${className}`}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

export default function OrganizationPage() {
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
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(2,8,23,0.6), rgba(2,8,23,0.45), rgba(2,8,23,0.7))",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        <TiltCard
          glowColor="rgba(0,245,255,0.5)"
          className="rounded-3xl border-2 neon-border-cyan p-8 backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, rgba(0,245,255,0.10) 0%, rgba(2,8,23,0.8) 60%, rgba(0,100,255,0.08) 100%)",
          }}
        >
          {/* Badge */}
          <p
            className="text-sm font-bold uppercase tracking-[0.3em] font-pixel animate-pulse-neon"
            style={{ color: "#00f5ff", textShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff" }}
          >
            ★ For an organization ★
          </p>

          {/* Glowing title */}
          <h1
            className="mt-4 text-4xl font-bold font-pixel"
            style={{
              textShadow: "0 0 10px #fff, 0 0 20px #00f5ff, 0 0 40px #00f5ff",
            }}
          >
            Set up your organization
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg text-slate-200 leading-relaxed">
            This is the organization flow where users create an organization
            profile, set up groups, and issue passes for staff or attendees.
          </p>

          {/* Steps box */}
          <div
            className="mt-8 space-y-3 rounded-2xl border-2 p-5 neon-border-cyan"
            style={{
              background: "rgba(0,245,255,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="font-bold font-pixel text-sm uppercase tracking-widest"
              style={{ color: "#00f5ff", textShadow: "0 0 8px #00f5ff" }}
            >
              ▶ Upcoming steps:
            </p>
            <ul className="space-y-3 pl-2">
              {[
                { icon: "🏢", text: "Create organization profile" },
                { icon: "📂", text: "Add event or department group" },
                { icon: "🎨", text: "Select template" },
                { icon: "📇", text: "Create or import passes" },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-200 font-medium"
                >
                  <span
                    className="text-xl animate-float"
                    style={{ "--delay": `${i * 0.25}s` } as React.CSSProperties}
                  >
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/get-started"
              className="btn-neon rounded-full border-2 border-white/30 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition font-pixel"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              ← Back
            </Link>
            <button
              className="btn-neon rounded-full px-6 py-3 text-sm font-bold text-white font-pixel"
              style={{
                background: "linear-gradient(90deg, #00f5ff, #0066ff)",
                boxShadow: "0 0 20px rgba(0,245,255,0.6)",
              }}
            >
              Start organization setup →
            </button>
          </div>
        </TiltCard>
      </div>
    </main>
  );
}
