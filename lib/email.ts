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

async function send({ to, subject, html }: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — skipping email.");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

/**
 * Best-effort notification email to the site owner — failures are logged,
 * never thrown, so a Resend outage can't block a form submission that
 * already succeeded.
 */
export async function sendNotificationEmail({
  subject,
  lines,
}: {
  subject: string;
  lines: [string, string][];
}) {
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

  await send({ to: NOTIFY_TO, subject, html });
}

/**
 * Confirmation email sent to the person who just registered for an event.
 * Includes the organizer's next-step link (e.g. a WhatsApp group) if set.
 */
export async function sendEventRegistrationConfirmation({
  to,
  fullName,
  eventTitle,
  eventWhen,
  redirectLabel,
  redirectUrl,
}: {
  to: string;
  fullName: string;
  eventTitle: string;
  eventWhen: string;
  redirectLabel: string | null;
  redirectUrl: string | null;
}) {
  const html = `
    <div style="font-family:sans-serif;max-width:32rem;margin:0 auto;">
      <h2 style="color:#17140f;">You're registered.</h2>
      <p style="color:#17140f;">Hi ${escapeHtml(fullName)}, you're confirmed for:</p>
      <p style="color:#17140f;font-weight:700;font-size:18px;margin:8px 0;">${escapeHtml(eventTitle)}</p>
      <p style="color:#6b6459;">${escapeHtml(eventWhen)}</p>
      ${
        redirectUrl
          ? `<p style="margin-top:24px;"><a href="${redirectUrl}" style="display:inline-block;background:#17140f;color:#ffffff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700;">${escapeHtml(redirectLabel || "Continue")}</a></p>`
          : ""
      }
    </div>
  `;

  await send({ to, subject: `You're registered: ${eventTitle}`, html });
}

/**
 * Confirmation email sent to someone who just applied for a private
 * VisionSmith session (e.g. the Strategic Architecture Session). Applicants
 * aren't auto-approved — this just confirms the request was received.
 */
export async function sendApplicationConfirmation({
  to,
  fullName,
  sessionTitle,
}: {
  to: string;
  fullName: string;
  sessionTitle: string;
}) {
  const html = `
    <div style="font-family:sans-serif;max-width:32rem;margin:0 auto;">
      <h2 style="color:#17140f;">Your request has been received.</h2>
      <p style="color:#17140f;">Hi ${escapeHtml(fullName)}, thank you for applying for:</p>
      <p style="color:#17140f;font-weight:700;font-size:18px;margin:8px 0;">${escapeHtml(sessionTitle)}</p>
      <p style="color:#6b6459;">
        Every request is reviewed carefully. If you're selected, you'll be
        contacted directly with next steps.
      </p>
    </div>
  `;

  await send({ to, subject: `Request received: ${sessionTitle}`, html });
}
