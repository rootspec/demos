import { useState } from 'react';

interface WizardState {
  step: number;
  mission: string;
  pillars: string[];
  interaction: string;
}

const missionTemplates = [
  "Build a social platform where authentic connections flourish through meaningful shared experiences",
  "Create a productivity tool that adapts to individual workflows while maintaining team coherence",
  "Develop a learning platform that makes complex subjects accessible through personalized paths",
  "Design a marketplace that connects local creators with their communities sustainably"
];

const pillarOptions = [
  "User-centric design", "Performance-first", "Privacy by design", "Accessibility always",
  "Mobile-native experience", "Offline capability", "Real-time collaboration", "Data transparency",
  "Sustainable growth", "Community-driven", "Developer-friendly", "Minimal complexity"
];

export default function SpecWizard() {
  const [isStarted, setIsStarted] = useState(false);
  const [wizardState, setWizardState] = useState<WizardState>({
    step: 1,
    mission: '',
    pillars: [],
    interaction: ''
  });

  const startWizard = () => {
    setIsStarted(true);
    setWizardState({ step: 1, mission: '', pillars: [], interaction: '' });
  };

  const nextStep = () => {
    setWizardState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const selectMission = (mission: string) => {
    setWizardState(prev => ({ ...prev, mission }));
  };

  const togglePillar = (pillar: string) => {
    setWizardState(prev => ({
      ...prev,
      pillars: prev.pillars.includes(pillar)
        ? prev.pillars.filter(p => p !== pillar)
        : [...prev.pillars, pillar]
    }));
  };

  const updateInteraction = (interaction: string) => {
    setWizardState(prev => ({ ...prev, interaction }));
  };

  const completeWizard = () => {
    setWizardState(prev => ({ ...prev, step: 4 }));
  };

  const generateSpecOutput = () => {
    return {
      philosophy: [
        `User experience drives every technical decision`,
        `${wizardState.mission.split(' ').slice(0, 5).join(' ')}... forms our north star`,
        `${wizardState.pillars[0]} ensures consistent quality`
      ],
      truths: [
        `Target users expect ${wizardState.interaction.split(' ')[0].toLowerCase()} functionality`,
        `Performance budget: < 3s initial load on mobile networks`,
        `Team capacity: 1-2 developers for MVP phase`
      ],
      interactions: [
        `Primary flow: ${wizardState.interaction}`,
        `Error handling: Clear feedback on failed operations`,
        `Success states: Immediate confirmation with next steps`
      ]
    };
  };

  if (!isStarted) {
    return (
      <section data-test="spec-wizard" className="spec-wizard">
        <div className="wizard-container">
          <h2 className="wizard-title">Try the Spec Wizard</h2>

          <p className="wizard-intro">
            Experience how RootSpec transforms a simple product idea into a structured specification.
            This interactive wizard will guide you through creating L1-L3 levels for your own product concept.
          </p>

          <button
            data-test="start-wizard"
            onClick={startWizard}
            className="start-wizard-btn"
          >
            Start Creating Your Spec
          </button>
        </div>
      </section>
    );
  }

  return (
    <section data-test="spec-wizard" className="spec-wizard">
      <div className="wizard-container">
        <div data-test="wizard-progress" className="wizard-progress" aria-label={`Progress: step ${wizardState.step} of 3`}>
          <div className="progress-steps">
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`progress-step ${step <= wizardState.step ? 'active' : ''}`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(wizardState.step / 3) * 100}%` }}
            />
          </div>
        </div>

        {wizardState.step === 1 && (
          <div data-test="wizard-step-1" className="wizard-step">
            <h3 className="step-title">Step 1: Define Your Mission</h3>
            <p className="step-description">
              Select or customize a mission statement that captures your product's core purpose.
            </p>

            <div className="mission-templates">
              {missionTemplates.map((template, index) => (
                <button
                  key={index}
                  data-test={`mission-template-${index + 1}`}
                  onClick={() => selectMission(template)}
                  className={`mission-template ${wizardState.mission === template ? 'selected' : ''}`}
                >
                  {template}
                </button>
              ))}
            </div>

            <div className="custom-mission">
              <label htmlFor="custom-mission">Or write your own:</label>
              <textarea
                id="custom-mission"
                value={wizardState.mission}
                onChange={(e) => selectMission(e.target.value)}
                placeholder="Describe your product's mission in 1-2 sentences..."
                className="custom-mission-input"
              />
            </div>

            {wizardState.mission && (
              <button
                data-test="next-step"
                onClick={nextStep}
                className="next-step-btn"
              >
                Continue to Design Pillars
              </button>
            )}
          </div>
        )}

        {wizardState.step === 2 && (
          <div data-test="wizard-step-2" className="wizard-step">
            <h3 className="step-title">Step 2: Choose Design Pillars</h3>
            <p className="step-description">
              Select 3-5 design pillars that will guide your implementation decisions.
            </p>

            <div className="pillars-grid">
              {pillarOptions.map((pillar, index) => (
                <button
                  key={index}
                  data-test={`pillar-option-${index + 1}`}
                  onClick={() => togglePillar(pillar)}
                  className={`pillar-option ${wizardState.pillars.includes(pillar) ? 'selected' : ''}`}
                >
                  {pillar}
                </button>
              ))}
            </div>

            <div className="selected-pillars">
              <h4>Selected pillars ({wizardState.pillars.length}):</h4>
              <div className="pillars-list">
                {wizardState.pillars.map((pillar, index) => (
                  <span key={index} className="selected-pillar">
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            {wizardState.pillars.length >= 3 && (
              <button
                data-test="next-step"
                onClick={nextStep}
                className="next-step-btn"
              >
                Continue to Key Interaction
              </button>
            )}
          </div>
        )}

        {wizardState.step === 3 && (
          <div data-test="wizard-step-3" className="wizard-step">
            <h3 className="step-title">Step 3: Describe Key Interaction</h3>
            <p className="step-description">
              Describe the most important user interaction in your product.
            </p>

            <div className="interaction-input">
              <label htmlFor="key-interaction">Key interaction:</label>
              <textarea
                id="key-interaction"
                data-test="interaction-input"
                value={wizardState.interaction}
                onChange={(e) => updateInteraction(e.target.value)}
                placeholder="e.g., User uploads a photo and gets instant feedback"
                className="interaction-textarea"
              />
            </div>

            {wizardState.interaction && (
              <button
                data-test="complete-wizard"
                onClick={completeWizard}
                className="complete-wizard-btn"
              >
                Generate Specification
              </button>
            )}
          </div>
        )}

        {wizardState.step === 4 && (
          <div data-test="spec-output" className="spec-output">
            <h3 className="output-title">Your Generated Specification</h3>

            <div className="spec-levels">
              <div className="spec-level">
                <h4 className="spec-level-title">L1: Philosophy</h4>
                <ul>
                  {generateSpecOutput().philosophy.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="spec-level">
                <h4 className="spec-level-title">L2: Truths</h4>
                <ul>
                  {generateSpecOutput().truths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="spec-level">
                <h4 className="spec-level-title">L3: Interactions</h4>
                <ul>
                  {generateSpecOutput().interactions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="output-actions">
              <button
                onClick={() => setIsStarted(false)}
                className="restart-wizard-btn"
              >
                Try Another Product
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}