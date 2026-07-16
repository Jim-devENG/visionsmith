import Link from "next/link";
import { Parallax } from "../../../components/ui/Parallax";
import { Reveal } from "../../../components/ui/Reveal";

const nextEvent = {
  title: "Live Session: Reordering the Week Around What Governs",
  framing:
    "A working session on how standards survive contact with calendars, obligations, and fatigue. The point is not to leave with more intentions. The point is to leave with a cleaner structure for the next span of work.",
  date: "Thursday, May 16",
  time: "7:00 PM WAT / 2:00 PM ET",
  actionLabel: "Join VisionSmith to attend",
  actionHref: "/join",
};

const rhythm = [
  {
    title: "Monthly live sessions",
    text: "One session at a time, built around a specific point of correction: review, standards, execution, attention, or drift.",
  },
  {
    title: "Ongoing prompts and reflection",
    text: "Between sessions, participation continues through prompts and structured questions that keep the work from collapsing into occasional inspiration.",
  },
  {
    title: "Community movement",
    text: "The environment stays active through shared practice, not constant noise. The emphasis is continuity, not chatter.",
  },
];

const pastSessions = [
  "April: Reviewing without self-deception",
  "March: Building a personal operating standard",
  "February: Reducing drift before it becomes a pattern",
];

export default function EventsPage() {
  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,2.05fr)_minmax(15rem,0.85fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">Live rhythm</p>
              <h1 className="vs-display max-w-[46rem]">
                Events are where the platform becomes present tense.
              </h1>
              <p className="vs-copy mt-10 max-w-[40rem]">
                VisionSmith is not built around isolated content drops. The live
                sessions mark the platform's active rhythm: places where review,
                correction, and renewed structure happen in real time.
              </p>
            </div>
            <div className="vs-card">
              <p className="vs-label vs-label-alt mb-4">What this page is for</p>
              <p className="vs-meta">
                This is the current edge of activity. If you want to enter the
                work as it is happening now, begin with platform entry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal>
            <p className="vs-label mb-8">Current / next</p>
            <div className="vs-card grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(15rem,0.65fr)]">
              <div>
                <p className="vs-label vs-label-alt mb-5">Next live session</p>
                <h2 className="vs-title max-w-[36rem]">{nextEvent.title}</h2>
                <p className="vs-copy mt-6 max-w-[38rem]">{nextEvent.framing}</p>
                <Parallax strength={14} className="mt-8 max-w-[38rem]">
                  <figure className="vs-media">
                    <img
                      src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1100&q=80"
                      alt="Focused live discussion setting"
                      loading="lazy"
                    />
                  </figure>
                </Parallax>
              </div>
              <aside className="space-y-6">
                <dl className="space-y-5 text-sm text-[color:var(--vs-muted)]">
                  <div>
                    <dt className="vs-label vs-label-alt">Date</dt>
                    <dd className="mt-3">{nextEvent.date}</dd>
                  </div>
                  <div>
                    <dt className="vs-label vs-label-alt">Time</dt>
                    <dd className="mt-3">{nextEvent.time}</dd>
                  </div>
                  <div>
                    <dt className="vs-label vs-label-alt">Why attend</dt>
                    <dd className="mt-3 leading-7">
                      To meet the work while it is active, once your entry into
                      the platform has been established.
                    </dd>
                  </div>
                </dl>
                <Link href={nextEvent.actionHref} className="vs-btn w-full">
                  {nextEvent.actionLabel}
                </Link>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(14rem,0.58fr)_minmax(0,1.42fr)]">
            <div>
              <p className="vs-label vs-label-on-dark mb-6">Context of participation</p>
              <h2 className="vs-title max-w-[28rem]">
                Attendance matters only if it returns to structure afterward.
              </h2>
            </div>
            <div className="space-y-6 max-w-[40rem]">
              <p className="vs-copy">
                In VisionSmith, joining the platform and attending a session are
                not the same act. Joining establishes participation in the
                environment itself. Events are live points inside that
                environment: places to return, re-examine standards, and reset
                direction in company with the current rhythm.
              </p>
              <p className="vs-copy">
                A session is useful when it alters the next week of conduct. If
                it ends in admiration alone, it has not gone far enough.
              </p>
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
          <Reveal delay={150} className="mt-12 grid gap-6 md:grid-cols-3">
            {rhythm.map((item) => (
              <article key={item.title} className="vs-card">
                <h3 className="vs-subtitle">{item.title}</h3>
                <p className="vs-copy mt-4">{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.82fr)]">
            <div>
              <p className="vs-label vs-label-on-accent mb-6">Continuity</p>
              <h2 className="vs-title max-w-[35rem]">The work has already been moving.</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-[40rem]">
                {pastSessions.map((session) => (
                  <div key={session} className="vs-card vs-card-on-accent">
                    <p className="vs-copy text-[0.9rem]">{session}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 self-end">
              <p className="vs-meta max-w-[17rem]">
                Entry comes first. The live session is one of the places that
                entry leads.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                <Link href={nextEvent.actionHref} className="vs-btn vs-btn-on-accent">
                  {nextEvent.actionLabel}
                </Link>
                <Link href="/join" className="vs-btn vs-btn-ghost-on-color">
                  Enter the platform
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
