/* ================================================================
   CLIENTIVITY — Settings & PWA Management Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { showToast } from '../utils.js';
import { refresh } from '../app.js';

let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
});

export function renderSettings() {
  const settings = store.getSettings();
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  return `
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">App Settings & PWA</h1>
        <p class="text-sm text-secondary">Customize your theme, manage offline data & install PWA</p>
      </div>

      <!-- Android / Samsung PWA Installation Card -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5);background:linear-gradient(135deg, rgba(78,168,246,0.15), rgba(108,92,231,0.1));border:1px solid rgba(78,168,246,0.3)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <div class="flex items-center gap-2">
            ${icon('download', 20)}
            <span class="font-bold text-sm">Android / Samsung PWA Status</span>
          </div>
          <span class="badge ${isStandalone ? 'badge-fitness' : 'badge-work'}">
            ${isStandalone ? 'Installed (Standalone)' : 'Browser Mode'}
          </span>
        </div>

        <p class="text-xs text-secondary" style="margin-bottom:var(--sp-3)">
          Clientivity is fully optimized for Samsung & Android phones as a native-feel Web App without requiring Play Store downloads.
        </p>

        ${isStandalone ? `
          <div class="flex items-center gap-2 text-xs font-semibold text-success">
            ${icon('check', 14)} Running in Standalone App Mode!
          </div>
        ` : `
          <div class="flex flex-col gap-2">
            <button class="btn btn-primary btn-sm" id="btn-pwa-install" style="width:100%">
              ${icon('download', 16)} Install Clientivity PWA to Home Screen
            </button>
            <div class="card" style="padding:var(--sp-3);background:var(--bg-card);border:1px dashed var(--b-medium)">
              <p class="text-xs font-semibold" style="margin-bottom:4px">Manual Install Instructions for Samsung & Chrome:</p>
              <ol class="text-xs text-secondary" style="padding-left:16px;margin:0;line-height:1.5">
                <li>Tap Chrome / Samsung Browser menu (⋮ three dots).</li>
                <li>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</li>
                <li>Launch Clientivity directly from your app drawer!</li>
              </ol>
            </div>
          </div>
        `}
      </div>

      <!-- User Profile -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-3)">Personalization</p>
        <form id="form-profile-settings">
          <div class="form-group">
            <label class="form-label">Your Name / Identifier</label>
            <input type="text" class="form-input" id="setting-name" value="${settings.name || 'Prerana'}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Theme Mode</label>
            <select class="form-select" id="setting-theme">
              <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Sleek Dark (Default)</option>
              <option value="oled" ${settings.theme === 'oled' ? 'selected' : ''}>OLED True Black</option>
              <option value="midnight" ${settings.theme === 'midnight' ? 'selected' : ''}>Midnight Indigo</option>
              <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Clean Light</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-sm">${icon('check', 14)} Save Profile</button>
        </form>
      </div>

      <!-- Data Backup & Reset -->
      <div class="card" style="padding:var(--sp-4)">
        <p class="label" style="margin-bottom:var(--sp-3)">Data & Storage Management</p>
        <div class="flex flex-col gap-3">
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" id="btn-export-data" style="flex:1">
              ${icon('download', 14)} Export Backup (JSON)
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-import-trigger" style="flex:1">
              ${icon('plus', 14)} Import Backup
            </button>
            <input type="file" id="input-import-file" accept=".json" style="display:none" />
          </div>

          <div class="divider" style="margin:var(--sp-1) 0"></div>

          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold text-xs text-danger">Reset All Local Data</div>
              <div class="text-xs text-tertiary">Clear tasks, habits, and focus logs</div>
            </div>
            <button class="btn btn-secondary btn-sm text-danger" id="btn-reset-data">${icon('trash', 14)} Reset</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSettings() {
  // PWA Prompt trigger
  document.getElementById('btn-pwa-install')?.addEventListener('click', async () => {
    if (deferredPwaPrompt) {
      deferredPwaPrompt.prompt();
      const { outcome } = await deferredPwaPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Thank you for installing Clientivity!');
      }
      deferredPwaPrompt = null;
    } else {
      showToast('Tap browser menu (⋮) -> "Add to Home screen" / "Install app"');
    }
  });

  // Profile Form
  document.getElementById('form-profile-settings')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('setting-name').value.trim();
    const theme = document.getElementById('setting-theme').value;

    store.saveSettings({ name, theme });
    document.documentElement.setAttribute('data-theme', theme);
    showToast('Settings updated');
    refresh();
  });

  // Export
  document.getElementById('btn-export-data')?.addEventListener('click', () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('clientivity_')) {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientivity_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Backup downloaded');
  });

  // Import
  const fileInput = document.getElementById('input-import-file');
  document.getElementById('btn-import-trigger')?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        Object.keys(data).forEach(k => localStorage.setItem(k, data[k]));
        showToast('Data restored successfully!');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        showToast('Failed to parse backup file');
      }
    };
    reader.readAsText(file);
  });

  // Reset
  document.getElementById('btn-reset-data')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to wipe all local data? This action cannot be undone.')) {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('clientivity_')) localStorage.removeItem(k);
      });
      showToast('All app data reset.');
      setTimeout(() => window.location.reload(), 1000);
    }
  });
}
