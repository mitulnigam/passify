"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { orgTemplates, type OrgTemplateId } from "./orgTemplates";
import { OrgBadgePreview } from "./OrgBadgePreview";
import { TiltCard } from "../ui/TiltCard";

const accent = "#00f5ff";

export function OrganizationTemplateSelector() {
  const router = useRouter();
  const [selected, setSelected] = useState<OrgTemplateId | null>(null);

  return (
    <main
      className="scanlines relative min-h-screen overflow-x-hidden px-6 py-10 text-white md:px-12"
      style={{
        backgroundImage: "url('/arcade-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,8,23,0.88), rgba(2,8,23,0.7), rgba(2,8,23,0.92))",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/dashboard/organization"
              className="font-pixel text-xs uppercase tracking-widest text-slate-400 transition hover:text-white"
            >
              ← Back to dashboard
            </Link>
            <p
              className="mt-7 font-pixel text-sm font-bold uppercase tracking-[0.3em]"
              style={{ color: accent, textShadow: `0 0 10px ${accent}` }}
            >
              Organization passes · Choose a template
            </p>
            <h1
              className="mt-3 font-pixel text-3xl font-bold md:text-5xl"
              style={{ textShadow: `0 0 10px #fff, 0 0 22px ${accent}, 0 0 42px ${accent}` }}
            >
              ISSUE PASSES
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Pick a formal badge layout for your members, visitors, or attendees. You can add
              your logo, names, and access details in the next step.
            </p>
          </div>
          <div className="rounded-full border border-white/20 bg-black/30 px-4 py-2 font-pixel text-xs text-slate-300">
            {selected ? "Template selected" : "No template selected"}
          </div>
        </div>

        <section
          aria-label="Organization pass templates"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {orgTemplates.map((template) => {
            const isSelected = selected === template.id;
            return (
              <button
                key={template.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(template.id)}
                className="text-left"
              >
                <TiltCard
                  glowColor={`${template.accent}80`}
                  className={`h-full rounded-3xl border-2 p-4 transition ${
                    isSelected ? "ring-2 ring-white/80 ring-offset-2 ring-offset-slate-950" : ""
                  }`}
                  style={{
                    borderColor: isSelected ? template.accent : `${template.accent}50`,
                    background: "rgba(2,8,23,0.65)",
                  }}
                >
                  <OrgBadgePreview template={template} />
                  <div className="px-1 pb-1 pt-4">
                    <span
                      className="font-pixel text-[10px] uppercase tracking-widest"
                      style={{ color: template.accent }}
                    >
                      {template.useCase}
                    </span>
                    <h2 className="mt-1 font-pixel text-base font-bold">{template.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{template.description}</p>
                    <span
                      className="mt-3 block font-pixel text-xs font-bold uppercase tracking-widest"
                      style={{ color: template.accent }}
                    >
                      {isSelected ? "✓ Selected" : "Select template →"}
                    </span>
                  </div>
                </TiltCard>
              </button>
            );
          })}
        </section>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-300">
            {selected
              ? "Your template is ready for the pass details form."
              : "Select one template to continue."}
          </p>
          <button
            type="button"
            disabled={!selected}
            className="btn-neon rounded-xl px-6 py-3 font-pixel text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: `linear-gradient(90deg, ${accent}, #0066ff)` }}
            onClick={() => {
              if (selected) {
                router.push(`/dashboard/organization/builder?template=${selected}`);
              }
            }}
          >
            CONTINUE TO DETAILS →
          </button>
        </div>
      </div>
    </main>
  );
}
