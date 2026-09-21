import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.jsx';

export function render() {
  return renderToString(<App />);
}
