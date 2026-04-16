import { useState } from 'react';

const levels = [
  {
    id: 1,
    label: 'L1 · Philosophy',
    color: 'purple',
    summary: 'The foundational beliefs and values that drive every product decision.',
    example: `"We believe software should serve human goals, not create new burdens. Every feature must reduce friction, not introduce it."`,
  },
  {
    id: 2,
    label: 'L2 · Truths',
    color: 'blue',
    summary: 'Verifiable facts about your users, market, and constraints.',
    example: `"Our users are time-poor professionals. They have 90 seconds per session on mobile. They will not read documentation."`,
  },
  {
    id: 3,
    label: 'L3 · Interactions',
    color: 'cyan',
    summary: 'The meaningful moments of engagement between user and product.',
    example: `"User opens the app and immediately sees their highest-priority task — no navigation required."`,
  },
  {
    id: 4,
    label: 'L4 · Systems',
    color: 'green',
    summary: 'The technical and design systems that enable those interactions.',
    example: `"Notification System: surfaces time-sensitive items using push and in-app banners with a 5-second dismiss window."`,
  },
  {
    id: 5,
    label: 'L5 · Implementation',
    color: 'orange',
    summary: 'Concrete user stories with testable acceptance criteria.',
    example: `"US-101: User sees daily summary on login\n  AC-101-1: given visit '/', then shouldExist '[data-test=daily-summary]'"`,
  },
];

const colorMap: Record<string, string> = {
  purple: 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30',
  blue: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30',
  cyan: 'border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/30',
  green: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30',
  orange: 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/30',
};

const labelColorMap: Record<string, string> = {
  purple: 'text-purple-700 dark:text-purple-300',
  blue: 'text-blue-700 dark:text-blue-300',
  cyan: 'text-cyan-700 dark:text-cyan-300',
  green: 'text-green-700 dark:text-green-300',
  orange: 'text-orange-700 dark:text-orange-300',
};

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div data-test="hierarchy-explorer" className="space-y-3">
      {levels.map((level) => {
        const isExpanded = expanded === level.id;
        return (
          <div
            key={level.id}
            data-test={`hierarchy-level-${level.id}`}
            aria-expanded={isExpanded}
            role="button"
            tabIndex={0}
            onClick={() => setExpanded(isExpanded ? null : level.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded(isExpanded ? null : level.id);
              }
            }}
            className={`rounded-xl border-2 p-4 cursor-pointer transition-all select-none ${colorMap[level.color]}`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-bold font-mono ${labelColorMap[level.color]}`}>{level.label}</span>
              <span className="text-[var(--muted)] text-sm">{isExpanded ? '▲' : '▼'}</span>
            </div>
            <p className="text-sm text-[var(--muted)] mt-1">{level.summary}</p>
            {isExpanded && (
              <div
                data-test={`hierarchy-level-${level.id}-content`}
                className="mt-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-[var(--border)]"
              >
                <p className="text-xs font-mono text-[var(--fg)] whitespace-pre-wrap">{level.example}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
