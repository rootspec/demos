import { useState, useEffect } from 'react';

type Step = 1 | 2 | 3 | 4 | 'result';

interface WizardResult {
  idea: string;
  mission: string;
  pillars: string[];
  interaction: string;
}

const MISSION_OPTIONS = [
  'Eliminate guesswork from software delivery',
  'Create a shared language between humans and AI',
  'Make intent the primary artifact, not code',
  'Enable AI agents to build from first principles',
];

const PILLAR_OPTIONS = [
  'Clarity — every requirement is unambiguous',
  'Continuity — spec evolves with the product',
  'Verifiability — every claim is testable',
  'Autonomy — AI can implement without supervision',
  'Alignment — team shares a single source of truth',
];

export default function SpecWizard() {
  const [step, setStep] = useState<Step>(1);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const [idea, setIdea] = useState('');
  const [mission, setMission] = useState('');
  const [pillars, setPillars] = useState<string[]>([]);
  const [interaction, setInteraction] = useState('');
  const [result, setResult] = useState<WizardResult | null>(null);

  const togglePillar = (p: string) => {
    setPillars((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const canGoNext = () => {
    if (step === 1) return idea.trim().length > 0;
    if (step === 2) return mission.length > 0;
    if (step === 3) return pillars.length > 0;
    return false;
  };

  const advance = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const generate = () => {
    setResult({ idea, mission, pillars, interaction });
    setStep('result');
  };

  const reset = () => {
    setStep(1);
    setIdea('');
    setMission('');
    setPillars([]);
    setInteraction('');
    setResult(null);
  };

  return (
    <div
      data-test="spec-wizard"
      data-hydrated={hydrated ? "true" : undefined}
      className="rounded-2xl p-8 max-w-2xl mx-auto"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      {/* Step 1 */}
      {step === 1 && (
        <div data-test="wizard-step-1">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
            Step 1 of 4
          </p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            What are you building?
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Describe your product in one sentence. Don't overthink it.
          </p>
          <input
            data-test="wizard-idea-input"
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. A tool to help developers write better commit messages"
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
          <div className="flex justify-end mt-6">
            <button
              data-test="wizard-next"
              onClick={advance}
              disabled={!canGoNext()}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div data-test="wizard-step-2">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
            Step 2 of 4
          </p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            What's your core mission?
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Choose the statement that best captures why this product exists.
          </p>
          <div className="flex flex-col gap-3">
            {MISSION_OPTIONS.map((opt) => (
              <button
                key={opt}
                data-test="wizard-mission-option"
                onClick={() => setMission(opt)}
                className="text-left px-4 py-3 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: mission === opt ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: mission === opt ? 'white' : 'var(--color-text)',
                  border: `1px solid ${mission === opt ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2 rounded-lg text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ← Back
            </button>
            <button
              data-test="wizard-next"
              onClick={advance}
              disabled={!canGoNext()}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div data-test="wizard-step-3">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
            Step 3 of 4
          </p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Choose your core pillars
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Select 2–3 values that will guide every product decision.
          </p>
          <div className="flex flex-col gap-3">
            {PILLAR_OPTIONS.map((opt) => (
              <button
                key={opt}
                data-test="wizard-pillar-option"
                onClick={() => togglePillar(opt)}
                className="text-left px-4 py-3 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: pillars.includes(opt) ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: pillars.includes(opt) ? 'white' : 'var(--color-text)',
                  border: `1px solid ${pillars.includes(opt) ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2 rounded-lg text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ← Back
            </button>
            <button
              data-test="wizard-next"
              onClick={advance}
              disabled={!canGoNext()}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div data-test="wizard-step-4">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
            Step 4 of 4
          </p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Describe a core interaction
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Write one key thing a user can do with your product.
          </p>
          <input
            data-test="wizard-interaction-input"
            type="text"
            value={interaction}
            onChange={(e) => setInteraction(e.target.value)}
            placeholder="e.g. User runs /rs-spec and answers interview questions"
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2 rounded-lg text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ← Back
            </button>
            <button
              data-test="wizard-generate"
              onClick={generate}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Generate spec →
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {step === 'result' && result && (
        <div data-test="wizard-result">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎉</span>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              Your skeleton spec
            </h3>
          </div>
          <div
            className="rounded-xl p-6 font-mono text-sm"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <div data-test="wizard-result-l1" className="mb-4">
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>L1 Philosophy</span>
              <br />
              <span style={{ color: 'var(--color-text-muted)' }}>Product:</span> {result.idea}
              <br />
              <span style={{ color: 'var(--color-text-muted)' }}>Mission:</span> {result.mission}
            </div>
            <div className="mb-4">
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>L2 Truths</span>
              <br />
              {result.pillars.map((p, i) => (
                <span key={i}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Pillar {i + 1}:</span> {p}
                  <br />
                </span>
              ))}
            </div>
            <div>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>L3 Interaction</span>
              <br />
              <span style={{ color: 'var(--color-text-muted)' }}>Core journey:</span> {result.interaction || '(not specified)'}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={reset}
              className="px-5 py-2 rounded-lg text-sm"
              style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
