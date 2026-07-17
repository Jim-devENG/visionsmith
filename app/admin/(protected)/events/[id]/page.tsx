import { notFound } from "next/navigation";
import { sql } from "../../../../../lib/db";
import { AdminShell } from "../../../../../components/admin/AdminShell";
import { EventQuestionsField } from "../../../../../components/admin/EventQuestionsField";
import { ImageUploadField } from "../../../../../components/admin/ImageUploadField";
import { updateEvent } from "../actions";

type EditEventPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function EditEventPage({ params, searchParams }: EditEventPageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const error = sp?.error;

  const rows = await sql`select * from events where id = ${id}`;
  const event = rows[0] as
    | {
        id: string;
        title: string;
        framing: string;
        event_date: string;
        event_time: string;
        action_label: string;
        status: string;
        is_featured: boolean;
        custom_questions: string[];
        flyer_url: string | null;
        redirect_label: string | null;
        redirect_url: string | null;
      }
    | undefined;

  if (!event) notFound();

  const dateValue = new Date(event.event_date).toISOString().slice(0, 10);
  const boundUpdate = updateEvent.bind(null, event.id);

  return (
    <AdminShell>
    <div className="max-w-[36rem]">
      <p className="vs-label mb-4">Events</p>
      <h1 className="vs-title">Edit event</h1>

      <form action={boundUpdate} className="vs-card mt-8 space-y-6">
        {error ? (
          <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required defaultValue={event.title} className="vs-input mt-3" />
        </div>

        <div>
          <label htmlFor="framing">Framing (description)</label>
          <textarea id="framing" name="framing" rows={4} required defaultValue={event.framing} className="vs-textarea mt-3" />
        </div>

        <ImageUploadField name="flyer_url" label="Event flyer (optional)" prefix="event-flyers" defaultValue={event.flyer_url} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="event_date">Date</label>
            <input id="event_date" name="event_date" type="date" required defaultValue={dateValue} className="vs-input mt-3" />
          </div>
          <div>
            <label htmlFor="event_time">Time (display text)</label>
            <input id="event_time" name="event_time" type="text" required defaultValue={event.event_time} className="vs-input mt-3" />
          </div>
        </div>

        <div>
          <label htmlFor="action_label">Registration button label</label>
          <input id="action_label" name="action_label" type="text" defaultValue={event.action_label} className="vs-input mt-3" />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={event.status} className="vs-input mt-3">
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        <label className="flex items-center gap-3 text-[14px] font-medium text-[color:var(--vs-ink-soft)]">
          <input type="checkbox" name="is_featured" className="h-4 w-4" defaultChecked={event.is_featured} />
          Feature as the next/current event on the public events page
        </label>

        <EventQuestionsField name="custom_questions" defaultValue={event.custom_questions} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="redirect_label">Next-step link label (optional)</label>
            <input
              id="redirect_label"
              name="redirect_label"
              type="text"
              maxLength={80}
              defaultValue={event.redirect_label ?? ""}
              placeholder="Join the WhatsApp group"
              className="vs-input mt-3"
            />
          </div>
          <div>
            <label htmlFor="redirect_url">Next-step link URL (optional)</label>
            <input
              id="redirect_url"
              name="redirect_url"
              type="url"
              defaultValue={event.redirect_url ?? ""}
              placeholder="https://chat.whatsapp.com/..."
              className="vs-input mt-3"
            />
          </div>
        </div>
        <p className="vs-meta">
          Shown as a button right after someone registers, so they can move straight into
          wherever you want them next.
        </p>

        <button type="submit" className="vs-btn w-full">
          Save changes
        </button>
      </form>
    </div>
    </AdminShell>
  );
}
