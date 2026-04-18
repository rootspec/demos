import React, { useState } from 'react';

const PILLARS = [
  'Clarity — every stakeholder understands the goal',
  'Traceability — link features back to philosophy',
  'Testability — acceptance criteria that can be automated',
  'Consistency — unified language across all levels',
  'Versioning — specs evolve with the product',
];

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [mission, setMission] = useState('');
  const [selectedPillars, setSelectedPillars] = useState<number[]>([]);
  const [interaction, setInteraction] = useState('');
  const [done, setDone] = useState(false);

  const togglePillar = (idx: number) => {
    setSelectedPillars(prev =>
      prev.includes(idx) ? prev.filter(p => p !== idx) : [...prev, idx]
    );
  };

  const next = () => {
    if (step === 3) {
      setDone(true);
    } else {
      setStep(s => s + 1);
    }
  };

  const chosenPillars = selectedPillars.map(i => PILLARS[i]);

  return (
    <section id="spec-wizard" className="px-6 py-20 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text)' }}>
        Spec Wizard
      </h2>
      <p className="text-center mb-12" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
        Build a quick spec skeleton for your product idea in three steps.
      </p>

      <div data-test="spec-wizard" className="rounded-2xl border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        {!done ? (
          <>
            {/* Step 1 */}
            {step === 1 && (
              <div data-test="wizard-step-1">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Step 1: Mission
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
                  What is the core purpose of your product in one sentence?
                </p>
                <input
                  data-test="wizard-mission-input"
                  type="text"
                  value={mission}
                  onChange={e => setMission(e.target.value)}
                  placeholder="e.g. Help developers write better specs"
                  className="w-full rounded-lg px-4 py-3 text-sm border outline-none focus:ring-2"
                  style={{
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                  }}
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div data-test="wizard-step-2">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Step 2: Core Pillars
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
                  Select the truths that define your product.
                </p>
                <div className="space-y-2">
                  {PILLARS.map((pillar, idx) => (
                    <button
                      key={idx}
                      data-test={`wizard-pillar-${idx}`}
                      onClick={() => togglePillar(idx)}
                      className="w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors"
                      style={{
                        background: selectedPillars.includes(idx) ? 'rgba(98,112,245,0.15)' : 'var(--color-bg)',
                        borderColor: selectedPillars.includes(idx) ? '#6270f5' : 'var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {selectedPillars.includes(idx) ? '✓ ' : ''}{pillar}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div data-test="wizard-step-3">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Step 3: Key Interaction
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
                  Describe the most important user action in your product.
                </p>
                <input
                  data-test="wizard-interaction-input"
                  type="text"
                  value={interaction}
                  onChange={e => setInteraction(e.target.value)}
                  placeholder="e.g. User clicks a button and sees the spec"
                  className="w-full rounded-lg px-4 py-3 text-sm border outline-none focus:ring-2"
                  style={{
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                  }}
                />
              </div>
            )}

            {/* Next button */}
            <button
              data-test="wizard-next-step"
              onClick={next}
              className="mt-6 w-full py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ background: '#6270f5' }}
            >
              {step === 3 ? 'Generate Skeleton →' : 'Next →'}
            </button>

            {/* Step indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className="w-2 h-2 rounded-full"
                  style={{ background: s === step ? '#6270f5' : 'var(--color-border)' }}
                />
              ))}
            </div>
          </>
        ) : (
          /* Output */
          <div data-test="wizard-output">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              Your Spec Skeleton
            </h3>
            <pre
              className="rounded-lg p-4 text-xs overflow-x-auto font-mono"
              style={{ background: 'var(--color-bg)', color: '#8194fa' }}
            >
{`# PHILOSOPHY
mission: "${mission || 'Your mission here'}"

# TRUTHS
${chosenPillars.length > 0 ? chosenPillars.map(p => `- ${p}`).join('\n') : '- (no pillars selected)'}

# INTERACTIONS
- id: FLOW-001
  description: "${interaction || 'Your key interaction here'}"

# USER STORIES
---
id: US-001
title: [Derive from your interaction]
acceptance_criteria:
  - id: AC-001-1
    title: [Add your criterion]
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=your-element]' }
    then:
      - shouldExist: { selector: '[data-test=result]' }`}
            </pre>
            <button
              onClick={() => { setStep(1); setMission(''); setSelectedPillars([]); setInteraction(''); setDone(false); }}
              className="mt-4 w-full py-3 rounded-lg font-semibold border transition-colors text-sm"
              style={{ borderColor: '#6270f5', color: '#8194fa', background: 'transparent' }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
