import React, { useState } from 'react';

const levels = [
  {
    id: 1,
    name: 'L1 — Philosophy',
    description: 'The "why" of the product. Mission, values, and the principles that never change.',
    example: 'Mission: Help teams ship with confidence by making specs the single source of truth.',
    color: '#8194fa',
  },
  {
    id: 2,
    name: 'L2 — Truths',
    description: 'Core axioms and non-negotiable constraints that govern all decisions.',
    example: 'Truth: Every feature must have a corresponding user story before implementation begins.',
    color: '#a78bfa',
  },
  {
    id: 3,
    name: 'L3 — Interactions',
    description: 'How users move through the product — journeys, flows, and behaviours.',
    example: 'Flow: User visits landing page → reads value prop → tries wizard → visits GitHub.',
    color: '#60a5fa',
  },
  {
    id: 4,
    name: 'L4 — Systems',
    description: 'The architectural systems that implement interactions: content, theme, layout, interactive.',
    example: 'System: THEME_SYSTEM manages dark/light mode preference with persistence.',
    color: '#34d399',
  },
  {
    id: 5,
    name: 'L5 — Implementation',
    description: 'Executable user stories with acceptance criteria, fine-tuning, and conventions.',
    example: 'US-301: Given I visit the site, When I click the theme toggle, Then the theme changes.',
    color: '#fbbf24',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text)' }}>
        The Five-Level Hierarchy
      </h2>
      <p className="text-center mb-12" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
        RootSpec organises every product into five layers — from philosophy to code.
        Click a level to explore it.
      </p>

      <div data-test="hierarchy-explorer" className="space-y-3">
        {levels.map(level => (
          <div key={level.id} className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
            <button
              data-test={`hierarchy-level-${level.id}`}
              tabIndex={0}
              onClick={() => toggle(level.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:opacity-90"
              style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}
            >
              <span className="font-semibold" style={{ color: level.color }}>{level.name}</span>
              <span className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.5 }}>
                {expanded === level.id ? '▲' : '▼'}
              </span>
            </button>

              {/* Always render content in DOM; show/hide via display */}
              <div
                data-test={`hierarchy-level-${level.id}-content`}
                style={{
                  display: expanded === level.id ? 'block' : 'none',
                  background: 'var(--color-bg)',
                  borderTop: '1px solid var(--color-border)',
                }}
                className="px-5 py-4"
              >
                <p className="mb-3 text-sm" style={{ color: 'var(--color-text)', opacity: 0.8 }}>{level.description}</p>
                <div
                  className="rounded-lg p-3 font-mono text-xs"
                  style={{ background: 'var(--color-surface)', color: level.color }}
                >
                  {level.example}
                </div>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}
