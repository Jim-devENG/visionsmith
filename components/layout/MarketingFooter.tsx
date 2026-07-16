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
    <footer className="vs-section-dark">
      <div className="vs-wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="max-w-[26rem]">
            <p className="text-[19px] font-extrabold tracking-[-0.01em] text-white">
              VisionSmith
            </p>
            <p className="mt-4 text-[15px] leading-7 text-white/60">
              A governed environment for standards, review, and execution.
            </p>
          </div>

          <nav aria-label="Footer routes">
            <p className="vs-label vs-label-on-dark mb-5">Navigate</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-medium text-white/70 transition-colors duration-200 hover:text-[color:var(--vs-accent-2)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="vs-label vs-label-on-dark mb-5">Contact</p>
            <a
              href="mailto:entry@visionsmith.co"
              className="text-[14px] font-medium text-white/70 transition-colors duration-200 hover:text-[color:var(--vs-accent-2)]"
            >
              entry@visionsmith.co
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-[12px] tracking-[0.02em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Every chaos has a pattern.</p>
          <p>&copy; {new Date().getFullYear()} VisionSmith</p>
        </div>
      </div>
    </footer>
  );
}
