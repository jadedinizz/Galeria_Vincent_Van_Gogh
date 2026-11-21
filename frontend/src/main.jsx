import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import '@fontsource-variable/montserrat';
import './styles/tema.css';
import './styles/interface.css';
import './estilo.css';

createRoot(document.getElementById('root')).render(<App />);
