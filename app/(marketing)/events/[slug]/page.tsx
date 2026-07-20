import { notFound } from "next/navigation";
import { sql } from "../../../../lib/db";
import { EventsAnimated } from "../../../../components/sections/EventsAnimated";
import { toFeaturedEvent, type EventRow } from "../../../../lib/events";
import { registerForEvent } from "../actions";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ error?: string; registered?: string }>;
};

export default async function EventDetailPage({ params, searchParams }: EventDetailPageProps) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : undefined;

  const [eventRows, pastRows] = await Promise.all([
    sql`
      select id, slug, title, framing, event_date, event_time, action_label, custom_questions, flyer_url, redirect_label, redirect_url, status
      from events
      where slug = ${slug}
    `,
    sql`
      select title, slug, event_date, flyer_url
      from events
      where status = 'past' or event_date < current_date
      order by event_date desc
      limit 6
    `,
  ]);

  const row = eventRows[0] as EventRow | undefined;
  if (!row) notFound();

  const featured = toFeaturedEvent(row);

  const pastSessions = (
    pastRows as { title: string; slug: string; event_date: string; flyer_url: string | null }[]
  ).map((r) => {
    const month = new Date(r.event_date).toLocaleDateString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    return { label: `${month}: ${r.title}`, slug: r.slug, flyerUrl: r.flyer_url };
  });

  const registerAction =
    featured.status === "upcoming" ? registerForEvent.bind(null, featured.id, `/events/${slug}`) : null;

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
