/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      colors: {
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          dark: '#60a5fa',
          'dark-hover': '#93bbfd',
        },
      },
    },
  },
  plugins: [],
};
