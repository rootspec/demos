import { useState } from 'react';
import { withoutSpec, withSpec } from '../data/comparison';

export default function Comparison() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  return (
    <div data-test="before-after-comparison" className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Before & After RootSpec</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See the difference between traditional requirements and structured specifications.
          Drag the slider to reveal the transformation.
        </p>
      </div>

      {/* Slider Control */}
      <div className="mb-8">
        <input
          data-test="comparison-slider"
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Without RootSpec</span>
          <span>With RootSpec</span>
        </div>
      </div>

      {/* Comparison Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Without Spec */}
        <div
          className={`transition-opacity duration-300 ${
            sliderValue > 50 ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
              😵 Without RootSpec
            </h3>
            <div
              data-test="without-spec-content"
              className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-sm whitespace-pre-line max-h-80 overflow-y-auto"
            >
              {withoutSpec}
            </div>
            <div className="mt-4 space-y-2 text-sm text-red-700 dark:text-red-300">
              <p>❌ <strong>Vague requirements</strong> lead to confused implementations</p>
              <p>❌ Disconnected notes and random decisions</p>
              <p>❌ No clear testing strategy</p>
              <p>❌ Requirements drift over time</p>
            </div>
          </div>
        </div>

        {/* With Spec */}
        <div
          className={`transition-opacity duration-300 ${
            sliderValue < 50 ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              ✨ With RootSpec
            </h3>
            <div
              data-test="with-spec-content"
              className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-sm whitespace-pre-line max-h-80 overflow-y-auto"
            >
              {withSpec}
            </div>
            <div className="mt-4 space-y-2 text-sm text-green-700 dark:text-green-300">
              <p>✅ <strong>Structured hierarchy</strong> ensures nothing is missed</p>
              <p>✅ Every decision traces back to core principles</p>
              <p>✅ <strong>Testable stories</strong> with clear acceptance criteria</p>
              <p>✅ Living documentation that evolves with code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}