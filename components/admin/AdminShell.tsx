import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/founder", label: "Founder Page" },
  { href: "/admin/account", label: "Account" },
];

// Deliberately a plain component, NOT a Next.js layout.tsx — a layout file at
// this route segment caused Next.js 15.5.14 to intermittently mis-resolve
// other pages' server action redirects. Logout is also deliberately a plain
// GET link to a route handler (app/admin/logout/route.ts), NOT a server
// action: having a second "use server" form (logout) coexist on the same
// page as a page's own form action caused Next.js to resolve submissions of
// the page's own form as if logout had run instead, clearing the session.
export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[color:var(--vs-bg)]">
      <aside className="hidden w-60 shrink-0 border-r border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] p-6 lg:block">
        <p className="vs-label mb-8">VisionSmith Admin</p>
        <nav aria-label="Admin">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-[var(--vs-radius-sm)] px-3 py-2 text-[14px] font-medium text-[color:var(--vs-muted)] transition-colors hover:bg-[color:var(--vs-surface-2)] hover:text-[color:var(--vs-ink)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 border-t border-[color:var(--vs-line)] pt-6">
          <a href="/admin/logout" className="vs-btn vs-btn-subtle block w-full !py-2 text-center text-[13px]">
            Log out
          </a>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] px-6 py-4 lg:hidden">
          <p className="vs-label">VisionSmith Admin</p>
          <a href="/admin/logout" className="vs-btn vs-btn-subtle !py-2 !px-4 text-[13px]">
            Log out
          </a>
        </header>

        <nav aria-label="Admin (mobile)" className="flex gap-1 overflow-x-auto border-b border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] px-4 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-[var(--vs-radius-sm)] px-3 py-1.5 text-[13px] font-medium text-[color:var(--vs-muted)] hover:bg-[color:var(--vs-surface-2)] hover:text-[color:var(--vs-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
