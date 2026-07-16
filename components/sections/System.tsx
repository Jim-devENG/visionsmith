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
    <section className="vs-section vs-surface">
      <div className="vs-wrap vs-section-inner">
        <Reveal className="max-w-[36rem]">
          <p className="vs-label mb-4">System value</p>
          <h2 className="vs-title">
            The platform helps turn private standards into repeatable conduct.
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-12 grid gap-6 md:grid-cols-3">
          {systemOutcomes.map((item, index) => (
            <div key={item.title} className="vs-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--vs-accent-soft)] text-[13px] font-bold text-[color:var(--vs-accent-strong)]">
                {index + 1}
              </span>
              <h3 className="vs-subtitle mt-6">{item.title}</h3>
              <p className="vs-copy mt-3">{item.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
