import React from 'react';

interface DecisionRationaleCardProps {
  rfp: {
    rationale?: string;
    ai_summary?: string | null;
    ai_output?: string | null;
    decision_reason?: string;
    decision_rationale?: string;
    whySku?: string[];
    whyScenario?: string[];
    risks?: string[];
    estimated_win_probability?: number;
  };
}

type AiNarrative = {
  ai_summary?: string;
  decision_reason?: string;
  one_liner?: string;
};

/**
 * Parses the AI agent response from n8n.
 * Handles:
 * - Plain JSON object string
 * - JSON string wrapped in markdown code fences (```json ... ```)
 * - JSON array containing { "output": "<that json or fenced json>" }
 */
function parseAiOutput(raw?: string | null): AiNarrative {
  if (!raw) return {};

  let text = raw.trim();

  // 1) Unwrap JSON array with { output: "..." }
  try {
    if (text.startsWith('[')) {
      const arr = JSON.parse(text);
      const first = Array.isArray(arr) ? arr[0] : null;
      if (first && typeof first.output === 'string') {
        text = first.output.trim();
      }
    }
  } catch {
    // ignore, keep original text
  }

  // 2) Strip markdown code fences like ```json ... ```
  text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  // 3) Try to parse the remaining JSON object
  try {
    const parsed = JSON.parse(text) as AiNarrative;
    return {
      ai_summary: parsed.ai_summary?.trim(),
      decision_reason: parsed.decision_reason?.trim(),
      one_liner: parsed.one_liner?.trim(),
    };
  } catch {
    // If still not valid JSON, fall back by returning everything as ai_summary
    return {
      ai_summary: text,
    };
  }
}

const DecisionRationaleCard = ({ rfp }: DecisionRationaleCardProps) => {
  // Parse the AI output - check both ai_summary and ai_output fields
  const { ai_summary, decision_reason, one_liner } = parseAiOutput(
    rfp.ai_summary ?? rfp.ai_output ?? null
  );

  return (
    <div className="card-rfp lg:col-span-3">
      <section>
        <h3 className="text-lg font-semibold mb-3">Decision Rationale</h3>

        {ai_summary && (
          <p className="text-sm text-slate-800 leading-relaxed">
            {ai_summary}
          </p>
        )}

        {decision_reason && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Why
            </h4>
            <p className="mt-1 text-sm text-slate-800">
              {decision_reason}
            </p>
          </div>
        )}

        {one_liner && (
          <div className="mt-4 border-l-2 border-slate-300 pl-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              One‑sentence summary
            </h4>
            <p className="mt-1 text-sm text-slate-800 italic">
              {one_liner}
            </p>
          </div>
        )}

        {!ai_summary && !decision_reason && !one_liner && (
          <p className="text-sm text-slate-500 italic">
            No AI summary available.
          </p>
        )}
      </section>
    </div>
  );
};

export default DecisionRationaleCard;

