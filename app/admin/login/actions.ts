"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { sql } from "../../../lib/db";
import { createSessionToken, SESSION_COOKIE } from "../../../lib/auth";
import { checkRateLimit, getClientIp } from "../../../lib/rate-limit";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

function encodeError(message: string) {
  return `/admin/login?error=${encodeURIComponent(message)}`;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(encodeError("Enter email and password."));
  }

  const ip = await getClientIp();
  const allowed = await checkRateLimit(`login:${ip}`, 15, 10 * 60);
  if (!allowed) {
    redirect(encodeError("Too many attempts. Try again in a few minutes."));
  }

  const rows = await sql`
    select id, password_hash, failed_attempts, locked_until from admins where email = ${email}
  `;
  const admin = rows[0] as
    | { id: string; password_hash: string; failed_attempts: number; locked_until: string | null }
    | undefined;

  if (admin?.locked_until && new Date(admin.locked_until) > new Date()) {
    redirect(encodeError("Account temporarily locked. Try again later."));
  }

  const valid = admin ? await bcrypt.compare(password, admin.password_hash) : false;

  if (!admin || !valid) {
    if (admin) {
      const attempts = admin.failed_attempts + 1;
      const lock = attempts >= MAX_FAILED_ATTEMPTS;
      await sql`
        update admins set
          failed_attempts = ${lock ? 0 : attempts},
          locked_until = ${lock ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000).toISOString() : null}
        where id = ${admin.id}
      `;
    }
    redirect(encodeError("Invalid credentials."));
  }

  await sql`update admins set failed_attempts = 0, locked_until = null where id = ${admin.id}`;

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
