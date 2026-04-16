import { useState } from 'react';

const missionTemplates = [
  { label: 'Productivity Tool', description: 'Help users accomplish more with less friction' },
  { label: 'Social Platform', description: 'Connect people around shared interests or goals' },
  { label: 'Commerce/Marketplace', description: 'Enable buying, selling, or exchanging value' },
  { label: 'Data/Analytics', description: 'Surface insights from complex information' },
  { label: 'Creative Tool', description: 'Enable users to make, express, or build things' },
  { label: 'Other', description: 'Define your own mission direction' },
];

const pillarOptions = [
  'Simplicity — do one thing extremely well',
  'Speed — minimize friction and time to value',
  'Trust — earn and maintain user confidence',
  'Delight — create memorable, enjoyable moments',
  'Power — give experts full control',
  'Accessibility — serve the broadest possible audience',
];

interface WizardData {
  productIdea: string;
  missionTemplate: number | null;
  pillars: number[];
  keyInteraction: string;
}

function generateSpec(data: WizardData): string {
  const template = data.missionTemplate !== null ? missionTemplates[data.missionTemplate] : null;
  const selectedPillars = data.pillars.map((i) => pillarOptions[i]);

  return `# RootSpec Skeleton — ${data.productIdea}

## L1 · Philosophy
${template ? `Mission direction: ${template.label} — ${template.description}` : ''}

Design pillars:
${selectedPillars.map((p) => `- ${p}`).join('\n')}

## L2 · Truths
- Users need: [define based on research]
- Market context: [define based on research]
- Key constraints: [define based on your context]

## L3 · Interactions
- Core moment: ${data.keyInteraction}
- Supporting interactions: [expand based on your product]

## L4 · Systems
- UI System: [define components and patterns]
- Data System: [define data flows and storage]

## L5 · User Stories
---
id: US-101
title: User can ${data.keyInteraction.toLowerCase()}
acceptance_criteria:
  - id: AC-101-1
    title: Core interaction works
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=core-element]' }
`;
}

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    productIdea: '',
    missionTemplate: null,
    pillars: [],
    keyInteraction: '',
  });
  const [output, setOutput] = useState<string | null>(null);

  function handleGenerate() {
    setOutput(generateSpec(data));
  }

  function togglePillar(index: number) {
    setData((d) => ({
      ...d,
      pillars: d.pillars.includes(index)
        ? d.pillars.filter((p) => p !== index)
        : [...d.pillars, index],
    }));
  }

  return (
    <section id="spec-wizard" className="py-20 px-4 bg-[var(--card)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-[var(--fg)]">Spec Your Idea</h2>
        <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
          Answer a few questions and get a RootSpec skeleton you can take to your AI agent.
        </p>

        <div data-test="spec-wizard" className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-purple-600' : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div data-test="wizard-step-1">
              <h3 className="text-xl font-semibold mb-2 text-[var(--fg)]">Step 1: Describe your product</h3>
              <p className="text-[var(--muted)] mb-6 text-sm">What are you building? Be brief — one or two sentences.</p>
              <textarea
                data-test="product-idea-input"
                value={data.productIdea}
                onChange={(e) => setData((d) => ({ ...d, productIdea: e.target.value }))}
                placeholder="e.g. A tool for tracking daily habits and building streaks"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <div className="flex justify-end mt-6">
                <button
                  data-test="wizard-next"
                  disabled={!data.productIdea.trim()}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div data-test="wizard-step-2">
              <h3 className="text-xl font-semibold mb-2 text-[var(--fg)]">Step 2: Choose a mission direction</h3>
              <p className="text-[var(--muted)] mb-6 text-sm">Which best describes the purpose of your product?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {missionTemplates.map((tmpl, i) => (
                  <button
                    key={i}
                    data-test={`mission-template-${i}`}
                    onClick={() => setData((d) => ({ ...d, missionTemplate: i }))}
                    className={`p-3 rounded-lg border text-left text-sm transition-colors ${
                      data.missionTemplate === i
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                        : 'border-[var(--border)] hover:border-purple-300 hover:bg-[var(--card)]'
                    }`}
                  >
                    <div className="font-medium text-[var(--fg)]">{tmpl.label}</div>
                    <div className="text-[var(--muted)] text-xs mt-0.5">{tmpl.description}</div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 border border-[var(--border)] rounded-lg font-medium hover:bg-[var(--card)] transition-colors"
                >
                  ← Back
                </button>
                <button
                  data-test="wizard-next"
                  disabled={data.missionTemplate === null}
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && !output && (
            <div data-test="wizard-step-3">
              <h3 className="text-xl font-semibold mb-2 text-[var(--fg)]">Step 3: Set your design pillars</h3>
              <p className="text-[var(--muted)] mb-4 text-sm">Pick 2–3 principles that will guide every decision. Then describe one key interaction.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {pillarOptions.map((pillar, i) => (
                  <button
                    key={i}
                    data-test={`pillar-option-${i}`}
                    onClick={() => togglePillar(i)}
                    className={`p-3 rounded-lg border text-left text-sm transition-colors ${
                      data.pillars.includes(i)
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                        : 'border-[var(--border)] hover:border-purple-300 hover:bg-[var(--card)]'
                    }`}
                  >
                    {pillar}
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--fg)] mb-2">Key interaction</label>
                <input
                  data-test="key-interaction-input"
                  type="text"
                  value={data.keyInteraction}
                  onChange={(e) => setData((d) => ({ ...d, keyInteraction: e.target.value }))}
                  placeholder="e.g. User marks a habit as complete"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 border border-[var(--border)] rounded-lg font-medium hover:bg-[var(--card)] transition-colors"
                >
                  ← Back
                </button>
                <button
                  data-test="wizard-generate"
                  disabled={data.pillars.length === 0 || !data.keyInteraction.trim()}
                  onClick={handleGenerate}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                >
                  Generate Spec →
                </button>
              </div>
            </div>
          )}

          {/* Output */}
          {output && (
            <div data-test="spec-output">
              <h3 className="text-xl font-semibold mb-4 text-[var(--fg)]">Your RootSpec Skeleton</h3>
              <pre className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 text-xs font-mono text-[var(--fg)] overflow-auto max-h-80 whitespace-pre-wrap">
                {output}
              </pre>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    setOutput(null);
                    setStep(1);
                    setData({ productIdea: '', missionTemplate: null, pillars: [], keyInteraction: '' });
                  }}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors"
                >
                  Start over
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Copy to clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
