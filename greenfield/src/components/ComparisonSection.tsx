import { useState } from 'react';

const WITHOUT_SPEC = {
  title: 'Without RootSpec',
  content: `## Product Requirements Document v2.3 (draft)

The user should be able to log in and see their stuff.

### Login
- Users log in with email/password
- Maybe add Google later?
- The page should look good

### Dashboard
- Show "relevant" content to the user
- Fast loading (define later)
- Mobile-friendly

### TODO
- Figure out what "relevant" means
- Get design mockups from designer
- Ask backend team about API format

---
Note: Requirements may change based on stakeholder feedback.
Last updated: not sure, check Slack`,
  label: 'Vague PRD',
  bad: true,
};

const WITH_SPEC = {
  title: 'With RootSpec',
  content: `## US-301: User sees relevant feed on login

@systems: [FEED_SYSTEM, AUTH_SYSTEM]
@phase: MVP

acceptance_criteria:
  - id: AC-301-1
    title: Feed loads within 2s for authenticated user
    given:
      - loginAs: returning_user
    then:
      - shouldExist:
          selector: '[data-test=feed-container]'

## Traces to:
- L3: Interaction "Core Feed Flow" (03.INTERACTIONS.md#feed)
- L2: Truth "Relevance is opt-in, never inferred" (02.TRUTHS.md#relevance)
- L1: Pillar "Calm Control" (01.PHILOSOPHY.md#pillars)

## Why this story exists:
The user's primary value is seeing content they care about without
configuration overhead. Every feed decision traces to "Calm Control":
the user is in charge, not the algorithm.`,
  label: 'Structured spec',
  bad: false,
};

export default function ComparisonSection() {
  const [showWith, setShowWith] = useState(false);
  const current = showWith ? WITH_SPEC : WITHOUT_SPEC;

  return (
    <div data-test="comparison-section" style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '0',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        <button
          data-test="comparison-toggle"
          onClick={() => setShowWith(false)}
          style={{
            flex: 1,
            padding: '8px 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            cursor: 'pointer',
            border: 'none',
            borderRight: '1px solid var(--color-border)',
            backgroundColor: !showWith ? 'var(--color-surface)' : 'var(--color-bg)',
            color: !showWith ? 'var(--color-text)' : 'var(--color-text-muted)',
            fontWeight: !showWith ? '500' : '400',
            transition: 'all 150ms ease-out',
          }}
        >
          Without RootSpec
        </button>
        <button
          onClick={() => setShowWith(true)}
          style={{
            flex: 1,
            padding: '8px 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: showWith ? 'var(--color-surface)' : 'var(--color-bg)',
            color: showWith ? 'var(--color-text)' : 'var(--color-text-muted)',
            fontWeight: showWith ? '500' : '400',
            transition: 'all 150ms ease-out',
          }}
        >
          With RootSpec
        </button>
      </div>

      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: current.bad ? '#ef4444' : '#22c55e',
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {current.label}
          </span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: '16px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            lineHeight: '1.7',
            color: 'var(--color-text)',
            backgroundColor: 'var(--color-code-bg)',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
          }}
        >
          {current.content}
        </pre>
      </div>
    </div>
  );
}
