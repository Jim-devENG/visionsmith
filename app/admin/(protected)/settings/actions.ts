"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";

export async function updateSiteSettings(formData: FormData) {
  const contactEmail = String(formData.get("contact_email") ?? "").trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(contactEmail)) {
    redirect("/admin/settings?error=" + encodeURIComponent("Enter a valid email address."));
  }

  await sql`
    update site_settings set
      contact_email = ${contactEmail},
      updated_at = now()
    where id = 1
  `;

  revalidatePath("/", "layout");
  redirect("/admin/settings?success=1");
}
