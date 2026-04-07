import { useState } from 'react';

export default function Comparison() {
  const [showAfter, setShowAfter] = useState(false);

  const toggleComparison = () => {
    setShowAfter(prev => !prev);
  };

  return (
    <section data-test="comparison-section" className={`comparison ${showAfter ? 'after-mode' : 'before-mode'}`}>
      <div className="comparison-container">
        <h2 className="comparison-title">Before vs After RootSpec</h2>

        <p className="comparison-intro">
          See the difference between traditional specification approaches and RootSpec's structured methodology.
        </p>

        <div className="comparison-controls">
          <button
            data-test="comparison-toggle"
            onClick={toggleComparison}
            className="comparison-toggle"
            aria-label={`Switch to ${showAfter ? 'before' : 'after'} view`}
          >
            {showAfter ? 'Show Before' : 'Show After'}
          </button>
        </div>

        <div data-test="comparison-content" className="comparison-content">
          <div data-test="before-panel" className={`comparison-panel before-panel ${!showAfter ? 'active' : ''}`}>
            <h3 className="panel-title">Before RootSpec</h3>
            <div className="panel-content">
              <div className="spec-example">
                <h4>Product Requirements Document</h4>
                <div className="chaotic-spec">
                  <p><strong>Goal:</strong> Build a social platform for sharing photos</p>
                  <p><em>vague requirements:</em></p>
                  <ul>
                    <li>"Users should be able to upload photos easily"</li>
                    <li>"The feed should be engaging and show relevant content"</li>
                    <li>"Performance should be good on mobile"</li>
                    <li>"Make it look modern and clean"</li>
                    <li>"Security is important"</li>
                  </ul>

                  <div className="problem-indicators">
                    <div className="problem">
                      <span className="problem-icon">⚠️</span>
                      <span>No clear philosophy</span>
                    </div>
                    <div className="problem">
                      <span className="problem-icon">❌</span>
                      <span>Implementation drift inevitable</span>
                    </div>
                    <div className="problem">
                      <span className="problem-icon">📄</span>
                      <span>Google Docs specs nobody reads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-test="after-panel" className={`comparison-panel after-panel ${showAfter ? 'active' : ''}`}>
            <h3 className="panel-title">After RootSpec</h3>
            <div className="panel-content">
              <div className="spec-example">
                <h4>structured hierarchy</h4>
                <div className="structured-spec">
                  <div className="spec-level">
                    <h5>L1: Philosophy</h5>
                    <p>Authentic human connection through intentional sharing</p>
                  </div>

                  <div className="spec-level">
                    <h5>L2: Truths</h5>
                    <ul>
                      <li>85% of usage happens on mobile</li>
                      <li>Users abandon apps after 3s load time</li>
                      <li>Privacy concerns drive platform choice</li>
                    </ul>
                  </div>

                  <div className="spec-level">
                    <h5>L3: Interactions</h5>
                    <ul>
                      <li>Photo upload → instant preview → contextual sharing</li>
                      <li>Feed browsing → meaningful discovery → connection prompts</li>
                    </ul>
                  </div>

                  <div className="success-indicators">
                    <div className="success">
                      <span className="success-icon">✅</span>
                      <span>Clear philosophy guides decisions</span>
                    </div>
                    <div className="success">
                      <span className="success-icon">🎯</span>
                      <span>Implementation stays aligned</span>
                    </div>
                    <div className="success">
                      <span className="success-icon">🔄</span>
                      <span>Living specification evolves with code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="comparison-summary">
          <p>
            <strong>Result:</strong> RootSpec transforms vague requirements into a <em>structured hierarchy</em> where
            every implementation decision can be traced back to core philosophy.
          </p>
        </div>
      </div>
    </section>
  );
}