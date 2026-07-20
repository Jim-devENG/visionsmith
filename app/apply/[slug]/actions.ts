"use server";

import { sql } from "../../../lib/db";
import { checkRateLimit, getClientIp } from "../../../lib/rate-limit";
import { isSafeHttpUrl } from "../../../lib/sanitize";
import { sendNotificationEmail } from "../../../lib/email";

export type ApplicationPayload = {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  linkedin: string;
  category: string;
  buildingDescription: string;
  biggestChallenge: string;
  situation: string;
  oneThing: string;
  whyStuck: string;
  successOutcome: string;
  commitment: string;
  whySelected: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, max = 2000) {
  return value.trim().length > 0 ? value.trim().slice(0, max) : null;
}

export async function submitApplication(
  sessionId: number,
  sessionSlug: string,
  payload: ApplicationPayload
): Promise<{ error: string } | { success: true }> {
  const fullName = required(payload.fullName, 120);
  const email = payload.email.trim().toLowerCase();
  const whatsapp = required(payload.whatsapp, 40);
  const country = required(payload.country, 80);
  const category = required(payload.category, 60);
  const buildingDescription = required(payload.buildingDescription, 1000);
  const biggestChallenge = required(payload.biggestChallenge, 1000);
  const situation = required(payload.situation, 1000);
  const oneThing = required(payload.oneThing, 500);
  const whyStuck = required(payload.whyStuck, 1000);
  const successOutcome = required(payload.successOutcome, 1000);
  const commitment = required(payload.commitment, 60);
  const whySelected = required(payload.whySelected, 1000);
  const linkedin = payload.linkedin.trim();

  if (!fullName || !whatsapp || !country || !category || !buildingDescription) {
    return { error: "Please complete every field before submitting." };
  }
  if (!emailPattern.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (!biggestChallenge || !situation || !oneThing || !whyStuck || !successOutcome || !commitment || !whySelected) {
    return { error: "Please complete every field before submitting." };
  }
  if (linkedin && !isSafeHttpUrl(linkedin)) {
    return { error: "LinkedIn link must start with http:// or https://" };
  }

  const ip = await getClientIp();
  const allowed = await checkRateLimit(`apply:${ip}`, 5, 60 * 60);
  if (!allowed) {
    return { error: "Too many attempts. Please try again later." };
  }

  try {
    await sql`
      insert into strategic_session_applications (
        session_id, full_name, email, whatsapp, country, linkedin, category,
        building_description, biggest_challenge, situation, one_thing, why_stuck,
        success_outcome, commitment, why_selected
      ) values (
        ${sessionId}, ${fullName}, ${email}, ${whatsapp}, ${country}, ${linkedin || null}, ${category},
        ${buildingDescription}, ${biggestChallenge}, ${situation}, ${oneThing}, ${whyStuck},
        ${successOutcome}, ${commitment}, ${whySelected}
      )
    `;
  } catch {
    return { error: "Your request could not be recorded. Please try once more." };
  }

  await sendNotificationEmail({
    subject: `New Strategic Architecture Session request: ${fullName}`,
    lines: [
      ["Session", sessionSlug],
      ["Name", fullName],
      ["Email", email],
      ["WhatsApp", whatsapp],
      ["Country", country],
      ["LinkedIn", linkedin || "—"],
      ["Category", category],
      ["Building", buildingDescription],
      ["Biggest challenge", biggestChallenge],
      ["Situation", situation],
      ["One thing", oneThing],
      ["Why stuck", whyStuck],
      ["Success looks like", successOutcome],
      ["Commitment", commitment],
      ["Why selected", whySelected],
    ],
  });

  return { success: true };
}
