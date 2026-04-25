import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  base: '/demos/greenfield',
  integrations: [react()],
  server: {
    port: 4321,
  },
});
