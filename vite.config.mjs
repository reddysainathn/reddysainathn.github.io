import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';

const commitHash = (() => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
})();
const buildDate = new Date().toISOString().slice(0, 10);

// https://vite.dev/config/
// base './' keeps asset paths relative so the build works on
// GitHub Pages (reddysainathn.github.io) with no extra config.
export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    __COMMIT__: JSON.stringify(commitHash),
    __BUILD_TIME__: JSON.stringify(buildDate),
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
