import { useState } from 'react';

export default function BeforeAfter() {
  const [tab, setTab] = useState<'before' | 'after'>('before');

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1.25rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
    background: active ? 'var(--color-primary)' : 'transparent',
    color: active ? 'white' : 'var(--color-text-muted)',
    transition: 'all 0.15s',
  });

  return (
    <div data-test="before-after" style={{ border: '1px solid var(--color-border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '0.25rem', padding: '0.75rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <button style={tabBtnStyle(tab === 'before')} onClick={() => setTab('before')}>Without RootSpec</button>
        <button style={tabBtnStyle(tab === 'after')} onClick={() => setTab('after')}>With RootSpec</button>
      </div>
      <div style={{ padding: '1.5rem', background: 'var(--color-bg)' }}>
        {tab === 'before' ? (
          <div>
            <p style={{ margin: '0 0 0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              "Build me a task manager for remote teams."
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#ef4444', background: '#fef2f2', borderRadius: '0.375rem', padding: '1rem', lineHeight: 1.7 }}>
              ❌ Agent makes 200+ undocumented decisions<br/>
              ❌ No shared artifact to review<br/>
              ❌ Corrections take longer than building<br/>
              ❌ Next agent starts from scratch<br/>
              ❌ No way to verify intent was honored
            </div>
          </div>
        ) : (
          <div>
            <p style={{ margin: '0 0 0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              "/rs-init → /rs-spec → /rs-impl → /rs-validate"
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#22c55e', background: '#f0fdf4', borderRadius: '0.375rem', padding: '1rem', lineHeight: 1.7 }}>
              ✓ Five-level spec captures intent precisely<br/>
              ✓ Acceptance criteria are machine-testable<br/>
              ✓ Every story traced to philosophy<br/>
              ✓ Tests validate implementation matches spec<br/>
              ✓ Any agent can pick up where the last left off
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
