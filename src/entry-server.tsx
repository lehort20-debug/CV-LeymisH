import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Used only at build time by scripts/prerender.mjs to bake the page
// content into dist/index.html, so crawlers that don't run JS see the CV.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
