import { useState } from 'react';

const LEVELS = [
  {
    id: 'L1',
    label: 'L1 — Philosophy',
    description: 'The timeless "why" of your product. Immutable principles that guide all decisions. Defines mission, values, and the core problem being solved.',
  },
  {
    id: 'L2',
    label: 'L2 — Truths',
    description: 'Validated facts about your users, market, and constraints. Evidence-based statements that anchor your specification to reality.',
  },
  {
    id: 'L3',
    label: 'L3 — Interactions',
    description: 'Key user journeys and interaction patterns. Describes what users do, not how the system responds. Written in plain language.',
  },
  {
    id: 'L4',
    label: 'L4 — Systems',
    description: 'Technical systems and their responsibilities. Each system is self-contained with clear boundaries, inputs, and outputs.',
  },
  {
    id: 'L5',
    label: 'L5 — Implementation',
    description: 'User stories with testable acceptance criteria. Fine-tuning tokens, phase scheduling, and the test harness that validates the build.',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <div data-test="hierarchy-explorer" className="space-y-3">
      {LEVELS.map((level) => (
        <div key={level.id} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <button
            data-test={`hierarchy-level-${level.id}`}
            onClick={() => toggle(level.id)}
            className="w-full text-left px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-semibold text-slate-800 dark:text-slate-100"
            aria-expanded={expanded === level.id}
          >
            <span>{level.label}</span>
            <span className="text-slate-400 text-sm">{expanded === level.id ? '▲' : '▼'}</span>
          </button>
          {expanded === level.id && (
            <div
              data-test={`hierarchy-level-${level.id}-content`}
              className="px-6 py-4 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
            >
              {level.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
