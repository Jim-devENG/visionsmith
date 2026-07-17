"use client";

export function ConfirmDeleteButton({
  action,
  confirmMessage = "Are you sure? This cannot be undone.",
  label = "Delete",
}: {
  action: (formData: FormData) => void;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-[13px] font-semibold text-[color:var(--vs-subtle)] transition-colors hover:text-[color:var(--vs-accent-2)]"
      >
        {label}
      </button>
    </form>
  );
}
