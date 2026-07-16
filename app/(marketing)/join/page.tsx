import { Parallax } from "../../../components/ui/Parallax";
import { Reveal } from "../../../components/ui/Reveal";
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
      <section className="vs-section">
        <Reveal className="vs-wrap vs-section-inner-open">
          <p className="vs-label mb-8">Entry</p>
          <h1 className="vs-display max-w-[48rem]">
            Joining VisionSmith is a decision to live under a clearer standard.
          </h1>
          <p className="vs-copy mt-10 max-w-[40rem]">
            This is where interest becomes participation. Enter only if you
            intend to let structure shape conduct, not only language.
          </p>
        </Reveal>
      </section>

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label vs-label-alt mb-6">What stepping in means</p>
              <h2 className="vs-title">
                The environment asks for steadiness, not display.
              </h2>
            </div>

            <div className="space-y-8">
              <div className="grid gap-4 border-t border-[color:var(--vs-line)] pt-6 md:grid-cols-[10.5rem_minmax(0,1fr)]">
                <p className="vs-label vs-label-alt">Expectation</p>
                <p className="vs-copy max-w-[36rem]">
                  You are expected to approach the work honestly, to name things
                  plainly, and to let structure challenge convenience.
                </p>
              </div>

              <div className="grid gap-4 border-t border-[color:var(--vs-line)] pt-6 md:grid-cols-[10.5rem_minmax(0,1fr)]">
                <p className="vs-label vs-label-alt">Engagement</p>
                <p className="vs-copy max-w-[36rem]">
                  Participation is active. The value comes from returning,
                  reviewing, correcting, and keeping your own record in view.
                </p>
              </div>

              <div className="grid gap-4 border-t border-[color:var(--vs-line)] pt-6 md:grid-cols-[10.5rem_minmax(0,1fr)]">
                <p className="vs-label vs-label-alt">Environment</p>
                <p className="vs-copy max-w-[36rem]">
                  The space is quieter than most online environments and less
                  interested in performance. It is built for sustained
                  responsibility.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint-warm">
        <div className="vs-wrap vs-section-inner">
          <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="max-w-[22rem]">
              <p className="vs-label mb-6">What you gain</p>
              <h2 className="vs-title">
                Better conditions for clear judgment and consistent execution.
              </h2>
            </div>

            <div className="space-y-7">
              {[
                "Clearer decisions because standards and obligations are made explicit.",
                "Stronger structure because review and correction have a defined place.",
                "Greater consistency because commitments stay visible in one environment.",
                "A serious atmosphere where discipline is treated as ordinary practice.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="grid gap-4 border-t border-[color:var(--vs-line-strong)] pt-6 md:grid-cols-[2.7rem_minmax(0,1fr)]"
                >
                  <span className="vs-label">0{index + 1}</span>
                  <p className="vs-copy max-w-[38rem]">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vs-section">
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
              <Parallax strength={12} className="mt-10 max-w-[20rem]">
                <figure className="vs-media">
                  <img
                    src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=920&q=80"
                    alt="Journal and writing tools prepared for reflection"
                    loading="lazy"
                  />
                </figure>
              </Parallax>
            </div>

            <form
              action={submitParticipantEntry}
              className="border border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] p-8 sm:p-10"
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

                <button type="submit" className="vs-btn">
                  Enter VisionSmith
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
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
