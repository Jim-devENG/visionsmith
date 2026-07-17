import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { SessionPanel } from "../ui/SessionPanel";

const details = [
  { label: "Format", text: "60 minutes. Live. Structured." },
  {
    label: "Examines",
    text: "Pattern-finding, architecture, and the thinking behind a build.",
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
              Current session: finding the pattern first.
            </h2>
            <p className="vs-copy mt-5 max-w-[36rem]">
              Naming the problem, finding the structure inside it, sketching
              the architecture before anything gets built.
            </p>

            <div className="mt-7 space-y-3">
              {details.map((item, index) => (
                <div key={item.label} className="vs-card vs-card-accent-top flex items-center gap-4 !p-4">
                  <span className="vs-icon-badge !h-9 !w-9 shrink-0 text-[13px]">{index + 1}</span>
                  <div>
                    <p className="vs-label vs-label-alt mb-1">{item.label}</p>
                    <p className="vs-copy text-[0.9rem]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/events" className="vs-btn mt-8">
              View current events
            </Link>
          </Reveal>

          <SessionPanel />
        </div>
      </div>
    </section>
  );
}
