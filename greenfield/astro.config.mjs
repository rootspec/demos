import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://rootspec.github.io',
  base: '/demos/greenfield',
  integrations: [react()],
  server: {
    port: 3000,
  },
  vite: {},
});
