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
    <section className="vs-section vs-section-accent">
      <div className="vs-wrap vs-section-inner">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <Reveal className="max-w-[40rem]">
            <p className="vs-label vs-label-on-accent mb-4">Positioning</p>
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

          <Reveal delay={150} className="space-y-5 lg:pt-2">
            {fitNotes.map((item) => (
              <div key={item.label} className="vs-card vs-card-on-accent">
                <p className="vs-label vs-label-on-accent mb-3">{item.label}</p>
                <p className="vs-copy max-w-[28rem]">{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
