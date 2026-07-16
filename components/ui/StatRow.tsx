import { Reveal } from "./Reveal";

const stats = [
  { value: "300+", label: "People in governed practice" },
  { value: "48", label: "Live sessions held" },
  { value: "92%", label: "Return after first session" },
  { value: "4.8/5", label: "Session clarity rating" },
];

export function StatRow() {
  return (
    <section className="vs-section vs-section-dark">
      <div className="vs-wrap vs-section-inner-tight">
        <Reveal className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="vs-stat-value">{stat.value}</p>
              <p className="vs-stat-label">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
