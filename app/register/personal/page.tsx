import { redirect } from "next/navigation";
import { WorkspaceAuthForm } from "../../../components/auth/WorkspaceAuthForm";
import { workspaceConfig } from "../../../components/auth/workspace";
import { getSession } from "../../../lib/auth/session";

export default async function PersonalRegisterPage() {
  const session = await getSession();
  if (session?.workspace === "personal") redirect(workspaceConfig.personal.dashboardPath);

  return <WorkspaceAuthForm mode="personal" action="register" />;
}
