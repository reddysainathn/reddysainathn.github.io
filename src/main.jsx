import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { initAnalytics } from './lib/events';

const rootElement = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production ships prerendered HTML → hydrate it. Dev serves an empty
// root → render fresh instead of tripping a hydration mismatch.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}

// Deferred to idle so measurement never costs first paint.
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  window.requestIdleCallback(() => initAnalytics(), { timeout: 2000 });
} else {
  window.addEventListener('load', () => initAnalytics());
}
