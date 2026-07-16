import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { SessionPanel } from "../ui/SessionPanel";

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
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,1fr)] lg:items-center">
          <Reveal>
            <p className="vs-label mb-5">Live working session</p>
            <h2 className="vs-title max-w-[36rem]">
              Current session: establishing a personal operating standard
            </h2>
            <p className="vs-copy mt-6 max-w-[36rem]">
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

            <Link href="/events" className="vs-btn mt-10">
              View current events
            </Link>
          </Reveal>

          <SessionPanel />
        </div>
      </div>
    </section>
  );
}
