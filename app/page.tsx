"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ──────────────────────────────────────────────
   Floating pixel particle
────────────────────────────────────────────── */
function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="pixel-star" style={style} />;
}

/* ──────────────────────────────────────────────
   3-D tilt wrapper (reusable)
────────────────────────────────────────────── */
function TiltCard({
  children,
  className = "",
  glowColor = "rgba(191,0,255,0.5)",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) translateZ(24px)`;
    el.style.boxShadow = `${-x * 35}px ${y * 35}px 70px ${glowColor}`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s ease, box-shadow 0.6s ease";
    el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";
    el.style.boxShadow = "";
    setTimeout(() => { if (el) el.style.transition = ""; }, 600);
  };

  return (
    <div className="perspective-container">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`card-3d ${className}`}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Animated counter
────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const step = Math.ceil(to / 60);
        const t = setInterval(() => {
          start += step;
          if (start >= to) { setVal(to); clearInterval(t); }
          else setVal(start);
        }, 16);
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ──────────────────────────────────────────────
   Feature card data
────────────────────────────────────────────── */
const features = [
  {
    icon: "⚡",
    title: "Instant Generation",
    desc: "Create a polished digital pass in under 60 seconds — no design skills required.",
    glow: "#ff2d78",
    border: "neon-border-pink",
    gradient: "from-pink-600/20 to-fuchsia-900/10",
  },
  {
    icon: "🔒",
    title: "Secure & Unique",
    desc: "Every pass includes an encrypted QR code that can't be duplicated or forged.",
    glow: "#00f5ff",
    border: "neon-border-cyan",
    gradient: "from-cyan-600/20 to-blue-900/10",
  },
  {
    icon: "🏢",
    title: "Scale with You",
    desc: "Issue one pass or thousands. Manage employee IDs, event badges, and more in one place.",
    glow: "#bf00ff",
    border: "neon-border-purple",
    gradient: "from-purple-600/20 to-violet-900/10",
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Passes Created" },
  { value: 500,   suffix: "+", label: "Organizations" },
  { value: 99,    suffix: "%", label: "Uptime" },
];

/* ──────────────────────────────────────────────
   Main Landing Page
────────────────────────────────────────────── */
export default function LandingPage() {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, () => ({
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 100}%`,
        "--dur":   `${1.5 + Math.random() * 3}s`,
        "--delay": `${Math.random() * 4}s`,
      })) as React.CSSProperties[]
    );
  }, []);

  return (
    <main
      className="scanlines relative min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundImage: "url('/arcade-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,8,23,0.55) 0%, rgba(2,8,23,0.35) 40%, rgba(2,8,23,0.75) 100%)",
          zIndex: 0,
        }}
      />

      {/* Pixel particles */}
      {particles.map((s, i) => <Particle key={i} style={s} />)}

      {/* ── NAV ───────────────────────────────── */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-float">🎮</span>
          <span
            className="text-xl font-bold font-pixel tracking-widest"
            style={{ color: "#ff2d78", textShadow: "0 0 12px #ff2d78, 0 0 24px #ff2d78" }}
          >
            PASSIFY
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-pixel font-bold">
          {["Features", "Stats", "Start"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="transition-all duration-200 hover:scale-110"
              style={{ color: "#00f5ff", textShadow: "0 0 8px #00f5ff" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA nav pill */}
        <Link
          href="/get-started"
          className="btn-neon hidden md:inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold font-pixel neon-border-pink"
          style={{
            background: "rgba(255,45,120,0.12)",
            color: "#ff2d78",
            textShadow: "0 0 8px #ff2d78",
          }}
        >
          <span>▶</span> Get Started
        </Link>
      </nav>

      {/* ── HERO ──────────────────────────────── */}
      <section
        id="features"
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 min-h-[85vh]"
      >
        {/* Eyebrow */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold font-pixel uppercase tracking-widest animate-float neon-border-purple"
          style={{
            background: "rgba(191,0,255,0.1)",
            color: "#bf00ff",
            textShadow: "0 0 10px #bf00ff",
          }}
        >
          <span className="animate-pulse-neon">★</span>
          The Ultimate Digital Pass Generator
          <span className="animate-pulse-neon">★</span>
        </div>

        {/* Main heading */}
        <h1 className="relative font-pixel font-bold leading-none">
          <span
            className="block text-5xl md:text-8xl"
            style={{
              textShadow:
                "0 0 10px #fff, 0 0 30px #ff2d78, 0 0 60px #ff2d78, 0 0 120px #ff2d78",
            }}
          >
            PASSIFY
          </span>
          <span
            className="block mt-2 text-2xl md:text-4xl shimmer-text"
          >
            Create. Secure. Impress.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
          Generate stunning, secure digital passes for yourself or your entire
          organization — in minutes. No design skills needed.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/get-started"
            className="btn-neon group relative rounded-full px-8 py-4 text-base font-bold font-pixel text-white"
            style={{
              background: "linear-gradient(90deg, #ff2d78, #bf00ff)",
              boxShadow: "0 0 30px rgba(255,45,120,0.6), 0 0 60px rgba(191,0,255,0.3)",
            }}
          >
            <span className="flex items-center gap-2">
              <span>🚀</span>
              Create Your Pass
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </Link>

          <a
            href="#features-section"
            className="btn-neon rounded-full border-2 border-white/25 px-8 py-4 text-base font-bold font-pixel text-white backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <span className="flex items-center gap-2">
              <span>▼</span> See Features
            </span>
          </a>
        </div>

        {/* Floating badge row */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {["🎨 Custom Templates", "🔲 QR Codes", "📱 Mobile Ready", "⚡ Instant Download"].map(
            (badge, i) => (
              <span
                key={badge}
                className="animate-float rounded-full border px-4 py-1.5 text-xs font-pixel font-bold"
                style={{
                  "--delay": `${i * 0.3}s`,
                  borderColor: ["#ff2d78","#00f5ff","#bf00ff","#ffe600"][i],
                  color: ["#ff2d78","#00f5ff","#bf00ff","#ffe600"][i],
                  textShadow: `0 0 8px ${["#ff2d78","#00f5ff","#bf00ff","#ffe600"][i]}`,
                  background: "rgba(2,8,23,0.6)",
                } as React.CSSProperties}
              >
                {badge}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────── */}
      <section id="stats" className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <TiltCard
              key={s.label}
              glowColor={["rgba(255,45,120,0.4)","rgba(0,245,255,0.4)","rgba(191,0,255,0.4)"][i]}
              className={`rounded-2xl border-2 p-8 text-center backdrop-blur-md ${["neon-border-pink","neon-border-cyan","neon-border-purple"][i]}`}
              style={{ background: "rgba(2,8,23,0.65)" }}
            >
              <div
                className="text-4xl md:text-5xl font-bold font-pixel"
                style={{
                  color: ["#ff2d78","#00f5ff","#bf00ff"][i],
                  textShadow: `0 0 20px ${["#ff2d78","#00f5ff","#bf00ff"][i]}`,
                }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-pixel text-slate-300 uppercase tracking-widest">
                {s.label}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────── */}
      <section id="features-section" className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Section title */}
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold font-pixel uppercase tracking-[0.4em] animate-pulse-neon"
              style={{ color: "#00f5ff", textShadow: "0 0 10px #00f5ff" }}
            >
              ★ Why Passify ★
            </p>
            <h2
              className="mt-3 text-3xl md:text-5xl font-bold font-pixel"
              style={{ textShadow: "0 0 10px #fff, 0 0 20px #00f5ff, 0 0 40px #00f5ff" }}
            >
              Everything you need
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <TiltCard
                key={f.title}
                glowColor={`${f.glow}80`}
                className={`rounded-3xl border-2 p-8 backdrop-blur-md ${f.border} bg-gradient-to-br ${f.gradient}`}
                style={{ background: "rgba(2,8,23,0.7)" }}
              >
                {/* Icon */}
                <div
                  className="animate-float mb-6 text-5xl w-16 h-16 flex items-center justify-center rounded-2xl border-2"
                  style={{
                    borderColor: f.glow,
                    boxShadow: `0 0 15px ${f.glow}`,
                    background: `${f.glow}15`,
                    "--delay": `${i * 0.4}s`,
                  } as React.CSSProperties}
                >
                  {f.icon}
                </div>

                <h3
                  className="text-xl font-bold font-pixel"
                  style={{ color: f.glow, textShadow: `0 0 10px ${f.glow}` }}
                >
                  {f.title}
                </h3>
                <p className="mt-3 text-slate-300 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────── */}
      <section id="start" className="relative z-10 px-6 py-24 text-center">
        <TiltCard
          glowColor="rgba(255,45,120,0.4)"
          className="mx-auto max-w-3xl rounded-3xl border-2 neon-border-pink p-12 backdrop-blur-md"
          style={{ background: "rgba(2,8,23,0.75)" }}
        >
          <p
            className="text-sm font-bold font-pixel uppercase tracking-widest animate-pulse-neon"
            style={{ color: "#ff2d78", textShadow: "0 0 10px #ff2d78" }}
          >
            ★ Ready to start? ★
          </p>
          <h2
            className="mt-4 text-3xl md:text-5xl font-bold font-pixel"
            style={{ textShadow: "0 0 10px #fff, 0 0 30px #ff2d78, 0 0 60px #ff2d78" }}
          >
            Make your first pass today
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Join thousands of users already creating passes with Passify.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="btn-neon rounded-full px-10 py-4 text-base font-bold font-pixel text-white"
              style={{
                background: "linear-gradient(90deg, #ff2d78, #bf00ff, #00f5ff)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
                boxShadow: "0 0 30px rgba(255,45,120,0.7)",
              }}
            >
              🎮 Get Started — It&apos;s Free
            </Link>
          </div>

          {/* Neon divider */}
          <div
            className="mt-10 mx-auto h-px w-2/3 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #ff2d78, #00f5ff, #bf00ff, transparent)",
              boxShadow: "0 0 10px #ff2d78",
            }}
          />
          <p className="mt-4 text-xs text-slate-500 font-pixel">
            No credit card required · Instant access · Free forever for personal use
          </p>
        </TiltCard>
      </section>

      {/* ── FOOTER ────────────────────────────── */}
      <footer className="relative z-10 text-center pb-8">
        <p
          className="text-xs font-pixel text-slate-600"
          style={{ textShadow: "0 0 6px rgba(255,45,120,0.3)" }}
        >
          © 2026 Passify · Built with 🎮 and neon lights
        </p>
      </footer>
    </main>
  );
}
