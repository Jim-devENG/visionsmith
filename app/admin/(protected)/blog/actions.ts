"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";
import { slugify } from "../../../../lib/slug";
import { isSafeHttpUrl, sanitizeRichText } from "../../../../lib/sanitize";

type PostInput = {
  title: string;
  cover_image_url: string | null;
  body_html: string;
  excerpt: string | null;
  is_published: boolean;
};

function readPostInput(formData: FormData): PostInput {
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const bodyHtml = String(formData.get("body_html") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    cover_image_url: coverImageUrl && isSafeHttpUrl(coverImageUrl) ? coverImageUrl : null,
    body_html: sanitizeRichText(bodyHtml),
    excerpt: excerpt ? excerpt.slice(0, 280) : null,
    is_published: formData.get("is_published") === "on",
  };
}

export async function createPost(formData: FormData) {
  const input = readPostInput(formData);

  if (!input.title || !input.body_html) {
    redirect("/admin/blog/new?error=" + encodeURIComponent("Title and body are required."));
  }

  const slug = slugify(input.title);
  const publishedAt = input.is_published ? new Date().toISOString() : null;

  await sql`
    insert into blog_posts (title, slug, cover_image_url, body_html, excerpt, is_published, published_at)
    values (${input.title}, ${slug}, ${input.cover_image_url}, ${input.body_html}, ${input.excerpt}, ${input.is_published}, ${publishedAt})
  `;

  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const input = readPostInput(formData);

  if (!input.title || !input.body_html) {
    redirect(`/admin/blog/${id}?error=` + encodeURIComponent("Title and body are required."));
  }

  const existing = await sql`select is_published, published_at from blog_posts where id = ${id}`;
  const wasPublished = Boolean(existing[0]?.is_published);
  const publishedAt =
    input.is_published && !wasPublished
      ? new Date().toISOString()
      : (existing[0]?.published_at ?? null);

  await sql`
    update blog_posts set
      title = ${input.title},
      cover_image_url = ${input.cover_image_url},
      body_html = ${input.body_html},
      excerpt = ${input.excerpt},
      is_published = ${input.is_published},
      published_at = ${input.is_published ? publishedAt : existing[0]?.published_at ?? null},
      updated_at = now()
    where id = ${id}
  `;

  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  await sql`delete from blog_posts where id = ${id}`;
  revalidatePath("/blog");
  redirect("/admin/blog");
}
