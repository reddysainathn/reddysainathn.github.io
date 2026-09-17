import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { initAnalytics } from './lib/analytics';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Deferred to idle so measurement never costs first paint.
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  window.requestIdleCallback(() => initAnalytics(), { timeout: 2000 });
} else {
  window.addEventListener('load', () => initAnalytics());
}
