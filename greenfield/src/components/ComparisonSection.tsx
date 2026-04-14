import { useState } from 'react';

const WITHOUT = `## Feature Request

"Make a user profile page that shows the user's info and lets them edit it. It should look nice and work on mobile."

Issues:
- What "user info" means is undefined
- "Look nice" is not testable
- No acceptance criteria
- No edge cases (empty state, errors)
- Unmeasurable success`;

const WITH = `## US-201: User can view and edit their profile

\`\`\`yaml
id: US-201
title: User views and edits profile
acceptance_criteria:
  - id: AC-201-1
    title: Profile page loads with user data
    given:
      - visit: '/profile'
    then:
      - shouldExist: { selector: '[data-test=profile-name]' }
      - shouldExist: { selector: '[data-test=profile-email]' }

  - id: AC-201-2
    title: User saves updated display name
    when:
      - fill: { selector: '[data-test=name-input]', value: 'New Name' }
      - click: { selector: '[data-test=save-btn]' }
    then:
      - shouldExist: { selector: '[data-test=success-toast]' }
\`\`\``;

export default function ComparisonSection() {
  const [view, setView] = useState<'without' | 'with'>('without');

  return (
    <div data-test="comparison-component" className="max-w-4xl mx-auto">
      <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-6 w-fit mx-auto">
        <button
          data-test="comparison-toggle-without"
          onClick={() => setView('without')}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            view === 'without'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Without RootSpec
        </button>
        <button
          data-test="comparison-toggle-with"
          onClick={() => setView('with')}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            view === 'with'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          With RootSpec
        </button>
      </div>

      {view === 'without' && (
        <div data-test="comparison-panel-without" className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans">{WITHOUT}</pre>
        </div>
      )}

      {view === 'with' && (
        <div data-test="comparison-panel-with" className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono text-xs">{WITH}</pre>
        </div>
      )}
    </div>
  );
}
