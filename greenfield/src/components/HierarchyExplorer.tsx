import { useState } from 'react';

interface Level {
  id: string;
  name: string;
  description: string;
  content: string[];
}

const levels: Level[] = [
  {
    id: 'L1',
    name: 'Philosophy',
    description: 'Mission, principles, and design pillars',
    content: [
      'Core mission statement',
      'Design principles',
      'Values and beliefs'
    ]
  },
  {
    id: 'L2',
    name: 'Truths',
    description: 'Non-negotiable constraints and requirements',
    content: [
      'Business constraints',
      'Technical limitations',
      'Regulatory requirements'
    ]
  },
  {
    id: 'L3',
    name: 'Interactions',
    description: 'Key user journeys and system behaviors',
    content: [
      'Primary user flows',
      'System interactions',
      'Integration points'
    ]
  },
  {
    id: 'L4',
    name: 'Systems',
    description: 'Modular system architecture and components',
    content: [
      'Core systems',
      'Component architecture',
      'Integration patterns'
    ]
  },
  {
    id: 'L5',
    name: 'Implementation',
    description: 'User stories and acceptance criteria',
    content: [
      'User stories',
      'Acceptance criteria',
      'Test scenarios'
    ]
  }
];

export default function HierarchyExplorer() {
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const toggleLevel = (levelId: string) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId);
    } else {
      newExpanded.add(levelId);
    }
    setExpandedLevels(newExpanded);
  };

  const canReference = (fromLevel: string, toLevel: string) => {
    const fromIndex = levels.findIndex(l => l.id === fromLevel);
    const toIndex = levels.findIndex(l => l.id === toLevel);
    return fromIndex > toIndex; // Can only reference higher levels
  };

  return (
    <div className="hierarchy-explorer" data-test="hierarchy-explorer">
      <div className="levels-container">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className="level-node"
            data-test={`level-${level.id}`}
            onMouseEnter={() => setHoveredLevel(level.id)}
            onMouseLeave={() => setHoveredLevel(null)}
            onClick={() => toggleLevel(level.id)}
          >
            <div className="level-header">
              <div className="level-number">{index + 1}</div>
              <div className="level-info">
                <h3>{level.name}</h3>
                <p>{level.description}</p>
              </div>
              <button className="expand-button">
                {expandedLevels.has(level.id) ? '−' : '+'}
              </button>
            </div>

            {expandedLevels.has(level.id) && (
              <div
                className="level-content expanded"
                data-test={`level-${level.id}-content`}
              >
                <ul>
                  {level.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reference arrows shown on hover */}
      {hoveredLevel && (
        <div className="reference-arrows">
          {levels.map(toLevel => {
            if (canReference(hoveredLevel, toLevel.id)) {
              return (
                <div
                  key={`${hoveredLevel}-${toLevel.id}`}
                  className="reference-arrow"
                  data-test={`reference-arrow-${hoveredLevel}-${toLevel.id}`}
                >
                  ↑ Can reference {toLevel.name}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      <style jsx>{`
        .hierarchy-explorer {
          padding: 2rem;
          border: 2px solid var(--border-gray);
          border-radius: 0.75rem;
          background-color: var(--bg-light);
        }

        .levels-container {
          display: grid;
          gap: 1rem;
        }

        .level-node {
          border: 2px solid var(--border-gray);
          border-radius: 0.5rem;
          background-color: var(--bg-gray);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .level-node:hover {
          border-color: var(--primary-blue);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
        }

        .level-header {
          display: flex;
          align-items: center;
          padding: 1rem;
          gap: 1rem;
        }

        .level-number {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .level-info {
          flex-grow: 1;
        }

        .level-info h3 {
          margin: 0 0 0.25rem;
          color: var(--text-dark);
          font-size: 1.25rem;
        }

        .level-info p {
          margin: 0;
          color: var(--text-light);
          font-size: 0.875rem;
        }

        .expand-button {
          width: 2rem;
          height: 2rem;
          border: none;
          background-color: var(--primary-blue);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.25rem;
        }

        .level-content {
          padding: 0 1rem 1rem 1rem;
          margin-left: 4rem;
        }

        .level-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 0;
        }

        .level-content li {
          margin: 0.5rem 0;
          color: var(--text-light);
        }

        .reference-arrows {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--bg-light);
          border: 1px solid var(--border-gray);
          border-radius: 0.25rem;
          padding: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-light);
        }
      `}</style>
    </div>
  );
}