"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getServerEnv } from "@/lib/config/server";
import { ApiError } from "@/lib/http/errors";
import { loginSchema, signupSchema, recoverySchema, passwordUpdateSchema } from "@/lib/validation/auth";
import { workspaceTypeSchema } from "@/lib/validation/common";
import { provisionWorkspace } from "@/lib/services/workspace.service";
import { rateLimit } from "@/lib/services/rate-limit.service";
import { workspaceConfig } from "@/components/auth/workspace";
import { requireUser } from "./session";
import { assertActionOrigin } from "./action-guard";
import { authDestination, callbackUrl } from "./redirects";

export type AuthFormState = { error?: string; message?: string; email?: string; name?: string } | undefined;

function field(form: FormData, name: string) {
  return String(form.get(name) ?? "");
}

function feedback(error: unknown): AuthFormState {
  if (error instanceof ZodError) return { error: "Check your fields. Passwords must be 8–128 characters and confirmation must match." };
  if (error instanceof ApiError) return { error: error.message };
  return { error: "The service is temporarily unavailable. Please try again." };
}

function checkAuthError(error: { status?: number; code?: string } | null, message: string) {
  if (!error) return;
  if (error.status === 429) throw new ApiError("RATE_LIMITED", "Too many attempts. Please try again later.");
  if (!error.status || error.status >= 500) throw new ApiError("UNAVAILABLE", "Authentication is temporarily unavailable.");
  throw new ApiError("INVALID_INPUT", message);
}

export async function login(_previous: AuthFormState, form: FormData): Promise<AuthFormState> {
  let destination: string;
  try {
    await assertActionOrigin();
    const body = loginSchema.parse({ workspace: field(form, "workspace"), email: field(form, "email"), password: field(form, "password") });
    await rateLimit("login", body.email, 10, 900);
    const auth = await createClient();
    const { error } = await auth.auth.signInWithPassword({ email: body.email, password: body.password });
    checkAuthError(error, "Email or password is incorrect, or your email still needs confirmation.");
    const workspace = await provisionWorkspace(body.workspace);
    destination = authDestination(body.workspace, workspace.onboarding_completed);
  } catch (error) {
    return { ...feedback(error), email: field(form, "email").slice(0, 254) };
  }
  redirect(destination);
}

export async function register(_previous: AuthFormState, form: FormData): Promise<AuthFormState> {
  let destination: string;
  try {
    await assertActionOrigin();
    const body = signupSchema.parse({ workspace: field(form, "workspace"), name: field(form, "name"), email: field(form, "email"), password: field(form, "password") });
    await rateLimit("signup", body.email, 5, 3600);
    const auth = await createClient();
    const { data, error } = await auth.auth.signUp({
      email: body.email,
      password: body.password,
      options: { data: { full_name: body.name }, emailRedirectTo: callbackUrl(getServerEnv().APP_URL, body.workspace, "signup") },
    });
    checkAuthError(error, "Account creation could not be completed. If you already have an account, sign in or reset your password.");
    if (!data.session) return { message: "Check your inbox to confirm your email, then continue in this browser. If already registered, sign in instead." };
    const workspace = await provisionWorkspace(body.workspace);
    destination = authDestination(body.workspace, workspace.onboarding_completed);
  } catch (error) {
    return { ...feedback(error), email: field(form, "email").slice(0, 254), name: field(form, "name").slice(0, 100) };
  }
  redirect(destination);
}

export async function selectWorkspace(_previous: AuthFormState, form: FormData): Promise<AuthFormState> {
  let destination: string;
  try {
    await assertActionOrigin();
    const user = await requireUser();
    const type = workspaceTypeSchema.parse(form.get("workspace"));
    await rateLimit("workspace", user.id, 20, 600);
    const workspace = await provisionWorkspace(type);
    destination = authDestination(type, workspace.onboarding_completed);
  } catch (error) {
    return feedback(error);
  }
  redirect(destination);
}

export async function requestPasswordReset(_previous: AuthFormState, form: FormData): Promise<AuthFormState> {
  try {
    await assertActionOrigin();
    const body = recoverySchema.parse({ workspace: field(form, "workspace"), email: field(form, "email") });
    await rateLimit("recovery", body.email, 5, 3600);
    const auth = await createClient();
    const { error } = await auth.auth.resetPasswordForEmail(body.email, { redirectTo: callbackUrl(getServerEnv().APP_URL, body.workspace, "recovery") });
    if (error && (error.status === 429 || !error.status || error.status >= 500)) checkAuthError(error, "Recovery is temporarily unavailable.");
    return { message: "If an account exists, a recovery link is on its way. Open it in this browser." };
  } catch (error) {
    return feedback(error);
  }
}

export async function updatePassword(_previous: AuthFormState, form: FormData): Promise<AuthFormState> {
  let destination: string;
  try {
    await assertActionOrigin();
    const user = await requireUser();
    const body = passwordUpdateSchema.parse({ workspace: field(form, "workspace"), password: field(form, "password"), confirmPassword: field(form, "confirmPassword") });
    await rateLimit("password", user.id, 5, 3600);
    const auth = await createClient();
    const { error } = await auth.auth.updateUser({ password: body.password });
    checkAuthError(error, "Password could not be changed. Use a new recovery link and choose a different password.");
    const signOut = await auth.auth.signOut({ scope: "global" });
    checkAuthError(signOut.error, "Password changed, but sign-out did not finish. Please sign out and sign in again.");
    destination = `${workspaceConfig[body.workspace].loginPath}?password=updated`;
  } catch (error) {
    return feedback(error);
  }
  redirect(destination);
}

export async function logout(_previous: AuthFormState, form: FormData): Promise<AuthFormState> {
  let destination: string;
  try {
    await assertActionOrigin();
    const type = workspaceTypeSchema.parse(form.get("workspace"));
    const auth = await createClient();
    const { error } = await auth.auth.signOut({ scope: "local" });
    checkAuthError(error, "Sign-out did not finish. Please try again.");
    (await cookies()).delete("passify_session");
    destination = workspaceConfig[type].loginPath;
  } catch (error) {
    return feedback(error);
  }
  redirect(destination);
}
