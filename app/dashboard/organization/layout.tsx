import type { ReactNode } from "react";
import { requireSession } from "../../../lib/auth/session";

export default async function OrganizationDashboardLayout({ children }: { children: ReactNode }) {
  await requireSession("organization");
  return children;
}
