"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { sql } from "../../../lib/db";
import { createSessionToken, SESSION_COOKIE } from "../../../lib/auth";

function encodeError(message: string) {
  return `/admin/login?error=${encodeURIComponent(message)}`;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(encodeError("Enter email and password."));
  }

  const rows = await sql`select id, password_hash from admins where email = ${email}`;
  const admin = rows[0] as { id: string; password_hash: string } | undefined;

  if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
    redirect(encodeError("Invalid credentials."));
  }

  const token = await createSessionToken(admin.id, email);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}
