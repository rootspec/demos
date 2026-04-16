import { useState } from 'react';

const pillars = [
  { id: 'clarity', label: 'Clarity', desc: 'Simple, focused, opinionated' },
  { id: 'collaboration', label: 'Collaboration', desc: 'Team-first, shared understanding' },
  { id: 'automation', label: 'Automation', desc: 'AI-native, agent-ready' },
  { id: 'trust', label: 'Trust', desc: 'Verifiable, auditable, honest' },
];

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [mission, setMission] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [interaction, setInteraction] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [done, setDone] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!mission.trim()) {
        setValidationMessage('Please describe your product idea before continuing.');
        return;
      }
      setValidationMessage('');
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleFinish = () => {
    setDone(true);
  };

  if (done) {
    return (
      <div
        data-test="spec-wizard"
        style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem' }}
      >
        <div data-test="wizard-output" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.875rem', lineHeight: 1.7 }}>
          <p style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '1rem' }}>📄 Skeleton Spec Output</p>
          <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--fg)' }}>L1 · Philosophy</strong></p>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
            We believe: {mission}
          </p>
          <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--fg)' }}>L2 · Truths</strong></p>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
            Pillar: {selectedPillar || 'clarity'}
          </p>
          <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--fg)' }}>L3 · Interactions</strong></p>
          <p style={{ color: 'var(--muted)', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
            {interaction}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-test="spec-wizard"
      style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem' }}
    >
      {/* Step indicator */}
      <div
        data-test="wizard-step-indicator"
        style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}
      >
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '9999px',
              background: s <= step ? 'var(--accent)' : 'var(--border)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div data-test="wizard-step-1">
          <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>What is your product?</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            Describe your product idea in one or two sentences.
          </p>
          <textarea
            data-test="wizard-mission-input"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            placeholder="e.g. A tool for focused writing without distractions..."
            rows={3}
            style={{
              width: '100%',
              background: 'var(--bg)',
              border: `1px solid ${validationMessage ? '#dc2626' : 'var(--border)'}`,
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              color: 'var(--fg)',
              fontSize: '0.9375rem',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {validationMessage && (
            <p data-test="wizard-validation-message" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {validationMessage}
            </p>
          )}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              data-test="wizard-next"
              onClick={handleNext}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div data-test="wizard-step-2">
          <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>Choose your core pillar</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            What principle drives your product most?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {pillars.map((p) => (
              <button
                key={p.id}
                data-test="pillar-option"
                onClick={() => setSelectedPillar(p.id)}
                style={{
                  background: selectedPillar === p.id ? 'var(--accent)' : 'var(--bg)',
                  border: `1px solid ${selectedPillar === p.id ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--fg)',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{p.label}</div>
                <div style={{ fontSize: '0.8125rem', color: selectedPillar === p.id ? '#e9d5ff' : 'var(--muted)' }}>{p.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              data-test="wizard-next"
              onClick={handleNext}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div data-test="wizard-step-3">
          <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>Describe a key interaction</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            How does a user accomplish their main goal in your product?
          </p>
          <textarea
            data-test="wizard-interaction-input"
            value={interaction}
            onChange={(e) => setInteraction(e.target.value)}
            placeholder="e.g. User opens app and starts writing immediately..."
            rows={3}
            style={{
              width: '100%',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              color: 'var(--fg)',
              fontSize: '0.9375rem',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              data-test="wizard-finish"
              onClick={handleFinish}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem' }}
            >
              Generate spec →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
