import type { IconType } from "react-icons";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaTiktok,
  FaThreads,
  FaGithub,
  FaDiscord,
  FaTelegram,
  FaLink,
} from "react-icons/fa6";

const PLATFORM_ICON: Record<string, IconType> = {
  x: FaXTwitter,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  threads: FaThreads,
  github: FaGithub,
  discord: FaDiscord,
  telegram: FaTelegram,
};

export function SocialIcon({ platform }: { platform: string }) {
  const key = platform.trim().toLowerCase();
  const Icon = PLATFORM_ICON[key] ?? FaLink;

  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-all duration-300 group-hover:border-[color:var(--vs-accent-2)] group-hover:bg-[color:var(--vs-accent-2)] group-hover:text-white"
    >
      <Icon size={17} />
    </span>
  );
}
