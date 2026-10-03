/* ================================================================
   CLIENTIVITY — Main Entry Point & SW Registration
   ================================================================ */

import './styles.css';
import { renderApp } from './app.js';
import { registerSW } from 'virtual:pwa-register';

// Initialize App Shell
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

// Register PWA Service Worker for offline capability & prompt handling
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, refreshing...');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});
