import { useState } from 'react';

interface Level {
  id: string;
  title: string;
  description: string;
  content: string;
  references: string[];
}

const levels: Level[] = [
  {
    id: 'level-1',
    title: 'L1 — Philosophy',
    description: 'Core beliefs and principles',
    content: 'Philosophy defines the fundamental beliefs, values, and principles that guide the product. It establishes the "why" behind your product decisions and creates alignment across the team.',
    references: []
  },
  {
    id: 'level-2',
    title: 'L2 — Truths',
    description: 'Fundamental assumptions and constraints',
    content: 'Truths capture the fundamental assumptions, constraints, and facts about your domain, users, and environment. These are the building blocks that inform all other decisions.',
    references: ['level-1']
  },
  {
    id: 'level-3',
    title: 'L3 — Interactions',
    description: 'User behaviors and system responses',
    content: 'Interactions describe how users behave within your system and how the system responds. These are the concrete workflows that deliver on your philosophy and truths.',
    references: ['level-1', 'level-2']
  },
  {
    id: 'level-4',
    title: 'L4 — Systems',
    description: 'Technical architecture and components',
    content: 'Systems break down the technical architecture needed to support the interactions. These define the major components, services, and data flows.',
    references: ['level-2', 'level-3']
  },
  {
    id: 'level-5',
    title: 'L5 — Implementation',
    description: 'Detailed user stories and acceptance criteria',
    content: 'Implementation provides detailed user stories with testable acceptance criteria. These stories implement specific system capabilities that support the interactions.',
    references: ['level-3', 'level-4']
  }
];

export default function HierarchyExplorer() {
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const toggleLevel = (levelId: string) => {
    setExpandedLevel(expandedLevel === levelId ? null : levelId);
  };

  return (
    <div data-test="hierarchy-explorer" className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Explore the Five-Level Hierarchy</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Click any level to see examples. Notice how higher levels reference lower levels,
          creating a structured dependency graph.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {levels.map((level) => (
          <div key={level.id} className="relative">
            {/* Level card */}
            <button
              data-test={level.id}
              onClick={() => toggleLevel(level.id)}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                expandedLevel === level.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              } ${hoveredLevel === level.id ? 'shadow-lg' : 'shadow'}`}
            >
              <h3 className="font-bold text-lg mb-2">{level.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{level.description}</p>
            </button>

            {/* Expanded content */}
            {expandedLevel === level.id && (
              <div
                data-test={`${level.id}-content`}
                className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
              >
                <p className="text-sm leading-relaxed">{level.content}</p>
              </div>
            )}

            {/* Reference arrows */}
            {hoveredLevel === level.id && level.references.map((refId) => {
              const refIndex = levels.findIndex(l => l.id === refId);
              const currentIndex = levels.findIndex(l => l.id === level.id);

              if (refIndex >= 0) {
                return (
                  <div
                    key={refId}
                    data-test={`reference-arrow-${currentIndex + 1}-to-${refIndex + 1}`}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      left: `${(refIndex - currentIndex) * 100}%`,
                      zIndex: 5
                    }}
                  >
                    <div className="w-full h-1 bg-blue-400 absolute top-1/2 transform -translate-y-1/2">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-400 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}