import { NextResponse, type NextRequest } from "next/server";
import { runBlogSync } from "../../../lib/blog-sync";
import { SESSION_COOKIE, verifySessionToken } from "../../../lib/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

async function authorize(request: NextRequest): Promise<"cron" | "admin" | null> {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return "cron";
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  return session ? "admin" : null;
}

export async function GET(request: NextRequest) {
  const via = await authorize(request);
  if (!via) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cron-triggered runs respect the "auto sync enabled" toggle; an admin
  // manually clicking "Import Now" always runs regardless of that setting.
  const result = await runBlogSync({ force: via === "admin" });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
