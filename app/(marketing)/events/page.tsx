import { sql } from "../../../lib/db";
import { EventsAnimated, type FeaturedEvent } from "../../../components/sections/EventsAnimated";
import { registerForEvent } from "./actions";

type EventsPageProps = {
  searchParams?: Promise<{ error?: string; registered?: string }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const sp = searchParams ? await searchParams : undefined;

  const [featuredRows, pastRows] = await Promise.all([
    sql`
      select id, title, framing, event_date, event_time, action_label
      from events
      where is_featured = true and status = 'upcoming'
      order by event_date asc
      limit 1
    `,
    sql`
      select title, event_date
      from events
      where status = 'past'
      order by event_date desc
      limit 6
    `,
  ]);

  const row = featuredRows[0] as
    | {
        id: string;
        title: string;
        framing: string;
        event_date: string;
        event_time: string;
        action_label: string;
      }
    | undefined;

  const featured: FeaturedEvent | null = row
    ? {
        id: row.id,
        title: row.title,
        framing: row.framing,
        date: new Date(row.event_date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }),
        day: String(new Date(row.event_date).getUTCDate()),
        month: new Date(row.event_date).toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        }),
        time: row.event_time,
        actionLabel: row.action_label,
      }
    : null;

  const pastSessions = (pastRows as { title: string; event_date: string }[]).map((r) => {
    const month = new Date(r.event_date).toLocaleDateString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    return `${month}: ${r.title}`;
  });

  const registerAction = featured ? registerForEvent.bind(null, featured.id) : null;

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
