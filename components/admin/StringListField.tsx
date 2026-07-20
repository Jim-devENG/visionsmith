"use client";

import { useState } from "react";

export function StringListField({
  name,
  label,
  defaultValue,
  placeholder,
  max = 12,
}: {
  name: string;
  label: string;
  defaultValue?: string[];
  placeholder?: string;
  max?: number;
}) {
  const [items, setItems] = useState<string[]>(defaultValue ?? []);

  function update(index: number, value: string) {
    setItems((prev) => prev.map((q, i) => (i === index ? value : q)));
  }

  function remove(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function add() {
    if (items.length >= max) return;
    setItems((prev) => [...prev, ""]);
  }

  return (
    <div>
      <label>{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items.map((q) => q.trim()).filter(Boolean))} />

      <div className="mt-3 space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(event) => update(index, event.target.value)}
              maxLength={140}
              placeholder={placeholder}
              className="vs-input"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-[13px] font-semibold text-[color:var(--vs-subtle)] transition-colors hover:text-[color:var(--vs-accent-2)]"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {items.length < max ? (
        <button type="button" onClick={add} className="vs-btn vs-btn-subtle mt-3 !py-2 text-[13px]">
          Add item
        </button>
      ) : null}
    </div>
  );
}
