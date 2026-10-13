"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { passTemplates } from "./templates";

type PersonalPassBuilderProps = {
  templateId: string | null;
};

export function PersonalPassBuilder({ templateId }: PersonalPassBuilderProps) {
  const template = passTemplates.find((item) => item.id === templateId) ?? passTemplates[0];
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
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
    <main className="scanlines relative min-h-screen overflow-x-hidden px-6 py-10 text-white md:px-12"
      style={{ backgroundImage: "url('/arcade-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Link href="/dashboard/personal/templates" className="font-pixel text-xs uppercase tracking-widest text-slate-400 transition hover:text-white">
          ← Back to templates
        </Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <section>
            <p className="font-pixel text-sm font-bold uppercase tracking-[0.3em]" style={{ color: template.accent, textShadow: `0 0 10px ${template.accent}` }}>
              Step 2 of 3 · Personalize your pass
            </p>
            <h1 className="mt-3 text-3xl font-bold font-pixel md:text-5xl">ADD YOUR DETAILS</h1>
            <p className="mt-4 max-w-xl text-slate-300">Upload a photo and enter the details that should appear on your pass. The preview updates as you type.</p>
            <form className="mt-8 space-y-6 rounded-3xl border border-white/15 bg-slate-950/70 p-6">
              <div>
                <label htmlFor="pass-name" className="font-pixel text-sm font-bold">Name</label>
                <input id="pass-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={40} placeholder="e.g. Alex Morgan" className="mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30" required />
              </div>
              <div>
                <label htmlFor="pass-title" className="font-pixel text-sm font-bold">Title</label>
                <input id="pass-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={40} placeholder="e.g. Creative Director" className="mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30" required />
              </div>
              <div>
                <label htmlFor="pass-photo" className="font-pixel text-sm font-bold">Photo</label>
                <input id="pass-photo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhotoChange} className="mt-2 block w-full rounded-xl border border-dashed border-white/30 bg-black/40 p-4 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-white/15 file:px-3 file:py-2 file:text-white" required />
                <p className="mt-2 text-xs text-slate-400">PNG, JPG, or WebP · Maximum 5 MB</p>
                {photoError && <p className="mt-2 text-sm text-rose-300" role="alert">{photoError}</p>}
              </div>
            </form>
          </section>
          <section aria-label="Live pass preview" className="lg:sticky lg:top-8 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-pixel text-sm font-bold uppercase tracking-widest">Live preview</h2>
              <span className="text-xs text-slate-400">{template.name}</span>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden rounded-3xl border-2 bg-cover bg-no-repeat shadow-2xl" style={{ backgroundImage: `url('/personal-pass-designs-${template.sheet}.png')`, backgroundPosition: template.position, backgroundSize: "300% 200%", borderColor: `${template.accent}90` }}>
              {photoUrl && <img src={photoUrl} alt="Uploaded pass holder" className="absolute object-cover" style={template.photoPosition} />}
              <div className="absolute left-[17%] top-[64%] w-[66%] truncate text-center font-pixel text-[clamp(0.7rem,2.2vw,1.7rem)] font-bold text-slate-950">{name.trim() || "YOUR NAME"}</div>
              <div className="absolute left-[20%] top-[77%] w-[60%] truncate text-center font-pixel text-[clamp(0.55rem,1.5vw,1.2rem)] font-bold text-slate-950">{title.trim() || "YOUR TITLE"}</div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">Your photo stays cropped within the photo area of the selected design.</p>
          </section>
        </div>
      </div>
    </main>
  );
}