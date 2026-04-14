import { useState, useEffect } from 'react';

const LEVELS = [
  {
    id: 1,
    code: 'L1',
    name: 'Philosophy',
    tagline: 'WHY and WHAT EXPERIENCE',
    content: 'The mission and design pillars. Why does this product exist? What should users feel? These answers are permanent — they should change only when the product\'s fundamental purpose changes.',
    items: ['Mission statement', 'Design pillars (3–5)', 'Success feeling definition'],
    color: '#0ea5e9',
  },
  {
    id: 2,
    code: 'L2',
    name: 'Truths',
    tagline: 'WHAT strategy',
    content: 'Strategic commitments and trade-offs. What do we sacrifice to be exceptional at something? What are our measurable success criteria? Truths derive from Philosophy.',
    items: ['Trade-off commitments', 'Success metrics', 'Core user promises'],
    color: '#38bdf8',
  },
  {
    id: 3,
    code: 'L3',
    name: 'Interactions',
    tagline: 'HOW users interact',
    content: 'User flows and feedback patterns. How do users accomplish goals? What is the system\'s response contract? Interactions are derived from Truths, not invented independently.',
    items: ['User journeys', 'Feedback patterns', 'Interaction constraints'],
    color: '#7dd3fc',
  },
  {
    id: 4,
    code: 'L4',
    name: 'Systems',
    tagline: 'HOW it\'s built',
    content: 'Architecture, boundaries, and data structures. Technical decisions are constrained by Interactions, never the other way around. Systems answer: what infrastructure makes the Interactions possible?',
    items: ['Architecture decisions', 'System boundaries', 'Data models'],
    color: '#a78bfa',
  },
  {
    id: 5,
    code: 'L5',
    name: 'Implementation',
    tagline: 'Testable stories',
    content: 'User stories with acceptance criteria. Every story traces to a higher level. If you can\'t trace a feature to L1, it shouldn\'t be built. Implementation is the most volatile level — it changes; Philosophy doesn\'t.',
    items: ['User stories', 'Acceptance criteria', 'Fine-tuning parameters'],
    color: '#c4b5fd',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggle = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <div data-test="hierarchy-explorer" data-hydrated={hydrated ? 'true' : undefined} className="max-w-2xl mx-auto space-y-3">
      {LEVELS.map((level) => {
        const isOpen = expanded === level.id;
        return (
          <div
            key={level.id}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid var(--border)`, background: 'var(--card)' }}
          >
            <button
              data-test={`hierarchy-level-${level.id}`}
              onClick={() => toggle(level.id)}
              className="w-full flex items-center gap-4 px-6 py-4 text-left transition-colors"
              style={{
                background: isOpen ? `${level.color}18` : 'transparent',
                minHeight: '44px',
              }}
              aria-expanded={isOpen}
            >
              <span
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                style={{ background: `${level.color}22`, color: level.color, border: `1px solid ${level.color}44` }}
              >
                {level.code}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold" style={{ color: 'var(--fg)' }}>{level.name}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{level.tagline}</div>
              </div>
              <svg
                className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
                style={{
                  color: 'var(--muted)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              data-test={`hierarchy-level-${level.id}-content`}
              className="px-6 pb-5"
              style={{
                display: isOpen ? 'block' : 'none',
                borderTop: `1px solid var(--border)`,
              }}
            >
              <p className="text-sm mt-4 leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                {level.content}
              </p>
              <ul className="space-y-1">
                {level.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg)' }}>
                    <span style={{ color: level.color }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              {level.id > 1 && (
                <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>
                  References: L1{level.id > 2 ? '–L' + (level.id - 1) : ''} only
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
