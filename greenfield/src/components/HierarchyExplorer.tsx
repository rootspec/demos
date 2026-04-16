import { useState } from 'react';

const LEVELS = [
  {
    id: 'L1',
    label: 'L1: Philosophy',
    description: 'Core axioms and beliefs about how software should be built.',
    example: `# PHILOSOPHY\n\nWe believe software starts with clear intentions,\nnot clever code. Spec first. Always.`,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
  },
  {
    id: 'L2',
    label: 'L2: Truths',
    description: 'Non-negotiable product truths — what must always be true.',
    example: `# TRUTHS\n\n- Every feature must trace to a spec\n- No story ships without acceptance criteria\n- Specs live in the repository`,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
  },
  {
    id: 'L3',
    label: 'L3: Interactions',
    description: 'How users and systems interact with the product.',
    example: `# INTERACTIONS\n\nUser → visits homepage → sees hero with tagline\nUser → clicks theme toggle → page switches mode`,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/5',
  },
  {
    id: 'L4',
    label: 'L4: Systems',
    description: 'Technical systems: layout, content, theme, interactive, presentation.',
    example: `# THEME_SYSTEM\n\nSupports dark/light modes via CSS class.\nDefault: dark. Toggle stored in localStorage.`,
    color: 'text-green-400',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/5',
  },
  {
    id: 'L5',
    label: 'L5: Implementation',
    description: 'User stories with machine-readable acceptance criteria and test steps.',
    example: `id: US-101\ntitle: Meta banner visible\nacceptance_criteria:\n  - id: AC-101-1\n    given:\n      - visit: '/'\n    then:\n      - shouldExist:\n          selector: '[data-test=meta-banner]'`,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    bgColor: 'bg-yellow-500/5',
  },
];

export default function HierarchyExplorer() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      data-test="hierarchy-explorer"
      id="hierarchy"
      className="py-24 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The RootSpec Hierarchy
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Five levels from philosophy to implementation. Click a level to see what lives there.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {LEVELS.map((level) => {
            const isOpen = openId === level.id;
            return (
              <div
                key={level.id}
                data-test="hierarchy-level"
                className={`rounded-xl border ${level.borderColor} ${level.bgColor} overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : level.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono font-bold text-sm ${level.color}`}>{level.id}</span>
                    <span className="font-semibold">{level.label}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <div
                  data-test="hierarchy-level-content"
                  className={`px-6 pb-6 ${isOpen ? '' : 'hidden'}`}
                >
                  <p className="text-[var(--text-secondary)] mb-4">{level.description}</p>
                  <pre className="bg-[var(--bg-primary)] rounded-lg p-4 text-sm font-mono text-[var(--text-secondary)] overflow-x-auto whitespace-pre-wrap">
                    {level.example}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
