"use server";

import { redirect } from "next/navigation";
import { sql } from "../../../lib/db";
import { checkRateLimit, getClientIp } from "../../../lib/rate-limit";
import { sendNotificationEmail } from "../../../lib/email";

function encodeError(message: string) {
  return `/join?error=${encodeURIComponent(message)}`;
}

export async function submitParticipantEntry(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const intentionRaw = String(formData.get("intention") ?? "").trim();

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
  const allowed = await checkRateLimit(`join:${ip}`, 5, 60 * 60);
  if (!allowed) {
    redirect(encodeError("Too many attempts. Please try again later."));
  }

  const intention = intentionRaw.length > 0 ? intentionRaw.slice(0, 280) : null;

  let errorMessage: string | null = null;

  try {
    await sql`
      insert into participants (full_name, email, intention, source)
      values (${fullName}, ${email}, ${intention}, 'join')
    `;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    errorMessage =
      code === "23505"
        ? "An entry with this email already exists. Wait for further communication."
        : "Entry could not be recorded. Please try once more.";
  }

  if (errorMessage) {
    redirect(encodeError(errorMessage));
  }

  await sendNotificationEmail({
    subject: "New VisionSmith join submission",
    lines: [
      ["Name", fullName],
      ["Email", email],
      ["Intention", intention ?? "—"],
    ],
  });

  redirect("/join/entered");
}
