import { useState } from 'react';

const LEVELS = [
  {
    id: 'L1',
    number: 'L1',
    title: 'Philosophy',
    tagline: 'Why does this product exist?',
    detail: 'The philosophy level defines the product\'s core purpose, the problem it solves, and the principles that guide every decision. It answers "why" before answering "what" or "how".',
    example: 'e.g. "We believe developers deserve tools that think at their level."',
    color: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/30',
    accent: 'text-purple-400',
  },
  {
    id: 'L2',
    number: 'L2',
    title: 'Truths',
    tagline: 'What is always true about this product?',
    detail: 'Truths are immutable facts about the product — invariants that no feature can violate. They serve as guardrails for implementation decisions at every level.',
    example: 'e.g. "Users always own their data. The spec is always the source of truth."',
    color: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  {
    id: 'L3',
    number: 'L3',
    title: 'Interactions',
    tagline: 'How do users engage with the product?',
    detail: 'Interactions define the key moments of user engagement — the journeys, flows, and touchpoints. They bridge high-level truths with concrete system design.',
    example: 'e.g. "A user can always see the current spec status at a glance."',
    color: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
  },
  {
    id: 'L4',
    number: 'L4',
    title: 'Systems',
    tagline: 'What systems make those interactions possible?',
    detail: 'Systems describe the architectural components, APIs, and subsystems required. Each system maps directly to one or more user interactions.',
    example: 'e.g. "Content System, Theme System, Interactive System, Layout System"',
    color: 'from-green-500/20 to-green-600/5',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  {
    id: 'L5',
    number: 'L5',
    title: 'User Stories',
    tagline: 'What exactly needs to be built and tested?',
    detail: 'User stories are machine-readable YAML documents with acceptance criteria in a structured DSL. They are the direct input to the AI implementation agent.',
    example: 'e.g. "AC-101-1: Meta banner is visible on page load without scrolling"',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
  },
];

export default function HierarchyExplorer() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div data-test="hierarchy-explorer" className="space-y-3">
      {LEVELS.map((level) => {
        const isExpanded = expandedId === level.id;
        return (
          <div
            key={level.id}
            data-test="hierarchy-level"
            className={`
              rounded-xl border transition-all duration-200 cursor-pointer
              bg-gradient-to-br ${level.color} ${level.border}
              hover:border-opacity-60
              ${isExpanded ? 'expanded' : ''}
            `}
            onClick={() => toggle(level.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(level.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`text-xs font-mono font-bold ${level.accent} bg-white/5 px-2 py-1 rounded`}>
                  {level.number}
                </span>
                <div>
                  <h3 className="font-semibold text-base">{level.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{level.tagline}</p>
                </div>
              </div>
              <span className={`text-[var(--text-secondary)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>

            {isExpanded && (
              <div data-test="level-detail" className="px-5 pb-5 border-t border-white/10 mt-0">
                <div className="pt-4 space-y-3">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{level.detail}</p>
                  <p className={`text-xs font-mono ${level.accent} bg-white/5 px-3 py-2 rounded`}>{level.example}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
