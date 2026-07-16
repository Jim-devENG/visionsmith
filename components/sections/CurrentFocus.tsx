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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,1fr)]">
          <Reveal>
            <div className="vs-card h-full">
              <p className="vs-label mb-5">Live working session</p>
              <h2 className="vs-title max-w-[38rem]">
                Current session: establishing a personal operating standard
              </h2>
              <p className="vs-copy mt-6 max-w-[38rem]">
                This session walks through the sequence directly: defining what
                governs, setting review intervals, making obligations visible,
                and correcting drift before it compounds. The point is to see
                the architecture in use and decide whether you want to work
                inside it.
              </p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                {details.map((item) => (
                  <div key={item.label}>
                    <dt className="vs-label vs-label-alt mb-2">{item.label}</dt>
                    <dd className="vs-copy">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-5">
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

            <Link href="/events" className="vs-btn w-full">
              View current events
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
