import { login } from "./actions";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  return (
    <main className="vs-admin flex min-h-screen items-center justify-center bg-[color:var(--vs-bg)] px-6">
      <div className="w-full max-w-[24rem]">
        <p className="vs-label mb-6">VisionSmith</p>
        <h1 className="vs-title">Admin sign in</h1>
        <p className="vs-copy mt-3">Restricted to authorized administrators.</p>

        <form action={login} className="vs-card mt-8 space-y-6">
          {error ? (
            <p
              role="alert"
              className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]"
            >
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="vs-input mt-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="vs-input mt-3"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="vs-btn w-full">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
