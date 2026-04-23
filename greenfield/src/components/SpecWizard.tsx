import { useState } from 'react';

const MISSION_OPTIONS = [
  { id: 'productivity', label: 'Boost productivity' },
  { id: 'collaboration', label: 'Improve collaboration' },
  { id: 'automation', label: 'Automate manual work' },
  { id: 'insights', label: 'Surface insights from data' },
];

const PILLAR_OPTIONS = [
  'Speed', 'Simplicity', 'Reliability', 'Flexibility', 'Security', 'Collaboration',
];

type Step = 1 | 2 | 3 | 4 | 5;

interface WizardState {
  idea: string;
  mission: string;
  pillars: string[];
  interaction: string;
}

function generateSpec(state: WizardState): string {
  return `# L1: Philosophy\n${state.idea} exists to ${state.mission.toLowerCase()}.\n\n# L2: Truths\n- Core pillars: ${state.pillars.join(', ')}\n\n# L3: Interactions\n- ${state.interaction}\n\n# L5: Example User Story\nid: US-101\ntitle: ${state.interaction.split(' ').slice(0, 5).join(' ')}\nacceptance_criteria:\n  - id: AC-101-1\n    given:\n      - visit: '/'\n    when:\n      - click: { selector: '[data-test=primary-action]' }\n    then:\n      - shouldExist: { selector: '[data-test=result]' }`;
}

export default function SpecWizard() {
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<WizardState>({
    idea: '',
    mission: '',
    pillars: [],
    interaction: '',
  });
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    setOutput(generateSpec(state));
    setStep(5);
  };

  const togglePillar = (pillar: string) => {
    setState(prev => ({
      ...prev,
      pillars: prev.pillars.includes(pillar)
        ? prev.pillars.filter(p => p !== pillar)
        : [...prev.pillars, pillar],
    }));
  };

  const totalSteps = 4;
  const progressStep = Math.min(step, totalSteps);

  return (
    <div
      data-test="spec-wizard"
      id="spec-wizard"
      className="w-full max-w-2xl mx-auto rounded-2xl border overflow-hidden"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
    >
      {/* Progress bar */}
      <div className="w-full h-1" style={{ backgroundColor: 'var(--border)' }}>
        <div
          className="h-1 transition-all duration-500"
          style={{ backgroundColor: 'var(--accent)', width: `${(progressStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="p-8">
        {/* Step 1 */}
        {step === 1 && (
          <div data-test="wizard-step-1">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              What are you building?
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Describe your product idea in one sentence.
            </p>
            <input
              data-test="wizard-idea-input"
              type="text"
              placeholder="e.g. A task manager for remote teams"
              value={state.idea}
              onChange={e => setState(prev => ({ ...prev, idea: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border text-sm mb-6 outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                borderColor: 'var(--border)',
              }}
            />
            <div className="flex justify-end">
              <button
                data-test="wizard-next"
                disabled={!state.idea.trim()}
                onClick={() => setStep(2)}
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div data-test="wizard-step-2">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              What's the primary mission?
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Choose the core purpose of your product.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {MISSION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  data-test="wizard-mission-option"
                  onClick={() => setState(prev => ({ ...prev, mission: opt.label }))}
                  className="p-3 rounded-lg border text-sm font-medium text-left transition-all"
                  style={{
                    backgroundColor: state.mission === opt.label ? 'var(--accent)' : 'var(--surface)',
                    color: state.mission === opt.label ? '#ffffff' : 'var(--text)',
                    borderColor: state.mission === opt.label ? 'var(--accent)' : 'var(--border)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                data-test="wizard-back"
                onClick={() => setStep(1)}
                className="px-6 py-2 rounded-lg font-semibold text-sm border"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
              >
                ← Back
              </button>
              <button
                data-test="wizard-next"
                disabled={!state.mission}
                onClick={() => setStep(3)}
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pillars */}
        {step === 3 && (
          <div data-test="wizard-step-3">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Select product pillars
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Pick 2–4 principles that define how your product should behave.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {PILLAR_OPTIONS.map(pillar => (
                <button
                  key={pillar}
                  data-test="wizard-pillar-chip"
                  onClick={() => togglePillar(pillar)}
                  className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                  style={{
                    backgroundColor: state.pillars.includes(pillar) ? 'var(--accent)' : 'var(--surface)',
                    color: state.pillars.includes(pillar) ? '#ffffff' : 'var(--text)',
                    borderColor: state.pillars.includes(pillar) ? 'var(--accent)' : 'var(--border)',
                  }}
                >
                  {pillar}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                data-test="wizard-back"
                onClick={() => setStep(2)}
                className="px-6 py-2 rounded-lg font-semibold text-sm border"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
              >
                ← Back
              </button>
              <button
                data-test="wizard-next"
                disabled={state.pillars.length < 1}
                onClick={() => setStep(4)}
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Interaction */}
        {step === 4 && (
          <div data-test="wizard-step-4">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Key interaction
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Describe one core thing a user does in your product.
            </p>
            <input
              data-test="wizard-interaction-input"
              type="text"
              placeholder="e.g. User creates a task and assigns it to a teammate"
              value={state.interaction}
              onChange={e => setState(prev => ({ ...prev, interaction: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border text-sm mb-6 outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                borderColor: 'var(--border)',
              }}
            />
            <div className="flex justify-between">
              <button
                data-test="wizard-back"
                onClick={() => setStep(3)}
                className="px-6 py-2 rounded-lg font-semibold text-sm border"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
              >
                ← Back
              </button>
              <button
                data-test="wizard-generate"
                disabled={!state.interaction.trim()}
                onClick={handleGenerate}
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                Generate Spec ✨
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Output */}
        {step === 5 && (
          <div data-test="wizard-step-5">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Your skeleton spec
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              This is what <code>/rs-spec</code> would build from your SEED.md.
            </p>
            <pre
              data-test="wizard-output"
              className="text-xs font-mono whitespace-pre-wrap rounded-xl p-5 mb-6 overflow-x-auto"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--text)' }}
            >
              {output}
            </pre>
            <div className="flex justify-between">
              <button
                data-test="wizard-back"
                onClick={() => setStep(4)}
                className="px-6 py-2 rounded-lg font-semibold text-sm border"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  setState({ idea: '', mission: '', pillars: [], interaction: '' });
                  setOutput('');
                  setStep(1);
                }}
                className="px-6 py-2 rounded-lg font-semibold text-sm"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
