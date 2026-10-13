"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PersonalPassBuilder } from "../../../../components/pass/PersonalPassBuilder";

function BuilderContent() {
  const searchParams = useSearchParams();
  return <PersonalPassBuilder templateId={searchParams.get("template")} />;
}

export default function PersonalBuilderPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-950 p-10 text-white">Loading pass builder...</main>}>
        <BuilderContent />
    </Suspense>
  );
}