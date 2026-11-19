import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ workspace?: string }>;
}) {
  const { workspace } = await searchParams;
  redirect(`/auth/update-password${workspace ? `?workspace=${workspace}` : ""}`);
}
