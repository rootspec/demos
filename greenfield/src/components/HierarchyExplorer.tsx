import { useState } from 'react';

const LEVELS = [
  {
    id: 'L1',
    name: 'Philosophy',
    icon: '◆',
    tagline: 'WHY and WHAT EXPERIENCE',
    key_question: 'Why does this product exist? What should users feel?',
    can_reference: ['External'],
    example: `## Mission
RootSpec must exist because generating software from intent is now
tractable — but validating that the result satisfies the original
intent is not.

## Design Pillars
1. Validated Intent — users feel confident what ships matches intent
2. Philosophy First — features have reasons, trade-offs have rationale
3. Approachable Rigor — demanding without being punishing
4. Honest Progress — real progress, not compliance theater`,
  },
  {
    id: 'L2',
    name: 'Truths',
    icon: '◈',
    tagline: 'WHAT strategy',
    key_question: 'What are the stable commitments and trade-offs?',
    can_reference: ['L1', 'External'],
    example: `## Truth: The spec is the source of truth, not the code
The specification is not a description of the code — the code is an
artifact produced by the spec. When spec and implementation diverge,
the specification wins.

## Truth: Validation gates are the primary output
A spec that cannot validate an implementation is a PRD.
A spec that can validate an implementation is a build target.`,
  },
  {
    id: 'L3',
    name: 'Interactions',
    icon: '◇',
    tagline: 'HOW users interact',
    key_question: 'How do users and the product interact?',
    can_reference: ['L1', 'L2', 'External'],
    example: `## Flow: Spec Creation
1. User provides seed or product description
2. AI interviews user with targeted questions (surfacing "why" first)
3. User reviews and refines responses
4. AI generates structured spec across all five levels
5. User validates spec — spec status becomes "valid"

## Pattern: Progressive Disclosure
Higher levels are authored before lower levels.
Lower levels cannot be created until their parent levels are validated.`,
  },
  {
    id: 'L4',
    name: 'Systems',
    icon: '○',
    tagline: 'HOW it\'s built',
    key_question: 'What systems and boundaries make this work?',
    can_reference: ['L1', 'L2', 'L3', 'Sibling L4', 'External'],
    example: `## Content System
Owns all static prose, structured copy, and section organization.
Stateless — all content is static.
Does NOT own: interactive components, page layout, visual tokens.

## Theme System
Owns visual tokens, typography, and light/dark mode state.
Exposes CSS custom properties consumed by all systems.
Manages: current theme (light/dark), system preference detected.`,
  },
  {
    id: 'L5',
    name: 'Implementation',
    icon: '·',
    tagline: 'Testable user stories',
    key_question: 'What specific, testable behaviors must exist?',
    can_reference: ['L1', 'L2', 'L3', 'L4', 'External'],
    example: `## US-101: Visitor sees the meta banner
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible above the fold
    given:
      - visit: '/demos/greenfield/'
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'`,
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(id);
    }
    if (e.key === 'Escape' && expanded === id) {
      setExpanded(null);
    }
  };

  return (
    <div data-test="hierarchy-explorer" style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {LEVELS.map((level) => {
          const isExpanded = expanded === level.id;
          return (
            <div
              key={level.id}
              data-test="hierarchy-level"
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              onClick={() => handleToggle(level.id)}
              onKeyDown={(e) => handleKeyDown(e, level.id)}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                outline: 'none',
                transition: 'border-color 150ms ease-out',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: isExpanded ? 'var(--color-surface)' : 'var(--color-bg)',
                  transition: 'background-color 150ms ease-out',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    backgroundColor: 'var(--color-code-bg)',
                    color: 'var(--color-accent)',
                    border: '1px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                >
                  {level.id}
                </span>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{level.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                    <strong style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--color-text)' }}>
                      {level.name}
                    </strong>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {level.tagline}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {level.key_question}
                  </div>
                </div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '12px', flexShrink: 0 }}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>

              {isExpanded && (
                <div
                  data-test="hierarchy-level-content"
                  style={{
                    padding: '16px',
                    borderTop: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <div style={{ marginBottom: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      Can reference:
                    </span>
                    {level.can_reference.map(ref => (
                      <span
                        key={ref}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '11px',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          backgroundColor: 'var(--color-code-bg)',
                          color: 'var(--color-text-muted)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                  <pre
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      lineHeight: '1.6',
                      color: 'var(--color-text)',
                      backgroundColor: 'var(--color-code-bg)',
                      padding: '12px',
                      borderRadius: '4px',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                      margin: 0,
                    }}
                  >
                    {level.example}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
