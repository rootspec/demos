import React, { useState } from 'react';

const TOTAL_STEPS = 3;

const MISSION_TEMPLATES = [
  'Help developers ship faster without losing quality',
  'Empower non-technical founders to define product requirements clearly',
  'Give AI coding agents a living contract to eliminate spec drift',
  'Enable teams to align on intent before writing a single line of code',
];

const DESIGN_PILLARS = [
  'Clarity',
  'Speed',
  'Trust',
  'Delight',
  'Simplicity',
  'Power',
  'Accessibility',
  'Transparency',
];

function generateSkeleton(answers: Record<string, string>) {
  const mission = answers.mission || 'Define your mission';
  const pillars = answers.pillars || 'Clarity, Speed, Trust';
  const interaction = answers.interaction || 'Core interaction';
  return `# RootSpec Skeleton

## L1 — Philosophy
> Mission: ${mission}

## L2 — Truths
${pillars.split(',').map((p: string) => `- ${p.trim()} is a first-class design value`).join('\n')}

## L3 — Key Interaction
- ${interaction}
- User completes primary workflow in under 60 seconds
- User onboards without friction

## L4 — Systems
- Content System: manages user-generated data
- Auth System: optional account creation
- Feedback System: captures user intent signals

## L5 — User Stories
- US-001: User can complete core action without signing up
- US-002: User data persists across sessions
- US-003: User can export their data at any time`;
}

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [output, setOutput] = useState<string | null>(null);

  const handleNext = () => {
    if (step === 2) {
      setAnswers(prev => ({ ...prev, pillars: selectedPillars.join(', ') }));
    }
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      const finalAnswers = step === 2
        ? { ...answers, pillars: selectedPillars.join(', ') }
        : answers;
      setOutput(generateSkeleton(finalAnswers));
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const togglePillar = (pillar: string) => {
    setSelectedPillars(prev =>
      prev.includes(pillar) ? prev.filter(p => p !== pillar) : prev.length < 5 ? [...prev, pillar] : prev
    );
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 600,
    fontSize: '1rem',
    color: 'var(--color-text)',
    marginBottom: '0.75rem',
  };

  return (
    <section
      style={{
        padding: '5rem 1.5rem',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              margin: '0 0 0.75rem',
              color: 'var(--color-text)',
            }}
          >
            Try the Spec Wizard
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '1.1rem',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Answer three questions and generate a skeleton RootSpec in seconds.
          </p>
        </div>

        <div
          data-test="spec-wizard"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.875rem',
            padding: '2rem',
          }}
        >
          {!output ? (
            <>
              {/* Progress */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span>Step {step} of {TOTAL_STEPS}</span>
                  <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'var(--color-border)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(step / TOTAL_STEPS) * 100}%`,
                      background: 'var(--color-accent)',
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Step 1: Mission selection */}
              {step === 1 && (
                <div data-test="wizard-step-1">
                  <label style={labelStyle}>What's the mission?</label>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>
                    Choose a template or write your own.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {MISSION_TEMPLATES.map(template => (
                      <button
                        key={template}
                        onClick={() => setAnswers(prev => ({ ...prev, mission: template }))}
                        style={{
                          textAlign: 'left',
                          padding: '0.6rem 0.9rem',
                          background: answers.mission === template ? 'rgba(99,102,241,0.15)' : 'var(--color-bg)',
                          border: `1px solid ${answers.mission === template ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          borderRadius: '0.5rem',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontSize: '0.85rem',
                        }}
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                  <input
                    data-test="wizard-product-input"
                    type="text"
                    placeholder="Or describe your own mission…"
                    value={answers.mission || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, mission: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Step 2: Design pillar picker */}
              {step === 2 && (
                <div data-test="wizard-step-2">
                  <label style={labelStyle}>What should users feel? Pick 3–5 design pillars.</label>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>
                    Selected: {selectedPillars.length}/5
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {DESIGN_PILLARS.map(pillar => (
                      <button
                        key={pillar}
                        onClick={() => togglePillar(pillar)}
                        style={{
                          padding: '0.4rem 0.9rem',
                          background: selectedPillars.includes(pillar) ? 'var(--color-accent)' : 'var(--color-bg)',
                          border: `1px solid ${selectedPillars.includes(pillar) ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          borderRadius: '9999px',
                          color: selectedPillars.includes(pillar) ? 'white' : 'var(--color-text)',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontSize: '0.85rem',
                          fontWeight: selectedPillars.includes(pillar) ? 600 : 400,
                        }}
                      >
                        {pillar}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Key interaction description */}
              {step === 3 && (
                <div data-test="wizard-step-3">
                  <label style={labelStyle}>Describe one key interaction.</label>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>
                    e.g. "User pastes a GitHub URL and instantly sees a spec skeleton"
                  </p>
                  <input
                    data-test="wizard-product-input"
                    type="text"
                    placeholder="e.g. User pastes a GitHub URL and instantly sees a spec skeleton"
                    value={answers.interaction || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, interaction: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Navigation */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '1.5rem',
                  justifyContent: step > 1 ? 'space-between' : 'flex-end',
                }}
              >
                {step > 1 && (
                  <button
                    data-test="wizard-back"
                    onClick={handleBack}
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  data-test="wizard-next"
                  onClick={handleNext}
                  style={{
                    padding: '0.625rem 1.5rem',
                    background: 'var(--color-accent)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {step === TOTAL_STEPS ? 'Generate Spec' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            <div data-test="wizard-output">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>
                  Your Skeleton Spec
                </h3>
                <button
                  onClick={() => { setOutput(null); setStep(1); setAnswers({}); setSelectedPillars([]); }}
                  style={{
                    padding: '0.4rem 0.9rem',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.375rem',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.8rem',
                  }}
                >
                  Reset
                </button>
              </div>
              <pre
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  padding: '1.25rem',
                  fontSize: '0.8rem',
                  lineHeight: '1.6',
                  color: 'var(--color-text-muted)',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0,
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
