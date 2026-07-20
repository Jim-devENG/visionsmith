"use client";

import { useEffect, useRef, useState } from "react";

const fieldBase =
  "w-full border-0 border-b border-[color:var(--vs-line-strong)] bg-transparent px-0 pb-3 pt-6 text-[1.05rem] text-[color:var(--vs-ink)] outline-none transition-colors focus:border-[color:var(--vs-accent)]";

export function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 font-medium text-[color:var(--vs-subtle)] transition-all duration-200 ${
          floated ? "top-0 text-[12px] tracking-[0.04em] uppercase" : "top-6 text-[1.05rem]"
        }`}
      >
        {label}
        {required ? <span className="text-[color:var(--vs-accent)]"> *</span> : null}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={fieldBase}
      />
    </div>
  );
}

export function FloatingTextarea({
  label,
  value,
  onChange,
  maxLength,
  hint,
  required,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  hint?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 font-medium text-[color:var(--vs-subtle)] transition-all duration-200 ${
          floated ? "top-0 text-[12px] tracking-[0.04em] uppercase" : "top-6 text-[1.05rem]"
        }`}
      >
        {label}
        {required ? <span className="text-[color:var(--vs-accent)]"> *</span> : null}
      </label>
      {hint ? <p className="mt-1 text-[13px] text-[color:var(--vs-subtle)]">{hint}</p> : null}
      <textarea
        ref={ref}
        value={value}
        required={required}
        autoFocus={autoFocus}
        maxLength={maxLength}
        rows={1}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${fieldBase} resize-none overflow-hidden ${hint ? "mt-2" : ""}`}
      />
      {maxLength ? (
        <p className="mt-1 text-right text-[12px] text-[color:var(--vs-subtle)]">
          {value.length}/{maxLength}
        </p>
      ) : null}
    </div>
  );
}

export function ChoiceGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-[var(--vs-radius-pill)] border px-4 py-2 text-[13px] font-semibold transition-colors ${
              active
                ? "border-[color:var(--vs-ink)] bg-[color:var(--vs-ink)] text-white"
                : "border-[color:var(--vs-line-strong)] text-[color:var(--vs-ink-soft)] hover:border-[color:var(--vs-accent)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
