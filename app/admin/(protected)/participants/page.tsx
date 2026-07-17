import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";

export default async function ParticipantsPage() {
  const participants = await sql`
    select full_name, email, intention, source, created_at
    from participants
    order by created_at desc
  `;

  return (
    <AdminShell>
      <p className="vs-label mb-4">Participants</p>
      <h1 className="vs-title">Join submissions</h1>
      <p className="vs-copy mt-3">{participants.length} total</p>

      <div className="mt-8 space-y-3">
        {participants.length === 0 ? (
          <p className="vs-copy">No submissions yet.</p>
        ) : (
          participants.map((p) => (
            <div key={p.email} className="vs-card">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-[14px] font-semibold text-[color:var(--vs-ink)]">{p.full_name}</p>
                <p className="vs-meta">
                  {new Date(p.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="vs-copy mt-1">{p.email}</p>
              {p.intention ? <p className="vs-meta mt-2">{p.intention}</p> : null}
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
