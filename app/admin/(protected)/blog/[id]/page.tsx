import { notFound } from "next/navigation";
import { sql } from "../../../../../lib/db";
import { AdminShell } from "../../../../../components/admin/AdminShell";
import { ImageUploadField } from "../../../../../components/admin/ImageUploadField";
import { RichTextEditor } from "../../../../../components/admin/RichTextEditor";
import { updatePost } from "../actions";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function EditPostPage({ params, searchParams }: EditPostPageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const error = sp?.error;

  const rows = await sql`select * from blog_posts where id = ${id}`;
  const post = rows[0] as
    | {
        id: string;
        title: string;
        cover_image_url: string | null;
        body_html: string;
        excerpt: string | null;
        is_published: boolean;
      }
    | undefined;

  if (!post) notFound();

  const boundUpdate = updatePost.bind(null, post.id);

  return (
    <AdminShell>
      <div className="max-w-[42rem]">
        <p className="vs-label mb-4">Blog</p>
        <h1 className="vs-title">Edit post</h1>

        <form action={boundUpdate} className="vs-card mt-8 space-y-6">
          {error ? (
            <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" required defaultValue={post.title} className="vs-input mt-3" />
          </div>

          <div>
            <label htmlFor="excerpt">Excerpt (optional)</label>
            <textarea id="excerpt" name="excerpt" rows={2} maxLength={280} defaultValue={post.excerpt ?? ""} className="vs-textarea mt-3" />
          </div>

          <ImageUploadField name="cover_image_url" label="Cover image" prefix="blog-covers" defaultValue={post.cover_image_url} />

          <div>
            <label>Body</label>
            <div className="mt-3">
              <RichTextEditor name="body_html" defaultValue={post.body_html} />
            </div>
          </div>

          <label className="flex items-center gap-3 text-[14px] font-medium text-[color:var(--vs-ink-soft)]">
            <input type="checkbox" name="is_published" className="h-4 w-4" defaultChecked={post.is_published} />
            Published
          </label>

          <button type="submit" className="vs-btn w-full">
            Save changes
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
