import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// Create root and render the App
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
