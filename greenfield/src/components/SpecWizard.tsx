import { useState } from 'react';

const MISSION_OPTIONS = [
  'Help [users] accomplish [goal] without [pain].',
  'Enable [users] to [outcome] through [mechanism].',
  'Make [activity] as effortless as [analogy] for [users].',
];

type Step = 'idea' | 'mission' | 'result';

export default function SpecWizard() {
  const [step, setStep] = useState<Step>('idea');
  const [idea, setIdea] = useState('');
  const [selectedMission, setSelectedMission] = useState(0);

  const containerStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    padding: '2rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
  };

  const btnStyle: React.CSSProperties = {
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.625rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
  };

  if (step === 'idea') {
    return (
      <div data-test="spec-wizard" style={containerStyle}>
        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 700 }}>
          Spec Wizard
        </h3>
        <p style={{ margin: '0 0 1.25rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Describe your product idea and we'll scaffold a skeleton spec.
        </p>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>
          What are you building?
        </label>
        <input
          data-test="wizard-idea-input"
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. A task manager for remote teams"
          style={inputStyle}
        />
        <div style={{ marginTop: '1rem' }}>
          <button
            data-test="wizard-next"
            onClick={() => { if (idea.trim()) setStep('mission'); }}
            disabled={!idea.trim()}
            style={{ ...btnStyle, opacity: idea.trim() ? 1 : 0.5, cursor: idea.trim() ? 'pointer' : 'default' }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  if (step === 'mission') {
    return (
      <div data-test="spec-wizard" style={containerStyle}>
        <div data-test="wizard-step-mission">
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 700 }}>
            Choose a Mission Template
          </h3>
          <p style={{ margin: '0 0 1.25rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            For: <em>{idea}</em>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {MISSION_OPTIONS.map((option, i) => (
              <button
                key={i}
                data-test="mission-option"
                onClick={() => setSelectedMission(i)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: `2px solid ${selectedMission === i ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: selectedMission === i ? 'rgba(99,102,241,0.08)' : 'var(--color-bg)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep('idea')} style={{ ...btnStyle, background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
              ← Back
            </button>
            <button data-test="wizard-next" onClick={() => setStep('result')} style={btnStyle}>
              Generate Spec →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const specOutput = `# SEED.md — ${idea}

## Mission
${MISSION_OPTIONS[selectedMission].replace('[users]', 'users').replace('[goal]', 'their goals').replace('[pain]', 'friction').replace('[outcome]', 'succeed').replace('[mechanism]', 'smart tooling').replace('[activity]', 'the main task').replace('[analogy]', 'magic').replace('[users]', 'everyone')}

## Core Problem
TODO: Describe the problem this product solves.

## Non-Negotiables
- Fast: key interactions under 200ms
- Accessible: WCAG 2.1 AA
- Private: no unnecessary data collection

## Run /rs-spec to generate your full spec →`;

  return (
    <div data-test="spec-wizard" style={containerStyle}>
      <h3 style={{ margin: '0 0 1rem', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 700 }}>
        Your Skeleton Spec
      </h3>
      <pre style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', padding: '1rem', fontSize: '0.8rem', overflowX: 'auto', color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap', margin: '0 0 1rem' }}>
        {specOutput}
      </pre>
      <button onClick={() => { setStep('idea'); setIdea(''); }} style={{ ...btnStyle, background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
        Start Over
      </button>
    </div>
  );
}
