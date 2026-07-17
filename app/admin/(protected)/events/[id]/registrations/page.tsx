import { notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "../../../../../../lib/db";
import { AdminShell } from "../../../../../../components/admin/AdminShell";

type RegistrationsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventRegistrationsPage({ params }: RegistrationsPageProps) {
  const { id } = await params;

  const eventRows = await sql`select id, title from events where id = ${id}`;
  const event = eventRows[0] as { id: string; title: string } | undefined;
  if (!event) notFound();

  const registrations = await sql`
    select full_name, email, note, custom_answers, created_at
    from event_registrations
    where event_id = ${id}
    order by created_at desc
  `;

  return (
    <AdminShell>
    <div>
      <p className="vs-label mb-4">
        <Link href="/admin/events" className="vs-link">
          Events
        </Link>
      </p>
      <h1 className="vs-title">Registrations — {event.title}</h1>
      <p className="vs-copy mt-3">{registrations.length} total</p>

      <div className="mt-8 space-y-3">
        {registrations.length === 0 ? (
          <p className="vs-copy">No registrations yet.</p>
        ) : (
          registrations.map((reg) => (
            <div key={reg.email} className="vs-card">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-[14px] font-semibold text-[color:var(--vs-ink)]">{reg.full_name}</p>
                <p className="vs-meta">
                  {new Date(reg.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="vs-copy mt-1">{reg.email}</p>
              {reg.note ? <p className="vs-meta mt-2">{reg.note}</p> : null}
              {reg.custom_answers && Object.keys(reg.custom_answers).length > 0 ? (
                <dl className="mt-3 space-y-1 border-t border-[color:var(--vs-line)] pt-3">
                  {Object.entries(reg.custom_answers as Record<string, string>).map(([question, answer]) => (
                    <div key={question}>
                      <dt className="vs-meta font-semibold">{question}</dt>
                      <dd className="vs-copy">{answer}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
    </AdminShell>
  );
}
