"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { orgTemplates } from "./orgTemplates";
import { OrgBadgePreview } from "./OrgBadgePreview";

type OrganizationPassBuilderProps = {
  templateId: string | null;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30";

export function OrganizationPassBuilder({ templateId }: OrganizationPassBuilderProps) {
  const template = orgTemplates.find((item) => item.id === templateId) ?? orgTemplates[0];
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [created, setCreated] = useState(false);
  const photoUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ""), [photo]);

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPhotoError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhoto(null);
      setPhotoError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhoto(null);
      setPhotoError("Image must be 5 MB or smaller.");
      return;
    }
    setPhoto(file);
  }

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
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/dashboard/organization/templates"
          className="font-pixel text-xs uppercase tracking-widest text-slate-400 transition hover:text-white"
        >
          ← Back to templates
        </Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
          <section>
            <p
              className="font-pixel text-sm font-bold uppercase tracking-[0.3em]"
              style={{ color: template.accent, textShadow: `0 0 10px ${template.accent}` }}
            >
              Step 2 of 3 · Pass details
            </p>
            <h1 className="mt-3 font-pixel text-3xl font-bold md:text-5xl">ADD PASS DETAILS</h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Enter the holder&apos;s details. The badge preview updates as you type.
            </p>

            <form
              className="mt-8 space-y-6 rounded-3xl border border-white/15 bg-slate-950/70 p-6"
              onSubmit={(event) => {
                event.preventDefault();
                setCreated(true);
              }}
              onChange={() => setCreated(false)}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="org-name" className="font-pixel text-sm font-bold">
                    Holder name
                  </label>
                  <input id="org-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="e.g. Alex Morgan" className={inputClass} required />
                </div>
                <div>
                  <label htmlFor="org-role" className="font-pixel text-sm font-bold">
                    Role / title
                  </label>
                  <input id="org-role" value={role} onChange={(e) => setRole(e.target.value)} maxLength={40} placeholder="e.g. Senior Engineer" className={inputClass} required />
                </div>
              </div>
              <div>
                <label htmlFor="org-organization" className="font-pixel text-sm font-bold">
                  Organization
                </label>
                <input id="org-organization" value={organization} onChange={(e) => setOrganization(e.target.value)} maxLength={40} placeholder="e.g. Acme Corporation" className={inputClass} required />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="org-id" className="font-pixel text-sm font-bold">
                    ID number <span className="font-sans font-normal text-slate-400">(optional)</span>
                  </label>
                  <input id="org-id" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} maxLength={20} placeholder="e.g. EMP-1042" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="org-valid" className="font-pixel text-sm font-bold">
                    Valid until <span className="font-sans font-normal text-slate-400">(optional)</span>
                  </label>
                  <input id="org-valid" type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="org-photo" className="font-pixel text-sm font-bold">
                  Photo
                </label>
                <input
                  id="org-photo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handlePhotoChange}
                  className="mt-2 block w-full rounded-xl border border-dashed border-white/30 bg-black/40 p-4 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-white/15 file:px-3 file:py-2 file:text-white"
                />
                <p className="mt-2 text-xs text-slate-400">PNG, JPG, or WebP · Maximum 5 MB</p>
                {photoError && (
                  <p className="mt-2 text-sm text-rose-300" role="alert">
                    {photoError}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="btn-neon rounded-xl px-6 py-3 font-pixel text-sm font-bold text-white"
                  style={{ background: "linear-gradient(90deg, #00f5ff, #0066ff)" }}
                >
                  CREATE PASS
                </button>
                <Link href="/dashboard/organization/templates" className="text-sm text-slate-400 hover:text-white">
                  Change template
                </Link>
                {created && (
                  <p className="text-sm text-emerald-300" role="status">
                    ✓ Pass ready for {name}. Saving and issuing will arrive in the next step.
                  </p>
                )}
              </div>
            </form>
          </section>

          <section aria-label="Live badge preview" className="lg:sticky lg:top-8 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-pixel text-sm font-bold uppercase tracking-widest">Live preview</h2>
              <span className="text-xs text-slate-400">{template.name}</span>
            </div>
            <OrgBadgePreview
              template={template}
              maxWidth={340}
              data={{
                name,
                role,
                organization,
                idNumber,
                validUntil: validUntil ? new Date(`${validUntil}T00:00`).toLocaleDateString() : "",
                photoUrl,
              }}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
