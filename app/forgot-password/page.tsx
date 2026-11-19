import { redirect } from "next/navigation";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ workspace?: string }>;
}) {
  const { workspace } = await searchParams;
  redirect(`/auth/forgot-password${workspace ? `?workspace=${workspace}` : ""}`);
}
