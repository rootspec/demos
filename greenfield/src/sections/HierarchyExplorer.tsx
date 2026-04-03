import { useState, useEffect, useRef } from 'react';
import { levels } from '../data/hierarchy';

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.setAttribute('data-hydrated', 'true');
  }, []);

  function toggle(id: number) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <section ref={sectionRef} id="explore" className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The five levels</h2>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
          Each level can only reference higher levels, never lower. Philosophy stays stable when implementation changes. Click a level to explore.
        </p>

        <div className="mt-12 space-y-3" role="list" aria-label="Specification hierarchy">
          {levels.map((level) => {
            const isExpanded = expanded === level.id;
            return (
              <div key={level.id} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <button
                  data-test={`hierarchy-level-${level.id}`}
                  onClick={() => toggle(level.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`hierarchy-content-${level.id}`}
                  className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-[var(--color-bg-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-inset"
                >
                  <span className="text-2xl flex-shrink-0">{level.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">L{level.id}: {level.title}</span>
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">{level.subtitle}</span>
                    </div>
                    {level.allowedReferences.length > 0 && (
                      <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                        References: {level.allowedReferences.map((r) => `L${r}`).join(', ')}
                      </div>
                    )}
                    {level.allowedReferences.length === 0 && (
                      <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                        References: external only
                      </div>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-[var(--color-text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div
                    id={`hierarchy-content-${level.id}`}
                    data-test={`hierarchy-level-${level.id}-content`}
                    className="px-4 sm:px-5 pb-5 border-t border-[var(--color-border)]"
                  >
                    <pre className="mt-4 p-4 rounded-lg bg-[var(--color-code-bg)] font-mono text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed text-[var(--color-text-secondary)]">
                      {level.exampleContent}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
