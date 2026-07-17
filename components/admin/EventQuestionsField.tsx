"use client";

import { useState } from "react";

export function EventQuestionsField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string[];
}) {
  const [questions, setQuestions] = useState<string[]>(defaultValue ?? []);

  function update(index: number, value: string) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? value : q)));
  }

  function remove(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  function add() {
    if (questions.length >= 10) return;
    setQuestions((prev) => [...prev, ""]);
  }

  return (
    <div>
      <label>Registration questions (optional)</label>
      <input type="hidden" name={name} value={JSON.stringify(questions.map((q) => q.trim()).filter(Boolean))} />

      <div className="mt-3 space-y-3">
        {questions.map((question, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={question}
              onChange={(event) => update(index, event.target.value)}
              maxLength={140}
              placeholder="e.g. Which track are you attending?"
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

      {questions.length < 10 ? (
        <button type="button" onClick={add} className="vs-btn vs-btn-subtle mt-3 !py-2 text-[13px]">
          Add question
        </button>
      ) : null}
    </div>
  );
}
