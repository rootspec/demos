import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    document.documentElement.classList.toggle('light', !shouldBeDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);

    document.documentElement.classList.toggle('dark', newDark);
    document.documentElement.classList.toggle('light', !newDark);

    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  // Don't render until hydrated to prevent flash
  if (!mounted) {
    return (
      <button
        data-test="theme-toggle"
        data-hydrated="false"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        disabled
      >
        <span className="w-5 h-5 block">🌙</span>
      </button>
    );
  }

  return (
    <button
      data-test="theme-toggle"
      data-hydrated="true"
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="w-5 h-5 block" role="img" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}