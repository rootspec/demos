import { useState, useEffect, useRef } from 'react';
import { templates, pillarSuggestions } from '../data/wizard';

type Step = 1 | 2 | 3 | 'result';

interface WizardState {
  currentStep: Step;
  mission: string;
  pillars: string[];
  interaction: { who: string; trigger: string; feedback: string };
}

const initial: WizardState = {
  currentStep: 1,
  mission: '',
  pillars: [],
  interaction: { who: '', trigger: '', feedback: '' },
};

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>(initial);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.setAttribute('data-hydrated', 'true');
  }, []);

  function update(patch: Partial<WizardState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function togglePillar(label: string) {
    setState((s) => {
      const has = s.pillars.includes(label);
      if (has) return { ...s, pillars: s.pillars.filter((p) => p !== label) };
      if (s.pillars.length >= 5) return s;
      return { ...s, pillars: [...s.pillars, label] };
    });
  }

  function setInteractionField(field: keyof WizardState['interaction'], value: string) {
    setState((s) => ({ ...s, interaction: { ...s.interaction, [field]: value } }));
  }

  const canAdvanceStep2 = state.pillars.length >= 1;
  const canGenerate = state.interaction.who && state.interaction.trigger && state.interaction.feedback;

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Spec your idea</h2>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
          Try the methodology. Enter a product idea and walk through three steps to see how RootSpec structures your thinking.
        </p>

        <div className="mt-12 max-w-2xl mx-auto">
          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8" role="tablist">
            {[1, 2, 3].map((step) => {
              const isActive = state.currentStep === step || (state.currentStep === 'result' && step === 3);
              const isPast = typeof state.currentStep === 'number' ? step < state.currentStep : true;
              return (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--color-accent)] text-white'
                        : isPast
                          ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text)]'
                          : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {step}
                  </div>
                  {step < 3 && <div className="w-8 sm:w-16 h-px bg-[var(--color-border)]" />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Mission */}
          {state.currentStep === 1 && (
            <div role="tabpanel">
              <h3 className="text-xl font-semibold">What's your product idea?</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Describe the mission in one sentence, or pick a template.
              </p>
              <input
                data-test="wizard-mission-input"
                type="text"
                value={state.mission}
                onChange={(e) => update({ mission: e.target.value })}
                placeholder="Help people accomplish meaningful work..."
                className="mt-4 w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => update({ mission: t.mission })}
                    className="p-3 text-left text-sm rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] transition-colors"
                  >
                    <span className="font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
              <button
                data-test="wizard-next-step"
                onClick={() => update({ currentStep: 2 })}
                disabled={!state.mission}
                className="mt-6 px-6 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Pillars */}
          {state.currentStep === 2 && (
            <div role="tabpanel">
              <h3 className="text-xl font-semibold">What should users feel?</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Select 3–5 design pillars — emotional experiences, not features.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pillarSuggestions.map((p) => {
                  const selected = state.pillars.includes(p.label);
                  return (
                    <button
                      key={p.id}
                      data-test="wizard-pillar-option"
                      onClick={() => togglePillar(p.label)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        selected
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                          : 'border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                {state.pillars.length}/5 selected {state.pillars.length < 3 && `(need at least 3)`}
              </p>
              <button
                data-test="wizard-next-step"
                onClick={() => update({ currentStep: 3 })}
                disabled={!canAdvanceStep2}
                className="mt-6 px-6 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 3: Interaction */}
          {state.currentStep === 3 && (
            <div role="tabpanel">
              <h3 className="text-xl font-semibold">Describe one key interaction</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Who does what, and what happens?
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Who</label>
                  <input
                    data-test="wizard-interaction-who"
                    type="text"
                    value={state.interaction.who}
                    onChange={(e) => setInteractionField('who', e.target.value)}
                    placeholder="Team member"
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Trigger</label>
                  <input
                    data-test="wizard-interaction-trigger"
                    type="text"
                    value={state.interaction.trigger}
                    onChange={(e) => setInteractionField('trigger', e.target.value)}
                    placeholder="Creates a new task"
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Feedback</label>
                  <input
                    data-test="wizard-interaction-feedback"
                    type="text"
                    value={state.interaction.feedback}
                    onChange={(e) => setInteractionField('feedback', e.target.value)}
                    placeholder="Task appears in the team list"
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
              </div>
              <button
                data-test="wizard-generate"
                onClick={() => update({ currentStep: 'result' })}
                disabled={!canGenerate}
                className="mt-6 px-6 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Generate Spec
              </button>
            </div>
          )}

          {/* Result */}
          {state.currentStep === 'result' && (
            <div data-test="wizard-result">
              <h3 className="text-xl font-semibold mb-4">Your skeleton spec</h3>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] p-5 font-mono text-sm space-y-4 overflow-x-auto">
                <div>
                  <div className="text-[var(--color-text-muted)]"># Level 1: Philosophy</div>
                  <div className="mt-1"><strong>Mission:</strong> {state.mission}</div>
                  <div className="mt-2"><strong>Design Pillars:</strong></div>
                  {state.pillars.map((p, i) => (
                    <div key={i} className="ml-4 text-[var(--color-text-secondary)]">{i + 1}. {p}</div>
                  ))}
                </div>
                <div className="border-t border-[var(--color-border)] pt-4">
                  <div className="text-[var(--color-text-muted)]"># Level 3: Interaction</div>
                  <div className="mt-1"><strong>Actor:</strong> {state.interaction.who}</div>
                  <div><strong>Trigger:</strong> {state.interaction.trigger}</div>
                  <div><strong>Feedback:</strong> {state.interaction.feedback}</div>
                </div>
              </div>
              <button
                data-test="wizard-start-over"
                onClick={() => setState(initial)}
                className="mt-6 px-6 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-colors"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
