export default function ComparisonSection() {
  return (
    <section
      data-test="comparison-section"
      style={{
        padding: '5rem 1.5rem',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          See the difference
        </p>
        <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Before and after RootSpec
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1.0625rem', lineHeight: 1.65, maxWidth: '580px', marginBottom: '2.5rem' }}>
          Compare a typical vague product brief against a structured RootSpec L3 interaction document.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
          <div
            data-test="comparison-before"
            style={{
              background: 'var(--surface)',
              border: '1px solid #7f1d1d',
              borderRadius: '0.75rem',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ background: '#7f1d1d', color: '#fca5a5', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: '9999px' }}>BEFORE</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.8125rem' }}>Typical brief</span>
            </div>
            <pre style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              color: 'var(--muted)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}>
{`Make a dashboard for
managing tasks. Users
should be able to add,
edit, and delete tasks.
Also add some kind of
filtering maybe.`}
            </pre>
          </div>

          <div
            data-test="comparison-after"
            style={{
              background: 'var(--surface)',
              border: '1px solid #14532d',
              borderRadius: '0.75rem',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ background: '#14532d', color: '#86efac', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: '9999px' }}>AFTER</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.8125rem' }}>RootSpec L3</span>
            </div>
            <pre style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              color: 'var(--accent-light)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}>
{`JOURNEY: Task management
ACTOR: Authenticated user
TRIGGER: User opens dashboard

STEPS:
1. User sees task list grouped by status
2. User creates task with title + priority
3. User filters by status: open/done/all
4. System persists changes immediately

CONSTRAINTS:
- Zero page reloads
- Keyboard-navigable throughout`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
