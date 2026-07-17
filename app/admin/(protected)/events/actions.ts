"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";
import { slugify } from "../../../../lib/slug";
import { isSafeHttpUrl } from "../../../../lib/sanitize";

type EventInput = {
  title: string;
  framing: string;
  event_date: string;
  event_time: string;
  action_label: string;
  status: string;
  is_featured: boolean;
  custom_questions: string[];
  flyer_url: string | null;
  redirect_label: string | null;
  redirect_url: string | null;
};

function readEventInput(formData: FormData): EventInput {
  let customQuestions: string[] = [];
  try {
    const raw = JSON.parse(String(formData.get("custom_questions") ?? "[]"));
    if (Array.isArray(raw)) {
      customQuestions = raw
        .map((q) => String(q).trim().slice(0, 140))
        .filter(Boolean)
        .slice(0, 10);
    }
  } catch {
    customQuestions = [];
  }

  const flyerUrl = String(formData.get("flyer_url") ?? "").trim();
  const redirectLabel = String(formData.get("redirect_label") ?? "").trim();
  const redirectUrl = String(formData.get("redirect_url") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    framing: String(formData.get("framing") ?? "").trim(),
    event_date: String(formData.get("event_date") ?? ""),
    event_time: String(formData.get("event_time") ?? "").trim(),
    action_label:
      String(formData.get("action_label") ?? "").trim() || "Join VisionSmith to attend",
    status: String(formData.get("status") ?? "upcoming"),
    is_featured: formData.get("is_featured") === "on",
    custom_questions: customQuestions,
    flyer_url: flyerUrl && isSafeHttpUrl(flyerUrl) ? flyerUrl : null,
    redirect_label: redirectLabel ? redirectLabel.slice(0, 80) : null,
    redirect_url: redirectUrl && isSafeHttpUrl(redirectUrl) ? redirectUrl : null,
  };
}

export async function createEvent(formData: FormData) {
  const input = readEventInput(formData);

  if (!input.title || !input.event_date || !input.event_time) {
    redirect("/admin/events/new?error=" + encodeURIComponent("Title, date, and time are required."));
  }

  const slug = slugify(input.title);

  if (input.is_featured) {
    await sql`update events set is_featured = false where is_featured = true`;
  }

  await sql`
    insert into events (title, slug, framing, event_date, event_time, action_label, status, is_featured, custom_questions, flyer_url, redirect_label, redirect_url)
    values (${input.title}, ${slug}, ${input.framing}, ${input.event_date}, ${input.event_time}, ${input.action_label}, ${input.status}, ${input.is_featured}, ${JSON.stringify(input.custom_questions)}::jsonb, ${input.flyer_url}, ${input.redirect_label}, ${input.redirect_url})
  `;

  revalidatePath("/events");
  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  const input = readEventInput(formData);

  if (!input.title || !input.event_date || !input.event_time) {
    redirect(`/admin/events/${id}?error=` + encodeURIComponent("Title, date, and time are required."));
  }

  if (input.is_featured) {
    await sql`update events set is_featured = false where is_featured = true and id != ${id}`;
  }

  await sql`
    update events set
      title = ${input.title},
      framing = ${input.framing},
      event_date = ${input.event_date},
      event_time = ${input.event_time},
      action_label = ${input.action_label},
      status = ${input.status},
      is_featured = ${input.is_featured},
      custom_questions = ${JSON.stringify(input.custom_questions)}::jsonb,
      flyer_url = ${input.flyer_url},
      redirect_label = ${input.redirect_label},
      redirect_url = ${input.redirect_url},
      updated_at = now()
    where id = ${id}
  `;

  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await sql`delete from events where id = ${id}`;
  revalidatePath("/events");
  redirect("/admin/events");
}
