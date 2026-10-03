/* ================================================================
   CLIENTIVITY — Home Dashboard
   ================================================================ */

import * as store from '../store.js';
import { checkSvg, icon } from '../icons.js';
import { getGreeting, getFormattedDate, createProgressRing, formatDuration,
  getRelativeTime, getUrgencyClass, getScoreMessage, showToast, miniConfetti } from '../utils.js';

let navigateFn = null;
let refreshFn = null;

export function setHomeCallbacks(nav, ref) { navigateFn = nav; refreshFn = ref; }

function getCatBadge(cat) {
  const c = (cat || '').toLowerCase();
  const map = { study: 'badge-study', fitness: 'badge-fitness', work: 'badge-work', personal: 'badge-personal', college: 'badge-college' };
  return map[c] || 'badge-work';
}

export function renderHome() {
  const settings = store.getSettings();
  const nns = store.getNonNegotiables();
  const dayProgress = store.getDailyProgress();
  const tasks = store.getTasks();
  const deadlines = store.getDeadlines();
  const today = new Date();
  const dk = store.todayKey();

  const completedNN = store.getCompletedNNCount();
  const totalNN = nns.length;
  const nnPercent = totalNN > 0 ? Math.round((completedNN / totalNN) * 100) : 0;
  const score = store.getDailyScore();
  const scoreMsg = getScoreMessage(score);

  const todayTasks = tasks.filter(t => t.status !== 'completed' && (!t.dueDate || t.dueDate <= dk));
  const completedToday = store.getTasksCompletedToday();

  const upcomingDeadlines = deadlines
    .filter(d => new Date(d.date) >= new Date(today.toDateString()))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const studyWeek = store.getStudyTimeForWeek();
  const skillWeek = store.getSkillTimeForWeek();

  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
  const weekTasks = tasks.filter(t => t.completedAt && new Date(t.completedAt) >= weekAgo).length;

  return `
    <div class="page" id="home-page">
      <div style="margin-bottom:var(--sp-6)">
        <h1 class="text-xl font-bold" style="margin-bottom:2px">${getGreeting()}, ${settings.name}.</h1>
        <p class="text-sm text-secondary">${getFormattedDate(today)}</p>
      </div>

      <div class="card" style="text-align:center;padding:var(--sp-6);margin-bottom:var(--sp-5);position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(108,92,231,.06),rgba(78,168,246,.06));pointer-events:none"></div>
        <div class="progress-ring-wrap" style="margin:0 auto var(--sp-3)">
          ${createProgressRing(nnPercent, 140, 8)}
          <div class="ring-label">
            <span style="font-size:2.5rem;font-weight:800;line-height:1">${nnPercent}<span style="font-size:1.25rem">%</span></span>
          </div>
        </div>
        <p class="text-sm font-semibold" style="margin-bottom:2px">Today's Progress</p>
        <p class="text-xs text-secondary">${completedNN} of ${totalNN} essentials completed</p>
        <div style="margin-top:var(--sp-3);display:inline-flex;align-items:center;gap:var(--sp-2);padding:var(--sp-1) var(--sp-3);background:var(--bg-input);border-radius:var(--r-full)">
          <span class="text-xs font-bold" style="color:var(--c-accent)">${score}</span>
          <span class="text-xs text-secondary">${scoreMsg}</span>
        </div>
      </div>

      <div class="section-heading"><h2>Non-Negotiables</h2>
        <button class="btn-ghost text-xs" data-nav="habits">See all ${icon('chevronRight', 14)}</button>
      </div>
      <div id="home-nn-list" style="margin-bottom:var(--sp-6)">
        ${nns.length === 0 ? `
          <div class="card" style="text-align:center;padding:var(--sp-5)">
            <p class="text-sm text-secondary">No essentials yet.</p>
            <p class="text-xs text-tertiary">Create your non-negotiables to get started.</p>
          </div>
        ` : nns.map(nn => {
          const prog = dayProgress[nn.id] || {};
          const completed = !!prog.completed;
          const value = prog.value || 0;
          const streak = store.getNNStreak(nn.id);
          return `
            <div class="nn-card ${completed ? 'completed' : ''}">
              <div class="nn-icon" style="background:${nn.color}18;color:${nn.color}">${nn.icon}</div>
              <div class="nn-info">
                <div class="nn-title">${nn.title}</div>
                <div class="nn-meta">
                  ${nn.unit !== 'checkbox' ? `<span>${value} / ${nn.target} ${nn.unit}</span>` : ''}
                  ${streak > 0 ? `<span class="streak-badge">🔥 ${streak} day${streak > 1 ? 's' : ''}</span>` : ''}
                </div>
              </div>
              <div class="checkbox ${completed ? 'checked' : ''}" data-nn-toggle="${nn.id}">${checkSvg}</div>
            </div>`;
        }).join('')}
      </div>

      <div class="section-heading"><h2>Today</h2>
        <button class="btn-ghost text-xs" data-nav="tasks">See all ${icon('chevronRight', 14)}</button>
      </div>
      <div style="margin-bottom:var(--sp-6)">
        ${todayTasks.length === 0 && completedToday === 0 ? `
          <div class="card" style="text-align:center;padding:var(--sp-5)">
            <p class="text-sm text-secondary" style="margin-bottom:2px">Clear board.</p>
            <p class="text-xs text-tertiary">You have room to create something.</p>
          </div>
        ` : `
          ${completedToday > 0 ? `<p class="text-xs text-secondary" style="margin-bottom:var(--sp-2)">${completedToday} task${completedToday > 1 ? 's' : ''} completed today ✓</p>` : ''}
          ${todayTasks.slice(0, 5).map(t => `
            <div class="task-item">
              <div class="checkbox ${t.status === 'completed' ? 'checked' : ''}" data-task-toggle="${t.id}">${checkSvg}</div>
              <div class="task-info">
                <div class="task-title">${t.title}</div>
                <div class="task-meta">
                  ${t.category ? `<span class="badge ${getCatBadge(t.category)}">${t.category}</span>` : ''}
                  ${t.estimatedDuration ? `<span>${t.estimatedDuration}m</span>` : ''}
                </div>
              </div>
              ${t.priority ? `<div class="priority-dot priority-${t.priority}"></div>` : ''}
            </div>
          `).join('')}
          ${todayTasks.length > 5 ? `<p class="text-xs text-tertiary" style="margin-top:var(--sp-2);text-align:center">+${todayTasks.length - 5} more</p>` : ''}
        `}
      </div>

      ${upcomingDeadlines.length > 0 ? `
        <div class="section-heading"><h2>Up Next</h2>
          <button class="btn-ghost text-xs" data-nav="deadlines">See all ${icon('chevronRight', 14)}</button>
        </div>
        <div style="margin-bottom:var(--sp-6)">
          ${upcomingDeadlines.map(d => {
            const rel = getRelativeTime(d.date);
            return `
              <div class="card card-interactive" style="padding:var(--sp-3) var(--sp-4);margin-bottom:var(--sp-2)" data-nav="deadlines">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-semibold">${d.title}</div>
                    <div class="text-xs ${getUrgencyClass(rel.urgency)}" style="margin-top:2px">${rel.text}</div>
                  </div>
                  ${d.progress > 0 ? `<span class="text-sm font-bold">${d.progress}%</span>` : ''}
                </div>
              </div>`;
          }).join('')}
        </div>
      ` : ''}

      <div class="section-heading"><h2>This Week</h2></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--sp-2);margin-bottom:var(--sp-8)">
        <div class="card" style="text-align:center;padding:var(--sp-3)">
          <div class="text-lg font-bold" style="color:var(--c-study)">${formatDuration(studyWeek)}</div>
          <div class="text-xs text-tertiary">Study</div>
        </div>
        <div class="card" style="text-align:center;padding:var(--sp-3)">
          <div class="text-lg font-bold" style="color:var(--c-work)">${formatDuration(skillWeek)}</div>
          <div class="text-xs text-tertiary">Skills</div>
        </div>
        <div class="card" style="text-align:center;padding:var(--sp-3)">
          <div class="text-lg font-bold" style="color:var(--c-completed)">${weekTasks}</div>
          <div class="text-xs text-tertiary">Tasks</div>
        </div>
      </div>
    </div>
  `;
}

export function initHome() {
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
        showToast('Keep going. 💪');
      }
      if (refreshFn) refreshFn();
    });
  });

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

  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => { if (navigateFn) navigateFn(el.dataset.nav); });
  });
}
