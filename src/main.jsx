import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import { CalendarApp } from './CalendarApp.jsx';

console.log(import.meta.env.VITE_API_URL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>
);
