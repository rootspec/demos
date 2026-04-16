import { useState } from 'react';

export default function ComparisonSection() {
  const [view, setView] = useState<'before' | 'after'>('before');

  return (
    <section data-test="comparison-section" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-[var(--fg)]">Before and after RootSpec</h2>
        <p className="text-center text-[var(--muted)] mb-8 max-w-2xl mx-auto">
          See the difference between a typical ad-hoc spec and a structured RootSpec.
        </p>

        <div className="flex justify-center mb-8 gap-2">
          <button
            data-test="comparison-toggle-before"
            onClick={() => setView('before')}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              view === 'before'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-300 dark:border-red-700'
                : 'bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--border)]'
            }`}
          >
            Without RootSpec
          </button>
          <button
            data-test="comparison-toggle-after"
            onClick={() => setView('after')}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              view === 'after'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-300 dark:border-green-700'
                : 'bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--border)]'
            }`}
          >
            With RootSpec
          </button>
        </div>

        {view === 'before' && (
          <div data-test="comparison-panel-before" className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-6">
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-4 text-lg">❌ Typical spec document</h3>
            <div className="space-y-3 text-sm text-[var(--fg)]">
              <p className="p-3 bg-white dark:bg-black/20 rounded border border-red-200 dark:border-red-800">"Build a dashboard with graphs and user settings. Make it look nice. Mobile too."</p>
              <p className="text-[var(--muted)]">No acceptance criteria. No hierarchy. No way to verify correctness. Three months later, nobody remembers why certain decisions were made.</p>
            </div>
          </div>
        )}

        {view === 'after' && (
          <div data-test="comparison-panel-after" className="rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-6">
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-4 text-lg">✅ RootSpec structured spec</h3>
            <div className="space-y-3 font-mono text-xs text-[var(--fg)]">
              <div className="p-3 bg-white dark:bg-black/20 rounded border border-green-200 dark:border-green-800">
                <div className="text-purple-600 dark:text-purple-400 font-bold mb-1">L1 · Philosophy</div>
                <p>"The dashboard serves power users who need high-density information at a glance."</p>
              </div>
              <div className="p-3 bg-white dark:bg-black/20 rounded border border-green-200 dark:border-green-800">
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-1">L5 · User Story US-101</div>
                <p>{"id: US-101\ntitle: User sees KPI summary on load\nacceptance_criteria:\n  - id: AC-101-1\n    given: [visit: '/']\n    then: [shouldExist: '[data-test=kpi-summary]']"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
