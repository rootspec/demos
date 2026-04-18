import React from 'react';

export default function ComparisonSection() {
  return (
    <section data-test="comparison-section" className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text)' }}>
        Before &amp; After RootSpec
      </h2>
      <p className="text-center mb-12" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
        See how structured specifications transform the development workflow.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Without spec */}
        <div
          data-test="comparison-without"
          className="rounded-xl border p-6"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-400 font-mono text-sm font-bold">WITHOUT SPEC</span>
          </div>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              <span>Vague requirements lead to rework and missed deadlines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              <span>Engineers guess at edge cases; QA finds them in production</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              <span>Every review meeting re-litigates decisions already made</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              <span>No audit trail — who decided what and why is lost</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              <span>Tests are written after the fact, missing key behaviours</span>
            </li>
          </ul>
        </div>

        {/* With spec */}
        <div
          data-test="comparison-with"
          className="rounded-xl border p-6"
          style={{ background: 'var(--color-surface)', borderColor: '#6270f5' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-sm font-bold" style={{ color: '#8194fa' }}>WITH ROOTSPEC</span>
          </div>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: '#6ee7b7' }}>✓</span>
              <span>Five-level hierarchy captures philosophy down to implementation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: '#6ee7b7' }}>✓</span>
              <span>User stories with given/when/then become executable tests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: '#6ee7b7' }}>✓</span>
              <span>Decisions are recorded in spec files, version-controlled with code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: '#6ee7b7' }}>✓</span>
              <span>Automated validation ensures spec and code stay in sync</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: '#6ee7b7' }}>✓</span>
              <span>Tests are generated from spec — coverage is guaranteed</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
