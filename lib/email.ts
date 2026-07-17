import { Resend } from "resend";

const NOTIFY_TO = "visionsmithhub@gmail.com";
const FROM = process.env.RESEND_FROM_EMAIL || "VisionSmith <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Best-effort notification email — failures are logged, never thrown, so a
 * Resend outage can't block a form submission that already succeeded.
 */
export async function sendNotificationEmail({
  subject,
  lines,
}: {
  subject: string;
  lines: [string, string][];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — skipping notification email.");
    return;
  }

  const rows = lines
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b6459;font-weight:600;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#17140f;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:32rem;margin:0 auto;">
      <h2 style="color:#17140f;">${escapeHtml(subject)}</h2>
      <table cellpadding="0" cellspacing="0">${rows}</table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({ from: FROM, to: NOTIFY_TO, subject, html });
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}
