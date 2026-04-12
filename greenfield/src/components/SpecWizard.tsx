import { useState } from 'react';

const MISSIONS = [
  { id: 1, label: 'Help users achieve a goal faster' },
  { id: 2, label: 'Replace manual/paper processes with software' },
  { id: 3, label: 'Enable collaboration across teams or locations' },
];

const PILLARS = [
  { id: 1, label: 'Performance & Speed' },
  { id: 2, label: 'Reliability & Trust' },
  { id: 3, label: 'Simplicity & Clarity' },
  { id: 4, label: 'Extensibility & Scale' },
];

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [idea, setIdea] = useState('');
  const [mission, setMission] = useState<number | null>(null);
  const [pillars, setPillars] = useState<number[]>([]);
  const [interaction, setInteraction] = useState('');
  const [done, setDone] = useState(false);

  const togglePillar = (id: number) => {
    setPillars(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: '6px',
    border: 'none',
    background: disabled ? 'var(--border)' : 'var(--accent)',
    color: disabled ? 'var(--text-muted)' : '#ffffff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'background 200ms ease',
    opacity: disabled ? 0.6 : 1,
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    outline: 'none',
    resize: 'vertical' as const,
  };

  const sectionStyle: React.CSSProperties = {
    background: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '24px',
  };

  const selectedOptionStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: '6px',
    border: '2px solid var(--accent)',
    background: 'var(--accent)',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left' as const,
    width: '100%',
    marginBottom: '8px',
  };

  const unselectedOptionStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left' as const,
    width: '100%',
    marginBottom: '8px',
  };

  const selectedMission = MISSIONS.find(m => m.id === mission);
  const selectedPillarLabels = PILLARS.filter(p => pillars.includes(p.id)).map(p => p.label);

  const output = `id: my-product-spec
title: ${idea}

philosophy:
  mission: "${selectedMission?.label || ''}"
  pillars:
${selectedPillarLabels.map(p => `    - "${p}"`).join('\n')}

interactions:
  - journey: MAIN
    description: "${interaction}"

systems:
  - name: CORE_SYSTEM
    responsibility: "Primary product functionality"

implementation:
  - phase: MVP
    stories:
      - id: US-001
        title: "First user story derived from: ${idea}"`;

  return (
    <div data-test="spec-wizard" style={sectionStyle}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step >= s ? 'var(--accent)' : 'var(--border)',
                color: step >= s ? '#fff' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                transition: 'background 200ms ease',
              }}
            >
              {s}
            </div>
          ))}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center', marginLeft: '4px' }}>
            Step {step} of 3
          </span>
        </div>
      </div>

      {!done && step === 1 && (
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontWeight: 600 }}>
            What are you building?
          </label>
          <textarea
            data-test="wizard-idea-input"
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="e.g. A tool that helps teams write better specs"
            rows={3}
            style={inputStyle}
          />
          <div style={{ marginTop: '12px', textAlign: 'right' }}>
            <button
              data-test="wizard-next-btn"
              onClick={() => idea.trim() && setStep(2)}
              disabled={!idea.trim()}
              style={btnStyle(!idea.trim())}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {!done && step === 2 && (
        <div data-test="wizard-step-2">
          <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text)', fontWeight: 600 }}>
            What is the primary mission?
          </label>
          {MISSIONS.map(m => (
            <button
              key={m.id}
              data-test={`wizard-mission-option-${m.id}`}
              onClick={() => setMission(m.id)}
              style={mission === m.id ? selectedOptionStyle : unselectedOptionStyle}
            >
              {m.label}
            </button>
          ))}
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button onClick={() => setStep(1)} style={{ ...btnStyle(false), background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
              ← Back
            </button>
            <button
              data-test="wizard-next-btn"
              onClick={() => mission !== null && setStep(3)}
              disabled={mission === null}
              style={btnStyle(mission === null)}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {!done && step === 3 && (
        <div>
          <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text)', fontWeight: 600 }}>
            Choose quality pillars (select all that apply):
          </label>
          {PILLARS.map(p => (
            <button
              key={p.id}
              data-test={`wizard-pillar-${p.id}`}
              onClick={() => togglePillar(p.id)}
              style={pillars.includes(p.id) ? selectedOptionStyle : unselectedOptionStyle}
            >
              {pillars.includes(p.id) ? '✓ ' : ''}{p.label}
            </button>
          ))}
          <label style={{ display: 'block', marginTop: '16px', marginBottom: '8px', color: 'var(--text)', fontWeight: 600 }}>
            Describe one key user interaction:
          </label>
          <textarea
            data-test="wizard-interaction-input"
            value={interaction}
            onChange={e => setInteraction(e.target.value)}
            placeholder="e.g. User types a product idea and sees a spec skeleton"
            rows={2}
            style={inputStyle}
          />
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button onClick={() => setStep(2)} style={{ ...btnStyle(false), background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
              ← Back
            </button>
            <button
              data-test="wizard-next-btn"
              onClick={() => {
                if (pillars.length > 0 && interaction.trim()) {
                  setDone(true);
                }
              }}
              disabled={pillars.length === 0 || !interaction.trim()}
              style={btnStyle(pillars.length === 0 || !interaction.trim())}
            >
              Generate Spec →
            </button>
          </div>
        </div>
      )}

      {done && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>Your Skeleton Spec</span>
            <button
              onClick={() => { setDone(false); setStep(1); setIdea(''); setMission(null); setPillars([]); setInteraction(''); }}
              style={{ ...btnStyle(false), background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)', fontSize: '0.8rem', padding: '4px 10px' }}
            >
              ↺ Reset
            </button>
          </div>
          <pre
            data-test="wizard-output"
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '16px',
              fontSize: '0.8rem',
              overflowX: 'auto',
              color: 'var(--text)',
              whiteSpace: 'pre-wrap',
              fontFamily: 'ui-monospace, monospace',
              margin: 0,
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
