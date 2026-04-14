import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://rootspec.github.io',
  base: isProd ? '/demos/greenfield' : '/',
  integrations: [
    react(),
    tailwind(),
  ],
  server: {
    port: 3000,
  },
});
