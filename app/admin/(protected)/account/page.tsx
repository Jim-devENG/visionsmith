import { AdminShell } from "../../../../components/admin/AdminShell";
import { changePassword } from "./actions";

type AccountPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function AdminAccountPage({ searchParams }: AccountPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;
  const success = params?.success;

  return (
    <AdminShell>
    <div className="max-w-[26rem]">
      <p className="vs-label mb-4">Account</p>
      <h1 className="vs-title">Change password</h1>

      <form action={changePassword} className="vs-card mt-8 space-y-6">
        {error ? (
          <p role="alert" className="border-l-2 border-[color:var(--vs-accent-2)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            {error}
          </p>
        ) : null}
        {success ? (
          <p role="status" className="border-l-2 border-[color:var(--vs-accent)] pl-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            Password updated.
          </p>
        ) : null}

        <div>
          <label htmlFor="current_password">Current password</label>
          <input
            id="current_password"
            name="current_password"
            type="password"
            autoComplete="current-password"
            required
            className="vs-input mt-3"
          />
        </div>

        <div>
          <label htmlFor="new_password">New password</label>
          <input
            id="new_password"
            name="new_password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="vs-input mt-3"
          />
        </div>

        <div>
          <label htmlFor="confirm_password">Confirm new password</label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="vs-input mt-3"
          />
        </div>

        <button type="submit" className="vs-btn w-full">
          Update password
        </button>
      </form>
    </div>
    </AdminShell>
  );
}
