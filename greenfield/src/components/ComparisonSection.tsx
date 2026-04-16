const BEFORE = `# Ticket #1042
Make the dashboard load faster.
It's slow. Fix it.

Priority: High
Sprint: 23`;

const AFTER = `id: US-1042
title: Dashboard initial load under 2s
requirement_id: R-1042

acceptance_criteria:
  - id: AC-1042-1
    title: Dashboard loads within 2 seconds
    given:
      - visit: '/dashboard'
    when: []
    then:
      - shouldExist:
          selector: '[data-test=dashboard-content]'

systems: [PERFORMANCE]
phase: Q2`;

export default function ComparisonSection() {
  return (
    <section
      data-test="comparison-section"
      id="comparison"
      className="py-24 px-4 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Before vs. After
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            The same requirement — one as a vague ticket, one as a RootSpec story.
            The difference is everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            data-test="comparison-before"
            className="rounded-xl border border-red-500/30 bg-red-500/5 overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-red-500/20 flex items-center gap-2">
              <span className="text-red-400 text-sm font-semibold">✗ Without RootSpec</span>
            </div>
            <pre className="p-6 text-sm font-mono text-[var(--text-secondary)] whitespace-pre-wrap overflow-x-auto">
              {BEFORE}
            </pre>
          </div>

          <div
            data-test="comparison-after"
            className="rounded-xl border border-green-500/30 bg-green-500/5 overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-green-500/20 flex items-center gap-2">
              <span className="text-green-400 text-sm font-semibold">✓ With RootSpec</span>
            </div>
            <pre className="p-6 text-sm font-mono text-[var(--text-secondary)] whitespace-pre-wrap overflow-x-auto">
              {AFTER}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
