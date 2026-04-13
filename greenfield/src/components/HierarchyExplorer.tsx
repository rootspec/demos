import React, { useState } from 'react';

const levels = [
  {
    id: 1,
    name: 'L1 — Philosophy',
    tagline: 'The unchanging "why" behind the product.',
    detail: 'Philosophy defines core beliefs, values, and the fundamental problem being solved. It never changes without a major pivot. All other levels must align with L1.',
  },
  {
    id: 2,
    name: 'L2 — Truths',
    tagline: 'Invariant facts that always hold.',
    detail: 'Truths capture constraints and non-negotiables: "users must never lose data," "response time under 200ms." They act as guardrails for every implementation decision.',
  },
  {
    id: 3,
    name: 'L3 — Interactions',
    tagline: 'How users engage with the system.',
    detail: 'Interactions describe the user journey — flows, states, transitions, and error conditions. They form the behavioral contract between product and engineering.',
  },
  {
    id: 4,
    name: 'L4 — Systems',
    tagline: 'Subsystems and their responsibilities.',
    detail: 'Systems define the logical architecture: what each subsystem owns, its interfaces, and how it communicates with others. This is where design decisions live.',
  },
  {
    id: 5,
    name: 'L5 — Implementation',
    tagline: 'Testable user stories and fine-tuning.',
    detail: 'Implementation stories are the atomic unit of work: given/when/then acceptance criteria that drive Cypress tests and guide AI coding agents story by story.',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <section
      style={{
        padding: '5rem 1.5rem',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              margin: '0 0 0.75rem',
              color: 'var(--color-text)',
            }}
          >
            The Five-Level Hierarchy
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '1.1rem',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Every RootSpec project is structured across five levels — from timeless philosophy down to executable tests.
          </p>
        </div>

        <div
          data-test="hierarchy-explorer"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {levels.map(level => {
            const isExpanded = expanded === level.id;
            return (
              <div
                key={level.id}
                style={{
                  border: `1px solid ${isExpanded ? 'rgba(99,102,241,0.5)' : 'var(--color-border)'}`,
                  borderRadius: '0.625rem',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <button
                  data-test={`hierarchy-level-${level.id}`}
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onClick={() => toggle(level.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text)',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.975rem',
                        color: isExpanded ? 'var(--color-accent-bright)' : 'var(--color-text)',
                      }}
                    >
                      {level.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.825rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '0.15rem',
                      }}
                    >
                      {level.tagline}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '1.1rem',
                      color: 'var(--color-text-muted)',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                      marginLeft: '1rem',
                    }}
                  >
                    ▾
                  </span>
                </button>
                {isExpanded && (
                  <div
                    data-test={`hierarchy-level-${level.id}-content`}
                    style={{
                      padding: '0 1.25rem 1.25rem',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '1rem',
                    }}
                  >
                    {level.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
