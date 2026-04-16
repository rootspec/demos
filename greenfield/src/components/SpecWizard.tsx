import { useState } from 'react';

const PILLARS = [
  { id: 'philosophy', label: 'Philosophy', desc: 'Core axioms and beliefs' },
  { id: 'truths', label: 'Truths', desc: 'Non-negotiable requirements' },
  { id: 'interactions', label: 'Interactions', desc: 'How users engage' },
  { id: 'systems', label: 'Systems', desc: 'Technical architecture' },
  { id: 'implementation', label: 'Implementation', desc: 'Stories and criteria' },
];

function generateSpec(mission: string, pillars: string[], interaction: string): string {
  return `# RootSpec Skeleton

## PHILOSOPHY
Mission: ${mission}

## TRUTHS
${pillars.map(p => `- ${p.charAt(0).toUpperCase() + p.slice(1)} is a core pillar`).join('\n')}

## INTERACTIONS
- ${interaction}

## SYSTEMS
${pillars.map(p => `- ${p.toUpperCase()}_SYSTEM`).join('\n')}

## USER STORIES
id: US-001
title: [Your first story here]
acceptance_criteria:
  - id: AC-001-1
    given:
      - visit: '/'
    then:
      - shouldExist:
          selector: '[data-test=main-content]'`;
}

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [mission, setMission] = useState('');
  const [missionError, setMissionError] = useState(false);
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [interaction, setInteraction] = useState('');
  const [output, setOutput] = useState('');

  function handleNext() {
    if (step === 1) {
      if (!mission.trim()) {
        setMissionError(true);
        return;
      }
      setMissionError(false);
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const spec = generateSpec(mission, selectedPillars, interaction || 'User visits the site');
      setOutput(spec);
      setStep(4);
    }
  }

  function togglePillar(id: string) {
    setSelectedPillars(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  }

  return (
    <section
      data-test="spec-wizard"
      id="wizard"
      className="py-24 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try the Spec Wizard
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Answer three questions and get a RootSpec skeleton.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[var(--bg-secondary)] p-8">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(n => (
              <div
                key={n}
                className={`h-1 flex-1 rounded-full transition-colors ${n <= step ? 'bg-accent-500' : 'bg-white/10'}`}
              />
            ))}
          </div>

          {/* Step 1: Mission */}
          {step === 1 && (
            <div data-test="wizard-step-1">
              <h3 className="text-xl font-semibold mb-2">What's the mission?</h3>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">
                One sentence describing what this product does and for whom.
              </p>
              <textarea
                data-test="wizard-mission-input"
                value={mission}
                onChange={e => { setMission(e.target.value); setMissionError(false); }}
                placeholder="e.g. A tool that helps engineering teams write AI-executable specs"
                className="w-full h-28 px-4 py-3 rounded-lg border border-white/10 bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] resize-none focus:outline-none focus:border-accent-500/50 text-sm"
              />
              {missionError && (
                <p className="text-red-400 text-sm mt-2">Please enter your product mission before continuing.</p>
              )}
            </div>
          )}

          {/* Step 2: Pillars */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Which spec layers matter most?</h3>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">Select the RootSpec pillars for your project.</p>
              <div className="flex flex-col gap-3">
                {PILLARS.map((pillar, idx) => {
                  const selected = selectedPillars.includes(pillar.id);
                  const nthClass = idx === 0 ? '' : idx === 1 ? '' : '';
                  return (
                    <button
                      key={pillar.id}
                      data-test="wizard-pillar-option"
                      onClick={() => togglePillar(pillar.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                        selected
                          ? 'border-accent-500/60 bg-accent-500/10 text-[var(--text-primary)]'
                          : 'border-white/10 bg-transparent text-[var(--text-secondary)] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-medium text-sm">{pillar.label}</span>
                        <span className="text-xs ml-2 opacity-60">{pillar.desc}</span>
                      </div>
                      {selected && <span className="text-accent-400">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Key Interaction */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Describe a key user interaction</h3>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">
                What's the most important thing a user does in your product?
              </p>
              <textarea
                data-test="wizard-interaction-input"
                value={interaction}
                onChange={e => setInteraction(e.target.value)}
                placeholder="e.g. User fills in a mission statement and clicks 'Generate Spec'"
                className="w-full h-28 px-4 py-3 rounded-lg border border-white/10 bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] resize-none focus:outline-none focus:border-accent-500/50 text-sm"
              />
            </div>
          )}

          {/* Step 4: Output */}
          {step === 4 && (
            <div data-test="wizard-output">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Your RootSpec skeleton</h3>
              <pre className="bg-[var(--bg-primary)] rounded-lg p-4 text-xs font-mono text-[var(--text-secondary)] overflow-x-auto whitespace-pre-wrap max-h-80 overflow-y-auto">
                {output}
              </pre>
              <p className="text-[var(--text-secondary)] text-sm mt-4">
                Copy this into your project's <code className="text-accent-400">rootspec/</code> directory and run <code className="text-accent-400">/rs-spec</code> to refine it.
              </p>
            </div>
          )}

          {/* Next button */}
          {step < 4 && (
            <div className="mt-6 flex justify-end">
              <button
                data-test="wizard-next"
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-colors text-sm"
              >
                {step === 3 ? 'Generate Spec →' : 'Next →'}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => { setStep(1); setMission(''); setSelectedPillars([]); setInteraction(''); setOutput(''); }}
                className="px-6 py-2 rounded-lg border border-white/20 hover:border-white/40 text-[var(--text-secondary)] font-semibold transition-colors text-sm"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
