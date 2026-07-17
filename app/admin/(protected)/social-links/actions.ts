"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";
import { isSafeHttpUrl } from "../../../../lib/sanitize";

function encodeError(message: string) {
  return `/admin/social-links?error=${encodeURIComponent(message)}`;
}

export async function createSocialLink(formData: FormData) {
  const platform = String(formData.get("platform") ?? "").trim().toLowerCase();
  const label = String(formData.get("label") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!platform || !label || !url) {
    redirect(encodeError("Platform, label, and URL are all required."));
  }

  if (!isSafeHttpUrl(url)) {
    redirect(encodeError("URL must start with http:// or https://"));
  }

  try {
    await sql`
      insert into social_links (platform, label, url, sort_order)
      values (${platform}, ${label}, ${url}, (select coalesce(max(sort_order), 0) + 1 from social_links))
    `;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    redirect(encodeError(code === "23505" ? "That platform is already added." : "Could not add link."));
  }

  revalidatePath("/");
  redirect("/admin/social-links");
}

export async function updateSocialLink(id: string, formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const isVisible = formData.get("is_visible") === "on";

  if (!label || !url) {
    redirect(encodeError("Label and URL are required."));
  }

  if (!isSafeHttpUrl(url)) {
    redirect(encodeError("URL must start with http:// or https://"));
  }

  await sql`
    update social_links set
      label = ${label},
      url = ${url},
      sort_order = ${sortOrder},
      is_visible = ${isVisible}
    where id = ${id}
  `;

  revalidatePath("/");
  redirect("/admin/social-links");
}

export async function deleteSocialLink(id: string) {
  await sql`delete from social_links where id = ${id}`;
  revalidatePath("/");
  redirect("/admin/social-links");
}
