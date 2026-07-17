"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EventTicket } from "../ui/EventTicket";
import { Reveal } from "../ui/Reveal";
import { ShareButtons } from "./ShareButtons";

const rhythm = [
  {
    title: "Monthly live sessions",
    text: "One session at a time, built around a specific point in the thinking process: pattern-finding, architecture, construction, or refinement.",
  },
  {
    title: "Ongoing prompts and reflection",
    text: "Between sessions, participation continues through prompts and structured questions that keep the thinking active instead of collapsing into occasional inspiration.",
  },
  {
    title: "Community movement",
    text: "The environment stays active through shared practice, not constant noise. The emphasis is continuity of thinking, not chatter.",
  },
];

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

export type PastSession = {
  label: string;
  slug: string;
};

export function EventsAnimated({
  featured,
  pastSessions,
  registerAction,
  error,
  registered,
}: {
  featured: FeaturedEvent | null;
  pastSessions: PastSession[];
  registerAction: ((formData: FormData) => void) | null;
  error?: string;
  registered?: boolean;
}) {
  const isPast = featured?.status === "past";
  const eventUrl = featured
    ? `https://www.visionsmith.world/events/${featured.slug}#register`
    : "https://www.visionsmith.world/events";
  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,2.05fr)_minmax(15rem,0.85fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">Live rhythm</p>
              <h1 className="vs-display max-w-[34rem]">
                Where the work happens live.
              </h1>
              <p className="vs-copy mt-10 max-w-[40rem]">
                VisionSmith isn't built around isolated content drops. The
                live sessions mark the platform's active rhythm — places
                where builders think through real problems, in real time.
              </p>
            </div>
            <div className="vs-card vs-card-accent-top">
              <p className="vs-label vs-label-alt mb-4">What this page is for</p>
              <p className="vs-meta">
                This is the current edge of activity. If you want to think
                alongside builders as it's happening, start with platform
                entry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="register" className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal>
            <p className="vs-label mb-8">{isPast ? "Past session" : "Current / next"}</p>
            {featured ? (
              <div className="vs-card vs-card-accent-top grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(15rem,0.65fr)]">
                <div>
                  {featured.flyerUrl ? (
                    <div className="vs-flyer mb-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={featured.flyerUrl} alt={`${featured.title} flyer`} />
                    </div>
                  ) : null}
                  <p className="vs-label vs-label-alt mb-5">
                    {isPast ? "This session has happened" : "Next live session"}
                  </p>
                  <h2 className="vs-title max-w-[36rem]">{featured.title}</h2>
                  <p className="vs-copy mt-6 max-w-[38rem]">{featured.framing}</p>
                  {!isPast ? (
                    <p className="vs-copy mt-6 max-w-[38rem]">
                      To join the session while it's active, your entry into
                      the platform needs to be established first.
                    </p>
                  ) : null}
                  <div className="mt-8">
                    <ShareButtons url={eventUrl} title={featured.title} />
                  </div>
                </div>
                <aside className="space-y-6 lg:border-l lg:border-[color:var(--vs-line)] lg:pl-8">
                  <EventTicket day={featured.day} month={featured.month} time={featured.time} />

                  {registerAction ? (
                    <form action={registerAction} className="space-y-3">
                      {error ? (
                        <p role="alert" className="text-[13px] leading-6 text-[color:var(--vs-accent-strong)]">
                          {error}
                        </p>
                      ) : null}
                      {registered ? (
                        <div role="status" className="space-y-3">
                          <p className="text-[13px] leading-6 text-[color:var(--vs-accent-strong)]">
                            You're registered — see you there.
                          </p>
                          {featured.redirectUrl ? (
                            <a
                              href={featured.redirectUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="vs-btn w-full"
                            >
                              {featured.redirectLabel || "Continue"}
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                      <input
                        name="full_name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="vs-input"
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="vs-input"
                      />
                      {featured.customQuestions.map((question, index) => (
                        <input
                          key={index}
                          name={`question_${index}`}
                          type="text"
                          placeholder={question}
                          aria-label={question}
                          className="vs-input"
                        />
                      ))}
                      <button type="submit" className="vs-btn w-full">
                        Reserve Your Seat
                      </button>
                    </form>
                  ) : isPast ? (
                    <p className="vs-meta">This session has already happened.</p>
                  ) : null}

                  <Link href="/join" className="vs-btn vs-btn-subtle w-full">
                    Build with Clarity
                  </Link>
                </aside>
              </div>
            ) : (
              <div className="vs-card vs-card-accent-top">
                <p className="vs-copy">
                  No live session is scheduled yet. Check back soon, or join now
                  to be notified the moment one is announced.
                </p>
                <Link href="/join" className="vs-btn mt-6 inline-flex">
                  Build with Clarity
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal>
            <div className="vs-card vs-card-on-dark vs-card-accent-top grid gap-10 lg:grid-cols-[minmax(14rem,0.58fr)_minmax(0,1.42fr)]">
              <div>
                <p className="vs-label vs-label-on-dark mb-6">Context of participation</p>
                <h2 className="vs-title max-w-[28rem]">
                  A session only matters if it changes how you build
                  afterward.
                </h2>
              </div>
              <div className="max-w-[40rem] lg:border-l lg:border-white/10 lg:pl-8">
                <p className="vs-copy">
                  Joining establishes your place in the environment. Events
                  are live points inside it — places to return and reset
                  direction alongside other builders.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[28rem]">
            <p className="vs-label mb-6">Rhythm</p>
            <h2 className="vs-title">
              The cadence is steady enough to shape expectation.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {rhythm.map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="vs-card vs-card-accent-top h-full">
                <span className="vs-icon-badge">{index + 1}</span>
                <h3 className="vs-subtitle mt-6">{item.title}</h3>
                <p className="vs-copy mt-3">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal>
            <p className="vs-label vs-label-on-accent mb-6">Continuity</p>
            <h2 className="vs-title max-w-[35rem]">The work has already been moving.</h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)] lg:items-start">
            {pastSessions.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {pastSessions.map((session, index) => (
                  <motion.div
                    key={session.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="vs-card vs-card-on-accent vs-card-accent-top flex items-start gap-3"
                  >
                    <span className="vs-icon-badge vs-icon-badge-on-accent !h-8 !w-8 text-[11px]">
                      &#10003;
                    </span>
                    <Link href={`/events/${session.slug}`} className="vs-copy pt-1 text-[0.9rem] hover:underline">
                      {session.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="vs-copy max-w-[38rem]">
                The first session is still ahead. This is where its record
                will live once it happens.
              </p>
            )}

            <div className="vs-card vs-card-on-accent vs-card-accent-top space-y-6">
              <p className="vs-meta">
                Entry comes first. The live session is one of the places that
                entry leads.
              </p>
              <div className="flex flex-col gap-4">
                {featured && !isPast ? (
                  <Link href="#register" className="vs-btn vs-btn-on-accent">
                    {featured.actionLabel}
                  </Link>
                ) : null}
                <Link href="/join" className="vs-btn vs-btn-ghost-on-color">
                  Build with Clarity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
