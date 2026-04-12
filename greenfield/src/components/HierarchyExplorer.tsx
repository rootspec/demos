import { useState } from 'react';

const LEVELS = [
  {
    id: 'L1',
    name: 'L1 — Philosophy',
    subtitle: 'Why this product exists',
    description: 'The foundational layer. Defines the product\'s core identity, mission, and design pillars. Everything else references upward to this layer — it cannot contradict itself.',
    example: 'Mission: "Make spec-first development accessible to every team. Design Pillar: Accessible Depth — complexity available but never forced."',
  },
  {
    id: 'L2',
    name: 'L2 — Stable Truths',
    subtitle: 'Facts that don\'t change with features',
    description: 'Decisions that remain stable across the entire product lifecycle. Architecture choices, constraint acceptance, and definition of success. Trade-offs are explicitly recorded here.',
    example: '"Static generation over runtime complexity. All interactivity is client-side only, with no server state, no API calls, and no authentication."',
  },
  {
    id: 'L3',
    name: 'L3 — Interactions',
    subtitle: 'What users can do',
    description: 'Visitor journeys and interaction flows. Describes how a user moves through the product — what triggers what, what states exist, what the system does in response.',
    example: 'First Visit Journey: meta-banner → hero → explore hierarchy → try wizard → view CTA → check footer.',
  },
  {
    id: 'L4',
    name: 'L4 — Systems',
    subtitle: 'How features are organized',
    description: 'Bounded systems that own specific behavior and data. Each system has clear responsibilities, owned data, and defined interactions with other systems. No overlapping ownership.',
    example: 'THEME_SYSTEM owns: data-theme attribute, localStorage key. Interacts with: LAYOUT_SYSTEM (reads CSS tokens). Boundaries: no component-level theme overrides.',
  },
  {
    id: 'L5',
    name: 'L5 — Implementation',
    subtitle: 'Specific stories and criteria',
    description: 'User stories with testable acceptance criteria. Each story maps to an L4 system and an L3 journey. Acceptance criteria use DSL steps that generate executable Cypress tests.',
    example: 'US-201 AC-201-1: Given I visit /, Then [data-test=theme-toggle] exists and is visible above the fold.',
  },
];

export default function HierarchyExplorer() {
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  function handleLevelClick(id: string) {
    setExpandedLevel(prev => prev === id ? null : id);
  }

  function handleKeyDown(e: React.KeyboardEvent, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLevelClick(id);
    }
  }

  return (
    <div
      data-test="hierarchy-explorer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {LEVELS.map((level, index) => {
        const isExpanded = expandedLevel === level.id;
        return (
          <button
            key={level.id}
            data-test="hierarchy-explorer-level"
            onClick={() => handleLevelClick(level.id)}
            onKeyDown={(e) => handleKeyDown(e, level.id)}
            aria-expanded={isExpanded}
            style={{
              background: 'var(--color-surface)',
              border: `2px solid ${isExpanded ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: '8px',
              padding: '16px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxShadow: isExpanded ? '0 0 0 3px rgba(79,70,229,0.15)' : 'none',
              width: '100%',
              textAlign: 'left',
              fontFamily: 'inherit',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                  {level.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {level.subtitle}
                </div>
              </div>
              <div style={{
                color: 'var(--color-primary)',
                fontSize: '1.1rem',
                transition: 'transform 0.2s',
                transform: isExpanded ? 'rotate(180deg)' : 'none',
                flexShrink: 0,
                marginLeft: '12px',
              }}>
                ▾
              </div>
            </div>

            <div
                data-test="hierarchy-explorer-level-content"
                style={{
                  marginTop: '14px',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--color-border)',
                  display: isExpanded ? 'block' : 'none',
                }}
              >
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '10px', lineHeight: 1.6 }}>
                  {level.description}
                </p>
                <div style={{
                  background: 'var(--color-code-bg)',
                  color: 'var(--color-code-text)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  lineHeight: 1.5,
                }}>
                  {level.example}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                  References: upward only → {index > 0 ? LEVELS.slice(0, index).map(l => l.id).join(', ') : 'none (top level)'}
                </div>
              </div>
          </button>
        );
      })}
    </div>
  );
}
