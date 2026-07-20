"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/participants", label: "Participants" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/founder", label: "Founder Page" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/account", label: "Account" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname.startsWith(href);
}

// Deliberately a plain component, NOT a Next.js layout.tsx — a layout file at
// this route segment caused Next.js 15.5.14 to intermittently mis-resolve
// other pages' server action redirects. Logout is also deliberately a plain
// GET link to a route handler (app/admin/logout/route.ts), NOT a server
// action: having a second "use server" form (logout) coexist on the same
// page as a page's own form action caused Next.js to resolve submissions of
// the page's own form as if logout had run instead, clearing the session.
export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="vs-admin flex min-h-screen bg-[color:var(--vs-bg)]">
      <aside className="hidden w-52 shrink-0 border-r border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] p-4 lg:block">
        <p className="mb-6 px-1 text-[12px] font-bold tracking-tight text-[color:var(--vs-ink)]">
          VisionSmith
        </p>
        <nav aria-label="Admin">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`vs-admin-nav-item ${isActive(pathname, item.href) ? "vs-admin-nav-item-active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 border-t border-[color:var(--vs-line)] pt-4">
          <a href="/admin/logout" className="vs-admin-nav-item block">
            Log out
          </a>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] px-5 py-3 lg:hidden">
          <p className="text-[12px] font-bold tracking-tight text-[color:var(--vs-ink)]">VisionSmith</p>
          <a href="/admin/logout" className="vs-btn vs-btn-subtle !py-1.5 !px-3 text-[12px]">
            Log out
          </a>
        </header>

        <nav aria-label="Admin (mobile)" className="flex gap-1 overflow-x-auto border-b border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] px-3 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`vs-admin-nav-item shrink-0 ${isActive(pathname, item.href) ? "vs-admin-nav-item-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
