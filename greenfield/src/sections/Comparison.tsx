import { useState, useEffect, useRef } from 'react';
import { withoutSpec, withSpec } from '../data/comparison';

export default function Comparison() {
  const [view, setView] = useState<'without' | 'with'>('without');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.setAttribute('data-hydrated', 'true');
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Before & after</h2>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
          See what changes when you use a structured specification instead of a loose requirements doc.
        </p>

        <div className="mt-8 flex gap-2" role="radiogroup" aria-label="Comparison view">
          <button
            data-test="comparison-toggle-without"
            onClick={() => setView('without')}
            role="radio"
            aria-checked={view === 'without'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'without'
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            Without spec
          </button>
          <button
            data-test="comparison-toggle-with"
            onClick={() => setView('with')}
            role="radio"
            aria-checked={view === 'with'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'with'
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            With RootSpec
          </button>
        </div>

        <div className="mt-6">
          {view === 'without' && (
            <div data-test="comparison-without-panel" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
              <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-[var(--color-text-secondary)]">
                {withoutSpec}
              </pre>
            </div>
          )}
          {view === 'with' && (
            <div data-test="comparison-with-panel" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
              <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-[var(--color-text-secondary)]">
                {withSpec}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
