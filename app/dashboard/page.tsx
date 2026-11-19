import { redirect } from "next/navigation";
import { getVerifiedUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function DashboardRootPage() {
  const user = await getVerifiedUser();
  if (!user) {
    redirect("/get-started");
  }

  const { data: workspace } = await createAdminClient()
    .from("workspaces")
    .select("workspace_type")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (workspace?.workspace_type === "organization") {
    redirect("/dashboard/organization");
  }

  redirect("/dashboard/personal");
}
