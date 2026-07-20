import Link from "next/link";
import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { ImageUploadField } from "../../../../components/admin/ImageUploadField";
import { StringListField } from "../../../../components/admin/StringListField";
import { updateStrategicSession } from "./actions";

type StrategicSessionRow = {
  slug: string;
  status: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image_url: string | null;
  host_name: string;
  host_title: string;
  session_start_date: string | null;
  max_slots: number;
  price_label: string;
  cta_label: string;
  benefits: string[];
  target_audience: string[];
  success_heading: string;
  success_message: string;
  seo_title: string | null;
  seo_description: string | null;
};

type ApplyAdminPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function ApplyAdminPage({ searchParams }: ApplyAdminPageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const error = sp?.error;
  const success = sp?.success;

  const rows = await sql`select * from strategic_sessions where id = 1`;
  const session = rows[0] as StrategicSessionRow;

  const applicationCount = await sql`select count(*)::int as count from strategic_session_applications`;
  const count = (applicationCount[0] as { count: number }).count;

  const dateValue = session.session_start_date
    ? new Date(session.session_start_date).toISOString().slice(0, 10)
    : "";

  return (
    <AdminShell>
      <div className="max-w-[46rem]">
        <p className="vs-label mb-4">Private campaign</p>
        <h1 className="vs-title">Strategic Architecture Session</h1>
        <p className="vs-copy mt-3">
          This page is not linked from any public navigation. Share it directly:{" "}
          <a
            href={`/apply/${session.slug}`}
            target="_blank"
            rel="noreferrer"
            className="vs-link"
          >
            visionsmith.world/apply/{session.slug}
          </a>
        </p>
        <p className="vs-copy mt-2">
          <Link href="/admin/apply/applications" className="vs-link">
            View applications ({count})
          </Link>
        </p>

        <form action={updateStrategicSession} className="vs-card mt-8 space-y-6">
          {error ? (
            <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              {error}
            </p>
          ) : null}
          {success ? (
            <p role="status" className="border-l-2 border-[color:var(--vs-accent)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              Saved.
            </p>
          ) : null}

          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={session.status} className="vs-input mt-3">
              <option value="draft">Draft (page returns 404)</option>
              <option value="open">Open (accepting applications)</option>
              <option value="closed">Closed (page visible, applications closed)</option>
            </select>
          </div>

          <div>
            <label htmlFor="slug">URL slug</label>
            <input id="slug" name="slug" type="text" required defaultValue={session.slug} className="vs-input mt-3" />
            <p className="vs-meta mt-2">Public URL: /apply/&#123;slug&#125;</p>
          </div>

          <div>
            <label htmlFor="hero_title">Hero title</label>
            <input id="hero_title" name="hero_title" type="text" required defaultValue={session.hero_title} className="vs-input mt-3" />
          </div>

          <div>
            <label htmlFor="hero_subtitle">Hero subtitle</label>
            <input id="hero_subtitle" name="hero_subtitle" type="text" defaultValue={session.hero_subtitle} className="vs-input mt-3" />
          </div>

          <div>
            <label htmlFor="hero_description">Hero description</label>
            <textarea id="hero_description" name="hero_description" rows={3} defaultValue={session.hero_description} className="vs-textarea mt-3" />
          </div>

          <ImageUploadField name="hero_image_url" label="Hero image (optional)" prefix="apply" defaultValue={session.hero_image_url} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="host_name">Host name</label>
              <input id="host_name" name="host_name" type="text" required defaultValue={session.host_name} className="vs-input mt-3" />
            </div>
            <div>
              <label htmlFor="host_title">Host title</label>
              <input id="host_title" name="host_title" type="text" defaultValue={session.host_title} className="vs-input mt-3" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="session_start_date">Sessions begin</label>
              <input id="session_start_date" name="session_start_date" type="date" defaultValue={dateValue} className="vs-input mt-3" />
            </div>
            <div>
              <label htmlFor="max_slots">Max slots</label>
              <input id="max_slots" name="max_slots" type="number" min={1} defaultValue={session.max_slots} className="vs-input mt-3" />
            </div>
            <div>
              <label htmlFor="price_label">Price badge</label>
              <input id="price_label" name="price_label" type="text" defaultValue={session.price_label} className="vs-input mt-3" />
            </div>
          </div>

          <div>
            <label htmlFor="cta_label">Call to action label</label>
            <input id="cta_label" name="cta_label" type="text" defaultValue={session.cta_label} className="vs-input mt-3" />
          </div>

          <StringListField
            name="target_audience"
            label="Who this is for (checklist)"
            defaultValue={session.target_audience}
            placeholder="e.g. Are building a business"
          />

          <StringListField
            name="benefits"
            label="What they'll leave with"
            defaultValue={session.benefits}
            placeholder="e.g. Greater clarity"
          />

          <div>
            <label htmlFor="success_heading">Success screen heading</label>
            <input id="success_heading" name="success_heading" type="text" defaultValue={session.success_heading} className="vs-input mt-3" />
          </div>

          <div>
            <label htmlFor="success_message">Success screen message</label>
            <textarea id="success_message" name="success_message" rows={3} defaultValue={session.success_message} className="vs-textarea mt-3" />
          </div>

          <div>
            <label htmlFor="seo_title">SEO title (optional)</label>
            <input id="seo_title" name="seo_title" type="text" defaultValue={session.seo_title ?? ""} className="vs-input mt-3" />
          </div>

          <div>
            <label htmlFor="seo_description">SEO description (optional)</label>
            <textarea id="seo_description" name="seo_description" rows={2} defaultValue={session.seo_description ?? ""} className="vs-textarea mt-3" />
          </div>

          <button type="submit" className="vs-btn w-full">
            Save changes
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
