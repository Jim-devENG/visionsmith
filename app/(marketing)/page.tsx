import { sql } from "../../lib/db";
import { CurrentFocus } from "../../components/sections/CurrentFocus";
import { Hero } from "../../components/sections/Hero";
import { NextStep } from "../../components/sections/NextStep";
import { Positioning } from "../../components/sections/Positioning";
import { Spotlight, type SpotlightEvent, type SpotlightPost } from "../../components/sections/Spotlight";
import { System } from "../../components/sections/System";
import { StatRow } from "../../components/ui/StatRow";

export default async function MarketingPage() {
  const [eventRows, postRows] = await Promise.all([
    sql`
      select slug, title, flyer_url, event_date, event_time
      from events
      where is_featured = true and status != 'past' and event_date >= current_date
      order by event_date asc
      limit 1
    `,
    sql`
      select slug, title, excerpt, cover_image_url, published_at
      from blog_posts
      where is_published = true
      order by published_at desc
      limit 1
    `,
  ]);

  const eventRow = eventRows[0] as
    | { slug: string; title: string; flyer_url: string | null; event_date: string; event_time: string }
    | undefined;

  const event: SpotlightEvent | null = eventRow
    ? {
        slug: eventRow.slug,
        title: eventRow.title,
        flyerUrl: eventRow.flyer_url,
        date: new Date(eventRow.event_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }),
        time: eventRow.event_time,
      }
    : null;

  const postRow = postRows[0] as
    | { slug: string; title: string; excerpt: string | null; cover_image_url: string | null; published_at: string }
    | undefined;

  const post: SpotlightPost | null = postRow
    ? {
        slug: postRow.slug,
        title: postRow.title,
        excerpt: postRow.excerpt,
        coverImageUrl: postRow.cover_image_url,
        publishedAt: new Date(postRow.published_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }
    : null;

  return (
    <main>
      <Hero />
      <StatRow />
      <Positioning />
      <System />
      <CurrentFocus />
      <Spotlight event={event} post={post} />
      <NextStep />
    </main>
  );
}
