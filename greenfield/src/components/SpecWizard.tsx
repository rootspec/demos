import { useState } from 'react';

const missions = [
  'Help users accomplish a core task faster and with less friction',
  'Provide insight and clarity through data visualization',
  'Connect people with shared interests or complementary needs',
  'Automate repetitive processes to free up human creativity',
];

const pillars = [
  'Speed — every interaction should feel instant',
  'Clarity — no user should ever be confused',
  'Trust — data and privacy are non-negotiable',
  'Delight — moments of joy that make users smile',
  'Power — expose advanced capabilities for experts',
  'Simplicity — fewer features, done perfectly',
];

interface WizardState {
  step: number;
  idea: string;
  mission: number | null;
  pillars: number[];
}

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    idea: '',
    mission: null,
    pillars: [],
  });

  const canProceedStep1 = state.idea.trim().length > 0;

  const goNext = () => {
    if (state.step === 1 && !canProceedStep1) return;
    setState((s) => ({ ...s, step: s.step + 1 }));
  };

  const togglePillar = (i: number) => {
    setState((s) => ({
      ...s,
      pillars: s.pillars.includes(i) ? s.pillars.filter((p) => p !== i) : [...s.pillars, i],
    }));
  };

  const selectedMission = state.mission !== null ? missions[state.mission] : '';

  return (
    <div data-test="spec-wizard" className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
      {/* Progress bar */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              state.step === s
                ? 'bg-indigo-600 text-white'
                : state.step > s
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-400'
            }`}
          >
            Step {s}
          </div>
        ))}
      </div>

      <div className="p-6">
        {/* Step 1 */}
        {state.step === 1 && (
          <div data-test="wizard-step-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What are you building?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Describe your product idea in one or two sentences. Be as specific or broad as you like.
            </p>
            <textarea
              data-test="product-idea-input"
              value={state.idea}
              onChange={(e) => setState((s) => ({ ...s, idea: e.target.value }))}
              placeholder="e.g. A task manager that helps developers track work without leaving their IDE"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
            />
            {!canProceedStep1 && (
              <p className="text-xs text-red-500 mt-1">Enter your product idea to continue.</p>
            )}
          </div>
        )}

        {/* Step 2 */}
        {state.step === 2 && (
          <div data-test="wizard-step-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What's the core mission?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose the primary mission that drives "{state.idea.slice(0, 40)}{state.idea.length > 40 ? '...' : ''}".
            </p>
            <div className="space-y-2">
              {missions.map((m, i) => (
                <button
                  key={i}
                  data-test={`mission-option-${i + 1}`}
                  onClick={() => setState((s) => ({ ...s, mission: i }))}
                  className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                    state.mission === i
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {state.step === 3 && (
          <div data-test="wizard-step-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pick your design pillars</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select 2-3 principles that will guide every design decision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pillars.map((p, i) => (
                <button
                  key={i}
                  data-test={`pillar-option-${i + 1}`}
                  onClick={() => togglePillar(i)}
                  className={`text-left p-3 rounded-lg border text-sm transition-colors ${
                    state.pillars.includes(i)
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Output */}
        {state.step === 4 && (
          <div data-test="wizard-output">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Skeleton Spec</h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 font-mono text-xs space-y-2 overflow-auto">
              <p className="text-gray-400"># L1 Philosophy</p>
              <p className="text-white">product: <span className="text-green-400">"{state.idea}"</span></p>
              <p className="text-gray-400 mt-2"># Mission</p>
              <p className="text-white">mission: <span className="text-yellow-400">"{selectedMission}"</span></p>
              {state.pillars.length > 0 && (
                <>
                  <p className="text-gray-400 mt-2"># L1 Design Pillars</p>
                  {state.pillars.map((pi) => (
                    <p key={pi} className="text-white">  - <span className="text-cyan-400">"{pillars[pi]}"</span></p>
                  ))}
                </>
              )}
              <p className="text-gray-400 mt-2"># L5 User Stories</p>
              <p className="text-gray-500">  # → Run /rs-spec to generate full user stories</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Run <span className="font-mono text-indigo-500">/rs-spec</span> in your Claude project to generate the full specification.
            </p>
          </div>
        )}

        {/* Navigation */}
        {state.step < 4 && (
          <div className="mt-6 flex justify-end">
            <button
              data-test="wizard-next"
              onClick={goNext}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              {state.step === 3 ? 'Generate Spec →' : 'Next →'}
            </button>
          </div>
        )}

        {state.step === 4 && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setState({ step: 1, idea: '', mission: null, pillars: [] })}
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              ← Start over
            </button>
            <a
              href="https://github.com/rootspec"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
            >
              Get RootSpec ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
