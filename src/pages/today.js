/* ================================================================
   CLIENTIVITY — Today Page (Daily Command Center)
   ================================================================ */

import * as store from '../store.js';
import { checkSvg, icon } from '../icons.js';
import { getFormattedDate, showToast, miniConfetti } from '../utils.js';

let navigateFn = null, refreshFn = null;
export function setTodayCallbacks(nav, ref) { navigateFn = nav; refreshFn = ref; }

function getCatBadge(cat) {
  const c = (cat || '').toLowerCase();
  return ({ study:'badge-study', fitness:'badge-fitness', work:'badge-work', personal:'badge-personal', college:'badge-college' })[c] || 'badge-work';
}

export function renderToday() {
  const today = new Date();
  const dk = store.todayKey();
  const tasks = store.getTasks();
  const todayTasks = tasks.filter(t => !t.dueDate || t.dueDate === dk || (t.dueDate < dk && t.status !== 'completed'));
  const completedToday = store.getTasksCompletedToday();
  const totalToday = todayTasks.length + completedToday;
  const percent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const morning = todayTasks.filter(t => t.timeOfDay === 'morning' && t.status !== 'completed');
  const afternoon = todayTasks.filter(t => t.timeOfDay === 'afternoon' && t.status !== 'completed');
  const evening = todayTasks.filter(t => t.timeOfDay === 'evening' && t.status !== 'completed');
  const unassigned = todayTasks.filter(t => !t.timeOfDay && t.status !== 'completed');
  const done = tasks.filter(t => t.status === 'completed' && t.completedAt && t.completedAt.startsWith(dk));

  function renderSection(label, items, emoji) {
    if (items.length === 0) return '';
    return `
      <div style="margin-bottom:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-2)">${emoji} ${label}</p>
        ${items.map(t => `
          <div class="task-item ${t.status === 'completed' ? 'completed' : ''}">
            <div class="checkbox ${t.status === 'completed' ? 'checked' : ''}" data-task-toggle="${t.id}">${checkSvg}</div>
            <div class="task-info">
              <div class="task-title">${t.title}</div>
              <div class="task-meta">
                ${t.category ? `<span class="badge ${getCatBadge(t.category)}">${t.category}</span>` : ''}
                ${t.estimatedDuration ? `<span>${t.estimatedDuration}m</span>` : ''}
                ${t.priority && t.priority !== 'low' ? `<div class="priority-dot priority-${t.priority}"></div>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  return `
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Today</h1>
        <p class="text-sm text-secondary">${getFormattedDate(today)}</p>
      </div>

      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <span class="text-sm font-semibold">Daily Progress</span>
          <span class="text-sm font-bold" style="color:var(--c-accent)">${percent}%</span>
        </div>
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${percent}%"></div></div>
        <p class="text-xs text-tertiary" style="margin-top:var(--sp-2)">${completedToday} completed · ${todayTasks.filter(t => t.status !== 'completed').length} remaining</p>
      </div>

      ${renderSection('Morning', morning, '🌅')}
      ${renderSection('Afternoon', afternoon, '☀️')}
      ${renderSection('Evening', evening, '🌙')}
      ${renderSection('Tasks', unassigned, '📋')}

      ${done.length > 0 ? `
        <div style="margin-bottom:var(--sp-5)">
          <p class="label" style="margin-bottom:var(--sp-2)">✅ Completed</p>
          ${done.map(t => `
            <div class="task-item completed">
              <div class="checkbox checked" data-task-toggle="${t.id}">${checkSvg}</div>
              <div class="task-info"><div class="task-title">${t.title}</div></div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${todayTasks.length === 0 && done.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${icon('today')}</div>
          <h3>Nothing planned for today.</h3>
          <p>Add tasks and assign them to morning, afternoon, or evening.</p>
        </div>
      ` : ''}
    </div>
  `;
}

export function initToday() {
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
}
