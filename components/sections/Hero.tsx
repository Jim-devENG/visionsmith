import Link from "next/link";
import { Parallax } from "../ui/Parallax";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  return (
    <section className="vs-section vs-surface">
      <div className="vs-wrap vs-section-inner-open">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:items-start">
          <Reveal>
            <p className="vs-label mb-6">Direction before activity</p>
            <h1 className="vs-display max-w-[46rem]">
              Build a standard that can govern your weeks.
            </h1>
            <p className="vs-copy mt-8 max-w-[40rem]">
              VisionSmith is a platform for serious people who are no longer
              asking for more ideas. The work here is to make standards visible,
              apply them under pressure, and keep review close enough to
              execution that drift is caught early.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/join" className="vs-btn">
                Enter VisionSmith
              </Link>
              <Link href="/how-it-works" className="vs-btn vs-btn-subtle">
                Learn how it works
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="vs-card space-y-5">
              <p className="vs-label vs-label-alt">Position</p>
              <p className="vs-meta max-w-[16rem]">
                This is not self-improvement content. It is a governed working
                environment.
              </p>
              <Parallax strength={16}>
                <figure className="vs-media">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=920&q=80"
                    alt="Working table with notebook, planner, and coffee"
                    loading="lazy"
                  />
                </figure>
              </Parallax>
              <p className="vs-media-caption">Deliberate weekly practice</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
