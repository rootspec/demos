import React, { useState } from 'react';
import { withoutSpec, withSpec } from '../data/comparison';

export default function Comparison() {
  const [activeView, setActiveView] = useState<'before' | 'after'>('before');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Before vs. After RootSpec
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          See the difference between traditional requirements and structured specifications.
          No lorem ipsum here — these are real examples from actual projects.
        </p>
      </div>

      {/* Toggle Control */}
      <div className="flex justify-center mb-8">
        <div
          data-test="comparison-toggle"
          className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex"
          role="tablist"
          aria-label="Comparison view selector"
        >
          <button
            onClick={() => setActiveView('before')}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeView === 'before'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            role="tab"
            aria-selected={activeView === 'before'}
            aria-controls="before-content"
          >
            Traditional Approach
          </button>
          <button
            onClick={() => setActiveView('after')}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeView === 'after'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            role="tab"
            aria-selected={activeView === 'after'}
            aria-controls="after-content"
          >
            RootSpec Approach
          </button>
        </div>
      </div>

      {/* Comparison Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Before Content (Traditional) */}
        <div
          data-test="before-content"
          id="before-content"
          role="tabpanel"
          aria-labelledby="before-tab"
          className={`${
            activeView === 'before' ? 'lg:block' : 'hidden lg:block'
          } ${activeView === 'before' ? 'opacity-100' : 'opacity-50 lg:opacity-100'} transition-opacity duration-200`}
        >
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">😰</span>
              <div>
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
                  Before: Vague Requirements
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Ambiguous, incomplete, constantly changing
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-red-950/30 rounded border p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                {withoutSpec}
              </pre>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <strong>Problems:</strong>
              </div>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1 ml-6 list-disc">
                <li>Every developer interprets "nice" differently</li>
                <li>No clear success criteria for features</li>
                <li>Open questions block development</li>
                <li>No connection between features and goals</li>
                <li>Testing becomes guesswork</li>
              </ul>
            </div>
          </div>
        </div>

        {/* After Content (RootSpec) */}
        <div
          data-test="after-content"
          id="after-content"
          role="tabpanel"
          aria-labelledby="after-tab"
          className={`${
            activeView === 'after' ? 'lg:block' : 'hidden lg:block'
          } ${activeView === 'after' ? 'opacity-100' : 'opacity-50 lg:opacity-100'} transition-opacity duration-200`}
        >
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">✨</span>
              <div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                  After: Structured Hierarchy
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Clear, testable, traceable to principles
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-green-950/30 rounded border p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                {withSpec}
              </pre>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <strong>Benefits:</strong>
              </div>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-1 ml-6 list-disc">
                <li>Every feature traces to design principles</li>
                <li>Acceptance criteria are automatically testable</li>
                <li>No ambiguous requirements or interpretations</li>
                <li>Clear system boundaries and interactions</li>
                <li>Implementation has built-in validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Summary */}
      <div className="lg:hidden mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tap the buttons above to switch between traditional requirements and RootSpec approach.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Leave Vague Requirements Behind?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Experience the difference structured specifications make for your development process.
          </p>
          <a
            href="#wizard"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold"
          >
            Try the Spec Wizard
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}