export type Workspace = "personal" | "organization";

export const workspaceConfig: Record<
  Workspace,
  {
    label: string;
    loginPath: string;
    registerPath: string;
    onboardingPath: string;
    dashboardPath: string;
    accent: string;
    gradient: string;
  }
> = {
  personal: {
    label: "Personal",
    loginPath: "/login/personal",
    registerPath: "/register/personal",
    onboardingPath: "/onboarding/personal",
    dashboardPath: "/dashboard/personal",
    accent: "#ff2d78",
    gradient: "linear-gradient(90deg, #ff2d78, #bf00ff)",
  },
  organization: {
    label: "Organization",
    loginPath: "/login/organization",
    registerPath: "/register/organization",
    onboardingPath: "/onboarding/organization",
    dashboardPath: "/dashboard/organization",
    accent: "#00f5ff",
    gradient: "linear-gradient(90deg, #00f5ff, #0066ff)",
  },
};
