import { AdminShell } from "../../../../../components/admin/AdminShell";
import { createEvent } from "../actions";

type NewEventPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function NewEventPage({ searchParams }: NewEventPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  return (
    <AdminShell>
    <div className="max-w-[36rem]">
      <p className="vs-label mb-4">Events</p>
      <h1 className="vs-title">New event</h1>

      <form action={createEvent} className="vs-card mt-8 space-y-6">
        {error ? (
          <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required className="vs-input mt-3" placeholder="Live Session: ..." />
        </div>

        <div>
          <label htmlFor="framing">Framing (description)</label>
          <textarea id="framing" name="framing" rows={4} required className="vs-textarea mt-3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="event_date">Date</label>
            <input id="event_date" name="event_date" type="date" required className="vs-input mt-3" />
          </div>
          <div>
            <label htmlFor="event_time">Time (display text)</label>
            <input id="event_time" name="event_time" type="text" required className="vs-input mt-3" placeholder="7:00 PM WAT / 2:00 PM ET" />
          </div>
        </div>

        <div>
          <label htmlFor="action_label">Registration button label</label>
          <input
            id="action_label"
            name="action_label"
            type="text"
            className="vs-input mt-3"
            defaultValue="Join VisionSmith to attend"
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" className="vs-input mt-3">
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        <label className="flex items-center gap-3 text-[14px] font-medium text-[color:var(--vs-ink-soft)]">
          <input type="checkbox" name="is_featured" className="h-4 w-4" />
          Feature as the next/current event on the public events page
        </label>

        <button type="submit" className="vs-btn w-full">
          Create event
        </button>
      </form>
    </div>
    </AdminShell>
  );
}
