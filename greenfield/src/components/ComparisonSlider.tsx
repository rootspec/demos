import { useState } from 'react';

export default function ComparisonSlider() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(e.target.value));
  };

  return (
    <div className="comparison-slider" data-test="comparison-slider">
      <h3>Before vs After Specification</h3>

      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          data-test="slider-control"
          onChange={handleSliderChange}
          className="slider"
        />

        <div className="comparison-content">
          <div
            className="before-content"
            data-test="before-content"
            style={{
              opacity: 1 - (sliderValue / 100),
              transform: `translateX(${sliderValue * 0.5}px)`
            }}
          >
            <h4>Before RootSpec</h4>
            <ul>
              <li>Vague requirements that change constantly</li>
              <li>Philosophy-implementation gap</li>
              <li>Manual testing processes</li>
              <li>Inconsistent AI outputs</li>
              <li>Scope creep and budget overruns</li>
            </ul>
          </div>

          <div
            className="after-content"
            data-test="after-content"
            style={{
              opacity: sliderValue / 100,
              transform: `translateX(-${(100 - sliderValue) * 0.5}px)`
            }}
          >
            <h4>After RootSpec</h4>
            <ul>
              <li>Structured hierarchy of requirements</li>
              <li>Clear philosophy-to-code traceability</li>
              <li>Automated test generation</li>
              <li>Reliable AI-assisted development</li>
              <li>Predictable delivery timeline</li>
            </ul>
          </div>
        </div>

        <div className="slider-labels">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>

      <style jsx>{`
        .comparison-slider {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          border: 2px solid var(--border-gray);
          border-radius: 0.75rem;
          background-color: var(--bg-light);
        }

        .comparison-slider h3 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-dark);
        }

        .slider-container {
          position: relative;
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background-color: var(--border-gray);
          outline: none;
          margin-bottom: 2rem;
          cursor: pointer;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--primary-blue);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--primary-blue);
          border: none;
          cursor: pointer;
        }

        .comparison-content {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .before-content,
        .after-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          border-radius: 0.5rem;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .before-content {
          background-color: #fef2f2;
          border: 2px solid #fecaca;
        }

        .before-content h4 {
          color: #b91c1c;
          margin-bottom: 1rem;
        }

        .after-content {
          background-color: #f0fdf4;
          border: 2px solid #bbf7d0;
        }

        .after-content h4 {
          color: #166534;
          margin-bottom: 1rem;
        }

        .comparison-content ul {
          list-style: none;
          padding: 0;
        }

        .comparison-content li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;
        }

        .before-content li::before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #b91c1c;
        }

        .after-content li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #166534;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          color: var(--text-light);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}