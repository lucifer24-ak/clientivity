/* ================================================================
   CLIENTIVITY — Tasks Page
   ================================================================ */

import * as store from '../store.js';
import { checkSvg, icon } from '../icons.js';
import { showToast, miniConfetti, getPriorityLabel } from '../utils.js';
import { openModal, closeModal } from '../app.js';

let refreshFn = null;
export function setTasksCallbacks(nav, ref) { refreshFn = ref; }

const CATEGORIES = ['Study', 'Work', 'Fitness', 'Personal', 'College', 'Other'];
const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
const TIME_OF_DAY = ['morning', 'afternoon', 'evening'];

function getCatBadge(cat) {
  const c = (cat || '').toLowerCase();
  return ({ study:'badge-study', fitness:'badge-fitness', work:'badge-work', personal:'badge-personal', college:'badge-college' })[c] || 'badge-work';
}

export function renderTasks() {
  const tasks = store.getTasks();
  const pending = tasks.filter(t => t.status !== 'completed').sort((a, b) => {
    const pOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    return (pOrder[a.priority] ?? 3) - (pOrder[b.priority] ?? 3);
  });
  const completed = tasks.filter(t => t.status === 'completed').sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  return `
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Tasks</h1>
        <button class="btn btn-primary btn-sm" id="open-task-modal">${icon('plus', 18)} Add Task</button>
      </div>

      ${pending.length === 0 && completed.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${icon('tasks')}</div>
          <h3>Clear board.</h3>
          <p>You have room to create something.</p>
        </div>
      ` : ''}

      ${pending.map(t => `
        <div class="task-item" data-task-id="${t.id}">
          <div class="checkbox" data-task-toggle="${t.id}">${checkSvg}</div>
          <div class="task-info" data-task-edit="${t.id}" style="cursor:pointer">
            <div class="task-title">${t.title}</div>
            <div class="task-meta">
              ${t.category ? `<span class="badge ${getCatBadge(t.category)}">${t.category}</span>` : ''}
              ${t.dueDate ? `<span>${t.dueDate === store.todayKey() ? 'Today' : t.dueDate}</span>` : ''}
              ${t.estimatedDuration ? `<span>${t.estimatedDuration}m</span>` : ''}
              ${t.timeOfDay ? `<span style="text-transform:capitalize">${t.timeOfDay}</span>` : ''}
            </div>
          </div>
          ${t.priority ? `<div class="priority-dot priority-${t.priority}" title="${getPriorityLabel(t.priority)}"></div>` : ''}
        </div>
      `).join('')}

      ${completed.length > 0 ? `
        <div style="margin-top:var(--sp-5)">
          <p class="label" style="margin-bottom:var(--sp-3)">Completed (${completed.length})</p>
          ${completed.slice(0, 10).map(t => `
            <div class="task-item completed">
              <div class="checkbox checked" data-task-toggle="${t.id}">${checkSvg}</div>
              <div class="task-info">
                <div class="task-title">${t.title}</div>
                <div class="task-meta">
                  ${t.category ? `<span class="badge ${getCatBadge(t.category)}">${t.category}</span>` : ''}
                </div>
              </div>
              <button class="btn-icon" data-task-delete="${t.id}" style="opacity:.5" title="Delete">${icon('trash', 16)}</button>
            </div>
          `).join('')}
          ${completed.length > 10 ? `<p class="text-xs text-tertiary text-center" style="margin-top:var(--sp-2)">+${completed.length - 10} more</p>` : ''}
        </div>
      ` : ''}
    </div>
  `;
}

function taskFormHTML(task = {}) {
  return `
    <div class="flex flex-col gap-4">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="input-field" id="task-title" value="${task.title || ''}" placeholder="What needs to be done?" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="input-field" id="task-desc" placeholder="Optional details..." rows="2">${task.description || ''}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Due Date</label>
          <input class="input-field" type="date" id="task-due" value="${task.dueDate || store.todayKey()}" />
        </div>
        <div class="form-group">
          <label class="form-label">Time of Day</label>
          <select class="select-field" id="task-tod">
            <option value="">Any</option>
            ${TIME_OF_DAY.map(t => `<option value="${t}" ${task.timeOfDay === t ? 'selected' : ''}>${t.charAt(0).toUpperCase() + t.slice(1)}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Priority</label>
          <select class="select-field" id="task-priority">
            ${PRIORITIES.map(p => `<option value="${p}" ${(task.priority || 'medium') === p ? 'selected' : ''}>${getPriorityLabel(p)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="select-field" id="task-cat">
            ${CATEGORIES.map(c => `<option value="${c}" ${task.category === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Estimated Duration (minutes)</label>
        <input class="input-field" type="number" id="task-duration" value="${task.estimatedDuration || ''}" placeholder="e.g. 45" min="1" />
      </div>
      <button class="btn btn-primary w-full" id="task-submit">${task.id ? 'Update Task' : 'Add Task'}</button>
      ${task.id ? `<button class="btn btn-danger w-full" id="task-delete-btn">Delete Task</button>` : ''}
    </div>
  `;
}

function openTaskModal(existingTask = null) {
  openModal(existingTask ? 'Edit Task' : 'New Task', taskFormHTML(existingTask || {}), (overlay) => {
    // Focus title input
    setTimeout(() => overlay.querySelector('#task-title')?.focus(), 100);

    overlay.querySelector('#task-submit').addEventListener('click', () => {
      const title = overlay.querySelector('#task-title').value.trim();
      if (!title) { showToast('Title is required'); return; }

      const taskData = {
        title,
        description: overlay.querySelector('#task-desc').value.trim(),
        dueDate: overlay.querySelector('#task-due').value,
        timeOfDay: overlay.querySelector('#task-tod').value,
        priority: overlay.querySelector('#task-priority').value,
        category: overlay.querySelector('#task-cat').value,
        estimatedDuration: parseInt(overlay.querySelector('#task-duration').value) || null,
      };

      if (existingTask) {
        store.updateTask(existingTask.id, taskData);
        showToast('Task updated');
      } else {
        store.addTask(taskData);
        showToast('Task added');
      }
      closeModal();
      if (refreshFn) refreshFn();
    });

    if (existingTask) {
      overlay.querySelector('#task-delete-btn')?.addEventListener('click', () => {
        store.deleteTask(existingTask.id);
        showToast('Task deleted');
        closeModal();
        if (refreshFn) refreshFn();
      });
    }
  });
}

export function initTasks() {
  document.getElementById('open-task-modal')?.addEventListener('click', () => openTaskModal());

  document.querySelectorAll('[data-task-toggle]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.dataset.taskToggle;
      const task = store.getTasks().find(t => t.id === id);
      if (task) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        store.updateTask(id, { status: newStatus });
        if (newStatus === 'completed') {
          const rect = el.getBoundingClientRect();
          miniConfetti(rect.left + rect.width / 2, rect.top);
        }
        if (refreshFn) refreshFn();
      }
    });
  });

  document.querySelectorAll('[data-task-edit]').forEach(el => {
    el.addEventListener('click', () => {
      const task = store.getTasks().find(t => t.id === el.dataset.taskEdit);
      if (task) openTaskModal(task);
    });
  });

  document.querySelectorAll('[data-task-delete]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      store.deleteTask(el.dataset.taskDelete);
      showToast('Task removed');
      if (refreshFn) refreshFn();
    });
  });
}
