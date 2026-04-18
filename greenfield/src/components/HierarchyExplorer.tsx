import { useState } from 'react';

const LEVELS = [
  {
    id: 1,
    name: 'Philosophy',
    icon: '🌱',
    tagline: 'Why does this product exist? What mission drives it?',
    example: `# L1: Philosophy\n## Mission\nTo give developers a rigorous, AI-compatible specification methodology that eliminates ambiguity between intent and implementation.\n\n## Design Pillars\n- Hierarchical clarity\n- Testable outcomes\n- AI-first authoring`,
  },
  {
    id: 2,
    name: 'Truths',
    icon: '🔭',
    tagline: 'What are the non-negotiable constraints and invariants?',
    example: `# L2: Truths\n## System Invariants\n- Every spec must have at least one user story per system\n- Acceptance criteria must be expressed as given/when/then\n- The spec version must match the implementation version`,
  },
  {
    id: 3,
    name: 'Interactions',
    icon: '🔄',
    tagline: 'What are the core user flows and data transformations?',
    example: `# L3: Interactions\n## Core Flow: Spec Wizard\n1. User enters product idea\n2. User selects mission template\n3. User selects design pillars\n4. User describes key interaction\n5. System generates spec skeleton`,
  },
  {
    id: 4,
    name: 'Systems',
    icon: '⚙️',
    tagline: 'What subsystems own which responsibilities?',
    example: `# L4: Systems\n## Content System\n- Owns all human-readable copy\n- Reads version from .rootspec.json at build time\n## Theme System\n- Manages dark/light mode state\n- Persists preference to localStorage`,
  },
  {
    id: 5,
    name: 'Implementation',
    icon: '🛠️',
    tagline: 'User stories, fine-tuning parameters, and acceptance criteria.',
    example: `# L5: Implementation\n## User Story: US-101\nAs a visitor, I want to read what RootSpec is on arrival.\n\n### AC-101-1\nGiven: I visit /\nWhen: page loads\nThen: hero-heading exists, hero-subheading exists`,
  },
];

export default function HierarchyExplorer() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  function handleClick(id: number) {
    setActiveLevel(prev => (prev === id ? null : id));
  }

  return (
    <section
      data-test="hierarchy-explorer"
      style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', margin: '0 0 1rem' }}>
          The RootSpec Hierarchy
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 0 2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Five levels of specification, each constraining the levels below. Click a level to see an example.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {LEVELS.map(level => {
            const isActive = activeLevel === level.id;
            return (
              <div key={level.id}>
                <button
                  data-test={`level-${level.id}`}
                  aria-expanded={isActive}
                  onClick={() => handleClick(level.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    backgroundColor: isActive ? 'var(--accent)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '0.625rem',
                    cursor: 'pointer',
                    color: isActive ? 'white' : 'var(--text-primary)',
                    textAlign: 'left',
                    transition: 'all 250ms ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{level.icon}</span>
                  <span style={{ fontWeight: 700, minWidth: '1.5rem', opacity: 0.6, fontSize: '0.875rem' }}>L{level.id}</span>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{level.name}</span>
                  <span style={{ fontSize: '0.875rem', opacity: 0.75, flex: 1, display: 'none' }} className="tablet-show">{level.tagline}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.6 }}>{isActive ? '▲' : '▼'}</span>
                </button>
                {isActive && (
                  <div
                    data-test={`level-${level.id}-content`}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderTop: 'none',
                      borderRadius: '0 0 0.625rem 0.625rem',
                      padding: '1.25rem',
                    }}
                  >
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0 0 1rem', fontStyle: 'italic' }}>
                      {level.tagline}
                    </p>
                    <pre style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                      margin: 0,
                    }}>
                      {level.example}
                    </pre>
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
