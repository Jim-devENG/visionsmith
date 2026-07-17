import Link from "next/link";
import { sql } from "../../../lib/db";
import { FrameRings } from "../../../components/ui/FrameRings";
import { Reveal } from "../../../components/ui/Reveal";
import { Stamp } from "../../../components/ui/Stamp";

const refusals = [
  "It is not a place to collect better language without ever building anything.",
  "It is not built to keep you inspired instead of clear.",
  "It is not interested in performance, personal branding, or borrowed confidence.",
];

const principles = [
  {
    title: "Clarity before construction",
    text: "Direction gets set before effort multiplies. VisionSmith assumes that motion without a pattern is often just a more sophisticated form of avoidance.",
  },
  {
    title: "Structure over inspiration",
    text: "VisionSmith is built around repeatable thinking, not temporary bursts of motivation. What matters should stay legible after the excitement fades.",
  },
  {
    title: "The build over the pitch",
    text: "A builder isn't judged by the story they tell about their idea. What gets built, and how clearly it was thought through, carries more weight than explanation.",
  },
];

const fit = [
  "Founders, creators, and leaders building something that has to hold up under real weight — a company, a product, an institution, a movement.",
  "People willing to examine their own thinking honestly, without performance, branding, or self-protection.",
  "People who don't need more content, but a place where thinking and building finally answer to the same standard of clarity.",
];

export default async function AboutPage() {
  const rows = await sql`select name, photo_url, body_html from founder_page where id = 1`;
  const founder = rows[0] as { name: string; photo_url: string | null; body_html: string };

  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,2.05fr)_minmax(15rem,0.85fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">What VisionSmith is</p>
              <h1 className="vs-display max-w-[36rem]">
                The home of a way of thinking.
              </h1>
              <p className="vs-copy mt-10 max-w-[40rem]">
                VisionSmith exists for builders — the people creating
                companies, products, ministries, movements, and ideas that
                need to hold up under real weight. We believe clarity has to
                come before construction, and that every serious thing gets
                built twice: first in thought, then in reality.
              </p>
            </div>

            <div className="vs-card">
              <p className="vs-label vs-label-alt mb-2">Plainly stated</p>
              <FrameRings />
              <p className="vs-meta mt-2 text-center">
                This is not a platform for motivation. It is a home for the
                thinking that precedes real building.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal>
            <div className="vs-card vs-card-accent-top grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.8fr)]">
              <div>
                <p className="vs-label mb-6">Why it exists</p>
                <h2 className="vs-title max-w-[40rem]">
                  Because most builders are not short on ideas. They are
                  short on a disciplined way to think before they build them.
                </h2>
              </div>
              <p className="vs-copy max-w-sm lg:border-l lg:border-[color:var(--vs-line)] lg:pl-8">
                VisionSmith exists to close the distance between a good idea
                and a well-built thing. Not by supplying more content, but by
                giving builders a place to return to when they need to think
                clearly before they act.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[36rem]">
            <p className="vs-label vs-label-on-dark mb-6">What it refuses</p>
            <h2 className="vs-title max-w-sm">
              The platform is defined as much by refusal as by method.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {refusals.map((item, index) => (
              <Reveal key={item} delay={index * 100} className="vs-card vs-card-on-dark vs-card-accent-top h-full">
                <span className="vs-icon-badge vs-icon-badge-on-dark">&times;</span>
                <p className="vs-copy mt-6">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[36rem]">
            <p className="vs-label mb-6">First principles</p>
            <h2 className="vs-title max-w-[28rem]">
              The philosophy is practical: thinking should be visible enough
              to survive contact with a real build.
            </h2>
          </Reveal>
          <div className="relative mt-12 max-w-[40rem] space-y-10 border-l border-[color:var(--vs-line-strong)] pl-8">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 120} className="relative">
                <span className="absolute -left-[2.55rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--vs-surface)] text-[12px] font-bold text-[color:var(--vs-accent-strong)] ring-4 ring-[color:var(--vs-accent-soft)]">
                  0{index + 1}
                </span>
                <h3 className="vs-subtitle">{item.title}</h3>
                <p className="vs-copy mt-3 max-w-[32rem]">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:items-center">
            <div>
              <p className="vs-label mb-6">Founder</p>
              <h2 className="vs-title max-w-[32rem]">{founder.name}</h2>
              {founder.body_html ? (
                <div
                  className="prose-editor mt-6 max-w-[34rem]"
                  dangerouslySetInnerHTML={{ __html: founder.body_html }}
                />
              ) : (
                <p className="vs-copy mt-6 max-w-[34rem]">
                  The person behind the way of thinking VisionSmith teaches,
                  starting with itself.
                </p>
              )}
            </div>

            {founder.photo_url ? (
              <figure className="vs-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={founder.photo_url} alt={founder.name} className="aspect-[4/5]" />
              </figure>
            ) : (
              <div className="vs-card flex items-center justify-center">
                <Stamp label="Founder" />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[40rem]">
            <p className="vs-label vs-label-on-accent mb-6">Built for</p>
            <h2 className="vs-title max-w-[38rem]">
              VisionSmith is built for people who are already building — and
              want to think more clearly while they do it.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {fit.map((item, index) => (
              <Reveal key={item} delay={index * 100} className="vs-card vs-card-on-accent vs-card-accent-top h-full">
                <span className="vs-icon-badge vs-icon-badge-on-accent">0{index + 1}</span>
                <p className="vs-copy mt-6">{item}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-12 flex flex-col items-start gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="vs-copy max-w-[28rem]">
              If that sounds like the way you already think, the next step
              is direct.
            </p>
            <Link href="/join" className="vs-btn vs-btn-on-accent shrink-0">
              Build with Clarity
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
