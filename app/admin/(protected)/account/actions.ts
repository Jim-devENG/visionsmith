"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { sql } from "../../../../lib/db";
import { SESSION_COOKIE, verifySessionToken } from "../../../../lib/auth";

function encodeError(message: string) {
  return `/admin/account?error=${encodeURIComponent(message)}`;
}

export async function changePassword(formData: FormData) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/admin/login");

  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (newPassword.length < 8) {
    redirect(encodeError("New password must be at least 8 characters."));
  }

  if (newPassword !== confirmPassword) {
    redirect(encodeError("New passwords do not match."));
  }

  const rows = await sql`select password_hash from admins where id = ${session.sub}`;
  const admin = rows[0] as { password_hash: string } | undefined;

  if (!admin || !(await bcrypt.compare(currentPassword, admin.password_hash))) {
    redirect(encodeError("Current password is incorrect."));
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  await sql`update admins set password_hash = ${newHash} where id = ${session.sub}`;

  redirect("/admin/account?success=1");
}
