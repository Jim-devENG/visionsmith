import { Reveal } from "../ui/Reveal";

const systemOutcomes = [
  {
    title: "Name the line",
    text: "State the principles, boundaries, and obligations that should still hold when convenience starts arguing.",
  },
  {
    title: "Build the cadence",
    text: "Translate judgment into weekly review, recurring examination, and concrete commitments that survive mood shifts.",
  },
  {
    title: "Inspect the evidence",
    text: "Keep a visible record so promises are measured against conduct, correction, and completed work.",
  },
];

export function System() {
  return (
    <section className="vs-section">
      <div className="vs-wrap vs-section-inner">
        <div className="grid gap-14 lg:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)]">
          <Reveal className="lg:pt-1">
            <p className="vs-label mb-4">System value</p>
            <h2 className="vs-title max-w-[22rem]">
              The platform helps turn private standards into repeatable conduct.
            </h2>
          </Reveal>

          <Reveal delay={150} className="space-y-8">
            {systemOutcomes.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-4 border-t border-[color:var(--vs-line)] pt-7 md:grid-cols-[3.2rem_minmax(0,1fr)]"
              >
                <span className="vs-label pt-1">0{index + 1}</span>
                <div className="max-w-[36rem]">
                  <h3 className="vs-subtitle">{item.title}</h3>
                  <p className="vs-copy mt-3">{item.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
