import { useState } from 'react';

const PILLARS = [
  'SaaS', 'Mobile App', 'API', 'E-commerce', 'Developer Tool',
  'Analytics', 'Social', 'Productivity', 'AI/ML', 'Marketplace',
];

export default function SpecWizard() {
  const [step, setStep] = useState(1);
  const [mission, setMission] = useState('');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [interaction, setInteraction] = useState('');
  const [generated, setGenerated] = useState(false);

  const togglePillar = (pillar: string) => {
    setSelectedPillars(prev =>
      prev.includes(pillar) ? prev.filter(p => p !== pillar) : [...prev, pillar]
    );
  };

  const handleGenerate = () => {
    setGenerated(true);
  };

  return (
    <div data-test="spec-wizard" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 max-w-2xl mx-auto">
      {!generated ? (
        <>
          {step === 1 && (
            <div data-test="wizard-step-1">
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Step 1: What's your product idea?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Describe your product mission in one sentence.</p>
              <input
                data-test="wizard-mission-input"
                type="text"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="e.g. Help developers write better specs faster"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />
              <button
                data-test="wizard-next-btn"
                onClick={() => setStep(2)}
                disabled={!mission.trim()}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                Next →
              </button>
            </div>
          )}

          {step === 2 && (
            <div data-test="wizard-step-2">
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Step 2: Pick your product pillars</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Select all that apply.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {PILLARS.map((pillar, i) => (
                  <button
                    key={pillar}
                    data-test={`wizard-pillar-chip-${i}`}
                    onClick={() => togglePillar(pillar)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      selectedPillars.includes(pillar)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pillar}
                  </button>
                ))}
              </div>
              <button
                data-test="wizard-next-btn"
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Next →
              </button>
            </div>
          )}

          {step === 3 && (
            <div data-test="wizard-step-3">
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Step 3: Key interaction</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">What's the most important thing a user does in your product?</p>
              <input
                data-test="wizard-interaction-input"
                type="text"
                value={interaction}
                onChange={(e) => setInteraction(e.target.value)}
                placeholder="e.g. Users create a spec from a one-line idea"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />
              <button
                data-test="wizard-generate-btn"
                onClick={handleGenerate}
                className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors"
              >
                Generate Spec ✨
              </button>
            </div>
          )}
        </>
      ) : (
        <div data-test="wizard-output">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Your Skeleton Spec</h3>
          <pre className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-xs text-slate-700 dark:text-slate-300 overflow-auto leading-relaxed">{`# L1 — Philosophy
mission: "${mission}"
pillars: [${selectedPillars.join(', ') || 'TBD'}]

# L3 — Interactions
key_interaction: "${interaction}"

# L5 — Implementation
stories:
  - id: US-001
    title: ${interaction || 'Core user action'}
    acceptance_criteria:
      - id: AC-001-1
        title: User can complete the action
        given:
          - visit: '/'
        when:
          - click: { selector: '[data-test=primary-cta]' }
        then:
          - shouldExist: { selector: '[data-test=success-state]' }`}</pre>
          <button
            onClick={() => { setStep(1); setMission(''); setSelectedPillars([]); setInteraction(''); setGenerated(false); }}
            className="mt-4 px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
