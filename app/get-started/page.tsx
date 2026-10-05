"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/* ── individual neon star ── */
function Star({ style }: { style: React.CSSProperties }) {
  return <div className="pixel-star" style={style} />;
}

/* ── 3D tilt card ── */
function TiltCard({
  children,
  className = "",
  glowColor = "rgba(255,45,120,0.4)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg) translateZ(20px)`;
    el.style.boxShadow = `${-x * 30}px ${y * 30}px 60px ${glowColor}, 0 0 40px rgba(0,245,255,0.15)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";
    el.style.boxShadow = "";
    el.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 500);
  }

  return (
    <div className="perspective-container">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`card-3d ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Glitch title ── */
function GlitchTitle({ text }: { text: string }) {
  return (
    <h1 className="mt-2 text-3xl font-bold md:text-5xl font-pixel">
      <span className="glitch-container" style={{ display: "inline-block" }}>
        <span
          className="relative"
          style={{
            textShadow:
              "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #ff2d78, 0 0 80px #ff2d78",
            WebkitTextFillColor: "white",
          }}
        >
          {text}
        </span>
        <span className="glitch-layer glitch-layer-1" aria-hidden>
          {text}
        </span>
        <span className="glitch-layer glitch-layer-2" aria-hidden>
          {text}
        </span>
      </span>
    </h1>
  );
}

const options = [
  {
    title: "Personal use",
    description:
      "Create one pass for yourself, a private event, or a personal ID.",
    href: "/personal",
    gradient: "from-pink-500 via-fuchsia-500 to-violet-600",
    glowColor: "rgba(255,45,120,0.5)",
    borderClass: "neon-border-pink",
    icon: "👤",
    iconColor: "#ff2d78",
  },
  {
    title: "For an organization",
    description:
      "Create passes for employees, students, visitors, or event attendees.",
    href: "/organization",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    glowColor: "rgba(0,245,255,0.5)",
    borderClass: "neon-border-cyan",
    icon: "🏢",
    iconColor: "#00f5ff",
  },
];

export default function Home() {
  const [stars, setStars] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Generate random pixel stars
    const generated = Array.from({ length: 30 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      "--dur": `${1.5 + Math.random() * 3}s`,
      "--delay": `${Math.random() * 3}s`,
    })) as React.CSSProperties[];
    setStars(generated);
  }, []);

  return (
    <main
      className="scanlines relative min-h-screen px-4 py-10 text-white overflow-hidden"
      style={{
        backgroundImage: "url('/arcade-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,8,23,0.55) 0%, rgba(2,8,23,0.4) 50%, rgba(2,8,23,0.7) 100%)",
          zIndex: 0,
        }}
      />

      {/* Pixel stars */}
      {stars.map((s, i) => (
        <Star key={i} style={s} />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
        {/* ── Header ── */}
        <TiltCard
          glowColor="rgba(191,0,255,0.4)"
          className="rounded-3xl border-2 border-white/20 p-6 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(191,0,255,0.15) 0%, rgba(0,245,255,0.08) 100%)",
            boxShadow:
              "0 0 30px rgba(191,0,255,0.3), inset 0 0 30px rgba(255,255,255,0.02)",
          } as React.CSSProperties}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              {/* Animated "PASSIFY" badge */}
              <p
                className="text-sm font-bold uppercase tracking-[0.3em] animate-pulse-neon font-pixel"
                style={{
                  color: "#ff2d78",
                  textShadow:
                    "0 0 10px #ff2d78, 0 0 20px #ff2d78, 0 0 40px #ff2d78",
                }}
              >
                ★ Passify ★
              </p>

              <GlitchTitle text="Create a secure pass in minutes" />
            </div>

            {/* Floating badge */}
            <div
              className="hidden md:flex animate-float items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold backdrop-blur-sm font-pixel neon-border-cyan"
              style={{
                background: "rgba(0,245,255,0.08)",
                color: "#00f5ff",
                textShadow: "0 0 10px #00f5ff",
              }}
            >
              <span>⚡</span>
              <span>Simple ID &amp; Event Pass Generator</span>
              <span>⚡</span>
            </div>
          </div>
        </TiltCard>

        {/* ── Option cards ── */}
        <section className="grid gap-6 md:grid-cols-2">
          {options.map((option) => (
            <Link key={option.title} href={option.href} className="block">
              <TiltCard
                glowColor={option.glowColor}
                className={`rounded-3xl border-2 p-6 h-full ${option.borderClass} backdrop-blur-md`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(2,8,23,0.75) 0%, rgba(2,8,23,0.55) 100%)",
                } as React.CSSProperties}
              >
                {/* Icon */}
                <div className="animate-float mb-5 text-5xl text-center w-16 h-16 flex items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", animationDelay: `${Math.random()}s` }}>
                  {option.icon}
                </div>

                {/* Select badge */}
                <div
                  className={`mb-5 inline-flex rounded-xl bg-gradient-to-r ${option.gradient} px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white btn-neon`}
                  style={{ boxShadow: `0 0 15px ${option.iconColor}` }}
                >
                  Select
                </div>

                <h2
                  className="text-2xl font-bold font-pixel"
                  style={{
                    color: option.iconColor,
                    textShadow: `0 0 10px ${option.iconColor}, 0 0 20px ${option.iconColor}`,
                  }}
                >
                  {option.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-200">
                  {option.description}
                </p>

                <div
                  className="mt-8 flex items-center justify-between text-sm font-bold font-pixel"
                  style={{
                    color: option.iconColor,
                    textShadow: `0 0 8px ${option.iconColor}`,
                  }}
                >
                  <span>▶ Continue</span>
                  <span
                    className="text-xl"
                    style={{ animation: "float 1.5s ease-in-out infinite" }}
                  >
                    →
                  </span>
                </div>
              </TiltCard>
            </Link>
          ))}
        </section>

        {/* ── Footer glow line ── */}
        <div
          className="mx-auto h-px w-3/4 rounded-full animate-pulse-neon"
          style={{
            background:
              "linear-gradient(90deg, transparent, #ff2d78, #00f5ff, #bf00ff, transparent)",
            boxShadow: "0 0 15px #ff2d78",
          }}
        />
      </div>
    </main>
  );
}
