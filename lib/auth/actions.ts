"use server";

import { redirect } from "next/navigation";
import { type Workspace, workspaceConfig } from "../../components/auth/workspace";
import { createSession, deleteSession } from "./session";
import { authenticateUser, createUser } from "./users";

export type AuthFormState = { error: string; email: string; name: string } | undefined;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function parseWorkspace(value: FormDataEntryValue | null): Workspace {
  if (value === "personal" || value === "organization") return value;
  throw new Error("Invalid workspace");
}

function readFields(formData: FormData) {
  return {
    workspace: parseWorkspace(formData.get("workspace")),
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const { workspace, email, password } = readFields(formData);

  if (!EMAIL_PATTERN.test(email) || !password) {
    return { error: "Enter your email and password.", email, name: "" };
  }

  const user = await authenticateUser(email, password, workspace);
  if (!user) {
    return { error: "Email or password is incorrect.", email, name: "" };
  }

  await createSession({ userId: user.id, name: user.name, email: user.email, workspace });
  redirect(workspaceConfig[workspace].dashboardPath);
}

export async function register(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const { workspace, name, email, password } = readFields(formData);

  if (!name) return { error: "Enter a display name.", email, name };
  if (!EMAIL_PATTERN.test(email)) return { error: "Enter a valid email address.", email, name };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`, email, name };
  }

  const user = await createUser({ name, email, password, workspace });
  if (!user) {
    return { error: "An account already exists for this email.", email, name };
  }

  await createSession({ userId: user.id, name: user.name, email: user.email, workspace });
  redirect(workspaceConfig[workspace].onboardingPath);
}

export async function logout(formData: FormData) {
  const workspace = parseWorkspace(formData.get("workspace"));
  await deleteSession();
  redirect(workspaceConfig[workspace].loginPath);
}
