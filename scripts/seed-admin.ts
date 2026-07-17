import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

function generatePassword() {
  return randomBytes(12).toString("base64url");
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set.");

  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (!email) throw new Error("ADMIN_EMAIL is not set.");

  const password = process.env.ADMIN_PASSWORD || generatePassword();
  const hash = await bcrypt.hash(password, 12);

  const sql = neon(databaseUrl);
  await sql`
    insert into admins (email, password_hash)
    values (${email}, ${hash})
    on conflict (email) do update set password_hash = excluded.password_hash
  `;

  console.log("Admin ready:");
  console.log("  email:   ", email);
  console.log("  password:", password);
  console.log("(shown once — store it somewhere safe; re-run this script to rotate it)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
