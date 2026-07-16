"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

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

  const intention = intentionRaw.length > 0 ? intentionRaw.slice(0, 280) : null;

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("participants").insert({
      full_name: fullName,
      email,
      intention,
      source: "join",
    });

    if (error) {
      if (error.code === "23505") {
        redirect(
          encodeError(
            "An entry with this email already exists. Wait for further communication."
          )
        );
      }

      redirect(
        encodeError("Entry could not be recorded. Please try once more.")
      );
    }
  } catch {
    redirect(encodeError("Entry could not be recorded. Please try once more."));
  }

  redirect("/join/entered");
}
