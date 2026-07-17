import Image from "next/image";
import Link from "next/link";
import { sql } from "../../lib/db";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/founder", label: "Founder" },
  { href: "/join", label: "Join" },
];

export async function MarketingFooter() {
  const socialLinks = (await sql`
    select platform, label, url
    from social_links
    where is_visible = true
    order by sort_order asc
  `) as { platform: string; label: string; url: string }[];

  return (
    <footer className="vs-section-dark">
      <div className="vs-wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="max-w-[26rem]">
            <Image
              src="/wordicon.png"
              alt="VisionSmith"
              width={669}
              height={373}
              className="h-14 w-auto"
            />
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

            {socialLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13px] font-medium text-white/60 transition-colors duration-200 hover:text-[color:var(--vs-accent-2)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
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
