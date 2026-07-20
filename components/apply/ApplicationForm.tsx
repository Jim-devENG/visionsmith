"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingInput, FloatingTextarea, ChoiceGroup } from "./fields";
import { submitApplication, type ApplicationPayload } from "../../app/apply/[slug]/actions";

const CATEGORIES = ["Business", "Career", "Startup", "Technology", "Ministry", "Personal Brand", "Community", "Other"];
const COMMITMENT_LEVELS = ["Absolutely", "I'll do my best", "Not sure"];

const EMPTY: ApplicationPayload = {
  fullName: "",
  email: "",
  whatsapp: "",
  country: "",
  linkedin: "",
  category: "",
  buildingDescription: "",
  biggestChallenge: "",
  situation: "",
  oneThing: "",
  whyStuck: "",
  successOutcome: "",
  commitment: "",
  whySelected: "",
};

const STEP_TITLES = [
  "About you",
  "What you're building",
  "Your challenge",
  "Reflection",
  "Desired outcome",
  "Commitment",
  "Review",
];

function stepIsValid(step: number, data: ApplicationPayload) {
  switch (step) {
    case 0:
      return Boolean(data.fullName.trim() && data.email.trim() && data.whatsapp.trim() && data.country.trim());
    case 1:
      return Boolean(data.category && data.buildingDescription.trim());
    case 2:
      return Boolean(data.biggestChallenge.trim() && data.situation.trim() && data.oneThing.trim());
    case 3:
      return Boolean(data.whyStuck.trim());
    case 4:
      return Boolean(data.successOutcome.trim());
    case 5:
      return Boolean(data.commitment && data.whySelected.trim());
    default:
      return true;
  }
}

export function ApplicationForm({
  sessionId,
  sessionSlug,
  ctaLabel,
  successHeading,
  successMessage,
  isClosed,
}: {
  sessionId: number;
  sessionSlug: string;
  ctaLabel: string;
  successHeading: string;
  successMessage: string;
  isClosed: boolean;
}) {
  const storageKey = `vs-apply-${sessionSlug}`;
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ApplicationPayload>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setData({ ...EMPTY, ...JSON.parse(saved) });
    } catch {
      // ignore corrupt/unavailable storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      // ignore storage failures (private browsing, quota, etc.)
    }
  }, [storageKey, data]);

  function set<K extends keyof ApplicationPayload>(key: K, value: ApplicationPayload[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const totalSteps = STEP_TITLES.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const canAdvance = stepIsValid(step, data);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const result = await submitApplication(sessionId, sessionSlug, data);
    setSubmitting(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setSubmitted(true);
  }

  if (isClosed) {
    return (
      <div id="apply" className="mx-auto max-w-[32rem] py-10 text-center">
        <p className="vs-label mx-auto mb-4">Applications closed</p>
        <p className="vs-copy">
          Requests for this session are no longer being accepted. Check back for the next cohort.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        id="apply"
        className="mx-auto max-w-[32rem] py-10 text-center"
      >
        <p className="vs-label mx-auto mb-6">Request received</p>
        <h2 className="vs-title">{successHeading}</h2>
        <p className="vs-copy mt-5">{successMessage}</p>
        <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-[color:var(--vs-subtle)]">
          Think deeply. Build wisely.
        </p>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-[color:var(--vs-subtle)]">
          Every chaos has a pattern.
        </p>
      </motion.div>
    );
  }

  return (
    <div id="apply" className="mx-auto max-w-[32rem] py-10">
      <div className="mb-10">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-[color:var(--vs-line)]">
          <motion.div
            className="h-full bg-[color:var(--vs-accent)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--vs-subtle)]">
          Step {step + 1} of {totalSteps} · {STEP_TITLES[step]}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {step === 0 ? (
            <>
              <FloatingInput label="Full name" value={data.fullName} onChange={(v) => set("fullName", v)} required autoFocus />
              <FloatingInput label="Email" type="email" value={data.email} onChange={(v) => set("email", v)} required />
              <FloatingInput label="WhatsApp number" type="tel" value={data.whatsapp} onChange={(v) => set("whatsapp", v)} required />
              <FloatingInput label="Country" value={data.country} onChange={(v) => set("country", v)} required />
              <FloatingInput label="LinkedIn (optional)" value={data.linkedin} onChange={(v) => set("linkedin", v)} />
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div>
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em] text-[color:var(--vs-subtle)]">
                  Category
                </p>
                <ChoiceGroup options={CATEGORIES} value={data.category} onChange={(v) => set("category", v)} />
              </div>
              <FloatingTextarea
                label="What are you trying to build?"
                value={data.buildingDescription}
                onChange={(v) => set("buildingDescription", v)}
                maxLength={500}
                required
                autoFocus
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <FloatingTextarea
                label="What's the biggest challenge you're facing?"
                value={data.biggestChallenge}
                onChange={(v) => set("biggestChallenge", v)}
                maxLength={500}
                required
                autoFocus
              />
              <FloatingTextarea
                label="Describe your situation"
                value={data.situation}
                onChange={(v) => set("situation", v)}
                maxLength={600}
                required
              />
              <FloatingTextarea
                label="If we only solved one thing together, what should it be?"
                value={data.oneThing}
                onChange={(v) => set("oneThing", v)}
                maxLength={300}
                required
              />
            </>
          ) : null}

          {step === 3 ? (
            <FloatingTextarea
              label="Why do you think you're stuck?"
              hint="Help me understand your thinking, not just your situation."
              value={data.whyStuck}
              onChange={(v) => set("whyStuck", v)}
              maxLength={600}
              required
              autoFocus
            />
          ) : null}

          {step === 4 ? (
            <FloatingTextarea
              label="What would make this session a success for you?"
              value={data.successOutcome}
              onChange={(v) => set("successOutcome", v)}
              maxLength={500}
              required
              autoFocus
            />
          ) : null}

          {step === 5 ? (
            <>
              <div>
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em] text-[color:var(--vs-subtle)]">
                  If selected, are you willing to implement what we discuss?
                </p>
                <ChoiceGroup options={COMMITMENT_LEVELS} value={data.commitment} onChange={(v) => set("commitment", v)} />
              </div>
              <FloatingTextarea
                label="Why should you be selected?"
                value={data.whySelected}
                onChange={(v) => set("whySelected", v)}
                maxLength={500}
                required
              />
            </>
          ) : null}

          {step === 6 ? (
            <div className="space-y-5">
              {[
                ["Name", data.fullName],
                ["Email", data.email],
                ["WhatsApp", data.whatsapp],
                ["Country", data.country],
                ["Category", data.category],
                ["Building", data.buildingDescription],
                ["Biggest challenge", data.biggestChallenge],
                ["Commitment", data.commitment],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-[color:var(--vs-line)] pb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:var(--vs-subtle)]">
                    {label}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-[color:var(--vs-ink)]">{value || "—"}</p>
                </div>
              ))}
            </div>
          ) : null}

          {error ? (
            <p role="alert" className="text-[13px] font-medium text-[color:var(--vs-accent-strong)]">
              {error}
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`text-[13px] font-semibold text-[color:var(--vs-subtle)] transition-colors hover:text-[color:var(--vs-ink)] ${
            step === 0 ? "invisible" : ""
          }`}
        >
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
            className="vs-btn disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button type="button" disabled={submitting} onClick={handleSubmit} className="vs-btn disabled:opacity-60">
            {submitting ? "Submitting…" : ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
