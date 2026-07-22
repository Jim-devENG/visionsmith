import Link from "next/link";

export function BlogModeTabs({ active }: { active: "manual" | "sync" }) {
  return (
    <div className="inline-flex rounded-[var(--vs-radius-pill)] bg-[color:var(--vs-surface-2)] p-1">
      <Link
        href="/admin/blog"
        className={`rounded-[var(--vs-radius-pill)] px-4 py-1.5 text-[13px] font-semibold transition-colors ${
          active === "manual" ? "bg-[color:var(--vs-ink)] text-white" : "text-[color:var(--vs-muted)]"
        }`}
      >
        Manual Posts
      </Link>
      <Link
        href="/admin/blog/sync"
        className={`rounded-[var(--vs-radius-pill)] px-4 py-1.5 text-[13px] font-semibold transition-colors ${
          active === "sync" ? "bg-[color:var(--vs-ink)] text-white" : "text-[color:var(--vs-muted)]"
        }`}
      >
        Substack Sync
      </Link>
    </div>
  );
}
