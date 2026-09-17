import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// base './' keeps asset paths relative so the build works on
// GitHub Pages (reddysainathn.github.io) with no extra config.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
