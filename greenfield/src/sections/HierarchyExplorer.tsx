import { useState } from 'react';

interface Level {
  id: string;
  name: string;
  title: string;
  description: string;
  canReference: string[];
  examples: string[];
}

const levels: Level[] = [
  {
    id: 'level-1',
    name: 'L1: Philosophy',
    title: 'Philosophy',
    description: 'Core beliefs and principles that guide all decisions. Philosophy forms the foundation of every specification.',
    canReference: [],
    examples: ['User-centricity', 'Performance-first', 'Privacy by design', 'Accessibility always']
  },
  {
    id: 'level-2',
    name: 'L2: Truths',
    title: 'Truths',
    description: 'Objective constraints and realities that inform solutions',
    canReference: ['level-1'],
    examples: ['Mobile traffic is 70%', 'Users abandon after 3s load time', 'Team size: 3 developers']
  },
  {
    id: 'level-3',
    name: 'L3: Interactions',
    title: 'Interactions',
    description: 'High-level user flows and system behaviors',
    canReference: ['level-1', 'level-2'],
    examples: ['User uploads image → instant feedback', 'Search → results → filter → refine']
  },
  {
    id: 'level-4',
    name: 'L4: Systems',
    title: 'Systems',
    description: 'Architectural components and their relationships',
    canReference: ['level-1', 'level-2', 'level-3'],
    examples: ['Authentication system', 'Content management', 'Real-time notifications']
  },
  {
    id: 'level-5',
    name: 'L5: Implementation',
    title: 'Implementation',
    description: 'Specific features, user stories, and technical details',
    canReference: ['level-1', 'level-2', 'level-3', 'level-4'],
    examples: ['Login form validation', 'Image upload progress bar', 'Search autocomplete API']
  }
];

export default function HierarchyExplorer() {
  const [expandedLevels, setExpandedLevels] = useState<string[]>([]);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const toggleLevel = (levelId: string) => {
    setExpandedLevels(prev =>
      prev.includes(levelId)
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  const isExpanded = (levelId: string) => expandedLevels.includes(levelId);
  const isHighlighted = (levelId: string) => {
    if (!hoveredLevel) return false;
    const hoveredLevelData = levels.find(l => l.id === hoveredLevel);
    return hoveredLevelData?.canReference.includes(levelId);
  };

  return (
    <section data-test="hierarchy-explorer" className="hierarchy-explorer">
      <div className="hierarchy-container">
        <h2 className="hierarchy-title">The Five-Level Hierarchy</h2>

        <p className="hierarchy-intro">
          RootSpec organizes specifications into five levels, where each level can only reference levels above it.
          Click any level to explore its purpose and examples.
        </p>

        <div className="levels-container">
          {levels.map((level, index) => (
            <div
              key={level.id}
              data-test={level.id}
              className={`level ${isExpanded(level.id) ? 'expanded' : ''} ${isHighlighted(level.id) ? 'highlighted' : ''}`}
              onClick={() => toggleLevel(level.id)}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded(level.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleLevel(level.id);
                }
              }}
            >
              <div className="level-header">
                <div className="level-number">{index + 1}</div>
                <h3 className="level-name">{level.name}</h3>
                <div className="expand-icon">
                  {isExpanded(level.id) ? '−' : '+'}
                </div>
              </div>

              {isExpanded(level.id) && (
                <div data-test={`${level.id}-content`} className="level-content">
                  <p className="level-description">{level.description}</p>

                  <div className="level-examples">
                    <h4>Examples:</h4>
                    <ul>
                      {level.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>

                  {level.canReference.length > 0 && (
                    <div className="level-references">
                      <h4>Can reference:</h4>
                      <div className="reference-pills">
                        {level.canReference.map(refId => {
                          const refLevel = levels.find(l => l.id === refId);
                          return (
                            <span key={refId} className="reference-pill">
                              {refLevel?.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {hoveredLevel && (
            <div data-test="reference-arrows" className="reference-arrows">
              <div className="arrow-explanation">
                <strong>{levels.find(l => l.id === hoveredLevel)?.title}</strong> can reference highlighted levels above
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}