"use server";

import { redirect } from "next/navigation";
import { sql } from "../../../lib/db";
import { checkRateLimit, getClientIp } from "../../../lib/rate-limit";
import { sendNotificationEmail } from "../../../lib/email";

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

  const ip = await getClientIp();
  const allowed = await checkRateLimit(`register:${ip}`, 10, 60 * 60);
  if (!allowed) {
    redirect(encodeError("Too many attempts. Please try again later."));
  }

  const eventRows = await sql`select title, custom_questions from events where id = ${eventId}`;
  const event = eventRows[0] as { title: string; custom_questions: string[] } | undefined;
  if (!event) {
    redirect(encodeError("This event is no longer available."));
  }

  const questions = event.custom_questions ?? [];
  const answers: Record<string, string> = {};
  questions.forEach((question, index) => {
    const value = String(formData.get(`question_${index}`) ?? "").trim();
    if (value) answers[question] = value.slice(0, 500);
  });

  const note = noteRaw.length > 0 ? noteRaw.slice(0, 280) : null;
  let errorMessage: string | null = null;

  try {
    await sql`
      insert into event_registrations (event_id, full_name, email, note, custom_answers)
      values (${eventId}, ${fullName}, ${email}, ${note}, ${JSON.stringify(answers)}::jsonb)
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

  await sendNotificationEmail({
    subject: `New event registration: ${event.title}`,
    lines: [
      ["Event", event.title],
      ["Name", fullName],
      ["Email", email],
      ["Note", note ?? "—"],
      ...Object.entries(answers),
    ],
  });

  redirect("/events?registered=1#register");
}
