"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  name,
  label,
  prefix,
  defaultValue,
}: {
  name: string;
  label: string;
  prefix: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prefix", prefix);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed.");
      setUrl(data.url);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed.");
    }
  }

  return (
    <div>
      <label>{label}</label>
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="mt-3 overflow-hidden rounded-[var(--vs-radius)] border border-[color:var(--vs-line)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="block h-40 w-full object-cover" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={status === "uploading"}
        className="vs-btn vs-btn-subtle mt-3 !py-2 text-[13px]"
      >
        {status === "uploading" ? "Uploading…" : url ? "Replace image" : "Upload image"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {error ? <p className="mt-2 text-[13px] text-[color:var(--vs-accent-strong)]">{error}</p> : null}
    </div>
  );
}
