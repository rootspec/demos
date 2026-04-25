import { useState } from 'react';

const LEVELS = [
  {
    id: 1,
    label: 'L1: Philosophy',
    content: 'The foundational "why" — mission, vision, and the core problem the product solves. Philosophical alignment before any technical decisions.',
  },
  {
    id: 2,
    label: 'L2: Truths',
    content: 'Non-negotiable constraints that all decisions must respect: performance budgets, accessibility requirements, privacy rules, security policies.',
  },
  {
    id: 3,
    label: 'L3: Interactions',
    content: 'The complete user interaction model: journeys, flows, error states, and edge cases. The behavioral contract between product and user.',
  },
  {
    id: 4,
    label: 'L4: Systems',
    content: 'Technical and content architecture: component systems, data models, API contracts, theme systems, and layout rules.',
  },
  {
    id: 5,
    label: 'L5: Implementation',
    content: 'User stories with acceptance criteria in given/when/then format. Directly executable as Cypress tests. The spec closes the loop.',
  },
];

export default function HierarchyExplorer() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  return (
    <div data-test="hierarchy-explorer" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {LEVELS.map((level) => (
        <div key={level.id} style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <button
            data-test={`level-${level.id}-trigger`}
            onClick={() => toggle(level.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1.25rem',
              background: open === level.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: open === level.id ? 'white' : 'var(--color-text)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
            aria-expanded={open === level.id}
          >
            <span>{level.label}</span>
            <span style={{ fontSize: '1.1rem' }}>{open === level.id ? '−' : '+'}</span>
          </button>
          {open === level.id && (
            <div
              data-test={`level-${level.id}-content`}
              style={{
                padding: '1rem 1.25rem',
                background: 'var(--color-bg)',
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              {level.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
