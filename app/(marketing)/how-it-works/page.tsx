import Link from "next/link";
import { Checklist } from "../../../components/ui/Checklist";
import { Reveal } from "../../../components/ui/Reveal";

const progression = [
  {
    label: "01",
    title: "Find the pattern",
    text: "The work begins by naming the structure underneath the chaos — the few principles and constraints that actually govern the problem, before pressure or convenience start negotiating them away.",
  },
  {
    label: "02",
    title: "Build the architecture",
    text: "A clear pattern isn't left as an abstract idea. It gets translated into sequence, dependency, and decision points — a structure specific enough to actually build from.",
  },
  {
    label: "03",
    title: "Build without illusion",
    text: "Construction gets examined through the thing itself, not the story about it. What actually got built — and what got quietly skipped — becomes visible enough to fix.",
  },
  {
    label: "04",
    title: "Refine and repeat",
    text: "The aim isn't a perfect first build. The aim is faster recognition of what's off and cleaner correction. Over time, this turns thinking into a discipline instead of a one-time burst of insight.",
  },
];

const sequence = [
  {
    title: "Pattern",
    text: "The structure that must hold true, even when circumstances argue for cutting corners.",
  },
  {
    title: "Rhythm",
    text: "When thinking happens, how often the build gets reviewed against the pattern, and where course-correction is built in.",
  },
  {
    title: "Record",
    text: "A visible account of what was built, what was skipped, and where the same mistake keeps showing up.",
  },
  {
    title: "Adjustment",
    text: "Specific corrections made before a bad habit becomes how you build.",
  },
];

const effects = [
  "Decisions get faster because the pattern is already named.",
  "Review stops being a feelings check and becomes an instrument for building better.",
  "Execution improves because the architecture is visible before the build starts drifting.",
  "Confidence becomes earned instead of assumed, because the record can actually confirm it.",
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,2.05fr)_minmax(15rem,0.85fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">From idea to architecture</p>
              <h1 className="vs-display max-w-[36rem]">
                Learn to think like a builder.
              </h1>
              <p className="vs-copy mt-10 max-w-[40rem]">
                Most builders don't fail for lack of ideas. They fail because
                the idea never gets a real architecture — the pattern
                underneath it stays vague, and the build inherits that
                vagueness.
              </p>
            </div>

            <div className="vs-card">
              <p className="vs-label vs-label-alt mb-4">Central premise</p>
              <p className="vs-meta">
                VisionSmith doesn't try to keep you motivated. It gives you a
                way to think clearly after the motivation is gone.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[38rem]">
            <p className="vs-label mb-6">The method</p>
            <h2 className="vs-title">
              The sequence is deliberate: find the pattern, build the
              architecture, construct, refine.
            </h2>
            <p className="vs-copy mt-6">
              Each step depends on the last. Without a pattern, architecture
              is guesswork. Without architecture, building is improvisation.
              Without refinement, good ideas stay half-built.
            </p>
          </Reveal>

          <div className="relative mt-12 max-w-[42rem] space-y-10 border-l border-[color:var(--vs-line-strong)] pl-8">
            {progression.map((step, index) => (
              <Reveal key={step.label} delay={index * 100} className="relative">
                <span className="absolute -left-[2.55rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--vs-surface)] text-[12px] font-bold text-[color:var(--vs-accent-strong)] ring-4 ring-[color:var(--vs-accent-soft)]">
                  {step.label}
                </span>
                <h3 className="vs-subtitle">{step.title}</h3>
                <p className="vs-copy mt-3 max-w-[36rem]">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[32rem]">
            <p className="vs-label vs-label-on-dark mb-6">The frame</p>
            <h2 className="vs-title">
              A practical frame, not a vague philosophy.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sequence.map((item, index) => (
              <Reveal key={item.title} delay={index * 90} className="vs-card vs-card-on-dark vs-card-accent-top h-full">
                <h3 className="vs-subtitle">{item.title}</h3>
                <p className="vs-copy mt-3">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[32rem]">
            <p className="vs-label mb-6">What changes</p>
            <h2 className="vs-title">
              Consistency changes the quality of judgment before it changes
              the quantity of output.
            </h2>
          </Reveal>
          <div className="mt-12 max-w-[46rem]">
            <Checklist items={effects} />
          </div>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="vs-card vs-card-on-accent mx-auto max-w-[40rem] text-center">
            <p className="vs-label vs-label-on-accent mx-auto mb-6">Next action</p>
            <h2 className="vs-title">
              If this reads as necessary rather than abstract, the next step
              is direct.
            </h2>
            <p className="vs-copy mx-auto mt-6 max-w-[32rem]">
              The next step isn't to admire the method. It's to decide
              whether you want to think and build this way, seriously enough
              for it to change what you make.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/join" className="vs-btn vs-btn-on-accent">
                Build with Clarity
              </Link>
              <Link href="/events" className="vs-btn vs-btn-ghost-on-color">
                Join a Live Session
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
