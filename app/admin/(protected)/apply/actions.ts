"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";
import { isSafeHttpUrl } from "../../../../lib/sanitize";
import { slugify } from "../../../../lib/slug";

function parseStringList(formData: FormData, field: string) {
  try {
    const raw = JSON.parse(String(formData.get(field) ?? "[]"));
    if (!Array.isArray(raw)) return [];
    return raw.map((item) => String(item).trim().slice(0, 140)).filter(Boolean).slice(0, 12);
  } catch {
    return [];
  }
}

export async function updateStrategicSession(formData: FormData) {
  const heroTitle = String(formData.get("hero_title") ?? "").trim();
  const heroSubtitle = String(formData.get("hero_subtitle") ?? "").trim();
  const heroDescription = String(formData.get("hero_description") ?? "").trim();
  const heroImageUrl = String(formData.get("hero_image_url") ?? "").trim();
  const hostName = String(formData.get("host_name") ?? "").trim();
  const hostTitle = String(formData.get("host_title") ?? "").trim();
  const sessionStartDate = String(formData.get("session_start_date") ?? "").trim();
  const maxSlots = Number(formData.get("max_slots") ?? 10) || 10;
  const priceLabel = String(formData.get("price_label") ?? "").trim() || "Free";
  const ctaLabel = String(formData.get("cta_label") ?? "").trim() || "Request My Session";
  const successHeading = String(formData.get("success_heading") ?? "").trim();
  const successMessage = String(formData.get("success_message") ?? "").trim();
  const seoTitle = String(formData.get("seo_title") ?? "").trim();
  const seoDescription = String(formData.get("seo_description") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!heroTitle || !hostName) {
    redirect("/admin/apply?error=" + encodeURIComponent("Hero title and host name are required."));
  }

  const slug = slugInput ? slugify(slugInput) : "strategic-architecture-session";
  const benefits = parseStringList(formData, "benefits");
  const targetAudience = parseStringList(formData, "target_audience");

  await sql`
    update strategic_sessions set
      slug = ${slug},
      status = ${status},
      hero_title = ${heroTitle},
      hero_subtitle = ${heroSubtitle},
      hero_description = ${heroDescription},
      hero_image_url = ${heroImageUrl && isSafeHttpUrl(heroImageUrl) ? heroImageUrl : null},
      host_name = ${hostName},
      host_title = ${hostTitle},
      session_start_date = ${sessionStartDate || null},
      max_slots = ${maxSlots},
      price_label = ${priceLabel},
      cta_label = ${ctaLabel},
      benefits = ${JSON.stringify(benefits)}::jsonb,
      target_audience = ${JSON.stringify(targetAudience)}::jsonb,
      success_heading = ${successHeading || "Your Request Has Been Received"},
      success_message = ${successMessage},
      seo_title = ${seoTitle || null},
      seo_description = ${seoDescription || null},
      updated_at = now()
    where id = 1
  `;

  revalidatePath(`/apply/${slug}`);
  revalidatePath("/admin/apply");
  redirect("/admin/apply?success=1");
}

export async function updateApplicationStatus(id: string, formData: FormData) {
  const status = String(formData.get("status") ?? "new");

  await sql`update strategic_session_applications set status = ${status} where id = ${id}`;

  revalidatePath("/admin/apply/applications");
}
