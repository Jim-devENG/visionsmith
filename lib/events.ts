export type FeaturedEvent = {
  id: string;
  slug: string;
  title: string;
  framing: string;
  date: string;
  day: string;
  month: string;
  time: string;
  actionLabel: string;
  customQuestions: string[];
  flyerUrl: string | null;
  redirectLabel: string | null;
  redirectUrl: string | null;
  status: string;
};

export type EventRow = {
  id: string;
  slug: string;
  title: string;
  framing: string;
  event_date: string;
  event_time: string;
  action_label: string;
  custom_questions: string[];
  flyer_url: string | null;
  redirect_label: string | null;
  redirect_url: string | null;
  status: string;
};

/** An event counts as past once its date has elapsed, regardless of the
 * stored status — admins don't have to remember to flip it manually. The
 * stored status can still force an event into the past bucket early. */
export function isEventElapsed(eventDate: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return new Date(eventDate) < today;
}

export function toFeaturedEvent(row: EventRow): FeaturedEvent {
  const derivedStatus = row.status === "past" || isEventElapsed(row.event_date) ? "past" : "upcoming";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    framing: row.framing,
    date: new Date(row.event_date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }),
    day: String(new Date(row.event_date).getUTCDate()),
    month: new Date(row.event_date).toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    }),
    time: row.event_time,
    actionLabel: row.action_label,
    customQuestions: row.custom_questions ?? [],
    flyerUrl: row.flyer_url,
    redirectLabel: row.redirect_label,
    redirectUrl: row.redirect_url,
    status: derivedStatus,
  };
}
