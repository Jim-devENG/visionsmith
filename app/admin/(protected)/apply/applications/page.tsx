import Link from "next/link";
import { sql } from "../../../../../lib/db";
import { AdminShell } from "../../../../../components/admin/AdminShell";
import { StatusSelect } from "../../../../../components/admin/StatusSelect";
import { updateApplicationStatus } from "../actions";

type Application = {
  id: string;
  full_name: string;
  email: string;
  whatsapp: string;
  country: string;
  linkedin: string | null;
  category: string;
  building_description: string;
  biggest_challenge: string;
  situation: string;
  one_thing: string;
  why_stuck: string;
  success_outcome: string;
  commitment: string;
  why_selected: string;
  status: string;
  created_at: string;
};

export default async function ApplicationsPage() {
  const applications = (await sql`
    select * from strategic_session_applications order by created_at desc
  `) as Application[];

  return (
    <AdminShell>
      <p className="vs-label mb-4">
        <Link href="/admin/apply" className="vs-link">
          Strategic Architecture Session
        </Link>
      </p>
      <h1 className="vs-title">Applications</h1>
      <p className="vs-copy mt-3">{applications.length} total</p>

      <div className="mt-8 space-y-4">
        {applications.length === 0 ? (
          <p className="vs-copy">No applications yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="vs-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="vs-subtitle">{app.full_name}</h3>
                    <span className="vs-label vs-label-alt">{app.category}</span>
                  </div>
                  <p className="vs-copy mt-1 text-[0.9rem]">{app.email}</p>
                  <p className="vs-meta mt-1">
                    {app.whatsapp} · {app.country}
                    {app.linkedin ? (
                      <>
                        {" "}
                        ·{" "}
                        <a href={app.linkedin} target="_blank" rel="noreferrer" className="vs-link">
                          LinkedIn
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>
                <StatusSelect
                  action={updateApplicationStatus.bind(null, app.id)}
                  defaultValue={app.status}
                  options={[
                    { value: "new", label: "New" },
                    { value: "reviewed", label: "Reviewed" },
                    { value: "selected", label: "Selected" },
                    { value: "declined", label: "Declined" },
                  ]}
                />
              </div>

              <dl className="mt-5 space-y-4 border-t border-[color:var(--vs-line)] pt-5">
                <div>
                  <dt className="vs-meta font-semibold">What are they building?</dt>
                  <dd className="vs-copy mt-1">{app.building_description}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">Biggest challenge</dt>
                  <dd className="vs-copy mt-1">{app.biggest_challenge}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">Situation</dt>
                  <dd className="vs-copy mt-1">{app.situation}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">If we only solved one thing</dt>
                  <dd className="vs-copy mt-1">{app.one_thing}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">Why they think they're stuck</dt>
                  <dd className="vs-copy mt-1">{app.why_stuck}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">What success looks like</dt>
                  <dd className="vs-copy mt-1">{app.success_outcome}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">Commitment level</dt>
                  <dd className="vs-copy mt-1">{app.commitment}</dd>
                </div>
                <div>
                  <dt className="vs-meta font-semibold">Why they should be selected</dt>
                  <dd className="vs-copy mt-1">{app.why_selected}</dd>
                </div>
              </dl>

              <p className="vs-meta mt-4">
                {new Date(app.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
