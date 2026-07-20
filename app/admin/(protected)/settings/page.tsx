import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { updateSiteSettings } from "./actions";

type SettingsPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const error = sp?.error;
  const success = sp?.success;

  const rows = await sql`select contact_email from site_settings where id = 1`;
  const settings = rows[0] as { contact_email: string };

  return (
    <AdminShell>
      <div className="max-w-[36rem]">
        <p className="vs-label mb-4">Settings</p>
        <h1 className="vs-title">Site settings</h1>
        <p className="vs-copy mt-3">This email appears in the site footer under "Connect."</p>

        <form action={updateSiteSettings} className="vs-card mt-8 space-y-6">
          {error ? (
            <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              {error}
            </p>
          ) : null}
          {success ? (
            <p role="status" className="border-l-2 border-[color:var(--vs-accent)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              Settings updated.
            </p>
          ) : null}

          <div>
            <label htmlFor="contact_email">Contact email</label>
            <input
              id="contact_email"
              name="contact_email"
              type="email"
              required
              defaultValue={settings.contact_email}
              className="vs-input mt-3"
            />
          </div>

          <button type="submit" className="vs-btn w-full">
            Save changes
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
