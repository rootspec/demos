import { useState } from 'react';

const levels = [
  {
    id: 'L1',
    name: 'Philosophy',
    tagline: 'WHY and WHAT EXPERIENCE',
    content: 'The mission and design pillars. Why does this product exist? What experience should users have? This is the only level that never changes — everything else is derived from it.',
    example: 'Mission: "Help developers ship software that matches their intent, not just their code."',
  },
  {
    id: 'L2',
    name: 'Truths',
    tagline: 'WHAT STRATEGY',
    content: 'Trade-offs, commitments, and success criteria. What will we sacrifice to achieve the mission? What does success look like in measurable terms?',
    example: 'Truth: "We optimise for spec fidelity over development speed. A slower build that matches intent beats a fast build that drifts."',
  },
  {
    id: 'L3',
    name: 'Interactions',
    tagline: 'HOW USERS & PRODUCT INTERACT',
    content: 'User flows, interaction patterns, and system feedback. How do users accomplish their goals? What happens when things go wrong?',
    example: 'Flow: "Visitor enters product idea → selects mission template → picks design pillars → receives skeleton spec."',
  },
  {
    id: 'L4',
    name: 'Systems',
    tagline: 'HOW IT IS BUILT',
    content: 'Architecture decisions, data boundaries, and component structure. Only references higher levels — never drives L1–L3.',
    example: 'System: "All interactions are client-side. No API calls. State held in React component tree."',
  },
  {
    id: 'L5',
    name: 'Implementation',
    tagline: 'TESTABLE USER STORIES',
    content: 'User stories with acceptance criteria in given/when/then form. These become the actual test suite. A story is not done until its test passes.',
    example: 'Story: "Given I visit the site, When I click next with empty input, Then I remain on step 1."',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div data-test="hierarchy-explorer" style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--color-border)', borderRadius: '6px', overflow: 'hidden' }}>
      {levels.map((level, i) => {
        const isOpen = expanded === level.id;
        return (
          <div key={level.id} style={{ borderBottom: i < levels.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <button
              data-test={`level-${level.id}`}
              onClick={() => setExpanded(isOpen ? null : level.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--color-text)',
                transition: 'background 150ms ease-out',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-accent)', minWidth: '2rem', fontWeight: 500 }}>{level.id}</span>
              <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '1rem' }}>{level.name}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 'auto', marginRight: '0.5rem' }}>{level.tagline}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', transition: 'transform 150ms ease-out', transform: isOpen ? 'rotate(90deg)' : 'none' }}>▶</span>
            </button>
            <div
              data-test={`level-${level.id}-content`}
              style={{
                padding: isOpen ? '0 1.25rem 1.25rem 3.5rem' : '0',
                borderTop: isOpen ? '1px solid var(--color-border)' : 'none',
                background: 'var(--color-surface)',
                display: isOpen ? 'block' : 'none',
                overflow: 'hidden',
              }}
            >
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '0.75rem', marginTop: '1rem' }}>{level.content}</p>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--color-text-muted)', background: 'var(--color-bg)', padding: '0.6rem 0.9rem', borderRadius: '3px', borderLeft: '2px solid var(--color-accent)', lineHeight: 1.6 }}>{level.example}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
