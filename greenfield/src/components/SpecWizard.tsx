import { useState } from 'react';

const MISSION_TEMPLATES = [
  'To help {users} {achieve goal} by {mechanism}.',
  'To eliminate {pain point} for {users} through {approach}.',
  'To enable {users} to {capability} without {obstacle}.',
  'To provide {users} with {value} that {benefit}.',
];

const PILLAR_OPTIONS = [
  'Speed & Performance',
  'Simplicity',
  'Reliability',
  'Accessibility',
  'Privacy',
  'Extensibility',
  'Collaboration',
  'Transparency',
];

type Step = 1 | 2 | 3 | 'complete';

export default function SpecWizard() {
  const [step, setStep] = useState<Step>(1);
  const [idea, setIdea] = useState('');
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [selectedPillars, setSelectedPillars] = useState<number[]>([]);
  const [interaction, setInteraction] = useState('');
  const [output, setOutput] = useState('');

  function generateOutput() {
    const mission = selectedMission !== null
      ? MISSION_TEMPLATES[selectedMission].replace('{users}', 'users').replace('{achieve goal}', 'achieve their goals').replace('{mechanism}', 'a structured approach').replace('{pain point}', 'friction').replace('{approach}', 'automation').replace('{capability}', 'take action').replace('{obstacle}', 'complexity').replace('{value}', 'clarity').replace('{benefit}', 'drives results')
      : 'Custom mission';
    const pillars = selectedPillars.map(i => PILLAR_OPTIONS[i]).join(', ');

    return `# L1: Philosophy
## Product Idea
${idea}

## Mission
${mission}

## Design Pillars
${selectedPillars.map(i => `- ${PILLAR_OPTIONS[i]}`).join('\n')}

---

# L3: Core Interaction
## Key Interaction
${interaction}

### Pattern
1. User triggers: "${interaction}"
2. System validates input
3. System executes action
4. User sees confirmation

---

# L5: User Story (Generated)
## US-001: ${idea.slice(0, 40)}
As a user,
I want to ${interaction.toLowerCase()},
So that I can achieve my goal with ${pillars.split(',')[0]?.trim() || 'ease'}.

### AC-001-1
Given: I am on the main page
When: I initiate "${interaction}"
Then: The system completes the action successfully
`;
  }

  function handleNext() {
    if (step === 1) {
      if (!idea.trim() || selectedMission === null) return;
      setStep(2);
    } else if (step === 2) {
      if (selectedPillars.length < 3) return;
      setStep(3);
    } else if (step === 3) {
      if (!interaction.trim()) return;
      setOutput(generateOutput());
      setStep('complete');
    }
  }

  function togglePillar(idx: number) {
    setSelectedPillars(prev =>
      prev.includes(idx) ? prev.filter(p => p !== idx) : [...prev, idx]
    );
  }

  return (
    <section data-test="spec-wizard" style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', margin: '0 0 1rem' }}>
          Spec Wizard
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 0 2rem' }}>
          Map your product idea to a RootSpec skeleton in three steps.
        </p>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 700,
                backgroundColor: (step === s || (step === 'complete' && s <= 3)) ? 'var(--accent)' : 'var(--bg-card)',
                color: (step === s || (step === 'complete' && s <= 3)) ? 'white' : 'var(--text-muted)',
                border: '1px solid var(--border)',
                transition: 'all 200ms ease',
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div data-test="wizard-step-1" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Step 1: Product Mission
            </h3>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              What is your product idea?
            </label>
            <input
              data-test="wizard-idea-input"
              type="text"
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="e.g., A tool for tracking learning goals"
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                marginBottom: '1.25rem',
                boxSizing: 'border-box',
              }}
            />
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Select a mission template:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {MISSION_TEMPLATES.map((template, idx) => (
                <button
                  key={idx}
                  data-test="wizard-mission-option"
                  onClick={() => setSelectedMission(idx)}
                  style={{
                    padding: '0.625rem 1rem',
                    backgroundColor: selectedMission === idx ? 'var(--accent)' : 'var(--bg-secondary)',
                    border: `1px solid ${selectedMission === idx ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '0.5rem',
                    color: selectedMission === idx ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    fontFamily: 'monospace',
                  }}
                >
                  {template}
                </button>
              ))}
            </div>
            <button
              data-test="wizard-next"
              onClick={handleNext}
              disabled={!idea.trim() || selectedMission === null}
              style={{
                padding: '0.625rem 1.5rem',
                backgroundColor: !idea.trim() || selectedMission === null ? 'var(--text-muted)' : 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: !idea.trim() || selectedMission === null ? 'not-allowed' : 'pointer',
                transition: 'background-color 200ms ease',
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div data-test="wizard-step-2" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Step 2: Design Pillars
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0 0 1rem' }}>
              Select at least 3 design pillars that define your product's priorities:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {PILLAR_OPTIONS.map((pillar, idx) => (
                <button
                  key={idx}
                  data-test="wizard-pillar-option"
                  onClick={() => togglePillar(idx)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedPillars.includes(idx) ? 'var(--accent)' : 'var(--bg-secondary)',
                    border: `1px solid ${selectedPillars.includes(idx) ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '9999px',
                    color: selectedPillars.includes(idx) ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 200ms ease',
                  }}
                >
                  {selectedPillars.includes(idx) ? '✓ ' : ''}{pillar}
                </button>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 1rem' }}>
              {selectedPillars.length}/3 minimum selected
            </p>
            <button
              data-test="wizard-next"
              onClick={handleNext}
              disabled={selectedPillars.length < 3}
              style={{
                padding: '0.625rem 1.5rem',
                backgroundColor: selectedPillars.length < 3 ? 'var(--text-muted)' : 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: selectedPillars.length < 3 ? 'not-allowed' : 'pointer',
                transition: 'background-color 200ms ease',
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div data-test="wizard-step-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Step 3: Key Interaction
            </h3>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Describe one core user interaction:
            </label>
            <input
              data-test="wizard-interaction-input"
              type="text"
              value={interaction}
              onChange={e => setInteraction(e.target.value)}
              placeholder="e.g., User marks a goal complete"
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                boxSizing: 'border-box',
              }}
            />
            <button
              data-test="wizard-next"
              onClick={handleNext}
              disabled={!interaction.trim()}
              style={{
                padding: '0.625rem 1.5rem',
                backgroundColor: !interaction.trim() ? 'var(--text-muted)' : 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: !interaction.trim() ? 'not-allowed' : 'pointer',
                transition: 'background-color 200ms ease',
              }}
            >
              Generate Spec →
            </button>
          </div>
        )}

        {/* Complete */}
        {step === 'complete' && (
          <div>
            <div data-test="wizard-step-complete" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem 0.75rem 0 0', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✅ Spec skeleton generated!</span>
              <button
                onClick={() => { setStep(1); setIdea(''); setSelectedMission(null); setSelectedPillars([]); setInteraction(''); setOutput(''); }}
                style={{ marginLeft: 'auto', padding: '0.375rem 0.75rem', backgroundColor: 'transparent', border: '1px solid var(--border)', borderRadius: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Start Over
              </button>
            </div>
            <div
              data-test="wizard-output"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderTop: 'none',
                borderRadius: '0 0 0.75rem 0.75rem',
                padding: '1.25rem',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, lineHeight: 1.7 }}>{output}</pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
