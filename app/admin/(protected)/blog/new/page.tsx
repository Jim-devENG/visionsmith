import { AdminShell } from "../../../../../components/admin/AdminShell";
import { ImageUploadField } from "../../../../../components/admin/ImageUploadField";
import { RichTextEditor } from "../../../../../components/admin/RichTextEditor";
import { createPost } from "../actions";

type NewPostPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  return (
    <AdminShell>
      <div className="max-w-[42rem]">
        <p className="vs-label mb-4">Blog</p>
        <h1 className="vs-title">New post</h1>

        <form action={createPost} className="vs-card mt-8 space-y-6">
          {error ? (
            <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" required className="vs-input mt-3" placeholder="Post title" />
          </div>

          <div>
            <label htmlFor="excerpt">Excerpt (optional)</label>
            <textarea id="excerpt" name="excerpt" rows={2} maxLength={280} className="vs-textarea mt-3" placeholder="Short summary shown on the blog list." />
          </div>

          <ImageUploadField name="cover_image_url" label="Cover image" prefix="blog-covers" />

          <div>
            <label>Body</label>
            <div className="mt-3">
              <RichTextEditor name="body_html" />
            </div>
          </div>

          <label className="flex items-center gap-3 text-[14px] font-medium text-[color:var(--vs-ink-soft)]">
            <input type="checkbox" name="is_published" className="h-4 w-4" />
            Publish immediately
          </label>

          <button type="submit" className="vs-btn w-full">
            Create post
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
