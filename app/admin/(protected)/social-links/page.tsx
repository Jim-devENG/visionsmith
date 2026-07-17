import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { ConfirmDeleteButton } from "../../../../components/admin/ConfirmDeleteButton";
import { createSocialLink, deleteSocialLink, updateSocialLink } from "./actions";

type SocialLinksPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function SocialLinksPage({ searchParams }: SocialLinksPageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const error = sp?.error;

  const links = (await sql`
    select id, platform, label, url, sort_order, is_visible
    from social_links
    order by sort_order asc
  `) as {
    id: string;
    platform: string;
    label: string;
    url: string;
    sort_order: number;
    is_visible: boolean;
  }[];

  return (
    <AdminShell>
      <p className="vs-label mb-4">Social Links</p>
      <h1 className="vs-title">Manage social links</h1>
      <p className="vs-copy mt-3 max-w-[38rem]">
        These appear in the site footer. Add your X/Instagram/LinkedIn/WhatsApp
        group links here — no code changes needed.
      </p>

      <div className="vs-card mt-8 max-w-[36rem]">
        <p className="vs-label vs-label-alt mb-4">Add a link</p>
        <form action={createSocialLink} className="space-y-4">
          {error ? (
            <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              {error}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="platform">Platform key</label>
              <input id="platform" name="platform" type="text" required placeholder="instagram" className="vs-input mt-3" />
            </div>
            <div>
              <label htmlFor="label">Label</label>
              <input id="label" name="label" type="text" required placeholder="Follow on Instagram" className="vs-input mt-3" />
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <input id="url" name="url" type="url" required placeholder="https://instagram.com/..." className="vs-input mt-3" />
            </div>
          </div>
          <button type="submit" className="vs-btn">
            Add link
          </button>
        </form>
      </div>

      <div className="mt-10 space-y-4">
        {links.length === 0 ? (
          <p className="vs-copy">No social links yet.</p>
        ) : (
          links.map((link) => (
            <form key={link.id} action={updateSocialLink.bind(null, link.id)} className="vs-card">
              <div className="flex flex-wrap items-end gap-4">
                <div className="w-32 shrink-0">
                  <p className="vs-label vs-label-alt">{link.platform}</p>
                </div>
                <div className="min-w-[12rem] flex-1">
                  <label htmlFor={`label-${link.id}`}>Label</label>
                  <input id={`label-${link.id}`} name="label" type="text" defaultValue={link.label} required className="vs-input mt-2" />
                </div>
                <div className="min-w-[16rem] flex-1">
                  <label htmlFor={`url-${link.id}`}>URL</label>
                  <input id={`url-${link.id}`} name="url" type="url" defaultValue={link.url} required className="vs-input mt-2" />
                </div>
                <div className="w-24">
                  <label htmlFor={`sort-${link.id}`}>Order</label>
                  <input id={`sort-${link.id}`} name="sort_order" type="number" defaultValue={link.sort_order} className="vs-input mt-2" />
                </div>
                <label className="flex items-center gap-2 pb-3 text-[13px] font-medium text-[color:var(--vs-ink-soft)]">
                  <input type="checkbox" name="is_visible" defaultChecked={link.is_visible} className="h-4 w-4" />
                  Visible
                </label>
                <div className="flex items-center gap-4 pb-3">
                  <button type="submit" className="vs-btn vs-btn-subtle !py-2 text-[13px]">
                    Save
                  </button>
                </div>
              </div>
            </form>
          ))
        )}
      </div>

      {links.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-4">
          {links.map((link) => (
            <ConfirmDeleteButton
              key={link.id}
              action={deleteSocialLink.bind(null, link.id)}
              confirmMessage={`Remove the ${link.platform} link?`}
              label={`Delete ${link.platform}`}
            />
          ))}
        </div>
      ) : null}
    </AdminShell>
  );
}
