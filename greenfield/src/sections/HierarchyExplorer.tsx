import { useState } from 'react';

interface Level {
  id: number;
  name: string;
  description: string;
  references: number[];
  examples: string[];
}

const levels: Level[] = [
  {
    id: 1,
    name: 'Philosophy',
    description: 'The foundational beliefs and principles that guide your product decisions.',
    references: [],
    examples: ['Mission statement', 'Core values', 'Vision for the future']
  },
  {
    id: 2,
    name: 'Truths',
    description: 'Concrete facts about your users, market, and constraints.',
    references: [1],
    examples: ['User research findings', 'Market constraints', 'Technical limitations']
  },
  {
    id: 3,
    name: 'Interactions',
    description: 'The key ways users will interact with your product.',
    references: [1, 2],
    examples: ['User journeys', 'Key workflows', 'Core interactions']
  },
  {
    id: 4,
    name: 'Systems',
    description: 'The high-level systems and components that enable the interactions.',
    references: [1, 2, 3],
    examples: ['Authentication system', 'Data layer', 'UI components']
  },
  {
    id: 5,
    name: 'Implementation',
    description: 'The detailed technical implementation of the systems.',
    references: [1, 2, 3, 4],
    examples: ['User stories', 'Technical specs', 'API definitions']
  }
];

export default function HierarchyExplorer() {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const toggleLevel = (levelId: number) => {
    setExpandedLevel(expandedLevel === levelId ? null : levelId);
  };

  const handleKeyPress = (e: React.KeyboardEvent, levelId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLevel(levelId);
    }
    if (e.key === 'Escape') {
      setExpandedLevel(null);
    }
  };

  return (
    <div data-test="hierarchy-explorer" className="hierarchy-explorer">
      <div className="explorer-content">
        <div className="explorer-header">
          <h2>Explore the Five-Level Hierarchy</h2>
          <p>Click on any level to see details. Hover to see what levels it can reference.</p>
        </div>

        <div className="levels-container">
          {levels.map((level) => (
            <div
              key={level.id}
              data-test={`level-${level.id}`}
              className={`level ${expandedLevel === level.id ? 'expanded' : ''} ${
                hoveredLevel !== null && level.references.includes(hoveredLevel) ? 'highlighted' : ''
              }`}
              onClick={() => toggleLevel(level.id)}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              onKeyDown={(e) => handleKeyPress(e, level.id)}
              tabIndex={0}
              role="button"
              aria-expanded={expandedLevel === level.id}
              aria-describedby={`level-${level.id}-desc`}
            >
              <div className="level-header">
                <div className="level-number">{level.id}</div>
                <div className="level-info">
                  <h3 className="level-name">{level.name}</h3>
                  <p className="level-brief">
                    {level.id === 1 && "Foundation of your product"}
                    {level.id === 2 && "Facts and constraints"}
                    {level.id === 3 && "User interactions"}
                    {level.id === 4 && "System architecture"}
                    {level.id === 5 && "Technical details"}
                  </p>
                </div>
                <div className="level-indicator">
                  {expandedLevel === level.id ? '−' : '+'}
                </div>
              </div>

              {expandedLevel === level.id && (
                <div
                  data-test={`level-${level.id}-expanded`}
                  className="level-details"
                  id={`level-${level.id}-desc`}
                >
                  <div data-test={`level-${level.id}-details`} className="level-description">
                    <p>{level.description}</p>
                  </div>
                  <div className="level-examples">
                    <h4>Examples:</h4>
                    <ul>
                      {level.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  {level.references.length > 0 && (
                    <div className="level-references">
                      <h4>Can reference:</h4>
                      <div className="reference-badges">
                        {level.references.map((refId) => (
                          <span key={refId} className="reference-badge">
                            Level {refId}: {levels.find(l => l.id === refId)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {hoveredLevel && (
          <div data-test="reference-highlights" className="reference-info">
            <p>Level {hoveredLevel} can reference: {
              levels.find(l => l.id === hoveredLevel)?.references.join(', ') || 'None (foundation level)'
            }</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .hierarchy-explorer {
          background: var(--bg-secondary);
          padding: var(--spacing-3xl) 0;
        }

        .explorer-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .explorer-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .explorer-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .explorer-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .levels-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          max-width: 800px;
          margin: 0 auto;
        }

        .level {
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .level:hover {
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.1);
          transform: translateY(-2px);
        }

        .level:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .level.highlighted {
          border-color: var(--color-success);
          background: rgba(5, 150, 105, 0.05);
        }

        .level-header {
          display: flex;
          align-items: center;
          padding: var(--spacing-lg);
          gap: var(--spacing-md);
        }

        .level-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: var(--color-primary);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .level-info {
          flex: 1;
        }

        .level-name {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .level-brief {
          color: var(--text-secondary);
          margin: 0;
        }

        .level-indicator {
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--text-secondary);
          width: 24px;
          text-align: center;
          flex-shrink: 0;
        }

        .level-details {
          padding: 0 var(--spacing-lg) var(--spacing-lg);
          border-top: 1px solid var(--border-color);
          animation: fadeIn 0.3s ease;
        }

        .level-description {
          margin-bottom: var(--spacing-lg);
        }

        .level-description p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0;
        }

        .level-examples, .level-references {
          margin-bottom: var(--spacing-md);
        }

        .level-examples h4, .level-references h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }

        .level-examples ul {
          margin: 0;
          padding-left: var(--spacing-lg);
          color: var(--text-secondary);
        }

        .level-examples li {
          margin-bottom: var(--spacing-xs);
        }

        .reference-badges {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .reference-badge {
          background: var(--color-success);
          color: white;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .reference-info {
          text-align: center;
          margin-top: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--bg-primary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .reference-info p {
          margin: 0;
          color: var(--text-secondary);
          font-weight: 500;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .explorer-header h2 {
            font-size: 2rem;
          }

          .level-header {
            padding: var(--spacing-md);
          }

          .level-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .level-name {
            font-size: 1.25rem;
          }

          .reference-badges {
            flex-direction: column;
          }

          .reference-badge {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}