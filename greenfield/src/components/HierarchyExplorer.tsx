import { useState, useEffect } from 'react';

const levels = [
  {
    id: 1,
    label: 'L1',
    name: 'Philosophy',
    tagline: 'WHY and WHAT EXPERIENCE',
    content: [
      'Mission statement and core purpose',
      'Design pillars — what should users feel?',
      'Competitors and table stakes',
      'Inviolable principles',
    ],
    canReference: [],
  },
  {
    id: 2,
    label: 'L2',
    name: 'Truths',
    tagline: 'WHAT strategy',
    content: [
      'Architectural commitments',
      'Trade-offs made explicit',
      'Success criteria',
      'Constraints that flow from philosophy',
    ],
    canReference: ['L1'],
  },
  {
    id: 3,
    label: 'L3',
    name: 'Interactions',
    tagline: 'HOW users and product interact',
    content: [
      'User journeys and flows',
      'Interaction patterns',
      'Feedback and error states',
      'Edge cases and exceptions',
    ],
    canReference: ['L1', 'L2'],
  },
  {
    id: 4,
    label: 'L4',
    name: 'Systems',
    tagline: 'HOW it\'s built',
    content: [
      'Architecture and component boundaries',
      'Data ownership and flow',
      'Integration points',
      'System constraints',
    ],
    canReference: ['L1', 'L2', 'L3', 'sibling L4'],
  },
  {
    id: 5,
    label: 'L5',
    name: 'Implementation',
    tagline: 'Testable stories and tuning',
    content: [
      'User stories with acceptance criteria',
      'Fine-tuning parameters',
      'The story is the test',
      'Agents make stories pass',
    ],
    canReference: ['L1', 'L2', 'L3', 'L4'],
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div
      data-test="hierarchy-explorer"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {levels.map((level) => {
        const isExpanded = expanded.has(level.id);
        return (
          <div key={level.id}>
            <button
              data-test={`hierarchy-level-${level.id}`}
              onClick={() => toggle(level.id)}
              aria-expanded={isExpanded}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                textAlign: 'left',
                backgroundColor: isExpanded ? 'var(--color-bg-surface)' : 'transparent',
                transition: 'background-color 150ms ease-out',
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.75rem',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  minWidth: '2rem',
                }}
              >
                {level.label}
              </span>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  flex: 1,
                }}
              >
                {level.name}
                <span
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'var(--color-text-secondary)',
                    marginLeft: '0.5rem',
                  }}
                >
                  — {level.tagline}
                </span>
              </span>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                  transition: 'transform 150ms ease-out',
                  display: 'inline-block',
                }}
              >
                ›
              </span>
            </button>

            {isExpanded && (
              <div
                data-test={`hierarchy-level-${level.id}-content`}
                style={{
                  padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                  backgroundColor: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {level.content.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.65,
                        marginBottom: '0.375rem',
                        paddingLeft: '1rem',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--color-accent)',
                        }}
                      >
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                {level.canReference.length > 0 && (
                  <p
                    style={{
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-secondary)',
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    Can reference: {level.canReference.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
