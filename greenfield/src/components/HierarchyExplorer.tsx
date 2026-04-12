import { useState, useEffect, useRef } from 'react';

const LEVELS = [
  {
    num: 1,
    name: 'L1: Philosophy',
    description: 'Foundational beliefs about what great software requires.',
    content: 'The Philosophy level captures your product\'s core beliefs — why it exists, what values guide it, and what tradeoffs you\'re willing to make. Example: "Clarity over cleverness. Every interface decision should reduce cognitive load."',
  },
  {
    num: 2,
    name: 'L2: Truths',
    description: 'Observable facts about your users and context.',
    content: 'Truths are verifiable facts about your users, market, and constraints. Example: "85% of our users access the tool from a mobile device. Latency above 3s causes abandonment."',
  },
  {
    num: 3,
    name: 'L3: Interactions',
    description: 'The flows and journeys users take through your product.',
    content: 'Interactions describe how users move through your product. Example: "User visits dashboard → sees KPIs → clicks drill-down → exports report. The whole journey takes under 60 seconds."',
  },
  {
    num: 4,
    name: 'L4: Systems',
    description: 'Technical subsystems that power the interactions.',
    content: 'Systems define technical boundaries and responsibilities. Example: "AUTH_SYSTEM owns session tokens and refresh logic. It never stores passwords — that is delegated to the identity provider."',
  },
  {
    num: 5,
    name: 'L5: Implementation',
    description: 'Fine-tuning values, user stories, and acceptance criteria.',
    content: 'Implementation is where abstract spec becomes testable code. Example: "US-101 AC-101-1: Given I visit /dashboard, when the page loads, then I should see [data-test=metric-card] with revenue data."',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-hydrated', 'true');
    }
  }, []);

  const toggle = (num: number) => {
    setExpanded(prev => (prev === num ? null : num));
  };

  return (
    <div ref={ref} data-test="hierarchy-explorer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {LEVELS.map(level => (
        <div key={level.num} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--card-bg)' }}>
          <button
            data-test={`hierarchy-level-${level.num}`}
            tabIndex={0}
            onClick={() => toggle(level.num)}
            aria-expanded={expanded === level.num}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '14px 20px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            <span>{level.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {expanded === level.num ? '▲' : '▼'}
            </span>
          </button>
          {expanded === level.num && (
            <div
              data-test={`hierarchy-level-${level.num}-content`}
              style={{
                padding: '0 20px 16px',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                borderTop: '1px solid var(--border)',
              }}
            >
              <p style={{ marginTop: '12px', marginBottom: '8px', color: 'var(--text)', fontWeight: 500 }}>{level.description}</p>
              <p style={{ margin: 0 }}>{level.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
