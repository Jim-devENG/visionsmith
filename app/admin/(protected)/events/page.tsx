import Link from "next/link";
import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { ConfirmDeleteButton } from "../../../../components/admin/ConfirmDeleteButton";
import { deleteEvent } from "./actions";

type AdminEventsPageProps = {
  searchParams?: Promise<{ view?: string }>;
};

export default async function AdminEventsPage({ searchParams }: AdminEventsPageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const view = sp?.view === "past" ? "past" : "upcoming";

  const events =
    view === "past"
      ? await sql`
          select id, title, slug, event_date, status, is_featured
          from events
          where status = 'past' or event_date < current_date
          order by event_date desc
        `
      : await sql`
          select id, title, slug, event_date, status, is_featured
          from events
          where status != 'past' and event_date >= current_date
          order by event_date asc
        `;

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="vs-label mb-4">Events</p>
          <h1 className="vs-title">Manage events</h1>
        </div>
        <Link href="/admin/events/new" className="vs-btn">
          New event
        </Link>
      </div>

      <div className="mt-8 inline-flex rounded-[var(--vs-radius-pill)] bg-[color:var(--vs-surface-2)] p-1">
        <Link
          href="/admin/events?view=upcoming"
          className={`rounded-[var(--vs-radius-pill)] px-4 py-1.5 text-[13px] font-semibold transition-colors ${
            view === "upcoming" ? "bg-[color:var(--vs-ink)] text-white" : "text-[color:var(--vs-muted)]"
          }`}
        >
          Upcoming
        </Link>
        <Link
          href="/admin/events?view=past"
          className={`rounded-[var(--vs-radius-pill)] px-4 py-1.5 text-[13px] font-semibold transition-colors ${
            view === "past" ? "bg-[color:var(--vs-ink)] text-white" : "text-[color:var(--vs-muted)]"
          }`}
        >
          Past
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {events.length === 0 ? (
          <p className="vs-copy">
            {view === "past" ? "No past events yet." : "No upcoming events. Create one."}
          </p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="vs-card flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="vs-subtitle">{event.title}</h3>
                  {event.is_featured ? (
                    <span className="vs-label">Featured</span>
                  ) : null}
                  <span className="vs-label vs-label-alt">{view}</span>
                </div>
                <p className="vs-meta mt-2">
                  {new Date(event.event_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <Link href={`/admin/events/${event.id}/registrations`} className="vs-link">
                  Registrations
                </Link>
                <Link href={`/admin/events/${event.id}`} className="vs-link">
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteEvent.bind(null, event.id)}
                  confirmMessage={`Delete "${event.title}"? This also deletes its registrations.`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
