import { redirect } from "next/navigation";
import { WorkspaceAuthForm } from "../../../components/auth/WorkspaceAuthForm";
import { workspaceConfig } from "../../../components/auth/workspace";
import { getSession } from "../../../lib/auth/session";

export default async function OrganizationRegisterPage() {
  const session = await getSession();
  if (session?.workspace === "organization") redirect(workspaceConfig.organization.dashboardPath);

  return <WorkspaceAuthForm mode="organization" action="register" />;
}
