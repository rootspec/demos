import { useState } from 'react';

interface WizardState {
  currentStep: number;
  mission: string;
  selectedPillars: string[];
  interaction: string;
}

const designPillars = [
  { id: 'clarity', label: 'Clarity', description: 'Clear and understandable' },
  { id: 'purpose', label: 'Purpose', description: 'Purposeful and intentional' },
  { id: 'evidence', label: 'Evidence', description: 'Evidence-based decisions' },
  { id: 'simplicity', label: 'Simplicity', description: 'Simple and elegant' },
  { id: 'consistency', label: 'Consistency', description: 'Consistent patterns' },
  { id: 'accessibility', label: 'Accessibility', description: 'Accessible to all' }
];

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>({
    currentStep: 1,
    mission: '',
    selectedPillars: [],
    interaction: ''
  });
  const [showGeneratedSpec, setShowGeneratedSpec] = useState(false);

  const updateMission = (mission: string) => {
    setState(prev => ({ ...prev, mission }));
  };

  const togglePillar = (pillarId: string) => {
    setState(prev => ({
      ...prev,
      selectedPillars: prev.selectedPillars.includes(pillarId)
        ? prev.selectedPillars.filter(p => p !== pillarId)
        : [...prev.selectedPillars, pillarId]
    }));
  };

  const updateInteraction = (interaction: string) => {
    setState(prev => ({ ...prev, interaction }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const finishWizard = () => {
    setShowGeneratedSpec(true);
  };

  const canProceed = () => {
    switch (state.currentStep) {
      case 1: return state.mission.length > 10;
      case 2: return state.selectedPillars.length >= 2;
      case 3: return state.interaction.length > 10;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <div data-test="wizard-step-1">
            <h3 data-test="step-title">Define your mission</h3>
            <p>What is the core purpose of your software project?</p>
            <textarea
              data-test="mission-input"
              value={state.mission}
              onChange={(e) => updateMission(e.target.value)}
              placeholder="Enter your mission statement..."
              rows={4}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '2px solid var(--border-gray)' }}
            />
          </div>
        );

      case 2:
        return (
          <div data-test="wizard-step-2">
            <h3 data-test="step-title">Choose design pillars</h3>
            <p>Select 2-4 design principles that will guide your project:</p>
            <div data-test="pillars-selection" style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              {designPillars.map(pillar => (
                <button
                  key={pillar.id}
                  data-test={`pillar-${pillar.id}`}
                  onClick={() => togglePillar(pillar.id)}
                  className={state.selectedPillars.includes(pillar.id) ? 'selected' : ''}
                  style={{
                    padding: '0.75rem',
                    border: '2px solid var(--border-gray)',
                    borderRadius: '0.5rem',
                    backgroundColor: state.selectedPillars.includes(pillar.id) ? 'var(--primary-blue)' : 'var(--bg-light)',
                    color: state.selectedPillars.includes(pillar.id) ? 'white' : 'var(--text-dark)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <strong>{pillar.label}</strong>
                  <br />
                  <small>{pillar.description}</small>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div data-test="wizard-step-3">
            <h3 data-test="step-title">Key interaction</h3>
            <p>Describe the most important user interaction in your software:</p>
            <textarea
              data-test="interaction-input"
              value={state.interaction}
              onChange={(e) => updateInteraction(e.target.value)}
              placeholder="Describe a key user interaction..."
              rows={4}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '2px solid var(--border-gray)' }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (showGeneratedSpec) {
    return (
      <div data-test="generated-spec" style={{ padding: '2rem', border: '2px solid var(--primary-blue)', borderRadius: '0.75rem', backgroundColor: 'var(--bg-gray)' }}>
        <h3>Generated RootSpec Skeleton</h3>
        <div style={{ fontFamily: 'monospace', backgroundColor: 'var(--bg-light)', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <div><strong>L1: Philosophy</strong></div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Mission: {state.mission}</div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Design Pillars: {state.selectedPillars.map(id => designPillars.find(p => p.id === id)?.label).join(', ')}</div>
          <br />
          <div><strong>L2: Truths</strong></div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Clarity: Requirements must be unambiguous</div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Purpose: Every feature serves the mission</div>
          <br />
          <div><strong>L3: Interactions</strong></div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Key Flow: {state.interaction}</div>
          <br />
          <div><strong>L4: Systems</strong></div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Core systems to be defined...</div>
          <br />
          <div><strong>L5: Implementation</strong></div>
          <div style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>User stories to be defined...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="spec-wizard" data-test="spec-wizard">
      <div className="wizard-header">
        <div data-test="step-indicator">{state.currentStep}/3</div>
        <h2>Spec Your Idea</h2>
      </div>

      <div className="wizard-content">
        {renderStep()}
      </div>

      <div className="wizard-controls">
        {state.currentStep > 1 && (
          <button
            data-test="wizard-back"
            onClick={prevStep}
            style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--border-gray)',
              backgroundColor: 'var(--bg-light)',
              color: 'var(--text-dark)',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Back
          </button>
        )}

        {state.currentStep < 3 ? (
          <button
            data-test="wizard-next"
            onClick={nextStep}
            disabled={!canProceed()}
            className={canProceed() ? '' : 'disabled'}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              backgroundColor: canProceed() ? 'var(--primary-blue)' : 'var(--border-gray)',
              color: 'white',
              borderRadius: '0.5rem',
              cursor: canProceed() ? 'pointer' : 'not-allowed'
            }}
          >
            Next
          </button>
        ) : (
          <button
            data-test="wizard-finish"
            onClick={finishWizard}
            disabled={!canProceed()}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              backgroundColor: canProceed() ? 'var(--primary-blue)' : 'var(--border-gray)',
              color: 'white',
              borderRadius: '0.5rem',
              cursor: canProceed() ? 'pointer' : 'not-allowed'
            }}
          >
            Generate Spec
          </button>
        )}
      </div>

      <style jsx>{`
        .spec-wizard {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          border: 2px solid var(--border-gray);
          border-radius: 0.75rem;
          background-color: var(--bg-light);
        }

        .wizard-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .wizard-header div {
          background-color: var(--primary-blue);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .wizard-header h2 {
          margin: 0;
          color: var(--text-dark);
        }

        .wizard-content {
          margin: 2rem 0;
        }

        .wizard-content h3 {
          margin: 0 0 0.5rem;
          color: var(--text-dark);
        }

        .wizard-content p {
          color: var(--text-light);
          margin-bottom: 1rem;
        }

        .wizard-controls {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
        }

        .selected {
          background-color: var(--primary-blue) !important;
          color: white !important;
        }

        .disabled {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}