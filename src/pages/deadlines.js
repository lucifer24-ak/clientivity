/* ================================================================
   CLIENTIVITY — Deadlines Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { getRelativeTime, getUrgencyClass, getUrgencyBgClass, showToast, createProgressRing } from '../utils.js';
import { openModal, closeModal } from '../app.js';

let refreshFn = null;
export function setDeadlinesCallbacks(nav, ref) { refreshFn = ref; }

const DEADLINE_TYPES = ['Exam', 'Assignment', 'Project', 'Application', 'Work', 'Personal', 'Other'];

export function renderDeadlines() {
  const deadlines = store.getDeadlines().sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcoming = deadlines.filter(d => {
    const diff = (new Date(d.date) - new Date(new Date().toDateString())) / (1000*60*60*24);
    return diff >= 0;
  });
  const past = deadlines.filter(d => {
    const diff = (new Date(d.date) - new Date(new Date().toDateString())) / (1000*60*60*24);
    return diff < 0;
  });

  return `
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Deadlines</h1>
        <button class="btn btn-primary btn-sm" id="open-deadline-modal">${icon('plus', 18)} Add</button>
      </div>

      ${upcoming.length === 0 && past.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${icon('deadline')}</div>
          <h3>No deadlines yet.</h3>
          <p>Nothing chasing you. Enjoy it.</p>
        </div>
      ` : ''}

      ${upcoming.map(d => {
        const rel = getRelativeTime(d.date);
        return `
          <div class="deadline-card ${getUrgencyBgClass(rel.urgency)}">
            <div class="flex items-center justify-between">
              <div>
                ${d.type ? `<span class="text-xs font-semibold text-tertiary" style="text-transform:uppercase;letter-spacing:1px">${d.type}</span>` : ''}
                <div class="deadline-title">${d.title}</div>
                <div class="text-xs text-secondary">${new Date(d.date).toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}</div>
              </div>
              <div style="text-align:right">
                <div class="deadline-countdown ${getUrgencyClass(rel.urgency)}">${rel.text}</div>
              </div>
            </div>
            ${d.progress > 0 ? `
              <div class="deadline-progress">
                <div class="flex items-center justify-between" style="margin-bottom:4px">
                  <span class="text-xs text-secondary">Progress</span>
                  <span class="text-xs font-bold">${d.progress}%</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${d.progress}%;background:${rel.urgency === 'urgent' || rel.urgency === 'overdue' ? 'var(--c-deadline)' : 'var(--c-accent)'}"></div></div>
              </div>
            ` : ''}
            ${d.description ? `<p class="text-xs text-secondary" style="margin-top:var(--sp-2)">${d.description}</p>` : ''}
            <div class="flex gap-2" style="margin-top:var(--sp-3)">
              <button class="btn btn-secondary btn-sm" data-deadline-edit="${d.id}">${icon('edit', 14)} Edit</button>
              <button class="btn btn-ghost btn-sm" data-deadline-delete="${d.id}">${icon('trash', 14)}</button>
            </div>
          </div>`;
      }).join('')}

      ${past.length > 0 ? `
        <p class="label" style="margin:var(--sp-5) 0 var(--sp-3)">Past</p>
        ${past.map(d => `
          <div class="deadline-card" style="opacity:.5">
            <div class="flex items-center justify-between">
              <div class="deadline-title text-sm">${d.title}</div>
              <span class="text-xs urgency-overdue">Overdue</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-deadline-delete="${d.id}" style="margin-top:var(--sp-2)">${icon('trash', 14)} Remove</button>
          </div>
        `).join('')}
      ` : ''}
    </div>
  `;
}

function deadlineFormHTML(d = {}) {
  return `
    <div class="flex flex-col gap-4">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="input-field" id="dl-title" value="${d.title || ''}" placeholder="e.g. Chemistry Exam" autofocus />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input class="input-field" type="date" id="dl-date" value="${d.date || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="select-field" id="dl-type">
            ${DEADLINE_TYPES.map(t => `<option value="${t}" ${d.type === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="input-field" id="dl-desc" rows="2" placeholder="Optional details...">${d.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Progress (%)</label>
        <input class="input-field" type="number" id="dl-progress" min="0" max="100" value="${d.progress || 0}" />
      </div>
      <button class="btn btn-primary w-full" id="dl-submit">${d.id ? 'Update Deadline' : 'Add Deadline'}</button>
      ${d.id ? `<button class="btn btn-danger w-full" id="dl-delete-btn">Delete Deadline</button>` : ''}
    </div>
  `;
}

function openDeadlineModal(existing = null) {
  openModal(existing ? 'Edit Deadline' : 'New Deadline', deadlineFormHTML(existing || {}), (overlay) => {
    setTimeout(() => overlay.querySelector('#dl-title')?.focus(), 100);

    overlay.querySelector('#dl-submit').addEventListener('click', () => {
      const title = overlay.querySelector('#dl-title').value.trim();
      const date = overlay.querySelector('#dl-date').value;
      if (!title || !date) { showToast('Title and date are required'); return; }

      const data = {
        title, date,
        type: overlay.querySelector('#dl-type').value,
        description: overlay.querySelector('#dl-desc').value.trim(),
        progress: parseInt(overlay.querySelector('#dl-progress').value) || 0,
      };

      if (existing) {
        store.updateDeadline(existing.id, data);
        showToast('Deadline updated');
      } else {
        store.addDeadline(data);
        showToast('Deadline added');
      }
      closeModal();
      if (refreshFn) refreshFn();
    });

    if (existing) {
      overlay.querySelector('#dl-delete-btn')?.addEventListener('click', () => {
        store.deleteDeadline(existing.id);
        showToast('Deadline removed');
        closeModal();
        if (refreshFn) refreshFn();
      });
    }
  });
}

export function initDeadlines() {
  document.getElementById('open-deadline-modal')?.addEventListener('click', () => openDeadlineModal());

  document.querySelectorAll('[data-deadline-edit]').forEach(el => {
    el.addEventListener('click', () => {
      const d = store.getDeadlines().find(x => x.id === el.dataset.deadlineEdit);
      if (d) openDeadlineModal(d);
    });
  });

  document.querySelectorAll('[data-deadline-delete]').forEach(el => {
    el.addEventListener('click', () => {
      store.deleteDeadline(el.dataset.deadlineDelete);
      showToast('Deadline removed');
      if (refreshFn) refreshFn();
    });
  });
}
