"use server";

import { redirect } from "next/navigation";
import { sql } from "../../../lib/db";

function encodeError(message: string) {
  return `/events?error=${encodeURIComponent(message)}#register`;
}

export async function registerForEvent(eventId: string, formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const noteRaw = String(formData.get("note") ?? "").trim();

  if (!fullName || fullName.length < 2) {
    redirect(encodeError("A full name is required."));
  }

  if (!email) {
    redirect(encodeError("An email address is required."));
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    redirect(encodeError("Enter a valid email address."));
  }

  const note = noteRaw.length > 0 ? noteRaw.slice(0, 280) : null;
  let errorMessage: string | null = null;

  try {
    await sql`
      insert into event_registrations (event_id, full_name, email, note)
      values (${eventId}, ${fullName}, ${email}, ${note})
    `;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    errorMessage =
      code === "23505"
        ? "You're already registered for this event."
        : "Registration could not be recorded. Please try once more.";
  }

  if (errorMessage) {
    redirect(encodeError(errorMessage));
  }

  redirect("/events?registered=1#register");
}
