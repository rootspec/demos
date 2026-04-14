import { useState } from 'react';

const MISSION_OPTIONS = [
  'Help teams ship faster with AI-assisted workflows',
  'Reduce ambiguity between developers and stakeholders',
  'Improve code quality through spec-driven development',
  'Enable autonomous AI implementation with human oversight',
];

const PILLAR_OPTIONS = [
  'Clarity',
  'Consistency',
  'Testability',
  'Autonomy',
  'Collaboration',
  'Traceability',
];

interface WizardState {
  step: number;
  idea: string;
  mission: string | null;
  pillars: string[];
}

function generateSpec(state: WizardState): string {
  const date = new Date().toISOString().split('T')[0];
  return `# Spec Skeleton
Generated: ${date}

## Mission
${state.mission}

## Pillars
${state.pillars.map(p => `- ${p}`).join('\n')}

## Product Idea
${state.idea}

## Suggested User Story (L5)
---
id: US-001
title: Visitor understands the product value
acceptance_criteria:
  - id: AC-001-1
    title: Hero section clearly communicates the mission
    given:
      - visit: /
    then:
      - shouldExist: { selector: '[data-test=hero-headline]' }
      - shouldContain:
          selector: '[data-test=hero-headline]'
          text: ${state.idea.slice(0, 30)}...
`;
}

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    idea: '',
    mission: null,
    pillars: [],
  });

  const canAdvance = () => {
    if (state.step === 1) return state.idea.trim().length > 0;
    if (state.step === 2) return state.mission !== null;
    if (state.step === 3) return state.pillars.length >= 1;
    return false;
  };

  const advance = () => {
    if (canAdvance()) {
      setState(s => ({ ...s, step: s.step + 1 }));
    }
  };

  const reset = () => {
    setState({ step: 1, idea: '', mission: null, pillars: [] });
  };

  const togglePillar = (pillar: string) => {
    setState(s => ({
      ...s,
      pillars: s.pillars.includes(pillar)
        ? s.pillars.filter(p => p !== pillar)
        : [...s.pillars, pillar],
    }));
  };

  return (
    <div data-test="spec-wizard" className="max-w-2xl mx-auto">
      {state.step < 4 && (
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  state.step >= n
                    ? 'bg-brand-primary text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                }`}
              >
                {n}
              </div>
              {n < 3 && <div className={`flex-1 h-0.5 w-16 ${state.step > n ? 'bg-brand-primary' : 'bg-[var(--border-color)]'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Product idea */}
      {state.step === 1 && (
        <div data-test="wizard-step-1" className="space-y-4">
          <h3 className="text-xl font-bold">What are you building?</h3>
          <p className="text-[var(--text-secondary)] text-sm">Describe your product idea in one or two sentences.</p>
          <textarea
            data-test="wizard-idea-input"
            value={state.idea}
            onChange={(e) => setState(s => ({ ...s, idea: e.target.value }))}
            placeholder="e.g. A tool for remote teams to stay aligned on product decisions..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] resize-none focus:outline-none focus:border-brand-primary text-sm"
          />
          <div className="flex justify-end">
            <button
              data-test="wizard-next"
              onClick={advance}
              disabled={!canAdvance()}
              className="px-6 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Mission */}
      {state.step === 2 && (
        <div data-test="wizard-step-2" className="space-y-4">
          <h3 className="text-xl font-bold">Pick your mission statement</h3>
          <p className="text-[var(--text-secondary)] text-sm">Choose the mission that best fits your product.</p>
          <div className="space-y-3">
            {MISSION_OPTIONS.map((option) => (
              <button
                key={option}
                data-test="mission-option"
                onClick={() => setState(s => ({ ...s, mission: option }))}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm ${
                  state.mission === option
                    ? 'border-brand-primary bg-brand-primary/10 text-[var(--text-primary)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-brand-primary/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              data-test="wizard-next"
              onClick={advance}
              disabled={!canAdvance()}
              className="px-6 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Pillars */}
      {state.step === 3 && (
        <div data-test="wizard-step-3" className="space-y-4">
          <h3 className="text-xl font-bold">Choose your design pillars</h3>
          <p className="text-[var(--text-secondary)] text-sm">Select at least 3 principles that will guide your product (pick any number).</p>
          <div className="grid grid-cols-2 gap-3">
            {PILLAR_OPTIONS.map((pillar) => (
              <button
                key={pillar}
                data-test="pillar-option"
                onClick={() => togglePillar(pillar)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm font-medium ${
                  state.pillars.includes(pillar)
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-brand-primary/50'
                }`}
              >
                {state.pillars.includes(pillar) ? '✓ ' : ''}{pillar}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              data-test="wizard-next"
              onClick={advance}
              disabled={!canAdvance()}
              className="px-6 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate Spec →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Output */}
      {state.step === 4 && (
        <div data-test="wizard-step-4" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Your spec skeleton</h3>
            <button
              data-test="wizard-reset"
              onClick={reset}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
            >
              Start Over
            </button>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">Here's a spec skeleton based on your inputs. Copy it into your project and run <code className="font-mono text-brand-primary">/rs-spec</code> to expand it.</p>
          <div
            data-test="wizard-output"
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 font-mono text-xs text-[var(--text-secondary)] whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto"
          >
            {generateSpec(state)}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigator.clipboard?.writeText(generateSpec(state))}
              className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
