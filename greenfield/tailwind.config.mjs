/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7c3aed',
          blue: '#2563eb',
          cyan: '#0891b2',
        },
      },
    },
  },
  plugins: [],
};
