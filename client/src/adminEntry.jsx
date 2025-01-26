import React from 'react';
import { createRoot } from 'react-dom/client';
import Admin from './pages/Admin';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>
);