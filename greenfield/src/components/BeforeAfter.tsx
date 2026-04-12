import { useState } from 'react';

const BEFORE = `# Feature Request

We need a login page. Users should be able to
sign in with their email and password. There
should be error messages if something goes wrong.
The design should match our brand.

Also forgot password would be nice.

- Dev estimate: 2-3 days
- Priority: high`;

const AFTER = `id: US-AUTH-001
title: User signs in with email and password

acceptance_criteria:
  - id: AC-001-1
    title: Successful login redirects to dashboard
    given:
      - visit: '/login'
    when:
      - fill: { selector: '[data-test=email]', value: 'user@example.com' }
      - fill: { selector: '[data-test=password]', value: 'secret' }
      - click: { selector: '[data-test=submit-btn]' }
    then:
      - shouldExist: { selector: '[data-test=dashboard]' }

  - id: AC-001-2
    title: Wrong password shows error message
    given:
      - visit: '/login'
    when:
      - fill: { selector: '[data-test=email]', value: 'user@example.com' }
      - fill: { selector: '[data-test=password]', value: 'wrong' }
      - click: { selector: '[data-test=submit-btn]' }
    then:
      - shouldExist: { selector: '[data-test=error-msg]' }
      - shouldContain:
          selector: '[data-test=error-msg]'
          text: 'Invalid credentials'`;

export default function BeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div data-test="before-after-section">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <button
            data-test="before-after-toggle"
            onClick={() => setShowAfter(!showAfter)}
            style={{
              padding: '8px 20px',
              background: !showAfter ? 'var(--accent)' : 'transparent',
              color: !showAfter ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 200ms ease',
            }}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(!showAfter)}
            style={{
              padding: '8px 20px',
              background: showAfter ? 'var(--accent)' : 'transparent',
              color: showAfter ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 200ms ease',
            }}
          >
            After
          </button>
        </div>
      </div>

      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid var(--border)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: !showAfter ? '#ef4444' : '#22c55e',
            display: 'inline-block',
          }} />
          <span>{!showAfter ? 'feature-request.md — Vague, untestable' : 'US-AUTH-001.yaml — Structured, testable'}</span>
        </div>
        <pre style={{
          padding: '20px',
          margin: 0,
          fontSize: '0.8rem',
          color: 'var(--text)',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: 'ui-monospace, monospace',
          lineHeight: 1.7,
          minHeight: '280px',
        }}>
          {showAfter ? AFTER : BEFORE}
        </pre>
      </div>
    </div>
  );
}
