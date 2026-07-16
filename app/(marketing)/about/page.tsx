import Link from "next/link";
import { Parallax } from "../../../components/ui/Parallax";
import { Reveal } from "../../../components/ui/Reveal";

const refusals = [
  "It is not a place to accumulate better language without changing conduct.",
  "It is not built to keep people emotionally activated or endlessly inspired.",
  "It is not interested in performance, identity construction, or public virtue.",
];

const standards = [
  {
    title: "Clarity before motion",
    text: "Direction is set before action multiplies. VisionSmith assumes that ungoverned activity is often a refined form of avoidance.",
  },
  {
    title: "Structure over mood",
    text: "The platform is designed around repeatable standards, not temporary states. What matters should remain legible when enthusiasm disappears.",
  },
  {
    title: "Evidence over self-story",
    text: "A person is not assessed by intention alone. Conduct, omissions, review, and correction carry more weight than explanation.",
  },
];

const fit = [
  "People carrying responsibility who need a stronger interior standard than productivity culture can offer.",
  "People willing to examine their own conduct without theatrics, branding, or self-protection.",
  "People who do not need more content, but a place where thought, review, and execution answer to the same frame.",
];

export default function AboutPage() {
  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,2.05fr)_minmax(15rem,0.85fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">What this platform is</p>
              <h1 className="vs-display max-w-[46rem]">
                VisionSmith is a platform for people who want their inner
                government made explicit.
              </h1>
              <p className="vs-copy mt-10 max-w-[40rem]">
                It exists for the disciplined work of becoming more coherent:
                bringing values, standards, review, and execution into one
                governed frame so a person can be answered by their conduct, not
                only by what they mean well.
              </p>
            </div>

            <div className="vs-card">
              <p className="vs-label vs-label-alt mb-5">Plainly stated</p>
              <Parallax strength={12}>
                <figure className="vs-media">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=760&q=80"
                    alt="Quiet architectural lines expressing structure and order"
                    loading="lazy"
                  />
                </figure>
              </Parallax>
              <p className="vs-meta mt-5">
                This is not a platform for intensity. It is a platform for
                ordered responsibility.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.8fr)]">
            <div>
              <p className="vs-label mb-6">Why it exists</p>
              <h2 className="vs-title max-w-[40rem]">
                Because many serious people are not lacking desire. They are
                lacking an ordered way to live under what they already know.
              </h2>
            </div>
            <p className="vs-copy max-w-sm">
              VisionSmith exists to reduce the distance between recognition and
              practice. Not by supplying more stimulation, but by giving a
              person somewhere to return when they need honesty, order, and
              correction.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(14rem,0.6fr)_minmax(0,1.4fr)]">
            <div>
              <p className="vs-label vs-label-on-dark mb-6">What it refuses</p>
              <h2 className="vs-title max-w-sm">
                The platform is defined as much by refusal as by method.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {refusals.map((item, index) => (
                <div key={item} className="vs-card vs-card-on-dark">
                  <span className="vs-label vs-label-on-dark">0{index + 1}</span>
                  <p className="vs-copy mt-4">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[36rem]">
            <p className="vs-label mb-6">Standards behind it</p>
            <h2 className="vs-title max-w-[28rem]">
              The philosophy is practical: what governs a life should be
              visible enough to withstand pressure.
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-12 grid gap-6 md:grid-cols-3">
            {standards.map((item) => (
              <article key={item.title} className="vs-card">
                <h3 className="vs-subtitle">{item.title}</h3>
                <p className="vs-copy mt-4">{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.8fr)]">
            <div>
              <p className="vs-label vs-label-on-accent mb-6">Built for</p>
              <h2 className="vs-title max-w-[38rem]">
                VisionSmith is built for the person who would rather be
                corrected than flattered.
              </h2>
              <div className="mt-10 space-y-5 max-w-[40rem]">
                {fit.map((item) => (
                  <p key={item} className="vs-copy">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-6 self-end">
              <p className="vs-meta max-w-[16rem]">
                If that description feels clarifying rather than severe, the
                next step is direct.
              </p>
              <Link href="/join" className="vs-btn vs-btn-on-accent">
                Continue to join
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
