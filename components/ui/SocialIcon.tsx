const PLATFORM_ABBR: Record<string, string> = {
  x: "X",
  twitter: "X",
  instagram: "IG",
  linkedin: "IN",
  facebook: "FB",
  whatsapp: "WA",
  youtube: "YT",
  tiktok: "TT",
  threads: "TH",
  github: "GH",
  discord: "DC",
};

export function SocialIcon({ platform }: { platform: string }) {
  const key = platform.trim().toLowerCase();
  const label = PLATFORM_ABBR[key] ?? key.slice(0, 2).toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[12px] font-bold tracking-[0.02em] text-white/80 transition-all duration-300 group-hover:border-[color:var(--vs-accent-2)] group-hover:bg-[color:var(--vs-accent-2)] group-hover:text-white"
    >
      {label}
    </span>
  );
}
