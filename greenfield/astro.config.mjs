import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  integrations: [react(), tailwind()],
  base: isDev ? '/' : '/demos/greenfield',
  server: {
    port: 3000,
    host: true,
  },
  output: 'static',
});
