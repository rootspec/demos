import { useState } from 'react';

interface ComparisonContent {
  title: string;
  items: string[];
}

const withoutRootSpec: ComparisonContent = {
  title: 'Without RootSpec',
  items: [
    'Vague requirements that change frequently',
    'Miscommunication between stakeholders',
    'Features built that nobody wanted',
    'Technical debt accumulates quickly',
    'Testing is an afterthought',
    'Project scope creeps constantly',
    'Teams work in isolation',
    'Documentation becomes outdated'
  ]
};

const withRootSpec: ComparisonContent = {
  title: 'With RootSpec',
  items: [
    'Structured hierarchy guides decisions',
    'Clear communication through levels',
    'Features aligned with user needs',
    'Technical decisions based on principles',
    'Test-driven from the beginning',
    'Scope defined by interactions',
    'Teams aligned around common truth',
    'Living specification stays current'
  ]
};

export default function Comparison() {
  const [activeView, setActiveView] = useState<'without' | 'with'>('without');
  const [sliderPosition, setSliderPosition] = useState(0);

  const toggleView = (view: 'without' | 'with') => {
    setActiveView(view);
    setSliderPosition(view === 'with' ? 100 : 0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderPosition(value);
    setActiveView(value > 50 ? 'with' : 'without');
  };

  const currentContent = activeView === 'with' ? withRootSpec : withoutRootSpec;

  return (
    <div data-test="comparison-section" className="comparison">
      <div className="comparison-content">
        <div className="comparison-header">
          <h2>See the Difference</h2>
          <p>Compare building software with and without a structured specification methodology</p>
        </div>

        <div className="comparison-controls">
          <button
            data-test="toggle-without"
            className={`toggle-btn ${activeView === 'without' ? 'active' : ''}`}
            onClick={() => toggleView('without')}
          >
            Without RootSpec
          </button>

          <div className="slider-container">
            <input
              type="range"
              data-test="comparison-slider"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="comparison-slider"
              aria-label="Comparison slider"
            />
            <div className="slider-track">
              <div
                className="slider-fill"
                style={{ width: `${sliderPosition}%` }}
              />
            </div>
          </div>

          <button
            data-test="toggle-with"
            className={`toggle-btn ${activeView === 'with' ? 'active' : ''}`}
            onClick={() => toggleView('with')}
          >
            With RootSpec
          </button>
        </div>

        <div className="comparison-display">
          <div
            data-test="comparison-content"
            className={`content-panel ${activeView}`}
          >
            <h3>{currentContent.title}</h3>
            <div className="content-grid">
              {currentContent.items.map((item, index) => (
                <div key={index} className="content-item">
                  <div className="item-icon">
                    {activeView === 'with' ? '✅' : '❌'}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="comparison-summary">
          <div className="summary-card">
            <h4>The Result</h4>
            <p>
              {activeView === 'with'
                ? 'Teams build the right thing, the right way, with confidence and clarity.'
                : 'Teams struggle with uncertainty, rework, and misaligned priorities.'
              }
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .comparison {
          background: var(--bg-secondary);
          padding: var(--spacing-3xl) 0;
        }

        .comparison-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .comparison-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .comparison-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .comparison-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .comparison-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-3xl);
          flex-wrap: wrap;
        }

        .toggle-btn {
          padding: var(--spacing-md) var(--spacing-lg);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 140px;
        }

        .toggle-btn:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        .toggle-btn.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .toggle-btn:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .slider-container {
          position: relative;
          width: 200px;
        }

        .comparison-slider {
          width: 100%;
          height: 8px;
          background: transparent;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .comparison-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3);
        }

        .comparison-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3);
        }

        .slider-track {
          position: absolute;
          top: 8px;
          left: 0;
          right: 0;
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          pointer-events: none;
        }

        .slider-fill {
          height: 100%;
          background: linear-gradient(to right, var(--color-error), var(--color-primary));
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .comparison-display {
          margin-bottom: var(--spacing-xl);
        }

        .content-panel {
          background: var(--bg-primary);
          border-radius: 16px;
          padding: var(--spacing-xl);
          border: 2px solid var(--border-color);
          transition: all 0.5s ease;
          min-height: 400px;
        }

        .content-panel.with {
          border-color: var(--color-success);
          background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(5, 150, 105, 0.02) 100%);
        }

        .content-panel.without {
          border-color: var(--color-error);
          background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(220, 38, 38, 0.02) 100%);
        }

        .content-panel h3 {
          font-size: 1.75rem;
          font-weight: 600;
          text-align: center;
          margin: 0 0 var(--spacing-xl) 0;
          color: var(--text-primary);
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .content-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .content-item:hover {
          transform: translateY(-2px);
        }

        .item-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .content-item p {
          margin: 0;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .comparison-summary {
          display: flex;
          justify-content: center;
        }

        .summary-card {
          background: var(--bg-primary);
          border: 2px solid var(--color-primary);
          border-radius: 12px;
          padding: var(--spacing-xl);
          text-align: center;
          max-width: 500px;
        }

        .summary-card h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .summary-card p {
          font-size: 1.125rem;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .comparison-header h2 {
            font-size: 2rem;
          }

          .comparison-controls {
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .slider-container {
            order: -1;
            width: 100%;
            max-width: 300px;
          }

          .toggle-btn {
            width: 100%;
            max-width: 200px;
          }

          .content-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .content-panel {
            padding: var(--spacing-lg);
            min-height: 300px;
          }

          .summary-card {
            padding: var(--spacing-lg);
          }
        }

        @media (max-width: 480px) {
          .content-item {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-sm);
          }

          .item-icon {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
}