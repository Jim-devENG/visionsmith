import Link from "next/link";
import { Parallax } from "../../../../components/ui/Parallax";
import { Reveal } from "../../../../components/ui/Reveal";

export default function JoinEnteredPage() {
  return (
    <main>
      <section className="vs-section">
        <Reveal className="vs-wrap vs-section-inner-open">
          <p className="vs-label mb-8">Entry recorded</p>
          <h1 className="vs-display max-w-[48rem]">
            Your entry into VisionSmith has been recorded.
          </h1>
          <p className="vs-copy mt-10 max-w-[40rem]">
            You are no longer in observation mode. Entry means your standards,
            review, and execution now belong inside one governed environment.
          </p>
        </Reveal>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label vs-label-alt mb-6">Orientation</p>
              <h2 className="vs-title">
                Participation starts with placement, not momentum.
              </h2>
            </div>

            <div className="space-y-8">
              <div className="grid gap-4 border-t border-[color:var(--vs-line)] pt-6 md:grid-cols-[9.5rem_minmax(0,1fr)]">
                <p className="vs-label vs-label-alt">Meaning</p>
                <p className="vs-copy max-w-[36rem]">
                  Joining is platform entry. Event registration is session
                  participation inside that broader entry.
                </p>
              </div>

              <div className="grid gap-4 border-t border-[color:var(--vs-line)] pt-6 md:grid-cols-[9.5rem_minmax(0,1fr)]">
                <p className="vs-label vs-label-alt">Expectation</p>
                <p className="vs-copy max-w-[36rem]">
                  Work in rhythm: review, correction, and follow-through that
                  can be examined in plain terms.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint-warm">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label mb-6">First step after entry</p>
              <h2 className="vs-title">Complete this within 24 hours.</h2>
              <Parallax strength={12} className="mt-10 max-w-[20rem]">
                <figure className="vs-media">
                  <img
                    src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=920&q=80"
                    alt="Notebook open on a quiet desk"
                    loading="lazy"
                  />
                </figure>
              </Parallax>
            </div>

            <div className="space-y-7">
              <p className="vs-copy max-w-[38rem]">
                Write a short internal audit in plain text:
              </p>
              <ol className="space-y-5">
                {[
                  "The one standard you refuse to negotiate this week.",
                  "The one recurring behavior that currently violates it.",
                  "The one concrete correction you will apply before the next session.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-4 border-t border-[color:var(--vs-line-strong)] pt-5 md:grid-cols-[2.6rem_minmax(0,1fr)]"
                  >
                    <span className="vs-label">0{index + 1}</span>
                    <p className="vs-copy max-w-[36rem]">{item}</p>
                  </li>
                ))}
              </ol>
              <p className="vs-copy max-w-[38rem]">
                Keep this note visible. It is your first participation artifact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="vs-title max-w-[37rem]">
              Continue with the live rhythm and the operating method.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/events" className="vs-btn">
                View current events
              </Link>
              <Link href="/how-it-works" className="vs-btn vs-btn-subtle">
                Re-read how it works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
