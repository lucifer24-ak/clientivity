/* ================================================================
   CLIENTIVITY — Habits / Non-Negotiables Page
   ================================================================ */

import * as store from '../store.js';
import { checkSvg, icon } from '../icons.js';
import { showToast, miniConfetti } from '../utils.js';
import { openModal, closeModal } from '../app.js';

let refreshFn = null;
export function setHabitsCallbacks(nav, ref) { refreshFn = ref; }

const UNITS = [
  { value: 'checkbox', label: 'Simple Checkbox' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours', label: 'Hours' },
  { value: 'pages', label: 'Pages' },
  { value: 'reps', label: 'Repetitions' },
];

const ICON_OPTIONS = ['🏃‍♀️', '📖', '💻', '😴', '📚', '🧘', '💪', '🧠', '✍️', '🎯', '💧', '🥗', '🎵', '🎨', '📝', '🔥', '⚡', '🌟', '💡', '🏋️'];

export function renderHabits() {
  const nns = store.getNonNegotiables();
  const dayProgress = store.getDailyProgress();

  return `
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Non-Negotiables</h1>
          <p class="text-sm text-secondary">Your daily essentials</p>
        </div>
        <button class="btn btn-primary btn-sm" id="add-nn-btn">${icon('plus', 18)} Add</button>
      </div>

      ${nns.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${icon('habits')}</div>
          <h3>No essentials yet.</h3>
          <p>Define what matters most every single day.</p>
        </div>
      ` : nns.map(nn => {
        const prog = dayProgress[nn.id] || {};
        const completed = !!prog.completed;
        const value = prog.value || 0;
        const streak = store.getNNStreak(nn.id);

        return `
          <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-3)">
            <div class="flex items-center gap-3" style="margin-bottom:${nn.unit !== 'checkbox' && !completed ? 'var(--sp-3)' : '0'}">
              <div class="nn-icon" style="background:${nn.color}18;color:${nn.color};font-size:1.25rem">${nn.icon}</div>
              <div class="nn-info" style="flex:1">
                <div class="text-sm font-semibold ${completed ? 'text-tertiary' : ''}" style="${completed ? 'text-decoration:line-through' : ''}">${nn.title}</div>
                <div class="nn-meta">
                  ${nn.unit !== 'checkbox' ? `<span>${nn.target} ${nn.unit}</span>` : ''}
                  ${streak > 0 ? `<span class="streak-badge">🔥 ${streak} day${streak > 1 ? 's' : ''}</span>` : ''}
                </div>
              </div>
              <div class="checkbox ${completed ? 'checked' : ''}" data-nn-toggle="${nn.id}">${checkSvg}</div>
            </div>

            ${nn.unit !== 'checkbox' && !completed ? `
              <div style="margin-top:var(--sp-2)">
                <div class="flex items-center justify-between" style="margin-bottom:4px">
                  <span class="text-xs text-secondary">${value} / ${nn.target} ${nn.unit}</span>
                  <span class="text-xs font-bold">${Math.round((value / nn.target) * 100)}%</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${Math.min(100, (value / nn.target) * 100)}%;background:${nn.color}"></div></div>
                <div class="flex gap-2" style="margin-top:var(--sp-2)">
                  <button class="btn btn-secondary btn-sm" data-nn-add="${nn.id}" data-amount="${Math.round(nn.target / 4)}">+${Math.round(nn.target / 4)}</button>
                  <button class="btn btn-secondary btn-sm" data-nn-add="${nn.id}" data-amount="${Math.round(nn.target / 2)}">+${Math.round(nn.target / 2)}</button>
                  <button class="btn btn-secondary btn-sm" data-nn-add="${nn.id}" data-amount="${nn.target}">+${nn.target}</button>
                </div>
              </div>
            ` : ''}

            <div class="flex gap-2" style="margin-top:var(--sp-3)">
              <button class="btn btn-ghost btn-sm" data-nn-edit="${nn.id}">${icon('edit', 14)} Edit</button>
              <button class="btn btn-ghost btn-sm" data-nn-delete="${nn.id}">${icon('trash', 14)}</button>
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

function nnFormHTML(nn = {}) {
  return `
    <div class="flex flex-col gap-4">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="input-field" id="nn-title" value="${nn.title || ''}" placeholder="e.g. Move your body" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Icon</label>
        <div class="flex gap-2" style="flex-wrap:wrap" id="nn-icon-picker">
          ${ICON_OPTIONS.map(ic => `
            <button class="btn-icon ${nn.icon === ic ? 'active' : ''}" data-icon="${ic}"
              style="font-size:1.25rem;width:40px;height:40px;border-radius:var(--r-md);background:var(--bg-input);border:2px solid ${nn.icon === ic ? 'var(--c-accent)' : 'transparent'}">${ic}</button>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Color</label>
        <div class="flex gap-2" id="nn-color-picker">
          ${['#00D68F','#4EA8F6','#A78BFA','#F59E0B','#F472B6','#818CF8','#F87171','#34D399','#6C5CE7'].map(c => `
            <div class="color-dot ${nn.color === c ? 'active' : ''}" data-color="${c}" style="background:${c}"></div>
          `).join('')}
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Unit</label>
          <select class="select-field" id="nn-unit">
            ${UNITS.map(u => `<option value="${u.value}" ${(nn.unit || 'checkbox') === u.value ? 'selected' : ''}>${u.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" id="nn-target-group">
          <label class="form-label">Target</label>
          <input class="input-field" type="number" id="nn-target" value="${nn.target || 1}" min="1" />
        </div>
      </div>
      <button class="btn btn-primary w-full" id="nn-submit">${nn.id ? 'Update' : 'Create Non-Negotiable'}</button>
    </div>
  `;
}

function openNNModal(existing = null) {
  let selectedIcon = existing?.icon || '🎯';
  let selectedColor = existing?.color || '#6C5CE7';

  openModal(existing ? 'Edit Non-Negotiable' : 'New Non-Negotiable', nnFormHTML(existing || { icon: selectedIcon, color: selectedColor }), (overlay) => {
    setTimeout(() => overlay.querySelector('#nn-title')?.focus(), 100);

    // Icon picker
    overlay.querySelectorAll('[data-icon]').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('[data-icon]').forEach(b => b.style.borderColor = 'transparent');
        btn.style.borderColor = 'var(--c-accent)';
        selectedIcon = btn.dataset.icon;
      });
    });

    // Color picker
    overlay.querySelectorAll('[data-color]').forEach(dot => {
      dot.addEventListener('click', () => {
        overlay.querySelectorAll('[data-color]').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        selectedColor = dot.dataset.color;
      });
    });

    // Unit change
    overlay.querySelector('#nn-unit').addEventListener('change', (e) => {
      const tg = overlay.querySelector('#nn-target-group');
      tg.style.display = e.target.value === 'checkbox' ? 'none' : '';
    });
    if ((existing?.unit || 'checkbox') === 'checkbox') {
      overlay.querySelector('#nn-target-group').style.display = 'none';
    }

    overlay.querySelector('#nn-submit').addEventListener('click', () => {
      const title = overlay.querySelector('#nn-title').value.trim();
      if (!title) { showToast('Title is required'); return; }

      const data = {
        title,
        icon: selectedIcon,
        color: selectedColor,
        unit: overlay.querySelector('#nn-unit').value,
        target: parseInt(overlay.querySelector('#nn-target').value) || 1,
        frequency: 'daily',
      };

      if (existing) {
        store.updateNonNegotiable(existing.id, data);
        showToast('Updated');
      } else {
        store.addNonNegotiable(data);
        showToast('Non-negotiable created');
      }
      closeModal();
      if (refreshFn) refreshFn();
    });
  });
}

export function initHabits() {
  document.getElementById('add-nn-btn')?.addEventListener('click', () => openNNModal());

  document.querySelectorAll('[data-nn-toggle]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.dataset.nnToggle;
      const prog = store.getDailyProgress();
      const current = prog[id] || {};
      const nn = store.getNonNegotiables().find(n => n.id === id);
      const newCompleted = !current.completed;
      store.saveDailyNNProgress(id, {
        completed: newCompleted,
        value: newCompleted ? (nn?.target || 1) : 0,
        timestamp: new Date().toISOString()
      });
      if (newCompleted) {
        const rect = el.getBoundingClientRect();
        miniConfetti(rect.left + rect.width / 2, rect.top);
      }
      if (refreshFn) refreshFn();
    });
  });

  document.querySelectorAll('[data-nn-add]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.nnAdd;
      const amount = parseInt(el.dataset.amount);
      const nn = store.getNonNegotiables().find(n => n.id === id);
      const prog = store.getDailyProgress();
      const current = prog[id] || {};
      const newValue = Math.min((current.value || 0) + amount, nn.target * 2);
      const completed = newValue >= nn.target;
      store.saveDailyNNProgress(id, {
        completed,
        value: newValue,
        timestamp: new Date().toISOString()
      });
      if (completed && !current.completed) {
        const rect = el.getBoundingClientRect();
        miniConfetti(rect.left + rect.width / 2, rect.top);
        showToast('Essential complete! 🎯');
      }
      if (refreshFn) refreshFn();
    });
  });

  document.querySelectorAll('[data-nn-edit]').forEach(el => {
    el.addEventListener('click', () => {
      const nn = store.getNonNegotiables().find(n => n.id === el.dataset.nnEdit);
      if (nn) openNNModal(nn);
    });
  });

  document.querySelectorAll('[data-nn-delete]').forEach(el => {
    el.addEventListener('click', () => {
      store.deleteNonNegotiable(el.dataset.nnDelete);
      showToast('Removed');
      if (refreshFn) refreshFn();
    });
  });
}
