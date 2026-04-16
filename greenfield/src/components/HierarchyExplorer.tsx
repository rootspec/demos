import { useState } from 'react';

const levels = [
  {
    id: 1,
    label: 'L1',
    title: 'Philosophy',
    color: '#7c3aed',
    detail: 'The foundational beliefs and principles that guide every product decision. Immutable core values that persist across all versions.',
    example: '> "We believe software should reduce cognitive load, not add to it."',
  },
  {
    id: 2,
    label: 'L2',
    title: 'Truths',
    color: '#2563eb',
    detail: 'Absolute product constraints — things that must always be true. These are the non-negotiables derived from philosophy.',
    example: '> "The application will never require account creation to access core functionality."',
  },
  {
    id: 3,
    label: 'L3',
    title: 'Interactions',
    color: '#059669',
    detail: 'How users flow through the product. The canonical journeys and interaction patterns that define the UX.',
    example: '> "JOURNEY: User discovers → tries → adopts without friction."',
  },
  {
    id: 4,
    label: 'L4',
    title: 'Systems',
    color: '#d97706',
    detail: 'Technical and design systems that implement the interactions. Component libraries, data models, and architecture patterns.',
    example: '> "SYSTEM: Content delivery is static-first, hydrated only for interactive components."',
  },
  {
    id: 5,
    label: 'L5',
    title: 'Implementation',
    color: '#dc2626',
    detail: 'Executable user stories with Given/When/Then acceptance criteria. Directly consumed by the rs-impl agent skill.',
    example: '> "Given I visit the homepage, when the page loads, then I see the hero section."',
  },
];

export default function HierarchyExplorer() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  return (
    <section
      id="explore"
      data-test="hierarchy-explorer"
      style={{
        padding: '5rem 1.5rem',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          The five levels
        </p>
        <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          A hierarchy of spec documents
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1.0625rem', lineHeight: 1.65, maxWidth: '580px', marginBottom: '2.5rem' }}>
          Click any level to see what it contains and how it relates to the others.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {levels.map((level) => (
            <div key={level.id}>
              <button
                data-test={`level-card-${level.id}`}
                onClick={() => setActiveLevel(activeLevel === level.id ? null : level.id)}
                style={{
                  width: '100%',
                  background: 'var(--bg)',
                  border: `1px solid ${activeLevel === level.id ? level.color : 'var(--border)'}`,
                  borderRadius: '0.625rem',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.15s',
                  color: 'var(--fg)',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '0.5rem',
                    background: level.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    color: '#fff',
                  }}
                >
                  {level.label}
                </span>
                <span style={{ fontWeight: 600, flexGrow: 1 }}>{level.title}</span>
                <span style={{ color: 'var(--muted)', fontSize: '1.25rem', lineHeight: 1 }}>
                  {activeLevel === level.id ? '−' : '+'}
                </span>
              </button>

              {activeLevel === level.id && (
                <div
                  data-test={`level-detail-${level.id}`}
                  style={{
                    background: 'var(--bg)',
                    border: `1px solid ${level.color}`,
                    borderTop: 'none',
                    borderRadius: '0 0 0.625rem 0.625rem',
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.875rem' }}>{level.detail}</p>
                  <pre style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.375rem',
                    padding: '0.875rem 1rem',
                    fontSize: '0.875rem',
                    color: 'var(--accent-light)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                    fontFamily: 'ui-monospace, monospace',
                  }}>
                    {level.example}
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
