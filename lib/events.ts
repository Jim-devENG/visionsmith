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

export function toFeaturedEvent(row: EventRow): FeaturedEvent {
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
    status: row.status,
  };
}
