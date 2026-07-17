import Link from "next/link";
import { Reveal } from "../../../../components/ui/Reveal";
import { Stamp } from "../../../../components/ui/Stamp";

export default function JoinEnteredPage() {
  return (
    <main>
      <section className="vs-section vs-surface">
        <Reveal className="vs-wrap vs-section-inner-open">
          <p className="vs-label mb-8">Entry recorded</p>
          <h1 className="vs-display max-w-[28rem]">
            Entry recorded.
          </h1>
          <p className="vs-copy mt-10 max-w-[40rem]">
            You're no longer just reading about it. From here, your thinking
            and your building both happen inside VisionSmith.
          </p>
        </Reveal>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label vs-label-alt mb-6">Orientation</p>
              <h2 className="vs-title">
                Participation starts with clarity, not momentum.
              </h2>
            </div>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="border-t border-[color:var(--vs-line-strong)] pt-6">
                <p className="vs-label vs-label-alt mb-3">Meaning</p>
                <p className="vs-copy">
                  Joining is entry into VisionSmith itself. Registering for
                  an event is participation inside that broader entry.
                </p>
              </div>
              <div className="border-t border-[color:var(--vs-line-strong)] pt-6">
                <p className="vs-label vs-label-alt mb-3">Expectation</p>
                <p className="vs-copy">
                  Work in rhythm: thinking, building, and refinement that can
                  be examined in plain terms.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label vs-label-on-dark mb-6">First step after entry</p>
              <h2 className="vs-title">Complete this within 24 hours.</h2>
              <Stamp label="Recorded" />
            </div>

            <div className="space-y-6">
              <p className="vs-copy max-w-[38rem]">
                Write a short pattern audit in plain text:
              </p>
              <div className="space-y-5">
                {[
                  "The one pattern you're building around this week.",
                  "The one recurring habit that currently works against it.",
                  "The one concrete change you'll make before the next session.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-4 border-t border-white/15 pt-5">
                    <span className="vs-label vs-label-on-dark shrink-0">0{index + 1}</span>
                    <p className="vs-copy">{item}</p>
                  </div>
                ))}
              </div>
              <p className="vs-copy max-w-[38rem]">
                Keep this note visible. It's your first artifact of thinking
                in the open.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="vs-title max-w-[37rem]">
              Continue with the live rhythm and the way of thinking.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/events" className="vs-btn vs-btn-on-accent">
                View current events
              </Link>
              <Link href="/how-it-works" className="vs-btn vs-btn-ghost-on-color">
                Re-read how it works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
