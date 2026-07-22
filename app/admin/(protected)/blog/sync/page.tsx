import { sql } from "../../../../../lib/db";
import { AdminShell } from "../../../../../components/admin/AdminShell";
import { BlogModeTabs } from "../../../../../components/admin/BlogModeTabs";
import { ConfirmDeleteButton } from "../../../../../components/admin/ConfirmDeleteButton";
import { deleteSyncedPost, triggerBlogSync, updateBlogSyncSettings } from "../actions";

type SyncSettings = {
  rss_feed_url: string | null;
  auto_sync_enabled: boolean;
  last_synced_at: string | null;
  last_sync_status: string;
  last_sync_error: string | null;
  last_sync_imported_count: number;
  last_sync_updated_count: number;
};

type SyncedPost = {
  id: string;
  title: string;
  slug: string;
  author: string | null;
  published_at: string;
  substack_url: string | null;
};

type SyncPageProps = {
  searchParams?: Promise<{ error?: string; success?: string; synced?: string; imported?: string; updated?: string; syncError?: string }>;
};

export default async function BlogSyncPage({ searchParams }: SyncPageProps) {
  const sp = searchParams ? await searchParams : undefined;

  const [settingsRows, postsRows, totalRows] = await Promise.all([
    sql`select * from blog_sync_settings where id = 1`,
    sql`select id, title, slug, author, published_at, substack_url from blog_posts where source = 'substack' order by published_at desc`,
    sql`select count(*)::int as count from blog_posts where source = 'substack'`,
  ]);

  const settings = settingsRows[0] as SyncSettings;
  const posts = postsRows as SyncedPost[];
  const totalImported = (totalRows[0] as { count: number }).count;

  return (
    <AdminShell>
      <p className="vs-label mb-4">Blog</p>
      <h1 className="vs-title">Substack Sync</h1>
      <p className="vs-copy mt-3 max-w-[38rem]">
        Articles published on Substack are imported automatically and appear on the public
        blog alongside manually written posts.
      </p>

      <div className="mt-8">
        <BlogModeTabs active="sync" />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="vs-card">
          <p className="vs-stat-value">{totalImported}</p>
          <p className="vs-stat-label mt-2">Imported articles</p>
        </div>
        <div className="vs-card">
          <p className="vs-stat-value">{settings.last_sync_status === "success" ? "OK" : settings.last_sync_status === "error" ? "Error" : "—"}</p>
          <p className="vs-stat-label mt-2">Feed status</p>
        </div>
        <div className="vs-card">
          <p className="vs-stat-value">{settings.last_sync_imported_count}</p>
          <p className="vs-stat-label mt-2">New (last sync)</p>
        </div>
        <div className="vs-card">
          <p className="vs-stat-value">{settings.last_sync_updated_count}</p>
          <p className="vs-stat-label mt-2">Updated (last sync)</p>
        </div>
      </div>

      <div className="mt-6 vs-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="vs-label vs-label-alt mb-2">Last sync</p>
            <p className="vs-copy">
              {settings.last_synced_at
                ? new Date(settings.last_synced_at).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : "Never synced yet."}
            </p>
            {settings.last_sync_error ? (
              <p className="mt-2 text-[13px] leading-6 text-[color:var(--vs-accent-strong)]">
                {settings.last_sync_error}
              </p>
            ) : null}
          </div>
          <form action={triggerBlogSync}>
            <button type="submit" className="vs-btn">
              Import Now
            </button>
          </form>
        </div>
        {sp?.synced ? (
          <p role="status" className="mt-4 text-[13px] leading-6 text-[color:var(--vs-accent-strong)]">
            Sync complete — {sp.imported} new, {sp.updated} updated.
          </p>
        ) : null}
        {sp?.syncError ? (
          <p role="alert" className="mt-4 text-[13px] leading-6 text-[color:var(--vs-accent-strong)]">
            {sp.syncError}
          </p>
        ) : null}
      </div>

      <form action={updateBlogSyncSettings} className="vs-card mt-6 max-w-[38rem] space-y-6">
        {sp?.error ? (
          <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            {sp.error}
          </p>
        ) : null}
        {sp?.success ? (
          <p role="status" className="border-l-2 border-[color:var(--vs-accent)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            Settings saved.
          </p>
        ) : null}

        <div>
          <label htmlFor="rss_feed_url">RSS feed URL</label>
          <input
            id="rss_feed_url"
            name="rss_feed_url"
            type="url"
            defaultValue={settings.rss_feed_url ?? ""}
            placeholder="https://yourpublication.substack.com/feed"
            className="vs-input mt-3"
          />
        </div>

        <label className="flex items-center gap-3 text-[14px] font-medium text-[color:var(--vs-ink-soft)]">
          <input type="checkbox" name="auto_sync_enabled" className="h-4 w-4" defaultChecked={settings.auto_sync_enabled} />
          Auto sync enabled (checks the feed automatically on a schedule)
        </label>

        <button type="submit" className="vs-btn w-full">
          Save settings
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {posts.length === 0 ? (
          <p className="vs-copy">No articles imported yet. Add a feed URL above and click Import Now.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="vs-card flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="vs-subtitle">{post.title}</h3>
                  <span className="vs-label vs-label-alt">Substack</span>
                </div>
                <p className="vs-meta mt-2">
                  {post.author ? `${post.author} · ` : ""}
                  {new Date(post.published_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <a href={`https://www.visionsmith.world/blog/${post.slug}`} target="_blank" rel="noreferrer" className="vs-link">
                  View
                </a>
                <ConfirmDeleteButton
                  action={deleteSyncedPost.bind(null, post.id)}
                  confirmMessage={`Delete "${post.title}"? It will reappear on the next sync unless removed from the feed.`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
