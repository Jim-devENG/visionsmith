import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-[color:var(--vs-line)] bg-[color:var(--vs-surface)]">
      <div className="vs-wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="max-w-[26rem]">
            <p className="font-serif text-[19px] font-medium tracking-[-0.01em] text-[color:var(--vs-ink)]">
              VisionSmith
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[color:var(--vs-muted)]">
              A governed environment for standards, review, and execution.
            </p>
          </div>

          <nav aria-label="Footer routes">
            <p className="vs-label mb-5">Navigate</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="vs-link text-[14px] font-medium text-[color:var(--vs-ink-soft)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="vs-label mb-5">Contact</p>
            <a
              href="mailto:entry@visionsmith.co"
              className="vs-link text-[14px] font-medium text-[color:var(--vs-ink-soft)]"
            >
              entry@visionsmith.co
            </a>
          </div>
        </div>

        <div className="vs-rule-top mt-14 flex flex-col gap-3 pt-8 text-[12px] tracking-[0.02em] text-[color:var(--vs-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>Every chaos has a pattern.</p>
          <p>&copy; {new Date().getFullYear()} VisionSmith</p>
        </div>
      </div>
    </footer>
  );
}
