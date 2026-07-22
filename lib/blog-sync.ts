import { sql } from "./db";
import { sanitizeRichText } from "./sanitize";
import { SubstackProvider } from "./content-providers/substack";
import type { ContentProvider, NormalizedArticle } from "./content-providers/types";

const PROVIDERS: Record<string, ContentProvider> = {
  substack: new SubstackProvider(),
};

function calculateReadingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function resolveUniqueSlug(baseSlug: string, guid: string) {
  let slug = baseSlug;
  let attempt = 1;

  while (true) {
    const rows = await sql`
      select 1 from blog_posts where slug = ${slug} and (substack_guid is distinct from ${guid}) limit 1
    `;
    if (rows.length === 0) return slug;
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }
}

export function deriveSubscribeUrl(feedUrl: string | null | undefined): string | null {
  if (!feedUrl) return null;
  try {
    return `${new URL(feedUrl).origin}/subscribe`;
  } catch {
    return null;
  }
}

export type SyncResult = {
  ok: boolean;
  imported: number;
  updated: number;
  errors: string[];
};

export async function runBlogSync(options?: { force?: boolean }): Promise<SyncResult> {
  const settingsRows = await sql`select * from blog_sync_settings where id = 1`;
  const settings = settingsRows[0] as
    | { provider: string; rss_feed_url: string | null; auto_sync_enabled: boolean }
    | undefined;

  if (!options?.force && settings && !settings.auto_sync_enabled) {
    return { ok: true, imported: 0, updated: 0, errors: [] };
  }

  const feedUrl = settings?.rss_feed_url?.trim();
  const providerId = settings?.provider ?? "substack";
  const provider = PROVIDERS[providerId];

  if (!feedUrl || !provider) {
    const message = !feedUrl ? "No RSS feed URL configured." : `Unknown provider: ${providerId}`;
    await sql`
      update blog_sync_settings set
        last_synced_at = now(),
        last_sync_status = 'error',
        last_sync_error = ${message}
      where id = 1
    `;
    return { ok: false, imported: 0, updated: 0, errors: [message] };
  }

  let articles: NormalizedArticle[];
  try {
    articles = await provider.fetchArticles(feedUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch or parse the RSS feed.";
    await sql`
      update blog_sync_settings set
        last_synced_at = now(),
        last_sync_status = 'error',
        last_sync_error = ${message}
      where id = 1
    `;
    return { ok: false, imported: 0, updated: 0, errors: [message] };
  }

  let imported = 0;
  let updated = 0;
  const errors: string[] = [];

  for (const article of articles) {
    try {
      const bodyHtml = sanitizeRichText(article.bodyHtml);
      const readingTime = calculateReadingTime(bodyHtml);
      const slug = await resolveUniqueSlug(article.slug, article.guid);

      const existing = await sql`select id from blog_posts where substack_guid = ${article.guid}`;
      const isNew = existing.length === 0;

      await sql`
        insert into blog_posts (
          title, slug, cover_image_url, body_html, excerpt, is_published, published_at,
          source, substack_guid, substack_url, author, reading_time_minutes, tags, category,
          updated_at
        ) values (
          ${article.title}, ${slug}, ${article.coverImageUrl}, ${bodyHtml}, ${article.excerpt}, true, ${article.publishedAt},
          'substack', ${article.guid}, ${article.sourceUrl}, ${article.author}, ${readingTime}, ${JSON.stringify(article.tags)}::jsonb, ${article.category},
          now()
        )
        on conflict (substack_guid) do update set
          title = excluded.title,
          slug = excluded.slug,
          cover_image_url = excluded.cover_image_url,
          body_html = excluded.body_html,
          excerpt = excluded.excerpt,
          published_at = excluded.published_at,
          substack_url = excluded.substack_url,
          author = excluded.author,
          reading_time_minutes = excluded.reading_time_minutes,
          tags = excluded.tags,
          category = excluded.category,
          updated_at = now()
      `;

      if (isNew) imported += 1;
      else updated += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      errors.push(`${article.title}: ${message}`);
    }
  }

  await sql`
    update blog_sync_settings set
      last_synced_at = now(),
      last_sync_status = ${errors.length > 0 && imported === 0 && updated === 0 ? "error" : "success"},
      last_sync_error = ${errors.length > 0 ? errors.join("; ").slice(0, 2000) : null},
      last_sync_imported_count = ${imported},
      last_sync_updated_count = ${updated}
    where id = 1
  `;

  return { ok: true, imported, updated, errors };
}
