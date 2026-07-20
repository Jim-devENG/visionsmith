import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sql } from "../../../lib/db";
import { ApplicationForm } from "../../../components/apply/ApplicationForm";

type StrategicSessionRow = {
  id: number;
  slug: string;
  status: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image_url: string | null;
  host_name: string;
  host_title: string;
  session_start_date: string | null;
  max_slots: number;
  price_label: string;
  cta_label: string;
  benefits: string[];
  target_audience: string[];
  success_heading: string;
  success_message: string;
  seo_title: string | null;
  seo_description: string | null;
};

async function getSession(slug: string) {
  const rows = await sql`select * from strategic_sessions where slug = ${slug} and id = 1`;
  const row = rows[0] as StrategicSessionRow | undefined;
  if (!row || row.status === "draft") return null;
  return row;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const session = await getSession(slug);
  if (!session) return {};

  return {
    title: session.seo_title || session.hero_title,
    description: session.seo_description || session.hero_description,
    robots: { index: false, follow: false },
  };
}

export default async function StrategicSessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSession(slug);
  if (!session) notFound();

  const sessionStart = session.session_start_date
    ? new Date(session.session_start_date).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    : null;

  const badges = [
    session.price_label,
    `Limited to ${session.max_slots} People`,
    sessionStart ? `Sessions Begin ${sessionStart}` : null,
  ].filter((b): b is string => Boolean(b));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1.5px 1.5px, rgba(23,20,15,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[40rem] pb-16 pt-6 text-center sm:pb-24">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-[var(--vs-radius-pill)] border border-[color:var(--vs-line-strong)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:var(--vs-ink-soft)]"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="font-[var(--font-sans)] text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-[color:var(--vs-ink)] sm:text-[3.25rem]">
            {session.hero_title}
          </h1>
          <p className="mt-4 text-[1.15rem] font-medium text-[color:var(--vs-accent)]">{session.hero_subtitle}</p>
          <p className="vs-copy mx-auto mt-6 max-w-[30rem]">{session.hero_description}</p>

          {session.hero_image_url ? (
            <div className="mx-auto mt-12 aspect-[16/10] max-w-[34rem] overflow-hidden rounded-[var(--vs-radius-lg)] shadow-[var(--vs-shadow-lg)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={session.hero_image_url} alt="" className="h-full w-full object-cover" />
            </div>
          ) : null}

          <div className="mt-12">
            <a href="#apply" className="vs-btn">
              {session.cta_label}
            </a>
          </div>

          <p className="mt-6 text-[13px] text-[color:var(--vs-subtle)]">
            Hosted by <span className="font-semibold text-[color:var(--vs-ink-soft)]">{session.host_name}</span>
            {session.host_title ? `, ${session.host_title}` : ""}
          </p>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-[40rem] bg-[color:var(--vs-line)]" />

      {/* Is this for you */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[34rem]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--vs-accent)]">
            Is this for you?
          </p>
          <h2 className="mt-3 text-center text-[1.5rem] font-bold text-[color:var(--vs-ink)] sm:text-[1.75rem]">
            This session is for people who…
          </h2>

          <ul className="mt-10 space-y-5">
            {session.target_audience.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--vs-accent-soft)] text-[11px] font-bold text-[color:var(--vs-accent-strong)]">
                  ✓
                </span>
                <p className="text-[1rem] leading-7 text-[color:var(--vs-ink-soft)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-[40rem] bg-[color:var(--vs-line)]" />

      {/* What you'll leave with */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[34rem]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--vs-accent)]">
            What you'll leave with
          </p>
          <h2 className="mt-3 text-center text-[1.5rem] font-bold text-[color:var(--vs-ink)] sm:text-[1.75rem]">
            Clarity you can act on.
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {session.benefits.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--vs-accent)]" />
                <p className="text-[1rem] leading-7 text-[color:var(--vs-ink-soft)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-[40rem] bg-[color:var(--vs-line)]" />

      {/* Application experience */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[34rem]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--vs-accent)]">
            Apply
          </p>
          <h2 className="mt-3 text-center text-[1.5rem] font-bold text-[color:var(--vs-ink)] sm:text-[1.75rem]">
            Request your session.
          </h2>

          <ApplicationForm
            sessionId={session.id}
            sessionSlug={session.slug}
            sessionTitle={session.hero_title}
            ctaLabel={session.cta_label}
            successHeading={session.success_heading}
            successMessage={session.success_message}
            isClosed={session.status === "closed"}
          />
        </div>
      </section>
    </>
  );
}
