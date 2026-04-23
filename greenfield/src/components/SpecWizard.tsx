import { useState } from 'react';

const missionTemplates = [
  { id: 'm1', text: 'Help users accomplish a specific task faster and more reliably' },
  { id: 'm2', text: 'Give people visibility into something that was previously opaque' },
  { id: 'm3', text: 'Reduce the cost or friction of an existing workflow' },
  { id: 'm4', text: 'Connect people or information that belongs together' },
];

const pillarOptions = [
  { id: 'p1', text: 'Clarity over cleverness' },
  { id: 'p2', text: 'Fast to start, powerful when needed' },
  { id: 'p3', text: 'Honest about trade-offs' },
  { id: 'p4', text: 'Respects the user\'s time' },
  { id: 'p5', text: 'Works without explanation' },
  { id: 'p6', text: 'Reliable over flashy' },
  { id: 'p7', text: 'Minimal surface area' },
  { id: 'p8', text: 'Composable by design' },
];

interface WizardState {
  step: number;
  idea: string;
  mission: string;
  pillars: string[];
  error: string;
}

function generateSpec(state: WizardState) {
  const mission = missionTemplates.find(m => m.id === state.mission);
  const pillars = state.pillars.map(id => pillarOptions.find(p => p.id === id)?.text).filter(Boolean);
  return `# L1: Philosophy
## Mission
${state.idea.trim()} — ${mission?.text ?? 'to serve users well'}.

## Design Pillars
${pillars.map((p, i) => `${i + 1}. ${p}`).join('\n')}

---
# L2: Truths (to be derived)
Success criteria and trade-offs follow from the mission above.

---
# L3: Interactions (to be derived)
Key user flows follow from the design pillars above.`;
}

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    idea: '',
    mission: '',
    pillars: [],
    error: '',
  });

  const handleNext = () => {
    if (state.step === 1) {
      if (!state.idea.trim()) {
        setState(s => ({ ...s, error: 'Please enter a product idea.' }));
        return;
      }
      setState(s => ({ ...s, step: 2, error: '' }));
    } else if (state.step === 2) {
      setState(s => ({ ...s, step: 3, error: '' }));
    }
  };

  const handleFinish = () => {
    setState(s => ({ ...s, step: 4, error: '' }));
  };

  const togglePillar = (id: string) => {
    setState(s => ({
      ...s,
      pillars: s.pillars.includes(id)
        ? s.pillars.filter(p => p !== id)
        : [...s.pillars, id],
    }));
  };

  const baseStyle: React.CSSProperties = {
    padding: '1.5rem',
    background: 'var(--color-surface)',
    borderRadius: '4px',
    border: '1px solid var(--color-border)',
  };

  const btnStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    padding: '0.5rem 1.1rem',
    borderRadius: '3px',
    border: '1px solid var(--color-border)',
    cursor: 'pointer',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    transition: 'border-color 150ms ease-out',
  };

  const primaryBtnStyle: React.CSSProperties = {
    ...btnStyle,
    background: 'var(--color-accent)',
    color: '#fff',
    border: '1px solid var(--color-accent)',
  };

  const steps = [
    { num: 1, label: 'Idea' },
    { num: 2, label: 'Mission' },
    { num: 3, label: 'Pillars' },
  ];

  return (
    <div data-test="spec-wizard" style={{ maxWidth: '600px' }}>
      {state.step < 4 && (
        <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{
              padding: '0.5rem 1rem',
              background: state.step === s.num ? 'var(--color-accent)' : 'var(--color-surface)',
              color: state.step === s.num ? '#fff' : 'var(--color-text-muted)',
              borderRight: i < steps.length - 1 ? '1px solid var(--color-border)' : 'none',
              flex: 1,
              textAlign: 'center',
            }}>
              {s.num}. {s.label}
            </div>
          ))}
        </div>
      )}

      {state.step === 1 && (
        <div data-test="wizard-step-1" style={baseStyle}>
          <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.6rem' }}>
            Describe your product idea in one sentence:
          </label>
          <input
            data-test="wizard-idea-input"
            type="text"
            value={state.idea}
            onChange={e => setState(s => ({ ...s, idea: e.target.value }))}
            placeholder="e.g. A tool for tracking personal goals"
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              fontFamily: 'Newsreader, Georgia, serif',
              fontSize: '1rem',
              border: '1px solid var(--color-border)',
              borderRadius: '3px',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              boxSizing: 'border-box',
              marginBottom: state.error ? '0.5rem' : '1rem',
            }}
            onKeyDown={e => { if (e.key === 'Enter') handleNext(); }}
          />
          {state.error && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#c0392b', marginBottom: '0.75rem' }}>{state.error}</p>}
          <button data-test="wizard-next" onClick={handleNext} style={primaryBtnStyle}>
            Next →
          </button>
        </div>
      )}

      {state.step === 2 && (
        <div data-test="wizard-step-2" style={baseStyle}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Which mission template best fits <em style={{ color: 'var(--color-text)' }}>"{state.idea}"</em>?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {missionTemplates.map(m => (
              <button
                key={m.id}
                data-test="wizard-mission-option"
                onClick={() => setState(s => ({ ...s, mission: m.id }))}
                style={{
                  ...btnStyle,
                  textAlign: 'left',
                  borderColor: state.mission === m.id ? 'var(--color-accent)' : 'var(--color-border)',
                  color: state.mission === m.id ? 'var(--color-accent)' : 'var(--color-text)',
                }}
              >
                {m.text}
              </button>
            ))}
          </div>
          <button data-test="wizard-next" onClick={handleNext} style={primaryBtnStyle}>
            Next →
          </button>
        </div>
      )}

      {state.step === 3 && (
        <div data-test="wizard-step-3" style={baseStyle}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Choose 3–5 design pillars (selected: {state.pillars.length}):
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {pillarOptions.map(p => (
              <button
                key={p.id}
                data-test="wizard-pillar-option"
                onClick={() => togglePillar(p.id)}
                style={{
                  ...btnStyle,
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.75rem',
                  borderColor: state.pillars.includes(p.id) ? 'var(--color-accent)' : 'var(--color-border)',
                  color: state.pillars.includes(p.id) ? 'var(--color-accent)' : 'var(--color-text)',
                }}
              >
                {state.pillars.includes(p.id) ? '✓ ' : ''}{p.text}
              </button>
            ))}
          </div>
          <button data-test="wizard-finish" onClick={handleFinish} style={primaryBtnStyle} disabled={state.pillars.length < 1}>
            Generate Spec →
          </button>
        </div>
      )}

      {state.step === 4 && (
        <div data-test="wizard-output" style={{ ...baseStyle, borderColor: 'var(--color-accent)' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Skeleton Spec Output</p>
          <pre style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.78rem',
            color: 'var(--color-text)',
            background: 'var(--color-bg)',
            padding: '1rem',
            borderRadius: '3px',
            overflowX: 'auto',
            lineHeight: 1.65,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {generateSpec(state)}
          </pre>
          <button onClick={() => setState({ step: 1, idea: '', mission: '', pillars: [], error: '' })} style={{ ...btnStyle, marginTop: '1rem' }}>
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
