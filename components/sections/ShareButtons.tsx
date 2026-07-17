"use client";

import { useState } from "react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink, FaCheck } from "react-icons/fa6";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, Icon: FaXTwitter },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, Icon: FaFacebookF },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, Icon: FaLinkedinIn },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, Icon: FaWhatsapp },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="vs-label vs-label-alt">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          title={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--vs-line-strong)] text-[color:var(--vs-ink-soft)] transition-all duration-300 hover:border-[color:var(--vs-accent)] hover:bg-[color:var(--vs-accent)] hover:text-white"
        >
          <Icon size={16} />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--vs-line-strong)] text-[color:var(--vs-ink-soft)] transition-all duration-300 hover:border-[color:var(--vs-accent)] hover:bg-[color:var(--vs-accent)] hover:text-white"
      >
        {copied ? <FaCheck size={14} /> : <FaLink size={14} />}
      </button>
    </div>
  );
}
