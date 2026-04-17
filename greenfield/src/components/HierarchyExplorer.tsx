import { useState } from 'react';

const levels = [
  {
    num: 1,
    label: 'L1 Philosophy',
    title: 'Philosophy & Principles',
    description: 'The immutable "why" behind the product — values, mission, and design principles that never change.',
    example: 'Principle: "Prefer explicit over implicit. Every decision should be traceable to a user need."',
    color: 'border-purple-500 bg-purple-50 dark:bg-purple-950',
    badgeColor: 'bg-purple-500',
  },
  {
    num: 2,
    label: 'L2 Truths',
    title: 'Truths & Constraints',
    description: 'Hard constraints and facts that bound the solution space — technical, legal, or business reality.',
    example: 'Truth: "All user data must be stored in the EU. No exceptions."',
    color: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
    badgeColor: 'bg-blue-500',
  },
  {
    num: 3,
    label: 'L3 Interactions',
    title: 'Interactions & Journeys',
    description: 'How users move through the product — key flows, decision points, and state transitions.',
    example: 'Journey: "New user → Onboarding → First value moment → Retained user"',
    color: 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950',
    badgeColor: 'bg-cyan-500',
  },
  {
    num: 4,
    label: 'L4 Systems',
    title: 'Systems & Architecture',
    description: 'The technical systems that implement the interactions — components, APIs, and data models.',
    example: 'System: "AUTH_SYSTEM: JWT tokens, 7-day refresh, bcrypt password hashing"',
    color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950',
    badgeColor: 'bg-indigo-500',
  },
  {
    num: 5,
    label: 'L5 Implementation',
    title: 'Implementation & Stories',
    description: 'Concrete user stories with Gherkin-style acceptance criteria that map to test cases.',
    example: 'Story: "Given I visit /, When the page loads, Then I see [data-test=hero]"',
    color: 'border-green-500 bg-green-50 dark:bg-green-950',
    badgeColor: 'bg-green-500',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (num: number) => {
    setExpanded((prev) => (prev === num ? null : num));
  };

  return (
    <div data-test="hierarchy-explorer" className="space-y-3">
      {levels.map((level) => (
        <div
          key={level.num}
          className={`rounded-xl border-l-4 ${level.color} border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200`}
        >
          <button
            data-test={`hierarchy-level-${level.num}`}
            onClick={() => toggle(level.num)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-expanded={expanded === level.num}
          >
            <div className="flex items-center gap-3">
              <span className={`${level.badgeColor} text-white text-xs font-mono font-bold px-2 py-0.5 rounded`}>
                L{level.num}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">{level.label}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expanded === level.num ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            data-test={`hierarchy-level-${level.num}-content`}
            style={{ display: expanded === level.num ? 'block' : 'none' }}
            className="px-4 pb-4"
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{level.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{level.description}</p>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3">
              <p className="font-mono text-xs text-green-400">{level.example}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
