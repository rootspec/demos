import React, { useState } from 'react';

const TOTAL_STEPS = 3;

const stepQuestions = [
  {
    label: 'What product are you building?',
    placeholder: 'e.g. A tool for tracking reading habits',
    field: 'productIdea',
  },
  {
    label: 'Who is it for?',
    placeholder: 'e.g. Book lovers who want to build a reading habit',
    field: 'audience',
  },
  {
    label: 'What is the core problem it solves?',
    placeholder: 'e.g. People forget what they\'ve read and lose momentum',
    field: 'problem',
  },
];

function generateSkeleton(answers: Record<string, string>) {
  const product = answers.productIdea || 'Your Product';
  const audience = answers.audience || 'Target users';
  const problem = answers.problem || 'Core problem';
  return `# ${product}

## L1 — Philosophy
> ${product} exists to help ${audience} overcome: ${problem}.

## L2 — Truths
- Users must never lose their data
- Core actions must complete in under 2 seconds
- The product must work offline (progressive enhancement)

## L3 — Interactions
- User discovers the product and understands value immediately
- User onboards without friction (no required sign-up for core value)
- User completes primary workflow in under 60 seconds

## L4 — Systems
- Content System: manages user-generated data
- Auth System: optional account creation
- Notification System: gentle reminders and streaks

## L5 — User Stories
- US-001: ${audience} can complete core action without signing up
- US-002: User data persists across sessions
- US-003: User can export their data at any time`;
}

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string | null>(null);

  const currentQ = stepQuestions[step - 1];

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      setOutput(generateSkeleton(answers));
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.field]: value }));
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

              {/* Step content */}
              <div data-test={`wizard-step-${step}`}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {currentQ.label}
                </label>
                <input
                  data-test="wizard-product-input"
                  type="text"
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.field] || ''}
                  onChange={e => handleChange(e.target.value)}
                  style={{
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
                  }}
                />
              </div>

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
                  onClick={() => { setOutput(null); setStep(1); setAnswers({}); }}
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
