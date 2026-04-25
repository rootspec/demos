import { useState } from 'react';

const LEVELS = [
  {
    num: 1,
    label: 'Philosophy',
    subtitle: 'WHY and WHAT EXPERIENCE',
    purpose: 'Defines mission, design pillars, and the core experience promise. All other levels exist to serve this.',
    example: 'Mission: "Help developers ship what they intended, not what they had time to build."\nPillars: Clarity, Traceability, Minimal ceremony',
    rule: 'References nothing. Is the root of all derivation.',
  },
  {
    num: 2,
    label: 'Truths',
    subtitle: 'WHAT strategy',
    purpose: 'Encodes trade-offs, commitments, and success criteria derived from the philosophy.',
    example: 'Truth: "We do not ship features whose test coverage traces back to no pillar."\nCommitment: "Spec files are the source of truth, not code comments."',
    rule: 'May only reference L1 (Philosophy).',
  },
  {
    num: 3,
    label: 'Interactions',
    subtitle: 'HOW users and product interact',
    purpose: 'Describes user flows, interaction patterns, and feedback loops that honor the truths.',
    example: 'Flow: "Visitor reads hero, clicks Spec Your Idea, enters a product description, receives a skeleton spec."\nPattern: "All wizard steps validate before advancing."',
    rule: 'May only reference L1–L2.',
  },
  {
    num: 4,
    label: 'Systems',
    subtitle: 'HOW it\'s built',
    purpose: 'Defines architecture, component boundaries, data ownership, and system interactions.',
    example: 'System: "INTERACTIVE_SYSTEM owns HierarchyExplorer and SpecWizard. No network calls."\nBoundary: "CONTENT_SYSTEM provides text. THEME_SYSTEM owns the toggle."',
    rule: 'May only reference L1–L3.',
  },
  {
    num: 5,
    label: 'Implementation',
    subtitle: 'Testable stories and tuning',
    purpose: 'User stories with acceptance criteria, fine-tuning parameters, and constraints derived from every level above.',
    example: 'US-004: "Visitor expands a hierarchy level to see its purpose."\nAC-004-2: "Clicking a level reveals expanded content."',
    rule: 'May only reference L1–L4.',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  function toggle(num: number) {
    setExpanded(prev => (prev === num ? null : num));
  }

  return (
    <div data-test="hierarchy-explorer" style={{ maxWidth: '780px', margin: '0 auto' }}>
      {LEVELS.map((level) => {
        const isExpanded = expanded === level.num;
        return (
          <div
            key={level.num}
            style={{
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <button
              data-test={`hierarchy-level-${level.num}`}
              onClick={() => toggle(level.num)}
              aria-expanded={isExpanded}
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--color-text-primary)',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  width: '1.75rem',
                  height: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '3px',
                  background: isExpanded ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: isExpanded ? '#fff' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  flexShrink: 0,
                  transition: 'background 200ms ease-out, color 200ms ease-out',
                }}
              >
                L{level.num}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{level.label}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                    {level.subtitle}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                  transition: 'transform 200ms ease-out',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                ▶
              </span>
            </button>

            {isExpanded && (
              <div
                data-test={`hierarchy-level-${level.num}-expanded`}
                style={{
                  paddingBottom: '1.25rem',
                  paddingLeft: '2.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '0.875rem',
                  }}
                >
                  {level.purpose}
                </p>
                <pre
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    padding: '0.75rem 1rem',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {level.example}
                </pre>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-secondary)',
                    fontStyle: 'italic',
                  }}
                >
                  {level.rule}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
