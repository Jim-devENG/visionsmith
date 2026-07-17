"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 vs-glass">
      <div className="vs-wrap flex h-20 items-center justify-between gap-4 lg:h-[6.5rem] lg:gap-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/wordicon.png"
            alt="VisionSmith"
            width={669}
            height={373}
            priority
            className="h-14 w-auto lg:h-20"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-[var(--vs-radius-pill)] bg-[color:var(--vs-surface-2)] p-1">
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

        <div className="hidden lg:block">
          <Link href="/join" className="vs-btn shrink-0 !py-2.5 !px-5 text-[13px]">
            Build with Clarity
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--vs-line-strong)] transition-colors hover:border-[color:var(--vs-accent)] lg:hidden"
        >
          <span className="relative block h-4 w-5 text-[color:var(--vs-ink)]">
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 block h-[1.5px] w-5 bg-current"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 bg-current"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 block h-[1.5px] w-5 bg-current"
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[color:var(--vs-line)] lg:hidden"
          >
            <nav aria-label="Mobile primary" className="vs-wrap flex flex-col gap-1 py-4">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "rounded-[var(--vs-radius-sm)] px-4 py-3 text-[15px] font-semibold transition-colors",
                      active
                        ? "bg-[color:var(--vs-ink)] text-white"
                        : "text-[color:var(--vs-ink-soft)] hover:bg-[color:var(--vs-surface-2)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/join" className="vs-btn mt-3 w-full">
                Build with Clarity
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
