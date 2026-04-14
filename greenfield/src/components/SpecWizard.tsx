import { useState } from 'react';

const MISSIONS = [
  { id: 'efficiency', label: 'Help people do X faster and with less friction' },
  { id: 'quality', label: 'Help people produce higher-quality X' },
  { id: 'understanding', label: 'Help people understand complex X' },
  { id: 'custom', label: 'Write my own...' },
];

const PILLARS = [
  { id: 'clarity', label: 'Clarity over cleverness' },
  { id: 'reliability', label: 'Reliability over speed' },
  { id: 'simplicity', label: 'Simplicity over features' },
  { id: 'transparency', label: 'Transparency over convenience' },
  { id: 'depth', label: 'Depth over breadth' },
  { id: 'autonomy', label: 'User autonomy over guidance' },
];

interface WizardState {
  step: number;
  idea: string;
  mission: string;
  pillars: string[];
  interaction: string;
}

function generateOutput(state: WizardState) {
  const pillarLines = state.pillars.map((p, i) => `  ${i + 1}. ${PILLARS.find(x => x.id === p)?.label || p}`).join('\n');
  const missionText = state.mission === 'custom'
    ? '  [Your custom mission — be specific about why this exists]'
    : `  ${MISSIONS.find(m => m.id === state.mission)?.label.replace('X', state.idea) || state.mission}`;

  return `# L1: Philosophy
## Mission
${missionText}

## Design Pillars
${pillarLines}

---

# L2: Truths
## Core Commitment
  We sacrifice [WHAT] to be exceptional at [PILLAR-DERIVED-VALUE].

## Success Criteria
  A user succeeds when: ${state.interaction || '[define measurable outcome]'}

---

# L3: Interactions
## Key Flow: ${state.interaction || 'Primary user action'}
  given: User wants to ${state.interaction?.toLowerCase() || 'accomplish goal'}
  when: They [SPECIFIC ACTION]
  then: [SPECIFIC OUTCOME reflecting design pillars]`;
}

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    idea: '',
    mission: '',
    pillars: [],
    interaction: '',
  });

  const canAdvanceStep1 = state.idea.trim().length > 0;
  const canAdvanceStep2 = state.mission.length > 0;
  const canAdvanceStep3 = state.pillars.length >= 1;
  const canFinish = state.interaction.trim().length > 0;

  const togglePillar = (id: string) => {
    setState(prev => {
      const exists = prev.pillars.includes(id);
      if (exists) {
        return { ...prev, pillars: prev.pillars.filter(p => p !== id) };
      }
      if (prev.pillars.length >= 5) return prev;
      return { ...prev, pillars: [...prev.pillars, id] };
    });
  };

  const output = state.step > 4 ? generateOutput(state) : null;

  return (
    <div data-test="spec-wizard" className="max-w-xl mx-auto rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
      {/* Header */}
      <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold" style={{ color: 'var(--fg)' }}>Spec Your Idea</h3>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>Step {Math.min(state.step, 4)} of 4</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all duration-150"
              style={{ background: s <= state.step ? 'var(--brand)' : 'var(--border)' }}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* Step 1 */}
        {state.step === 1 && (
          <div data-test="wizard-step-1">
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Describe your product idea in one sentence.
            </p>
            <input
              data-test="wizard-idea-input"
              type="text"
              value={state.idea}
              onChange={e => setState(prev => ({ ...prev, idea: e.target.value }))}
              placeholder="e.g. A tool for tracking reading habits"
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                outline: 'none',
              }}
              onKeyDown={e => { if (e.key === 'Enter' && canAdvanceStep1) setState(prev => ({ ...prev, step: 2 })); }}
            />
            <button
              data-test="wizard-next"
              onClick={() => setState(prev => ({ ...prev, step: 2 }))}
              disabled={!canAdvanceStep1}
              className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: canAdvanceStep1 ? 'var(--brand)' : 'var(--border)',
                color: canAdvanceStep1 ? '#fff' : 'var(--muted)',
                cursor: canAdvanceStep1 ? 'pointer' : 'not-allowed',
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {state.step === 2 && (
          <div data-test="wizard-step-2">
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              What is the mission of <strong style={{ color: 'var(--fg)' }}>{state.idea}</strong>?
            </p>
            <div className="space-y-2">
              {MISSIONS.map((m, idx) => (
                <button
                  key={m.id}
                  data-test={idx === 0 ? 'wizard-mission-option' : undefined}
                  onClick={() => setState(prev => ({ ...prev, mission: m.id }))}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors"
                  style={{
                    background: state.mission === m.id ? 'var(--brand)22' : 'var(--bg)',
                    border: `1px solid ${state.mission === m.id ? 'var(--brand)' : 'var(--border)'}`,
                    color: state.mission === m.id ? 'var(--brand)' : 'var(--fg)',
                    minHeight: '44px',
                  }}
                >
                  {m.label.replace('X', state.idea)}
                </button>
              ))}
            </div>
            <button
              data-test="wizard-next"
              onClick={() => setState(prev => ({ ...prev, step: 3 }))}
              disabled={!canAdvanceStep2}
              className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: canAdvanceStep2 ? 'var(--brand)' : 'var(--border)',
                color: canAdvanceStep2 ? '#fff' : 'var(--muted)',
                cursor: canAdvanceStep2 ? 'pointer' : 'not-allowed',
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 3 */}
        {state.step === 3 && (
          <div data-test="wizard-step-3">
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Pick 3–5 design pillars (trade-offs that define your product's character).
              <span className="ml-1" style={{ color: 'var(--brand)' }}>{state.pillars.length}/5 selected</span>
            </p>
            <div className="space-y-2">
              {PILLARS.map((p, idx) => (
                <button
                  key={p.id}
                  data-test={idx === 0 ? 'wizard-pillar-option' : undefined}
                  onClick={() => togglePillar(p.id)}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors"
                  style={{
                    background: state.pillars.includes(p.id) ? 'var(--accent)22' : 'var(--bg)',
                    border: `1px solid ${state.pillars.includes(p.id) ? 'var(--accent)' : 'var(--border)'}`,
                    color: state.pillars.includes(p.id) ? 'var(--accent)' : 'var(--fg)',
                    minHeight: '44px',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button
              data-test="wizard-next"
              onClick={() => setState(prev => ({ ...prev, step: 4 }))}
              disabled={!canAdvanceStep3}
              className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: canAdvanceStep3 ? 'var(--brand)' : 'var(--border)',
                color: canAdvanceStep3 ? '#fff' : 'var(--muted)',
                cursor: canAdvanceStep3 ? 'pointer' : 'not-allowed',
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 4 */}
        {state.step === 4 && (
          <div data-test="wizard-step-4">
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Describe the most important thing a user does with your product.
            </p>
            <input
              data-test="wizard-interaction-input"
              type="text"
              value={state.interaction}
              onChange={e => setState(prev => ({ ...prev, interaction: e.target.value }))}
              placeholder="e.g. Mark a book as finished"
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                outline: 'none',
              }}
              onKeyDown={e => { if (e.key === 'Enter' && canFinish) setState(prev => ({ ...prev, step: 5 })); }}
            />
            <button
              data-test="wizard-finish"
              onClick={() => setState(prev => ({ ...prev, step: 5 }))}
              disabled={!canFinish}
              className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: canFinish ? 'var(--accent)' : 'var(--border)',
                color: canFinish ? '#fff' : 'var(--muted)',
                cursor: canFinish ? 'pointer' : 'not-allowed',
              }}
            >
              Generate skeleton spec →
            </button>
          </div>
        )}

        {/* Output */}
        {state.step > 4 && output && (
          <div data-test="wizard-output">
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--brand)' }}>
              YOUR L1–L3 SKELETON SPEC
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 rounded-lg overflow-auto max-h-80"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
              }}
            >
              {output}
            </pre>
            <button
              onClick={() => setState({ step: 1, idea: '', mission: '', pillars: [], interaction: '' })}
              className="mt-4 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              ← Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
