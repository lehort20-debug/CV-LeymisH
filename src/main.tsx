import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production HTML is prerendered (scripts/prerender.mjs) with default data.
// Hydrate it for normal visitors; if this browser has local edits or is in
// ?edit mode, the first render would differ, so render from scratch instead.
const hasLocalState = (() => {
  try {
    return Object.keys(localStorage).some(
      (k) => k.startsWith('leymis_') || k.startsWith('cv_landing_portfolio'),
    );
  } catch {
    return false;
  }
})();
const isEditMode = /[?&]edit=(1|true)\b/.test(window.location.search);
const isPrerendered = container.firstElementChild !== null;

if (isPrerendered && !hasLocalState && !isEditMode) {
  hydrateRoot(container, app);
} else {
  container.innerHTML = '';
  createRoot(container).render(app);
}
