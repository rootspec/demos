import { useState } from 'react';

const missionTemplates = [
  'To help {audience} {achieve outcome} without {pain point}.',
  'To give {audience} the confidence to {achieve outcome} by removing {obstacle}.',
  'To make {outcome} accessible to {audience} who have struggled with {pain}.',
  'To eliminate {pain point} for {audience} so they can focus on {core value}.',
  'To transform how {audience} {activity} by making it {quality}.',
];

const pillarSuggestions = [
  'Effortless Relief',
  'Earned Confidence',
  'Delightful Simplicity',
  'Trusted Reliability',
  'Quiet Control',
  'Radical Transparency',
  'Focused Depth',
  'Gentle Learning',
  'Swift Mastery',
  'Honest Feedback',
];

type Step = 1 | 2 | 3 | 'output';

export default function SpecWizard() {
  const [step, setStep] = useState<Step>(1);
  const [productIdea, setProductIdea] = useState('');
  const [missionChoice, setMissionChoice] = useState('');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [keyInteraction, setKeyInteraction] = useState('');

  function togglePillar(p: string) {
    setSelectedPillars((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function canAdvanceStep1() {
    return productIdea.trim().length > 0 && missionChoice.length > 0;
  }

  function canAdvanceStep2() {
    return selectedPillars.length >= 3;
  }

  function canAdvanceStep3() {
    return keyInteraction.trim().length > 0;
  }

  const resolvedMission = missionChoice
    ? missionTemplates[parseInt(missionChoice)].replace('{audience}', 'users').replace('{achieve outcome}', productIdea.trim() || 'achieve their goal').replace('{pain point}', 'existing friction').replace('{obstacle}', 'complexity').replace('{pain}', 'prior tools').replace('{core value}', 'what matters').replace('{activity}', 'work').replace('{quality}', 'effortless').replace('{outcome}', productIdea.trim() || 'the outcome')
    : '';

  return (
    <div
      data-test="spec-wizard"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        backgroundColor: 'var(--color-bg-surface)',
        padding: '2rem',
        maxWidth: '640px',
      }}
    >
      {/* Step 1 */}
      {step === 1 && (
        <div>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Step 1 of 3 — Mission
          </div>

          <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            What's your product idea?
          </label>
          <input
            data-test="wizard-product-idea"
            type="text"
            value={productIdea}
            onChange={(e) => setProductIdea(e.target.value)}
            placeholder="e.g. A tool for tracking reading habits"
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              fontFamily: 'Georgia, serif',
              fontSize: '0.9375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />

          <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
            Choose a mission template:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {missionTemplates.map((t, i) => (
              <button
                key={i}
                data-test={`wizard-mission-option-${i}`}
                onClick={() => setMissionChoice(String(i))}
                style={{
                  textAlign: 'left',
                  padding: '0.625rem 0.875rem',
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.875rem',
                  color: missionChoice === String(i) ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  backgroundColor: missionChoice === String(i) ? 'var(--color-bg)' : 'transparent',
                  border: `1px solid ${missionChoice === String(i) ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'border-color 150ms, color 150ms',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            data-test="wizard-next-step"
            onClick={() => setStep(2)}
            disabled={!canAdvanceStep1()}
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.9375rem',
              backgroundColor: canAdvanceStep1() ? 'var(--color-accent)' : 'var(--color-border)',
              color: canAdvanceStep1() ? '#fff' : 'var(--color-text-secondary)',
              border: 'none',
              borderRadius: '4px',
              padding: '0.625rem 1.25rem',
              cursor: canAdvanceStep1() ? 'pointer' : 'not-allowed',
              transition: 'background-color 150ms',
            }}
          >
            Next: Design Pillars →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div data-test="wizard-step-2">
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Step 2 of 3 — Design Pillars
          </div>

          <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
            What should users feel? Choose 3–5 pillars.
          </label>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            {selectedPillars.length}/5 selected
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {pillarSuggestions.map((p, i) => {
              const selected = selectedPillars.includes(p);
              return (
                <button
                  key={i}
                  data-test={`wizard-pillar-${i}`}
                  onClick={() => togglePillar(p)}
                  disabled={!selected && selectedPillars.length >= 5}
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '0.875rem',
                    padding: '0.375rem 0.875rem',
                    borderRadius: '999px',
                    border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    backgroundColor: selected ? 'var(--color-accent)' : 'transparent',
                    color: selected ? '#fff' : 'var(--color-text-secondary)',
                    cursor: (!selected && selectedPillars.length >= 5) ? 'not-allowed' : 'pointer',
                    transition: 'all 150ms',
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setStep(1)}
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.875rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              ← Back
            </button>
            <button
              data-test="wizard-next-step"
              onClick={() => setStep(3)}
              disabled={!canAdvanceStep2()}
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '0.9375rem',
                backgroundColor: canAdvanceStep2() ? 'var(--color-accent)' : 'var(--color-border)',
                color: canAdvanceStep2() ? '#fff' : 'var(--color-text-secondary)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.625rem 1.25rem',
                cursor: canAdvanceStep2() ? 'pointer' : 'not-allowed',
                transition: 'background-color 150ms',
              }}
            >
              Next: Key Interaction →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Step 3 of 3 — Key Interaction
          </div>

          <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            Describe one key interaction.
          </label>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            What triggers it? What happens? What does the user feel?
          </p>
          <input
            data-test="wizard-key-interaction"
            type="text"
            value={keyInteraction}
            onChange={(e) => setKeyInteraction(e.target.value)}
            placeholder="e.g. User logs a book they just finished"
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              fontFamily: 'Georgia, serif',
              fontSize: '0.9375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setStep(2)}
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.875rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              ← Back
            </button>
            <button
              data-test="wizard-next-step"
              onClick={() => setStep('output')}
              disabled={!canAdvanceStep3()}
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '0.9375rem',
                backgroundColor: canAdvanceStep3() ? 'var(--color-accent)' : 'var(--color-border)',
                color: canAdvanceStep3() ? '#fff' : 'var(--color-text-secondary)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.625rem 1.25rem',
                cursor: canAdvanceStep3() ? 'pointer' : 'not-allowed',
                transition: 'background-color 150ms',
              }}
            >
              Generate skeleton spec →
            </button>
          </div>
        </div>
      )}

      {/* Output */}
      {step === 'output' && (
        <div data-test="wizard-output">
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--color-accent)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Your skeleton spec
          </div>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
            Template-based output — not AI generated. This is what L1–L3 looks like for your idea.
          </p>

          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.8125rem',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '1.25rem',
              color: 'var(--color-text-code)',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}
          >
{`# L1: Philosophy
## Product: ${productIdea}

### Mission
${resolvedMission}

### Design Pillars
${selectedPillars.map((p, i) => `${i + 1}. ${p}`).join('\n')}

---

# L2: Truths

### Truth: [Derive from mission]
The product exists to fulfill the mission above.
Every trade-off must serve the design pillars.

---

# L3: Interactions

### Interaction: Core Flow
Given: a user who wants to ${productIdea.toLowerCase() || 'achieve the goal'}
When: ${keyInteraction}
Then: the user feels ${selectedPillars[0] || 'the primary pillar'}
      and the system confirms the action`}
          </div>

          <button
            onClick={() => { setStep(1); setProductIdea(''); setMissionChoice(''); setSelectedPillars([]); setKeyInteraction(''); }}
            style={{ marginTop: '1.25rem', fontFamily: 'system-ui, sans-serif', fontSize: '0.875rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
