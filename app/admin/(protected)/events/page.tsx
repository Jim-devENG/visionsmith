import Link from "next/link";
import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { ConfirmDeleteButton } from "../../../../components/admin/ConfirmDeleteButton";
import { deleteEvent } from "./actions";

export default async function AdminEventsPage() {
  const events = await sql`
    select id, title, slug, event_date, status, is_featured
    from events
    order by event_date desc
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

      <div className="mt-10 space-y-4">
        {events.length === 0 ? (
          <p className="vs-copy">No events yet. Create the first one.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="vs-card flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="vs-subtitle">{event.title}</h3>
                  {event.is_featured ? (
                    <span className="vs-label">Featured</span>
                  ) : null}
                  <span className="vs-label vs-label-alt">{event.status}</span>
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
