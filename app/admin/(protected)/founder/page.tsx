import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { ImageUploadField } from "../../../../components/admin/ImageUploadField";
import { RichTextEditor } from "../../../../components/admin/RichTextEditor";
import { updateFounderPage } from "./actions";

type FounderAdminPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function FounderAdminPage({ searchParams }: FounderAdminPageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const error = sp?.error;
  const success = sp?.success;

  const rows = await sql`select name, photo_url, body_html from founder_page where id = 1`;
  const founder = rows[0] as { name: string; photo_url: string | null; body_html: string };

  return (
    <AdminShell>
      <div className="max-w-[42rem]">
        <p className="vs-label mb-4">Founder Page</p>
        <h1 className="vs-title">Edit founder page</h1>
        <p className="vs-copy mt-3">
          This text and photo appear on the public{" "}
          <a href="/founder" target="_blank" rel="noreferrer" className="vs-link">
            /founder
          </a>{" "}
          page.
        </p>

        <form action={updateFounderPage} className="vs-card mt-8 space-y-6">
          {error ? (
            <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              {error}
            </p>
          ) : null}
          {success ? (
            <p role="status" className="border-l-2 border-[color:var(--vs-accent)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              Founder page updated.
            </p>
          ) : null}

          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required defaultValue={founder.name} className="vs-input mt-3" />
          </div>

          <ImageUploadField name="photo_url" label="Photo" prefix="founder" defaultValue={founder.photo_url} />

          <div>
            <label>About the founder</label>
            <div className="mt-3">
              <RichTextEditor name="body_html" defaultValue={founder.body_html} />
            </div>
          </div>

          <button type="submit" className="vs-btn w-full">
            Save changes
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
