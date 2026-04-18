import { useState } from 'react';

const WITHOUT_SPEC = `## Feature Request: User Login

The user should be able to log in. It should be secure and work on mobile.

Requirements:
- Login form
- Password reset
- Remember me option
- Error messages when wrong

Notes: Make it look nice. Maybe add Google login later?
`;

const WITH_ROOTSPEC = `## L3: Core Interaction — Authentication Flow

### Auth.login
**Input:** email (string, validated), password (string, min 8 chars)
**Output:** session_token | AuthError
**Precondition:** user record exists with email
**Postcondition:** session persisted; redirect to /dashboard

### L5 User Story: US-AUTH-01
**As a** returning user
**I want to** log in with my credentials
**So that** I can access my dashboard

**AC-AUTH-01-1:** Given /login loaded, when valid email+password submitted, then redirect to /dashboard
**AC-AUTH-01-2:** Given /login loaded, when invalid credentials submitted, then show [data-test=auth-error]
`;

export default function ComparisonSection() {
  const [activePanel, setActivePanel] = useState<'without_spec' | 'with_rootspec'>('without_spec');

  return (
    <section data-test="comparison-section" style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', margin: '0 0 1rem' }}>
          Before vs. After RootSpec
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 0 2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          See the difference between a vague requirements doc and a properly structured RootSpec.
        </p>

        {/* Toggle buttons */}
        <div
          data-test="comparison-toggle"
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            padding: '0.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <button
            data-test="comparison-toggle-without"
            onClick={() => setActivePanel('without_spec')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.35rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: activePanel === 'without_spec' ? 'var(--bg-card)' : 'transparent',
              color: activePanel === 'without_spec' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activePanel === 'without_spec' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 200ms ease',
            }}
          >
            ❌ Without Spec
          </button>
          <button
            data-test="comparison-toggle-rootspec"
            onClick={() => setActivePanel('with_rootspec')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.35rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: activePanel === 'with_rootspec' ? 'var(--accent)' : 'transparent',
              color: activePanel === 'with_rootspec' ? 'white' : 'var(--text-secondary)',
              boxShadow: activePanel === 'with_rootspec' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 200ms ease',
            }}
          >
            ✅ With RootSpec
          </button>
        </div>

        {/* Panels */}
        <div
          data-test="comparison-panel-without"
          data-active={activePanel === 'without_spec' ? 'true' : 'false'}
          style={{
            display: activePanel === 'without_spec' ? 'block' : 'none',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>
            ❌ Vague requirements doc
          </h3>
          <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: 1.7 }}>{WITHOUT_SPEC}</pre>
        </div>

        <div
          data-test="comparison-panel-rootspec"
          data-active={activePanel === 'with_rootspec' ? 'true' : 'false'}
          style={{
            display: activePanel === 'with_rootspec' ? 'block' : 'none',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--accent)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ color: 'var(--accent)', margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>
            ✅ Structured RootSpec
          </h3>
          <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: 1.7 }}>{WITH_ROOTSPEC}</pre>
        </div>
      </div>
    </section>
  );
}
