import { useState } from 'react';

const LEVELS = [
  {
    id: 1,
    label: 'L1 — Philosophy',
    tagline: 'Why this product exists',
    example: `# L1: Philosophy\n\nA task manager for remote teams exists to eliminate\ncoordination overhead and give distributed teams a\nsingle source of truth for work in progress.`,
  },
  {
    id: 2,
    label: 'L2 — Truths',
    tagline: 'Immutable product constraints',
    example: `# L2: Truths\n\n- Tasks have exactly one owner at all times\n- Deadlines are UTC timestamps, never fuzzy\n- Deleted tasks are soft-deleted, never purged\n- All state changes are audit-logged`,
  },
  {
    id: 3,
    label: 'L3 — Interactions',
    tagline: 'What users can do',
    example: `# L3: Interactions\n\n- User creates a task with title and due date\n- User assigns a task to a team member\n- User marks a task complete\n- User filters tasks by assignee or status`,
  },
  {
    id: 4,
    label: 'L4 — Systems',
    tagline: 'How the product is organized',
    example: `# L4: Systems\n\nTASK_SYSTEM: CRUD + assignment + status\nNOTIF_SYSTEM: Email + in-app alerts\nAUTH_SYSTEM: JWT + role-based access\nSEARCH_SYSTEM: Full-text task search`,
  },
  {
    id: 5,
    label: 'L5 — User Stories',
    tagline: 'Testable acceptance criteria',
    example: `id: US-101\ntitle: User creates a task\nacceptance_criteria:\n  - id: AC-101-1\n    given:\n      - visit: '/tasks'\n    when:\n      - fill: { selector: '[data-test=title]', value: 'Fix login bug' }\n      - click: { selector: '[data-test=save]' }\n    then:\n      - shouldExist: { selector: '[data-test=task-item]' }`,
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <div
      data-test="hierarchy-explorer"
      className="w-full max-w-3xl mx-auto flex flex-col gap-3"
    >
      {LEVELS.map(level => {
        const isExpanded = expanded === level.id;
        return (
          <div key={level.id} className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <button
              data-test={`hierarchy-level-${level.id}`}
              aria-expanded={isExpanded}
              onClick={() => handleClick(level.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between transition-colors focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: isExpanded ? 'var(--accent)' : 'var(--surface)',
                color: isExpanded ? '#ffffff' : 'var(--text)',
              }}
            >
              <span tabIndex={0} className="font-bold">{level.label}</span>
              <span className="ml-3 text-sm opacity-70">{level.tagline}</span>
              <span className="text-lg font-bold ml-auto">{isExpanded ? '−' : '+'}</span>
            </button>
            {isExpanded && (
              <div
                data-test={`hierarchy-level-${level.id}-content`}
                className="px-5 py-4"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                <pre
                  className="text-sm font-mono whitespace-pre-wrap rounded-lg p-4 overflow-x-auto"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text)' }}
                >
                  {level.example}
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
