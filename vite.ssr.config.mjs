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

// Dedicated SSR config: always emits dist-ssr/prerender-entry.mjs,
// independent of Vite version defaults or package type.
export default defineConfig({
  plugins: [react()],
  define: {
    __COMMIT__: JSON.stringify(commitHash),
    __BUILD_TIME__: JSON.stringify(buildDate),
  },
  build: {
    ssr: 'src/prerender-entry.jsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    rollupOptions: {
      output: { entryFileNames: 'prerender-entry.mjs' },
    },
  },
});
