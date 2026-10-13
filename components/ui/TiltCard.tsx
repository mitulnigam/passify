"use client";

import { useRef } from "react";

export function TiltCard({
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
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 600);
  };

  return (
    <div className="perspective-container w-full">
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
