import { useState } from 'react';

const MISSION_TEMPLATES = [
  'Help {users} ship what they intended, not what they had time to build.',
  'Give {users} a single source of truth that stays accurate as the product evolves.',
  'Let {users} move fast without losing sight of why they started.',
  'Make it easy for {users} to validate their assumptions before writing any code.',
  'Help {users} collaborate across roles without losing intent in translation.',
];

const PILLAR_SUGGESTIONS = [
  'Clarity', 'Traceability', 'Minimal ceremony', 'Speed', 'Trust',
  'Simplicity', 'Reliability', 'Transparency', 'Autonomy', 'Collaboration',
  'Flexibility', 'Consistency',
];

type Step = 1 | 2 | 3 | 4 | 'output';

interface Answers {
  productIdea: string;
  mission: string;
  pillars: string[];
  keyInteraction: string;
}

export default function SpecWizard() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>({
    productIdea: '',
    mission: '',
    pillars: [],
    keyInteraction: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [customPillar, setCustomPillar] = useState('');

  function advance() {
    if (step === 1) {
      if (!answers.productIdea.trim()) {
        setError('Please enter a product idea to continue.');
        return;
      }
      setError(null);
      setStep(2);
    } else if (step === 2) {
      if (!answers.mission.trim()) {
        setError('Please select or write a mission.');
        return;
      }
      setError(null);
      setStep(3);
    } else if (step === 3) {
      if (answers.pillars.length < 3) {
        setError('Please select at least 3 design pillars.');
        return;
      }
      if (answers.pillars.length > 5) {
        setError('Please select no more than 5 design pillars.');
        return;
      }
      setError(null);
      setStep(4);
    } else if (step === 4) {
      if (!answers.keyInteraction.trim()) {
        setError('Please describe a key interaction.');
        return;
      }
      setError(null);
      setStep('output');
    }
  }

  function togglePillar(p: string) {
    setAnswers(prev => {
      const has = prev.pillars.includes(p);
      if (has) return { ...prev, pillars: prev.pillars.filter(x => x !== p) };
      if (prev.pillars.length >= 5) return prev;
      return { ...prev, pillars: [...prev.pillars, p] };
    });
  }

  function addCustomPillar() {
    if (!customPillar.trim() || answers.pillars.length >= 5) return;
    if (!answers.pillars.includes(customPillar.trim())) {
      setAnswers(prev => ({ ...prev, pillars: [...prev.pillars, customPillar.trim()] }));
    }
    setCustomPillar('');
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: '640px',
    margin: '0 auto',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '0.8125rem',
    color: 'var(--color-text-secondary)',
  };

  const bodyStyle: React.CSSProperties = {
    padding: '1.5rem',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 500,
    fontSize: '0.9375rem',
    color: 'var(--color-text-primary)',
    marginBottom: '0.75rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    color: 'var(--color-text-primary)',
    fontSize: '0.9375rem',
    fontFamily: "'Source Serif 4', Georgia, serif",
    outline: 'none',
    boxSizing: 'border-box',
  };

  const btnStyle: React.CSSProperties = {
    background: 'var(--color-accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.6rem 1.25rem',
    fontWeight: 500,
    fontSize: '0.9rem',
    cursor: 'pointer',
  };

  const errorStyle: React.CSSProperties = {
    color: '#c0392b',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    padding: '0.5rem 0.75rem',
    background: '#fef0ed',
    borderRadius: '4px',
    border: '1px solid #f5c6bc',
  };

  return (
    <div data-test="spec-wizard" style={containerStyle}>
      <div style={headerStyle}>
        {step === 'output'
          ? 'Your skeleton spec'
          : `Step ${step} of 4 — ${step === 1 ? 'Product Idea' : step === 2 ? 'Mission' : step === 3 ? 'Design Pillars' : 'Key Interaction'}`}
      </div>

      <div style={bodyStyle}>
        {step === 1 && (
          <div data-test="wizard-step-1">
            <label style={labelStyle} htmlFor="product-idea">
              What are you building? Describe it in one sentence.
            </label>
            <input
              id="product-idea"
              data-test="wizard-product-idea"
              type="text"
              value={answers.productIdea}
              onChange={e => setAnswers(p => ({ ...p, productIdea: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && advance()}
              placeholder="e.g. A tool for tracking reading habits"
              style={inputStyle}
              autoFocus
            />
            {error && <div data-test="wizard-error" style={errorStyle}>{error}</div>}
            <div style={{ marginTop: '1.25rem' }}>
              <button data-test="wizard-next" onClick={advance} style={btnStyle}>
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div data-test="wizard-step-2">
            <p style={labelStyle}>Choose a mission template or write your own.</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Replace <em>{'{users}'}</em> with your target audience.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {MISSION_TEMPLATES.map((t, i) => (
                <label
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    cursor: 'pointer',
                    padding: '0.625rem',
                    borderRadius: '4px',
                    border: `1px solid ${answers.mission === t ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: answers.mission === t ? 'var(--color-banner-bg)' : 'var(--color-bg)',
                    fontSize: '0.875rem',
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <input
                    type="radio"
                    name="mission"
                    value={t}
                    checked={answers.mission === t}
                    onChange={() => setAnswers(p => ({ ...p, mission: t }))}
                    style={{ marginTop: '2px', flexShrink: 0 }}
                  />
                  {t}
                </label>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or write your own mission…"
              value={MISSION_TEMPLATES.includes(answers.mission) ? '' : answers.mission}
              onChange={e => setAnswers(p => ({ ...p, mission: e.target.value }))}
              style={{ ...inputStyle, marginBottom: '0' }}
            />
            {error && <div data-test="wizard-error" style={errorStyle}>{error}</div>}
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setError(null); setStep(1); }} style={{ ...btnStyle, background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                ← Back
              </button>
              <button data-test="wizard-next" onClick={advance} style={btnStyle}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div data-test="wizard-step-3">
            <p style={labelStyle}>Pick 3–5 design pillars. What values should guide every decision?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {[...PILLAR_SUGGESTIONS, ...answers.pillars.filter(p => !PILLAR_SUGGESTIONS.includes(p))].map(p => {
                const selected = answers.pillars.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => togglePillar(p)}
                    style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: '20px',
                      border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      background: selected ? 'var(--color-accent)' : 'var(--color-bg)',
                      color: selected ? '#fff' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add your own pillar…"
                value={customPillar}
                onChange={e => setCustomPillar(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomPillar()}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button onClick={addCustomPillar} style={{ ...btnStyle, padding: '0.6rem 1rem', flexShrink: 0 }}>Add</button>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Selected: {answers.pillars.length}/5
            </p>
            {error && <div data-test="wizard-error" style={errorStyle}>{error}</div>}
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setError(null); setStep(2); }} style={{ ...btnStyle, background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                ← Back
              </button>
              <button data-test="wizard-next" onClick={advance} style={btnStyle}>Next →</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div data-test="wizard-step-4">
            <label style={labelStyle} htmlFor="key-interaction">
              Describe one key interaction — the moment your product most needs to work.
            </label>
            <textarea
              id="key-interaction"
              data-test="wizard-key-interaction"
              value={answers.keyInteraction}
              onChange={e => setAnswers(p => ({ ...p, keyInteraction: e.target.value }))}
              placeholder="e.g. User marks a book as finished, logs the date, and sees their reading pace updated in the dashboard."
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              autoFocus
            />
            {error && <div data-test="wizard-error" style={errorStyle}>{error}</div>}
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setError(null); setStep(3); }} style={{ ...btnStyle, background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                ← Back
              </button>
              <button data-test="wizard-next" onClick={advance} style={btnStyle}>Generate spec →</button>
            </div>
          </div>
        )}

        {step === 'output' && (
          <div data-test="wizard-output">
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Here's how your input maps to L1–L3 of a RootSpec hierarchy:
            </p>
            <pre
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '1rem',
                whiteSpace: 'pre-wrap',
                color: 'var(--color-text-primary)',
                lineHeight: 1.7,
              }}
            >
{`# L1: Philosophy
## Mission
${answers.mission.replace('{users}', 'users')}

## Design Pillars
${answers.pillars.map(p => `- ${p}`).join('\n')}

# L2: Truths
## Commitment
We do not ship any feature that cannot be traced back to the
mission: "${answers.productIdea}"

# L3: Interactions
## Key Interaction
${answers.keyInteraction}`}
            </pre>
            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={() => {
                  setStep(1);
                  setAnswers({ productIdea: '', mission: '', pillars: [], keyInteraction: '' });
                  setError(null);
                }}
                style={{ ...btnStyle, background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
