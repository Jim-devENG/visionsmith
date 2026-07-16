import Link from "next/link";
import { Reveal } from "../ui/Reveal";

const nextSteps = [
  "Read the framework and decide whether the discipline required here is one you actually want.",
  "Check the current events and see how the live rhythm extends the work.",
  "Enter the platform only if you intend to submit your conduct to a real standard.",
];

export function NextStep() {
  return (
    <section className="vs-section vs-surface-alt">
      <div className="vs-wrap vs-section-inner-open">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <Reveal className="max-w-2xl">
            <p className="vs-label mb-4">Path forward</p>
            <h2 className="vs-title">
              Progression matters more than persuasion.
            </h2>
            <p className="vs-copy mt-6">
              The sequence is deliberate. First understand the frame. Then test
              whether you can work inside it. Only then choose the level of
              structure you want around you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/join" className="vs-btn">
                Enter VisionSmith
              </Link>
              <Link href="/how-it-works" className="vs-btn vs-btn-subtle">
                Read the framework
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-5">
            {nextSteps.map((step, index) => (
              <div key={step} className="vs-card flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--vs-accent-soft)] text-[13px] font-bold text-[color:var(--vs-accent-strong)]">
                  {index + 1}
                </span>
                <p className="vs-copy pt-1">{step}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
