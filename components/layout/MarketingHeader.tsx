"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function MarketingHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 vs-glass">
      <div className="vs-wrap flex h-[4.25rem] items-center justify-between gap-10">
        <Link
          href="/"
          className="shrink-0 font-serif text-[15px] font-medium tracking-[-0.01em] text-[color:var(--vs-ink)]"
        >
          VisionSmith
        </Link>

        <nav aria-label="Primary" className="min-w-0 overflow-x-auto">
          <ul className="flex min-w-max items-center gap-8">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative inline-block py-2 text-[13px] font-medium tracking-[0.01em] transition-colors duration-300",
                      active
                        ? "text-[color:var(--vs-ink)]"
                        : "text-[color:var(--vs-muted)] hover:text-[color:var(--vs-ink)]",
                    ].join(" ")}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[1px] left-0 h-px bg-[color:var(--vs-accent)] transition-all duration-300"
                      style={{ width: active ? "100%" : "0%" }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
