import Link from "next/link";
import { sql } from "../../../../lib/db";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { ConfirmDeleteButton } from "../../../../components/admin/ConfirmDeleteButton";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await sql`
    select id, title, slug, is_published, published_at, updated_at
    from blog_posts
    order by updated_at desc
  `;

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="vs-label mb-4">Blog</p>
          <h1 className="vs-title">Manage posts</h1>
        </div>
        <Link href="/admin/blog/new" className="vs-btn">
          New post
        </Link>
      </div>

      <div className="mt-10 space-y-4">
        {posts.length === 0 ? (
          <p className="vs-copy">No posts yet. Write the first one.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="vs-card flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="vs-subtitle">{post.title}</h3>
                  <span className="vs-label vs-label-alt">
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="vs-meta mt-2">
                  Updated{" "}
                  {new Date(post.updated_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-5">
                {post.is_published ? (
                  <a href={`https://www.visionsmith.world/blog/${post.slug}`} target="_blank" rel="noreferrer" className="vs-link">
                    View
                  </a>
                ) : null}
                <Link href={`/admin/blog/${post.id}`} className="vs-link">
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deletePost.bind(null, post.id)}
                  confirmMessage={`Delete "${post.title}"? This cannot be undone.`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
