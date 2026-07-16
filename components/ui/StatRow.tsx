import { AnimatedCounter } from "./AnimatedCounter";
import { Reveal } from "./Reveal";

const stats = [
  { value: 300, suffix: "+", label: "People in governed practice" },
  { value: 48, suffix: "", label: "Live sessions held" },
  { value: 92, suffix: "%", label: "Return after first session" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "Session clarity rating" },
];

export function StatRow() {
  return (
    <section className="vs-section vs-surface">
      <div className="vs-wrap py-12">
        <Reveal className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-[color:var(--vs-line)]">
          {stats.map((stat) => (
            <div key={stat.label} className="lg:pl-8 first:lg:pl-0">
              <p className="vs-stat-value">
                <AnimatedCounter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </p>
              <p className="vs-stat-label">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
