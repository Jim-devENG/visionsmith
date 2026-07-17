"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "../../../../lib/db";
import { slugify } from "../../../../lib/slug";

type EventInput = {
  title: string;
  framing: string;
  event_date: string;
  event_time: string;
  action_label: string;
  status: string;
  is_featured: boolean;
};

function readEventInput(formData: FormData): EventInput {
  return {
    title: String(formData.get("title") ?? "").trim(),
    framing: String(formData.get("framing") ?? "").trim(),
    event_date: String(formData.get("event_date") ?? ""),
    event_time: String(formData.get("event_time") ?? "").trim(),
    action_label:
      String(formData.get("action_label") ?? "").trim() || "Join VisionSmith to attend",
    status: String(formData.get("status") ?? "upcoming"),
    is_featured: formData.get("is_featured") === "on",
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
    insert into events (title, slug, framing, event_date, event_time, action_label, status, is_featured)
    values (${input.title}, ${slug}, ${input.framing}, ${input.event_date}, ${input.event_time}, ${input.action_label}, ${input.status}, ${input.is_featured})
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
