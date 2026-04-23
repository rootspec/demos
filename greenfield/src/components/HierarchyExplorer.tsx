import { useState, useEffect } from 'react';

interface Level {
  id: number;
  label: string;
  title: string;
  description: string;
  example: string;
  color: string;
}

const LEVELS: Level[] = [
  {
    id: 1,
    label: 'L1',
    title: 'Philosophy',
    description: 'The unchanging "why" behind your product. Defines the first principles that guide every decision.',
    example: '"We believe software should be built from intent, not assumption."',
    color: '#6d28d9',
  },
  {
    id: 2,
    label: 'L2',
    title: 'Truths',
    description: 'Specific beliefs about your users, market, and domain. These are facts your team aligns on.',
    example: '"Our users are senior engineers who value precision over hand-holding."',
    color: '#7c3aed',
  },
  {
    id: 3,
    label: 'L3',
    title: 'Interactions',
    description: 'The core user journeys — the moments that define the product experience.',
    example: '"A developer can specify an entire feature in one /rs-spec session."',
    color: '#8b5cf6',
  },
  {
    id: 4,
    label: 'L4',
    title: 'Systems',
    description: 'The technical and design systems that enable the interactions. How things are structured.',
    example: '"The CONTENT_SYSTEM manages all text, copy, and informational elements."',
    color: '#a78bfa',
  },
  {
    id: 5,
    label: 'L5',
    title: 'User Stories',
    description: 'Concrete acceptance criteria with given/when/then scenarios that drive automated tests.',
    example: '"Given I visit the site, when the page loads, then I see the meta-banner."',
    color: '#c4b5fd',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const toggle = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div data-test="hierarchy-explorer" data-hydrated={hydrated ? "true" : undefined} className="flex flex-col gap-3">
      {LEVELS.map((level) => {
        const isExpanded = expanded === level.id;
        return (
          <div key={level.id} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${level.color}33` }}>
            <button
              data-test={`hierarchy-level-${level.id}`}
              aria-expanded={isExpanded}
              onClick={() => toggle(level.id)}
              className="w-full text-left px-6 py-4 flex items-center gap-4 transition-colors"
              style={{
                backgroundColor: isExpanded ? `${level.color}18` : 'var(--color-card-bg)',
                cursor: 'pointer',
              }}
            >
              <span
                className="text-xs font-mono font-bold px-2 py-1 rounded shrink-0"
                style={{ backgroundColor: level.color, color: 'white' }}
              >
                {level.label}
              </span>
              <span className="font-semibold text-lg flex-1" style={{ color: 'var(--color-text)' }}>
                {level.title}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  color: 'var(--color-text-muted)',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isExpanded && (
              <div
                data-test={`hierarchy-level-${level.id}-content`}
                className="px-6 py-5"
                style={{ backgroundColor: `${level.color}10`, borderTop: `1px solid ${level.color}33` }}
              >
                <p className="mb-4" style={{ color: 'var(--color-text)' }}>
                  {level.description}
                </p>
                <blockquote
                  className="text-sm italic px-4 py-3 rounded"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderLeft: `3px solid ${level.color}`,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {level.example}
                </blockquote>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
