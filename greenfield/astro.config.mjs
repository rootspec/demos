import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://rootspec.github.io',
  base: '/demos/greenfield',
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});
