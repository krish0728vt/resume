import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://krish0728vt.github.io',
  base: '/resume',
  trailingSlash: 'ignore',
  build: { format: 'directory' }
});
