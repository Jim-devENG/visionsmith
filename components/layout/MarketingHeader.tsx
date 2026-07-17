"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
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
      <div className="vs-wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/wordicon.png"
            alt="VisionSmith"
            width={669}
            height={373}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="min-w-0 overflow-x-auto">
          <ul className="flex min-w-max items-center gap-1 rounded-[var(--vs-radius-pill)] bg-[color:var(--vs-surface-2)] p-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-block rounded-[var(--vs-radius-pill)] px-4 py-2 text-[13px] font-semibold transition-colors duration-300",
                      active
                        ? "bg-[color:var(--vs-ink)] text-white"
                        : "text-[color:var(--vs-muted)] hover:text-[color:var(--vs-ink)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/join" className="vs-btn shrink-0 !py-2.5 !px-5 text-[13px]">
          Join VisionSmith
        </Link>
      </div>
    </header>
  );
}
