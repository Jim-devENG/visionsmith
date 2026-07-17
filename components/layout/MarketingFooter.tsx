import Image from "next/image";
import Link from "next/link";
import { sql } from "../../lib/db";
import { SocialIcon } from "../ui/SocialIcon";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
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
    <footer className="vs-section-dark relative overflow-hidden">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.16em] left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-[16vw] font-extrabold leading-none tracking-tighter text-white/[0.035]"
      >
        VISIONSMITH
      </p>

      <div className="vs-wrap relative py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-[26rem]">
            <Image
              src="/wordicon.png"
              alt="VisionSmith"
              width={669}
              height={373}
              className="h-20 w-auto"
            />
            <p className="mt-5 text-[15px] leading-7 text-white/60">
              A governed environment for standards, review, and execution.
            </p>
          </div>

          <nav aria-label="Footer routes">
            <p className="vs-label vs-label-on-dark mb-6">Navigate</p>
            <ul className="space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="vs-link text-[14px] font-medium text-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="vs-label vs-label-on-dark mb-6">Connect</p>
            <a
              href="mailto:entry@visionsmith.co"
              className="vs-link text-[14px] font-medium text-white/70"
            >
              entry@visionsmith.co
            </a>

            {socialLinks.length > 0 ? (
              <ul className="mt-7 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={link.label}
                      title={link.label}
                      className="group block"
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[12px] tracking-[0.02em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Every chaos has a pattern.</p>
          <p>&copy; {new Date().getFullYear()} VisionSmith. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
