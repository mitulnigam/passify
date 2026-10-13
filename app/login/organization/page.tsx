import { redirect } from "next/navigation";
import { WorkspaceAuthForm } from "../../../components/auth/WorkspaceAuthForm";
import { workspaceConfig } from "../../../components/auth/workspace";
import { getSession } from "../../../lib/auth/session";

export default async function OrganizationLoginPage() {
  const session = await getSession();
  if (session?.workspace === "organization") redirect(workspaceConfig.organization.dashboardPath);

  return <WorkspaceAuthForm mode="organization" action="login" />;
}
