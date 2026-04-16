import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://demos.rootspec.dev',
  base: '/demos/greenfield',
  integrations: [react(), tailwind()],
  server: {
    port: 3000,
    host: true,
  },
});
