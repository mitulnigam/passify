"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { OrganizationPassBuilder } from "../../../../components/pass/OrganizationPassBuilder";

function BuilderContent() {
  const searchParams = useSearchParams();
  return <OrganizationPassBuilder templateId={searchParams.get("template")} />;
}

export default function OrganizationBuilderPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-950 p-10 text-white">Loading pass builder...</main>}>
      <BuilderContent />
    </Suspense>
  );
}
