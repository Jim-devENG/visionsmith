import { Checklist } from "../../../components/ui/Checklist";
import { Reveal } from "../../../components/ui/Reveal";
import { Stamp } from "../../../components/ui/Stamp";
import { submitParticipantEntry } from "./actions";

type JoinPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  return (
    <main>
      <section className="vs-section vs-surface">
        <Reveal className="vs-wrap vs-section-inner-open">
          <p className="vs-label mb-8">Entry</p>
          <h1 className="vs-display max-w-[34rem]">
            Live under a clearer standard.
          </h1>
          <p className="vs-copy mt-10 max-w-[40rem]">
            This is where interest becomes participation. Enter only if you
            intend to let structure shape conduct, not only language.
          </p>
        </Reveal>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[36rem]">
            <p className="vs-label mb-6">What stepping in means</p>
            <h2 className="vs-title">
              The environment asks for steadiness, not display.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            <Reveal className="border-t border-[color:var(--vs-line-strong)] pt-6">
              <p className="vs-label vs-label-alt mb-3">Expectation</p>
              <p className="vs-copy">
                You are expected to approach the work honestly, to name things
                plainly, and to let structure challenge convenience.
              </p>
            </Reveal>
            <Reveal delay={100} className="border-t border-[color:var(--vs-line-strong)] pt-6">
              <p className="vs-label vs-label-alt mb-3">Engagement</p>
              <p className="vs-copy">
                Participation is active. The value comes from returning,
                reviewing, correcting, and keeping your own record in view.
              </p>
            </Reveal>
            <Reveal delay={200} className="border-t border-[color:var(--vs-line-strong)] pt-6">
              <p className="vs-label vs-label-alt mb-3">Environment</p>
              <p className="vs-copy">
                The space is quieter than most online environments and less
                interested in performance. It is built for sustained
                responsibility.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="vs-section vs-section-dark">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="max-w-[36rem]">
            <p className="vs-label vs-label-on-dark mb-6">What you gain</p>
            <h2 className="vs-title">
              Better conditions for clear judgment and consistent execution.
            </h2>
          </Reveal>

          <div className="mt-12 max-w-[46rem]">
            <Checklist
              onDark
              items={[
                "Clearer decisions because standards and obligations are made explicit.",
                "Stronger structure because review and correction have a defined place.",
                "Greater consistency because commitments stay visible in one environment.",
                "A serious atmosphere where discipline is treated as ordinary practice.",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label vs-label-alt mb-6">Enter</p>
              <h2 className="vs-title">
                Leave a direct line of contact. Entry stays simple.
              </h2>
              <p className="vs-copy mt-8">
                Event participation follows this same entry path. Join once,
                then move inside the platform rhythm.
              </p>
              <Stamp label="Entry recorded" />
            </div>

            <form
              action={submitParticipantEntry}
              className="vs-card"
            >
              <div className="space-y-8">
                {error ? (
                  <p
                    role="alert"
                    className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]"
                  >
                    {error}
                  </p>
                ) : null}

                <div>
                  <label htmlFor="full_name">Full name</label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={120}
                    className="vs-input mt-3"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    className="vs-input mt-3"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="intention">Intention (optional)</label>
                  <textarea
                    id="intention"
                    name="intention"
                    rows={4}
                    maxLength={280}
                    className="vs-textarea mt-3"
                    placeholder="State the reason you are entering now."
                  />
                </div>

                <button type="submit" className="vs-btn w-full">
                  Enter VisionSmith
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <p className="vs-title max-w-[40rem]">
            Enter only if you intend to let the structure require something of
            you.
          </p>
        </div>
      </section>
    </main>
  );
}
