import { useState } from 'react';

const levels = [
  {
    id: 1,
    label: 'L1: Philosophy',
    subtitle: 'WHY · Mission · Design Pillars',
    color: 'border-blue-400 dark:border-blue-500',
    headerBg: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    content: {
      heading: 'Philosophy — The foundation',
      description: 'Defines WHY the product exists and WHAT experience it creates. All other levels derive from this.',
      example: `mission: "Help readers build lasting habits through frictionless reflection"

design_pillars:
  - Friction-free: Every interaction costs < 2 taps
  - Reflective: Prompt users to think, not just log
  - Personal: Data stays private, no social pressure

reference_policy: Cannot reference lower levels`,
    },
  },
  {
    id: 2,
    label: 'L2: Truths',
    subtitle: 'WHAT · Trade-offs · Commitments',
    color: 'border-violet-400 dark:border-violet-500',
    headerBg: 'bg-violet-50 dark:bg-violet-900/30',
    textColor: 'text-violet-700 dark:text-violet-300',
    content: {
      heading: 'Truths — Strategic constraints',
      description: 'Defines WHAT the product will and won\'t do. Trade-offs are explicit and tied to philosophy.',
      example: `success_criteria:
  - 60% of users log within 48h of finishing a book

trade_offs:
  - No social features in v1 (violates "Personal" pillar)
  - Depth over breadth: one great logging flow

references: L1 design pillars`,
    },
  },
  {
    id: 3,
    label: 'L3: Interactions',
    subtitle: 'HOW users · UX Patterns',
    color: 'border-indigo-400 dark:border-indigo-500',
    headerBg: 'bg-indigo-50 dark:bg-indigo-900/30',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    content: {
      heading: 'Interactions — User flows',
      description: 'Defines HOW users interact with the product. Flows, patterns, feedback loops.',
      example: `flows:
  log_book:
    trigger: User taps "Log it"
    steps:
      1. Show reflection prompt (< 500ms)
      2. User writes or skips
      3. Book added to library
    feedback: Celebration animation

references: L1 pillars, L2 trade-offs`,
    },
  },
  {
    id: 4,
    label: 'L4: Systems',
    subtitle: 'HOW it\'s built · Architecture',
    color: 'border-sky-400 dark:border-sky-500',
    headerBg: 'bg-sky-50 dark:bg-sky-900/30',
    textColor: 'text-sky-700 dark:text-sky-300',
    content: {
      heading: 'Systems — Technical boundaries',
      description: 'Defines HOW it\'s built. Architecture decisions, data models, system boundaries.',
      example: `stack: Next.js + Supabase
auth: Email magic link (no passwords)

data_model:
  book_log:
    fields: [isbn, title, finished_at, reflection]
    storage: user-scoped, encrypted

references: L1-L3`,
    },
  },
  {
    id: 5,
    label: 'L5: Implementation',
    subtitle: 'User stories · Tests · Code',
    color: 'border-teal-400 dark:border-teal-500',
    headerBg: 'bg-teal-50 dark:bg-teal-900/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    content: {
      heading: 'Implementation — Testable stories',
      description: 'Concrete user stories with acceptance criteria. Every story traces to a design pillar.',
      example: `id: US-047
title: Log a completed book

acceptance_criteria:
  - id: AC-047-1
    given: I finish a book
    when: I tap "Log it"
    then: I see a reflection prompt in < 500ms
    traces_to: friction-free pillar

references: L1-L4`,
    },
  },
];

export default function HierarchyExplorer() {
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const handleLevelClick = (id: number) => {
    setOpenLevel(prev => prev === id ? null : id);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            The five-level hierarchy
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Click a level to see what it contains. Each level can only reference higher levels — never lower.
          </p>
        </div>

        <div
          data-test="hierarchy-explorer"
          className="space-y-3"
        >
          {levels.map((level) => (
            <div
              key={level.id}
              className={`rounded-xl border-2 ${level.color} overflow-hidden transition-all duration-200`}
            >
              <button
                data-test={`hierarchy-level-${level.id}`}
                onClick={() => handleLevelClick(level.id)}
                className={`w-full flex items-center justify-between px-6 py-4 ${level.headerBg} text-left transition-colors hover:opacity-90`}
                aria-expanded={openLevel === level.id}
              >
                <div>
                  <span className={`font-semibold font-mono ${level.textColor}`}>{level.label}</span>
                  <span className="ml-3 text-sm text-slate-500 dark:text-slate-400">{level.subtitle}</span>
                </div>
                <svg
                  className={`w-5 h-5 ${level.textColor} transition-transform duration-200 ${openLevel === level.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {openLevel === level.id && (
                <div
                  data-test={`hierarchy-level-${level.id}-content`}
                  className="px-6 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {level.content.heading}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {level.content.description}
                  </p>
                  <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-slate-700 dark:text-slate-300 leading-relaxed">
                    {level.content.example}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
