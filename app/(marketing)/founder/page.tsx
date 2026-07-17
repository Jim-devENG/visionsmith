import Link from "next/link";
import { sql } from "../../../lib/db";
import { Reveal } from "../../../components/ui/Reveal";
import { Stamp } from "../../../components/ui/Stamp";

export default async function FounderPage() {
  const rows = await sql`select name, photo_url, body_html from founder_page where id = 1`;
  const founder = rows[0] as { name: string; photo_url: string | null; body_html: string };

  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,1fr)] lg:items-end">
            <div>
              <p className="vs-label mb-8">Founder</p>
              <h1 className="vs-display max-w-[36rem]">{founder.name}</h1>
              <p className="vs-copy mt-8 max-w-[36rem]">
                The person behind the standard VisionSmith holds everyone to,
                starting with itself.
              </p>
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

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[38rem]">
            <p className="vs-label vs-label-on-dark mb-6">Standard</p>
            <p className="vs-title">
              "The platform doesn't ask anything of you that it doesn't first
              ask of me."
            </p>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[42rem]">
            {founder.body_html ? (
              <div className="prose-editor" dangerouslySetInnerHTML={{ __html: founder.body_html }} />
            ) : (
              <p className="vs-copy">More on the founder is coming soon.</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="vs-title max-w-[35rem]">Work inside the standard.</p>
            <Link href="/join" className="vs-btn vs-btn-on-accent">
              Enter VisionSmith
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
