"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";
import { isSafeHttpUrl, sanitizeRichText } from "../../../../lib/sanitize";

export async function updateFounderPage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const photoUrl = String(formData.get("photo_url") ?? "").trim();
  const bodyHtml = String(formData.get("body_html") ?? "").trim();

  if (!name) {
    redirect("/admin/founder?error=" + encodeURIComponent("Name is required."));
  }

  await sql`
    update founder_page set
      name = ${name},
      photo_url = ${photoUrl && isSafeHttpUrl(photoUrl) ? photoUrl : null},
      body_html = ${sanitizeRichText(bodyHtml)},
      updated_at = now()
    where id = 1
  `;

  revalidatePath("/about");
  redirect("/admin/founder?success=1");
}
