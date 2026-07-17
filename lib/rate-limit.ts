import { headers } from "next/headers";
import { sql } from "./db";

export async function getClientIp() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

/**
 * Sliding-window rate limit backed by Postgres. Returns true if the action
 * is allowed (and records the hit), false if the caller is over the limit.
 */
export async function checkRateLimit(bucket: string, max: number, windowSeconds: number) {
  const windowStart = new Date(Date.now() - windowSeconds * 1000).toISOString();

  const rows = await sql`
    select count(*)::int as count from rate_limit_hits
    where bucket = ${bucket} and created_at > ${windowStart}
  `;
  const count = (rows[0] as { count: number }).count;

  if (count >= max) return false;

  await sql`insert into rate_limit_hits (bucket) values (${bucket})`;

  if (Math.random() < 0.02) {
    await sql`delete from rate_limit_hits where created_at < now() - interval '1 day'`;
  }

  return true;
}
