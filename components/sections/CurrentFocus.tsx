import Link from "next/link";
import { Parallax } from "../ui/Parallax";
import { Reveal } from "../ui/Reveal";

const details = [
  { label: "Format", text: "60 minutes. Live. Structured." },
  {
    label: "Examines",
    text: "Standards, review cadence, obligation design.",
  },
  {
    label: "Suitable if",
    text: "You want a working method, not a persuasive atmosphere.",
  },
];

export function CurrentFocus() {
  return (
    <section className="vs-section vs-tint">
      <div className="vs-wrap vs-section-inner">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,1fr)]">
          <Reveal className="space-y-8">
            <p className="vs-label">Current focus</p>
            <div className="vs-rule-top max-w-[38rem] pt-8">
              <p className="vs-label mb-4">Live working session</p>
              <h2 className="vs-title">
                Current session: establishing a personal operating standard
              </h2>
              <p className="vs-copy mt-6">
                This session walks through the sequence directly: defining what
                governs, setting review intervals, making obligations visible,
                and correcting drift before it compounds. The point is to see
                the architecture in use and decide whether you want to work
                inside it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-7">
            <Parallax strength={14}>
              <figure className="vs-media">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
                  alt="Open notebook and pen prepared for a working session"
                  loading="lazy"
                />
              </figure>
            </Parallax>
            <p className="vs-media-caption">Live session preparation</p>

            <dl className="space-y-5">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-t border-[color:var(--vs-line)] pt-4"
                >
                  <dt className="vs-label">{item.label}</dt>
                  <dd className="vs-copy">{item.text}</dd>
                </div>
              ))}
            </dl>

            <Link href="/events" className="vs-btn w-full">
              View current events
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
