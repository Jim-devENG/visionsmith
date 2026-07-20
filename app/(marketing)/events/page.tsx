import { sql } from "../../../lib/db";
import { EventsAnimated } from "../../../components/sections/EventsAnimated";
import { toFeaturedEvent, type EventRow } from "../../../lib/events";
import { registerForEvent } from "./actions";

type EventsPageProps = {
  searchParams?: Promise<{ error?: string; registered?: string }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const sp = searchParams ? await searchParams : undefined;

  const [featuredRows, pastRows] = await Promise.all([
    sql`
      select id, slug, title, framing, event_date, event_time, action_label, custom_questions, flyer_url, redirect_label, redirect_url, status
      from events
      where is_featured = true and status != 'past' and event_date >= current_date
      order by event_date asc
      limit 1
    `,
    sql`
      select title, slug, event_date
      from events
      where status = 'past' or event_date < current_date
      order by event_date desc
      limit 6
    `,
  ]);

  const row = featuredRows[0] as EventRow | undefined;
  const featured = row ? toFeaturedEvent(row) : null;

  const pastSessions = (pastRows as { title: string; slug: string; event_date: string }[]).map((r) => {
    const month = new Date(r.event_date).toLocaleDateString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    return { label: `${month}: ${r.title}`, slug: r.slug };
  });

  const registerAction =
    featured && featured.status === "upcoming" ? registerForEvent.bind(null, featured.id, "/events") : null;

  return (
    <EventsAnimated
      featured={featured}
      pastSessions={pastSessions}
      registerAction={registerAction}
      error={sp?.error}
      registered={sp?.registered === "1"}
    />
  );
}
