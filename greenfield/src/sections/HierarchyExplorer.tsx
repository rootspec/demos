import React, { useState } from 'react';
import { levels, type HierarchyLevel } from '../data/hierarchy';

export default function HierarchyExplorer() {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [focusedLevel, setFocusedLevel] = useState<number | null>(null);

  const handleLevelClick = (levelId: number) => {
    setExpandedLevel(expandedLevel === levelId ? null : levelId);
  };

  const handleKeyPress = (event: React.KeyboardEvent, levelId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLevelClick(levelId);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextLevel = Math.min(levelId + 1, 5);
      const nextElement = document.querySelector(`[data-test="level-${nextLevel}"]`) as HTMLElement;
      nextElement?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevLevel = Math.max(levelId - 1, 1);
      const prevElement = document.querySelector(`[data-test="level-${prevLevel}"]`) as HTMLElement;
      prevElement?.focus();
    }
  };

  const isHighlighted = (levelId: number) => {
    if (hoveredLevel === null) return false;
    const hoveredLevel_ = levels.find(l => l.id === hoveredLevel);
    return hoveredLevel_.allowedReferences.includes(levelId) || levelId === hoveredLevel;
  };

  return (
    <div data-test="hierarchy-explorer" className="max-w-6xl mx-auto" id="explorer">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore the Five-Level Hierarchy
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Click on any level to see example content. Hover to see reference relationships.
          Each level can only reference levels above it, creating a stable hierarchy.
        </p>
      </div>

      {/* Reference Arrows - shown when hovering */}
      {hoveredLevel !== null && (
        <div
          data-test="reference-arrows"
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)`
          }}
        />
      )}

      <div className="space-y-4 relative">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`relative transition-all duration-250 ${
              isHighlighted(level.id) ? 'highlighted' : ''
            }`}
          >
            <button
              data-test={`level-${level.id}`}
              className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 min-h-[44px] ${
                expandedLevel === level.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              } ${
                isHighlighted(level.id)
                  ? 'ring-2 ring-blue-300 dark:ring-blue-600 bg-blue-50 dark:bg-blue-900/30'
                  : ''
              }`}
              onClick={() => handleLevelClick(level.id)}
              onKeyDown={(e) => handleKeyPress(e, level.id)}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              onFocus={() => setFocusedLevel(level.id)}
              onBlur={() => setFocusedLevel(null)}
              tabIndex={0}
              aria-expanded={expandedLevel === level.id}
              aria-controls={`level-${level.id}-content`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{level.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      L{level.id}: {level.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {level.subtitle}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedLevel === level.id ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedLevel === level.id && (
              <div
                data-test={`level-${level.id}-content`}
                id={`level-${level.id}-content`}
                className="mt-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 opacity-100 transition-opacity duration-250"
              >
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-white dark:bg-gray-800 p-4 rounded border">
                    {level.exampleContent}
                  </pre>
                </div>

                {level.allowedReferences.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Can reference:</strong>
                    </p>
                    <div className="flex space-x-2">
                      {level.allowedReferences.map((refId) => {
                        const refLevel = levels.find(l => l.id === refId);
                        return (
                          <span
                            key={refId}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                          >
                            {refLevel?.icon} L{refId}
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
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Navigation:</strong> Use Tab/Shift+Tab or arrow keys to navigate. Press Enter to expand/collapse.
        </p>
      </div>
    </div>
  );
}