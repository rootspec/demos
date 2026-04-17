import { useState } from 'react';

const beforeSpec = `# Feature Request
Make the dashboard better.
Users are complaining it's slow and
confusing. Add some charts maybe.
Fix the navigation too.

Priority: High
Owner: TBD
Due: Next sprint`;

const afterSpec = `# L5 User Story: Dashboard Clarity
id: US-401
title: User understands their data at a glance

acceptance_criteria:
  - id: AC-401-1
    title: Dashboard loads within 1s
    given:
      - loginAs: { role: admin }
      - visit: /dashboard
    then:
      - shouldExist:
          selector: '[data-test=dashboard]'

  - id: AC-401-2
    title: Key metrics visible without scrolling
    given:
      - visit: /dashboard
    then:
      - shouldExist:
          selector: '[data-test=metric-revenue]'
      - shouldExist:
          selector: '[data-test=metric-users]'`;

export default function ComparisonSection() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section
      data-test="comparison-section"
      className="py-20 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The difference structure makes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The same feature request — before and after RootSpec. One is a prayer. One is a contract.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex gap-1">
            <button
              data-test="comparison-toggle"
              onClick={() => setShowAfter((v) => !v)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !showAfter
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {showAfter ? 'Show Before' : 'Before (Unstructured)'}
            </button>
            <button
              onClick={() => setShowAfter((v) => !v)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showAfter
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {!showAfter ? 'Show After' : 'After (RootSpec)'}
            </button>
          </div>
        </div>

        {/* Code display */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${showAfter ? 'bg-green-900 border-green-700' : 'bg-red-900 border-red-700'}`}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-300 font-mono ml-2">
              {showAfter ? 'user-story.yaml — RootSpec L5' : 'slack-message.txt — Unstructured'}
            </span>
          </div>
          <pre className="bg-gray-950 text-gray-300 p-6 text-sm font-mono overflow-auto min-h-[280px] whitespace-pre-wrap">
            <code>{showAfter ? afterSpec : beforeSpec}</code>
          </pre>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          {showAfter
            ? '✅ Testable, traceable, AI-implementable'
            : '❌ Ambiguous, untestable, impossible to verify'}
        </p>
      </div>
    </section>
  );
}
