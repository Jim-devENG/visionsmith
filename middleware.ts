import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./lib/auth";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};

const ADMIN_HOST = "admin.visionsmith.world";
const MAIN_HOSTS = ["visionsmith.world", "www.visionsmith.world"];

export async function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];
  const url = request.nextUrl;
  const isAdminHost = host === ADMIN_HOST;
  const isMainProdHost = MAIN_HOSTS.includes(host);

  // The admin subdomain is the canonical entry point in production — bounce
  // any direct /admin access on the main domain over to it.
  if (isMainProdHost && url.pathname.startsWith("/admin")) {
    const target = new URL(url.pathname + url.search, `https://${ADMIN_HOST}`);
    return NextResponse.redirect(target);
  }

  let pathname = url.pathname;

  // admin.visionsmith.world/events -> internally /admin/events, so admin
  // pages don't need a visible /admin prefix on their own subdomain.
  if (isAdminHost && !pathname.startsWith("/admin")) {
    pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      const loginUrl = url.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname !== url.pathname) {
    const target = url.clone();
    target.pathname = pathname;
    return NextResponse.rewrite(target);
  }

  return NextResponse.next();
}
