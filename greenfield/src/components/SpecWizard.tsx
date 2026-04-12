import { useState } from 'react';

const MISSION_OPTIONS = [
  { id: 'A', label: 'Streamline an existing workflow that people find tedious or error-prone' },
  { id: 'B', label: 'Unlock a capability that currently requires expensive expertise or tools' },
  { id: 'C', label: 'Connect people or information that are currently siloed or hard to find' },
];

const PILLAR_OPTIONS = [
  'Speed & Efficiency',
  'Clarity & Transparency',
  'Accessibility & Inclusion',
  'Reliability & Trust',
  'Collaboration & Sharing',
  'Customization & Control',
  'Discovery & Exploration',
];

const MIN_PILLARS = 3;
const MAX_PILLARS = 5;

function generateSpec(inputs: {
  productIdea: string;
  mission: string;
  pillars: string[];
  interaction: string;
}): string {
  const pillarList = inputs.pillars.map(p => `  - ${p}`).join('\n');
  return `# RootSpec Skeleton — ${inputs.productIdea}

## L1 — Philosophy

**Mission:** ${inputs.mission}

**Design Pillars:**
${pillarList}

---

## L2 — Stable Truths

- The product exists to serve: ${inputs.productIdea}
- Core constraint: [to be defined by your team]
- Definition of success: [to be defined by your team]

---

## L3 — Interactions

**Key Interaction:** ${inputs.interaction}

Journey steps:
1. User arrives at the product
2. [Define onboarding flow]
3. ${inputs.interaction}
4. [Define success state]

---

## L4 — Systems

- AUTH_SYSTEM: [if authentication required]
- CORE_SYSTEM: Primary feature logic
- CONTENT_SYSTEM: Data and display

---

## L5 — Implementation

User Story: As a user, I can ${inputs.interaction.toLowerCase()}
Acceptance criteria:
  - Given [precondition]
  - When [action]
  - Then [expected outcome]
`;
}

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [productIdea, setProductIdea] = useState('');
  const [missionChoice, setMissionChoice] = useState<string | null>(null);
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [interaction, setInteraction] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function togglePillar(pillar: string) {
    setSelectedPillars(prev => {
      if (prev.includes(pillar)) return prev.filter(p => p !== pillar);
      if (prev.length >= MAX_PILLARS) return prev;
      return [...prev, pillar];
    });
  }

  function handleNext() {
    if (step < 4) setStep(s => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1);
  }

  function handleGenerate() {
    const chosenMission = MISSION_OPTIONS.find(m => m.id === missionChoice);
    if (!chosenMission || !interaction) return;
    const spec = generateSpec({
      productIdea,
      mission: chosenMission.label,
      pillars: selectedPillars,
      interaction,
    });
    setOutput(spec);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — output is still selectable
    }
  }

  const canAdvanceStep1 = productIdea.trim().length > 0;
  const canAdvanceStep2 = missionChoice !== null;
  const canAdvanceStep3 = selectedPillars.length >= MIN_PILLARS;
  const canGenerate = interaction.trim().length > 0;

  const canNext = step === 1 ? canAdvanceStep1 : step === 2 ? canAdvanceStep2 : step === 3 ? canAdvanceStep3 : false;

  return (
    <div
      data-test="spec-wizard"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: n <= step ? 'var(--color-primary)' : 'var(--color-border)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* Step 1: Product Idea */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Step 1 of 4 — What are you building?
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Describe your product idea in a sentence or two. Be specific.
          </p>
          <textarea
            data-test="wizard-idea-input"
            value={productIdea}
            onChange={e => setProductIdea(e.target.value)}
            placeholder="e.g. A tool for tracking reading habits and building a personal book library"
            rows={3}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.9rem',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>
      )}

      {/* Step 2: Mission */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Step 2 of 4 — What is the mission?
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Select the mission pattern that best fits <strong>{productIdea}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MISSION_OPTIONS.map(opt => (
              <label
                key={opt.id}
                data-test="wizard-mission-option"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 16px',
                  border: `2px solid ${missionChoice === opt.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: missionChoice === opt.id ? 'rgba(79,70,229,0.08)' : 'var(--color-bg)',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                <input
                  type="radio"
                  name="mission"
                  value={opt.id}
                  checked={missionChoice === opt.id}
                  onChange={() => setMissionChoice(opt.id)}
                  style={{ marginTop: '2px', flexShrink: 0 }}
                />
                <span style={{ fontSize: '0.9rem' }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Pillars */}
      {step === 3 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Step 3 of 4 — Design Pillars
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Select {MIN_PILLARS}–{MAX_PILLARS} design pillars. Selected: {selectedPillars.length}/{MAX_PILLARS}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PILLAR_OPTIONS.map(pillar => {
              const isSelected = selectedPillars.includes(pillar);
              const isDisabled = !isSelected && selectedPillars.length >= MAX_PILLARS;
              return (
                <label
                  key={pillar}
                  data-test="wizard-pillar-option"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: '6px',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    background: isSelected ? 'rgba(79,70,229,0.08)' : 'var(--color-bg)',
                    opacity: isDisabled ? 0.5 : 1,
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => togglePillar(pillar)}
                    style={{ flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>{pillar}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4: Key Interaction */}
      {step === 4 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Step 4 of 4 — Key Interaction
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Describe the single most important thing a user does in your product.
          </p>
          <input
            data-test="wizard-interaction-input"
            type="text"
            value={interaction}
            onChange={e => setInteraction(e.target.value)}
            placeholder="e.g. User logs a book they finished reading"
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
            }}
          />

          {output && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.9rem' }}>Generated Skeleton Spec</strong>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    background: 'none',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre
                data-test="wizard-output"
                style={{
                  background: 'var(--color-code-bg)',
                  color: 'var(--color-code-text)',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '0.78rem',
                  maxHeight: '320px',
                  overflowY: 'auto',
                  userSelect: 'text',
                }}
              >
                {output}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '8px' }}>
        <button
          onClick={handleBack}
          disabled={step === 1}
          style={{
            padding: '8px 20px',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            background: 'none',
            color: 'var(--color-text)',
            cursor: step === 1 ? 'not-allowed' : 'pointer',
            opacity: step === 1 ? 0.4 : 1,
          }}
        >
          ← Back
        </button>

        {step < 4 ? (
          <button
            data-test="wizard-next"
            onClick={handleNext}
            disabled={!canNext}
            style={{
              padding: '8px 24px',
              border: 'none',
              borderRadius: '6px',
              background: canNext ? 'var(--color-primary)' : 'var(--color-border)',
              color: canNext ? '#fff' : 'var(--color-text-muted)',
              cursor: canNext ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Next →
          </button>
        ) : (
          <button
            data-test="wizard-generate"
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={{
              padding: '8px 24px',
              border: 'none',
              borderRadius: '6px',
              background: canGenerate ? 'var(--color-primary)' : 'var(--color-border)',
              color: canGenerate ? '#fff' : 'var(--color-text-muted)',
              cursor: canGenerate ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Generate Spec →
          </button>
        )}
      </div>
    </div>
  );
}
