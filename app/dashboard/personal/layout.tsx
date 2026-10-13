import type { ReactNode } from "react";
import { requireSession } from "../../../lib/auth/session";

export default async function PersonalDashboardLayout({ children }: { children: ReactNode }) {
  await requireSession("personal");
  return children;
}
