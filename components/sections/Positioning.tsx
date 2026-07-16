import { Reveal } from "../ui/Reveal";

const fitNotes = [
  {
    label: "Works for",
    text: "People carrying real responsibility who want a structure strong enough to expose self-deception, not hide it.",
  },
  {
    label: "Falls apart for",
    text: "Anyone looking for stimulation, identity, or another system to admire without letting it make demands.",
  },
];

export function Positioning() {
  return (
    <section className="vs-section vs-tint-warm">
      <div className="vs-wrap vs-section-inner-tight">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <Reveal className="max-w-[40rem]">
            <p className="vs-label vs-label-alt mb-4">Positioning</p>
            <h2 className="vs-title max-w-[33rem]">
              This is not a productivity layer. It is a place to make inner
              governance explicit.
            </h2>
            <div className="mt-8 max-w-[35rem]">
              <p className="vs-copy">
                The point is to close the distance between stated values and
                repeated behavior. VisionSmith gives that work a frame: not
                loose journaling, not performance theater, but disciplined
                inspection.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-8 lg:pt-8">
            {fitNotes.map((item, index) => (
              <div
                key={item.label}
                className="border-t border-[color:var(--vs-line-strong)] pt-6"
              >
                <p className="vs-label mb-3">
                  0{index + 1} — {item.label}
                </p>
                <p className="vs-copy max-w-[28rem]">{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
