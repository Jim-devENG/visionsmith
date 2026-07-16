import Link from "next/link";
import { Reveal } from "../../../components/ui/Reveal";

const progression = [
  {
    label: "01",
    title: "Name what governs",
    text: "The work begins by making standards explicit. A person defines the principles, boundaries, and obligations that should remain intact when pressure, convenience, or distraction start negotiating.",
  },
  {
    label: "02",
    title: "Convert standards into structure",
    text: "Values are not left as abstract beliefs. They are translated into review intervals, recurring questions, commitments, and visible points of decision so conduct can actually be directed.",
  },
  {
    label: "03",
    title: "Inspect conduct without performance",
    text: "Execution is examined through evidence rather than self-description. What was done, avoided, delayed, or rationalized becomes legible enough to correct.",
  },
  {
    label: "04",
    title: "Correct early and repeat",
    text: "The aim is not perfect behavior. The aim is quicker recognition, cleaner correction, and less drift. Over time, this turns review into governance rather than reflection alone.",
  },
];

const sequence = [
  {
    title: "Standard",
    text: "What must remain true, even when circumstances argue against it.",
  },
  {
    title: "Rhythm",
    text: "When review happens, how often correction occurs, and where commitments are revisited.",
  },
  {
    title: "Record",
    text: "A visible account of actions, omissions, and repeated points of weakness.",
  },
  {
    title: "Adjustment",
    text: "Specific corrections made before drift becomes identity.",
  },
];

const effects = [
  "Decisions become less theatrical because the standard is already set.",
  "Review stops being emotional processing and becomes an instrument for correction.",
  "Execution improves because obligations are visible before the week gets away from you.",
  "Self-trust becomes more earned because your record can confirm it.",
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="vs-section">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,2.05fr)_minmax(15rem,0.85fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">From intention to execution</p>
              <h1 className="vs-display max-w-[46rem]">
                VisionSmith works by giving private intention a visible
                governing structure.
              </h1>
              <p className="vs-copy mt-10 max-w-[40rem]">
                Most people do not fail because they lack ideas. They fail
                because their standards remain unformed, their review is
                irregular, and their conduct is left uninspected until drift has
                already taken hold.
              </p>
            </div>

            <aside className="vs-rule-top space-y-5 pt-8 lg:border-t-0 lg:border-l lg:border-[color:var(--vs-line)] lg:pl-10 lg:pt-0">
              <p className="vs-label vs-label-alt">Central premise</p>
              <p className="vs-meta max-w-[16rem]">
                The platform does not try to keep you motivated. It gives you a
                way to govern what happens after motivation fades.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.8fr)]">
            <div>
              <p className="vs-label mb-6">User progression</p>
              <h2 className="vs-title max-w-[38rem]">
                The movement is deliberate: define, structure, inspect, correct.
              </h2>
            </div>
            <p className="vs-copy vs-rule-top max-w-sm pt-8">
              Each step depends on the last. Without standards, structure is
              empty. Without structure, review is sporadic. Without review,
              correction arrives too late.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-14 space-y-8">
            {progression.map((step) => (
              <div
                key={step.label}
                className="grid gap-4 border-t border-[color:var(--vs-line)] pt-7 md:grid-cols-[3.2rem_minmax(0,1fr)]"
              >
                <span className="vs-label pt-1">{step.label}</span>
                <div className="max-w-[40rem]">
                  <h3 className="vs-subtitle">{step.title}</h3>
                  <p className="vs-copy mt-4">{step.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-surface-alt">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(14rem,0.58fr)_minmax(0,1.42fr)]">
            <div>
              <p className="vs-label vs-label-alt mb-6">Working sequence</p>
              <h2 className="vs-title max-w-[26rem]">
                A practical frame, not a vague philosophy.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {sequence.map((item) => (
                <article key={item.title} className="border-t border-[color:var(--vs-line-strong)] pt-6">
                  <h3 className="vs-subtitle">{item.title}</h3>
                  <p className="vs-copy mt-4">{item.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div>
              <p className="vs-label mb-6">What changes</p>
              <h2 className="vs-title max-w-[32rem]">
                Consistency changes the quality of judgment before it changes
                the quantity of output.
              </h2>
            </div>
            <div className="space-y-7">
              {effects.map((effect, index) => (
                <div
                  key={effect}
                  className="grid gap-4 border-t border-[color:var(--vs-line)] pt-6 md:grid-cols-[2.8rem_minmax(0,1fr)]"
                >
                  <span className="vs-label pt-1">0{index + 1}</span>
                  <p className="vs-copy max-w-[38rem]">{effect}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.8fr)]">
            <div>
              <p className="vs-label mb-6">Next action</p>
              <h2 className="vs-title max-w-[38rem]">
                If this framework reads as necessary rather than severe, continue
                to join.
              </h2>
              <p className="vs-copy mt-8 max-w-[40rem]">
                The next step is not to admire the method. It is to decide
                whether you want to work inside it with enough seriousness for
                it to change your conduct.
              </p>
            </div>
            <div className="flex flex-col gap-4 self-end sm:flex-row lg:flex-col lg:items-start">
              <Link href="/join" className="vs-btn">
                Continue to join
              </Link>
              <Link href="/events" className="vs-btn vs-btn-subtle">
                Check current events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
